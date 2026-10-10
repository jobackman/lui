import { expect, test } from 'bun:test';
import { getCopyableExports } from '@/lib/copyable-exports';
import type { AddonConfiguration } from '@/types/exports';

test('normalizes a single string without altering its contents', () => {
  expect(getCopyableExports('  profile\n')).toEqual([{ value: '  profile\n' }]);
});

test('preserves named export values and definition order', () => {
  const exports: AddonConfiguration['exports'] = [
    { name: 'Settings', value: 'settings-string' },
    { name: 'Resource bars', value: 'bars-string' },
  ];
  expect(getCopyableExports(exports)).toEqual(exports);
  expect(getCopyableExports(exports.slice(0, 1))).toEqual([exports[0]!]);
});

test('omitted, empty, and blank exports provide no copy actions', () => {
  for (const exports of [undefined, '', ' \n ', []]) {
    expect(getCopyableExports(exports)).toEqual([]);
  }
  expect(getCopyableExports([
    { name: 'Empty', value: ' ' },
    { name: 'Profile', value: 'profile' },
  ])).toEqual([{ name: 'Profile', value: 'profile' }]);
});
