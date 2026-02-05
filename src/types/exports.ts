/**
 * Tag constants for addon categorization
 * Use these instead of string literals for type safety and autocomplete
 * @example
 * import { tag } from '@/types/exports';
 * tags: [tag.ui, tag.nameplates, tag.mythic]
 */
export const tag = {
  // UI & Interface
  ui: 'ui',
  hud: 'hud',
  interface: 'interface',
  improvements: 'improvements',
  native: 'native',
  blizz: 'blizz',
  
  // Combat & Damage
  combat: 'combat',
  damage: 'damage',
  dmg: 'dmg',
  healing: 'healing',
  meter: 'meter',
  details: 'details',
  tracking: 'tracking',
  
  // Class Resources
  resource: 'resource',
  bar: 'bar',
  energy: 'energy',
  mana: 'mana',
  rage: 'rage',
  fury: 'fury',
  combo: 'combo',
  points: 'points',
  shards: 'shards',
  
  // Frames & Plates
  nameplates: 'nameplates',
  frame: 'frame',
  frames: 'frames',
  healthbar: 'healthbar',
  target: 'target',
  focus: 'focus',
  player: 'player',
  
  // PvE Content
  pve: 'pve',
  raid: 'raid',
  dungeon: 'dungeon',
  mythic: 'mythic',
  'mythic+': 'mythic+',
  'm+': 'm+',
  
  // Abilities & Cooldowns
  cd: 'cd',
  cds: 'cds',
  cdm: 'cdm',
  cooldownmanager: 'cooldownmanager',
  
  // World & Navigation
  map: 'map',
  waypoint: 'waypoint',
  pin: 'pin',
  markers: 'markers',
  quest: 'quest',
  npc: 'npc',
  dialog: 'dialog',
  
  // WeakAuras
  wa: 'wa',
  weakaura: 'weakaura',
  luxthos: 'luxthos',
  
  // Visual Effects
  fade: 'fade',
  fading: 'fading',
  visibility: 'visibility',
  color: 'color',
  cursor: 'cursor',
  trail: 'trail',
  
  // Mechanics
  threat: 'threat',
  
  // Modes
  edit: 'edit',
  mode: 'mode',
  
  // General
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
  /** Optional array of image paths for the addon (relative to public folder) */
  images?: string[];
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
  /** Optional category classification (core = essential, misc = optional) */
  category?: AddonCategoryType;
}
