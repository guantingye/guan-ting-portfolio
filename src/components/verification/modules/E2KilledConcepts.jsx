import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.E2;
const ACCENT = PHASE_MAP[M.phase].accent;

const WIRE = {
    map: (
        <>
            <rect x="4" y="4" width="72" height="44" rx="3" />
            {[[16, 18], [30, 30], [44, 16], [58, 34], [36, 40], [52, 22], [22, 34]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.2" fill="currentColor" stroke="none" />
            ))}
            <circle cx="40" cy="26" r="9" opacity="0.4" />
        </>
    ),
    feed: (
        <>
            <rect x="4" y="4" width="72" height="44" rx="3" />
            {[12, 21, 30, 39].map((y, i) => (
                <g key={i}><rect x="10" y={y} width="6" height="4" rx="1" fill="currentColor" stroke="none" opacity="0.6" /><line x1="20" y1={y + 2} x2="68" y2={y + 2} /></g>
            ))}
        </>
    ),
    graph: (
        <>
            <rect x="4" y="4" width="72" height="44" rx="3" />
            <line x1="26" y1="18" x2="40" y2="30" /><line x1="40" y1="30" x2="56" y2="20" /><line x1="40" y1="30" x2="34" y2="42" /><line x1="40" y1="30" x2="54" y2="40" />
            {[[26, 18], [40, 30], [56, 20], [34, 42], [54, 40]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === 1 ? 4 : 3} fill="currentColor" stroke="none" />
            ))}
        </>
    ),
    search: (
        <>
            <rect x="4" y="4" width="72" height="44" rx="3" />
            <rect x="10" y="9" width="60" height="8" rx="4" opacity="0.5" />
            <circle cx="64" cy="13" r="2.4" />
            {[22, 31, 40].map((y, i) => (
                <g key={i}><line x1="10" y1={y + 2} x2="46" y2={y + 2} /><rect x="52" y={y} width={[16, 11, 14][i]} height="4" rx="2" fill="currentColor" stroke="none" opacity="0.7" /></g>
            ))}
        </>
    ),
};

export default function E2KilledConcepts() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;

    return (
        <ModuleFrame id="vf-e2" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className="vf-e2" style={{ '--vf-accent': ACCENT }}>
                {M.concepts.map(concept => {
                    const cc = c.concepts[concept.id];
                    const chosen = concept.chosen;
                    return (
                        <article key={concept.id} className={`vf-e2-card${chosen ? ' is-chosen' : ''}`}>
                            <div className="vf-e2-cardhead">
                                <span className="vf-e2-tag">{c.conceptTag[concept.id]}</span>
                                {chosen && <span className="vf-e2-chosen">{c.chosenTag}</span>}
                            </div>
                            <svg className="vf-e2-wire" viewBox="0 0 80 52" fill="none" stroke="currentColor"
                                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                {WIRE[concept.layout]}
                            </svg>
                            <h4 className="vf-e2-name">{c.conceptNames[concept.id]}</h4>
                            {chosen ? (
                                <p className="vf-e2-reason">{cc.reason}</p>
                            ) : (
                                <dl className="vf-e2-dl">
                                    <dt>{c.diedLabel}</dt><dd>{cc.died}</dd>
                                    <dt>{c.survivedLabel}</dt><dd>{cc.survived}</dd>
                                </dl>
                            )}
                        </article>
                    );
                })}
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-e2-style', `
.vf-e2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
.vf-e2-card { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; display: flex; flex-direction: column; }
.vf-e2-card.is-chosen { border-color: var(--vf-accent); background: color-mix(in srgb, var(--vf-accent) 8%, var(--vf-bg-2)); }
.vf-e2-cardhead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.vf-e2-tag { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vf-text-3); }
.vf-e2-chosen { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--vf-bg-0); background: var(--vf-accent); border-radius: 999px; padding: 2px 8px; }
.vf-e2-wire { width: 100%; height: auto; color: var(--vf-line-2); margin-bottom: 12px; }
.vf-e2-card.is-chosen .vf-e2-wire { color: var(--vf-accent); }
.vf-e2-name { font-family: var(--vf-font-body); font-size: 15px; font-weight: 600; color: var(--vf-text-1); margin: 0 0 10px; }
.vf-e2-reason { margin: 0; font-size: 13px; line-height: 1.6; color: var(--vf-text-1); }
.vf-e2-dl { margin: 0; }
.vf-e2-dl dt { font-family: var(--vf-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vf-text-3); margin-top: 10px; }
.vf-e2-dl dt:first-child { margin-top: 0; }
.vf-e2-dl dd { margin: 3px 0 0; font-size: 12.5px; line-height: 1.55; color: var(--vf-text-2); }
`);
