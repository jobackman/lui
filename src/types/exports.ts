/**
 * Simplified tag constants for addon categorization
 * Use these instead of string literals for type safety and autocomplete
 * @example
 * import { tag } from '@/types/exports';
 * tags: [tag.ui, tag.nameplates, tag.mythic]
 */
export const tag = {
  // Combat & Performance
  combat: 'combat',
  damage: 'damage',
  healing: 'healing',
  meter: 'meter',
  
  // UI & Visual
  ui: 'ui',
  hud: 'hud',
  frames: 'frames',
  nameplates: 'nameplates',
  
  // Resources & Abilities
  resource: 'resource',
  cooldowns: 'cooldowns',
  
  // Content
  raid: 'raid',
  mythic: 'mythic+',
  
  // Utility
  map: 'map',
  quest: 'quest',
  misc: 'misc',
} as const;

/**
 * Category constants for addon organization
 * Use these to categorize addons as core (essential) or misc (optional)
 */
export const category = {
  core: 'core',
  misc: 'misc',
} as const;

/**
 * Type for addon categories derived from category constants
 */
export type AddonCategoryType = typeof category[keyof typeof category];

/**
 * Type for tags derived from tag constants
 */
export type TagType = typeof tag[keyof typeof tag];

/**
 * Represents a media item (image or video) with type metadata
 */
export interface MediaItem {
  /** Type of media - 'image' or 'video' */
  type: 'image' | 'video';
  /** URL or path to the media file (relative to public folder) */
  url: string;
}

/**
 * Represents a single WoW addon export configuration
 */
export interface AddonExport {
  /** Display name for this export */
  name: string;
  /** Short description of what this export contains */
  description: string;
  /** The actual export string to be copied to clipboard (optional if externalUrl is provided) */
  exportString?: string;
  /** External URL where users can find the export string (e.g., WoWHead, Icy Veins, external guide) */
  externalUrl?: string;
  /** ISO 8601 date string of when this export was last updated */
  lastUpdated: string;
  /** Optional download URL for the addon */
  downloadUrl?: string;
  /** Optional array of media items (images and videos) for the addon */
  media?: MediaItem[];
  /** Optional setup/import instructions for the addon (supports markdown) */
  setupInstructions?: string;
  /** Optional array of tags for categorization and search - use tag constants for type safety */
  tags?: TagType[];
}

/**
 * Represents a category of addon exports (e.g., Details, Platynator)
 */
export interface AddonCategory {
  /** Unique identifier for the addon (matches filename without .json) */
  id: string;
  /** Display name for the addon */
  name: string;
  /** Single export configuration for this addon */
  export: AddonExport;
  /** Category classification (core = essential, misc = optional) */
  category: AddonCategoryType;
}
