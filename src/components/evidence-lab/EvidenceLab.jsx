import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { injectStyles, useI18n, useInView, usePrefersReducedMotion, SignalGlyph } from './shared/labKit.jsx';

const M01 = lazy(() => import('./M01_GlanceTest.jsx'));
const M02 = lazy(() => import('./M02_StateMatrix.jsx'));
const M03 = lazy(() => import('./M03_EscalationComposer.jsx'));
const M04 = lazy(() => import('./M04_FidelityLadder.jsx'));
const M05 = lazy(() => import('./M05_HandoffMachine.jsx'));
const M06 = lazy(() => import('./M06_PressureConsole.jsx'));
const M07 = lazy(() => import('./M07_TimingBudget.jsx'));
const M08 = lazy(() => import('./M08_ResearchEvidence.jsx'));
const M09 = lazy(() => import('./M09_TokenSpecimen.jsx'));

const SHELL = {
    en: {
        eyebrow: 'APPLIED EVIDENCE',
        title: 'The lab, opened up.',
        stand: 'Nine working artifacts. Every screen below is rendered live in React — click, type, and break things.',
        meta: ['9 modules', 'live in React', 'keyboard-ready', 'reduced-motion aware'],
        navLabel: 'Evidence modules',
    },
    zh: {
        eyebrow: '實證作品',
        title: '打開實驗室。',
        stand: '九件可操作的作品。以下每個畫面都由 React 即時渲染——可點擊、可輸入、可測試極限。',
        meta: ['9 個模組', 'React 即時渲染', '鍵盤可操作', '尊重減少動態'],
        navLabel: '證據模組',
    },
};

// Nav metadata lives here (terse labels); each module owns its full frame copy.
const MODULES = [
    { id: 'gx-m01', num: '01', tone: 'var(--gx-sky)',  Comp: M01, type: { en: 'Research method',   zh: '研究方法' }, title: { en: 'Glance Test',        zh: '一眼測試' } },
    { id: 'gx-m02', num: '02', tone: 'var(--gx-teal)', Comp: M02, type: { en: 'State model',        zh: '狀態模型' }, title: { en: 'State Matrix',       zh: '狀態矩陣' } },
    { id: 'gx-m03', num: '03', tone: 'var(--gx-amber)', Comp: M03, type: { en: 'Interaction logic', zh: '互動邏輯' }, title: { en: 'Escalation',         zh: '升級策略' } },
    { id: 'gx-m04', num: '04', tone: 'var(--gx-iris)', Comp: M04, type: { en: 'Design process',     zh: '設計流程' }, title: { en: 'Fidelity Ladder',    zh: '精細度階梯' } },
    { id: 'gx-m05', num: '05', tone: 'var(--gx-sky)',  Comp: M05, type: { en: 'System model',       zh: '系統模型' }, title: { en: 'Handoff Machine',    zh: '交接狀態機' } },
    { id: 'gx-m06', num: '06', tone: 'var(--gx-teal)', Comp: M06, type: { en: 'MVP prototype',      zh: 'MVP 原型' }, title: { en: 'Pressure Console',   zh: '壓力主控台' } },
    { id: 'gx-m07', num: '07', tone: 'var(--gx-gold)', Comp: M07, type: { en: 'Interaction spec',   zh: '互動規格' }, title: { en: 'Timing Budget',      zh: '時序預算' } },
    { id: 'gx-m08', num: '08', tone: 'var(--gx-iris)', Comp: M08, type: { en: 'Validation',         zh: '驗證' },     title: { en: 'Research Evidence',  zh: '研究證據' } },
    { id: 'gx-m09', num: '09', tone: 'var(--gx-teal)', Comp: M09, type: { en: 'Design system',      zh: '設計系統' }, title: { en: 'Token Specimen',     zh: '設計代幣' } },
];

function Skeleton() {
    return (
        <div className="gx-skel" role="status" aria-label="Loading module">
            <svg viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 20 H90 l8 -14 l8 28 l8 -20 l6 6 H190 l8 -12 l8 12 H400"
                    fill="none" stroke="var(--gx-line-2)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="gx-sr-only">Loading…</span>
        </div>
    );
}

function Reveal({ children }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -40px 0px' });
    return <div ref={ref} className={`gx-reveal${inView ? ' in' : ''}`}>{children}</div>;
}

function LabNav({ lang, t, activeId, reduced }) {
    const goTo = id => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    return (
        <nav className="gx-lab-nav" aria-label={t.navLabel}>
            <div className="gx-lab-nav-inner">
                <span className="gx-lab-nav-title gx-eyebrow">{t.navLabel}</span>
                <ol>
                    {MODULES.map(m => (
                        <li key={m.id}>
                            <button
                                className={`gx-lab-nav-item${activeId === m.id ? ' active' : ''}`}
                                style={{ '--gx-accent': m.tone }}
                                aria-current={activeId === m.id ? 'true' : undefined}
                                onClick={() => goTo(m.id)}>
                                <span className="gx-lab-nav-num">{m.num}</span>
                                <span className="gx-lab-nav-text">
                                    <span className="gx-lab-nav-name">{m.title[lang]}</span>
                                    <span className="gx-lab-nav-type">{m.type[lang]}</span>
                                </span>
                                <span className="gx-lab-nav-tick" aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
}

export default function EvidenceLab() {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    const reduced = usePrefersReducedMotion();
    const [activeId, setActiveId] = useState(MODULES[0].id);
    const stackRef = useRef(null);

    // Scroll-spy: highlight the module nearest the top of the viewport.
    useEffect(() => {
        const sections = MODULES.map(m => document.getElementById(m.id)).filter(Boolean);
        if (!sections.length || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(entries => {
            const visible = entries.filter(e => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (visible[0]) setActiveId(visible[0].target.id);
        }, { rootMargin: '-20% 0px -70% 0px' });
        sections.forEach(s => io.observe(s));
        return () => io.disconnect();
    });

    return (
        <div className="gx proj-section" aria-label={t.eyebrow}>
            <header className="gx-lab-hero reveal">
                <div className="gx-lab-hero-glyph" aria-hidden="true">
                    <SignalGlyph tone="var(--gx-teal)" width={120} />
                </div>
                <span className="gx-eyebrow gx-lab-hero-eyebrow">{t.eyebrow} / {SHELL[lang === 'en' ? 'zh' : 'en'].eyebrow}</span>
                <h2 className="gx-lab-hero-title">{t.title}</h2>
                <p className="gx-lab-hero-stand">{t.stand}</p>
                <div className="gx-lab-hero-meta">
                    {t.meta.map(m => <span className="gx-caption" key={m}>{m}</span>)}
                </div>
            </header>

            <div className="gx-lab-layout">
                <LabNav lang={lang} t={t} activeId={activeId} reduced={reduced} />
                <div className="gx-lab-stack" ref={stackRef}>
                    {MODULES.map(m => (
                        <Reveal key={m.id}>
                            <Suspense fallback={<Skeleton />}>
                                <m.Comp />
                            </Suspense>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}

injectStyles('gx-lab-shell', `
.gx-lab-hero { position: relative; padding: 34px 30px 30px; margin-bottom: 30px; border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.05), transparent 60%), var(--gx-bg-1); overflow: hidden; }
.gx-lab-hero::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 4px); opacity: 0.5; }
.gx-lab-hero-glyph { position: absolute; top: 26px; right: 28px; opacity: 0.55; }
.gx-lab-hero-eyebrow { color: var(--gx-teal); }
.gx-lab-hero-title { font-family: var(--gx-font-display); font-size: clamp(32px, 5vw, 56px); font-weight: 500; line-height: 1.04; color: var(--gx-text-1); margin: 14px 0 0; letter-spacing: -0.01em; }
.gx-lab-hero-stand { max-width: 560px; margin: 16px 0 0; font-size: 16px; line-height: 1.6; color: var(--gx-text-2); }
.gx-lab-hero-meta { display: flex; flex-wrap: wrap; gap: 8px 18px; margin-top: 22px; }

.gx-lab-layout { display: grid; grid-template-columns: 1fr; gap: 20px; }
.gx-lab-stack { min-width: 0; }
.gx-lab-nav, .gx-lab-nav-inner { min-width: 0; max-width: 100%; }
.gx-lab-nav-title { display: block; margin-bottom: 12px; color: var(--gx-text-3); }
.gx-lab-nav ol { list-style: none; margin: 0; padding: 0; }
.gx-lab-nav-item { position: relative; display: flex; align-items: center; gap: 12px; width: 100%; padding: 9px 10px; border-radius: var(--gx-r-sm); color: var(--gx-text-3); transition: background 160ms var(--gx-ease), color 160ms var(--gx-ease); }
.gx-lab-nav-item:hover { color: var(--gx-text-1); background: var(--gx-bg-2); }
.gx-lab-nav-item.active { color: var(--gx-text-1); background: var(--gx-bg-2); }
.gx-lab-nav-num { font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-accent); flex: 0 0 auto; }
.gx-lab-nav-text { display: flex; flex-direction: column; min-width: 0; }
.gx-lab-nav-name { font-size: 13px; font-weight: 600; white-space: nowrap; }
.gx-lab-nav-type { font-family: var(--gx-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--gx-text-3); }
.gx-lab-nav-tick { margin-left: auto; width: 6px; height: 6px; border-radius: 50%; background: var(--gx-line-2); flex: 0 0 auto; transition: background 160ms var(--gx-ease), box-shadow 160ms var(--gx-ease); }
.gx-lab-nav-item.active .gx-lab-nav-tick { background: var(--gx-accent); box-shadow: 0 0 8px var(--gx-accent); }

.gx-skel { padding: 40px 30px; border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-lg); background: var(--gx-bg-1); }
.gx-skel svg { width: 100%; height: 40px; animation: gx-skel-pulse 1.6s var(--gx-ease) infinite; }
@keyframes gx-skel-pulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.8; } }

/* mobile: horizontal scrollable chip row */
@media (max-width: 1023px) {
  .gx-lab-nav { position: sticky; top: 0; z-index: 6; margin: 0 -4px 4px; background: linear-gradient(180deg, var(--gx-bg-0) 70%, transparent); }
  .gx-lab-nav-title { display: none; }
  .gx-lab-nav ol { display: flex; gap: 8px; overflow-x: auto; padding: 10px 4px; scrollbar-width: thin; -webkit-overflow-scrolling: touch; }
  .gx-lab-nav-item { flex: 0 0 auto; width: auto; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); }
  .gx-lab-nav-item.active { border-color: var(--gx-accent); }
  .gx-lab-nav-type { display: none; }
  .gx-lab-nav-tick { display: none; }
}
/* desktop: sticky left rail */
@media (min-width: 1024px) {
  .gx-lab-layout { grid-template-columns: 210px 1fr; gap: 30px; align-items: start; }
  .gx-lab-nav { position: sticky; top: 90px; align-self: start; }
  .gx-lab-nav-inner { border-left: 1px solid var(--gx-line-1); padding-left: 16px; }
}
@media (max-width: 767px) {
  .gx-lab-hero { padding: 24px 18px; }
  .gx-lab-hero-glyph { display: none; }
}
`);
