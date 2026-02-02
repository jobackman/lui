import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { AddonExport } from "@/types/exports";

interface ExportCardProps {
  export: AddonExport;
}

export function ExportCard({ export: exportData }: ExportCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = exportData.images || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

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
      className="relative overflow-hidden min-h-[300px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Layer */}
      {hasImages ? (
        <div className="absolute inset-0 -z-10">
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
          {/* Bottom gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
        </div>
      ) : (
        // Fallback gradient background when no images
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-pink-500/30" />
      )}

      {/* Content Layer positioned at bottom */}
      <CardHeader className="absolute bottom-0 left-0 right-0 z-10">
        <CardTitle className="text-white drop-shadow-lg shadow-black">
          {exportData.name}
        </CardTitle>
        <CardAction>
          <div className="flex gap-2">
            {exportData.downloadUrl && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="glass-strong hover:bg-white/30 transition-all duration-300 ease-out text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
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
            <CopyButton 
              text={exportData.exportString}
              className="glass-strong hover:bg-white/30 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
            />
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
