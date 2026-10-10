import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { EditionProvider } from '@/contexts/edition-context';
import { HomePage } from '@/pages/home-page';
import { editionLabels } from '@/lib/game-edition';

function renderHome(path: string): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <EditionProvider><HomePage /></EditionProvider>
    </MemoryRouter>,
  );
}

test('Retail homepage links include edition and expose its configurations', () => {
  const html = renderHome('/?edition=retail');
  expect(html).toContain('/a/details?edition=retail');
  expect(html).toContain('Game edition');
  expect(html).not.toContain('Ready for Midnight');
});

test('Forever catalog shows published configurations without Retail-only addons', () => {
  const html = renderHome('/?edition=forever');
  expect(html).toContain('/a/platynator?edition=forever');
  expect(html).toContain('/a/eqol?edition=forever');
  expect(html).not.toContain('/a/details');
  expect(html).not.toContain('edition=retail');
});

test('search is scoped to the selected edition', () => {
  expect(renderHome('/?edition=retail&q=details')).toContain('/a/details?edition=retail');
  const foreverHtml = renderHome('/?edition=forever&q=details');
  expect(foreverHtml).toContain(`No ${editionLabels.forever} addons matching`);
  expect(foreverHtml).not.toContain('/a/details');
});
