import type { Addon } from "../types/exports";

import * as addons from '../../data/exports'

/**
 * Load all addon export data.
 * This provides type-safe access to all addon configurations.
 */
export function loadAllExports(): Addon[] {
  return Object.values(addons);
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
export function getAddonById(id: string): Addon | undefined {
  const allExports = loadAllExports();
  return allExports.find(addon => addon.id === id);
}
