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
  fade: 'fade',
} as const;

export const category = {
  core: 'core',
  misc: 'misc',
  retired: 'retired',
} as const;

/**
 * Type for addon categories derived from category constants
 */
export type CategoryTag = typeof category[keyof typeof category];

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
  tags?: [CategoryTag, ...TagType[]];
}

export interface Addon {
  /** Unique identifier for the addon (matches filename without .json) */
  id: string;
  /** Display name for the addon */
  name: string;
  /** Single export configuration for this addon */
  export: AddonExport;
}
