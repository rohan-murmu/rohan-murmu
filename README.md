<h1 align="center">Rohan Murmu</h1>

<p align="center">
  <strong>Full stack engineer who builds AI systems.</strong><br>
  Backends, realtime services and cloud infrastructure — then the AI layer on top of them.
</p>

<p align="center">
  <a href="https://rohan-murmu.vercel.app/"><b>rohan-murmu.vercel.app</b></a>
  &nbsp;·&nbsp;
  <a href="https://www.linkedin.com/in/rohan-murmu-6474b61a0/">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="mailto:tripsync.officialll@gmail.com">Email</a>
</p>

---

I spent four years on backends — microservices, realtime systems, AWS, CI/CD — and now build
AI systems on that foundation. The order matters: an agent is only ever as good as the
service, the data layer and the pipeline underneath it, and most "AI problems" I have
debugged turned out to be ordinary engineering problems wearing a new hat.

### Engineering

| | |
| --- | --- |
| **Backend** | Services split along failure lines, talking through a broker rather than through each other. A saga-based flow on RabbitMQ where every step has an undo — the interesting half of distributed work is not the happy path. |
| **Realtime** | Rooms, presence, reconnect and fan-out. Connections are cheap to open and expensive to get right. |
| **Data** | Relational where the shape is known, document where it is not. Most latency I have removed came from the query and the index, not the language — one round of that cut response time by 30%. |
| **Cloud & CI/CD** | Containers, pipelines, tests that gate a merge, and deploys nobody has to watch. EC2, S3, Lambda and MediaConvert in anger; Docker and Cloud Run since. |

### AI systems

| | |
| --- | --- |
| **Retrieval** | Chunking, embeddings, hybrid search, reranking. The vector store is the easy part — deciding what has earned a place in the window is not. |
| **Agents & tools** | Tool calling, multi-step loops, MCP servers. What you *refuse* to expose is as much of the design as what you do. |
| **Context** | Windowing, prioritisation, compaction, code maps. Nearly every agent failure I have actually debugged was a budget failure. |
| **Optimisation** | p95 latency, cost per thousand calls, and whether the answers actually got better. Same discipline either side of the stack: the harness comes before the optimisation, because a claim without a number is a vibe. |
| **Determinism** | Typed results, policy over scoring. A classifier that answers differently on identical input is not a gate. The model explains; it never decides. |

### Experience

**Adrig AI Technologies** — Full Stack Developer · *Sept 2023 – present · Remote*

Led backend development of a large-scale community platform in Node, Express and TypeScript.
Designed a microservices architecture on the saga pattern with RabbitMQ for inter-service
messaging and fault tolerance. Built an expense tracker and an image-to-video module on
FFmpeg. Ran AWS across EC2, S3, Lambda and MediaConvert, set up CI/CD on GitHub Actions with
Jest gating staging and production, and automated the repetitive parts in bash.

**Paathshala EduCare** — Full Stack Intern · *Jan 2021 – Mar 2023 · Remote*

Front-end in Vue, backend on AWS Amplify, Lambda and DynamoDB. Added authentication, API
gateways and database indexing that **cut response time by 30%**. Agile team, sprint
planning, CI/CD through Amplify.

### Stack

| | |
| --- | --- |
| **Languages** | TypeScript · JavaScript · Go · Python · C/C++ |
| **Frontend** | React · React Native · Vue · HTML5 · CSS3 |
| **Backend** | Node · Express · Nest · Django · Flask · REST · microservices |
| **Data** | PostgreSQL · MongoDB · MySQL · DynamoDB · Firestore · Redis |
| **Realtime** | WebSockets · Socket.IO · WebRTC · RabbitMQ · pub/sub |
| **Cloud & DevOps** | AWS (EC2, S3, Lambda, Amplify, MediaConvert) · GCP Cloud Run · Docker · GitHub Actions · Jenkins |
| **AI** | RAG · embeddings · vector search · agents · MCP · Ollama · LoRA/QLoRA · eval harnesses |

<sub>This repository is also the source of my portfolio site — <a href="PORTFOLIO.md">use it for your own</a>.</sub>
