import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { CarouselIndicators } from '@/components/carousel-indicators';
import { ExportCard } from '@/components/export-card';
import type { AddonConfiguration } from '@/types/exports';

const configuration: AddonConfiguration = {
  name: 'Preview addon',
  description: 'Preview description',
  lastUpdated: '2026-01-01T00:00:00.000Z',
  media: [
    { type: 'image', url: 'first.png' },
    { type: 'image', url: 'second.png' },
  ],
};

test('default indicators retain their featured-card styling', () => {
  const markup = renderToStaticMarkup(
    <CarouselIndicators totalImages={2} currentIndex={0} onIndexChange={() => {}} />,
  );

  expect(markup).toContain('bg-glass-subtle');
  expect(markup).toContain('w-2 h-2');
  expect(markup).toContain('shadow-white/50');
  expect(markup).not.toContain('bg-black/25');
});

test('regular cards retain preview slides without indicators and keep actions at the top', () => {
  const markup = renderToStaticMarkup(<ExportCard export={configuration} addonId="preview" />);

  expect(markup).toContain('aria-label="1 of 2"');
  expect(markup).toContain('aria-label="2 of 2"');
  expect(markup).not.toContain('View image');
  expect(markup).not.toContain('top-12');
  expect(markup).toContain('absolute top-3 left-3 right-3');
});

test('single-preview cards omit indicators and keep actions at the top', () => {
  const markup = renderToStaticMarkup(
    <ExportCard export={{ ...configuration, media: configuration.media?.slice(0, 1) }} addonId="preview" />,
  );

  expect(markup).not.toContain('View image');
  expect(markup).not.toContain('top-12');
  expect(markup).toContain('top-3');
});
