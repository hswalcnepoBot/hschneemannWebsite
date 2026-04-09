import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('section components contain projects, contact, and footer content', async () => {
  const projects = await read('src/components/ProjectsSection.astro');
  const contact = await read('src/components/ContactSection.astro');
  const footer = await read('src/components/Footer.astro');
  const card = await read('src/components/ProjectCard.astro');

  assert.match(projects, /id="projects"/);
  assert.match(projects, /class="projects-grid"/);
  assert.match(card, /class="project-card"/);

  assert.match(contact, /id="contact"/);
  assert.match(contact, /mailto:/);
  assert.match(contact, /github\.com/);

  assert.match(footer, /class="site-footer"/);
  assert.match(footer, /href="#top"/);
});

test('404 page exists with clear recovery actions', async () => {
  const notFound = await read('src/pages/404.astro');

  assert.match(notFound, /404/);
  assert.match(notFound, /Seite nicht gefunden/);
  assert.match(notFound, /href="\/"/);
});

test('deploy workflow builds Astro and deploys to GitHub Pages', async () => {
  const workflow = await read('.github/workflows/deploy.yml');

  assert.match(workflow, /name:\s*Deploy(?: Astro)? to GitHub Pages/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /actions\/upload-pages-artifact/);
  assert.match(workflow, /actions\/deploy-pages/);
});
