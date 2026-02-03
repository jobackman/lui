# Timestamp Automation

This directory contains scripts for automating timestamp updates in addon export files.

## Update Timestamps Script

The `update-timestamps.ts` script automatically updates the `lastUpdated` field in export files when the `exportString` field is modified.

### Features

- **Smart Detection**: Only updates timestamps when `exportString` changes (ignores other field changes)
- **Git Integration**: Works with git staging area to detect modified files
- **Pre-commit Hook**: Automatically runs before commits to keep timestamps in sync
- **Manual Override**: Can be run manually on all files or specific files

### Usage

#### Automatic (Pre-commit Hook)

The script runs automatically when you commit changes:

```bash
# Modify an export file's exportString
git add data/exports/my-addon.ts
git commit -m "Update addon export string"
# Script automatically updates timestamp and re-stages the file
```

#### Manual Usage

Run on staged files only:
```bash
bun run update-timestamps
```

Run on all export files (force update check):
```bash
bun run update-timestamps:all
```

### How It Works

1. Detects which export files are staged for commit (or all files with `--all` flag)
2. Compares current `exportString` with the version in git HEAD
3. If `exportString` changed, updates `lastUpdated` to current ISO 8601 timestamp
4. Re-stages the file if running in git context

### Pre-commit Hook

The pre-commit hook is located at `.git/hooks/pre-commit` and runs automatically before each commit. It only processes files that are staged for commit.

If you need to skip the hook (not recommended):
```bash
git commit --no-verify
```

### Error Handling

- If `exportString` cannot be extracted, no update occurs
- If file is new (not in git HEAD), timestamp is updated
- If not in a git repository, falls back to checking all files
- Malformed export files are skipped with a warning

### Requirements

- Bun runtime
- Git (for automatic detection of changed files)
- Export files must follow the TypeScript format with template literals for `exportString`
