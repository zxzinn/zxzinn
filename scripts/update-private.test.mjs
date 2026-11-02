import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
test('imports aggregate counters, regenerates both themes, and refuses invalid data atomically', () => {
  const dir = mkdtempSync(join(tmpdir(), 'profile-metrics-'));
  try {
    for (const path of ['scripts', 'profile.json', 'README.md']) cpSync(new URL(`../${path}`, import.meta.url), join(dir, path), { recursive: true });
    const payload = { updatedAt: '2026-11-02', mergedPRs: 1234, issues: 600, packages: 39, apps: 6, adrs: 13, bilingualDocs: 58 };
    const input = join(dir, 'input.json');
    const run = () => spawnSync(process.execPath, [join(dir, 'scripts/update-private.mjs'), input], { encoding: 'utf8' });
    writeFileSync(input, JSON.stringify(payload));
    assert.equal(run().status, 0);
    const profile = readFileSync(join(dir, 'profile.json'), 'utf8');
    assert.equal(JSON.parse(profile).metrics.items[0][0], '1,234');
    for (const theme of ['dark', 'light']) assert.match(readFileSync(join(dir, `assets/metrics-${theme}.svg`), 'utf8'), /1,234/);
    const readme = readFileSync(join(dir, 'README.md'), 'utf8');
    assert.match(readme, /1,234 merged PRs authored/);
    assert.match(readme, /Private monorepo counters updated 2026-11-02/);
    assert.equal(run().status, 0);
    assert.equal(readFileSync(join(dir, 'README.md'), 'utf8'), readme);
    for (const change of [{ issues: -1 }, { apps: null }, { privateCode: 'must not publish' }, { updatedAt: 'invalid' }]) {
      writeFileSync(input, JSON.stringify({ ...payload, ...change }));
      assert.notEqual(run().status, 0);
      assert.equal(readFileSync(join(dir, 'profile.json'), 'utf8'), profile);
      assert.equal(readFileSync(join(dir, 'README.md'), 'utf8'), readme);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
