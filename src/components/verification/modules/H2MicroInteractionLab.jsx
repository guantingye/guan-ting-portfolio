import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.H2;
const ACCENT = PHASE_MAP[M.phase].accent;

function CountUp({ target, dur, playKey, reduced }) {
    const [n, setN] = useState(reduced ? target : 0);
    useEffect(() => {
        if (reduced) { setN(target); return; }
        let raf, start;
        const step = t => {
            if (!start) start = t;
            const p = Math.min(1, (t - start) / dur);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [playKey, reduced]);
    return <span>{n}</span>;
}

function Demo({ id, playKey, reduced }) {
    const cls = reduced ? '' : ' play';
    if (id === 'badge') return (
        <div className={`vf-h2-badge${cls}`} key={playKey}>
            <span className="vf-h2-badge-chip">156 <em>▾</em></span>
            <div className="vf-h2-badge-panel">
                {['grants 42', 'market 51', 'collab 63'].map(x => <span key={x}>{x}</span>)}
            </div>
        </div>
    );
    if (id === 'skeleton') return (
        <div className={`vf-h2-skel${cls}`} key={playKey}>
            <div className="vf-h2-skel-a"><span className="vf-h2-skbox" /><span className="vf-h2-skline" /></div>
            <div className="vf-h2-skel-b"><span className="vf-h2-avatar" /><span className="vf-h2-txt"><i /><i /></span></div>
        </div>
    );
    if (id === 'count') return (
        <div className="vf-h2-count" key={playKey}>
            <span className="vf-h2-count-num"><CountUp target={94} dur={M.samples.find(s => s.id === 'count').dur} playKey={playKey} reduced={reduced} /></span>
            <span className="vf-h2-count-label">results</span>
        </div>
    );
    return ( // save
        <div className={`vf-h2-save${cls}`} key={playKey}>
            <span className="vf-h2-save-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path className="vf-h2-star" d="M12 3l2.9 6 6.6.6-5 4.3 1.5 6.5L12 17l-6 3.4 1.5-6.5-5-4.3 6.6-.6z" /></svg>
            </span>
            <span className="vf-h2-toast">saved</span>
        </div>
    );
}

export default function H2MicroInteractionLab() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const reduced = usePrefersReducedMotion();
    const [keys, setKeys] = useState({});
    const replay = id => setKeys(k => ({ ...k, [id]: (k[id] || 0) + 1 }));

    return (
        <ModuleFrame id="vf-h2" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className="vf-h2" style={{ '--vf-accent': ACCENT }}>
                {reduced && <p className="vf-h2-reduced">{c.reducedNote}</p>}
                <div className="vf-h2-grid">
                    {M.samples.map(s => (
                        <div className="vf-h2-cell" key={s.id}>
                            <div className="vf-h2-cell-head">
                                <span className="vf-h2-name">{c.sampleNames[s.id]}</span>
                                <button className="vf-btn vf-h2-replay" onClick={() => replay(s.id)} disabled={reduced}>
                                    ↻ {c.replay}
                                </button>
                            </div>
                            <div className="vf-h2-stage" style={{ '--dur': `${s.dur}ms`, '--ease': s.ease }}>
                                <Demo id={s.id} playKey={keys[s.id] || 0} reduced={reduced} />
                            </div>
                            <p className="vf-h2-desc">{c.sampleDesc[s.id]}</p>
                            <table className="vf-h2-spec">
                                <tbody>
                                    <tr><th>{c.propLabel}</th><td>{c.specs[s.id].prop}</td></tr>
                                    <tr><th>{c.durLabel}</th><td>{s.dur}ms</td></tr>
                                    <tr><th>{c.easeLabel}</th><td className="vf-h2-ease">{s.ease}</td></tr>
                                    <tr><th>{c.whyLabel}</th><td>{c.specs[s.id].why}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-h2-style', `
.vf-h2-reduced { margin: 0 0 14px; font-family: var(--vf-font-data); font-size: 11.5px; color: var(--vf-amber); border: 1px solid var(--vf-amber); border-radius: var(--vf-r-sm); padding: 8px 12px; background: var(--vf-amber-dim); }
.vf-h2-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.vf-h2-cell { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 15px; }
.vf-h2-cell-head { display: flex; align-items: center; justify-content: space-between; }
.vf-h2-name { font-size: 13.5px; font-weight: 600; color: var(--vf-text-1); }
.vf-h2-replay { font-size: 11.5px; padding: 5px 10px; }
.vf-h2-stage { height: 86px; display: flex; align-items: center; justify-content: center; margin: 12px 0; background: var(--vf-bg-1); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); overflow: hidden; }
.vf-h2-desc { margin: 0 0 10px; font-size: 12px; color: var(--vf-text-3); }
.vf-h2-spec { width: 100%; border-collapse: collapse; }
.vf-h2-spec th { text-align: left; width: 78px; font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); font-weight: 400; padding: 4px 0; vertical-align: top; }
.vf-h2-spec td { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-2); padding: 4px 0; line-height: 1.45; }
.vf-h2-ease { word-break: break-all; }

/* badge demo */
.vf-h2-badge-chip { display: inline-flex; align-items: center; gap: 5px; font-family: var(--vf-font-data); font-size: 15px; color: var(--vf-bg-0); background: var(--vf-accent); border-radius: 6px; padding: 5px 11px; }
.vf-h2-badge-panel { display: flex; gap: 6px; margin-top: 8px; max-height: 0; opacity: 0; overflow: hidden; }
.vf-h2-badge-panel span { font-family: var(--vf-font-data); font-size: 9.5px; color: var(--vf-text-2); background: var(--vf-bg-3); border-radius: 4px; padding: 3px 6px; white-space: nowrap; }
.vf-h2-badge { text-align: center; }
.vf-h2-badge.play .vf-h2-badge-panel { animation: vf-h2-expand var(--dur) var(--ease) forwards; }
@keyframes vf-h2-expand { to { max-height: 40px; opacity: 1; } }
.vf-h2-badge:not(.play) .vf-h2-badge-panel { max-height: 40px; opacity: 1; }

/* skeleton demo */
.vf-h2-skel { width: 82%; }
.vf-h2-skel-a, .vf-h2-skel-b { display: flex; align-items: center; gap: 8px; }
.vf-h2-skel-b { position: absolute; }
.vf-h2-skbox, .vf-h2-avatar { width: 26px; height: 26px; border-radius: 6px; background: var(--vf-line-2); flex: 0 0 auto; }
.vf-h2-avatar { background: var(--vf-accent); opacity: 0.6; }
.vf-h2-skline { height: 8px; flex: 1; border-radius: 4px; background: var(--vf-line-2); }
.vf-h2-txt { display: flex; flex-direction: column; gap: 5px; flex: 1; }
.vf-h2-txt i { height: 6px; border-radius: 3px; background: var(--vf-line-1); }
.vf-h2-txt i:first-child { width: 70%; } .vf-h2-txt i:last-child { width: 45%; }
.vf-h2-skel .vf-h2-skel-a { animation: vf-h2-shimmer 1.6s var(--ease) infinite; }
.vf-h2-skel .vf-h2-skel-b { opacity: 0; }
.vf-h2-skel.play .vf-h2-skel-a { animation: vf-h2-fadeout var(--dur) var(--ease) forwards; }
.vf-h2-skel.play .vf-h2-skel-b { animation: vf-h2-fadein var(--dur) var(--ease) forwards; }
.vf-h2-skel:not(.play) .vf-h2-skel-a { display: none; }
.vf-h2-skel:not(.play) .vf-h2-skel-b { position: static; opacity: 1; }
@keyframes vf-h2-shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 0.85; } }
@keyframes vf-h2-fadeout { to { opacity: 0; } }
@keyframes vf-h2-fadein { from { opacity: 0; } to { opacity: 1; } }

/* count demo */
.vf-h2-count { display: flex; align-items: baseline; gap: 8px; }
.vf-h2-count-num { font-family: var(--vf-font-data); font-size: 40px; font-weight: 500; color: var(--vf-accent); line-height: 1; }
.vf-h2-count-label { font-size: 13px; color: var(--vf-text-3); }

/* save demo */
.vf-h2-save { position: relative; display: flex; align-items: center; gap: 12px; }
.vf-h2-save-btn { display: inline-flex; padding: 8px; border-radius: 8px; background: var(--vf-bg-3); border: 1px solid var(--vf-line-2); }
.vf-h2-star { fill: none; stroke: var(--vf-text-3); stroke-width: 1.6; stroke-linejoin: round; }
.vf-h2-toast { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-bg-0); background: var(--vf-accent); border-radius: 5px; padding: 4px 9px; opacity: 0; }
.vf-h2-save.play .vf-h2-star { animation: vf-h2-fill var(--dur) var(--ease) forwards; }
.vf-h2-save.play .vf-h2-toast { animation: vf-h2-toast var(--dur) var(--ease) forwards; }
.vf-h2-save:not(.play) .vf-h2-star { fill: var(--vf-accent); stroke: var(--vf-accent); }
.vf-h2-save:not(.play) .vf-h2-toast { opacity: 1; }
@keyframes vf-h2-fill { 0% { fill: transparent; stroke: var(--vf-text-3); transform: scale(1); } 60% { transform: scale(1.25); } 100% { fill: var(--vf-accent); stroke: var(--vf-accent); transform: scale(1); } }
@keyframes vf-h2-toast { 0% { opacity: 0; transform: translateX(-6px); } 100% { opacity: 1; transform: none; } }

@media (max-width: 720px) { .vf-h2-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  .vf-h2-badge-panel, .vf-h2-skel-a, .vf-h2-skel-b, .vf-h2-star, .vf-h2-toast { animation: none !important; }
}
`);
