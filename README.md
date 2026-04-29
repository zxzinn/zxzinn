### Chao-Chin (Zach) Chang

Backend engineer in Taipei. I work at MaiAgent on the platform behind a bunch of enterprise AI assistants in Taiwan, mostly banks, manufacturers, and government.

Most of what I touch is the unglamorous part of an AI platform: the Celery queue that keeps dropping tasks, the WebSocket layer that falls over at 400 users, the memory leak that takes down Gunicorn workers every few hours, the async ORM call that turns out to be blocking. I've gotten into the habit of reading framework source when something breaks, which is how the LlamaIndex PRs below happened.

#### Some things I've done at MaiAgent

- WebSocket layer was capping out around 400 concurrent users. Smart fanout and token batching got it to ~2,000 without throwing more boxes at it.
- LLM completions p99 sat around 20s under load. Three things turned out to be in play: duplicate cross-service queries, a couple of blocking calls hiding inside an async event loop, and Celery worker lock contention I found in a flamegraph. Got it under 3s.
- Spent a few weeks chasing a Gunicorn memory leak that turned out to be three separate things stacked on top of each other: a CPython TimerHandle reference, a LlamaIndex `ContextVar`, and an aiohttp session that nobody was closing. Wrote a per-worker memory profiling dashboard so we'd catch the next one faster.
- Built the MCP integration layer (with OAuth) so customers can plug in their own MCP servers and bind third-party accounts. Wrote a couple of remote MCP servers on Cloudflare Workers (Google Workspace, Analytics). Pushed for MCP internally before leadership was sold on it; once the PoC was working, sales and our SI partners ran with it, and custom MCP development is now an actual line of business.
- Built our "Ask AI" feature as a single meta-tool MCP that reflects over our ~300 public API endpoints at runtime, so it picks up new endpoints and schema changes on its own. Non-technical customers can drive the whole platform in natural language without anyone hand-wrapping tools.
- Rebuilt our Celery setup for at-least-once delivery: `acks_late`, `reject_on_worker_lost`, consolidated the queue topology, moved counters to Redis to get out of DB row-level lock contention.
- Moved the Celery broker from ElastiCache Redis to Amazon MQ (RabbitMQ, Multi-AZ) in production, mostly to get HA we couldn't get out of a single-AZ Redis. Mapped the consumer protocol differences, ran both brokers in parallel during cutover.
- Migrated us from Poetry to uv in about a week, after the team had been taking runs at it for six months.

#### LlamaIndex (12+ merged)

A few I'd point at:

- [#20389](https://github.com/run-llama/llama_index/pull/20389), `early_stopping_method` on agent workflows
- [#20503](https://github.com/run-llama/llama_index/pull/20503), configurable `empty_response_message` in synthesizers
- [#20082](https://github.com/run-llama/llama_index/pull/20082), MCP tool JSON schema parser, broke Composio
- [#20355](https://github.com/run-llama/llama_index/pull/20355), Bedrock reasoning model thinking blocks
- [#20463](https://github.com/run-llama/llama_index/pull/20463), `close` / `aclose` on the OpenSearch vector store

[everything](https://github.com/run-llama/llama_index/pulls?q=is%3Apr+author%3Azxzinn+is%3Amerged)

#### Other

- OpenTelemetry JS, [#6215](https://github.com/open-telemetry/opentelemetry-js/pull/6215), chasing a misleading TLS error in their gRPC exporter docs
- Threatcado XDR before MaiAgent, building security analysis agents on logs

#### Reach

zhaoxinzhang0429@gmail.com, [LinkedIn](https://linkedin.com/in/zxzinn)
