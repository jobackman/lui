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
  /** Callback when video starts playing */
  onVideoPlaying?: () => void;
  /** Callback when video completes a loop */
  onVideoEnded?: () => void;
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
  onVideoPlaying,
  onVideoEnded,
  objectCover = false,
}: MediaCarouselItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopCountRef = useRef(0);
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
      // Reset loop count when video becomes active
      loopCountRef.current = 0;
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

  // Handle video playing and ended events
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaItem.type !== 'video') return;

    const handlePlaying = () => {
      if (onVideoPlaying) onVideoPlaying();
    };

    const handleEnded = () => {
      loopCountRef.current += 1;
      // Only call onVideoEnded after first loop completes
      if (loopCountRef.current === 1 && onVideoEnded) {
        onVideoEnded();
      }
    };

    if (onVideoPlaying) {
      video.addEventListener('playing', handlePlaying);
    }
    if (onVideoEnded) {
      video.addEventListener('ended', handleEnded);
    }

    return () => {
      if (onVideoPlaying) {
        video.removeEventListener('playing', handlePlaying);
      }
      if (onVideoEnded) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [mediaItem.type, onVideoPlaying, onVideoEnded]);

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
