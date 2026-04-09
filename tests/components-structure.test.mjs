import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('AboutSection has section id, about text and skills grid', async () => {
  const about = await read('src/components/AboutSection.astro');
  assert.match(about, /id="about"/);
  assert.match(about, /class="about-section"/);
  assert.match(about, /class="skills-grid"/);
  assert.match(about, /<SkillTag/);
});

test('ProjectsSection has section id, intro and projects grid', async () => {
  const projects = await read('src/components/ProjectsSection.astro');
  assert.match(projects, /id="projects"/);
  assert.match(projects, /class="projects-grid"/);
  assert.match(projects, /<ProjectCard/);
});

test('ProjectCard accepts title, description, technologies and renders skill tags', async () => {
  const card = await read('src/components/ProjectCard.astro');
  assert.match(card, /class="project-card"/);
  assert.match(card, /title/);
  assert.match(card, /description/);
  assert.match(card, /technologies/);
  assert.match(card, /<SkillTag/);
});

test('ContactSection has section id with email and social links', async () => {
  const contact = await read('src/components/ContactSection.astro');
  assert.match(contact, /id="contact"/);
  assert.match(contact, /mailto:hendrik\.schneemann@icloud\.com/);
  assert.match(contact, /linkedin\.com\/in\/hschneemann/);
  assert.match(contact, /github\.com\/hsnowmansch/);
});

test('Footer has copyright and back-to-top link', async () => {
  const footer = await read('src/components/Footer.astro');
  assert.match(footer, /class="site-footer"/);
  assert.match(footer, /Hendrik Schneemann/);
  assert.match(footer, /href="#top"/);
});
