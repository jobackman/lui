import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardAction, CardDescription } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import type { AddonExport } from "@/types/exports";

interface ExportCardProps {
  export: AddonExport;
  addonId: string;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
}

export function ExportCard({ export: exportData, addonId, isExpanded, onToggleExpand }: ExportCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const images = exportData.images || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  // Auto-cycle through images every 5 seconds when not hovered and not expanded
  useEffect(() => {
    if (!hasMultipleImages || isHovered || isExpanded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, isHovered, isExpanded, images.length]);

  // Prefers-reduced-motion check
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && hasMultipleImages) {
      // Stop cycling if user prefers reduced motion
      setIsHovered(true);
    }
  }, [hasMultipleImages]);

  // Scroll to card when expanded
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const isPartiallyOffScreen = rect.top < 100 || rect.bottom > window.innerHeight;
      
      if (isPartiallyOffScreen) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [isExpanded]);

  // Keyboard navigation
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onToggleExpand(addonId);
      } else if (hasMultipleImages && e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (hasMultipleImages && e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, hasMultipleImages, images.length, addonId, onToggleExpand]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on buttons or links
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    onToggleExpand(addonId);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <Card
      ref={cardRef}
      className={`relative overflow-hidden group !p-0 transition-all duration-500 ease-in-out cursor-pointer ${
        isExpanded ? 'min-h-[600px] col-span-full' : 'min-h-[300px]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${exportData.name}. Click to ${isExpanded ? 'collapse' : 'expand'} details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e as any);
        }
      }}
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
      <div className={`absolute inset-0 bg-gradient-to-b pointer-events-none transition-all duration-500 ${
        isExpanded 
          ? 'from-black/60 via-black/70 to-black/90' 
          : 'from-transparent via-transparent to-black/90'
      }`} />

      {/* Buttons positioned at top-right */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {isExpanded && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(addonId);
            }}
            className="glass-strong hover:bg-white/30 text-white transition-all"
            aria-label="Close expanded view"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {exportData.downloadUrl && (
          <Button
            variant="ghost"
            size="icon"
            asChild
            className={`glass-strong hover:bg-white/30 text-white transition-all duration-300 ease-out motion-reduce:transition-none ${
              isExpanded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0'
            }`}
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
            className={`glass-strong hover:bg-white/30 text-white transition-all duration-300 ease-out motion-reduce:transition-none ${
              isExpanded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0'
            }`}
          />
        ) : exportData.externalUrl ? (
          <Button
            variant="ghost"
            size="icon"
            asChild
            className={`glass-strong hover:bg-white/30 text-white transition-all duration-300 ease-out motion-reduce:transition-none ${
              isExpanded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0'
            }`}
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
      {!isExpanded && (
        <CardHeader className="absolute bottom-0 left-0 right-0 z-10 pb-6">
          <CardTitle className="text-white drop-shadow-lg shadow-black">
            {exportData.name}
          </CardTitle>
          <p className="text-white/80 text-sm drop-shadow-md mt-2">
            Updated {formatRelativeTime(exportData.lastUpdated)}
          </p>
        </CardHeader>
      )}

      {/* Expanded view - Full details */}
      {isExpanded && (
        <div className="relative z-10 h-full overflow-y-auto p-8 flex flex-col gap-6">
          {/* Title and metadata */}
          <div className="space-y-2">
            <CardTitle className="text-white text-3xl drop-shadow-lg shadow-black">
              {exportData.name}
            </CardTitle>
            <CardDescription className="text-white/80 text-base drop-shadow-md">
              {exportData.description}
            </CardDescription>
            <p className="text-white/60 text-sm drop-shadow-md">
              Updated {formatRelativeTime(exportData.lastUpdated)}
            </p>
          </div>

          {/* Image carousel navigation for expanded view */}
          {hasMultipleImages && (
            <div className="relative">
              <div className="glass-strong rounded-lg p-4">
                <div className="flex items-center justify-between gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="glass hover:bg-white/20 text-white shrink-0"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex-1 text-center">
                    <p className="text-white/80 text-sm">
                      Image {currentImageIndex + 1} of {images.length}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="glass hover:bg-white/20 text-white shrink-0"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Thumbnail navigation */}
                <div className="flex gap-2 mt-4 justify-center flex-wrap">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`
                        w-16 h-16 rounded-md overflow-hidden transition-all
                        ${index === currentImageIndex 
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-110' 
                          : 'opacity-60 hover:opacity-100'
                        }
                      `}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Setup instructions */}
          {exportData.setupInstructions && (
            <div className="glass-strong rounded-lg p-6">
              <h3 className="text-white text-xl font-semibold mb-4 drop-shadow-lg">
                Setup Instructions
              </h3>
              <div className="text-white/90 prose prose-invert max-w-none">
                {exportData.setupInstructions.split('\n').map((line, index) => (
                  <p key={index} className="mb-2 drop-shadow-md">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Note for external-link-only addons */}
          {!exportData.exportString && exportData.externalUrl && (
            <div className="glass-strong rounded-lg p-6">
              <h3 className="text-white text-xl font-semibold mb-4 drop-shadow-lg">
                Import from External Source
              </h3>
              <p className="text-white/90 drop-shadow-md">
                This configuration is available from an external source. Click the External Link button above to visit the source and copy the import string.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Image indicator dots - only show when collapsed */}
      {hasMultipleImages && !isExpanded && (
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
