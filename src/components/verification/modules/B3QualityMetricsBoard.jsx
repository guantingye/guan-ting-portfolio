import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.B3;
const ACCENT = PHASE_MAP[M.phase].accent;

function Sparkline({ data, up }) {
    const min = Math.min(...data), max = Math.max(...data);
    const span = max - min || 1;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / span) * 24 - 2}`).join(' ');
    return (
        <svg className="vf-b3-spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
            <polyline points={pts} fill="none" stroke={up ? 'var(--vf-accent)' : 'var(--vf-text-3)'}
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <circle cx="100" cy={28 - ((data[data.length - 1] - min) / span) * 24 - 2} r="2"
                fill={up ? 'var(--vf-accent)' : 'var(--vf-text-3)'} />
        </svg>
    );
}

export default function B3QualityMetricsBoard() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;

    return (
        <ModuleFrame id="vf-b3" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot} disclaimer={c.note}>
            <div className="vf-b3" style={{ '--vf-accent': ACCENT }}>
                <div className="vf-b3-kpis">
                    {M.kpis.map(k => {
                        const goodUp = k.id !== 'freshness' && k.id !== 'review';
                        const improving = goodUp ? k.delta >= 0 : k.delta <= 0;
                        return (
                            <div className="vf-b3-card" key={k.id}>
                                <span className="vf-b3-name">{c.kpiNames[k.id]}</span>
                                <div className="vf-b3-valrow">
                                    <span className="vf-b3-val">{c.kpiVals[k.id]}</span>
                                    <span className={`vf-b3-delta${improving ? ' up' : ' down'}`}>
                                        {k.delta >= 0 ? '▲' : '▼'} {Math.abs(k.delta)}
                                    </span>
                                </div>
                                <span className="vf-b3-unit">{c.kpiUnits[k.id]}</span>
                                <Sparkline data={k.spark} up={improving} />
                            </div>
                        );
                    })}
                </div>

                <div className="vf-b3-gate">
                    <div className="vf-b3-gate-head">
                        <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.gateLabel}</span>
                        <p>{c.gateDesc}</p>
                    </div>
                    <div className="vf-b3-checks">
                        {M.gates.map(g => {
                            const state = c.gateStates[g];
                            const flagged = /\d/.test(state);
                            return (
                                <div className={`vf-b3-check${flagged ? ' flag' : ''}`} key={g}>
                                    <span className="vf-b3-check-dot" aria-hidden="true" />
                                    <span className="vf-b3-check-name">{c.gateNames[g]}</span>
                                    <span className="vf-b3-check-state">{state}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-b3-style', `
.vf-b3-kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
.vf-b3-card { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 15px; }
.vf-b3-name { font-family: var(--vf-font-data); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); }
.vf-b3-valrow { display: flex; align-items: baseline; gap: 8px; margin-top: 6px; }
.vf-b3-val { font-family: var(--vf-font-data); font-size: 30px; font-weight: 500; color: var(--vf-text-1); line-height: 1; }
.vf-b3-delta { font-family: var(--vf-font-data); font-size: 11px; }
.vf-b3-delta.up { color: var(--vf-teal); }
.vf-b3-delta.down { color: var(--vf-text-3); }
.vf-b3-unit { display: block; font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-text-3); margin-top: 3px; }
.vf-b3-spark { width: 100%; height: 28px; margin-top: 10px; }
.vf-b3-gate { margin-top: 18px; background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-b3-gate-head p { margin: 8px 0 14px; font-size: 13.5px; color: var(--vf-text-2); }
.vf-b3-checks { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
.vf-b3-check { display: flex; align-items: center; gap: 9px; background: var(--vf-bg-3); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 10px 12px; }
.vf-b3-check-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--vf-teal); box-shadow: 0 0 6px var(--vf-teal); flex: 0 0 auto; }
.vf-b3-check.flag .vf-b3-check-dot { background: var(--vf-amber); box-shadow: 0 0 6px var(--vf-amber); }
.vf-b3-check-name { font-size: 12.5px; color: var(--vf-text-1); flex: 1 1 auto; }
.vf-b3-check-state { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-b3-check.flag .vf-b3-check-state { color: var(--vf-amber); }
`);
