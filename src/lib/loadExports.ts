import type { AddonCategory } from "../types/exports";

// Direct imports for all addon files
import blizzhudtweaksData from "../../data/exports/blizzhudtweaks";
import cooldownManagerData from "../../data/exports/cooldown-manager";
import cooldownManagerCenteredData from "../../data/exports/cooldown-manager-centered";
import detailsData from "../../data/exports/details";
import editModeData from "../../data/exports/edit-mode";
import healthbarColorData from "../../data/exports/healthbar-color";
import platynatorData from "../../data/exports/platynator";
import senseiResourceBarData from "../../data/exports/sensei-resource-bar";
import waypointUiData from "../../data/exports/waypoint-ui";

// Array of all addons for direct access
const addons: AddonCategory[] = [
  blizzhudtweaksData,
  cooldownManagerData,
  cooldownManagerCenteredData,
  detailsData,
  editModeData,
  healthbarColorData,
  platynatorData,
  senseiResourceBarData,
  waypointUiData,
];

/**
 * Load all addon export data.
 * This provides type-safe access to all addon configurations.
 */
export function loadAllExports(): AddonCategory[] {
  return addons;
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
