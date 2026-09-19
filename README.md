<h1 align="center">Rohan Murmu</h1>

<p align="center">
  <strong>AI engineer.</strong> I build the layer between language models and real systems.
</p>

<p align="center">
  <a href="https://rohan-murmu.vercel.app/"><b>rohan-murmu.vercel.app</b></a>
  &nbsp;·&nbsp;
  <a href="https://jasper-toolbox.vercel.app/">jasper</a>
  &nbsp;·&nbsp;
  <a href="https://gait-tool.vercel.app/">gait</a>
</p>

---

I design, build, deploy and optimise systems around language models — retrieval, agents,
tool surfaces, context, evaluation. Backend and infrastructure by background, so what I
build ships and keeps running rather than demoing well once.

Most of my recent work is developer infrastructure for coding agents: the unglamorous layer
that decides whether an agent is useful on a real codebase or just fast at being wrong.

### What I work on

| | |
| --- | --- |
| **Retrieval** | Chunking that respects structure, embeddings chosen for the corpus, hybrid search, reranking. The vector store is the easy part — deciding what has earned a place in the window is not. |
| **Agents** | Tool calling, multi-step loops, MCP servers. What you *refuse* to expose is as much of the design as what you do. |
| **Context** | Windowing, prioritisation, compaction, code maps, codebase indexing. Nearly every agent failure I have actually debugged was a budget failure. |
| **Delivery** | Docker, Cloud Run, local models via Ollama, routing between a small local model and a frontier one by cost and risk, with a fallback. A model that only runs on my laptop is a demo. |
| **Optimisation** | Eval harnesses, caching, batching, model selection, LoRA / QLoRA. I build the harness before the optimisation, because a claim without a number is a vibe. |
| **Determinism** | Typed results, policy over scoring. A classifier that answers differently on identical input is not a gate — and its input is attacker-controlled anyway. The model explains; it never decides. |

### Projects

**[jasper](https://github.com/rohan-murmu/jasper)** — architectural decisions, enforced &nbsp;·&nbsp; `Go` `1 dependency` `10 checks` `4 languages` `7 MCP tools`

Your coding agent makes architectural decisions every hour. Jasper records them as
executable checks and tells the agent — or the build — when the code stops honouring them.
Compilers ask *is this valid*, tests ask *does this work*, jasper asks *is this what we
agreed*. A pure engine with thin ports: the CLI, the MCP server and CI all run the same
function. &nbsp;[**site**](https://jasper-toolbox.vercel.app/)

**[gait](https://github.com/rohan-murmu/gait)** — the edit that broke the build &nbsp;·&nbsp; `TypeScript` `git internals` `MCP`

An agent edits forty files in twenty minutes, a test fails, and its recovery strategy is to
re-read files and guess. `git bisect` already solves this, except it searches commits and an
agent produces edits. gait checkpoints every edit as a real commit object off your branches
and bisects them in a throwaway worktree. Benchmarked across two languages: **93% fewer files
to inspect** — and the README documents the case where it loses.
&nbsp;[**site**](https://gait-tool.vercel.app/)

Both are open source and both ship an MCP server. Before these: a realtime multiplayer
backend in Go with WebSockets and a Godot client, a RAG system over asset metadata, and a
developer platform with CI/CD on AWS.

### Stack

`Go` · `TypeScript` · `Python` · `React` · `PostgreSQL` · `Docker` · `GCP / Cloud Run` · `MCP` · `Ollama`

### Elsewhere

[Portfolio](https://rohan-murmu.vercel.app/) · [Email](mailto:tripsync.officialll@gmail.com)

<sub>This repository is also the source of the portfolio site — see [PORTFOLIO.md](PORTFOLIO.md).</sub>
