import React, { useEffect, useRef, useState } from 'react';
import { injectStyles, useI18n, usePrefersReducedMotion, useInView } from '../verification/shared/vfKit.jsx';
import { LIVE_URL, KPIS, DOMAINS, INVESTORS, SCREENS, FEATURES, COPY } from './productContent.js';

const IMG_BASE = (import.meta.env.BASE_URL || '/') + 'product/';
const DOMAIN_COLORS = [
    'var(--vf-teal)', 'var(--vf-sky)', 'var(--vf-iris)', 'var(--vf-amber)', 'var(--vf-gold)',
    'var(--vf-rose)', 'var(--vf-slate)', 'var(--vf-teal)', 'var(--vf-sky)', 'var(--vf-iris)',
];
const MAX_INVESTOR = Math.max(...INVESTORS.map(i => i.value));

const ICONS = {
    chart:  <><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></>,
    trend:  <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
    gift:   <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v9h14v-9M12 8v13M12 8S9 3 6.5 4.5 9 8 12 8zM12 8s3-5 5.5-3.5S15 8 12 8z" /></>,
    bag:    <><path d="M6 7h12l1 14H5zM9 7V5a3 3 0 0 1 6 0v2" /></>,
    coin:   <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 6a3 3 0 0 1 0 6M22 20a6 6 0 0 0-5-5.9" /></>,
};

function CountUp({ target, reduced }) {
    const [ref, inView] = useInView({ rootMargin: '0px 0px -40px 0px' });
    const [n, setN] = useState(reduced ? target : 0);
    const done = useRef(false);
    useEffect(() => {
        if (!inView || done.current) return;
        done.current = true;
        if (reduced) { setN(target); return; }
        let raf, start;
        const dur = 900;
        const step = t => {
            if (!start) start = t;
            const p = Math.min(1, (t - start) / dur);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [inView, reduced, target]);
    return <span ref={ref}>{n.toLocaleString()}</span>;
}

function ScreenTour({ t, reduced }) {
    const [idx, setIdx] = useState(0);
    const refs = useRef([]);
    const s = SCREENS[idx];
    const move = dir => {
        const next = (idx + dir + SCREENS.length) % SCREENS.length;
        setIdx(next); refs.current[next]?.focus();
    };
    return (
        <div className="ps-tour">
            <div className="ps-tour-head">
                <span className="vf-eyebrow ps-accent">{t.tourLabel}</span>
                <div className="ps-tabs" role="tablist" aria-label={t.tourLabel}>
                    {SCREENS.map((sc, i) => (
                        <button key={sc.id} role="tab" ref={el => (refs.current[i] = el)}
                            className={`ps-tab${i === idx ? ' on' : ''}`}
                            aria-selected={i === idx} tabIndex={i === idx ? 0 : -1}
                            onClick={() => setIdx(i)}
                            onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}>
                            {t.screenTitles[sc.id]}
                        </button>
                    ))}
                </div>
            </div>
            <figure className="ps-browser" role="tabpanel">
                <div className="ps-chrome">
                    <span className="ps-traffic" aria-hidden="true"><i /><i /><i /></span>
                    <span className="ps-url">itri-startup-platform.vercel.app</span>
                </div>
                <div className="ps-shot">
                    <img src={IMG_BASE + s.img} alt={t.screenTitles[s.id]} loading="lazy" decoding="async" />
                </div>
                <figcaption>
                    <span className="ps-shot-title">{t.screenTitles[s.id]}</span>
                    <span className="ps-shot-cap">{t.screenCaptions[s.id]}</span>
                </figcaption>
            </figure>
            <div className="ps-tour-dots">
                <button className="vf-btn ps-arrow" onClick={() => move(-1)} aria-label="Previous screen">←</button>
                <span className="ps-tour-count">{String(idx + 1).padStart(2, '0')} / {String(SCREENS.length).padStart(2, '0')}</span>
                <button className="vf-btn ps-arrow" onClick={() => move(1)} aria-label="Next screen">→</button>
            </div>
        </div>
    );
}

export default function ProductShowcase() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const reduced = usePrefersReducedMotion();

    return (
        <section className="vf ps proj-section" aria-label={t.eyebrow}>
            <header className="ps-hero reveal">
                <div className="ps-hero-main">
                    <span className="vf-eyebrow ps-hero-eyebrow">{t.eyebrow}</span>
                    <h2 className="ps-hero-title">{t.name}<span className="ps-hero-alt">{t.altName}</span></h2>
                    <p className="ps-hero-tagline">{t.tagline}</p>
                    <p className="ps-hero-lead">{t.lead}</p>
                    <div className="ps-hero-actions">
                        <a className="ps-cta" href={LIVE_URL} target="_blank" rel="noopener noreferrer">
                            <span>{t.cta}</span><span aria-hidden="true">↗</span>
                        </a>
                        <span className="ps-solo">{t.soloNote}</span>
                    </div>
                    <div className="ps-stack">
                        <span className="ps-stack-label">{t.stackLabel}</span>
                        {t.stack.map(s => <span className="ps-stack-tag" key={s}>{s}</span>)}
                    </div>
                </div>
            </header>

            <ScreenTour t={t} reduced={reduced} />

            <div className="ps-metrics">
                <div className="ps-metrics-head">
                    <span className="vf-eyebrow ps-accent">{t.metricsLabel}</span>
                    <span className="ps-metrics-note">{t.metricsNote}</span>
                </div>
                <div className="ps-kpis">
                    {KPIS.map(k => (
                        <div className="ps-kpi" key={k.id}>
                            <span className="ps-kpi-val"><CountUp target={k.value} reduced={reduced} /></span>
                            <span className="ps-kpi-delta">▲ {k.delta}%</span>
                            <span className="ps-kpi-name">{t.kpiNames[k.id]}</span>
                        </div>
                    ))}
                </div>

                <div className="ps-charts">
                    <div className="ps-chart">
                        <span className="ps-chart-title">{t.domainsLabel}</span>
                        <div className="ps-domains" role="img" aria-label={t.domainsLabel}>
                            {DOMAINS.map((d, i) => (
                                <div className="ps-domain" key={d.id}>
                                    <span className="ps-domain-name">{t.domainNames[d.id]}</span>
                                    <div className="ps-domain-track">
                                        <div className="ps-domain-fill" style={{ width: `${d.pct * 6}%`, background: DOMAIN_COLORS[i] }} />
                                    </div>
                                    <span className="ps-domain-val">{d.count}<em>·{d.pct}%</em></span>
                                </div>
                            ))}
                        </div>
                        <span className="ps-chart-note">{t.domainsNote}</span>
                    </div>

                    <div className="ps-chart">
                        <span className="ps-chart-title">{t.investorsLabel}</span>
                        <div className="ps-investors" role="img" aria-label={t.investorsLabel}>
                            {INVESTORS.map(iv => (
                                <div className="ps-investor" key={iv.id}>
                                    <div className="ps-investor-bar" style={{ height: `${(iv.value / MAX_INVESTOR) * 100}%` }}>
                                        <span className="ps-investor-val">{iv.value.toLocaleString()}</span>
                                    </div>
                                    <span className="ps-investor-name">{t.investorNames[iv.id]}</span>
                                </div>
                            ))}
                        </div>
                        <span className="ps-chart-note">{t.investorsNote}</span>
                    </div>
                </div>
            </div>

            <div className="ps-features">
                <span className="vf-eyebrow ps-accent">{t.featuresLabel}</span>
                <div className="ps-feature-grid">
                    {FEATURES.map(f => (
                        <div className={`ps-feature ${f.state}`} key={f.id}>
                            <span className="ps-feature-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                                    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICONS[f.icon]}</svg>
                            </span>
                            <div className="ps-feature-body">
                                <div className="ps-feature-top">
                                    <span className="ps-feature-name">{t.featureNames[f.id]}</span>
                                    <span className={`ps-state ${f.state}`}>{f.state === 'live' ? t.stateLive : t.stateBuilding}</span>
                                </div>
                                <p>{t.featureDesc[f.id]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

injectStyles('ps-style', `
.ps { --vf-accent: var(--vf-teal); }
.ps-accent { color: var(--vf-accent); }
.ps-hero { position: relative; padding: 40px 36px; border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-lg); overflow: hidden;
  background: radial-gradient(120% 140% at 100% 0%, rgba(87,166,232,0.08), transparent 50%), linear-gradient(180deg, rgba(53,194,176,0.05), transparent 60%), var(--vf-bg-1); margin-bottom: 22px; }
.ps-hero::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.014) 0 1px, transparent 1px 6px); opacity: 0.6; }
.ps-hero-main { position: relative; max-width: 720px; }
.ps-hero-eyebrow { color: var(--vf-teal); }
.ps-hero-title { font-family: var(--vf-font-display); font-size: clamp(30px, 4.2vw, 48px); font-weight: 500; line-height: 1.05; color: var(--vf-text-1); margin: 14px 0 0; letter-spacing: -0.015em; display: flex; flex-wrap: wrap; align-items: baseline; gap: 14px; }
.ps-hero-alt { font-family: var(--vf-font-body); font-size: 0.42em; font-weight: 500; letter-spacing: 0.02em; color: var(--vf-text-3); }
.ps-hero-tagline { font-family: var(--vf-font-display); font-size: clamp(17px, 2vw, 21px); font-style: italic; color: var(--vf-teal); margin: 14px 0 0; }
.ps-hero-lead { margin: 14px 0 0; font-size: 15.5px; line-height: 1.65; color: var(--vf-text-2); }
.ps-hero-actions { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; margin-top: 22px; }
.ps-cta { display: inline-flex; align-items: center; gap: 10px; font-size: 14.5px; font-weight: 600; color: var(--vf-bg-0); background: var(--vf-teal); border-radius: var(--vf-r-sm); padding: 11px 20px; transition: transform 140ms var(--vf-ease), box-shadow 200ms var(--vf-ease); box-shadow: 0 0 0 0 rgba(53,194,176,0.4); }
.ps-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(53,194,176,0.28); }
.ps-solo { font-family: var(--vf-font-data); font-size: 11.5px; letter-spacing: 0.04em; color: var(--vf-text-3); }
.ps-stack { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--vf-line-1); }
.ps-stack-label { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vf-text-3); margin-right: 4px; }
.ps-stack-tag { font-family: var(--vf-font-data); font-size: 11.5px; color: var(--vf-text-2); background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: 999px; padding: 4px 11px; }

/* screen tour */
.ps-tour { margin-bottom: 22px; }
.ps-tour-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
.ps-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
.ps-tab { font-size: 12.5px; color: var(--vf-text-3); background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: 999px; padding: 7px 14px; transition: color 160ms var(--vf-ease), border-color 160ms var(--vf-ease); }
.ps-tab:hover { color: var(--vf-text-1); }
.ps-tab.on { color: var(--vf-text-1); border-color: var(--vf-teal); background: var(--vf-teal-dim); }
.ps-browser { margin: 0; border: 1px solid var(--vf-line-2); border-radius: var(--vf-r-md); overflow: hidden; background: var(--vf-bg-3); box-shadow: 0 24px 60px rgba(0,0,0,0.4); }
.ps-chrome { display: flex; align-items: center; gap: 12px; padding: 9px 14px; background: var(--vf-bg-3); border-bottom: 1px solid var(--vf-line-1); }
.ps-traffic { display: inline-flex; gap: 6px; }
.ps-traffic i { width: 9px; height: 9px; border-radius: 50%; background: var(--vf-line-2); }
.ps-traffic i:first-child { background: #E5675A; } .ps-traffic i:nth-child(2) { background: #E8A33D; } .ps-traffic i:nth-child(3) { background: #35C2B0; }
.ps-url { font-family: var(--vf-font-data); font-size: 11.5px; color: var(--vf-text-3); background: var(--vf-bg-1); border-radius: 6px; padding: 4px 14px; }
.ps-shot { background: #fff; line-height: 0; }
.ps-shot img { width: 100%; height: auto; display: block; }
.ps-browser figcaption { display: flex; flex-direction: column; gap: 3px; padding: 13px 16px; background: var(--vf-bg-2); border-top: 1px solid var(--vf-line-1); }
.ps-shot-title { font-size: 13.5px; font-weight: 600; color: var(--vf-text-1); }
.ps-shot-cap { font-size: 12.5px; line-height: 1.5; color: var(--vf-text-2); }
.ps-tour-dots { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 14px; }
.ps-arrow { padding: 7px 13px; }
.ps-tour-count { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }

/* metrics */
.ps-metrics { margin-bottom: 22px; }
.ps-metrics-head { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 16px; }
.ps-metrics-note { font-size: 12.5px; color: var(--vf-text-3); }
.ps-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
.ps-kpi { background: var(--vf-bg-1); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 18px; }
.ps-kpi-val { display: block; font-family: var(--vf-font-data); font-size: clamp(28px, 3.4vw, 38px); font-weight: 500; color: var(--vf-text-1); line-height: 1; }
.ps-kpi-delta { display: inline-block; font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-teal); margin-top: 8px; }
.ps-kpi-name { display: block; font-size: 12.5px; color: var(--vf-text-2); margin-top: 6px; }
.ps-charts { display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; }
.ps-chart { background: var(--vf-bg-1); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 18px; }
.ps-chart-title { display: block; font-size: 13.5px; font-weight: 600; color: var(--vf-text-1); margin-bottom: 14px; }
.ps-chart-note { display: block; margin-top: 12px; font-family: var(--vf-font-data); font-size: 10.5px; color: var(--vf-text-3); }
.ps-domains { display: flex; flex-direction: column; gap: 8px; }
.ps-domain { display: grid; grid-template-columns: 96px 1fr auto; align-items: center; gap: 12px; }
.ps-domain-name { font-size: 12px; color: var(--vf-text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ps-domain-track { height: 9px; background: var(--vf-bg-3); border-radius: 999px; overflow: hidden; }
.ps-domain-fill { height: 100%; border-radius: 999px; min-width: 4px; }
.ps-domain-val { font-family: var(--vf-font-data); font-size: 12px; color: var(--vf-text-1); white-space: nowrap; }
.ps-domain-val em { font-style: normal; font-size: 10px; color: var(--vf-text-3); margin-left: 2px; }
.ps-investors { display: flex; align-items: flex-end; justify-content: space-around; gap: 8px; height: 150px; padding-top: 10px; }
.ps-investor { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; height: 100%; justify-content: flex-end; }
.ps-investor-bar { width: 100%; max-width: 46px; background: linear-gradient(180deg, var(--vf-teal), color-mix(in srgb, var(--vf-teal) 40%, transparent)); border-radius: 6px 6px 0 0; display: flex; justify-content: center; align-items: flex-start; padding-top: 5px; min-height: 20px; }
.ps-investor-val { font-family: var(--vf-font-data); font-size: 10.5px; color: var(--vf-bg-0); font-weight: 600; }
.ps-investor-name { font-size: 10.5px; color: var(--vf-text-3); text-align: center; line-height: 1.3; }

/* features */
.ps-features { }
.ps-features > .vf-eyebrow { display: block; color: var(--vf-accent); margin-bottom: 14px; }
.ps-feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.ps-feature { display: flex; gap: 14px; background: var(--vf-bg-1); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.ps-feature.building { opacity: 0.72; }
.ps-feature-icon { flex: 0 0 auto; width: 38px; height: 38px; border-radius: var(--vf-r-sm); display: flex; align-items: center; justify-content: center; color: var(--vf-teal); background: var(--vf-teal-dim); }
.ps-feature.building .ps-feature-icon { color: var(--vf-text-3); background: var(--vf-bg-2); }
.ps-feature-body { min-width: 0; }
.ps-feature-top { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ps-feature-name { font-size: 14px; font-weight: 600; color: var(--vf-text-1); }
.ps-state { font-family: var(--vf-font-data); font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 999px; padding: 2px 7px; }
.ps-state.live { color: var(--vf-teal); border: 1px solid var(--vf-teal); }
.ps-state.building { color: var(--vf-text-3); border: 1px dashed var(--vf-line-2); }
.ps-feature-body p { margin: 6px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--vf-text-2); }

@media (max-width: 860px) {
  .ps-kpis { grid-template-columns: repeat(2, 1fr); }
  .ps-charts { grid-template-columns: 1fr; }
  .ps-feature-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 720px) {
  .ps-hero { padding: 26px 18px; }
  .ps-feature-grid { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .ps-kpis { grid-template-columns: 1fr 1fr; }
  .ps-domain { grid-template-columns: 78px 1fr auto; gap: 8px; }
}
`);
