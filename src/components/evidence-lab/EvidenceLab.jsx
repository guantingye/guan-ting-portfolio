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
        eyebrow: 'APPLIED HMI EVIDENCE',
        title: 'UX/HMI Interaction Design Lab',
        stand: 'A set of nine working artifacts that turn HMI design principles into something you can try, inspect, and evaluate. Each module is rendered live in React, so the page behaves like a small interaction lab rather than a static case-study screenshot.',
        meta: ['9 interactive modules', 'live React artifacts', 'keyboard accessible', 'reduced-motion aware'],
        navLabel: 'Evidence modules',
    },
    zh: {
        eyebrow: 'HMI 設計證據',
        title: 'UX/HMI 互動設計實驗室',
        stand: '這是一組由九個可操作模組組成的作品切片，把 HMI 設計原則轉成可以親自操作、觀察與驗證的互動證據。每個畫面都由 React 即時渲染，因此它不是靜態截圖，而是一個可以被測試的小型互動實驗室。',
        meta: ['9 個互動模組', 'React 即時渲染', '支援鍵盤操作', '尊重減少動態'],
        navLabel: '實作證據模組',
    },
};

// Nav metadata lives here (terse labels); each module owns its full frame copy.
const MODULES = [
    {
        id: 'gx-m01',
        num: '01',
        tone: 'var(--gx-sky)',
        Comp: M01,
        type: { en: 'Research method', zh: '研究驗證' },
        title: { en: 'Glance Recognition Test', zh: '一眼辨識測試' },
    },
    {
        id: 'gx-m02',
        num: '02',
        tone: 'var(--gx-teal)',
        Comp: M02,
        type: { en: 'Interface states', zh: '狀態設計' },
        title: { en: 'State Matrix', zh: '介面狀態矩陣' },
    },
    {
        id: 'gx-m03',
        num: '03',
        tone: 'var(--gx-amber)',
        Comp: M03,
        type: { en: 'Alert logic', zh: '警示邏輯' },
        title: { en: 'Escalation Strategy', zh: '警示升級策略' },
    },
    {
        id: 'gx-m04',
        num: '04',
        tone: 'var(--gx-iris)',
        Comp: M04,
        type: { en: 'Design process', zh: '設計推進' },
        title: { en: 'Fidelity Ladder', zh: '精細度階梯' },
    },
    {
        id: 'gx-m05',
        num: '05',
        tone: 'var(--gx-sky)',
        Comp: M05,
        type: { en: 'Human-machine flow', zh: '人機流程' },
        title: { en: 'Handoff Machine', zh: '人機交接流程' },
    },
    {
        id: 'gx-m06',
        num: '06',
        tone: 'var(--gx-teal)',
        Comp: M06,
        type: { en: 'Operational prototype', zh: '可操作原型' },
        title: { en: 'Pressure Console', zh: '高壓情境控制台' },
    },
    {
        id: 'gx-m07',
        num: '07',
        tone: 'var(--gx-gold)',
        Comp: M07,
        type: { en: 'Interaction timing', zh: '互動節奏' },
        title: { en: 'Timing Budget', zh: '反應時間預算' },
    },
    {
        id: 'gx-m08',
        num: '08',
        tone: 'var(--gx-iris)',
        Comp: M08,
        type: { en: 'Validation', zh: '研究證據' },
        title: { en: 'Research Evidence', zh: '研究證據整理' },
    },
    {
        id: 'gx-m09',
        num: '09',
        tone: 'var(--gx-teal)',
        Comp: M09,
        type: { en: 'Design system', zh: '設計規格' },
        title: { en: 'Token Specimen', zh: '視覺規格樣本' },
    },
];

function Skeleton() {
    return (
        <div className="gx-skel" role="status" aria-label="Loading evidence module">
            <svg viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
                <path
                    d="M0 20 H90 l8 -14 l8 28 l8 -20 l6 6 H190 l8 -12 l8 12 H400"
                    fill="none"
                    stroke="var(--gx-line-2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
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
    const goTo = id => document.getElementById(id)?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start',
    });

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
                                onClick={() => goTo(m.id)}
                            >
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
            const visible = entries
                .filter(e => e.isIntersecting)
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
                <span className="gx-eyebrow gx-lab-hero-eyebrow">
                    {t.eyebrow} / {SHELL[lang === 'en' ? 'zh' : 'en'].eyebrow}
                </span>
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
.gx-lab-hero-stand { max-width: 620px; margin: 16px 0 0; font-size: 16px; line-height: 1.7; color: var(--gx-text-2); }
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
@keyframes gx-skel-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.9; } }

.gx-reveal { opacity: 0; transform: translateY(18px); transition: opacity 520ms var(--gx-ease), transform 520ms var(--gx-ease); }
.gx-reveal.in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .gx-reveal { opacity: 1; transform: none; transition: none; }
  .gx-skel svg { animation: none; }
}

@media (min-width: 1024px) {
  .gx-lab-layout { grid-template-columns: 230px minmax(0, 1fr); align-items: start; gap: 28px; }
  .gx-lab-nav { position: sticky; top: 94px; }
}

@media (max-width: 767px) {
  .gx-lab-hero { padding: 28px 20px 24px; }
  .gx-lab-hero-glyph { opacity: 0.25; right: 18px; }
  .gx-lab-nav ol { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .gx-lab-nav-item { padding: 8px; }
  .gx-lab-nav-name { white-space: normal; }
}
`);