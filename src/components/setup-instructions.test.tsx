import { expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { SetupInstructions } from './setup-instructions';

function render(instructions: string): string {
  return renderToStaticMarkup(<SetupInstructions>{instructions}</SetupInstructions>);
}

test('renders Markdown links with safe new-tab behavior', () => {
  const markup = render('[Voice pack](https://www.curseforge.com/wow/addons/chronicle-voices-of-kalimdor)');
  expect(markup).toContain('href="https://www.curseforge.com/wow/addons/chronicle-voices-of-kalimdor"');
  expect(markup).toContain('target="_blank"');
  expect(markup).toContain('rel="noopener noreferrer"');
  expect(markup).toContain('>Voice pack</a>');
  expect(markup).not.toContain('[Voice pack]');
});

test('renders lists, emphasis, inline commands, and fenced code', () => {
  const markup = render('1. Open **settings**\n2. Run `/lore`\n\n- *Optional* tweak\n\n```\n/lore stop\n```');
  expect(markup).toContain('<ol>');
  expect(markup).toContain('<ul>');
  expect(markup).toContain('<strong>settings</strong>');
  expect(markup).toContain('<em>Optional</em>');
  expect(markup).toContain('<code>/lore</code>');
  expect(markup).toContain('<pre><code>/lore stop\n</code></pre>');
});

test('preserves plain-text line breaks and paragraphs', () => {
  const markup = render('Install the addon.\nOpen settings.\n\nNo import needed.');
  expect(markup).toContain('<p>Install the addon.<br/>\nOpen settings.</p>');
  expect(markup).toContain('<p>No import needed.</p>');
});

test('does not render raw HTML, images, or unsafe link protocols', () => {
  const markup = render('<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">\n\n[Bad](javascript:alert%281%29)\n\n![Image](https://example.com/image.png)');
  expect(markup).not.toContain('<script');
  expect(markup).not.toContain('<img');
  expect(markup).not.toContain('onerror');
  expect(markup).not.toContain('javascript:');
});
