import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";
import { HeadingText } from "../components/text";

import "../styles/card-layout.css";

import { projectsData, smallProjects } from "../data/projects-data.jsx";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const root = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project, .mini").forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 85%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="project-container" ref={root} id="projects">
      <div>
        <HeadingText text={"my projects"} />
      </div>
      <p className="projects-intro cursor-scale small">
        Two I took all the way through — designed, built, documented, benchmarked and deployed.
        Both are backend tools with a model inside them rather than AI demos, which is the only
        way I know how to build this.
      </p>

      <div className="projects-layout">
        {projectsData.map((p) => (
          <article className="project" key={p.index}>
            <div className="project-head">
              <div className="project-title">
                <h2 className="cursor-scale">{p.name}</h2>
                <span className="project-role">{p.role}</span>
              </div>
              <div className="project-links">
                <a href={p.site} target="_blank" rel="noreferrer"
                   className="link-btn cursor-scale small" aria-label={`${p.name} website`}>
                  <LuExternalLink size={18} />
                </a>
                <a href={p.repo} target="_blank" rel="noreferrer"
                   className="link-btn cursor-scale small" aria-label={`${p.name} source`}>
                  <FaGithub size={18} />
                </a>
              </div>
              <span className="project-index">{p.index}</span>
            </div>

            <p className="project-thesis cursor-scale small">{p.thesis}</p>

            <div className="project-stats">
              {p.stats.map((s) => (
                <div className="stat" key={s.v}>
                  <b>{s.k}</b>
                  <span>{s.v}</span>
                </div>
              ))}
            </div>

            <div className="project-body">
              <p className="cursor-scale small">{p.body}</p>
              <ul>
                {p.points.map((pt, i) => (
                  <li key={i} className="cursor-scale small">{pt}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mini-head">
        <h3>also built</h3>
        <span>source only — not deployed</span>
      </div>
      <div className="mini-layout">
        {smallProjects.map((sp) => (
          <a className="mini cursor-scale small" key={sp.name} href={sp.repo}
             target="_blank" rel="noreferrer">
            <div className="mini-top">
              <h4>{sp.name}</h4>
              <FaGithub size={15} />
            </div>
            <p>{sp.line}</p>
            <div className="mini-tags">
              {sp.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
