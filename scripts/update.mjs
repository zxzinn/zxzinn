// Refresh public GitHub counters; private-project metrics are refreshed separately by their owning repository.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const root = new URL('../', import.meta.url);
const file = new URL('profile.json', root);
const data = JSON.parse(readFileSync(file, 'utf8'));
function api(path) {
  return JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf8' }));
}
function count(value) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid GitHub counter');
  return value;
}
for (const item of data.upstream.items) {
  const repo = api(`repos/${item[0]}`);
  const query = new URLSearchParams({ q: `repo:${item[0]} is:pr is:merged author:zxzinn`, per_page: '1' });
  const search = api(`search/issues?${query}`);
  if (search.incomplete_results) throw new Error(`Incomplete search: ${item[0]}`);
  item[1] = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(count(repo.stargazers_count));
  item[2] = count(search.total_count);
}
const project = data.projects.find(project => project.name === 'opencti-mcp');
const repo = api('repos/zxzinn/opencti-mcp');
project.metric = `${count(repo.stargazers_count)}★ · ${count(repo.forks_count)}`;
data.updatedAt = new Date().toISOString().slice(0, 10);
writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
const readmeFile = new URL('README.md', root);
let readme = readFileSync(readmeFile, 'utf8');
readme = readme.replace(/<!-- public-stats:start -->[\s\S]*?<!-- public-stats:end -->/, `<!-- public-stats:start -->\nPublic GitHub counters updated ${data.updatedAt} (UTC).\n<!-- public-stats:end -->`);
writeFileSync(readmeFile, readme);
execFileSync(process.execPath, [new URL('scripts/build.mjs', root).pathname], { stdio: 'inherit' });
