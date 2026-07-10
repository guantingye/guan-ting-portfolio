import React, { Suspense, lazy, useEffect, useState } from 'react';
import { injectStyles, useI18n, useInView, usePrefersReducedMotion } from './shared/dtKit.jsx';
import { MODULES, SHELL } from './data/dtContent.js';

const COMPONENTS = {
  M01: lazy(() => import('./M01_SourceIntake.jsx')),
  M02: lazy(() => import('./M02_RunConsole.jsx')),
  M03: lazy(() => import('./M03_EntityWorkbench.jsx')),
  M04: lazy(() => import('./M04_SchemaExplorer.jsx')),
  M05: lazy(() => import('./M05_QualityGates.jsx')),
  M06: lazy(() => import('./M06_ProvenanceLedger.jsx')),
  M07: lazy(() => import('./M07_DecisionSurfaces.jsx')),
};

function Skeleton() {
  return (
    <div className="dt-skel" role="status" aria-label="Loading evidence module">
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="4" width="120" height="8" rx="2" fill="var(--dt-line-2)" />
        <rect x="0" y="18" width="260" height="6" rx="2" fill="var(--dt-line-1)" />
        <rect x="0" y="30" width="200" height="6" rx="2" fill="var(--dt-line-1)" />
      </svg>
      <span className="dt-sr-only">Loading…</span>
    </div>
  );
}

function Reveal({ children }) {
  const [ref, inView] = useInView({ rootMargin: '0px 0px -40px 0px' });
  return <div ref={ref} className={`dt-reveal${inView ? ' in' : ''}`}>{children}</div>;
}

function DataroomNav({ lang, t, activeId, reduced }) {
  const goTo = id => document.getElementById(id)?.scrollIntoView({
    behavior: reduced ? 'auto' : 'smooth',
    block: 'start',
  });
  return (
    <nav className="dt-nav" aria-label={t.navLabel}>
      <div className="dt-nav-inner">
        <span className="dt-nav-title dt-eyebrow">{t.navLabel}</span>
        <ol>
          {MODULES.map(m => (
            <li key={m.id}>
              <button
                className={`dt-nav-item${activeId === m.id ? ' active' : ''}`}
                style={{ '--dt-accent': m.tone }}
                aria-current={activeId === m.id ? 'true' : undefined}
                onClick={() => goTo(m.id)}
              >
                <span className="dt-nav-num">{m.num}</span>
                <span className="dt-nav-text">
                  <span className="dt-nav-name">{m.title[lang]}</span>
                  <span className="dt-nav-type">{m.type[lang]}</span>
                </span>
                <span className="dt-nav-tick" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default function DataroomEvidence() {
  const { lang } = useI18n();
  const t = SHELL[lang] ?? SHELL.en;
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(MODULES[0].id);

  useEffect(() => {
    const sections = MODULES.map(m => document.getElementById(m.id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  });

  return (
    <div className="dt proj-section" aria-label={t.eyebrow}>
      <header className="dt-hero reveal">
        <span className="dt-eyebrow dt-hero-eyebrow">
          {t.eyebrow} / {SHELL[lang === 'en' ? 'zh' : 'en'].eyebrow}
        </span>
        <h2 className="dt-hero-title">{t.title}</h2>
        <p className="dt-hero-stand">{t.stand}</p>
        <div className="dt-hero-meta">
          {t.meta.map(m => <span className="dt-tag" key={m}>{m}</span>)}
        </div>
      </header>

      <div className="dt-layout">
        <DataroomNav lang={lang} t={t} activeId={activeId} reduced={reduced} />
        <div className="dt-stack">
          {MODULES.map(m => {
            const Comp = COMPONENTS[m.key];
            return (
              <Reveal key={m.id}>
                <Suspense fallback={<Skeleton />}>
                  <Comp />
                </Suspense>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

injectStyles('dt-shell', `
.dt-hero { position: relative; padding: 34px 30px 30px; margin-bottom: 30px; border: 1px solid var(--dt-line-1); border-radius: var(--dt-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.05), transparent 60%), var(--dt-bg-1); overflow: hidden; }
.dt-hero::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.014) 0 1px, transparent 1px 6px); opacity: 0.5; }
.dt-hero-eyebrow { color: var(--dt-teal); position: relative; }
.dt-hero-title { font-family: var(--dt-font-display); font-size: clamp(30px, 4.6vw, 50px); font-weight: 500; line-height: 1.06; color: var(--dt-text-1); margin: 14px 0 0; letter-spacing: -0.01em; position: relative; }
.dt-hero-stand { max-width: 620px; margin: 16px 0 0; font-size: 16px; line-height: 1.7; color: var(--dt-text-2); position: relative; }
.dt-hero-meta { display: flex; flex-wrap: wrap; gap: 8px 14px; margin-top: 22px; position: relative; }

.dt-layout { display: grid; grid-template-columns: 1fr; gap: 20px; }
.dt-stack { min-width: 0; }
.dt-nav, .dt-nav-inner { min-width: 0; max-width: 100%; }
.dt-nav-title { display: block; margin-bottom: 12px; color: var(--dt-text-3); }
.dt-nav ol { list-style: none; margin: 0; padding: 0; }
.dt-nav-item { position: relative; display: flex; align-items: center; gap: 12px; width: 100%; padding: 9px 10px; border-radius: var(--dt-r-sm); color: var(--dt-text-3); transition: background 160ms var(--dt-ease), color 160ms var(--dt-ease); }
.dt-nav-item:hover { color: var(--dt-text-1); background: var(--dt-bg-2); }
.dt-nav-item.active { color: var(--dt-text-1); background: var(--dt-bg-2); }
.dt-nav-num { font-family: var(--dt-font-data); font-size: 12px; color: var(--dt-accent); flex: 0 0 auto; }
.dt-nav-text { display: flex; flex-direction: column; min-width: 0; }
.dt-nav-name { font-size: 13px; font-weight: 600; white-space: nowrap; }
.dt-nav-type { font-family: var(--dt-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--dt-text-3); }
.dt-nav-tick { margin-left: auto; width: 6px; height: 6px; border-radius: 50%; background: var(--dt-line-2); flex: 0 0 auto; transition: background 160ms var(--dt-ease), box-shadow 160ms var(--dt-ease); }
.dt-nav-item.active .dt-nav-tick { background: var(--dt-accent); box-shadow: 0 0 8px var(--dt-accent); }

.dt-skel { min-height: 420px; padding: 40px 30px; border: 1px solid var(--dt-line-1); border-radius: var(--dt-r-lg); background: var(--dt-bg-1); }
.dt-skel svg { width: 100%; height: 40px; animation: dt-skel-pulse 1.6s var(--dt-ease) infinite; }
@keyframes dt-skel-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.9; } }

.dt-reveal { opacity: 0; transform: translateY(18px); transition: opacity 520ms var(--dt-ease), transform 520ms var(--dt-ease); }
.dt-reveal.in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .dt-reveal { opacity: 1; transform: none; transition: none; }
  .dt-skel svg { animation: none; }
}

@media (min-width: 1024px) {
  .dt-layout { grid-template-columns: 230px minmax(0, 1fr); align-items: start; gap: 28px; }
  .dt-nav { position: sticky; top: 94px; }
}

@media (max-width: 767px) {
  .dt-hero { padding: 28px 20px 24px; }
  .dt-nav ol { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .dt-nav-item { padding: 8px; }
  .dt-nav-name { white-space: normal; }
}
`);
