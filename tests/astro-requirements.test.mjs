import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('public CNAME points to hendrikschneemann.tech', async () => {
  const cname = await read('public/CNAME');

  assert.equal(cname.trim(), 'hendrikschneemann.tech');
});

test('README documents the Astro workflow and project structure', async () => {
  const readme = await read('README.md');

  assert.match(readme, /npm install/);
  assert.match(readme, /npm run dev/);
  assert.match(readme, /npm run build/);
  assert.match(readme, /npm run preview/);
  assert.match(readme, /pages/);
  assert.match(readme, /layouts/);
  assert.match(readme, /components/);
  assert.match(readme, /styles/);
  assert.match(readme, /public/);
  assert.match(readme, /GitHub Actions/i);
});
