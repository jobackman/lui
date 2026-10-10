import { test, expect } from "bun:test";
import { loadAllExports, getAddonManifest, getAddonById } from "./loadExports";

for (const id of ['platynator', 'eqol']) {
  test(`${id} publishes independent Retail and Forever configurations`, () => {
    const retail = getAddonById(id, 'retail');
    const forever = getAddonById(id, 'forever');
    expect(retail).toBeDefined();
    expect(forever).toBeDefined();
    expect(forever?.edition).toBe('forever');
    expect(forever?.configuration.exports).toBeDefined();
    expect(forever?.configuration).not.toBe(retail?.configuration);
    expect(forever?.configuration.media).not.toBe(retail?.configuration.media);
    expect(forever?.configuration.tags).not.toBe(retail?.configuration.tags);
    expect(getAddonManifest('forever').some((addon) => addon.id === id)).toBe(true);
  });
}

test('EQoL includes the Retail unit-frame export instead of a separate addon', () => {
  const retail = getAddonById('eqol', 'retail');
  const exports = retail?.configuration.exports;
  if (!Array.isArray(exports)) throw new Error('Expected named EQoL exports');

  expect(exports.map((entry) => entry.name)).toEqual(['Full profile', 'Unit frames only']);
  expect(exports.every((entry) => entry.value.length > 0)).toBe(true);
  expect(exports[0]?.value).not.toBe(exports[1]?.value);
  expect(retail?.configuration.setupInstructions).toContain('Profiles -> EQoL Unit Frames');
  expect(retail?.configuration.media).toContainEqual({ type: 'image', url: 'https://i.imgur.com/Bx1KM6C.png' });
  expect(getAddonById('eqol-unitframes', 'retail')).toBeUndefined();
  expect(getAddonManifest('retail').some((addon) => addon.id === 'eqol-unitframes')).toBe(false);
  expect(typeof getAddonById('eqol', 'forever')?.configuration.exports).toBe('string');
});

test("loadAllExports returns array of addon categories", () => {
  const exports = loadAllExports();
  expect(Array.isArray(exports)).toBe(true);
  expect(exports.length).toBeGreaterThan(0);
});

test("loadAllExports includes Details addon", () => {
  const exports = loadAllExports();
  const details = exports.find(addon => addon.id === "details");
  expect(details).toBeDefined();
  expect(details?.name).toBe("Details");
  expect(details?.configuration).toBeDefined();
});

test("loadAllExports includes Platynator addon", () => {
  const exports = loadAllExports();
  const platynator = exports.find(addon => addon.id === "platynator");
  expect(platynator).toBeDefined();
  expect(platynator?.name).toBe("Platynator");
  expect(platynator?.configuration).toBeDefined();
});

test("getAddonManifest returns list of addon ids and names", () => {
  const manifest = getAddonManifest();
  expect(Array.isArray(manifest)).toBe(true);

  const ids = manifest.map(item => item.id);
  expect(ids).toContain("details");
  expect(ids).toContain("platynator");
  expect(ids).toContain("edit-mode");
});

test("getAddonById returns correct addon for valid id", () => {
  const details = getAddonById("details");
  expect(details).toBeDefined();
  expect(details?.id).toBe("details");
  expect(details?.name).toBe("Details");
});

test("getAddonById returns undefined for invalid id", () => {
  const invalid = getAddonById("nonexistent");
  expect(invalid).toBeUndefined();
});

test("export data has correct structure", () => {
  const exports = loadAllExports();
  const firstAddon = exports[0];
  if (!firstAddon) throw new Error('Expected a published Retail addon');
  const addonExport = firstAddon.configuration;

  expect(addonExport).toBeDefined();
  expect(addonExport.name).toBeDefined();
  expect(addonExport.description).toBeDefined();
  expect(addonExport.lastUpdated).toBeDefined();

  expect(typeof addonExport.name).toBe("string");
  expect(typeof addonExport.description).toBe("string");
  expect(typeof addonExport.lastUpdated).toBe("string");

  if (typeof addonExport.exports === 'string') {
    expect(addonExport.exports.length).toBeGreaterThan(0);
  } else if (addonExport.exports) {
    for (const entry of addonExport.exports) {
      expect(typeof entry.name).toBe('string');
      expect(typeof entry.value).toBe('string');
    }
  }

  // externalUrl is optional, but if present should be a string
  if (addonExport.externalUrl) {
    expect(typeof addonExport.externalUrl).toBe("string");
  }

  // downloadUrl is optional, but if present should be a string
  if (addonExport.downloadUrl) {
    expect(typeof addonExport.downloadUrl).toBe("string");
  }
});

test("sensei-resource-bar addon includes both its source and published export", () => {
  const senseiResourceBar = getAddonById("sensei-resource-bar");
  expect(senseiResourceBar).toBeDefined();
  expect(senseiResourceBar?.configuration.externalUrl).toBeDefined();
  expect(typeof senseiResourceBar?.configuration.externalUrl).toBe("string");
  expect(typeof senseiResourceBar?.configuration.exports).toBe('string');
});
