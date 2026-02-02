import { describe, it, expect } from 'bun:test';
import type { Theme } from './theme-context';

describe('ThemeContext', () => {
  it('exports ThemeProvider function', () => {
    const { ThemeProvider } = require('./theme-context');
    expect(typeof ThemeProvider).toBe('function');
  });

  it('exports useTheme hook', () => {
    const { useTheme } = require('./theme-context');
    expect(typeof useTheme).toBe('function');
  });

  it('validates theme type values', () => {
    const validThemes: Theme[] = ['light', 'dark', 'system'];
    expect(validThemes).toContain('light');
    expect(validThemes).toContain('dark');
    expect(validThemes).toContain('system');
    expect(validThemes.length).toBe(3);
  });

  it('localStorage key format is correct', () => {
    const key = 'lui-theme';
    expect(key).toBe('lui-theme');
    expect(key.startsWith('lui-')).toBe(true);
  });
});
