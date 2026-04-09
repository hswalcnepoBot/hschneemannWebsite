import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';

async function exists(path) {
  try {
    await access(new URL(`../${path}`, import.meta.url), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

test('legacy migration template files are removed', async () => {
  assert.equal(await exists('src/index.template.html'), false);
  assert.equal(await exists('styles.css'), false);
  assert.equal(await exists('scripts/build-html.sh'), false);
});

test('legacy partials directory is removed', async () => {
  assert.equal(await exists('src/partials'), false);
});
