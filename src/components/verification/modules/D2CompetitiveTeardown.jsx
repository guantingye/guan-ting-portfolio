import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.D2;
const ACCENT = PHASE_MAP[M.phase].accent;
const LEVEL_ALPHA = { 3: 0.85, 2: 0.44, 1: 0.14 };

export default function D2CompetitiveTeardown() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const [readout, setReadout] = useState(null);

    const cell = (cap, colIdx) => {
        const level = cap.grid[colIdx];
        const comp = M.competitors[colIdx];
        const capName = c.capNames[cap.id];
        const levelName = M.levels[lang][level];
        const label = `${comp} · ${capName}: ${levelName}`;
        const isOwn = colIdx === M.competitors.length - 1;
        return (
            <button
                key={cap.id + colIdx}
                className={`vf-d2-cell${isOwn ? ' is-own' : ''}`}
                style={{ '--a': LEVEL_ALPHA[level] }}
                title={label}
                aria-label={label}
                onMouseEnter={() => setReadout(label)}
                onFocus={() => setReadout(label)}
                onMouseLeave={() => setReadout(null)}
                onBlur={() => setReadout(null)}>
                <span className="vf-d2-dot" aria-hidden="true" data-level={level} />
            </button>
        );
    };

    return (
        <ModuleFrame id="vf-d2" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className="vf-d2" style={{ '--vf-accent': ACCENT }}>
                <div className="vf-d2-scroll">
                    <div className="vf-d2-grid" role="table" aria-label={c.title}>
                        <div className="vf-d2-row vf-d2-head" role="row">
                            <span className="vf-d2-caplabel" role="columnheader">{c.capLabel}</span>
                            {M.competitors.map((comp, i) => (
                                <span key={comp} role="columnheader"
                                    className={`vf-d2-comp${i === M.competitors.length - 1 ? ' is-own' : ''}`}>{comp}</span>
                            ))}
                        </div>
                        {M.capabilities.map(cap => (
                            <div className="vf-d2-row" role="row" key={cap.id}>
                                <span className="vf-d2-capname" role="rowheader">{c.capNames[cap.id]}</span>
                                {M.competitors.map((_, i) => cell(cap, i))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="vf-d2-legend" aria-hidden="true">
                    <span className="vf-d2-readout">{readout || ' '}</span>
                    <span className="vf-d2-legend-keys">
                        <span className="vf-d2-key"><i style={{ '--a': LEVEL_ALPHA[3] }} />{c.legendStrong}</span>
                        <span className="vf-d2-key"><i style={{ '--a': LEVEL_ALPHA[2] }} />{c.legendMid}</span>
                        <span className="vf-d2-key"><i style={{ '--a': LEVEL_ALPHA[1] }} />{c.legendWeak}</span>
                    </span>
                </div>

                <div className="vf-d2-gap">
                    <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.gapLabel}</span>
                    <p>{c.gap}</p>
                </div>
                <div className="vf-d2-source">
                    <span className="vf-tag">{c.asOf}</span>
                    <p><span className="vf-d2-source-label">{c.sourceLabel} · </span>{c.source}</p>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-d2-style', `
.vf-d2-scroll { overflow-x: auto; scrollbar-width: thin; padding-bottom: 4px; }
.vf-d2-grid { min-width: 560px; }
.vf-d2-row { display: grid; grid-template-columns: 168px repeat(5, 1fr); align-items: stretch; gap: 4px; }
.vf-d2-row + .vf-d2-row { margin-top: 4px; }
.vf-d2-head { margin-bottom: 6px; }
.vf-d2-caplabel { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vf-text-3); align-self: end; padding-bottom: 4px; }
.vf-d2-comp { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-2); text-align: center; align-self: end; padding-bottom: 4px; line-height: 1.25; }
.vf-d2-comp.is-own { color: var(--vf-accent); font-weight: 500; }
.vf-d2-capname { font-size: 12.5px; color: var(--vf-text-2); display: flex; align-items: center; padding-right: 8px; }
.vf-d2-cell { height: 40px; border-radius: var(--vf-r-sm); border: 1px solid var(--vf-line-1); background: color-mix(in srgb, var(--vf-accent) calc(var(--a) * 100%), var(--vf-bg-2)); display: flex; align-items: center; justify-content: center; transition: transform 140ms var(--vf-ease), border-color 140ms var(--vf-ease); }
.vf-d2-cell:hover, .vf-d2-cell:focus-visible { transform: translateY(-2px); border-color: var(--vf-accent); }
.vf-d2-cell.is-own { border-color: var(--vf-accent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vf-accent) 40%, transparent); }
.vf-d2-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--vf-bg-0); opacity: 0.5; }
.vf-d2-dot[data-level="3"] { opacity: 0.9; }
.vf-d2-dot[data-level="1"] { opacity: 0.22; }
.vf-d2-legend { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 12px; }
.vf-d2-readout { font-family: var(--vf-font-data); font-size: 12px; color: var(--vf-text-1); min-height: 18px; }
.vf-d2-legend-keys { display: flex; gap: 14px; }
.vf-d2-key { display: inline-flex; align-items: center; gap: 6px; font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-d2-key i { width: 12px; height: 12px; border-radius: 3px; background: color-mix(in srgb, var(--vf-accent) calc(var(--a) * 100%), var(--vf-bg-2)); border: 1px solid var(--vf-line-2); }
.vf-d2-gap { margin-top: 22px; padding: 18px 20px; border-left: 2px solid var(--vf-accent); background: var(--vf-bg-2); border-radius: 0 var(--vf-r-md) var(--vf-r-md) 0; }
.vf-d2-gap p { margin: 8px 0 0; color: var(--vf-text-1); font-size: 15px; line-height: 1.6; }
.vf-d2-source { display: flex; gap: 14px; align-items: flex-start; margin-top: 16px; }
.vf-d2-source p { margin: 0; font-family: var(--vf-font-data); font-size: 11.5px; line-height: 1.6; color: var(--vf-text-3); }
.vf-d2-source-label { color: var(--vf-text-2); }
@media (max-width: 720px) { .vf-d2-source { flex-direction: column; gap: 8px; } }
`);
