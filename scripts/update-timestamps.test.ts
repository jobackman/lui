import { afterEach, expect, test } from 'bun:test';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getAllExportFiles, updateTimestamps } from './update-timestamps';

const directories: string[] = [];
const oldDate = '2026-01-01T00:00:00.000Z';
const newDate = '2026-03-01T00:00:00.000Z';
const retailPath = 'data/exports/retail/example.ts';
const foreverPath = 'data/exports/forever/example.ts';

function git(cwd: string, ...args: string[]): string {
  return execFileSync('git', args, { cwd, encoding: 'utf8' });
}

function config(description = 'Original', date = oldDate): string {
  return `export const exampleRetail: AddonConfiguration = {\n    name: 'Example',\n    description: '${description}',\n    lastUpdated: "${date}",\n};\n`;
}

async function repository(): Promise<string> {
  const cwd = await mkdtemp(join(tmpdir(), 'lui-timestamps-'));
  directories.push(cwd);
  git(cwd, 'init', '-q');
  git(cwd, 'config', 'user.name', 'Test');
  git(cwd, 'config', 'user.email', 'test@example.com');
  await Bun.write(join(cwd, retailPath), config());
  await Bun.write(join(cwd, foreverPath), config());
  await Bun.write(join(cwd, 'data/exports/example.ts'), "export const example = { id: 'example' };\n");
  git(cwd, 'add', '.');
  git(cwd, '-c', 'core.hooksPath=/dev/null', 'commit', '-qm', 'Baseline');
  return cwd;
}

afterEach(async () => {
  await Promise.all(directories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

test('recursive discovery skips shared identities and finds both edition configurations', async () => {
  const cwd = await repository();
  expect((await getAllExportFiles(cwd)).sort()).toEqual([foreverPath, retailPath]);
});

test('only the changed staged edition receives a new timestamp', async () => {
  const cwd = await repository();
  await Bun.write(join(cwd, foreverPath), config('Forever changed'));
  git(cwd, 'add', foreverPath);
  expect(await updateTimestamps({ cwd, now: newDate })).toEqual([foreverPath]);
  expect(git(cwd, 'show', `:${foreverPath}`)).toContain(newDate);
  expect(await Bun.file(join(cwd, retailPath)).text()).toContain(oldDate);
  expect(await updateTimestamps({ cwd, now: newDate })).toEqual([foreverPath]);
});

test('timestamp-only staged changes and identity changes are ignored', async () => {
  const cwd = await repository();
  await Bun.write(join(cwd, retailPath), config('Original', newDate));
  await Bun.write(join(cwd, 'data/exports/example.ts'), "export const example = { id: 'renamed' };\n");
  git(cwd, 'add', '.');
  expect(await updateTimestamps({ cwd, now: '2027-01-01T00:00:00.000Z' })).toEqual([]);
});

test('partially staged files retain their unstaged edits outside the index', async () => {
  const cwd = await repository();
  await Bun.write(join(cwd, retailPath), config('Staged change'));
  git(cwd, 'add', retailPath);
  await Bun.write(join(cwd, retailPath), config('Unstaged change'));
  await updateTimestamps({ cwd, now: newDate });
  expect(git(cwd, 'show', `:${retailPath}`)).toContain('Staged change');
  expect(git(cwd, 'show', `:${retailPath}`)).not.toContain('Unstaged change');
  expect(await Bun.file(join(cwd, retailPath)).text()).toContain('Unstaged change');
  expect(await Bun.file(join(cwd, retailPath)).text()).toContain(newDate);
});

test('forced updates refuse partially staged files', async () => {
  const cwd = await repository();
  await Bun.write(join(cwd, retailPath), config('Staged change'));
  git(cwd, 'add', retailPath);
  await Bun.write(join(cwd, retailPath), config('Unstaged change'));
  await expect(updateTimestamps({ cwd, forcePaths: [retailPath], now: newDate })).rejects.toThrow('partially staged');
  expect(git(cwd, 'show', `:${retailPath}`)).toBe(config('Staged change'));
});

test('moving an unchanged legacy configuration to Retail preserves its timestamp', async () => {
  const cwd = await repository();
  const legacy = `export const example: Addon = {\n  id: 'example',\n  name: 'Example',\n  export: {\n    name: 'Example',\n    description: 'Original',\n    lastUpdated: "${oldDate}",\n  },\n};\n`;
  await rm(join(cwd, retailPath));
  await Bun.write(join(cwd, 'data/exports/example.ts'), legacy);
  git(cwd, 'add', '.');
  git(cwd, '-c', 'core.hooksPath=/dev/null', 'commit', '-qm', 'Legacy baseline');
  await Bun.write(join(cwd, 'data/exports/example.ts'), "export const example = { editions: {} };\n");
  await Bun.write(join(cwd, retailPath), config());
  git(cwd, 'add', '.');
  expect(await updateTimestamps({ cwd, now: newDate })).toEqual([]);
  expect(git(cwd, 'show', `:${retailPath}`)).toContain(oldDate);
});

test('new configurations get timestamps and forced-all skips identities', async () => {
  const cwd = await repository();
  const newPath = 'data/exports/forever/new.ts';
  await Bun.write(join(cwd, newPath), config());
  git(cwd, 'add', newPath);
  expect(await updateTimestamps({ cwd, now: newDate })).toEqual([newPath]);
  expect((await updateTimestamps({ cwd, forceAll: true, now: newDate })).sort()).toEqual([foreverPath, newPath, retailPath].sort());
});
