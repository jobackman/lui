import type { AddonCategory } from "../types/exports";
import detailsData from "../../data/exports/details.json";
import platynatorData from "../../data/exports/platynator.json";
import weakaurasGuideData from "../../data/exports/weakauras-guide.json";

/**
 * Load all addon export data from JSON files at build time.
 * This provides type-safe access to all addon configurations.
 */
export function loadAllExports(): AddonCategory[] {
  return [
    detailsData as AddonCategory,
    platynatorData as AddonCategory,
    weakaurasGuideData as AddonCategory,
  ];
}

/**
 * Get a manifest of all available addons (id and name only).
 * Useful for building navigation or displaying available categories.
 */
export function getAddonManifest(): Array<{ id: string; name: string }> {
  const allExports = loadAllExports();
  return allExports.map(addon => ({
    id: addon.id,
    name: addon.name,
  }));
}

/**
 * Get exports for a specific addon by ID.
 * Returns undefined if the addon is not found.
 */
export function getAddonById(id: string): AddonCategory | undefined {
  const allExports = loadAllExports();
  return allExports.find(addon => addon.id === id);
}
