import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.E1;
const ACCENT = PHASE_MAP[M.phase].accent;
const POS = Object.fromEntries(M.entities.map(e => [e.id, e]));

export default function E1IAObjectModel() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const [active, setActive] = useState('opportunity');

    const isLinked = (a, b) => M.links.some(([f, t]) => (f === a && t === b) || (f === b && t === a));
    const activeEntity = POS[active];

    return (
        <ModuleFrame id="vf-e1" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className="vf-e1" style={{ '--vf-accent': ACCENT }}>
                <div className="vf-e1-diagram">
                    <span className="vf-eyebrow vf-e1-caption">{c.objectLabel}</span>
                    <svg viewBox="0 0 100 100" className="vf-e1-svg" role="img" aria-label={c.objectLabel}>
                        {M.links.map(([f, t], i) => {
                            const on = f === active || t === active;
                            return (
                                <line key={i} x1={POS[f].x} y1={POS[f].y} x2={POS[t].x} y2={POS[t].y}
                                    stroke={on ? ACCENT : 'var(--vf-line-2)'} strokeWidth={on ? 0.7 : 0.4}
                                    opacity={on ? 0.9 : 0.4} />
                            );
                        })}
                        {M.entities.map(e => {
                            const on = e.id === active;
                            const near = isLinked(e.id, active);
                            return (
                                <g key={e.id} className="vf-e1-node" tabIndex={0} role="button"
                                    aria-label={c.entityNames[e.id]} aria-pressed={on}
                                    onMouseEnter={() => setActive(e.id)} onFocus={() => setActive(e.id)}
                                    transform={`translate(${e.x} ${e.y})`}>
                                    <circle r={on ? 4.6 : 3.6} fill={on || near ? ACCENT : 'var(--vf-bg-3)'}
                                        stroke={ACCENT} strokeWidth={on ? 0.9 : 0.5}
                                        opacity={on ? 1 : near ? 0.85 : 0.55} />
                                    <text y="-6" textAnchor="middle" className={`vf-e1-nodelabel${on ? ' on' : ''}`}>
                                        {c.entityNames[e.id]}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                    <p className="vf-e1-hint">{c.hoverHint}</p>
                </div>

                <div className="vf-e1-detail" aria-live="polite">
                    <h4 className="vf-e1-detail-name">{c.entityNames[active]}</h4>
                    <span className="vf-e1-detail-sub">{c.attrsLabel}</span>
                    <ul className="vf-e1-attrs">
                        {activeEntity.attrs.map(a => <li key={a}>{a}</li>)}
                    </ul>
                    <div className="vf-e1-rels">
                        {M.links.filter(([f, t]) => f === active || t === active).map(([f, t, k], i) => (
                            <div className="vf-e1-rel" key={i}>
                                <span>{c.entityNames[f]}</span>
                                <span className="vf-e1-rel-verb">{c.linkLabels[k]}</span>
                                <span>{c.entityNames[t]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="vf-e1-sitemap">
                    <span className="vf-eyebrow vf-e1-caption">{c.sitemapLabel}</span>
                    <div className="vf-e1-tree">
                        {M.sitemap.map(node => (
                            <div className="vf-e1-branch" key={node.id}>
                                <span className="vf-e1-l1">{c.sitemapNames[node.id]}</span>
                                <div className="vf-e1-children">
                                    {node.children.map(ch => <span className="vf-e1-l2" key={ch}>{c.sitemapNames[ch]}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="vf-e1-principle">
                    <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.principleLabel}</span>
                    <p>{c.principle}</p>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-e1-style', `
.vf-e1 { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 18px; }
.vf-e1-caption { display: block; color: var(--vf-text-3); margin-bottom: 8px; }
.vf-e1-diagram { min-width: 0; }
.vf-e1-svg { width: 100%; aspect-ratio: 1 / 0.82; background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); overflow: visible; }
.vf-e1-node { cursor: pointer; }
.vf-e1-node:focus { outline: none; }
.vf-e1-node:focus-visible circle { stroke-width: 1.2; }
.vf-e1-nodelabel { font-family: var(--vf-font-data); font-size: 3.4px; fill: var(--vf-text-3); letter-spacing: 0.02em; }
.vf-e1-nodelabel.on { fill: var(--vf-text-1); }
.vf-e1-hint { margin: 10px 0 0; font-size: 12px; color: var(--vf-text-3); }
.vf-e1-detail { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; align-self: start; }
.vf-e1-detail-name { margin: 0; font-family: var(--vf-font-display); font-size: 20px; color: var(--vf-text-1); }
.vf-e1-detail-sub { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vf-text-3); }
.vf-e1-attrs { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.vf-e1-attrs li { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-accent); background: color-mix(in srgb, var(--vf-accent) 12%, transparent); border-radius: 4px; padding: 3px 7px; }
.vf-e1-rels { margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--vf-line-1); display: flex; flex-direction: column; gap: 7px; }
.vf-e1-rel { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--vf-text-2); flex-wrap: wrap; }
.vf-e1-rel-verb { font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-text-3); border: 1px solid var(--vf-line-2); border-radius: 4px; padding: 1px 6px; }
.vf-e1-sitemap { grid-column: 1 / -1; margin-top: 6px; }
.vf-e1-tree { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.vf-e1-branch { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 12px; }
.vf-e1-l1 { display: block; font-size: 13px; font-weight: 600; color: var(--vf-text-1); margin-bottom: 8px; }
.vf-e1-children { display: flex; flex-direction: column; gap: 5px; padding-left: 12px; border-left: 1px solid var(--vf-line-2); }
.vf-e1-l2 { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-e1-principle { grid-column: 1 / -1; margin-top: 8px; padding: 16px 18px; background: var(--vf-bg-2); border-left: 2px solid var(--vf-accent); border-radius: 0 var(--vf-r-md) var(--vf-r-md) 0; }
.vf-e1-principle p { margin: 8px 0 0; font-size: 15px; line-height: 1.6; color: var(--vf-text-1); }
@media (max-width: 720px) { .vf-e1 { grid-template-columns: 1fr; } }
`);
