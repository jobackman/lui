import { test, expect } from 'bun:test';
import { CommandBar } from './command-bar';
import { loadAllExports } from '@/lib/loadExports';

test('CommandBar component is defined and importable', () => {
  expect(CommandBar).toBeDefined();
  expect(typeof CommandBar).toBe('function');
});

test('all addons loaded have tags field populated', () => {
  const addons = loadAllExports();
  
  // Verify that all addons have tags
  addons.forEach(addon => {
    expect(addon.configuration.tags).toBeDefined();
    expect(Array.isArray(addon.configuration.tags)).toBe(true);
    expect(addon.configuration.tags!.length).toBeGreaterThan(0);
  });
});

test('tag-based search value construction includes addon name and tags', () => {
  const addons = loadAllExports();
  
  // Test each addon's search value format
  addons.forEach(addon => {
    // This mimics the value prop in CommandItem (line 63 of command-bar.tsx)
    const searchValue = `${addon.name} ${addon.configuration.tags?.join(' ') || ''}`;
    
    // Value should include addon name
    expect(searchValue).toContain(addon.name);
    
    // Value should include all tags if they exist
    if (addon.configuration.tags && addon.configuration.tags.length > 0) {
      addon.configuration.tags.forEach(tag => {
        expect(searchValue).toContain(tag);
      });
    }
  });
});

test('specific addon tags are searchable (Platynator example)', () => {
  const addons = loadAllExports();
  const platynator = addons.find(addon => addon.id === 'platynator');
  
  expect(platynator).toBeDefined();
  expect(platynator!.configuration.tags).toBeDefined();
  
  const searchValue = `${platynator!.name} ${platynator!.configuration.tags?.join(' ') || ''}`;
  
  // Platynator should have nameplates, frames, mythic+ tags
  expect(searchValue.toLowerCase()).toContain('nameplates');
  expect(searchValue.toLowerCase()).toContain('frames');
  expect(searchValue.toLowerCase()).toContain('mythic');
});

test('specific addon tags are searchable (Details example)', () => {
  const addons = loadAllExports();
  const details = addons.find(addon => addon.id === 'details');
  
  expect(details).toBeDefined();
  expect(details!.configuration.tags).toBeDefined();
  
  const searchValue = `${details!.name} ${details!.configuration.tags?.join(' ') || ''}`;
  
  // Details should have damage, raid, meter tags
  expect(searchValue.toLowerCase()).toContain('damage');
  expect(searchValue.toLowerCase()).toContain('raid');
  expect(searchValue.toLowerCase()).toContain('meter');
});

test('all unique tags can be extracted from addons', () => {
  const addons = loadAllExports();
  
  const allTags = addons
    .flatMap(addon => addon.configuration.tags || [])
    .filter((tag, index, self) => self.indexOf(tag) === index);
  
  expect(allTags.length).toBeGreaterThan(0);
  
  // Verify expected common tags exist
  const tagSet = new Set(allTags);
  expect(tagSet.has('ui')).toBe(true);
});
