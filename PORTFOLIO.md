# Portfolio — source

The site at **[rohan-murmu.vercel.app](https://rohan-murmu.vercel.app/)**. React + Vite, GSAP for
motion, Firebase for the contact form. No UI framework; the styling is hand-written CSS.

## Run it

```bash
git clone https://github.com/rohan-murmu/rohan-murmu.git
cd rohan-murmu
npm install
npm run dev          # http://localhost:5173
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/layouts/landing.jsx` | hero — the character-resolve headline and its timings |
| `src/components/custom/hero-bg.jsx` | backdrop lattice; node coordinates are fixed, not random |
| `src/layouts/systems.jsx` | "what i can do" — the six capabilities and their SVG diagrams |
| `src/data/projects-data.jsx` | project copy, stats and links |
| `src/layouts/contact.jsx` | contact form |

To make it yours, edit `SYSTEMS` in `src/layouts/systems.jsx` and `projectsData` in
`src/data/projects-data.jsx`.

## Firebase

The contact form writes to Firestore. Add a `.env`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Notes

Entrance animations are skipped under `prefers-reduced-motion`, and the content renders in
its final state instead. If you screenshot the site with a headless browser, force that
setting — headless starves `requestAnimationFrame`, so GSAP never settles and the page
captures blank.

Fork it if it is useful to you.
