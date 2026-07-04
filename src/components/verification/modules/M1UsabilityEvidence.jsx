import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.M1;
const ACCENT = PHASE_MAP[M.phase].accent;
const MAX_TIME = Math.max(...M.tasks.map(t => t.timeBefore));

export default function M1UsabilityEvidence() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;

    return (
        <ModuleFrame id="vf-m1" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot} disclaimer={c.disclaimer}>
            <div className="vf-m1" style={{ '--vf-accent': ACCENT }}>
                <div className="vf-m1-design">
                    <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.designLabel}</span>
                    <dl>
                        {c.designItems.map(d => (
                            <div className="vf-m1-di" key={d.k}><dt>{d.k}</dt><dd>{d.v}</dd></div>
                        ))}
                    </dl>
                </div>

                <div className="vf-m1-tasks">
                    <div className="vf-m1-tasks-head">
                        <span className="vf-m1-col-task" />
                        <span className="vf-m1-legend"><i className="before" />{c.beforeLabel}</span>
                        <span className="vf-m1-legend"><i className="after" />{c.afterLabel}</span>
                    </div>
                    {M.tasks.map(t => (
                        <div className="vf-m1-task" key={t.id}>
                            <span className="vf-m1-task-name">{c.taskNames[t.id]}</span>
                            <div className="vf-m1-metric">
                                <span className="vf-m1-metric-k">{c.successLabel}</span>
                                <div className="vf-m1-bars">
                                    <div className="vf-m1-bar" role="img" aria-label={`${c.beforeLabel} ${t.before}%`}>
                                        <div className="vf-m1-bar-fill before" style={{ width: `${t.before}%` }}><span>{t.before}%</span></div>
                                    </div>
                                    <div className="vf-m1-bar" role="img" aria-label={`${c.afterLabel} ${t.after}%`}>
                                        <div className="vf-m1-bar-fill after" style={{ width: `${t.after}%` }}><span>{t.after}%</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="vf-m1-metric">
                                <span className="vf-m1-metric-k">{c.timeLabel}</span>
                                <div className="vf-m1-bars">
                                    <div className="vf-m1-bar" role="img" aria-label={`${c.beforeLabel} ${t.timeBefore}s`}>
                                        <div className="vf-m1-bar-fill before dim" style={{ width: `${(t.timeBefore / MAX_TIME) * 100}%` }}><span>{t.timeBefore}s</span></div>
                                    </div>
                                    <div className="vf-m1-bar" role="img" aria-label={`${c.afterLabel} ${t.timeAfter}s`}>
                                        <div className="vf-m1-bar-fill after dim" style={{ width: `${(t.timeAfter / MAX_TIME) * 100}%` }}><span>{t.timeAfter}s</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="vf-m1-lower">
                    <div className="vf-m1-sus">
                        <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.susLabel}</span>
                        <div className="vf-m1-sus-nums">
                            <span className="vf-m1-sus-before">{M.sus.before}</span>
                            <span className="vf-m1-sus-arrow">→</span>
                            <span className="vf-m1-sus-after">{M.sus.after}</span>
                        </div>
                        <span className="vf-m1-sus-band">{c.susBandLabel}</span>
                    </div>
                    <div className="vf-m1-quotes">
                        <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.quotesLabel}</span>
                        {c.quotes.map((q, i) => <blockquote className="vf-m1-quote" key={i}>{q}</blockquote>)}
                        <span className="vf-caption">{c.quotesNote}</span>
                    </div>
                </div>

                <div className="vf-m1-changed">
                    <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.changedLabel}</span>
                    <ul>{c.changed.map((x, i) => <li key={i}>{x}</li>)}</ul>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-m1-style', `
.vf-m1 { display: flex; flex-direction: column; gap: 20px; }
.vf-m1-design dl { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin: 10px 0 0; }
.vf-m1-di { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 11px 13px; }
.vf-m1-di dt { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vf-text-3); }
.vf-m1-di dd { margin: 5px 0 0; font-size: 13px; color: var(--vf-text-1); }
.vf-m1-tasks { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-m1-tasks-head { display: flex; justify-content: flex-end; gap: 16px; margin-bottom: 12px; }
.vf-m1-legend { display: inline-flex; align-items: center; gap: 6px; font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-m1-legend i { width: 11px; height: 11px; border-radius: 3px; }
.vf-m1-legend i.before { background: var(--vf-line-2); }
.vf-m1-legend i.after { background: var(--vf-accent); }
.vf-m1-task { padding: 12px 0; border-top: 1px solid var(--vf-line-1); }
.vf-m1-task-name { font-size: 13.5px; font-weight: 600; color: var(--vf-text-1); }
.vf-m1-metric { display: grid; grid-template-columns: 110px 1fr; gap: 12px; align-items: center; margin-top: 9px; }
.vf-m1-metric-k { font-family: var(--vf-font-data); font-size: 10.5px; color: var(--vf-text-3); }
.vf-m1-bars { display: flex; flex-direction: column; gap: 5px; }
.vf-m1-bar { background: var(--vf-bg-3); border-radius: 999px; height: 16px; overflow: hidden; }
.vf-m1-bar-fill { height: 100%; border-radius: 999px; display: flex; align-items: center; justify-content: flex-end; padding-right: 7px; min-width: 30px; }
.vf-m1-bar-fill span { font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-bg-0); font-weight: 500; }
.vf-m1-bar-fill.before { background: var(--vf-line-2); }
.vf-m1-bar-fill.before span { color: var(--vf-text-1); }
.vf-m1-bar-fill.after { background: var(--vf-accent); }
.vf-m1-bar-fill.dim { opacity: 0.85; }
.vf-m1-lower { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 14px; }
.vf-m1-sus { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-m1-sus-nums { display: flex; align-items: baseline; gap: 10px; margin: 10px 0; }
.vf-m1-sus-before { font-family: var(--vf-font-data); font-size: 24px; color: var(--vf-text-3); }
.vf-m1-sus-arrow { color: var(--vf-text-3); }
.vf-m1-sus-after { font-family: var(--vf-font-data); font-size: 38px; font-weight: 500; color: var(--vf-accent); line-height: 1; }
.vf-m1-sus-band { font-size: 12px; color: var(--vf-text-2); }
.vf-m1-quotes { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-m1-quote { margin: 10px 0; padding-left: 14px; border-left: 2px solid var(--vf-accent); font-family: var(--vf-font-display); font-style: italic; font-size: 15px; line-height: 1.5; color: var(--vf-text-1); }
.vf-m1-changed ul { list-style: none; margin: 10px 0 0; padding: 0; }
.vf-m1-changed li { position: relative; padding-left: 20px; margin-bottom: 8px; font-size: 13.5px; line-height: 1.6; color: var(--vf-text-2); }
.vf-m1-changed li::before { content: '→'; position: absolute; left: 0; color: var(--vf-accent); }
@media (max-width: 720px) { .vf-m1-lower { grid-template-columns: 1fr; } .vf-m1-metric { grid-template-columns: 1fr; gap: 6px; } }
`);
