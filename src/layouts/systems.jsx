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

const SYSTEMS = [
  {
    index: "01",
    title: "retrieval",
    Diagram: RetrievalDiagram,
    copy: (
      <>
        Chunking that respects structure, embeddings chosen for the corpus, and reranking —
        because vector similarity alone confidently returns passages that are{" "}
        <b>plausible and wrong</b>. The vector store is the easy part. The hard part is
        deciding what has earned a place in the window.
      </>
    ),
    tags: ["ingestion", "chunking", "embeddings", "vector search", "hybrid + rerank", "semantic metadata"],
  },
  {
    index: "02",
    title: "agents",
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
    index: "03",
    title: "context",
    Diagram: ContextDiagram,
    copy: (
      <>
        A window is a budget. Nearly every agent failure I have actually debugged was a budget
        failure — <b>the right fact existed and never made it in</b>, or the wrong one crowded
        it out. Codebase indexes and code maps exist to spend that budget well.
      </>
    ),
    tags: ["context engineering", "prioritisation", "compaction", "code maps", "codebase indexing"],
  },
  {
    index: "04",
    title: "determinism",
    Diagram: CoreDiagram,
    copy: (
      <>
        Both my tools put the model at the edge and keep the decision in code. A classifier
        that answers differently on identical input is not a gate — and its input is
        attacker-controlled anyway. <b>The model explains; it never decides.</b>
      </>
    ),
    tags: ["typed results", "policy over scoring", "evaluation harnesses", "local + frontier models"],
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
        <HeadingText text={"what i build"} />
      </div>
      <p className="systems-intro cursor-scale small">
        I build the layer between language models and real systems — retrieval that returns the
        right thing, agents with a tool surface worth trusting, and a deterministic core the
        model is never allowed to overrule.
      </p>
      <div className="systems-grid">
        {SYSTEMS.map(({ index, title, Diagram, copy, tags }) => (
          <div className="system" key={index}>
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
