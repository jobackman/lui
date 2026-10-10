import { edition } from '@/types/exports';
import type { GameEdition } from '@/types/exports';

export const EDITION_STORAGE_KEY = 'lui-game-edition';
export const editionLabels: Record<GameEdition, string> = {
  retail: 'Retail',
  forever: 'Forever',
};

/** Validate URL/storage values before they enter application state. */
export function isGameEdition(value: string | null): value is GameEdition {
  return value === edition.retail || value === edition.forever;
}

/** Explicit URL values win; an invalid explicit value resets to Retail. */
export function resolveGameEdition(urlValue: string | null, rememberedValue: string | null): GameEdition {
  if (urlValue !== null) return isGameEdition(urlValue) ? urlValue : edition.retail;
  return isGameEdition(rememberedValue) ? rememberedValue : edition.retail;
}

/** Build an edition-specific internal URL, retaining other query parameters. */
export function editionUrl(path: string, gameEdition: GameEdition): string {
  const [pathname, search = ''] = path.split('?');
  const params = new URLSearchParams(search);
  params.set('edition', gameEdition);
  return `${pathname}?${params.toString()}`;
}

/** Copy parameters before updating, so search and edition changes cannot erase one another. */
export function updateSearchParameter(params: URLSearchParams, key: string, value: string): URLSearchParams {
  const next = new URLSearchParams(params);
  if (value) next.set(key, value);
  else next.delete(key);
  return next;
}

export interface EditionStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** Storage can be denied in private browsing; preference failure is non-fatal. */
export function readRememberedEdition(storage: EditionStorage): string | null {
  try { return storage.getItem(EDITION_STORAGE_KEY); }
  catch { return null; }
}

/** Persist preferences without preventing navigation if storage is unavailable. */
export function rememberEdition(storage: EditionStorage, gameEdition: GameEdition): void {
  try { storage.setItem(EDITION_STORAGE_KEY, gameEdition); }
  catch { /* URL state remains usable when storage is denied. */ }
}
