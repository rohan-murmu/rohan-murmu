# Use this as your own portfolio

The source of **[rohan-murmu.vercel.app](https://rohan-murmu.vercel.app/)**. React + Vite,
GSAP for motion, Firebase for the contact form. No UI framework and no Tailwind — the
styling is hand-written CSS, so nothing fights you when you change it.

Fork it, change the content files below, deploy. You should not need to touch the layout
components unless you want to.

## Quick start

```bash
git clone https://github.com/rohan-murmu/rohan-murmu.git your-portfolio
cd your-portfolio
npm install
npm run dev          # http://localhost:5173
```

## Make it yours

Work down this list. Everything else is layout you can leave alone.

| What | Where | Notes |
| --- | --- | --- |
| Your name | `src/layouts/landing.jsx` → `LINES` | Three lines; they resolve out of noise one after another. |
| Intro paragraph | `src/layouts/landing.jsx` → `introText` | Types in after the name lands. |
| Year / tagline | `src/layouts/landing.jsx` → `yearText` | |
| Capabilities | `src/layouts/systems.jsx` → `SYSTEMS` | Title, copy, tags and which diagram to render. |
| Diagrams | `src/layouts/systems.jsx` | One function per diagram, plain inline SVG. |
| Projects | `src/data/projects-data.jsx` | Name, thesis, stat row, bullet points, links. |
| Location badge | `src/components/custom/location.jsx` | |
| Social links | `src/data/links-data.jsx` | |
| Contact blurb | `src/layouts/contact.jsx` → `.contact-note` | |
| Colours & type | `src/index.css`, `src/styles/*.css` | Greys are `rgba(181,181,181,α)`; the background is `#000`. |

### Capabilities

Each entry in `SYSTEMS` is an object:

```jsx
{
  index: "01",
  title: "backend systems",
  Diagram: BackendDiagram,   // any component returning <svg className="diagram">
  copy: <>Prose, with <b>the sharp bit</b> in bold.</>,
  tags: ["Node", "Go", "RabbitMQ"],
  wide: false,               // true makes the card span both columns
}
```

Delete entries you do not want; the grid reflows. To draw a new diagram, copy an existing
function and use the shared classes — `wire`, `flow` (animated dashes), `node`, `node-fill`,
`cell`, `cell hit`, `cell cut`, `lbl`, `lbl-sm`, `pulse`. They are all defined in
`src/styles/systems.css`, so a new diagram inherits the theme for free.

### Projects

Each entry in `projectsData` renders one full-width panel:

```jsx
{
  index: "01",
  name: "project",
  role: "one line under the title",
  thesis: "The sentence someone should remember.",
  body: "A paragraph of context.",
  stats: [{ k: "Go", v: "language" }, { k: "10", v: "checks" }],
  points: ["What is technically interesting about it.", "…"],
  site: "https://…",
  repo: "https://…",
}
```

## Contact form

It writes to Firestore. Create a Firebase project, enable Firestore, then add `.env`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Don't want Firebase? Delete `src/configs/firebase.js` and swap the `handleSubmit` in
`src/layouts/contact.jsx` for a `mailto:` link or a form service.

## Deploy

Vercel, zero config — import the repo, framework preset **Vite**, add the `VITE_FIREBASE_*`
variables. Netlify and Cloudflare Pages work the same way (`npm run build`, publish `dist`).

## Things worth knowing

- **Full-height sections need `box-sizing: border-box`.** `height: 100vh` plus padding in
  content-box makes a section taller than the screen. The header is an absolute overlay for
  the same reason — in normal flow it pushes the hero down by its own height.
- **Motion is opt-out.** Every entrance checks `prefers-reduced-motion` and renders the final
  state instead. Keep that if you add animations.
- **Screenshotting it headlessly?** Headless Chrome starves `requestAnimationFrame`, so GSAP
  never settles and the page captures blank. Pass `--force-prefers-reduced-motion`.
- **The backdrop graph uses fixed coordinates**, not random ones, so it renders identically
  every load and you can tune it by eye — `src/components/custom/hero-bg.jsx`.

## Credit

MIT-spirited: use it, change it, ship it. A link back is appreciated but not required.
