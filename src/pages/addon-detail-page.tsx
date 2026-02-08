import { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { CopyButton } from '@/components/copy-button';
import { CarouselIndicators } from '@/components/carousel-indicators';
import { MediaCarouselItem } from '@/components/media-carousel-item';
import { getAddonById } from '@/lib/loadExports';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { ArrowLeft, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function AddonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Handle invalid addon IDs
  if (!id) {
    return <Navigate to="/" replace />;
  }

  const addon = getAddonById(id);

  // 404 handling - redirect to home for invalid addon IDs
  if (!addon) {
    return <Navigate to="/" replace />;
  }

  const mediaItems = addon.export.media ?? [];
  const hasImages = mediaItems.length > 0;
  const hasMultipleImages = mediaItems.length > 1;

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen && hasMultipleImages) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setModalImageIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setModalImageIndex((prev) => (prev + 1) % mediaItems.length);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setIsModalOpen(false);
        }
      } else if (!isModalOpen) {
        if (hasMultipleImages) {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setCurrentImageIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            setCurrentImageIndex((prev) => (prev + 1) % mediaItems.length);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, hasMultipleImages, mediaItems.length, isModalOpen]);

  // Update document title
  useEffect(() => {
    document.title = `${addon.export.name} - LucyUI`;
    return () => {
      document.title = 'LucyUI';
    };
  }, [addon.export.name]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handleImageClick = () => {
    setModalImageIndex(currentImageIndex);
    setIsModalOpen(true);
  };

  const handleModalPrevImage = () => {
    setModalImageIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsImageLoading(true);
  };

  const handleModalNextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % mediaItems.length);
    setIsImageLoading(true);
  };

  return (
    <div className="min-h-screen relative">
      <motion.div
        className="relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/80 transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back
            </Link>
          </motion.div>

          {/* Header zone */}
          <motion.header
            className="mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5">{addon.export.name}</h1>
                <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">{addon.export.description}</p>
              </div>
            </div>

            {/* Meta row: timestamp + tags */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="text-xs text-foreground/30">Updated {formatRelativeTime(addon.export.lastUpdated)}</span>
              {addon.export.tags && addon.export.tags.length > 0 && (
                <>
                  <span className="w-px h-3 bg-foreground/10" aria-hidden="true" />
                  <div className="flex flex-wrap gap-1.5">
                    {addon.export.tags.map((tagValue) => (
                      <Link key={tagValue} to={`/?q=${tagValue}`}>
                        <Tag>{tagValue}</Tag>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.header>

          {/* Action buttons - prominent placement between header and media */}
          <motion.div
            className="flex flex-wrap gap-2.5 mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {addon.export.exportString && (
              <CopyButton text={addon.export.exportString} showIcon size="lg">
                Copy to clipboard
              </CopyButton>
            )}

            {addon.export.downloadUrl && (
              <Button variant="ghost" size="lg" asChild>
                <a href={addon.export.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
            )}

            {addon.export.externalUrl && (
              <Button variant="ghost" size="lg" asChild>
                <a href={addon.export.externalUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get from source
                </a>
              </Button>
            )}
          </motion.div>

          {/* Media Carousel - stands on its own, not inside a card */}
          {hasImages && (
            <motion.div
              className="relative mb-8 rounded-xl overflow-hidden bg-black/20 border-glass"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative w-full cursor-pointer group"
                style={{ minHeight: '280px', maxHeight: '540px', aspectRatio: '16/9' }}
                onClick={handleImageClick}
              >
                {mediaItems.map((mediaItem, index) => (
                  <MediaCarouselItem
                    key={mediaItem.url}
                    mediaItem={mediaItem}
                    alt={`${addon.export.name} screenshot ${index + 1}`}
                    isActive={index === currentImageIndex}
                    className={`
                      absolute inset-0 w-full h-full object-contain
                      transition-opacity duration-500 ease-in-out
                      ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
                    `}
                  />
                ))}
              </div>

              {hasMultipleImages && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CarouselIndicators
                      totalImages={mediaItems.length}
                      currentIndex={currentImageIndex}
                      onIndexChange={setCurrentImageIndex}
                      stopPropagation
                    />
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Setup Instructions */}
          {addon.export.setupInstructions && (
            <motion.div
              className="bg-glass backdrop-blur-glass border-glass rounded-xl p-5 sm:p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
            >
              <h2 className="text-sm font-medium uppercase tracking-[0.1em] text-foreground/50 mb-3">
                Setup Instructions
              </h2>
              <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/70 leading-relaxed">
                {addon.export.setupInstructions}
              </pre>
            </motion.div>
          )}

          {/* Message for external-link-only addons */}
          {!addon.export.exportString && addon.export.externalUrl && !addon.export.setupInstructions && (
            <motion.div
              className="bg-glass backdrop-blur-glass border-glass rounded-xl p-5 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
            >
              <p className="text-foreground/50 text-sm">
                Import instructions are available on the external source linked above.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Media Gallery Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] p-0 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-glass-strong backdrop-blur-glass-strong border-glass px-4 py-2 rounded-lg text-sm">
                    Loading...
                  </div>
                </div>
              )}
              {mediaItems[modalImageIndex] && (
                <MediaCarouselItem
                  mediaItem={mediaItems[modalImageIndex]}
                  alt={`${addon.export.name} screenshot ${modalImageIndex + 1}`}
                  isActive={true}
                  onLoad={() => setIsImageLoading(false)}
                  onVideoReady={() => setIsImageLoading(false)}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
            </div>

            {hasMultipleImages && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleModalPrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleModalNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                  <CarouselIndicators
                    totalImages={mediaItems.length}
                    currentIndex={modalImageIndex}
                    onIndexChange={(index) => {
                      setModalImageIndex(index);
                      setIsImageLoading(true);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
