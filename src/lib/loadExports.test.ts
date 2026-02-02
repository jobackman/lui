import { test, expect } from "bun:test";
import { loadAllExports, getAddonManifest, getAddonById } from "./loadExports";

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
  expect(details?.export).toBeDefined();
});

test("loadAllExports includes Platynator addon", () => {
  const exports = loadAllExports();
  const platynator = exports.find(addon => addon.id === "platynator");
  expect(platynator).toBeDefined();
  expect(platynator?.name).toBe("Platynator");
  expect(platynator?.export).toBeDefined();
});

test("getAddonManifest returns list of addon ids and names", () => {
  const manifest = getAddonManifest();
  expect(Array.isArray(manifest)).toBe(true);
  expect(manifest.length).toBe(2);
  
  const ids = manifest.map(item => item.id);
  expect(ids).toContain("details");
  expect(ids).toContain("platynator");
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
  const addonExport = firstAddon.export;
  
  expect(addonExport).toBeDefined();
  expect(addonExport.name).toBeDefined();
  expect(addonExport.description).toBeDefined();
  expect(addonExport.exportString).toBeDefined();
  expect(addonExport.lastUpdated).toBeDefined();
  
  expect(typeof addonExport.name).toBe("string");
  expect(typeof addonExport.description).toBe("string");
  expect(typeof addonExport.exportString).toBe("string");
  expect(typeof addonExport.lastUpdated).toBe("string");
  
  // downloadUrl is optional, but if present should be a string
  if (addonExport.downloadUrl) {
    expect(typeof addonExport.downloadUrl).toBe("string");
  }
});
