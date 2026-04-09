import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('index page contains complete projects, contact, and footer sections', async () => {
  const index = await read('src/pages/index.astro');

  assert.match(index, /id="projects"/);
  assert.match(index, /class="project-grid"/);
  assert.match(index, /class="project-card"/);

  assert.match(index, /id="contact"/);
  assert.match(index, /mailto:/);
  assert.match(index, /github\.com/);

  assert.match(index, /<footer class="site-footer"/);
  assert.match(index, /href="#top"/);
});

test('404 page exists with clear recovery actions', async () => {
  const notFound = await read('src/pages/404.astro');

  assert.match(notFound, /404/);
  assert.match(notFound, /Seite nicht gefunden/);
  assert.match(notFound, /href="\/"/);
});

test('deploy workflow builds Astro and deploys to GitHub Pages', async () => {
  const workflow = await read('.github/workflows/deploy.yml');

  assert.match(workflow, /name:\s*Deploy Astro to GitHub Pages/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /actions\/upload-pages-artifact/);
  assert.match(workflow, /actions\/deploy-pages/);
});
