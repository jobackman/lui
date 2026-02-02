import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardAction, CardDescription } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Download, ExternalLink } from "lucide-react";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { AddonExport } from "@/types/exports";

interface ExportCardProps {
  export: AddonExport;
  addonId: string;
}

export function ExportCard({ export: exportData, addonId }: ExportCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const images = exportData.images || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  // Set view-transition-name using ref
  useEffect(() => {
    if (cardRef.current) {
      (cardRef.current.style as any).viewTransitionName = `card-${addonId}`;
    }
  }, [addonId]);

  // Auto-cycle through images every 5 seconds when not hovered
  useEffect(() => {
    if (!hasMultipleImages || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, isHovered, images.length]);

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
      className="relative overflow-hidden group !p-0 min-h-[300px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Layer */}
      {hasImages ? (
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${exportData.name} preview ${index + 1}`}
              loading="lazy"
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-700 ease-in-out
                ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
              `}
            />
          ))}
        </div>
      ) : (
        // Fallback gradient background when no images
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30" />
      )}

      {/* Bottom gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />

      {/* Buttons positioned at top-right */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {exportData.downloadUrl && (
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="glass-strong hover:bg-white/30 text-white transition-all duration-300 ease-out motion-reduce:transition-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
            title="Download addon"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={exportData.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download addon"
            >
              <Download className="h-4 w-4" />
            </a>
          </Button>
        )}
        {exportData.exportString ? (
          <CopyButton 
            text={exportData.exportString}
            className="glass-strong hover:bg-white/30 text-white transition-all duration-300 ease-out motion-reduce:transition-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
          />
        ) : exportData.externalUrl ? (
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="glass-strong hover:bg-white/30 text-white transition-all duration-300 ease-out motion-reduce:transition-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
            title="View on external site"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={exportData.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open external guide"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : null}
      </div>

      {/* Collapsed view - Title at bottom */}
      <CardHeader className="absolute bottom-0 left-0 right-0 z-10 pb-6">
        <CardTitle className="text-white drop-shadow-lg shadow-black">
          {exportData.name}
        </CardTitle>
        <p className="text-white/80 text-sm drop-shadow-md mt-2">
          Updated {formatRelativeTime(exportData.lastUpdated)}
        </p>
        {/* Tags */}
        {exportData.tags && exportData.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {exportData.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </CardHeader>

      {/* Image indicator dots */}
      {hasMultipleImages && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-0.5 px-1.5 py-1 glass-subtle rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className="p-1.5 [@media(hover:none)]:p-2 [@media(hover:none)]:min-w-[44px] [@media(hover:none)]:min-h-[44px] flex items-center justify-center"
              aria-label={`View image ${index + 1} of ${images.length}`}
              title={`Image ${index + 1} of ${images.length}`}
            >
              <div
                className={`
                  transition-all duration-300 ease-out rounded-full
                  motion-reduce:transition-none
                  ${
                    index === currentImageIndex
                      ? 'w-1.5 h-1.5 bg-white shadow-lg shadow-white/50'
                      : 'w-1 h-1 bg-white/40 hover:bg-white/60'
                  }
                `}
              />
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
