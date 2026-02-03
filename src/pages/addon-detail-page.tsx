import { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { CopyButton } from '@/components/copy-button';
import { getAddonById } from '@/lib/loadExports';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { ArrowLeft, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

export function AddonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle invalid addon IDs
  if (!id) {
    return <Navigate to="/" replace />;
  }

  const addon = getAddonById(id);

  // 404 handling - redirect to home for invalid addon IDs
  if (!addon) {
    return <Navigate to="/" replace />;
  }

  const images = addon.export.images || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      } else if (hasMultipleImages) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, hasMultipleImages, images.length]);

  // Update document title
  useEffect(() => {
    document.title = `${addon.export.name} - LUI`;
    return () => {
      document.title = 'LUI';
    };
  }, [addon.export.name]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
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
            <Card className="glass-strong p-6 sm:p-8">
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

              {/* Image Carousel */}
              {hasImages && (
                <div className="relative mb-8 rounded-lg overflow-hidden bg-black/20">
                  {/* Images */}
                  <div className="relative aspect-video">
                    {images.map((image, index) => (
                      <img
                        key={image}
                        src={image}
                        alt={`${addon.export.name} screenshot ${index + 1}`}
                        className={`
                          absolute inset-0 w-full h-full object-cover
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
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>

                      {/* Next Button */}
                      <Button
                        variant="default"
                        size="icon"
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>

                      {/* Indicator Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1 px-3 py-2 glass-strong rounded-full">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className="p-1.5 [@media(hover:none)]:p-2 [@media(hover:none)]:min-w-[44px] [@media(hover:none)]:min-h-[44px] flex items-center justify-center"
                            aria-label={`View image ${index + 1} of ${images.length}`}
                            aria-current={index === currentImageIndex ? 'true' : 'false'}
                          >
                            <div
                              className={`
                                transition-all duration-300 ease-out rounded-full
                                ${
                                  index === currentImageIndex
                                    ? 'w-2 h-2 bg-white shadow-lg shadow-white/50'
                                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                                }
                              `}
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                {addon.export.exportString ? (
                  <CopyButton text={addon.export.exportString} showIcon>
                    Copy Export String
                  </CopyButton>
                ) : addon.export.externalUrl ? (
                  <Button variant="ghost" asChild>
                    <a href={addon.export.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View External Guide
                    </a>
                  </Button>
                ) : null}

                {addon.export.downloadUrl && (
                  <Button variant="ghost" asChild>
                    <a href={addon.export.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download Addon
                    </a>
                  </Button>
                )}
              </div>

              {/* Setup Instructions */}
              {addon.export.setupInstructions && (
                <motion.div
                  className="glass p-6 rounded-lg"
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
                  className="glass p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <p className="text-muted-foreground">
                    This addon requires importing from an external source. Click the button above to view the guide.
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
