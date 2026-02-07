import { useState, useEffect, useRef } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { CarouselIndicators } from '@/components/carousel-indicators';
import { MediaCarouselItem } from '@/components/media-carousel-item';
import type { AddonExport } from '@/types/exports';

interface ExportCardProps {
  export: AddonExport;
  addonId: string;
}

export function ExportCard({ export: exportData, addonId }: ExportCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentMediaDuration, setCurrentMediaDuration] = useState(5000); // Default 5s for images
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaItems = exportData.media ?? [];
  const hasImages = mediaItems.length > 0;
  const hasMultipleImages = mediaItems.length > 1;

  // Auto-cycle through media items based on current item duration
  useEffect(() => {
    if (!hasMultipleImages || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % mediaItems.length);
    }, currentMediaDuration);

    return () => clearInterval(interval);
  }, [hasMultipleImages, isHovered, currentMediaDuration, mediaItems.length]);

  // Prefers-reduced-motion check
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && hasMultipleImages) {
      // Stop cycling if user prefers reduced motion
      setIsHovered(true);
    }
  }, [hasMultipleImages]);

  return (
    <Card
      ref={cardRef}
      className="relative overflow-hidden group !p-0 min-h-[240px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Media Layer */}
      {hasImages ? (
        <div className="absolute inset-0">
          {mediaItems.map((mediaItem, index) => (
            <MediaCarouselItem
              key={mediaItem.url}
              mediaItem={mediaItem}
              alt={`${exportData.name} preview ${index + 1}`}
              isActive={index === currentImageIndex}
              objectCover={true}
              onVideoDurationChange={(duration) => {
                // Only update duration when this video becomes active
                if (index === currentImageIndex) {
                  setCurrentMediaDuration(duration * 1000); // Convert to milliseconds
                }
              }}
              onImageActive={() => {
                // Reset to default 5s duration when image becomes active
                if (index === currentImageIndex && mediaItem.type === 'image') {
                  setCurrentMediaDuration(5000);
                }
              }}
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-700 ease-in-out
                ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
              `}
            />
          ))}
        </div>
      ) : (
        // Fallback gradient background when no media
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30" />
      )}

      {/* Gradient overlay - bottom-heavy for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        <CardTitle className="text-white drop-shadow-lg text-base leading-snug">{exportData.name}</CardTitle>
        <p className="text-white/50 text-xs mt-1 line-clamp-1">
          {exportData.description}
        </p>
      </div>

      {/* Action buttons - top right */}
      <div className="absolute top-3 right-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-200 motion-reduce:transition-none">
        {exportData.downloadUrl && (
          <Button variant="default" size="icon" asChild title="Download addon">
            <a
              href={exportData.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download addon"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="h-4 w-4" />
            </a>
          </Button>
        )}
        {exportData.exportString ? (
          <CopyButton text={exportData.exportString} />
        ) : exportData.externalUrl ? (
          <Button variant="default" size="icon" asChild title="View on external site">
            <a
              href={exportData.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open external guide"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : null}
      </div>

      {/* Image indicator dots - positioned above bottom text */}
      {hasMultipleImages && (
        <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 z-10">
          <CarouselIndicators
            totalImages={mediaItems.length}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
            stopPropagation
          />
        </div>
      )}
    </Card>
  );
}
