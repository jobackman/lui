import { expect, test } from 'bun:test';
import { filterAddons, getFeaturedAddon, resolveAddon, selectAddonsForEdition } from '@/lib/loadExports';
import { editionUrl } from '@/lib/game-edition';
import { category } from '@/types/exports';
import type { Addon, AddonConfiguration } from '@/types/exports';

const retail: AddonConfiguration = {
  name: 'Retail frames', description: 'Retail configuration', exports: 'retail-string',
  downloadUrl: 'https://example.com/retail', lastUpdated: '2026-01-01T00:00:00Z',
  media: [{ type: 'image', url: '/retail.png' }], tags: [category.core],
};
const forever: AddonConfiguration = {
  name: 'Forever frames', description: 'Use defaults', downloadUrl: 'https://example.com/forever',
  lastUpdated: '2026-02-01T00:00:00Z', media: [{ type: 'image', url: '/forever.png' }], tags: [category.misc],
};
const fixtures: Addon[] = [
  { id: 'retail-only', name: 'Retail only', editions: { retail } },
  { id: 'forever-only', name: 'Forever only', editions: { forever } },
  { id: 'both', name: 'Both', editions: { retail, forever } },
];

test('edition selection includes only supported addons, including download-only entries', () => {
  expect(selectAddonsForEdition(fixtures, 'retail').map((a) => a.id)).toEqual(['retail-only', 'both']);
  expect(selectAddonsForEdition(fixtures, 'forever').map((a) => a.id)).toEqual(['forever-only', 'both']);
});

test('resolution preserves the selected configuration and never falls back', () => {
  for (const addon of fixtures) {
    expect(resolveAddon(addon, 'retail')?.configuration).toBe(addon.editions.retail);
    expect(resolveAddon(addon, 'forever')?.configuration).toBe(addon.editions.forever);
  }
  expect(resolveAddon(fixtures[0]!, 'forever')).toBeUndefined();
  expect(resolveAddon(fixtures[2]!, 'forever')?.configuration.exports).toBeUndefined();
});

test('featured content and searches operate on the selected edition only', () => {
  const selected = selectAddonsForEdition(fixtures, 'forever');
  expect(getFeaturedAddon(selected)?.edition).toBe('forever');
  expect(filterAddons(selected, 'retail')).toHaveLength(0);
  expect(filterAddons(selected, 'misc')).toHaveLength(2);
  const retired = selected.map((a) => ({ ...a, configuration: { ...a.configuration, tags: [category.retired] as [typeof category.retired] } }));
  expect(getFeaturedAddon(retired)).toBeUndefined();
});

test('internal links include the edition and retain encoded search queries', () => {
  expect(editionUrl('/a/both', 'forever')).toBe('/a/both?edition=forever');
  const url = new URL(editionUrl('/?q=m%2B', 'retail'), 'https://example.com');
  expect(url.searchParams.get('q')).toBe('m+');
  expect(url.searchParams.get('edition')).toBe('retail');
});
