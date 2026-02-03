import type { AddonCategory } from "../types/exports";

// Fallback imports for test environment (Bun doesn't support import.meta.glob)
import detailsData from "../../data/exports/details";
import platynatorData from "../../data/exports/platynator";
import senseiResourceBarData from "../../data/exports/sensei-resource-bar";
import waypointUiData from "../../data/exports/waypoint-ui";
import baganatorData from "../../data/exports/baganator";
import blizzhudtweaksData from "../../data/exports/blizzhudtweaks";
import cooldownManagerData from "../../data/exports/cooldown-manager";

// Automatically import all TypeScript files from data/exports directory
// This uses Vite's glob import feature for build-time static analysis
let modules: Record<string, { default: AddonCategory }>;

if (typeof import.meta.glob === "function") {
  // Vite/production environment - use glob imports for automatic discovery
  modules = import.meta.glob<{ default: AddonCategory }>(
    "../../data/exports/*.ts",
    { eager: true }
  );
} else {
  // Test environment - use fallback imports
  // Note: In production, new addons are auto-detected via glob
  modules = {
    "platynator": { default: platynatorData },
    "details": { default: detailsData },
    "sensei-resource-bar": { default: senseiResourceBarData },
    "waypoint-ui": { default: waypointUiData },
    "baganator": { default: baganatorData },
    "blizzhudtweaks": { default: blizzhudtweaksData },
    "cooldown-manager": { default: cooldownManagerData },
  };
}

/**
 * Load all addon export data from TypeScript files at build time.
 * This provides type-safe access to all addon configurations.
 * Addons are automatically discovered in production - no manual imports needed.
 */
export function loadAllExports(): AddonCategory[] {
  return Object.values(modules).map(module => module.default);
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
