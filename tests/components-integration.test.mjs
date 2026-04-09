import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('component source files exist with key markers', async () => {
  const base = await read('src/layouts/BaseLayout.astro');
  const skillTag = await read('src/components/SkillTag.astro');
  const header = await read('src/components/Header.astro');
  const hero = await read('src/components/Hero.astro');

  assert.match(base, /og:title/);
  assert.match(base, /application\/ld\+json/);
  assert.match(skillTag, /class=\"skill-tag\"/);
  assert.match(header, /class=\"site-header\"/);
  assert.match(hero, /class=\"hero\"/);
});

test('build output contains SEO tags and hero/header content', async () => {
  await execFileAsync('npm', ['run', 'build']);
  const html = await read('dist/index.html');

  assert.match(html, /<link rel="canonical"/);
  assert.match(html, /"@context":"https:\/\/schema\.org"/);
  assert.match(html, /Hendrik Schneemann/);
  assert.match(html, /Fachinformatiker für Anwendungsentwicklung/);
  assert.match(html, /Projekte ansehen/);
  assert.match(html, /site-header/);
});
