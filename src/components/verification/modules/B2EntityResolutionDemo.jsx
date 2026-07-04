import React, { useMemo, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.B2;
const ACCENT = PHASE_MAP[M.phase].accent;

// ---- simplified re-implementation of the production matching logic --------
const LATIN_SUFFIX = /\b(inc|incorporated|ltd|limited|co|corp|corporation|company|group|holdings)\b/g;
const CJK_SUFFIX = /股份有限公司|有限公司|股份|集團|控股/g;

function normalize(raw) {
    return raw.toLowerCase()
        .replace(/[.,/()\-_'"]/g, ' ')
        .replace(CJK_SUFFIX, ' ')
        .replace(LATIN_SUFFIX, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function bigrams(s) {
    const clean = s.replace(/\s/g, '');
    if (clean.length < 2) return new Set([clean]);
    const set = new Set();
    for (let i = 0; i < clean.length - 1; i++) set.add(clean.slice(i, i + 2));
    return set;
}
function jaccard(a, b) {
    const A = bigrams(a), B = bigrams(b);
    if (!A.size || !B.size) return 0;
    let inter = 0;
    A.forEach(x => { if (B.has(x)) inter++; });
    return inter / (A.size + B.size - inter);
}
function latinContainment(anchor, s) {
    const tokens = s.split(' ').filter(t => /[a-z0-9]/.test(t));
    if (!tokens.length) return 0;
    const hit = tokens.filter(t => anchor.includes(t)).length;
    return hit / tokens.length;
}
function similarity(anchorRaw, sRaw) {
    const na = normalize(anchorRaw), ns = normalize(sRaw);
    if (!na || !ns) return 0;
    if (na === ns) return 1;
    return Math.max(jaccard(na, ns), latinContainment(na, ns));
}
function verdict(score) {
    if (score >= 0.7) return 'merge';
    if (score >= 0.4) return 'review';
    return 'reject';
}
const VERDICT_TONE = { merge: 'var(--vf-teal)', review: 'var(--vf-amber)', reject: 'var(--vf-text-3)' };

export default function B2EntityResolutionDemo() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const [rows, setRows] = useState(M.presets[0]);

    const anchor = rows[0] || '';
    const results = useMemo(
        () => rows.slice(1).map(r => ({ raw: r, norm: normalize(r), score: similarity(anchor, r) })),
        [rows],
    );

    const setRow = (i, val) => setRows(rs => rs.map((r, j) => (j === i ? val : r)));
    const addRow = () => setRows(rs => [...rs, '']);

    return (
        <ModuleFrame id="vf-b2" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className="vf-b2" style={{ '--vf-accent': ACCENT }}>
                <div className="vf-b2-presets">
                    <span className="vf-caption">{c.presetLabel}</span>
                    <div className="vf-b2-preset-btns">
                        {M.presets.map((g, i) => (
                            <button key={i} className="vf-btn vf-b2-preset" onClick={() => setRows(g)}>{g[0].split(' ')[0]}</button>
                        ))}
                    </div>
                </div>

                <div className="vf-b2-panel">
                    <span className="vf-b2-inlabel">{c.inputLabel}</span>
                    <div className="vf-b2-rows">
                        {rows.map((r, i) => (
                            <div className={`vf-b2-row${i === 0 ? ' anchor' : ''}`} key={i}>
                                <input className="vf-b2-input" value={r} onChange={e => setRow(i, e.target.value)}
                                    aria-label={`${c.inputLabel} ${i + 1}`} spellCheck={false} />
                                {i === 0
                                    ? <span className="vf-b2-anchortag">{c.anchorTag}</span>
                                    : (() => {
                                        const res = results[i - 1];
                                        const v = verdict(res.score);
                                        return (
                                            <span className="vf-b2-out" style={{ '--t': VERDICT_TONE[v] }}>
                                                <span className="vf-b2-sim">{Math.round(res.score * 100)}<em>%</em></span>
                                                <span className="vf-b2-verdict">{c.verdicts[v]}</span>
                                            </span>
                                        );
                                    })()}
                            </div>
                        ))}
                    </div>
                    <button className="vf-btn vf-b2-add" onClick={addRow}>+ {c.addLabel}</button>
                    <p className="vf-caption vf-b2-hint">{c.runHint}</p>
                </div>

                <div className="vf-b2-lower">
                    <div className="vf-b2-steps">
                        <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.stepsLabel}</span>
                        <ol>{c.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
                        <p className="vf-b2-codenote">{c.codeNote}</p>
                    </div>
                    <div className="vf-b2-stats">
                        <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.statsLabel}</span>
                        <div className="vf-b2-stat-grid">
                            {Object.entries(M.stats).map(([k, v]) => (
                                <div className="vf-b2-stat" key={k}>
                                    <span className="vf-b2-stat-v">{Math.round(v * 100)}%</span>
                                    <span className="vf-b2-stat-k">{c.statNames[k]}</span>
                                </div>
                            ))}
                        </div>
                        <p className="vf-b2-statsnote">{c.statsNote}</p>
                    </div>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-b2-style', `
.vf-b2 { display: flex; flex-direction: column; gap: 16px; }
.vf-b2-presets { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.vf-b2-preset-btns { display: flex; gap: 6px; flex-wrap: wrap; }
.vf-b2-preset { font-size: 12px; padding: 6px 12px; }
.vf-b2-panel { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-b2-inlabel { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vf-text-3); }
.vf-b2-rows { display: flex; flex-direction: column; gap: 8px; margin: 10px 0; }
.vf-b2-row { display: flex; align-items: center; gap: 10px; }
.vf-b2-input { flex: 1 1 auto; min-width: 0; font-family: var(--vf-font-data); font-size: 13px; color: var(--vf-text-1); background: var(--vf-bg-3); border: 1px solid var(--vf-line-2); border-radius: var(--vf-r-sm); padding: 8px 11px; }
.vf-b2-input:focus-visible { outline: 2px solid var(--vf-accent); outline-offset: 1px; }
.vf-b2-row.anchor .vf-b2-input { border-color: var(--vf-accent); color: var(--vf-text-1); }
.vf-b2-anchortag { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vf-accent); border: 1px solid var(--vf-accent); border-radius: 999px; padding: 3px 9px; flex: 0 0 auto; }
.vf-b2-out { display: inline-flex; align-items: center; gap: 8px; flex: 0 0 auto; }
.vf-b2-sim { font-family: var(--vf-font-data); font-size: 14px; font-weight: 500; color: var(--t); min-width: 42px; text-align: right; }
.vf-b2-sim em { font-size: 10px; font-style: normal; opacity: 0.7; }
.vf-b2-verdict { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--t); border: 1px solid var(--t); border-radius: var(--vf-r-sm); padding: 3px 8px; min-width: 62px; text-align: center; }
.vf-b2-add { font-size: 12px; padding: 6px 12px; }
.vf-b2-hint { display: block; margin-top: 10px; }
.vf-b2-lower { display: grid; grid-template-columns: 1.2fr 1fr; gap: 14px; }
.vf-b2-steps, .vf-b2-stats { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-b2-steps ol { margin: 12px 0; padding-left: 18px; }
.vf-b2-steps li { font-family: var(--vf-font-data); font-size: 12px; line-height: 1.5; color: var(--vf-text-2); margin-bottom: 7px; }
.vf-b2-codenote { margin: 0; font-family: var(--vf-font-data); font-size: 10.5px; color: var(--vf-text-3); padding-top: 10px; border-top: 1px solid var(--vf-line-1); }
.vf-b2-stat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 12px 0; }
.vf-b2-stat { text-align: center; }
.vf-b2-stat-v { display: block; font-family: var(--vf-font-data); font-size: 22px; font-weight: 500; color: var(--vf-text-1); }
.vf-b2-stat-k { font-size: 10.5px; color: var(--vf-text-3); }
.vf-b2-statsnote { margin: 0; font-family: var(--vf-font-data); font-size: 10.5px; line-height: 1.5; color: var(--vf-amber); }
@media (max-width: 720px) { .vf-b2-lower { grid-template-columns: 1fr; } }
`);
