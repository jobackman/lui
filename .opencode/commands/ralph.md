---
description: Build the next highest prio with Ralph
agent: build
model: github-copilot/claude-sonnet-4.5
---

Use @plans/prd.json @plans/progress.md

1. Find the highest priority feature to work on and work only on that feature. This should be the one YOU decide has the highest priority - not necessarily the first one in the list.
2. Verify that everything works as intended
   - We can build: bun run build
   - Tests pass: bun test
   - To test the frontend: Use the skill @.agents/skill/agent-browser
     - Start a dev server at port 4200
     - Use the agent-browser skill to verify the localhost:4200 app
3. Update the PRD with the work that was done.
4. Append your progress to the progress.md file. Use this to leave a note for the next person working in the codebase. KEEP IT EXTREMELY CONCISE. Sacrifice grammar for the sake of concision.
5. If everything looks good commit the changes with a descriptive message following conventional commits.

ONLY WORK ON A SINGLE FEATURE.
If, while implementing the feature, you notice the PRD is complete, output <promise>COMPLETE</promise>
