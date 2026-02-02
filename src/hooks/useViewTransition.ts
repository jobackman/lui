/**
 * Custom hook for View Transition API support
 * Provides a wrapper around document.startViewTransition with fallback for unsupported browsers
 */
export function useViewTransition() {
  const startViewTransition = (callback: () => void | Promise<void>) => {
    // Check if View Transition API is supported
    if ('startViewTransition' in document) {
      // Use native View Transition API
      (document as any).startViewTransition(callback);
    } else {
      // Fallback for browsers without View Transition API support
      // Just execute the callback immediately
      callback();
    }
  };

  return { startViewTransition };
}
