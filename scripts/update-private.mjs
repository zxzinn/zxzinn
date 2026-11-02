// Accept only aggregate counters from the private repository's scheduled workflow.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const root = new URL('../', import.meta.url);
const payload = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const keys = ['mergedPRs', 'issues', 'packages', 'apps', 'adrs', 'bilingualDocs'];
if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.updatedAt) ||
    keys.some(key => !Number.isSafeInteger(payload[key]) || payload[key] < 0) ||
    Object.keys(payload).some(key => ![...keys, 'updatedAt'].includes(key))) {
  throw new Error('Invalid private metrics payload');
}
const file = new URL('profile.json', root);
const data = JSON.parse(readFileSync(file, 'utf8'));
const labels = ['merged PRs authored', 'tracked issues', 'workspace packages', 'deployable apps', 'ADRs', 'bilingual docs'];
data.metrics = {
  caption: `ONE PRIVATE MONOREPO · AS OF ${payload.updatedAt}`,
  items: keys.map((key, index) => [payload[key].toLocaleString('en-US'), labels[index]]),
};
writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
const readmeFile = new URL('README.md', root);
let readme = readFileSync(readmeFile, 'utf8');
readme = readme.replace(/alt="[^"\n]*" src="assets\/metrics-light.svg"/, `alt="${keys.map((key, index) => `${payload[key].toLocaleString('en-US')} ${labels[index]}`).join(', ')} in one private monorepo as of ${payload.updatedAt}" src="assets/metrics-light.svg"`);
const status = `Private monorepo counters updated ${payload.updatedAt} (UTC). Counts cover authored merged PRs and all issues since repository creation, workspace package/app manifests, numbered ADRs, and paired bilingual documents under docs/ (excluding README indexes).`;
if (readme.includes('<!-- private-stats:start -->')) {
  readme = readme.replace(/<!-- private-stats:start -->[\s\S]*?<!-- private-stats:end -->/, `<!-- private-stats:start -->\n${status}\n<!-- private-stats:end -->`);
} else {
  readme = readme.replace('<!-- public-stats:start -->', `<!-- private-stats:start -->\n${status}\n<!-- private-stats:end -->\n\n<!-- public-stats:start -->`);
}
writeFileSync(readmeFile, readme);
execFileSync(process.execPath, [new URL('scripts/build.mjs', root).pathname], { stdio: 'inherit' });
