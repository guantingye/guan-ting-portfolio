import React, { useEffect, useMemo, useRef, useState } from 'react';
import SectionModule, { useI18n, Caption, ProfileRadar, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';
import {
    TOPICS, APPROACHES, THERAPISTS, WEIGHTS, DEFAULT_INTAKE, LIKERT_MAX, BUDGET_MIN, BUDGET_MAX,
} from './algorithmData.js';
import { rankTherapists } from './matchEngine.js';

const MOD = MODULES.find(m => m.key === 'M07');

const CRIT = [
    { id: 'approach', color: 'var(--pm-teal)' },
    { id: 'online', color: 'var(--pm-sky)' },
    { id: 'budget', color: 'var(--pm-iris)' },
    { id: 'topic', color: 'var(--pm-amber)' },
];

const PRESETS = {
    en: [
        { id: 'p1', label: 'High anxiety + relational', intake: { topics: { anxiety: 7, sleep: 5, work_stress: 3, relationship: 6, self_explore: 2, emotion_reg: 5, trauma: 3 }, approach: 'CBT', online: true, budget: 2000 } },
        { id: 'p2', label: 'Practical, low distress', intake: { topics: { anxiety: 2, sleep: 3, work_stress: 6, relationship: 2, self_explore: 3, emotion_reg: 4, trauma: 1 }, approach: 'ACT', online: true, budget: 2400 } },
        { id: 'p3', label: 'Mixed / flat signal', intake: { topics: { anxiety: 3, sleep: 3, work_stress: 3, relationship: 3, self_explore: 3, emotion_reg: 3, trauma: 3 }, approach: '', online: true, budget: 1500 } },
    ],
    zh: [
        { id: 'p1', label: '高焦慮 + 關係', intake: { topics: { anxiety: 7, sleep: 5, work_stress: 3, relationship: 6, self_explore: 2, emotion_reg: 5, trauma: 3 }, approach: 'CBT', online: true, budget: 2000 } },
        { id: 'p2', label: '務實、低困擾', intake: { topics: { anxiety: 2, sleep: 3, work_stress: 6, relationship: 2, self_explore: 3, emotion_reg: 4, trauma: 1 }, approach: 'ACT', online: true, budget: 2400 } },
        { id: 'p3', label: '混合／平坦訊號', intake: { topics: { anxiety: 3, sleep: 3, work_stress: 3, relationship: 3, self_explore: 3, emotion_reg: 3, trauma: 3 }, approach: '', online: true, budget: 1500 } },
    ],
};

const COPY = {
    en: {
        title: 'Matching algorithm playground',
        lead: 'The real algorithm, live. Set an intake, watch the four weighted criteria rank the therapists.',
        soWhat: 'The recommendation model is not a black box — you can operate it.',
        presetsLabel: 'Load a profile',
        reset: 'Reset',
        topicsLabel: 'Issue importance (1–7)',
        prefsLabel: 'Preferences',
        orientation: 'Preferred orientation',
        noPref: 'No preference',
        online: 'Online sessions',
        budget: 'Budget (NT$)',
        resultsLabel: 'Ranked match',
        top: 'TOP MATCH',
        criteria: { approach: 'Orientation', online: 'Online', budget: 'Budget', topic: 'Topic-fit' },
        radarLabel: 'Your profile vs top match coverage',
        keyA: 'Your profile', keyB: 'Top match',
        mathShow: 'Show the math', mathHide: 'Hide the math',
        mathFormula: 'score = 0.30·[orientation ∈ approaches] + 0.20·[online ∧ offers online] + 0.20·[budget ≥ min fee] + 0.30·[∃ topic ≥4 ∈ specialties]',
        table2Cols: ['Therapist', 'Orientation', 'Min fee', 'Online', 'Specialties'],
        table2Title: 'Table 2 — therapist reference set',
        live: name => `Top match: ${name}.`,
        caption: 'Seven sliders and three preferences drive the exact shipped score; bars break each total into its criteria.',
        realNote: '4 of 6 therapists are the real shipped seed records; 2 are reconstructed to widen the ranking.',
    },
    zh: {
        title: '媒合演算法互動台',
        lead: '真實演算法，即時運算。設定一份量表輸入，看四個加權準則如何排序心理師。',
        soWhat: '這個推薦模型不是黑箱——你可以親手操作它。',
        presetsLabel: '載入輪廓',
        reset: '重設',
        topicsLabel: '議題重要程度（1–7）',
        prefsLabel: '偏好',
        orientation: '偏好取向',
        noPref: '不限',
        online: '線上諮商',
        budget: '預算（NT$）',
        resultsLabel: '排序結果',
        top: '最佳媒合',
        criteria: { approach: '取向', online: '線上', budget: '預算', topic: '議題吻合' },
        radarLabel: '你的輪廓 vs 最佳媒合的涵蓋',
        keyA: '你的輪廓', keyB: '最佳媒合',
        mathShow: '顯示運算', mathHide: '隱藏運算',
        mathFormula: '分數 = 0.30·[取向 ∈ approaches] + 0.20·[線上 ∧ 提供線上] + 0.20·[預算 ≥ 最低收費] + 0.30·[∃ 議題 ≥4 ∈ specialties]',
        table2Cols: ['心理師', '取向', '最低收費', '線上', '專長'],
        table2Title: 'Table 2 — 心理師參照集',
        live: name => `最佳媒合：${name}。`,
        caption: '七個滑桿與三項偏好驅動確切的線上分數；長條把每個總分拆解成各準則。',
        realNote: '六位心理師中有 4 位是真實上線的種子資料，2 位為擴大排序而重建。',
    },
};

export default function M07_Playground() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const presets = PRESETS[lang] ?? PRESETS.en;
    const [intake, setIntake] = useState(DEFAULT_INTAKE);
    const [showMath, setShowMath] = useState(false);
    const [live, setLive] = useState('');
    const liveTimer = useRef(0);

    const ranked = useMemo(() => rankTherapists(THERAPISTS, intake), [intake]);
    const top = ranked[0];

    // debounced score announcement (aria-live polite)
    useEffect(() => {
        clearTimeout(liveTimer.current);
        liveTimer.current = setTimeout(() => setLive(top ? c.live(lang === 'zh' ? top.therapist.name : top.therapist.enName) : ''), 250);
        return () => clearTimeout(liveTimer.current);
    }, [top, c, lang]);

    const setTopic = (id, v) => setIntake(s => ({ ...s, topics: { ...s.topics, [id]: v } }));

    const axes = TOPICS.map(t => ({ id: t.id, label: t[lang], short: t[lang].slice(0, 2) }));
    const coverVector = top ? Object.fromEntries(TOPICS.map(t => [t.id, top.therapist.specialties.includes(t.id) ? LIKERT_MAX : 1])) : {};

    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="pm-pg">
                {/* controls */}
                <div className="pm-pg-controls">
                    <div className="pm-pg-presets" role="group" aria-label={c.presetsLabel}>
                        <span className="pm-pg-presets-label">{c.presetsLabel}</span>
                        {presets.map(p => (
                            <button key={p.id} className="pm-btn pm-pg-preset" onClick={() => setIntake(p.intake)}>{p.label}</button>
                        ))}
                        <button className="pm-btn pm-pg-preset" onClick={() => setIntake(DEFAULT_INTAKE)}>{c.reset}</button>
                    </div>

                    <div className="pm-pg-sliders">
                        <span className="pm-pg-grouplabel">{c.topicsLabel}</span>
                        {TOPICS.map(t => {
                            const v = intake.topics[t.id] ?? 1;
                            return (
                                <div className="pm-pg-slider" key={t.id}>
                                    <label htmlFor={`pm-sl-${t.id}`}>{t[lang]}</label>
                                    <input id={`pm-sl-${t.id}`} type="range" min="1" max={LIKERT_MAX} step="1"
                                        value={v} onChange={e => setTopic(t.id, Number(e.target.value))}
                                        aria-valuetext={`${v} / ${LIKERT_MAX}`}
                                        className={v >= 4 ? 'is-high' : undefined} />
                                    <span className={`pm-pg-val${v >= 4 ? ' is-high' : ''}`}>{v}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pm-pg-prefs">
                        <span className="pm-pg-grouplabel">{c.prefsLabel}</span>
                        <div className="pm-pg-pref">
                            <label htmlFor="pm-pg-orient">{c.orientation}</label>
                            <select id="pm-pg-orient" value={intake.approach} onChange={e => setIntake(s => ({ ...s, approach: e.target.value }))}>
                                <option value="">{c.noPref}</option>
                                {APPROACHES.map(a => <option key={a.id} value={a.id}>{a[lang]}</option>)}
                            </select>
                        </div>
                        <div className="pm-pg-pref pm-pg-pref--row">
                            <span>{c.online}</span>
                            <button className={`pm-toggle${intake.online ? ' is-on' : ''}`} role="switch" aria-checked={intake.online}
                                onClick={() => setIntake(s => ({ ...s, online: !s.online }))}>
                                <span className="pm-toggle-knob" aria-hidden="true" />
                                <span className="pm-toggle-txt">{intake.online ? 'ON' : 'OFF'}</span>
                            </button>
                        </div>
                        <div className="pm-pg-pref">
                            <label htmlFor="pm-pg-budget">{c.budget}: <span className="pm-pg-budgetval">NT${intake.budget.toLocaleString()}</span></label>
                            <input id="pm-pg-budget" type="range" min={BUDGET_MIN} max={BUDGET_MAX} step="100"
                                value={intake.budget} onChange={e => setIntake(s => ({ ...s, budget: Number(e.target.value) }))}
                                aria-valuetext={`NT$${intake.budget}`} />
                        </div>
                    </div>
                </div>

                {/* results */}
                <div className="pm-pg-out">
                    <span className="pm-pg-grouplabel">{c.resultsLabel}</span>
                    <ol className="pm-pg-rank">
                        {ranked.map((r, i) => (
                            <li key={r.therapist.id} className={`pm-pg-row${i === 0 ? ' is-top' : ''}`}>
                                <div className="pm-pg-row-head">
                                    <span className="pm-pg-rank-n">{i + 1}</span>
                                    <span className="pm-pg-name">{lang === 'zh' ? r.therapist.name : r.therapist.enName}
                                        <span className="pm-pg-orient-tag">{r.therapist.approaches.join('/')}</span>
                                        {!r.therapist.isReal && <span className="pm-pg-recon" title={c.realNote}>recon</span>}
                                    </span>
                                    {i === 0 && <span className="pm-tag pm-tag--teal pm-pg-topbadge">{c.top}</span>}
                                    <span className="pm-pg-score">{r.score.toFixed(2)}</span>
                                </div>
                                <div className="pm-pg-bar" aria-hidden="true">
                                    {CRIT.map(cr => r.breakdown[cr.id] > 0 && (
                                        <span key={cr.id} className="pm-pg-seg" title={`${c.criteria[cr.id]} +${r.breakdown[cr.id].toFixed(2)}`}
                                            style={{ width: `${r.breakdown[cr.id] * 100}%`, background: cr.color }} />
                                    ))}
                                </div>
                                <div className="pm-pg-crumbs">
                                    {CRIT.map(cr => (
                                        <span key={cr.id} className={`pm-pg-crumb${r.breakdown[cr.id] > 0 ? ' on' : ''}`} style={r.breakdown[cr.id] > 0 ? { color: cr.color } : undefined}>
                                            {c.criteria[cr.id]} {r.breakdown[cr.id] > 0 ? `+${r.breakdown[cr.id].toFixed(2)}` : '·'}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ol>
                    <div className="pm-pg-radar">
                        <ProfileRadar axes={axes} values={intake.topics} compare={coverVector} max={LIKERT_MAX}
                            labels={{ a: c.keyA, b: c.keyB }} ariaLabel={c.radarLabel} />
                    </div>
                </div>
            </div>

            {/* math drawer */}
            <div className="pm-pg-math">
                <button className="pm-btn" aria-expanded={showMath} aria-controls="pm-pg-mathbody" onClick={() => setShowMath(v => !v)}>
                    {showMath ? c.mathHide : c.mathShow} {showMath ? '▲' : '▼'}
                </button>
                {showMath && (
                    <div id="pm-pg-mathbody" className="pm-pg-mathbody">
                        <pre className="pm-code" tabIndex={0}><code>{c.mathFormula}</code></pre>
                        <span className="pm-budget-head" style={{ marginTop: 14 }}>{c.table2Title}</span>
                        <div className="pm-table-wrap">
                            <table className="pm-table pm-table--t2">
                                <thead><tr>{c.table2Cols.map(h => <th key={h}>{h}</th>)}</tr></thead>
                                <tbody>
                                    {THERAPISTS.map(t => (
                                        <tr key={t.id}>
                                            <td data-label={c.table2Cols[0]} className="pm-table-lead">{lang === 'zh' ? t.name : t.enName}{!t.isReal && <span className="pm-pg-recon">recon</span>}</td>
                                            <td data-label={c.table2Cols[1]}>{t.approaches.join(', ')}</td>
                                            <td data-label={c.table2Cols[2]}>NT${t.feeMin}</td>
                                            <td data-label={c.table2Cols[3]}>{t.online ? '✓' : '—'}</td>
                                            <td data-label={c.table2Cols[4]}>{t.specialties.map(s => (TOPICS.find(x => x.id === s) || {})[lang] || s).join('、')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="pm-budget-rule">{c.realNote}</p>
                    </div>
                )}
            </div>

            <Caption kind="Fig." n={4}>{c.caption}</Caption>
            <p className="pm-sr-only" role="status" aria-live="polite">{live}</p>
        </SectionModule>
    );
}

injectStyles('pm-m7', `
.pm-pg { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.pm-pg-controls { display: flex; flex-direction: column; gap: 18px; }
.pm-pg-grouplabel { font-family: var(--pm-font-data); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--pm-text-3); display: block; margin-bottom: 10px; }
.pm-pg-presets { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
.pm-pg-presets-label { font-family: var(--pm-font-data); font-size: 10.5px; letter-spacing: 0.1em; color: var(--pm-text-3); width: 100%; }
.pm-pg-preset { font-size: 12px; padding: 7px 11px; }
.pm-pg-sliders { display: flex; flex-direction: column; gap: 9px; }
.pm-pg-slider { display: grid; grid-template-columns: 96px 1fr 26px; gap: 10px; align-items: center; }
.pm-pg-slider label { font-size: 12.5px; color: var(--pm-text-2); }
.pm-pg-slider input[type=range] { width: 100%; accent-color: var(--pm-line-2); height: 4px; }
.pm-pg-slider input[type=range].is-high { accent-color: var(--pm-teal); }
.pm-pg-val { font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-text-3); text-align: right; }
.pm-pg-val.is-high { color: var(--pm-teal); }
.pm-pg-prefs { display: flex; flex-direction: column; gap: 12px; }
.pm-pg-pref { display: flex; flex-direction: column; gap: 6px; }
.pm-pg-pref--row { flex-direction: row; align-items: center; justify-content: space-between; }
.pm-pg-pref label, .pm-pg-pref > span { font-size: 13px; color: var(--pm-text-2); }
.pm-pg-budgetval { font-family: var(--pm-font-data); color: var(--pm-teal); }
.pm-pg-pref select { font-family: var(--pm-font-body); font-size: 13px; color: var(--pm-text-1); background: var(--pm-bg-3); border: 1px solid var(--pm-line-2); border-radius: var(--pm-r-sm); padding: 8px 10px; }
.pm-pg-pref input[type=range] { accent-color: var(--pm-teal); height: 4px; }
.pm-toggle { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--pm-line-2); border-radius: 999px; padding: 4px 10px 4px 6px; background: var(--pm-bg-3); }
.pm-toggle-knob { width: 16px; height: 16px; border-radius: 50%; background: var(--pm-text-3); transition: background 160ms var(--pm-ease), transform 160ms var(--pm-ease); }
.pm-toggle.is-on { border-color: var(--pm-teal); }
.pm-toggle.is-on .pm-toggle-knob { background: var(--pm-teal); transform: translateX(3px); }
.pm-toggle-txt { font-family: var(--pm-font-data); font-size: 10px; color: var(--pm-text-3); }
.pm-toggle.is-on .pm-toggle-txt { color: var(--pm-teal); }

.pm-pg-out { display: flex; flex-direction: column; gap: 16px; }
.pm-pg-rank { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.pm-pg-row { padding: 11px 13px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); background: var(--pm-bg-2); }
.pm-pg-row.is-top { border-color: var(--pm-teal); background: var(--pm-teal-dim); }
.pm-pg-row-head { display: flex; align-items: center; gap: 9px; }
.pm-pg-rank-n { font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-text-3); width: 16px; }
.pm-pg-row.is-top .pm-pg-rank-n { color: var(--pm-teal); }
.pm-pg-name { flex: 1; font-size: 13.5px; color: var(--pm-text-1); display: inline-flex; align-items: center; gap: 7px; flex-wrap: wrap; }
.pm-pg-orient-tag { font-family: var(--pm-font-data); font-size: 10px; color: var(--pm-text-3); border: 1px solid var(--pm-line-2); border-radius: 3px; padding: 1px 5px; }
.pm-pg-recon { font-family: var(--pm-font-data); font-size: 9px; letter-spacing: 0.05em; color: var(--pm-amber); border: 1px solid var(--pm-amber); border-radius: 3px; padding: 0 4px; margin-left: 4px; cursor: help; }
.pm-pg-topbadge { font-size: 8.5px; padding: 1px 6px; }
.pm-pg-score { font-family: var(--pm-font-data); font-size: 15px; color: var(--pm-teal); }
.pm-pg-bar { display: flex; height: 8px; border-radius: 4px; overflow: hidden; background: var(--pm-bg-0); margin: 9px 0 8px; }
.pm-pg-seg { height: 100%; }
.pm-pg-crumbs { display: flex; flex-wrap: wrap; gap: 4px 12px; }
.pm-pg-crumb { font-family: var(--pm-font-data); font-size: 10.5px; color: var(--pm-text-3); }
.pm-pg-crumb.on { font-weight: 500; }
.pm-pg-radar { padding: 14px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-md); background: var(--pm-bg-2); }

.pm-pg-math { margin-top: 20px; }
.pm-pg-mathbody { margin-top: 14px; }
.pm-table--t2 tbody td:nth-child(3) { font-family: var(--pm-font-data); color: var(--pm-text-2); white-space: nowrap; }
@media (max-width: 900px) { .pm-pg { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .pm-pg-slider { grid-template-columns: 78px 1fr 22px; gap: 8px; } }
`);
