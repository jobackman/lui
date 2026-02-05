#!/usr/bin/env bun
/**
 * Script to update lastUpdated timestamps when export data changes
 * Can be run manually or as part of a git pre-commit hook
 * 
 * Usage:
 *   bun run update-timestamps           # Update staged files with changes
 *   bun run update-timestamps --all     # Force update all files to now
 *   bun run update-timestamps --force file1.ts file2.ts  # Force specific files
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const EXPORTS_DIR = join(process.cwd(), "data/exports");
const ISO_DATE_REGEX = /lastUpdated:\s*["']([^"']+)["']/;

interface FileChange {
  path: string;
  oldContent: string;
  newContent: string;
  needsUpdate: boolean;
}

/**
 * Get the list of modified export files in git staging area
 */
function getModifiedExportFiles(): string[] {
  try {
    const output = execSync("git diff --cached --name-only data/exports/*.ts", {
      encoding: "utf-8",
    }).trim();
    
    if (!output) return [];
    
    return output.split("\n").filter(Boolean);
  } catch (error) {
    // If not in a git repo or no staged files, return empty array
    return [];
  }
}

/**
 * Get all export files (used when running without git context)
 */
function getAllExportFiles(): string[] {
  const exportsDir = join(process.cwd(), "data/exports");
  const files = readdirSync(exportsDir)
    .filter(f => f.endsWith(".ts"))
    .map(f => `data/exports/${f}`);
  return files;
}

/**
 * Normalize content by removing lastUpdated field for comparison
 * This prevents the timestamp itself from being considered a change
 */
function normalizeContent(content: string): string {
  return content.replace(ISO_DATE_REGEX, "lastUpdated: \"NORMALIZED\"");
}

/**
 * Check if export content has changed compared to git HEAD
 * Detects changes to ANY field (description, images, tags, downloadUrl, etc.)
 * Excludes the lastUpdated field itself from comparison
 */
function hasContentChanged(filePath: string, currentContent: string): boolean {
  try {
    // Get the version of the file from git HEAD
    const headContent = execSync(`git show HEAD:${filePath}`, {
      encoding: "utf-8",
    });
    
    // Normalize both versions (remove timestamp for comparison)
    const normalizedCurrent = normalizeContent(currentContent);
    const normalizedHead = normalizeContent(headContent);
    
    // If content differs (excluding timestamp), it needs an update
    return normalizedCurrent !== normalizedHead;
  } catch (error) {
    // File might be new (not in HEAD), assume it needs timestamp update
    return true;
  }
}

/**
 * Update the lastUpdated timestamp in file content
 */
function updateTimestamp(content: string): string {
  const now = new Date().toISOString();
  return content.replace(ISO_DATE_REGEX, `lastUpdated: "${now}"`);
}

/**
 * Process files and update timestamps where needed
 */
function processFiles(files: string[], forceUpdate: boolean): FileChange[] {
  const changes: FileChange[] = [];
  
  for (const filePath of files) {
    const fullPath = join(process.cwd(), filePath);
    const currentContent = readFileSync(fullPath, "utf-8");
    
    // Check if this file has content changes (or force update)
    const needsUpdate = forceUpdate || hasContentChanged(filePath, currentContent);
    
    if (needsUpdate) {
      const newContent = updateTimestamp(currentContent);
      changes.push({
        path: filePath,
        oldContent: currentContent,
        newContent,
        needsUpdate: true,
      });
    }
  }
  
  return changes;
}

/**
 * Apply changes to files
 */
function applyChanges(changes: FileChange[]): void {
  for (const change of changes) {
    if (change.needsUpdate) {
      const fullPath = join(process.cwd(), change.path);
      writeFileSync(fullPath, change.newContent, "utf-8");
      console.log(`✓ Updated timestamp in ${change.path}`);
      
      // Re-stage the file if running in git context
      try {
        execSync(`git add ${change.path}`, { stdio: "ignore" });
      } catch {
        // Not in git context or git not available, skip staging
      }
    }
  }
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  const forceAll = args.includes("--all");
  const forceIndex = args.indexOf("--force");
  
  let files: string[];
  let forceUpdate = false;
  
  if (forceAll) {
    // --all flag: force update all files to current timestamp
    files = getAllExportFiles();
    forceUpdate = true;
    console.log("Force updating all export files...");
  } else if (forceIndex !== -1) {
    // --force flag with specific files
    const specifiedFiles = args.slice(forceIndex + 1);
    if (specifiedFiles.length === 0) {
      console.error("Error: --force requires file paths as arguments");
      console.error("Usage: bun run update-timestamps --force file1.ts file2.ts");
      process.exit(1);
    }
    // Normalize file paths (add data/exports/ prefix if not present)
    files = specifiedFiles.map(f => {
      if (f.startsWith("data/exports/")) return f;
      if (f.endsWith(".ts")) return `data/exports/${f}`;
      return `data/exports/${f}.ts`;
    });
    forceUpdate = true;
    console.log(`Force updating ${files.length} specified file(s)...`);
  } else {
    // Default: update only staged files with actual content changes
    files = getModifiedExportFiles();
    forceUpdate = false;
    if (files.length > 0) {
      console.log(`Processing ${files.length} staged export file(s)...`);
    }
  }
  
  if (files.length === 0) {
    console.log("No export files to process.");
    return;
  }
  
  // Process and apply changes
  const changes = processFiles(files, forceUpdate);
  const updatedCount = changes.filter(c => c.needsUpdate).length;
  
  if (updatedCount === 0) {
    console.log("No timestamp updates needed.");
    return;
  }
  
  applyChanges(changes);
  console.log(`\n✓ Updated ${updatedCount} file(s) with new timestamps.`);
}

main();
