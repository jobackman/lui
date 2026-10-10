import * as addons from '../../data/exports';
import { category, edition } from '@/types/exports';
import type { Addon, GameEdition, ResolvedAddon } from '@/types/exports';

const catalog: Addon[] = Object.values(addons);

/** Load the shared catalog, including all published editions. */
export function loadAddonCatalog(): Addon[] {
  return catalog;
}

/** Resolve one edition without ever substituting another edition's configuration. */
export function resolveAddon(addon: Addon, gameEdition: GameEdition): ResolvedAddon | undefined {
  const configuration = addon.editions[gameEdition];
  return configuration ? { id: addon.id, name: addon.name, edition: gameEdition, configuration } : undefined;
}

/** Select only addons published for the requested edition. */
export function selectAddonsForEdition(addonCatalog: readonly Addon[], gameEdition: GameEdition): ResolvedAddon[] {
  return addonCatalog.flatMap((addon) => {
    const resolved = resolveAddon(addon, gameEdition);
    return resolved ? [resolved] : [];
  });
}

/** Load published configurations for an edition; Retail remains the default for old callers. */
export function loadAllExports(gameEdition: GameEdition = edition.retail): ResolvedAddon[] {
  return selectAddonsForEdition(catalog, gameEdition);
}

/** Get the shared identity, allowing callers to distinguish missing IDs from unavailable editions. */
export function getCatalogAddonById(id: string): Addon | undefined {
  return catalog.find((addon) => addon.id === id);
}

/** Get the selected configuration; missing editions do not fall back. */
export function getAddonById(id: string, gameEdition: GameEdition = edition.retail): ResolvedAddon | undefined {
  const addon = getCatalogAddonById(id);
  return addon ? resolveAddon(addon, gameEdition) : undefined;
}

/** Edition-scoped navigation manifest. */
export function getAddonManifest(gameEdition: GameEdition = edition.retail): Array<{ id: string; name: string }> {
  return loadAllExports(gameEdition).map(({ id, name }) => ({ id, name }));
}

/** Search resolved configurations by name and edition-specific tags. */
export function filterAddons(addonList: readonly ResolvedAddon[], query: string): ResolvedAddon[] {
  const normalized = query.trim().toLowerCase();
  return addonList.filter((addon) => !normalized ||
    addon.configuration.name.toLowerCase().includes(normalized) ||
    (addon.configuration.tags?.some((tag) => tag.toLowerCase().includes(normalized)) ?? false));
}

/** Sort using each selected configuration's timestamp. */
export function sortAddonsByDate(addonList: readonly ResolvedAddon[]): ResolvedAddon[] {
  return [...addonList].sort((a, b) => Date.parse(b.configuration.lastUpdated) - Date.parse(a.configuration.lastUpdated));
}

/** Choose a spotlight only from the selected edition's non-retired addons. */
export function getFeaturedAddon(addonList: readonly ResolvedAddon[]): ResolvedAddon | undefined {
  return sortAddonsByDate(addonList.filter((addon) => addon.configuration.tags?.[0] !== category.retired))[0];
}
