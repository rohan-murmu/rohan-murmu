import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeadingText } from "../components/text";

import "../styles/systems.css";

gsap.registerPlugin(ScrollTrigger);

/* Retrieval: a corpus narrowed down to the few passages that earn a place in the window. */
function RetrievalDiagram() {
  const cells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      const hit = (r === 1 && c === 2) || (r === 3 && c === 0);
      cells.push(
        <rect
          key={`${r}-${c}`}
          className={`cell${hit ? " hit" : ""}`}
          x={8 + c * 15}
          y={26 + r * 15}
          width={11}
          height={11}
          rx={1}
        />
      );
    }
  }
  const boxes = [
    { x: 86, label: "chunk" },
    { x: 174, label: "embed" },
    { x: 262, label: "index" },
    { x: 350, label: "rerank" },
  ];
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Retrieval pipeline">
      <line className="wire" x1="56" y1="52" x2="440" y2="52" />
      <line className="flow" x1="56" y1="52" x2="440" y2="52" />
      {cells}
      <text className="lbl-sm" x="8" y="100">corpus</text>

      {boxes.map((b, i) => (
        <g key={b.label}>
          <rect className="node-fill" x={b.x} y={30} width={56} height={44} rx={2} />
          <text className="lbl" x={b.x + 28} y={90} textAnchor="middle">{b.label}</text>
        </g>
      ))}

      {/* chunk: three slices */}
      <g className="pulse">
        <rect className="cell" x="96" y="40" width="36" height="6" rx="1" />
        <rect className="cell" x="96" y="49" width="36" height="6" rx="1" />
        <rect className="cell" x="96" y="58" width="36" height="6" rx="1" />
      </g>
      {/* embed: a vector cloud */}
      <g className="pulse">
        {[[188,44],[200,56],[212,42],[196,66],[216,60],[206,50]].map(([cx, cy], i) => (
          <circle key={i} className="cell" cx={cx} cy={cy} r="2.4" />
        ))}
      </g>
      {/* index: lit neighbours */}
      <g>
        {[0,1,2,3].map((i) => (
          <rect key={i} className={i === 1 ? "cell hit" : "cell"}
                x={272 + (i % 2) * 20} y={38 + Math.floor(i / 2) * 20}
                width="16" height="14" rx="1" />
        ))}
      </g>
      {/* rerank: reordered rows, the top one promoted */}
      <g>
        <rect className="cell hit" x="360" y="38" width="38" height="6" rx="1" />
        <rect className="cell" x="360" y="48" width="28" height="6" rx="1" />
        <rect className="cell" x="360" y="58" width="33" height="6" rx="1" />
      </g>

      <rect className="node" x="452" y="22" width="56" height="60" rx="2" />
      <g className="pulse">
        <rect className="cell hit" x="460" y="30" width="40" height="7" rx="1" />
        <rect className="cell hit" x="460" y="41" width="40" height="7" rx="1" />
      </g>
      <text className="lbl" x="480" y="98" textAnchor="middle">window</text>
    </svg>
  );
}

/* Agents: a loop, with the tool surface hanging off it. */
function AgentDiagram() {
  const cx = 150, cy = 62, r = 44;
  const nodes = [
    { a: -90, t: "model" },
    { a: 0, t: "tool call" },
    { a: 90, t: "execute" },
    { a: 180, t: "observe" },
  ];
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Agent loop">
      <circle className="wire" cx={cx} cy={cy} r={r} />
      <circle className="orbit" cx={cx} cy={cy} r={r} strokeDasharray="34 244" />
      {nodes.map(({ a, t }, i) => {
        const rad = (a * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        return (
          <g key={t}>
            <circle className="node-fill pulse" cx={x} cy={y} r="6" />
            <text className="lbl" x={x} y={a === 90 ? y + 18 : a === -90 ? y - 11 : y - 11}
                  textAnchor="middle">{t}</text>
          </g>
        );
      })}

      {/* the tool surface: what you choose to expose */}
      <line className="wire" x1="196" y1="62" x2="286" y2="62" />
      <line className="flow" x1="196" y1="62" x2="286" y2="62" />
      <rect className="node-fill" x="286" y="26" width="104" height="72" rx="2" />
      <text className="lbl" x="338" y="20" textAnchor="middle">mcp server</text>
      {["read", "search", "check", "write ✗"].map((t, i) => (
        <g key={t}>
          <rect className={i === 3 ? "cell cut" : "cell"} x="296" y={34 + i * 16} width="84" height="11" rx="1" />
          <text className="lbl-sm" x="302" y={43 + i * 16}>{t}</text>
        </g>
      ))}
      <text className="lbl-sm" x="404" y="60">what you expose</text>
      <text className="lbl-sm" x="404" y="74">is the design</text>
    </svg>
  );
}

/* Context: a window is a budget, and most agent failures are budget failures. */
function ContextDiagram() {
  const segs = [
    { w: 46, t: "system" },
    { w: 58, t: "task" },
    { w: 196, t: "retrieved" },
    { w: 116, t: "history" },
    { w: 84, t: "reserve" },
  ];
  let x = 10;
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Context budget">
      <rect className="node" x="8" y="24" width="504" height="34" rx="2" />
      {segs.map((s, i) => {
        const el = (
          <g key={s.t}>
            <rect className={i === 2 ? "cell hit" : "cell"} x={x + 2} y={28} width={s.w - 4} height={26} rx="1" />
            <text className="lbl-sm" x={x + s.w / 2} y={70} textAnchor="middle">{s.t}</text>
          </g>
        );
        x += s.w;
        return el;
      })}
      <text className="lbl" x="8" y="18">context window</text>

      {/* candidates below: what was considered, and what got cut */}
      <text className="lbl" x="8" y="94">candidates</text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} className={i > 2 ? "cell cut" : "cell hit"}
              x={8 + i * 32} y={102} width="26" height="16" rx="1" />
      ))}
      <text className="lbl-sm" x="272" y="114">trimmed before the model ever sees them</text>
    </svg>
  );
}

/* The through-line of both projects: the model explains, the code decides. */
function CoreDiagram() {
  const cx = 150, cy = 66;
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Deterministic core, model at the edge">
      <circle className="ring-dash" cx={cx} cy={cy} r="56" style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <circle className="ring" cx={cx} cy={cy} r="34" />
      <text className="lbl" x={cx} y={cy - 4} textAnchor="middle">core</text>
      <text className="lbl-sm" x={cx} y={cy + 10} textAnchor="middle">deterministic</text>

      {[
        { x: cx, y: cy - 70, t: "explain" },
        { x: cx + 72, y: cy + 4, t: "summarise" },
        { x: cx, y: cy + 78, t: "suggest" },
        { x: cx - 76, y: cy + 4, t: "draft" },
      ].map((n) => (
        <text key={n.t} className="lbl pulse" x={n.x} y={n.y} textAnchor="middle">{n.t}</text>
      ))}

      <line className="wire" x1="222" y1="66" x2="286" y2="66" />
      <rect className="node-fill" x="286" y="30" width="116" height="20" rx="2" />
      <text className="lbl-sm" x="294" y="44">parse · diff · check</text>
      <rect className="node-fill" x="286" y="56" width="116" height="20" rx="2" />
      <text className="lbl-sm" x="294" y="70">typed result</text>
      <rect className="cell cut" x="286" y="82" width="116" height="20" rx="2" />
      <text className="lbl-sm" x="294" y="96">model as a gate ✗</text>
      <text className="lbl-sm" x="412" y="70">reproducible,</text>
      <text className="lbl-sm" x="412" y="84">and testable</text>
    </svg>
  );
}


/* Optimisation: a claim without a number is a vibe. */
function EvalDiagram() {
  const rows = [
    { t: "latency", before: 210, after: 96 },
    { t: "cost", before: 168, after: 74 },
    { t: "quality", before: 104, after: 182 },
  ];
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Measured optimisation">
      {rows.map((r, i) => {
        const y = 22 + i * 34;
        return (
          <g key={r.t}>
            <text className="lbl-sm" x="8" y={y + 16}>{r.t}</text>
            <rect className="cell cut" x="66" y={y} width={r.before} height="10" rx="1" />
            <rect className="cell hit bar" x="66" y={y + 13} width={r.after} height="10" rx="1" />
            <text className="lbl-sm" x={66 + Math.max(r.before, r.after) + 8} y={y + 18}>
              {i === 2 ? "+75%" : i === 0 ? "-54%" : "-56%"}
            </text>
          </g>
        );
      })}
      <line className="wire" x1="66" y1="126" x2="440" y2="126" />
      <text className="lbl-sm" x="66" y="138">baseline</text>
      <text className="lbl-sm" x="190" y="138">measure → keep or revert</text>
    </svg>
  );
}


/* Services that fail independently, and a broker that lets them. */
function BackendDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Service architecture">
      <rect className="node-fill" x="8" y="16" width="84" height="32" rx="2" />
      <text className="lbl-sm" x="20" y="36">api gateway</text>
      <rect className="node-fill" x="8" y="74" width="84" height="32" rx="2" />
      <text className="lbl-sm" x="20" y="94">orders</text>

      <line className="wire" x1="92" y1="32" x2="128" y2="50" />
      <line className="wire" x1="92" y1="90" x2="128" y2="72" />
      <line className="flow" x1="92" y1="32" x2="128" y2="50" />

      <rect className="node pulse" x="128" y="12" width="42" height="110" rx="3" />
      <text className="lbl" x="149" y="66" textAnchor="middle" transform="rotate(-90 149 66)">queue</text>

      <line className="wire" x1="170" y1="46" x2="208" y2="32" />
      <line className="wire" x1="170" y1="84" x2="208" y2="90" />
      <line className="flow" x1="170" y1="46" x2="208" y2="32" />

      <rect className="node-fill" x="208" y="16" width="84" height="32" rx="2" />
      <text className="lbl-sm" x="220" y="36">billing</text>
      <rect className="node-fill" x="208" y="74" width="84" height="32" rx="2" />
      <text className="lbl-sm" x="220" y="94">media · ffmpeg</text>

      {/* the half that matters: undoing a step that already succeeded */}
      <path className="wire" d="M250 48 C 250 62, 150 132, 50 116 L 50 108"
            strokeDasharray="4 4" fill="none" />
      <text className="lbl-sm" x="150" y="134" textAnchor="middle">compensate</text>

      <text className="lbl" x="310" y="40">saga</text>
      <text className="lbl-sm" x="310" y="56">each step has an undo</text>
      <text className="lbl-sm" x="310" y="76">retries · dead letters</text>
      <text className="lbl-sm" x="310" y="92">idempotent handlers</text>
    </svg>
  );
}

/* One connection per client, one fan-out per event. */
function RealtimeDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Realtime fan-out">
      {[26, 62, 98].map((y, i) => (
        <g key={y}>
          <rect className="cell" x="10" y={y} width="30" height="16" rx="2" />
          <line className="wire" x1="40" y1={y + 8} x2="150" y2="66" />
          {i === 1 && <line className="flow" x1="40" y1={y + 8} x2="150" y2="66" />}
        </g>
      ))}
      <text className="lbl-sm" x="10" y="132">clients</text>

      <rect className="node-fill pulse" x="150" y="40" width="96" height="52" rx="3" />
      <text className="lbl" x="198" y="62" textAnchor="middle">hub</text>
      <text className="lbl-sm" x="198" y="78" textAnchor="middle">rooms · presence</text>

      {[14, 40, 66, 92, 118].map((y, i) => (
        <g key={y}>
          <line className="wire" x1="246" y1="66" x2="360" y2={y + 8} />
          {(i === 0 || i === 3) && <line className="flow" x1="246" y1="66" x2="360" y2={y + 8} />}
          <rect className={i % 2 ? "cell" : "cell hit"} x="360" y={y} width="30" height="16" rx="2" />
        </g>
      ))}

      <text className="lbl" x="404" y="52">fan-out</text>
      <text className="lbl-sm" x="404" y="70">websockets</text>
      <text className="lbl-sm" x="404" y="86">pub / sub</text>
    </svg>
  );
}

/* The same query, before and after the index it deserved. */
function DataDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Query and index">
      <text className="lbl" x="8" y="18">table</text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} className={i === 5 ? "cell hit" : "cell"}
              x={8 + i * 22} y={26} width="18" height="44" rx="1" />
      ))}
      <text className="lbl-sm" x="8" y="84">full scan</text>

      <path className="wire" d="M120 92 L 120 106 L 250 106" fill="none" />
      <text className="lbl" x="196" y="100">index</text>

      <text className="lbl-sm" x="266" y="34">before</text>
      <rect className="cell cut" x="318" y="24" width="180" height="12" rx="1" />
      <text className="lbl-sm" x="266" y="60">after</text>
      <rect className="cell hit bar" x="318" y="50" width="126" height="12" rx="1" />
      <text className="lbl" x="456" y="60">-30%</text>

      <text className="lbl-sm" x="266" y="96">postgres · mongo · dynamo</text>
      <text className="lbl-sm" x="266" y="112">shape the query, then the index</text>
    </svg>
  );
}

/* Commit to production, without anyone watching it happen. */
function CloudDiagram() {
  const stages = [
    { x: 74, t: "test" },
    { x: 158, t: "build" },
    { x: 242, t: "scan" },
  ];
  return (
    <svg className="diagram" viewBox="0 0 520 140" role="img" aria-label="Pipeline and environments">
      <circle className="node-fill pulse" cx="26" cy="56" r="11" />
      <text className="lbl-sm" x="8" y="84">commit</text>
      <line className="wire" x1="37" y1="56" x2="440" y2="56" />
      <line className="flow" x1="37" y1="56" x2="440" y2="56" />

      {stages.map((st) => (
        <g key={st.t}>
          <rect className="node-fill" x={st.x} y={40} width={66} height={32} rx="2" />
          <text className="lbl" x={st.x + 33} y={60} textAnchor="middle">{st.t}</text>
        </g>
      ))}

      <rect className="node" x="326" y="34" width="72" height="44" rx="2" />
      <text className="lbl" x="362" y="54" textAnchor="middle">image</text>
      <text className="lbl-sm" x="362" y="68" textAnchor="middle">registry</text>

      <line className="wire" x1="398" y1="56" x2="440" y2="26" />
      <line className="wire" x1="398" y1="56" x2="440" y2="86" />
      <rect className="cell" x="440" y="18" width="66" height="18" rx="2" />
      <text className="lbl-sm" x="448" y="31">staging</text>
      <rect className="cell hit" x="440" y="78" width="66" height="18" rx="2" />
      <text className="lbl-sm" x="448" y="91">production</text>

      <text className="lbl-sm" x="74" y="112">github actions · jenkins</text>
      <text className="lbl-sm" x="242" y="112">docker · aws · cloud run</text>
    </svg>
  );
}

const SYSTEMS = [
  {
    index: "01",
    title: "backend systems",
    Diagram: BackendDiagram,
    copy: (
      <>
        Services split along failure lines, talking through a broker rather than through each
        other. I have shipped a saga-based flow on RabbitMQ where <b>every step has an undo</b>,
        because the interesting half of distributed work is not the happy path.
      </>
    ),
    tags: ["Node · Express · Nest", "Go", "REST APIs", "microservices", "RabbitMQ", "saga pattern"],
  },
  {
    index: "02",
    title: "realtime",
    Diagram: RealtimeDiagram,
    copy: (
      <>
        Connections are cheap to open and expensive to get right — rooms, presence, reconnect,
        and the fan-out that decides whether a hundred users feel instant or feel broken. Built
        a collaborative canvas and a multiplayer backend on this.
      </>
    ),
    tags: ["WebSockets", "Socket.IO", "WebRTC", "pub / sub", "Redis", "message queues"],
  },
  {
    index: "03",
    title: "data",
    Diagram: DataDiagram,
    copy: (
      <>
        Relational where the shape is known, document where it is not. Most latency I have
        removed came from the query and the index, not the language —{" "}
        <b>one round of that cut response time by 30%</b>.
      </>
    ),
    tags: ["PostgreSQL", "MongoDB", "DynamoDB", "Firestore", "indexing", "query tuning"],
  },
  {
    index: "04",
    title: "cloud & ci/cd",
    Diagram: CloudDiagram,
    copy: (
      <>
        Containers, pipelines and the boring guarantees — tests that gate a merge, staging that
        resembles production, and deploys nobody has to watch. EC2, S3, Lambda and MediaConvert
        in anger; Cloud Run and Docker for everything since.
      </>
    ),
    tags: ["Docker", "AWS · EC2 · S3 · Lambda", "GCP · Cloud Run", "GitHub Actions", "Jenkins", "bash"],
  },
  {
    index: "05",
    title: "retrieval",
    Diagram: RetrievalDiagram,
    copy: (
      <>
        Chunking that respects structure, embeddings chosen for the corpus, and reranking —
        because vector similarity alone confidently returns passages that are{" "}
        <b>plausible and wrong</b>. The vector store is the easy part. The hard part is deciding
        what has earned a place in the window.
      </>
    ),
    tags: ["ingestion", "chunking", "embeddings", "vector search", "hybrid + rerank"],
  },
  {
    index: "06",
    title: "agents & tools",
    Diagram: AgentDiagram,
    copy: (
      <>
        A loop, not a personality. The model proposes, tools execute, results return as
        evidence. Everything interesting lives in the tool surface: what you expose, what you{" "}
        <b>refuse</b> to expose, and whether a tool can tell the model when it applies.
      </>
    ),
    tags: ["tool calling", "multi-step agents", "MCP servers", "orchestration", "failure paths"],
  },
  {
    index: "07",
    title: "context",
    Diagram: ContextDiagram,
    copy: (
      <>
        A window is a budget. Nearly every agent failure I have actually debugged was a budget
        failure — <b>the right fact existed and never made it in</b>, or the wrong one crowded
        it out. Codebase indexes and code maps exist to spend that budget well.
      </>
    ),
    tags: ["context engineering", "prioritisation", "compaction", "code maps", "indexing"],
  },
  {
    index: "08",
    title: "optimisation",
    Diagram: EvalDiagram,
    copy: (
      <>
        p95 latency, cost per thousand calls, and whether the answers actually got better. Same
        discipline either side of the stack: I build the harness before the optimisation,
        because <b>a claim without a number is a vibe</b>.
      </>
    ),
    tags: ["eval harnesses", "caching", "batching", "model selection", "LoRA / QLoRA", "profiling"],
  },
  {
    index: "09",
    title: "determinism",
    wide: true,
    Diagram: CoreDiagram,
    copy: (
      <>
        The thread through all of it. Put the model at the edge and keep the decision in code: a
        classifier that answers differently on identical input is not a gate, and its input is
        attacker-controlled anyway. <b>The model explains; it never decides.</b> It is also why
        both my tools return typed results a caller can test, rather than prose a caller has to
        trust.
      </>
    ),
    tags: ["typed results", "policy over scoring", "reproducibility", "local + frontier models"],
  },
];

export default function Systems() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".system").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="systems-container" ref={root} id="systems">
      <div>
        <HeadingText text={"what i can do"} />
      </div>
      <p className="systems-intro cursor-scale small">
        Backends, realtime systems and cloud infrastructure first — then retrieval, agents and
        the tooling around them. The top half of this list is what makes the bottom half survive
        production: an agent is only ever as good as the service, the data layer and the pipeline
        underneath it.
      </p>
      <div className="systems-grid">
        {SYSTEMS.map(({ index, title, Diagram, copy, tags, wide }) => (
          <div className={`system${wide ? " wide" : ""}`} key={index}>
            <div className="system-head">
              <h2 className="cursor-scale">{title}</h2>
              <span className="system-index">{index}</span>
            </div>
            <Diagram />
            <p className="system-copy cursor-scale small">{copy}</p>
            <div className="system-tags">
              {tags.map((t) => (
                <span key={t} className="cursor-scale small">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
