import type { AddonExport, MediaItem } from '@/types/exports';

/**
 * Normalizes media items from an addon export, supporting both legacy `images` 
 * field and new `media` field for backward compatibility
 * 
 * @param exportData - The addon export data
 * @returns Array of MediaItem objects
 */
export function normalizeMedia(exportData: AddonExport): MediaItem[] {
  // If media field exists, use it (new format)
  if (exportData.media && exportData.media.length > 0) {
    return exportData.media;
  }
  
  // Fall back to images field (legacy format)
  if (exportData.images && exportData.images.length > 0) {
    return exportData.images.map((url) => ({
      type: 'image' as const,
      url,
    }));
  }
  
  return [];
}
