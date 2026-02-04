---
description: archive completed and cancelled tasks from prd.json
agent: build
model: github-copilot/claude-sonnet-4.5
---

Archive all completed (passes: true) and cancelled tasks from @plans/prd.json to @plans/archive/archived-YYYY-MM-DD.json.

After archiving:

1. Create a new archive file in @plans/archive/ with timestamp
2. Remove archived tasks from @plans/prd.json (keep only active tasks with passes: false)
3. Append progress entry to @plans/progress.md with:
   - Date and time
   - Count of archived tasks (completed vs cancelled)
   - Archive file path
   - Brief list of what was archived
4. Commit the changes

The archive file should include:

- All archived task fields (category, description, steps, passes)
- archivedAt timestamp (ISO 8601 format)
- originalIndex for reference

Keep the PRD clean by maintaining only active work items.
