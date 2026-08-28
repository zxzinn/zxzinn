### Chao-Chin (Zach) Chang

**AI Agent Engineer | Agent Infrastructure & Developer Tooling**

I build AI agent infrastructure, developer tools, and open-source systems across agent runtimes, LLM gateways, multi-agent workflows, RAG, streaming APIs, reliability, security, and developer productivity. I tend to work where application code meets framework internals: async execution, queues, memory behavior, database pooling, and production failure modes.

Previously, I was an AI Agent Engineer and hands-on technical lead at MaiAgent, where I worked on the AI platform behind 50+ enterprise customers across finance, manufacturing, and government.

#### Selected impact at MaiAgent

- Led the platform-wide migration from LlamaIndex to LangChain and LangGraph. Consolidated Socket.IO, SSE, and completions onto shared runtime primitives, removing 1,042 lines of legacy streaming orchestration.
- Designed and built an OpenAI-compatible LLM gateway with multi-provider routing and failover, BYOK credentials, streaming, tool calls, multimodal input, embeddings, billing, and usage observability.
- Scaled the WebSocket layer from 400 to 2,000 concurrent users and reduced completions P99 from about 20 seconds to under 3 seconds by eliminating duplicate queries, blocking I/O, and worker lock contention.
- Diagnosed production failures across CPython, LlamaIndex, aiohttp, Sentry, and boto3. Fixed memory leaks, Django ASGI and PgBouncer issues, and rebuilt Celery for at-least-once delivery.
- Built team-wide engineering guardrails across CI, isolated worktree databases, automated migration repair, code review, and ECS delivery.

#### Open source and developer tooling

- [cf-gdrive-mcp](https://github.com/zxzinn/cf-gdrive-mcp): A remote MCP server on Cloudflare Workers with Google OAuth. Built before joining MaiAgent, it became the foundation of MaiAgent's production Workspace MCP.
- [django-makemessages-rs](https://github.com/zxzinn/django-makemessages-rs): A Rust replacement for Django makemessages that reduced extraction from over 20 seconds to under one second with byte-identical PO output. It was adopted in MaiAgent's pre-commit and CI workflows.
- [djangorestframework-camel-case](https://github.com/zxzinn/djangorestframework-camel-case): Added native async middleware after tracing production CurrentThreadExecutor failures to one sync-only middleware collapsing Django's ASGI chain.
- [neon-selfhost](https://github.com/zxzinn/neon-selfhost): A Go CLI and Helm chart for self-hosted, copy-on-write Postgres branching across Docker and Kubernetes.
- [django-channels-jwt-stateless](https://github.com/zxzinn/django-channels-jwt-stateless): Stateless JWT authentication middleware for Django Channels with zero database queries during WebSocket handshakes.
- [opencti-mcp](https://github.com/zxzinn/opencti-mcp): An MCP server for querying OpenCTI threat intelligence, with 40 stars and 18 forks.

#### Upstream contributions

- [LlamaIndex](https://github.com/run-llama/llama_index/pulls?q=is%3Apr+author%3Azxzinn+is%3Amerged): 12+ merged PRs across agent workflows, MCP schema parsing, Bedrock reasoning models, retry behavior, and OpenSearch resource cleanup.
- [OpenTelemetry JS PR 6215](https://github.com/open-telemetry/opentelemetry-js/pull/6215): Fixed misleading gRPC exporter documentation after tracing a local TLS failure through framework internals.

#### Contact

[LinkedIn](https://www.linkedin.com/in/zxzinn/) · [Email](mailto:zhaoxinzhang0429@gmail.com)

<details>
<summary>GitHub statistics</summary>
<br>
<a href="https://github.com/zxzinn/github-stats"><img src="https://raw.githubusercontent.com/zxzinn/github-stats/generated/overview.svg" width="49%" alt="GitHub stats"></a>
<a href="https://github.com/zxzinn/github-stats"><img src="https://raw.githubusercontent.com/zxzinn/github-stats/generated/languages.svg" width="49%" alt="Most used languages"></a>
</details>
