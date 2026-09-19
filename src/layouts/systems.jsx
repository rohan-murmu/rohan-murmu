import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeadingText } from "../components/text";

import "../styles/systems.css";

gsap.registerPlugin(ScrollTrigger);

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

/* The model as a component inside a service, not a chatbot bolted onto one. */
function AiBackendDiagram() {
  const cx = 196, cy = 44, r = 26;
  return (
    <svg className="diagram" viewBox="0 0 520 168" role="img" aria-label="Agents and retrieval inside a service">
      <text className="lbl-sm" x="8" y="30">request</text>
      <line className="wire" x1="8" y1="44" x2="56" y2="44" />
      <line className="flow" x1="8" y1="44" x2="56" y2="44" />
      <rect className="node-fill" x="56" y="28" width="64" height="32" rx="2" />
      <text className="lbl" x="88" y="48" textAnchor="middle">api</text>

      <line className="wire" x1="120" y1="44" x2="170" y2="44" />
      <circle className="wire" cx={cx} cy={cy} r={r} fill="none" />
      <circle className="orbit" cx={cx} cy={cy} r={r} strokeDasharray="20 144" />
      {[-90, 0, 90, 180].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <circle key={a} className="node-fill pulse"
                  cx={cx + r * Math.cos(rad)} cy={cy + r * Math.sin(rad)} r="4" />
        );
      })}
      <text className="lbl" x={cx} y={cy + 4} textAnchor="middle">loop</text>

      <line className="wire" x1="222" y1="44" x2="272" y2="44" />
      <line className="flow" x1="222" y1="44" x2="272" y2="44" />
      <rect className="node-fill" x="272" y="16" width="104" height="56" rx="2" />
      <text className="lbl-sm" x="282" y="30">mcp tools</text>
      {["read", "query", "write ✗"].map((t, i) => (
        <g key={t}>
          <rect className={i === 2 ? "cell cut" : "cell"} x="280" y={36 + i * 12} width="88" height="9" rx="1" />
          <text className="lbl-sm" x="286" y={43 + i * 12}>{t}</text>
        </g>
      ))}

      {/* retrieval runs underneath and hands the loop its context */}
      <text className="lbl-sm" x="8" y="104">corpus</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className={i === 2 ? "cell hit" : "cell"}
              x={8 + (i % 2) * 16} y={112 + Math.floor(i / 2) * 16} width="13" height="13" rx="1" />
      ))}
      {[{ x: 62, t: "embed" }, { x: 150, t: "index" }, { x: 238, t: "rerank" }].map((b) => (
        <g key={b.t}>
          <rect className="node-fill" x={b.x} y={110} width={68} height={30} rx="2" />
          <text className="lbl" x={b.x + 34} y={130} textAnchor="middle">{b.t}</text>
        </g>
      ))}
      <line className="wire" x1="42" y1="125" x2="62" y2="125" />
      <line className="wire" x1="130" y1="125" x2="150" y2="125" />
      <line className="wire" x1="218" y1="125" x2="238" y2="125" />
      <line className="flow" x1="42" y1="125" x2="306" y2="125" />

      <path className="wire" d="M306 110 C 306 84, 240 80, 210 70" fill="none" />
      <text className="lbl" x="330" y="128">context</text>
      <text className="lbl-sm" x="330" y="144">into the window</text>
      <text className="lbl-sm" x="396" y="48">evidence,</text>
      <text className="lbl-sm" x="396" y="62">not opinion</text>
    </svg>
  );
}

/* The same build, on a box you keep warm or a function you do not. */
function CloudDeployDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 520 168" role="img" aria-label="VM and serverless deployment">
      <rect className="node" x="8" y="56" width="76" height="46" rx="2" />
      <text className="lbl" x="46" y="76" textAnchor="middle">image</text>
      <text className="lbl-sm" x="46" y="90" textAnchor="middle">docker</text>

      <line className="wire" x1="84" y1="72" x2="132" y2="40" />
      <line className="flow" x1="84" y1="72" x2="132" y2="40" />
      <rect className="node-fill" x="132" y="20" width="118" height="42" rx="2" />
      <text className="lbl" x="142" y="38">vm</text>
      <text className="lbl-sm" x="142" y="52">ec2 · long-lived · gpu</text>

      <line className="wire" x1="84" y1="86" x2="132" y2="118" />
      <line className="flow" x1="84" y1="86" x2="132" y2="118" />
      <rect className="node-fill" x="132" y="98" width="118" height="42" rx="2" />
      <text className="lbl" x="142" y="116">serverless</text>
      <text className="lbl-sm" x="142" y="130">lambda · cloud run</text>

      <text className="lbl-sm" x="258" y="34">steady load,</text>
      <text className="lbl-sm" x="258" y="48">model stays resident</text>
      <text className="lbl-sm" x="258" y="116">spiky load,</text>
      <text className="lbl-sm" x="258" y="130">pay for the call</text>

      <line className="wire" x1="250" y1="41" x2="392" y2="76" />
      <line className="wire" x1="250" y1="119" x2="392" y2="88" />
      <rect className="node" x="392" y="30" width="116" height="106" rx="2" />
      <text className="lbl-sm" x="400" y="46">managed</text>
      {["object store · s3", "queue · rabbit", "vector db", "secrets · iam"].map((t, i) => (
        <g key={t}>
          <rect className="cell" x="400" y={54 + i * 20} width="100" height="14" rx="1" />
          <text className="lbl-sm" x="406" y={64 + i * 20}>{t}</text>
        </g>
      ))}
      <text className="lbl-sm" x="8" y="126">the choice is load shape</text>
      <text className="lbl-sm" x="8" y="140">and cold start, not taste</text>
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
    title: "ai in the backend",
    Diagram: AiBackendDiagram,
    copy: (
      <>
        Not a chatbot bolted onto a product — the model as a component inside a service, with a
        retrieval path feeding it and a tool surface bounding it. Chunking, embeddings, hybrid
        search and reranking underneath; an agent loop and MCP tools on top.{" "}
        <b>What you refuse to expose is as much of the design as what you do.</b>
      </>
    ),
    tags: ["RAG", "embeddings", "vector search", "rerank", "agents", "tool calling", "MCP"],
  },
  {
    index: "04",
    title: "cloud & deployment",
    Diagram: CloudDeployDiagram,
    copy: (
      <>
        The same build on a VM you keep warm or a function you do not, and knowing which the
        load shape deserves — a resident model on EC2, a spiky endpoint on Lambda or Cloud Run.
        Plus the managed pieces around it: object storage, queues, a vector store, secrets, and
        a pipeline that ships it without anyone watching.
      </>
    ),
    tags: ["AWS · EC2 · S3 · Lambda", "GCP · Cloud Run", "Docker", "GitHub Actions", "Jenkins", "CI/CD"],
  },
  {
    index: "05",
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
    index: "06",
    title: "determinism",
    Diagram: CoreDiagram,
    copy: (
      <>
        The thread through all of it. Put the model at the edge and keep the decision in code: a
        classifier that answers differently on identical input is not a gate, and its input is
        attacker-controlled anyway. <b>The model explains; it never decides.</b>
      </>
    ),
    tags: ["typed results", "policy over scoring", "eval harnesses", "reproducibility"],
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
        Backend and AI as one system, not two skill sets. Services and realtime carry it,
        retrieval and agents run inside it, and the cloud, context and determinism decisions are
        what keep it honest once real traffic arrives.
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
