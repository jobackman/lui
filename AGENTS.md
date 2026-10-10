# Lui - WoW Addon Export Manager

Agent instructions for working on this Bun + React + TypeScript project.

## Commands

### Development

- **Dev server**: `bun run dev` or `bun --hot src/index.ts`
- **Production**: `NODE_ENV=production bun src/index.ts` or `bun run start`
- **Build**: `bun run build` (outputs to `dist/`)

### Testing

- **Run all tests**: `bun test`
- **Run single test file**: `bun test src/lib/loadExports.test.ts`
- **Run tests matching pattern**: `bun test <pattern>` (e.g., `bun test copy-button`)
- **Filter by test name**: `bun test -t "specific test name"`
- **Watch mode**: Use `bun --hot` for dev (no separate test watch mode needed)
- **Update snapshots**: `bun test -u` or `bun test --update-snapshots`
- **agent-browser** Use the agent-browser skill to test the frontend

### Utilities

- **Update timestamps**: `bun run update-timestamps` (for modified exports only)
- **Update all timestamps**: `bun run update-timestamps:all`

### Git Hooks

**Husky pre-commit hook** automatically updates `lastUpdated` timestamps for modified addon export files:

- Runs `bun run update-timestamps` before each commit
- Auto-stages timestamp changes (includes them in current commit)
- Recursively processes staged configuration files under `data/exports/`; skips shared definitions without timestamps
- Updates the Git index without staging unrelated unstaged edits
- Skips silently when no export files are modified
- Prevents manual timestamp errors

**How it works:**
1. You modify an addon export file (e.g., change description, add images, update tags)
2. Stage the file with `git add data/exports/retail/addon-name.ts`
3. Create a commit with `git commit -m "message"`
4. Hook automatically updates `lastUpdated` field and includes it in your commit

**Note:** The timestamp script only updates files with actual content changes (ignoring timestamp-only modifications) to prevent infinite loops.

## TypeScript Configuration

**Strict mode enabled** with these key settings:

- `strict: true` - All strict type checking enabled
- `noUncheckedIndexedAccess: true` - Array/object access returns `T | undefined`
- `noFallthroughCasesInSwitch: true` - Switch cases must break/return
- `noImplicitOverride: true` - Must use `override` keyword
- `target: "ESNext"` - Latest JavaScript features
- `module: "Preserve"` - Modern module syntax
- `moduleResolution: "bundler"` - Bun's bundler resolution
- `jsx: "react-jsx"` - New JSX transform (no React import needed)

**Path aliases**: `@/*` maps to `./src/*`

## Code Style

### File Naming

- **Components**: kebab-case files, PascalCase exports
  - File: `copy-button.tsx` → Export: `export function CopyButton()`
- **Utilities/libs**: kebab-case (e.g., `load-exports.ts`, `format-relative-time.ts`)
- **Types**: PascalCase interfaces (e.g., `Addon`, `AddonConfiguration`, `ResolvedAddon`)
- **Tests**: `*.test.ts` or `*.test.tsx`

### Imports

- Use `@/` alias for src imports: `import { cn } from '@/lib/utils'`
- Group imports: external libs first, then `@/` imports
- Use `type` imports for types: `import type { ResolvedAddon } from '@/types/exports'`
- Named exports preferred over default exports (except React components can use either)

```tsx
import { useState } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ResolvedAddon } from '@/types/exports';
```

### TypeScript Patterns

- Always type function parameters and return values
- Use `interface` for object shapes, `type` for unions/intersections
- Leverage type narrowing with guards (e.g., `if (addon)` for undefined checks)
- Optional chaining for nullable access: `addon?.configuration.tags`
- Array access returns `T | undefined` due to `noUncheckedIndexedAccess`

```ts
// Good: explicit types
export function getAddonById(id: string): ResolvedAddon | undefined {
  const allExports = loadAllExports();
  return allExports.find((addon) => addon.id === id);
}

// Good: type imports
import type { AddonConfiguration } from '@/types/exports';

// Good: handling array access
const firstAddon = addons[0]; // type is ResolvedAddon | undefined
if (firstAddon) {
  console.log(firstAddon.name);
}
```

### React Patterns

- Function components with named exports
- Type props with `type` or `interface`
- Use React 19's new JSX transform (no `import React` needed for JSX)
- Destructure props in function signature
- Use `cn()` utility for conditional classes (from `@/lib/utils`)

```tsx
export type CopyButtonProps = ButtonProps & {
  text?: string;
  onCopy?: () => void;
  showIcon?: boolean;
};

export function CopyButton({ text, onCopy, className, showIcon = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  return <Button className={cn('transition-all', className)}>...</Button>;
}
```

### Comments

- **Minimal comments**: Only when intention is unclear
- **JSDoc**: Use for public APIs and exported functions
- **Inline**: Avoid obvious comments like "set state" or "return value"
- **Context**: Explain "why" not "what" when needed

```ts
// Good: explains non-obvious behavior
try {
  await navigator.clipboard.writeText(text);
} catch (err) {
  // Fallback for older browsers or permission denied
  const textArea = document.createElement('textarea');
  // ...
}

// Bad: obvious comment
setCopied(true); // Set copied to true
```

### Error Handling

- Use try-catch for async operations
- Provide user-friendly error messages
- Console.error for debugging, not user-facing errors
- Handle edge cases (permissions, browser support, null/undefined)

```ts
try {
  await navigator.clipboard.writeText(text);
  setCopied(true);
} catch (err) {
  // Fallback for older browsers
  console.error('Failed to copy text:', err);
}
```

## Bun-Specific Patterns

### Runtime

- Use `bun <file>` not `node <file>` or `ts-node <file>`
- Use `bunx` not `npx`
- No dotenv needed - `.env` auto-loaded

### APIs (Bun built-ins)

- **Server**: `Bun.serve()` with routes, WebSockets, HMR
- **SQLite**: `bun:sqlite` not `better-sqlite3`
- **File I/O**: `Bun.file()` preferred over `node:fs`
- **Shell**: `Bun.$\`command\``instead of`execa`
- **Testing**: `bun:test` with `test()` and `expect()`

### Frontend with Bun.serve()

- Import HTML files directly: `import index from "./index.html"`
- HTML can import `.tsx`, `.jsx`, `.ts` - auto-bundled
- CSS imports work in both HTML and TS/TSX
- HMR enabled in dev mode
- No Vite/Webpack needed

## Project Structure

```
src/
├── index.ts              # Bun.serve() server entry
├── index.html            # Main HTML entry (imported by index.ts)
├── components/           # React components (kebab-case files)
│   ├── ui/              # shadcn/ui components
│   └── *.tsx            # Custom components
├── lib/                 # Utilities and helpers
├── types/               # TypeScript type definitions
└── contexts/            # React contexts

data/
└── exports/             # Shared Addon definitions and index.ts
    ├── retail/          # Retail AddonConfiguration files
    └── forever/         # Verified Forever configurations, when published

plans/
├── prd.json            # Product requirements
└── progress.md         # Progress tracking
```

## Data Management

### Addon configurations (`data/exports/`)

- Top-level files export shared `Addon` identities (`id`, `name`, `editions`); register new identities in `data/exports/index.ts`.
- Edition subdirectories export one `AddonConfiguration` per addon/edition. See `README.md` for complete examples.
- Use `edition.retail` / `edition.forever`, `category`, and `tag` constants from `src/types/exports.ts`.
- Configuration presence publishes support for that edition. No separate compatibility list and no cross-edition fallback.
- Required configuration fields: `name`, `description`, and ISO 8601 `lastUpdated`.
- Optional fields: `exports` (a string or `{ name, value }[]`), `externalUrl`, `downloadUrl`, `media`, `setupInstructions`, `tags`.
- Download-only/default-settings recommendations are valid with no export string.
- When tags are provided, the first tag is `category.core`, `category.misc`, or `category.retired`; use category tags for homepage grouping.
- Media items use `{ type: 'image' | 'video', url: string }`, not an `images` array.
- Use `ResolvedAddon` (`id`, `name`, `edition`, `configuration`) in UI consumers. Resolve through `src/lib/loadExports.ts`, not direct edition fallback logic.
- Use `editionUrl()` for internal navigation and `useEdition()` for active selection. Preserve search parameters when updating the edition/query.
- Only publish Forever configurations after verifying actual compatibility. Existing migrated data is Retail-only.
- Pre-commit timestamps are independent per edition; unchanged legacy-to-Retail migrations preserve original dates. See `scripts/README.md` for staged-content safety.

**Tag constants:** combat, damage, healing, meter, ui, hud, frames, nameplates, resource, cooldowns, raid, mythic, mplus, map, quest, fade. No `tag.misc` constant exists; use `category.misc` as the category.

## Product Requirements Workflow

1. Check `plans/prd.json` for `"passes": false` requirements
2. Implement features according to description and verification steps
3. Mark `"passes": true` when all steps complete
4. Append progress to `plans/progress.md` with date, requirement, status, summary

### PRD Schema

- `category`: Grouping (Data, Infrastructure, UI, Feature, Documentation)
- `description`: What the requirement is
- `steps`: Array of verification steps
- `passes`: Boolean completion status

## Planning Mode

When asked to plan:

- Make plans extremely concise (sacrifice grammar for brevity)
- End with list of unresolved questions, if any
- Break down into actionable, testable steps
