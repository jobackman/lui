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
  mplus: 'm+',

  // Utility
  map: 'map',
  quest: 'quest',
  fade: 'fade',
} as const;

/** Supported game editions; configuration presence determines published support. */
export const edition = {
  retail: 'retail',
  forever: 'forever',
} as const;

export type GameEdition = typeof edition[keyof typeof edition];

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
 * Edition-specific addon configuration, including download-only recommendations.
 */
export interface AddonConfiguration {
  /** Display name for this export */
  name: string;
  /** Short description of what this export contains */
  description: string;
  /** Optional copyable configuration; download-only recommendations need no export string. */
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

/** Shared addon identity with at most one configuration per game edition. */
export interface Addon {
  /** Unique identifier shared across editions. */
  id: string;
  name: string;
  /** An entry publishes support for that edition, even without a copyable export. */
  editions: Partial<Record<GameEdition, AddonConfiguration>>;
}

/** A published configuration resolved for exactly one edition. */
export interface ResolvedAddon {
  id: string;
  name: string;
  edition: GameEdition;
  configuration: AddonConfiguration;
}
