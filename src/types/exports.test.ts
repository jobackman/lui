import { expect, test } from 'bun:test';
import { category, edition } from '@/types/exports';
import type { Addon, AddonConfiguration, GameEdition } from '@/types/exports';

const retailConfiguration = {
  name: 'Example addon',
  description: 'Retail layout',
  exports: 'retail-profile',
  lastUpdated: '2026-02-01T00:00:00.000Z',
  tags: [category.core],
} satisfies AddonConfiguration;

const foreverConfiguration = {
  name: 'Example addon',
  description: 'Forever layout',
  exports: 'forever-profile',
  lastUpdated: '2026-02-02T00:00:00.000Z',
  tags: [category.misc],
} satisfies AddonConfiguration;

function makeAddon(editions: Addon['editions']): Addon {
  return { id: 'example', name: 'Example addon', editions };
}

test('edition constants identify Retail and Forever', () => {
  const editions: GameEdition[] = [edition.retail, edition.forever];
  expect(editions).toEqual(['retail', 'forever']);
});

test('addons can publish only Retail or only Forever', () => {
  const retail = makeAddon({ [edition.retail]: retailConfiguration });
  const forever = makeAddon({ [edition.forever]: foreverConfiguration });

  expect(retail.editions.retail).toEqual(retailConfiguration);
  expect(retail.editions.forever).toBeUndefined();
  expect(forever.editions.forever).toEqual(foreverConfiguration);
  expect(forever.editions.retail).toBeUndefined();
});

test('dual-edition configurations keep exports, categories, and timestamps independent', () => {
  const addon = makeAddon({
    [edition.retail]: retailConfiguration,
    [edition.forever]: foreverConfiguration,
  });

  expect(addon.editions.retail?.exports).toBe('retail-profile');
  expect(addon.editions.forever?.exports).toBe('forever-profile');
  expect(addon.editions.retail?.tags?.[0]).toBe(category.core);
  expect(addon.editions.forever?.tags?.[0]).toBe(category.misc);
  expect(addon.editions.retail?.lastUpdated).not.toBe(addon.editions.forever?.lastUpdated);
});

test('download-only recommendations publish support without an export or external guide', () => {
  const configuration: AddonConfiguration = {
    name: 'Default settings addon',
    description: 'Download and use the defaults',
    downloadUrl: 'https://example.com/addon',
    lastUpdated: '2026-02-01T00:00:00.000Z',
  };
  const addon = makeAddon({ [edition.forever]: configuration });

  expect(addon.editions.forever).toBeDefined();
  expect(addon.editions.forever?.downloadUrl).toBe(configuration.downloadUrl);
  expect(addon.editions.forever?.exports).toBeUndefined();
  expect(addon.editions.forever?.externalUrl).toBeUndefined();
});

test('one configuration can define multiple named export types', () => {
  const configuration: AddonConfiguration = {
    ...retailConfiguration,
    exports: [
      { name: 'Settings', value: 'settings-profile' },
      { name: 'Resource bars', value: 'resource-profile' },
    ],
  };
  const addon = makeAddon({ [edition.retail]: configuration });
  expect(addon.editions.retail?.exports).toEqual(configuration.exports);
});

// These constraints are verified by TypeScript, not Bun's transpiler.
function verifyTypeConstraints(): void {
  const invalidEdition: Addon['editions'] = {
    // @ts-expect-error Unknown editions cannot be published.
    classic: retailConfiguration,
  };
  const multipleProfiles: Addon['editions'] = {
    // @ts-expect-error Each edition accepts one configuration, not a profile array.
    retail: [retailConfiguration, retailConfiguration],
  };
  // @ts-expect-error Published configurations require an independent timestamp.
  const missingTimestamp: AddonConfiguration = {
    name: 'Invalid configuration',
    description: 'Missing timestamp',
  };
  const unnamedExport: AddonConfiguration = {
    ...retailConfiguration,
    // @ts-expect-error Entries in a named list require a display name.
    exports: [{ value: 'profile' }],
  };
  void unnamedExport;
  void invalidEdition;
  void multipleProfiles;
  void missingTimestamp;
}
void verifyTypeConstraints;
