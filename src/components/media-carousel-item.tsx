import { useEffect, useRef, useState } from 'react';
import type { MediaItem } from '@/types/exports';

interface MediaCarouselItemProps {
  /** Media item (image or video) to display */
  mediaItem: MediaItem;
  /** Alt text for accessibility */
  alt: string;
  /** Whether this media item is currently active in the carousel */
  isActive: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Callback when image loads (for image items) */
  onLoad?: () => void;
  /** Callback when video is ready to play (for video items) */
  onVideoReady?: () => void;
  /** Callback when video duration is available (in seconds) */
  onVideoDurationChange?: (duration: number) => void;
  /** Callback when image becomes active */
  onImageActive?: () => void;
  /** Whether to use object-cover (true) or object-contain (false) */
  objectCover?: boolean;
}

/**
 * Renders a media item (image or video) for use in carousels.
 * Videos autoplay, loop, and are muted by default.
 * Respects prefers-reduced-motion accessibility preference.
 */
export function MediaCarouselItem({
  mediaItem,
  alt,
  isActive,
  className = '',
  onLoad,
  onVideoReady,
  onVideoDurationChange,
  onImageActive,
  objectCover = false,
}: MediaCarouselItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Control video playback based on active state and reduced motion preference
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaItem.type !== 'video') return;

    if (isActive && !prefersReducedMotion) {
      // Play video when active and user doesn't prefer reduced motion
      video.play().catch((err) => {
        console.warn('Failed to autoplay video:', err);
      });
    } else {
      // Pause video when not active or user prefers reduced motion
      video.pause();
      if (prefersReducedMotion) {
        video.currentTime = 0; // Reset to start when paused for reduced motion
      }
    }
  }, [isActive, prefersReducedMotion, mediaItem.type]);

  // Handle video ready event
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaItem.type !== 'video' || !onVideoReady) return;

    const handleVideoReady = () => {
      onVideoReady();
    };

    video.addEventListener('loadeddata', handleVideoReady);
    return () => video.removeEventListener('loadeddata', handleVideoReady);
  }, [mediaItem.type, onVideoReady]);

  // Handle video duration change
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaItem.type !== 'video') return;

    const handleDurationChange = () => {
      if (onVideoDurationChange && !Number.isNaN(video.duration) && video.duration > 0) {
        onVideoDurationChange(video.duration);
      }
    };

    // Try to get duration immediately if already loaded
    if (!Number.isNaN(video.duration) && video.duration > 0 && onVideoDurationChange) {
      onVideoDurationChange(video.duration);
    }

    video.addEventListener('loadedmetadata', handleDurationChange);
    video.addEventListener('durationchange', handleDurationChange);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleDurationChange);
      video.removeEventListener('durationchange', handleDurationChange);
    };
  }, [mediaItem.type, onVideoDurationChange]);

  // Notify when image becomes active
  useEffect(() => {
    if (mediaItem.type === 'image' && isActive && onImageActive) {
      onImageActive();
    }
  }, [mediaItem.type, isActive, onImageActive]);

  if (mediaItem.type === 'video') {
    return (
      <video
        ref={videoRef}
        src={mediaItem.url}
        className={className}
        autoPlay={false} // Controlled via useEffect to respect prefers-reduced-motion
        loop
        muted
        playsInline
        controls={false}
        aria-label={alt}
        // Disable download, fullscreen, and remote playback controls
        controlsList="nodownload nofullscreen noremoteplayback"
        // Disable picture-in-picture
        disablePictureInPicture
        // Lazy loading via loading attribute (similar to img)
        preload={isActive ? 'auto' : 'metadata'}
      />
    );
  }

  // Fallback to image
  return (
    <img
      src={mediaItem.url}
      alt={alt}
      className={className}
      loading="lazy"
      onLoad={onLoad}
    />
  );
}
