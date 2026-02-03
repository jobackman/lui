import { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
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
      <BackgroundRippleEffect cellSize={48} />
      
      {/* Fixed Hero Header with Background Carousel */}
      <div className="sticky top-0 z-30 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative overflow-hidden">
        {/* Background Images */}
        {hasImages && (
          <div className="absolute inset-0">
            {images.map((image, index) => (
              <div
                key={image}
                className={`
                  absolute inset-0 transition-opacity duration-700 ease-in-out
                  ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <img
                  src={image}
                  alt={`${addon.export.name} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Multi-layer Gradient Overlays */}
        {/* Bottom-to-top gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />
        {/* Left and right edge fade-out for softer corners */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        {/* Top fade-out for seamless integration */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        
        {/* Back Button - Top Left */}
        <Link 
          to="/"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 text-sm text-white hover:text-white/80 transition-colors group glass-strong px-4 py-2 rounded-lg z-20"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Back to home</span>
        </Link>

        {/* Carousel Controls - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-strong hover:bg-white/30 text-white z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-strong hover:bg-white/30 text-white z-20"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1 px-3 py-2 glass-strong rounded-full">
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
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end z-10">
          <div className="container mx-auto max-w-6xl px-4 sm:px-8 pb-8 sm:pb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
              {addon.export.name}
            </h1>
            <p className="text-white/90 text-base sm:text-lg mb-2 drop-shadow-md max-w-3xl">
              {addon.export.description}
            </p>
            <p className="text-sm text-white/80 mb-3 drop-shadow-md">
              Updated {formatRelativeTime(addon.export.lastUpdated)}
            </p>
            
            {/* Tags */}
            {addon.export.tags && addon.export.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {addon.export.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {addon.export.exportString ? (
                <CopyButton 
                  text={addon.export.exportString}
                  className="glass-strong hover:bg-white/30 text-white"
                />
              ) : addon.export.externalUrl ? (
                <Button
                  variant="ghost"
                  asChild
                  className="glass-strong hover:bg-white/30 text-white"
                >
                  <a
                    href={addon.export.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View External Guide
                  </a>
                </Button>
              ) : null}
              
              {addon.export.downloadUrl && (
                <Button
                  variant="ghost"
                  asChild
                  className="glass-strong hover:bg-white/30 text-white"
                >
                  <a
                    href={addon.export.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Addon
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section - Setup Instructions */}
      <div className="relative z-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-8 py-8 sm:py-12">
          {/* Setup Instructions */}
          {addon.export.setupInstructions && (
            <Card className="glass-strong p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed">
                  {addon.export.setupInstructions}
                </pre>
              </div>
            </Card>
          )}

          {/* Message for external-link-only addons */}
          {!addon.export.exportString && addon.export.externalUrl && !addon.export.setupInstructions && (
            <Card className="glass-strong p-6 sm:p-8 text-center">
              <p className="text-muted-foreground">
                This addon requires importing from an external source.
                Click the button above to view the guide.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
