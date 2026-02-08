import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { MediaCarouselItem } from '@/components/media-carousel-item';
import { CarouselIndicators } from '@/components/carousel-indicators';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { cn } from '@/lib/utils';
import type { Addon } from '@/types/exports';

interface FeaturedAddonProps {
  addon: Addon;
}

export function FeaturedAddon({ addon }: FeaturedAddonProps) {
  const { export: exportData } = addon;
  const mediaItems = exportData.media ?? [];
  const hasMedia = mediaItems.length > 0;
  const hasMultipleMedia = mediaItems.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mediaDuration, setMediaDuration] = useState(5000);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle media
  useEffect(() => {
    if (!hasMultipleMedia || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    }, mediaDuration);

    return () => clearInterval(interval);
  }, [hasMultipleMedia, isHovered, mediaDuration, mediaItems.length]);

  // Reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && hasMultipleMedia) {
      setIsHovered(true);
    }
  }, [hasMultipleMedia]);

  const relativeTime = exportData.lastUpdated ? formatRelativeTime(exportData.lastUpdated) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/a/${addon.id}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl border-glass min-h-[280px] sm:min-h-[340px]"
        >
          {/* Media background */}
          {hasMedia ? (
            <div className="absolute inset-0">
              {mediaItems.map((mediaItem, index) => (
                <MediaCarouselItem
                  key={mediaItem.url}
                  mediaItem={mediaItem}
                  alt={`${exportData.name} featured preview ${index + 1}`}
                  isActive={index === currentIndex}
                  objectCover={true}
                  onVideoDurationChange={(duration) => {
                    if (index === currentIndex) {
                      setMediaDuration(duration * 1000);
                    }
                  }}
                  onImageActive={() => {
                    if (index === currentIndex && mediaItem.type === 'image') {
                      setMediaDuration(5000);
                    }
                  }}
                  className={cn(
                    'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out',
                    index === currentIndex ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}

              {/* Cinematic zoom on hover */}
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-blue-600/40 to-pink-600/40" />
          )}

          {/* Multi-layer gradient overlay for cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '128px 128px',
            }}
          />

          {/* Content overlay -- left-aligned editorial layout */}
          <div className="relative z-10 flex flex-col justify-end h-full min-h-[280px] sm:min-h-[340px] p-5 sm:p-8">
            {/* Recently updated badge */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 sm:mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] text-white/80">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                {relativeTime ? `Updated ${relativeTime}` : 'Recently updated'}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] max-w-md"
            >
              {exportData.name}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 text-sm sm:text-base text-white/60 max-w-lg leading-relaxed line-clamp-2"
            >
              {exportData.description}
            </motion.p>

            {/* Actions row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 sm:mt-5 flex items-center gap-3 flex-wrap"
            >
              {/* Quick action buttons */}
              <div className="flex items-center gap-1.5" onClick={(e) => e.preventDefault()}>
                {exportData.exportString && <CopyButton text={exportData.exportString} />}
                {exportData.downloadUrl && (
                  <Button variant="ghost" size="icon" asChild title="Download addon">
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
                  <Button variant="ghost" size="icon" asChild title="View on external site">
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
            </motion.div>
          </div>

          {/* Carousel indicators -- bottom right */}
          {hasMultipleMedia && (
            <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-10">
              <CarouselIndicators
                totalImages={mediaItems.length}
                currentIndex={currentIndex}
                onIndexChange={setCurrentIndex}
                stopPropagation
              />
            </div>
          )}

          {/* Decorative accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </Link>
    </motion.div>
  );
}
