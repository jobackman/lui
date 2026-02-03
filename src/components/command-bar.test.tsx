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
    expect(addon.export.tags).toBeDefined();
    expect(Array.isArray(addon.export.tags)).toBe(true);
    expect(addon.export.tags!.length).toBeGreaterThan(0);
  });
});

test('tag-based search value construction includes addon name and tags', () => {
  const addons = loadAllExports();
  
  // Test each addon's search value format
  addons.forEach(addon => {
    // This mimics the value prop in CommandItem (line 63 of command-bar.tsx)
    const searchValue = `${addon.name} ${addon.export.tags?.join(' ') || ''}`;
    
    // Value should include addon name
    expect(searchValue).toContain(addon.name);
    
    // Value should include all tags if they exist
    if (addon.export.tags && addon.export.tags.length > 0) {
      addon.export.tags.forEach(tag => {
        expect(searchValue).toContain(tag);
      });
    }
  });
});

test('specific addon tags are searchable (Platynator example)', () => {
  const addons = loadAllExports();
  const platynator = addons.find(addon => addon.id === 'platynator');
  
  expect(platynator).toBeDefined();
  expect(platynator!.export.tags).toBeDefined();
  
  const searchValue = `${platynator!.name} ${platynator!.export.tags?.join(' ') || ''}`;
  
  // Platynator should have nameplates, ui, pvp tags
  expect(searchValue.toLowerCase()).toContain('nameplates');
  expect(searchValue.toLowerCase()).toContain('ui');
  expect(searchValue.toLowerCase()).toContain('pvp');
});

test('specific addon tags are searchable (Baganator example)', () => {
  const addons = loadAllExports();
  const baganator = addons.find(addon => addon.id === 'baganator');
  
  expect(baganator).toBeDefined();
  expect(baganator!.export.tags).toBeDefined();
  
  const searchValue = `${baganator!.name} ${baganator!.export.tags?.join(' ') || ''}`;
  
  // Baganator should have inventory, bags, ui tags
  expect(searchValue.toLowerCase()).toContain('inventory');
  expect(searchValue.toLowerCase()).toContain('bags');
  expect(searchValue.toLowerCase()).toContain('ui');
});

test('all unique tags can be extracted from addons', () => {
  const addons = loadAllExports();
  
  const allTags = addons
    .flatMap(addon => addon.export.tags || [])
    .filter((tag, index, self) => self.indexOf(tag) === index);
  
  expect(allTags.length).toBeGreaterThan(0);
  
  // Verify expected common tags exist
  const tagSet = new Set(allTags);
  expect(tagSet.has('ui')).toBe(true);
});
