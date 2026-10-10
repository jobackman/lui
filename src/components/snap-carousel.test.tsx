import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { SnapCarousel } from '@/components/snap-carousel';

test('renders a native scroll-snap viewport with full-width, labeled slides', () => {
  const markup = renderToStaticMarkup(
    <SnapCarousel label="Addon screenshots" currentIndex={0} onIndexChange={() => {}}>
      {[<img key="first" src="first.png" alt="First screenshot" />, <img key="second" src="second.png" alt="Second screenshot" />]}
    </SnapCarousel>,
  );

  expect(markup).toContain('aria-roledescription="carousel"');
  expect(markup).toContain('aria-label="Addon screenshots"');
  expect(markup).toContain('tabindex="0"');
  expect(markup).toContain('overflow-x-auto');
  expect(markup).toContain('snap-x snap-mandatory');
  expect(markup.match(/snap-start snap-always/g)).toHaveLength(2);
  expect(markup).toContain('aria-label="1 of 2"');
  expect(markup).toContain('aria-label="2 of 2"');
  expect(markup).not.toContain('transition-opacity');
});

test('single-slide carousels retain accessible media and snap layout', () => {
  const markup = renderToStaticMarkup(
    <SnapCarousel label="Single preview" currentIndex={0} onIndexChange={() => {}}>
      {[<img key="only" src="preview.png" alt="Addon preview" />]}
    </SnapCarousel>,
  );

  expect(markup).toContain('aria-label="1 of 1"');
  expect(markup).toContain('alt="Addon preview"');
  expect(markup).toContain('shrink-0');
});
