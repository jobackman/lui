import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { SnapCarousel } from '@/components/snap-carousel';
import { Card, CardTitle } from '@/components/ui/card';
import { ExportCopyButtons } from '@/components/export-copy-buttons';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { CarouselIndicators } from '@/components/carousel-indicators';
import { MediaCarouselItem } from '@/components/media-carousel-item';
import type { AddonConfiguration } from '@/types/exports';

interface ExportCardProps {
  export: AddonConfiguration;
  addonId: string;
}

export function ExportCard({ export: exportData, addonId }: ExportCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const reducedMotion = useReducedMotion();
  const [currentMediaDuration, setCurrentMediaDuration] = useState(5000); // Default 5s for images
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaItems = exportData.media ?? [];
  const hasImages = mediaItems.length > 0;
  const hasMultipleImages = mediaItems.length > 1;

  // Auto-cycle through media items based on current item duration
  useEffect(() => {
    if (!hasMultipleImages || isHovered || hasInteracted || reducedMotion) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % mediaItems.length);
    }, currentMediaDuration);

    return () => clearInterval(interval);
  }, [hasMultipleImages, isHovered, hasInteracted, reducedMotion, currentMediaDuration, mediaItems.length, currentImageIndex]);

  return (
    <Card
      ref={cardRef}
      className="relative overflow-hidden group !p-0 min-h-[240px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Media Layer */}
      {hasImages ? (
        <SnapCarousel className="absolute inset-0" label={`${exportData.name} previews`} currentIndex={currentImageIndex} onIndexChange={setCurrentImageIndex} onInteract={() => setHasInteracted(true)}>
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
              className="w-full h-full object-cover"
            />
          ))}
        </SnapCarousel>
      ) : (
        // Fallback gradient background when no media
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30" />
      )}

      {/* Gradient overlay - bottom-heavy for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pointer-events-none">
        <CardTitle className="text-white drop-shadow-lg text-base leading-snug">{exportData.name}</CardTitle>
        <p className="text-white/50 text-xs mt-1 line-clamp-1">{exportData.description}</p>
      </div>

      {/* Action buttons - top right */}
      <div className="absolute top-3 left-3 right-3 z-10 pointer-events-none [&>*]:pointer-events-auto flex flex-wrap justify-end gap-1.5 items-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-200 motion-reduce:transition-none">
        <ExportCopyButtons exports={exportData.exports} />
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
        {exportData.externalUrl && (
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
        )}
      </div>

      {/* Image indicator dots - positioned above bottom text */}
      {hasMultipleImages && (
        <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 z-10">
          <CarouselIndicators
            totalImages={mediaItems.length}
            currentIndex={currentImageIndex}
            onIndexChange={(index) => { setHasInteracted(true); setCurrentImageIndex(index); }}
            stopPropagation
          />
        </div>
      )}
    </Card>
  );
}
