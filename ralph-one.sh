#!/bin/bash

opencode \
  --output-format stream-json \
  --approval-mode full-auto \
  --model github-copilot/claude-sonnet-4.5 \
  "@plans/prd.json @plans/progress.md \
  1. Read the PRD and progress file. \
  2. Find the next incomplete task that YOU find to be the most important and implement it. \
  3. Update progress.md with what you did. \
  ONLY DO ONE TASK AT A TIME."
