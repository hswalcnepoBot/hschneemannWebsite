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

test('placeholder index page is in migration state', async () => {
  const index = await read('src/pages/index.astro');
  assert.match(index, /Portfolio Migration in Progress/);
  assert.match(index, /Astro setup complete\./);
});

test('design token and global style files exist with expected core tokens', async () => {
  const tokens = await read('src/styles/design-tokens.css');
  const global = await read('src/styles/global.css');
  assert.match(tokens, /--color-bg-primary:\s*#0f1419/);
  assert.match(tokens, /--font-heading:/);
  assert.match(global, /\.skip-link/);
  assert.match(global, /color-scheme:\s*dark/);
});
