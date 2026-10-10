#!/usr/bin/env bun
import { execFileSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const TIMESTAMP = /lastUpdated:\s*["']([^"']+)["']/;

function git(cwd: string, args: string[], input?: string): string {
  return execFileSync('git', args, { cwd, encoding: 'utf8', input, stdio: ['pipe', 'pipe', 'pipe'] });
}

function gitContent(cwd: string, revisionPath: string): string | undefined {
  try { return git(cwd, ['show', revisionPath]); }
  catch { return undefined; }
}

/** Remove timestamps from comparison without changing configuration strings. */
export function normalizeContent(content: string): string {
  return content.replace(TIMESTAMP, 'lastUpdated: "NORMALIZED"');
}

/** Recognize the original single-export body during the Retail directory migration. */
export function configurationBody(content: string): string | undefined {
  const legacy = content.match(/\bexport:\s*\{([\s\S]*)\n  \},\n\};\s*$/);
  if (legacy) return normalizeContent(legacy[1] ?? '').trim();
  const current = content.match(/:\s*AddonConfiguration\s*=\s*\{([\s\S]*)\n\};\s*$/);
  return current ? normalizeContent(current[1] ?? '').trim() : undefined;
}

/** Recursively discover configuration files, not top-level addon identities. */
export async function getAllExportFiles(cwd: string): Promise<string[]> {
  async function walk(relative: string): Promise<string[]> {
    const entries = await readdir(join(cwd, relative), { withFileTypes: true });
    const groups = await Promise.all(entries.map(async (entry): Promise<string[]> => {
      const path = `${relative}/${entry.name}`;
      if (entry.isDirectory()) return walk(path);
      if (!path.endsWith('.ts')) return [];
      return TIMESTAMP.test(await Bun.file(join(cwd, path)).text()) ? [path] : [];
    }));
    return groups.flat();
  }
  return walk('data/exports');
}

function previousContent(cwd: string, path: string, staged: string): string | undefined {
  const previous = gitContent(cwd, `HEAD:${path}`);
  if (previous !== undefined) return previous;
  // A structural move of an unchanged legacy Retail configuration is not a new update.
  if (path.startsWith('data/exports/retail/')) {
    const basename = path.slice('data/exports/retail/'.length);
    const legacy = gitContent(cwd, `HEAD:data/exports/${basename}`);
    if (legacy && configurationBody(legacy) === configurationBody(staged) && configurationBody(staged) !== undefined) {
      return staged;
    }
  }
  return undefined;
}

export interface TimestampOptions {
  cwd?: string;
  forceAll?: boolean;
  forcePaths?: string[];
  now?: string;
}

/** Update staged configurations only; never stage unrelated working-tree changes. */
export async function updateTimestamps({ cwd = process.cwd(), forceAll = false, forcePaths, now = new Date().toISOString() }: TimestampOptions = {}): Promise<string[]> {
  const forced = forceAll || forcePaths !== undefined;
  const paths = forceAll ? await getAllExportFiles(cwd) : forcePaths ?? git(cwd, [
    'diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z', '--', 'data/exports',
  ]).split('\0').filter(Boolean);
  const updated: string[] = [];

  for (const path of paths) {
    if (!path.startsWith('data/exports/') || !path.endsWith('.ts') || path.split('/').includes('..')) {
      throw new Error(`Not an addon configuration path: ${path}`);
    }
    const file = Bun.file(join(cwd, path));
    const working = await file.text();
    const staged = gitContent(cwd, `:${path}`);
    const content = forced ? working : staged;
    if (!content || !TIMESTAMP.test(content)) continue;
    // Manual forced updates refuse partial staging instead of adding unstaged edits.
    if (forced && staged !== undefined && staged !== working && staged !== gitContent(cwd, `HEAD:${path}`)) {
      throw new Error(`Refusing forced update of partially staged file: ${path}. Stage or unstage its changes first.`);
    }
    const previous = previousContent(cwd, path, content);
    if (!forced && previous !== undefined && normalizeContent(previous) === normalizeContent(content)) continue;

    const next = content.replace(TIMESTAMP, `lastUpdated: "${now}"`);
    const oid = git(cwd, ['hash-object', '-w', '--stdin'], next).trim();
    const mode = git(cwd, ['ls-files', '--stage', '--', path]).split(' ')[0] || '100644';
    git(cwd, ['update-index', '--add', '--cacheinfo', mode, oid, path]);

    if (working === content) {
      await Bun.write(file, next);
    } else if (working.match(TIMESTAMP)?.[1] === content.match(TIMESTAMP)?.[1]) {
      // Mirror only the timestamp into a partially staged working tree, leaving other edits untouched.
      await Bun.write(file, working.replace(TIMESTAMP, `lastUpdated: "${now}"`));
    }
    updated.push(path);
  }
  return updated;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const forceIndex = args.indexOf('--force');
  const forcePaths = forceIndex < 0 ? undefined : args.slice(forceIndex + 1).map((path) => {
    const relative = path.startsWith('data/exports/') ? path : `data/exports/${path}`;
    return relative.endsWith('.ts') ? relative : `${relative}.ts`;
  });
  if (forcePaths?.length === 0) throw new Error('--force requires configuration paths');
  const updated = await updateTimestamps({ forceAll: args.includes('--all'), forcePaths });
  for (const path of updated) console.log(`✓ Updated timestamp in ${path}`);
  if (!updated.length) console.log('No timestamp updates needed.');
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error('Timestamp update failed:', error);
    process.exitCode = 1;
  });
}
