import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.D3;
const ACCENT = PHASE_MAP[M.phase].accent;

export default function D3DataLandscapeAudit() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;

    return (
        <ModuleFrame id="vf-d3" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className="vf-d3" style={{ '--vf-accent': ACCENT }}>
                <div className="vf-d3-sources">
                    {M.sources.map(s => {
                        const row = c.rows[s.id];
                        return (
                            <div className={`vf-d3-card ${s.tier}`} key={s.id}>
                                <div className="vf-d3-card-head">
                                    <span className="vf-d3-src">{c.sourceNames[s.id]}</span>
                                    <span className="vf-d3-type">{s.tier === 'gov' ? c.typeGov : c.typeNiche}</span>
                                </div>
                                <p className="vf-d3-fields">{row.fields}</p>
                                <div className="vf-d3-metaline">
                                    <span className="vf-d3-freq">{c.freqLabel}: {row.freq}</span>
                                </div>
                                <div className="vf-d3-defect">
                                    <span className="vf-d3-defect-k">{c.defectLabel}</span>
                                    <span>{row.defect}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="vf-d3-problem">
                    <div className="vf-d3-problem-body">
                        <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.problemLabel}</span>
                        <h4 className="vf-d3-problem-title">{c.problemTitle}</h4>
                        <p>{c.problem}</p>
                    </div>
                    <div className="vf-d3-variants">
                        <span className="vf-caption">{c.variantsCaption}</span>
                        <div className="vf-d3-variant-chips">
                            {c.variants.map(v => <span className="vf-d3-variant" key={v}>{v}</span>)}
                        </div>
                    </div>
                </div>

                <div className="vf-d3-quality">
                    <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.qualityLabel}</span>
                    <div className="vf-d3-bars" role="img" aria-label={c.qualityLabel}>
                        {M.quality.map(q => (
                            <div className="vf-d3-bar-row" key={q.id}>
                                <span className="vf-d3-bar-name">{c.qNames[q.id]}</span>
                                <div className="vf-d3-bar-track">
                                    <div className="vf-d3-bar-fill" style={{ width: `${q.v}%` }} />
                                </div>
                                <span className="vf-d3-bar-val">{q.v}</span>
                            </div>
                        ))}
                    </div>
                    <p className="vf-d3-qnote">{c.qNote}</p>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-d3-style', `
.vf-d3 { display: flex; flex-direction: column; gap: 20px; }
.vf-d3-sources { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
.vf-d3-card { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 13px; }
.vf-d3-card.gov { border-left: 2px solid var(--vf-accent); }
.vf-d3-card.niche { border-left: 2px solid var(--vf-iris); }
.vf-d3-card-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.vf-d3-src { font-size: 13px; font-weight: 600; color: var(--vf-text-1); }
.vf-d3-type { font-family: var(--vf-font-data); font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); white-space: nowrap; }
.vf-d3-fields { margin: 7px 0; font-size: 12px; color: var(--vf-text-2); }
.vf-d3-metaline { margin-bottom: 8px; }
.vf-d3-freq { font-family: var(--vf-font-data); font-size: 10.5px; color: var(--vf-text-3); }
.vf-d3-defect { display: flex; flex-direction: column; gap: 2px; padding-top: 8px; border-top: 1px solid var(--vf-line-1); }
.vf-d3-defect-k { font-family: var(--vf-font-data); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vf-amber); }
.vf-d3-defect span:last-child { font-family: var(--vf-font-data); font-size: 11px; line-height: 1.45; color: var(--vf-text-2); }

.vf-d3-problem { display: grid; grid-template-columns: 1.3fr 1fr; gap: 18px; background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 18px; }
.vf-d3-problem-title { margin: 8px 0 8px; font-family: var(--vf-font-display); font-size: 22px; color: var(--vf-text-1); }
.vf-d3-problem-body p { margin: 0; font-size: 14px; line-height: 1.6; color: var(--vf-text-2); }
.vf-d3-variants { align-self: center; }
.vf-d3-variant-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.vf-d3-variant { font-family: var(--vf-font-data); font-size: 11.5px; color: var(--vf-text-1); background: var(--vf-bg-3); border: 1px dashed var(--vf-line-2); border-radius: 4px; padding: 4px 9px; }
.vf-d3-variant:first-child { border-style: solid; border-color: var(--vf-accent); color: var(--vf-accent); }

.vf-d3-quality { }
.vf-d3-bars { margin-top: 12px; display: flex; flex-direction: column; gap: 10px; }
.vf-d3-bar-row { display: grid; grid-template-columns: 96px 1fr 32px; align-items: center; gap: 12px; }
.vf-d3-bar-name { font-size: 12.5px; color: var(--vf-text-2); }
.vf-d3-bar-track { height: 8px; background: var(--vf-bg-3); border-radius: 999px; overflow: hidden; }
.vf-d3-bar-fill { height: 100%; background: linear-gradient(90deg, color-mix(in srgb, var(--vf-accent) 55%, transparent), var(--vf-accent)); border-radius: 999px; }
.vf-d3-bar-val { font-family: var(--vf-font-data); font-size: 12px; color: var(--vf-text-1); text-align: right; }
.vf-d3-qnote { margin: 12px 0 0; font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
@media (max-width: 720px) { .vf-d3-problem { grid-template-columns: 1fr; } }
`);
