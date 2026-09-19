import React, { useRef, useLayoutEffect } from "react";
import { gsap, TextPlugin } from "gsap/all";
import Header from "./header";
import HeroBg from "../components/custom/hero-bg";
import "../styles/landing.css";

gsap.registerPlugin(TextPlugin);

const LINES = ["hey", "this is", "rohan"];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#*+=-_%$&";

export default function Landing() {
  const landingTextRefs = useRef(null);
  const introRef = useRef(null);
  const yearRef = useRef(null);

  const introText =
    "I build backend systems and the AI that runs inside them — services, realtime, retrieval and agents, deployed on VMs and serverless. Not a product with a model bolted on the side: the infrastructure and the model are one system, and it only works if both halves are engineered.";
  const yearText = "Folio 2026";

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = Array.from(landingTextRefs.current?.children ?? []);

    if (reduced) {
      lines.forEach((el, i) => {
        el.textContent = LINES[i];
        el.classList.add("settled");
      });
      if (introRef.current) introRef.current.textContent = introText;
      if (yearRef.current) yearRef.current.textContent = yearText;
      return;
    }

    /* Each line resolves out of noise, left to right, the way the graph behind it draws
       itself in. Characters are swapped on a timer rather than every frame, because at
       60fps the churn reads as static instead of as something assembling. */
    const frames = [];
    lines.forEach((el, i) => {
      const text = LINES[i];
      const begin = performance.now() + 260 + i * 240;
      const duration = 620 + text.length * 55;
      let lastSwap = 0;
      let noise = "";
      el.classList.add("settling");

      const tick = (now) => {
        if (now < begin) {
          frames[i] = requestAnimationFrame(tick);
          return;
        }
        const p = Math.min(1, (now - begin) / duration);
        const locked = Math.floor(p * text.length);

        if (now - lastSwap > 55 || !noise) {
          lastSwap = now;
          noise = "";
          for (let c = 0; c < text.length; c++) {
            noise += text[c] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
        }
        el.textContent = text.slice(0, locked) + noise.slice(locked);

        if (p < 1) {
          frames[i] = requestAnimationFrame(tick);
        } else {
          el.textContent = text;
          el.classList.remove("settling");
          el.classList.add("settled");
        }
      };
      frames[i] = requestAnimationFrame(tick);
    });

    /* The supporting copy types in once the name has landed. */
    const ctx = gsap.context(() => {
      if (introRef.current) {
        gsap.to(introRef.current, { text: introText, duration: 1.8, ease: "none", delay: 1.5 });
      }
      if (yearRef.current) {
        gsap.to(yearRef.current, { text: yearText, duration: 1, ease: "none", delay: 2.2 });
      }
    });

    return () => {
      frames.forEach((f) => cancelAnimationFrame(f));
      ctx.revert();
    };
  }, []);

  return (
    <div className="landing-root">
      <Header />
      <div className="landing-container">
        <HeroBg />
        <div ref={landingTextRefs}>
          {LINES.map((text, index) => (
            <div key={index} className="landing-text cursor-scale">
              {text}
            </div>
          ))}
        </div>
        <div className="sub-landing-text">
          <span className="intro cursor-scale small" ref={introRef}></span>
          <span className="year cursor-scale small" ref={yearRef}></span>
        </div>
      </div>
    </div>
  );
}
