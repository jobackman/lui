import { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { CopyButton } from '@/components/copy-button';
import { CarouselIndicators } from '@/components/carousel-indicators';
import { MediaCarouselItem } from '@/components/media-carousel-item';
import { getAddonById } from '@/lib/loadExports';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { ArrowLeft, Download, ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

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
      // If modal is open, handle modal navigation
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
    document.title = `${addon.export.name} - LUI`;
    return () => {
      document.title = 'LUI';
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
        <div className="container mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="bg-glass-strong backdrop-blur-glass-strong border-glass transition-glass p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">{addon.export.name}</h1>
                <p className="text-muted-foreground text-base sm:text-lg mb-2">{addon.export.description}</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Updated {formatRelativeTime(addon.export.lastUpdated)}
                </p>
                {/* Tags */}
                {addon.export.tags && addon.export.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {addon.export.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </div>

              {/* Media Carousel */}
              {hasImages && (
                <div className="relative mb-8 rounded-lg overflow-hidden bg-black/20">
                  {/* Media Items */}
                  <div
                    className="relative w-full cursor-pointer group"
                    style={{ minHeight: '300px', maxHeight: '600px', aspectRatio: '16/9' }}
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

                  {/* Carousel Controls - Only show if multiple images */}
                  {hasMultipleImages && (
                    <>
                      {/* Previous Button */}
                      <Button
                        variant="default"
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

                      {/* Next Button */}
                      <Button
                        variant="default"
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

                      {/* Indicator Dots */}
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
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
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
                  <Button variant="outline" size="lg" asChild>
                    <a href={addon.export.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get from source
                    </a>
                  </Button>
                )}
              </div>

              {/* Setup Instructions */}
              {addon.export.setupInstructions && (
                <motion.div
                  className="bg-glass backdrop-blur-glass border-glass transition-glass p-6 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                      {addon.export.setupInstructions}
                    </pre>
                  </div>
                </motion.div>
              )}

              {/* Message for external-link-only addons */}
              {!addon.export.exportString && addon.export.externalUrl && !addon.export.setupInstructions && (
                <motion.div
                  className="bg-glass backdrop-blur-glass border-glass transition-glass p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <p className="text-muted-foreground">Import instructions are on the external guide linked above.</p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Media Gallery Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] p-0 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Full Resolution Media */}
            <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-glass-strong backdrop-blur-glass-strong border-glass transition-glass px-4 py-2 rounded-lg text-sm">Loading...</div>
                </div>
              )}
              {mediaItems[modalImageIndex] && (
                <MediaCarouselItem
                  mediaItem={mediaItems[modalImageIndex]}
                  alt={`${addon.export.name} screenshot ${modalImageIndex + 1}`}
                  isActive={true}
                  onLoad={() => setIsImageLoading(false)}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
            </div>

            {/* Modal Navigation Controls */}
            {hasMultipleImages && (
              <>
                {/* Previous Button */}
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleModalPrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                {/* Next Button */}
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleModalNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Indicator Dots */}
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
