export const projectsData = [
  {
    index: "01",
    name: "jasper",
    role: "architectural decisions, enforced",
    thesis:
      "Your coding agent makes architectural decisions every hour. Jasper records them, and tells the agent — or the build — when the code stops honoring them.",
    body: "Generating an architecture document is the easy half, and it is already free. The hard half is that six weeks later the code no longer matches it — and a stale doc is worse than none, because agents read documentation as ground truth. Jasper turns decisions into checks that run on every commit, and answers the agent's questions while it is still deciding.",
    stats: [
      { k: "Go", v: "language" },
      { k: "1", v: "dependency" },
      { k: "10", v: "checks" },
      { k: "4", v: "languages" },
      { k: "7", v: "MCP tools" },
    ],
    points: [
      "A pure engine with a thin impure shell: (repo bytes, decisions) → findings. The CLI, the MCP server and CI are ports over the same function.",
      "Seven MCP tools, so the agent asks “is this allowed?” while it is still deciding — not after review.",
      "Enforces its own layering. The rules it ships are the rules it is built under.",
      "Compilers ask is this valid. Tests ask does this work. Jasper asks is this what we agreed.",
    ],
    site: "https://jasper-toolbox.vercel.app/",
    repo: "https://github.com/rohan-murmu/jasper",
  },
  {
    index: "02",
    name: "gait",
    role: "the edit that broke the build",
    thesis:
      "An agent edits forty files in twenty minutes, then a test fails — and its recovery strategy is to re-read files and guess. gait finds the exact edit instead.",
    body: "git bisect already solves this, except it searches commits and an agent produces edits: a twenty-minute session makes zero commits, so there is nothing to bisect. gait manufactures the missing history, searches it somewhere the agent is not standing, and refuses to answer when its preconditions do not hold.",
    stats: [
      { k: "TS", v: "language" },
      { k: "git", v: "internals" },
      { k: "MCP", v: "surface" },
      { k: "4/4", v: "localised" },
      { k: "93%", v: "less to read" },
    ],
    points: [
      "Checkpoints every edit as a real commit object under refs/gait/, built through a throwaway index — HEAD, the index and the working tree are never touched.",
      "Bisects inside a throwaway worktree and delegates the search to git bisect run, because the chain is ordinary commits with ordinary parents.",
      "Refuses when the repro command fails everywhere, passes everywhere, or is missing, instead of returning a confident wrong sha.",
      "Benchmarked on two languages: 93% fewer files to inspect — and the README documents the case where it loses to the compiler.",
    ],
    site: "https://gait-tool.vercel.app/",
    repo: "https://github.com/rohan-murmu/gait",
  },
];
