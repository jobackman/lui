import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ExportCopyButtons } from '@/components/export-copy-buttons';

function buttonLabels(markup: string): string[] {
  return [...markup.matchAll(/<button\b[^>]*>(.*?)<\/button>/g)].map((match) => match[1]!);
}

test('single exports retain the compact and detail labels', () => {
  expect(buttonLabels(renderToStaticMarkup(<ExportCopyButtons exports="profile" />))).toEqual(['Copy']);
  expect(buttonLabels(renderToStaticMarkup(
    <ExportCopyButtons exports="profile" singleLabel="Copy to clipboard" />,
  ))).toEqual(['Copy to clipboard']);
});

test('named exports render distinct copy actions in order, even for one entry', () => {
  const exports = [
    { name: 'Settings', value: 'settings' },
    { name: 'Resource bars', value: 'bars' },
  ];
  expect(buttonLabels(renderToStaticMarkup(<ExportCopyButtons exports={exports} />))).toEqual([
    'Copy Settings', 'Copy Resource bars',
  ]);
  expect(buttonLabels(renderToStaticMarkup(<ExportCopyButtons exports={exports.slice(0, 1)} />))).toEqual([
    'Copy Settings',
  ]);
});

test('download-only and blank exports render no buttons', () => {
  expect(renderToStaticMarkup(<ExportCopyButtons exports={undefined} />)).toBe('');
  expect(renderToStaticMarkup(<ExportCopyButtons exports={[]} />)).toBe('');
  expect(renderToStaticMarkup(<ExportCopyButtons exports=" " />)).toBe('');
});
