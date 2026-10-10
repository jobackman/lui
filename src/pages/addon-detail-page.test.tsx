import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EditionProvider } from '@/contexts/edition-context';
import { AddonDetailPage } from '@/pages/addon-detail-page';
import { editionLabels } from '@/lib/game-edition';

function renderDetail(path: string): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <EditionProvider>
        <Routes><Route path="/a/:id" element={<AddonDetailPage />} /></Routes>
      </EditionProvider>
    </MemoryRouter>,
  );
}

test('unavailable editions show an explicit message and only navigation to supported configurations', () => {
  const html = renderDetail('/a/details?edition=forever');
  expect(html).toContain(`not currently available for ${editionLabels.forever}`);
  expect(html).toContain('/a/details?edition=retail');
  expect(html).toContain('/?edition=forever');
  expect(html).not.toContain('Copy to clipboard');
  expect(html).not.toContain('Get from source');
  expect(html).not.toContain('screenshot');
});

test('unknown IDs are distinct from unsupported editions', () => {
  const html = renderDetail('/a/missing-addon?edition=forever');
  expect(html).toContain('Addon not found');
  expect(html).not.toContain('not currently available');
  expect(html).toContain('/?edition=forever');
});

test('Retail detail links and copy actions use the selected configuration', () => {
  const html = renderDetail('/a/details?edition=retail');
  expect(html).toContain('Copy to clipboard');
  expect(html).toContain('/?edition=retail');
  expect(html).toContain('q=core&amp;edition=retail');
});

test('download-only addon details have no copy action', () => {
  const html = renderDetail('/a/baganator?edition=retail');
  expect(html).toContain('Download');
  expect(html).not.toContain('Copy to clipboard');
  expect(html).toContain('No configuration import is required');
});
