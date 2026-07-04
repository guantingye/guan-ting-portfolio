import React, { useMemo, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, mulberry32 } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.D1;
const ACCENT = PHASE_MAP[M.phase].accent;
const CLUSTER_TONE = { trust: 'var(--vf-teal)', target: 'var(--vf-sky)', reconcile: 'var(--vf-iris)', timely: 'var(--vf-amber)' };

function AffinityWall({ c, reduced }) {
    const [clustered, setClustered] = useState(reduced);
    const scatter = useMemo(() => {
        const rnd = mulberry32(41);
        return c.notes.map(() => ({ x: 4 + rnd() * 78, y: 4 + rnd() * 80, r: (rnd() - 0.5) * 6 }));
    }, [c]);

    return (
        <div className="vf-d1-wall">
            <div className="vf-d1-wall-head">
                <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.wallLabel}</span>
                <button className="vf-btn" onClick={() => setClustered(v => !v)} aria-pressed={clustered}>
                    {clustered ? c.resetBtn : c.clusterBtn}
                </button>
            </div>
            {!clustered && <p className="vf-d1-wall-hint">{c.wallHint}</p>}

            {clustered ? (
                <div className="vf-d1-clusters">
                    {c.clusters.map(cl => (
                        <div className="vf-d1-cluster" key={cl.id} style={{ '--t': CLUSTER_TONE[cl.id] }}>
                            <span className="vf-d1-cluster-name">{cl.name}</span>
                            <div className="vf-d1-cluster-notes">
                                {c.notes.filter(n => n.c === cl.id).map((n, i) => (
                                    <span className="vf-d1-note sm" key={i}>{n.t}</span>
                                ))}
                            </div>
                            <p className="vf-d1-cluster-insight">{cl.insight}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="vf-d1-scatter">
                    {c.notes.map((n, i) => (
                        <span key={i} className="vf-d1-note"
                            style={{ left: `${scatter[i].x}%`, top: `${scatter[i].y}%`, '--r': `${scatter[i].r}deg`, '--t': CLUSTER_TONE[n.c] }}>
                            {n.t}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function PersonaTabs({ c }) {
    const [idx, setIdx] = useState(0);
    const refs = useRef([]);
    const move = dir => {
        const next = (idx + dir + c.personas.length) % c.personas.length;
        setIdx(next);
        refs.current[next]?.focus();
    };
    const p = c.personas[idx];
    return (
        <div className="vf-d1-persona">
            <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.personaLabel}</span>
            <div className="vf-d1-tabs" role="tablist" aria-label={c.personaLabel}>
                {c.personas.map((pp, i) => (
                    <button key={i} role="tab" ref={el => (refs.current[i] = el)}
                        className={`vf-d1-tab${i === idx ? ' on' : ''}`}
                        aria-selected={i === idx} tabIndex={i === idx ? 0 : -1}
                        onClick={() => setIdx(i)}
                        onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}>
                        {pp.name}
                    </button>
                ))}
            </div>
            <div className="vf-d1-file" role="tabpanel">
                <span className="vf-d1-file-role">{p.role}</span>
                <p className="vf-d1-jtbd">
                    <span className="vf-d1-jtbd-k">When</span> {p.when}
                    <span className="vf-d1-jtbd-k">I want to</span> {p.want}
                    <span className="vf-d1-jtbd-k">so I can</span> {p.so}
                </p>
                <div className="vf-d1-po">
                    <div><span className="vf-d1-po-k">Pains</span><ul>{p.pains.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
                    <div><span className="vf-d1-po-k">Desired outcomes</span><ul>{p.outcomes.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
                </div>
            </div>
        </div>
    );
}

export default function D1ResearchOpsPanel() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const reduced = usePrefersReducedMotion();

    return (
        <ModuleFrame id="vf-d1" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot} disclaimer={c.disclaimer}>
            <div className="vf-d1" style={{ '--vf-accent': ACCENT }}>
                <div className="vf-d1-plan">
                    <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.planLabel}</span>
                    <div className="vf-d1-plan-grid">
                        <div>
                            <span className="vf-d1-sub">{c.questionsLabel}</span>
                            <ol className="vf-d1-q">{c.questions.map((q, i) => <li key={i}>{q}</li>)}</ol>
                        </div>
                        <div>
                            <span className="vf-d1-sub">{c.methodsLabel}</span>
                            <ul className="vf-d1-methods">
                                {c.methods.map((m, i) => (
                                    <li key={i}><b>{m.name}</b><span>{m.desc}</span></li>
                                ))}
                            </ul>
                            <span className="vf-d1-sub" style={{ marginTop: 14 }}>{c.sampleLabel}</span>
                            <div className="vf-d1-sample">
                                {c.sample.map((s, i) => (
                                    <span className="vf-d1-samp" key={i}>{s.role}<b>×{s.n}</b></span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <AffinityWall c={c} reduced={reduced} />
                <PersonaTabs c={c} />
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-d1-style', `
.vf-d1 { display: flex; flex-direction: column; gap: 22px; }
.vf-d1-sub { display: block; font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vf-text-3); margin-bottom: 8px; }
.vf-d1-plan-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px; }
.vf-d1-q { margin: 0; padding-left: 18px; }
.vf-d1-q li { font-size: 13.5px; line-height: 1.55; color: var(--vf-text-2); margin-bottom: 8px; }
.vf-d1-methods { list-style: none; margin: 0; padding: 0; }
.vf-d1-methods li { margin-bottom: 9px; }
.vf-d1-methods b { display: block; font-size: 13px; color: var(--vf-text-1); font-weight: 600; }
.vf-d1-methods span { font-size: 12px; color: var(--vf-text-3); }
.vf-d1-sample { display: flex; flex-wrap: wrap; gap: 7px; }
.vf-d1-samp { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-2); background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: 999px; padding: 4px 10px; }
.vf-d1-samp b { color: var(--vf-accent); margin-left: 5px; }

.vf-d1-wall { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-d1-wall-head { display: flex; align-items: center; justify-content: space-between; }
.vf-d1-wall-hint { margin: 8px 0 0; font-size: 12px; color: var(--vf-text-3); }
.vf-d1-scatter { position: relative; height: 220px; margin-top: 12px; }
.vf-d1-note { position: absolute; font-size: 11px; line-height: 1.35; color: var(--vf-text-2); background: var(--vf-bg-3); border: 1px solid var(--vf-line-1); border-left: 2px solid var(--t); border-radius: 3px; padding: 5px 8px; max-width: 150px; transform: rotate(var(--r, 0deg)); box-shadow: 0 4px 10px rgba(0,0,0,0.25); transition: transform 400ms var(--vf-ease); }
.vf-d1-note.sm { position: static; max-width: none; transform: none; box-shadow: none; margin-bottom: 5px; display: block; }
.vf-d1-clusters { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 12px; }
.vf-d1-cluster { border: 1px solid var(--vf-line-1); border-top: 2px solid var(--t); border-radius: var(--vf-r-sm); padding: 12px; background: var(--vf-bg-1); }
.vf-d1-cluster-name { display: block; font-size: 13px; font-weight: 600; color: var(--vf-text-1); margin-bottom: 8px; }
.vf-d1-cluster-notes { margin-bottom: 10px; }
.vf-d1-cluster-insight { margin: 0; padding-top: 9px; border-top: 1px solid var(--vf-line-1); font-size: 12px; line-height: 1.55; color: var(--vf-text-2); }

.vf-d1-persona { }
.vf-d1-tabs { display: flex; gap: 4px; margin-top: 10px; }
.vf-d1-tab { font-size: 13px; font-weight: 600; color: var(--vf-text-3); background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-bottom: none; border-radius: var(--vf-r-sm) var(--vf-r-sm) 0 0; padding: 9px 16px; position: relative; top: 1px; }
.vf-d1-tab.on { color: var(--vf-text-1); background: var(--vf-bg-3); border-color: var(--vf-line-2); }
.vf-d1-file { background: var(--vf-bg-3); border: 1px solid var(--vf-line-2); border-radius: 0 var(--vf-r-md) var(--vf-r-md) var(--vf-r-md); padding: 18px; }
.vf-d1-file-role { font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.06em; color: var(--vf-accent); }
.vf-d1-jtbd { margin: 12px 0 0; font-family: var(--vf-font-display); font-size: 18px; line-height: 1.5; color: var(--vf-text-1); }
.vf-d1-jtbd-k { display: inline; font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); margin: 0 6px 0 2px; }
.vf-d1-jtbd-k:first-child { margin-left: 0; }
.vf-d1-po { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--vf-line-1); }
.vf-d1-po-k { display: block; font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vf-text-3); margin-bottom: 6px; }
.vf-d1-po ul { list-style: none; margin: 0; padding: 0; }
.vf-d1-po li { position: relative; padding-left: 14px; font-size: 12.5px; line-height: 1.5; color: var(--vf-text-2); margin-bottom: 6px; }
.vf-d1-po li::before { content: ''; position: absolute; left: 2px; top: 8px; width: 4px; height: 4px; border-radius: 50%; background: var(--vf-accent); }
@media (max-width: 720px) {
  .vf-d1-plan-grid, .vf-d1-po { grid-template-columns: 1fr; }
  .vf-d1-tabs { flex-wrap: wrap; }
  .vf-d1-tab { border-radius: var(--vf-r-sm); top: 0; }
}
@media (prefers-reduced-motion: reduce) { .vf-d1-note { transition: none; } }
`);
