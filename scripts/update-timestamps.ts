#!/usr/bin/env bun
/**
 * Script to update lastUpdated timestamps when exportString changes
 * Can be run manually or as part of a git pre-commit hook
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const EXPORTS_DIR = join(process.cwd(), "data/exports");
const ISO_DATE_REGEX = /lastUpdated:\s*["']([^"']+)["']/;
const EXPORT_STRING_REGEX = /exportString:\s*`([^`]+)`/s;

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
 * Extract exportString from file content
 */
function extractExportString(content: string): string | null {
  const match = content.match(EXPORT_STRING_REGEX);
  return match ? match[1].trim() : null;
}

/**
 * Check if exportString has changed compared to git HEAD
 */
function hasExportStringChanged(filePath: string, currentContent: string): boolean {
  try {
    // Get the version of the file from git HEAD
    const headContent = execSync(`git show HEAD:${filePath}`, {
      encoding: "utf-8",
    });
    
    const currentExportString = extractExportString(currentContent);
    const headExportString = extractExportString(headContent);
    
    // If we can't extract exportString from either version, assume no change
    if (!currentExportString || !headExportString) {
      return false;
    }
    
    return currentExportString !== headExportString;
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
function processFiles(files: string[]): FileChange[] {
  const changes: FileChange[] = [];
  
  for (const filePath of files) {
    const fullPath = join(process.cwd(), filePath);
    const currentContent = readFileSync(fullPath, "utf-8");
    
    // Check if this file has exportString changes
    const needsUpdate = hasExportStringChanged(filePath, currentContent);
    
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
  
  // Get files to process
  const files = forceAll ? getAllExportFiles() : getModifiedExportFiles();
  
  if (files.length === 0) {
    console.log("No export files to process.");
    return;
  }
  
  console.log(`Processing ${files.length} export file(s)...`);
  
  // Process and apply changes
  const changes = processFiles(files);
  const updatedCount = changes.filter(c => c.needsUpdate).length;
  
  if (updatedCount === 0) {
    console.log("No timestamp updates needed.");
    return;
  }
  
  applyChanges(changes);
  console.log(`\n✓ Updated ${updatedCount} file(s) with new timestamps.`);
}

main();
