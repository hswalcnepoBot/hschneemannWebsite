import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('Astro config includes GitHub Pages site setup', async () => {
  const config = await read('astro.config.mjs');
  assert.match(config, /site:\s*'https:\/\/hendrikschneemann\.tech'/);
  assert.match(config, /base:\s*'\//);
  assert.match(config, /format:\s*'file'/);
});

test('index page uses BaseLayout with core migration sections', async () => {
  const index = await read('src/pages/index.astro');
  assert.match(index, /import BaseLayout from '\.\.\/layouts\/BaseLayout\.astro'/);
  assert.match(index, /<Header \/>/);
  assert.match(index, /<Hero \/>/);
  assert.match(index, /id="about"/);
  assert.match(index, /id="projects"/);
  assert.match(index, /id="contact"/);
});

test('design token and global style files exist with expected core tokens', async () => {
  const tokens = await read('src/styles/design-tokens.css');
  const global = await read('src/styles/global.css');
  assert.match(tokens, /--color-bg-primary:\s*#0f1419/);
  assert.match(tokens, /--font-heading:/);
  assert.match(global, /\.skip-link/);
  assert.match(global, /color-scheme:\s*dark/);
});
