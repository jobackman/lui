/**
 * Represents a single WoW addon export configuration
 */
export interface AddonExport {
  /** Display name for this export */
  name: string;
  /** Short description of what this export contains */
  description: string;
  /** The actual export string to be copied to clipboard */
  exportString: string;
  /** ISO 8601 date string of when this export was last updated */
  lastUpdated: string;
  /** Optional download URL for the addon */
  downloadUrl?: string;
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
}
