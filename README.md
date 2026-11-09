<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg">
  <img alt="Chao-Chin (Zach) Chang — software engineer working on AI platforms and infrastructure" src="assets/hero-light.svg" width="100%">
</picture>

I work on AI platforms: agent runtimes, LLM gateways, authorization, sandboxed execution, and the Kubernetes and on-prem infrastructure they run on. I learn the most from the places where application code meets framework internals — async execution, queues, memory behavior, connection pooling — and from production failures I didn't see coming.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg">
  <img alt="Architecture of the platform I am building now: surfaces, typed API, ReBAC authorization, change control, event backbone, AI gateway, workers, agent sandbox, retrieval, data stores, and Kubernetes, cloud, and on-prem runtime" src="assets/architecture-light.svg" width="100%">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/metrics-dark.svg">
  <img alt="2,563 merged PRs authored, 2,272 tracked issues, 39 workspace packages, 6 deployable apps, 17 ADRs, 77 bilingual docs in one private monorepo as of 2026-11-09" src="assets/metrics-light.svg" width="100%">
</picture>

Some of the problems I've been working through on this project:

- **Relationship-based access control.** Domain facts stay in PostgreSQL and are projected into a ReBAC graph by a background worker. Checks fail closed until a membership change has been applied, so users read their own writes without every check paying for full consistency.
- **Recording every change.** Mutations run as typed transactions or recoverable sagas, with idempotency keys, before/after snapshots, an append-only audit log, and revert plans that stop when the current state has drifted.
- **Letting tooling catch mistakes.** Repository checks cover per-handler authorization policy, database access ownership, bounded request I/O, and migration safety. I try to treat a fix as done only after the affected path has actually run.

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/impact-dark.svg">
  <img alt="At MaiAgent: WebSocket concurrency 400 to 2,000, completions P99 from about 20s to under 3s, 1,042 lines of streaming orchestration removed, 23 Terraform modules" src="assets/impact-light.svg" width="100%">
</picture>

At MaiAgent I worked on the migration from LlamaIndex to LangChain/LangGraph, an OpenAI-compatible LLM gateway, and a fair amount of production debugging across CPython, aiohttp, Django ASGI, PgBouncer, and Celery — with a lot of help from a great team.

### Open source

<a href="https://github.com/zxzinn/django-makemessages-rs"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-django-makemessages-rs-dark.svg"><img alt="django-makemessages-rs" src="assets/card-django-makemessages-rs-light.svg" width="49%"></picture></a><a href="https://github.com/zxzinn/cf-gdrive-mcp"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-cf-gdrive-mcp-dark.svg"><img alt="cf-gdrive-mcp" src="assets/card-cf-gdrive-mcp-light.svg" width="49%"></picture></a>
<a href="https://github.com/zxzinn/opencti-mcp"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-opencti-mcp-dark.svg"><img alt="opencti-mcp" src="assets/card-opencti-mcp-light.svg" width="49%"></picture></a><a href="https://github.com/zxzinn/neon-selfhost"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-neon-selfhost-dark.svg"><img alt="neon-selfhost" src="assets/card-neon-selfhost-light.svg" width="49%"></picture></a>
<a href="https://github.com/zxzinn/django-channels-jwt-stateless"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-django-channels-jwt-stateless-dark.svg"><img alt="django-channels-jwt-stateless" src="assets/card-django-channels-jwt-stateless-light.svg" width="49%"></picture></a><a href="https://github.com/zxzinn/djangorestframework-camel-case"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/card-djangorestframework-camel-case-dark.svg"><img alt="djangorestframework-camel-case" src="assets/card-djangorestframework-camel-case-light.svg" width="49%"></picture></a>

<br>

<a href="https://github.com/search?q=author%3Azxzinn+is%3Apr+is%3Amerged+-user%3Azxzinn&type=pullrequests"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/upstream-dark.svg"><img alt="Small merged pull requests to LlamaIndex, modelcontextprotocol/servers, Lightpanda, OpenTelemetry JS, Vercel AI Elements, and NeoForge" src="assets/upstream-light.svg" width="100%"></picture></a>

<p>
  <a href="https://github.com/run-llama/llama_index/pulls?q=is%3Apr+author%3Azxzinn+is%3Amerged">LlamaIndex PRs</a> ·
  <a href="https://github.com/lightpanda-io/browser/pull/4080">Lightpanda #4080</a> ·
  <a href="https://github.com/open-telemetry/opentelemetry-js/pull/6215">OpenTelemetry JS #6215</a> ·
  <a href="https://github.com/vercel/ai-elements/pull/125">AI Elements #125</a> ·
  <a href="https://github.com/neoforged/NeoForge/pull/3260">NeoForge #3260</a>
</p>

<!-- private-stats:start -->
Private monorepo counters updated 2026-11-09 (UTC). Counts cover authored merged PRs and all issues since repository creation, workspace package/app manifests, numbered ADRs, and paired bilingual documents under docs/ (excluding README indexes).
<!-- private-stats:end -->

<!-- public-stats:start -->
Public GitHub counters updated 2026-11-08 (UTC).
<!-- public-stats:end -->

---

<p>
  <a href="https://www.linkedin.com/in/zxzinn/">LinkedIn</a> ·
  <a href="mailto:zhaoxinzhang0429@gmail.com">Email</a>
</p>
