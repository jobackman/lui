---
description: Build a feature from the prd
agent: build
model: github-copilot/claude-sonnet-4.5
---

Use @plans/prd.json @plans/progress.md

1. Find the highest priority feature to work on and work only on that feature. This should be the one YOU decide has the highest priority - not necessarily the first one in the list.
2. Check that the types are okay via bun run build and that the tests pass via "bun test"
3. Update the PRD with the work that was done.
4. Append your progress to the progress.txt file. Use this to leave a note for the next person working in the codebase.
5. Make a git commit of that feature.
   ONLY WORK ON A SINGLE FEATURE.
   If, while implementing the feature, you notice the PRD is complete, output <promise>COMPLETE</promise>
