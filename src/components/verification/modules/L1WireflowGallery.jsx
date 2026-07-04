import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.L1;
const ACCENT = PHASE_MAP[M.phase].accent;

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
const WIRE = {
    search: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" /><rect x="12" y="14" width="58" height="10" rx="5" /><circle cx="64" cy="19" r="2.6" /><line x1="12" y1="34" x2="70" y2="34" /><line x1="12" y1="42" x2="56" y2="42" /><line x1="12" y1="50" x2="64" y2="50" /></g>,
    filter: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" /><line x1="32" y1="3" x2="32" y2="61" /><rect x="9" y="13" width="6" height="6" rx="1" /><rect x="9" y="25" width="6" height="6" rx="1" /><rect x="9" y="37" width="6" height="6" rx="1" /><line x1="40" y1="16" x2="84" y2="16" /><line x1="40" y1="28" x2="78" y2="28" /><line x1="40" y1="40" x2="82" y2="40" /></g>,
    results: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" />{[12, 26, 40].map((y, i) => <g key={i}><text x="10" y={y + 8} fontSize="7" fill="currentColor" stroke="none">{i + 1}</text><line x1="18" y1={y + 5} x2="70" y2={y + 5} /><rect x="76" y={y + 1} width="10" height="7" rx="2" /></g>)}</g>,
    track: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" /><rect x="12" y="14" width="72" height="36" rx="3" /><path d="M70 22 l2.4 4.8 5.2 0.6 -3.8 3.6 1 5.2 -4.8 -2.6 -4.8 2.6 1 -5.2 -3.8 -3.6 5.2 -0.6z" /></g>,
    company: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" /><rect x="10" y="11" width="30" height="10" rx="2" /><rect x="10" y="27" width="35" height="26" rx="2" /><rect x="51" y="27" width="35" height="26" rx="2" /><line x1="48" y1="14" x2="86" y2="14" /></g>,
    sources: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" />{[12, 24, 36, 48].map((y, i) => <g key={i}><rect x="10" y={y} width="76" height="9" rx="2" /><path d={`M79 ${y + 3} l2.4 2.4 2.4 -2.4`} /></g>)}</g>,
    confidence: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" /><path d="M14 44 a30 30 0 0 1 68 0" /><line x1="48" y1="44" x2="66" y2="26" /><circle cx="48" cy="44" r="2.4" fill="currentColor" /></g>,
    multiselect: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" />{[12, 25, 38].map((y, i) => <g key={i}><rect x="10" y={y} width="7" height="7" rx="1.5" />{i < 2 && <path d={`M11 ${y + 3.5} l1.6 1.6 3 -3.4`} />}<line x1="22" y1={y + 3.5} x2="70" y2={y + 3.5} /></g>)}</g>,
    compare: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" /><line x1="34" y1="3" x2="34" y2="61" /><line x1="60" y1="3" x2="60" y2="61" /><line x1="3" y1="20" x2="93" y2="20" /><line x1="3" y1="36" x2="93" y2="36" /><line x1="3" y1="50" x2="93" y2="50" /></g>,
    export: <g {...S}><rect x="3" y="3" width="90" height="58" rx="4" /><rect x="16" y="14" width="34" height="40" rx="2" /><line x1="22" y1="24" x2="44" y2="24" /><line x1="22" y1="32" x2="44" y2="32" /><path d="M60 34 h20 M72 26 l8 8 -8 8" /></g>,
};

export default function L1WireflowGallery() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const [flowIdx, setFlowIdx] = useState(0);
    const [annot, setAnnot] = useState(true);
    const refs = useRef([]);
    const flow = M.flows[flowIdx];

    const move = dir => {
        const next = (flowIdx + dir + M.flows.length) % M.flows.length;
        setFlowIdx(next);
        refs.current[next]?.focus();
    };

    return (
        <ModuleFrame id="vf-l1" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className="vf-l1" style={{ '--vf-accent': ACCENT }}>
                <div className="vf-l1-bar">
                    <div className="vf-l1-tabs" role="tablist" aria-label={c.flowLabel}>
                        {M.flows.map((f, i) => (
                            <button key={f.id} role="tab" ref={el => (refs.current[i] = el)}
                                className={`vf-l1-tab${i === flowIdx ? ' on' : ''}`}
                                aria-selected={i === flowIdx} tabIndex={i === flowIdx ? 0 : -1}
                                onClick={() => setFlowIdx(i)}
                                onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } }}>
                                <span className="vf-l1-tab-num">{String(i + 1).padStart(2, '0')}</span>
                                {c.flowNames[f.id]}
                            </button>
                        ))}
                    </div>
                    <button className={`vf-btn vf-l1-annot${annot ? ' is-on' : ''}`} onClick={() => setAnnot(v => !v)} aria-pressed={annot}>
                        {c.annotToggle}
                    </button>
                </div>

                <div className="vf-l1-flow" role="tabpanel">
                    {flow.frames.map((fr, i) => (
                        <React.Fragment key={fr}>
                            <figure className="vf-l1-frame">
                                <svg className="vf-l1-sketch" viewBox="0 0 96 64" aria-hidden="true">{WIRE[fr]}</svg>
                                <figcaption>
                                    <span className="vf-l1-frame-num">{i + 1}</span>
                                    <span className="vf-l1-frame-name">{c.frameNames[fr]}</span>
                                    {annot && <span className="vf-l1-frame-trig">{c.triggers[fr]}</span>}
                                </figcaption>
                            </figure>
                            {i < flow.frames.length - 1 && <span className="vf-l1-arrow" aria-hidden="true">→</span>}
                        </React.Fragment>
                    ))}
                </div>

                {annot && (
                    <div className="vf-l1-note">
                        <span className="vf-l1-note-pin" aria-hidden="true" />
                        {c.annots[flow.id]}
                    </div>
                )}
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-l1-style', `
.vf-l1-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.vf-l1-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
.vf-l1-tab { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--vf-text-3); background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: 999px; padding: 7px 13px; }
.vf-l1-tab.on { color: var(--vf-text-1); border-color: var(--vf-accent); }
.vf-l1-tab-num { font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-accent); }
.vf-l1-annot.is-on { color: var(--vf-bg-0); background: var(--vf-accent); border-color: transparent; }
.vf-l1-flow { display: flex; align-items: flex-start; gap: 6px; overflow-x: auto; padding: 6px 2px 12px; scrollbar-width: thin; }
.vf-l1-frame { margin: 0; flex: 0 0 148px; }
.vf-l1-sketch { width: 100%; height: auto; color: var(--vf-slate); background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 6px; }
.vf-l1-frame figcaption { margin-top: 8px; }
.vf-l1-frame-num { display: inline-block; font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-bg-0); background: var(--vf-accent); border-radius: 3px; padding: 1px 5px; margin-right: 6px; }
.vf-l1-frame-name { font-size: 12.5px; font-weight: 600; color: var(--vf-text-1); }
.vf-l1-frame-trig { display: block; font-family: var(--vf-font-data); font-size: 10.5px; line-height: 1.4; color: var(--vf-text-3); margin-top: 5px; }
.vf-l1-arrow { flex: 0 0 auto; align-self: center; margin-top: 42px; color: var(--vf-line-2); font-size: 18px; }
.vf-l1-note { display: flex; align-items: flex-start; gap: 10px; margin-top: 4px; padding: 12px 14px; background: color-mix(in srgb, var(--vf-accent) 8%, var(--vf-bg-2)); border: 1px dashed var(--vf-line-2); border-radius: var(--vf-r-sm); font-size: 13px; line-height: 1.55; color: var(--vf-text-2); }
.vf-l1-note-pin { flex: 0 0 auto; width: 8px; height: 8px; border-radius: 50%; background: var(--vf-accent); margin-top: 6px; }
@media (max-width: 720px) {
  .vf-l1-flow { flex-direction: column; align-items: stretch; }
  .vf-l1-frame { flex: none; }
  .vf-l1-arrow { transform: rotate(90deg); margin: 2px auto; }
}
`);
