import React from "react";

/**
 * Hero backdrop: a dot lattice with a faint embedding-space graph over it.
 * Fixed coordinates rather than random ones, so it renders identically every load
 * and can be tuned by eye.
 */
const NODES = [
  [12, 22], [26, 14], [38, 30], [22, 41], [8, 54], [33, 58],
  [47, 18], [56, 38], [44, 52], [63, 62], [52, 74], [70, 28],
  [78, 47], [88, 24], [92, 60], [74, 78], [86, 82], [60, 12],
  [30, 78], [16, 70], [66, 44], [40, 68],
];

/* Only near neighbours are wired, so the graph reads as structure rather than noise. */
const EDGES = (() => {
  const out = [];
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const dx = NODES[i][0] - NODES[j][0];
      const dy = NODES[i][1] - NODES[j][1];
      if (Math.hypot(dx, dy) < 21) out.push([i, j]);
    }
  }
  return out;
})();

export default function HeroBg() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-dots" />
      <svg className="hero-graph" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid slice">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]} y1={NODES[a][1]}
            x2={NODES[b][0]} y2={NODES[b][1]}
            pathLength="1"
            className="hero-edge"
            style={{ "--d": `${0.35 + i * 0.035}s`, "--b": `${(i % 9) * 0.7}s` }}
          />
        ))}
        {NODES.map(([x, y], i) => (
          <circle
            key={i} cx={x} cy={y} r={i % 7 === 0 ? 0.85 : 0.45}
            className={`hero-node${i % 7 === 0 ? " lit" : ""}`}
            style={{ "--d": `${0.15 + i * 0.045}s`, "--b": `${(i % 6) * 0.9}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
