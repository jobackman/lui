import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { ExportCopyButtons } from '@/components/export-copy-buttons';
import { getCopyableExports } from '@/lib/copyable-exports';
import { CarouselIndicators } from '@/components/carousel-indicators';
import { MediaCarouselItem } from '@/components/media-carousel-item';
import { SnapCarousel } from '@/components/snap-carousel';
import { getCatalogAddonById, resolveAddon } from '@/lib/loadExports';
import { useEdition } from '@/contexts/edition-context';
import { EditionSwitcher } from '@/components/edition-switcher';
import { editionLabels, editionUrl } from '@/lib/game-edition';
import { edition } from '@/types/exports';
import type { ResolvedAddon } from '@/types/exports';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { ArrowLeft, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function AddonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { gameEdition } = useEdition();
  const addon = id ? getCatalogAddonById(id) : undefined;
  const resolved = addon ? resolveAddon(addon, gameEdition) : undefined;

  useEffect(() => {
    document.title = `${resolved?.configuration.name ?? addon?.name ?? 'Addon not found'} · ${editionLabels[gameEdition]} - LucyUI`;
    return () => { document.title = 'LucyUI'; };
  }, [addon?.name, resolved?.configuration.name, gameEdition]);

  if (resolved) return <AddonDetailContent key={`${gameEdition}:${resolved.id}`} addon={resolved} />;

  return (
    <div className="relative z-20 mx-auto min-h-screen max-w-4xl px-4 py-10">
      <Link to={editionUrl('/', gameEdition)} className="text-sm text-foreground/50 hover:text-foreground">← Back to {editionLabels[gameEdition]} addons</Link>
      <div className="mt-6"><EditionSwitcher /></div>
      <section className="mt-10 rounded-xl bg-glass backdrop-blur-glass border-glass p-6 sm:p-8">
        <h1 className="text-2xl font-bold">{addon?.name ?? 'Addon not found'}</h1>
        <p className="mt-3 text-foreground/60">
          {addon ? `This addon is not currently available for ${editionLabels[gameEdition]}.` : 'We could not find an addon with this ID.'}
        </p>
        {addon && (
          <div className="mt-6 flex flex-wrap gap-3">
            {Object.values(edition).filter((value) => addon.editions[value]).map((value) => (
              <Button key={value} variant="outline" asChild>
                <Link to={editionUrl(`/a/${addon.id}`, value)}>View {editionLabels[value]} configuration</Link>
              </Button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AddonDetailContent({ addon }: { addon: ResolvedAddon }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const hasExports = getCopyableExports(addon.configuration.exports).length > 0;
  const mediaItems = addon.configuration.media ?? [];
  const hasImages = mediaItems.length > 0;
  const hasMultipleImages = mediaItems.length > 1;

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
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
  };

  const handleModalNextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % mediaItems.length);
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
              to={editionUrl('/', addon.edition)}
              className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/80 transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back
            </Link>
          </motion.div>

          <div className="mb-6"><EditionSwitcher /></div>

          {/* Header zone */}
          <motion.header
            className="mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5">{addon.configuration.name}</h1>
                <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">{addon.configuration.description}</p>
              </div>
            </div>

            {/* Meta row: timestamp + tags */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="text-xs text-foreground/30">Updated {formatRelativeTime(addon.configuration.lastUpdated)}</span>
              {addon.configuration.tags && addon.configuration.tags.length > 0 && (
                <>
                  <span className="w-px h-3 bg-foreground/10" aria-hidden="true" />
                  <div className="flex flex-wrap gap-1.5">
                    {addon.configuration.tags.map((tagValue) => (
                      <Link key={tagValue} to={editionUrl(`/?q=${encodeURIComponent(tagValue)}`, addon.edition)}>
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
            <ExportCopyButtons exports={addon.configuration.exports} showIcon size="lg" singleLabel="Copy to clipboard" />

            {addon.configuration.downloadUrl && (
              <Button variant="ghost" size="lg" asChild>
                <a href={addon.configuration.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
            )}

            {addon.configuration.externalUrl && (
              <Button variant="ghost" size="lg" asChild>
                <a href={addon.configuration.externalUrl} target="_blank" rel="noopener noreferrer">
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
              <SnapCarousel
                className="w-full h-[clamp(280px,50vw,540px)] cursor-pointer group"
                label={`${addon.configuration.name} screenshots`}
                currentIndex={currentImageIndex}
                onIndexChange={setCurrentImageIndex}
                onClick={handleImageClick}
              >
                {mediaItems.map((mediaItem, index) => (
                  <MediaCarouselItem
                    key={mediaItem.url}
                    mediaItem={mediaItem}
                    alt={`${addon.configuration.name} screenshot ${index + 1}`}
                    isActive={index === currentImageIndex}
                    className="w-full h-full object-contain"
                  />
                ))}
              </SnapCarousel>

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
          {addon.configuration.setupInstructions && (
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
                {addon.configuration.setupInstructions}
              </pre>
            </motion.div>
          )}

          {!hasExports && !addon.configuration.externalUrl && addon.configuration.downloadUrl && !addon.configuration.setupInstructions && (
            <p className="rounded-xl bg-glass border-glass p-5 text-sm text-foreground/60">Download the addon using the link above and use its default settings. No configuration import is required.</p>
          )}

          {/* Message for external-link-only addons */}
          {!hasExports && addon.configuration.externalUrl && !addon.configuration.setupInstructions && (
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
        <DialogContent className="max-w-fit w-auto max-h-[95vh] p-0 border-0 bg-transparent backdrop-blur-none shadow-none [&>button.absolute]:hidden">
          <div className="relative flex items-center justify-center">
            <SnapCarousel
              className="w-[90vw] h-[85vh] rounded-lg"
              label={`${addon.configuration.name} fullscreen screenshots`}
              currentIndex={modalImageIndex}
              onIndexChange={setModalImageIndex}
            >
              {mediaItems.map((mediaItem, index) => (
                <MediaCarouselItem
                  key={mediaItem.url}
                  mediaItem={mediaItem}
                  alt={`${addon.configuration.name} screenshot ${index + 1}`}
                  isActive={index === modalImageIndex}
                  className="w-full h-full object-contain"
                />
              ))}
            </SnapCarousel>
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

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10">
                  <CarouselIndicators
                    totalImages={mediaItems.length}
                    currentIndex={modalImageIndex}
                    onIndexChange={setModalImageIndex}
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
