// Theme initialization script - runs before first paint to prevent flash
(function() {
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // Fallback to dark mode
  }

  const stored = localStorage.getItem('lui-theme');
  let theme = 'dark'; // Default fallback
  
  if (stored === 'light') {
    theme = 'light';
  } else if (stored === 'dark') {
    theme = 'dark';
  } else if (stored === 'system' || !stored) {
    theme = getSystemTheme();
  }
  
  document.documentElement.classList.add(theme);
})();
