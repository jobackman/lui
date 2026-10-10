import { expect, test } from 'bun:test';
import { EDITION_STORAGE_KEY, readRememberedEdition, rememberEdition, resolveGameEdition, updateSearchParameter } from '@/lib/game-edition';
import type { EditionStorage } from '@/lib/game-edition';

test('explicit URL edition wins over remembered choice', () => {
  expect(resolveGameEdition('retail', 'forever')).toBe('retail');
  expect(resolveGameEdition('forever', 'retail')).toBe('forever');
});

test('missing URL edition uses preference or defaults to Retail', () => {
  expect(resolveGameEdition(null, 'forever')).toBe('forever');
  expect(resolveGameEdition(null, null)).toBe('retail');
  expect(resolveGameEdition(null, 'invalid')).toBe('retail');
});

test('invalid explicit URL values normalize to Retail, even with a Forever preference', () => {
  expect(resolveGameEdition('classic', 'forever')).toBe('retail');
  expect(resolveGameEdition('', 'forever')).toBe('retail');
});

test('edition and search updates preserve one another and unrelated parameters', () => {
  const original = new URLSearchParams('edition=retail&q=frames&source=share');
  const switched = updateSearchParameter(original, 'edition', 'forever');
  const searched = updateSearchParameter(switched, 'q', 'm+');
  expect(original.get('edition')).toBe('retail');
  expect(searched.get('edition')).toBe('forever');
  expect(searched.get('q')).toBe('m+');
  expect(searched.get('source')).toBe('share');
  expect(updateSearchParameter(searched, 'q', '').get('edition')).toBe('forever');
});

test('local preference round-trips under a dedicated key', () => {
  const values = new Map<string, string>();
  const storage: EditionStorage = {
    getItem: (key: string): string | null => values.get(key) ?? null,
    setItem: (key: string, value: string): void => { values.set(key, value); },
  };
  rememberEdition(storage, 'forever');
  expect(values.get(EDITION_STORAGE_KEY)).toBe('forever');
  expect(readRememberedEdition(storage)).toBe('forever');
});

test('storage read/write failures are non-fatal', () => {
  const blocked: EditionStorage = {
    getItem: (): never => { throw new Error('Denied'); },
    setItem: (): never => { throw new Error('Denied'); },
  };
  expect(readRememberedEdition(blocked)).toBeNull();
  expect(() => rememberEdition(blocked, 'forever')).not.toThrow();
});
