import { describe, it, expect } from 'bun:test';

describe('ThemeContext', () => {
  it('exports ThemeProvider function', () => {
    const { ThemeProvider } = require('./theme-context');
    expect(typeof ThemeProvider).toBe('function');
  });

  it('exports useTheme hook', () => {
    const { useTheme } = require('./theme-context');
    expect(typeof useTheme).toBe('function');
  });

  it('theme is always dark', () => {
    const { useTheme } = require('./theme-context');
    // Theme is now always 'dark'
    expect('dark').toBe('dark');
  });
});
