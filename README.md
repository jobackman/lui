# LucyUI — WoW addon configurations

A Bun + React + TypeScript site for edition-specific WoW addon recommendations and configurations.

```bash
bun install
bun run dev
bun test
bun run build
```

Production: `bun run start`. Build output: `dist/`.

## Game editions

Choose **Retail** or **WoW Forever** using the homepage/detail-page switcher. The URL is authoritative (`/?edition=forever`, `/a/details?edition=retail`); visits without an edition use the remembered preference, otherwise Retail. Invalid URL editions normalize to Retail.

An addon appears only when a configuration has been published for that edition. A configuration can recommend downloading the addon and using defaults without providing an export string. Missing configurations never fall back to another edition.

Platynator and EQoL are published for Forever, with independent copies of their Retail configurations as starting points for later updates. Other migrated entries remain Retail-only. Add further Forever configurations only after confirming compatibility.

## Adding an addon or edition

1. Create an `AddonConfiguration` in `data/exports/<edition>/<addon-id>.ts`.
2. Create/update the shared `Addon` in `data/exports/<addon-id>.ts` to import that configuration into its `editions` map.
3. For a new addon, export its shared definition from `data/exports/index.ts`.
4. Run `bun test` and `bun run build`; check the selected edition's listing, links, and detail page.

Edition-specific configuration example:

```ts
// data/exports/forever/example.ts
import type { AddonConfiguration } from '../../../src/types/exports';
import { category, tag } from '../../../src/types/exports';

export const exampleForever: AddonConfiguration = {
  name: 'Example',
  description: 'Download and use the defaults.',
  lastUpdated: '2026-01-01T00:00:00.000Z',
  downloadUrl: 'https://example.com/verified-forever-download',
  tags: [category.misc, tag.ui],
};
```

Shared identity:

```ts
// data/exports/example.ts
import type { Addon } from '../../src/types/exports';
import { edition } from '../../src/types/exports';
import { exampleForever } from './forever/example';

export const example: Addon = {
  id: 'example',
  name: 'Example',
  editions: { [edition.forever]: exampleForever },
};
```

Each edition accepts one configuration, not an array of profiles. Tags are optional; when provided, the first tag is a category (`core`, `misc`, or `retired`). Include category tags for homepage grouping. Export strings, download/source URLs, instructions, media (`{ type: 'image' | 'video', url }`), tags, and timestamps are independent per edition.

## Setup instructions

`setupInstructions` supports Markdown: links (`[label](https://example.com)`), numbered/bulleted lists, **bold**, *emphasis*, inline code, and fenced code blocks. Existing plain-text line breaks are preserved. Links open in a new tab; raw HTML and embedded images are disabled (use `media` for images).

## Copyable exports

Use `exports` for either a single string or a list of named strings within an edition's configuration:

```ts
// Most addons: one copy action
exports: 'your-export-string',

// Addons with multiple export types (e.g. EQoL)
exports: [
  { name: 'Settings', value: 'your-settings-string' },
  { name: 'Resource bars', value: 'your-resource-bar-string' },
],
```

A plain string keeps the standard **Copy** action. Named entries display separate **Copy Settings**, **Copy Resource bars**, etc. buttons on cards, featured addons, and detail pages, in definition order. Each button copies only its own value. A named list with one entry is also valid.

Omit `exports` for download-only recommendations. Empty lists and blank values produce no copy actions. Export contents are copied verbatim. For long strings, you can keep values in separate TypeScript modules and import them into the configuration.

## Timestamp automation

The pre-commit hook updates timestamps for changed **staged** configurations recursively under `data/exports/`. It ignores timestamp-only edits and shared identity/catalog files, and preserves unrelated unstaged changes. Unchanged legacy configurations moved to the Retail directory retain their historical timestamps.

```bash
bun run update-timestamps
bun run update-timestamps:all
bun run update-timestamps --force retail/details.ts
```

See [scripts/README.md](scripts/README.md) for forced-update and partial-staging behaviour. The implementation checklist is in [plans/wow-editions-plan.md](plans/wow-editions-plan.md).
