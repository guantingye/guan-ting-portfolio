import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/labKit.jsx';

const A = 'var(--gx-amber)', B = 'var(--gx-teal)';
// Fixed, plausible simulated pilot dataset (n=8). Baseline A vs calm-layer B.
const NOTICE = [[4.2, 2.1], [3.6, 2.4], [5.8, 2.0], [3.1, 1.8], [4.9, 2.6], [6.2, 2.3], [3.9, 2.2], [4.5, 1.9]];
const SEQ = [[4, 6], [5, 6], [3, 7], [5, 6], [4, 6], [3, 7], [5, 6], [4, 7]];
const SUCCESS = { a: 5, b: 8, n: 8 };

const STRINGS = {
    en: {
        eyebrow: 'VALIDATION',
        title: 'Research Evidence Panel',
        intent: 'Small-scale validation, presented with real craft: method, measures, results, and limits.',
        frame: 'Design-lab pilot · moderated · n=8 · within-subjects A/B (baseline dashboard vs calm-layer redesign) · task: detect and resolve an injected fault. Pilot data — directional, not statistical proof.',
        legendA: 'A · Baseline', legendB: 'B · Redesign',
        c1: 'Time to notice the fault', c1unit: 'seconds (lower is better)',
        c2: 'Task success', c2unit: 'participants completing unaided',
        c3: 'Single Ease Question', c3unit: 'SEQ 1–7 (higher is better)',
        participant: 'P', simLabel: 'Simulated pilot data',
        methodTitle: 'Method', changedTitle: 'What changed because of this', limitsTitle: 'Limits',
        method: [
            'Protocol: each participant ran the same injected-fault task twice — once on the baseline dashboard, once on the calm-layer redesign — thinking aloud, moderated.',
            'Why within-subjects: with n=8, pairing each person against themselves removes between-person variance that would otherwise swamp the signal.',
            'Ordering counterbalanced: half saw baseline first, half saw redesign first, to separate the design effect from a learning effect.',
            'What a real study would add: larger n, eye-tracking for true glance behaviour, and longitudinal measures of alarm fatigue over weeks.',
        ],
        changed: [
            { obs: 'P3 and P6 missed the color-only advisory entirely.', act: 'Redundant iconography became mandatory for every status.', link: 'Module 01' },
            { obs: 'Two participants hesitated at the critical modal.', act: 'Typed acknowledgment was reserved for irreversible actions only.', link: 'Module 03' },
            { obs: 'Glance-distance reads were slow at 3 m.', act: 'Primary value scale bumped to ~2.4× in the glance context.', link: 'Module 02 / 09' },
        ],
        limits: 'n=8 cannot rank two good designs against each other. What a pilot this size can do is kill a bad design early — which is exactly what pilots are for. Every number here is simulated for demonstration.',
        notes: [
            { tag: 'Decision / 決策', text: 'The limits section is published as prominently as the results — honesty about scale is the differentiator.' },
            { tag: 'Trade-off / 取捨', text: 'n=8 cannot rank designs; it can kill bad ones early, which is what pilots are for.' },
        ],
    },
    zh: {
        eyebrow: '驗證',
        title: '研究證據面板',
        intent: '小規模驗證，以真正的研究工藝呈現：方法、量測、結果與限制。',
        frame: '設計實驗室前導研究 · 引導式 · n=8 · 受試者內 A/B（基準儀表板 vs 冷靜層重設計）· 任務：偵測並處理注入的故障。前導資料——供方向判斷，非統計證明。',
        legendA: 'A · 基準', legendB: 'B · 重設計',
        c1: '注意到故障的時間', c1unit: '秒（越低越好）',
        c2: '任務成功', c2unit: '獨力完成的受試者數',
        c3: '單題易用度', c3unit: 'SEQ 1–7（越高越好）',
        participant: 'P', simLabel: '模擬前導資料',
        methodTitle: '方法', changedTitle: '因此改了什麼', limitsTitle: '限制',
        method: [
            '流程：每位受試者以相同的注入故障任務進行兩次——一次在基準儀表板、一次在冷靜層重設計上——放聲思考，引導式進行。',
            '為何用受試者內：在 n=8 下，讓每個人與自己配對，可移除本會淹沒訊號的人際差異。',
            '順序對消：一半先看基準、一半先看重設計，以分離設計效果與學習效果。',
            '真正研究會再加上：更大的 n、真實一瞥行為的眼動追蹤，以及數週的警報疲勞縱貫量測。',
        ],
        changed: [
            { obs: 'P3 與 P6 完全漏看僅以顏色呈現的注意訊號。', act: '每個狀態一律強制加上多餘的圖示編碼。', link: '模組 01' },
            { obs: '兩位受試者在危急彈窗前猶豫。', act: '輸入式確認只保留給不可逆的操作。', link: '模組 03' },
            { obs: '在 3 m 一瞥距離下讀值偏慢。', act: '一瞥情境的主要數值放大到約 2.4×。', link: '模組 02 / 09' },
        ],
        limits: 'n=8 無法在兩個好設計之間排名。這種規模的前導研究能做的，是及早淘汰壞設計——那正是前導研究的用途。此處每個數字皆為展示用模擬。',
        notes: [
            { tag: 'Decision / 決策', text: '限制段落與結果同等醒目呈現——對規模誠實，正是差異所在。' },
            { tag: 'Trade-off / 取捨', text: 'n=8 無法排名設計，但能及早淘汰壞設計，那正是前導研究的用途。' },
        ],
    },
};

function DotStrip({ t }) {
    const W = 360, H = 210, x0 = 40, x1 = 344, max = 7;
    const sx = v => x0 + (v / max) * (x1 - x0);
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="gx-m08-svg" role="img" aria-label={`${t.c1}: baseline vs redesign, seconds`}>
            {[0, 2, 4, 6].map(v => (
                <g key={v}>
                    <line x1={sx(v)} y1="8" x2={sx(v)} y2={H - 18} stroke="var(--gx-line-1)" strokeWidth="1" />
                    <text x={sx(v)} y={H - 5} textAnchor="middle" className="gx-m08-axis">{v}s</text>
                </g>
            ))}
            {NOTICE.map(([a, b], i) => {
                const y = 16 + i * 22;
                return (
                    <g key={i}>
                        <text x="6" y={y + 4} className="gx-m08-plabel">{t.participant}{i + 1}</text>
                        <line x1={sx(Math.min(a, b))} y1={y} x2={sx(Math.max(a, b))} y2={y} stroke="var(--gx-line-2)" strokeWidth="1.5" />
                        <circle cx={sx(a)} cy={y} r="4.5" fill={A} />
                        <circle cx={sx(b)} cy={y} r="4.5" fill={B} />
                    </g>
                );
            })}
        </svg>
    );
}
function BarPair({ t }) {
    const W = 360, x0 = 40, x1 = 300, max = SUCCESS.n;
    const bw = v => (v / max) * (x1 - x0);
    const rows = [{ k: 'a', v: SUCCESS.a, c: A }, { k: 'b', v: SUCCESS.b, c: B }];
    return (
        <svg viewBox={`0 0 ${W} 96`} className="gx-m08-svg" role="img" aria-label={`${t.c2}: baseline ${SUCCESS.a} of ${SUCCESS.n}, redesign ${SUCCESS.b} of ${SUCCESS.n}`}>
            {rows.map((r, i) => {
                const y = 20 + i * 40;
                return (
                    <g key={r.k}>
                        <text x="6" y={y + 15} className="gx-m08-plabel">{r.k === 'a' ? 'A' : 'B'}</text>
                        <rect x={x0} y={y} width={x1 - x0} height="20" rx="4" fill="var(--gx-bg-3)" />
                        <rect x={x0} y={y} width={bw(r.v)} height="20" rx="4" fill={r.c} />
                        <text x={x0 + bw(r.v) + 8} y={y + 15} className="gx-m08-barval">{r.v}/{SUCCESS.n}</text>
                    </g>
                );
            })}
        </svg>
    );
}
function SlopeChart({ t }) {
    const W = 360, H = 210, yTop = 16, yBot = 176, xa = 120, xb = 240, min = 1, max = 7;
    const sy = v => yBot - ((v - min) / (max - min)) * (yBot - yTop);
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="gx-m08-svg" role="img" aria-label={`${t.c3}: baseline vs redesign per participant`}>
            {[1, 3, 5, 7].map(v => (
                <g key={v}><line x1={xa - 8} y1={sy(v)} x2={xb + 8} y2={sy(v)} stroke="var(--gx-line-1)" strokeWidth="1" />
                    <text x={xa - 16} y={sy(v) + 4} textAnchor="end" className="gx-m08-axis">{v}</text></g>
            ))}
            {SEQ.map(([a, b], i) => (
                <g key={i}>
                    <line x1={xa} y1={sy(a)} x2={xb} y2={sy(b)} stroke="var(--gx-line-2)" strokeWidth="1.5" opacity="0.7" />
                    <circle cx={xa} cy={sy(a)} r="4" fill={A} /><circle cx={xb} cy={sy(b)} r="4" fill={B} />
                </g>
            ))}
            <text x={xa} y={H - 6} textAnchor="middle" className="gx-m08-plabel">A</text>
            <text x={xb} y={H - 6} textAnchor="middle" className="gx-m08-plabel">B</text>
        </svg>
    );
}

function Chart({ title, unit, children, t }) {
    return (
        <figure className="gx-m08-chart">
            <figcaption><span className="gx-m08-chart-title">{title}</span><span className="gx-m08-chart-unit">{unit}</span></figcaption>
            {children}
            <span className="gx-caption gx-m08-chart-sim">{t.simLabel}</span>
        </figure>
    );
}

export default function M08ResearchEvidence() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const [openMethod, setOpenMethod] = useState(false);

    return (
        <ModuleFrame id="gx-m08" num="08" tone="var(--gx-iris)" eyebrow={t.eyebrow} title={t.title} intent={t.intent} notes={t.notes}>
            <div className="gx-m08">
                <p className="gx-m08-frame">{t.frame}</p>

                <div className="gx-m08-legend">
                    <span><i style={{ background: A }} />{t.legendA}</span>
                    <span><i style={{ background: B }} />{t.legendB}</span>
                </div>

                <div className="gx-m08-charts">
                    <Chart title={t.c1} unit={t.c1unit} t={t}><DotStrip t={t} /></Chart>
                    <Chart title={t.c2} unit={t.c2unit} t={t}><BarPair t={t} /></Chart>
                    <Chart title={t.c3} unit={t.c3unit} t={t}><SlopeChart t={t} /></Chart>
                </div>

                <div className="gx-m08-accordion">
                    <button className="gx-m08-acc-btn" aria-expanded={openMethod} onClick={() => setOpenMethod(o => !o)}>
                        <span className="gx-eyebrow">{t.methodTitle}</span><span>{openMethod ? '−' : '+'}</span>
                    </button>
                    {openMethod && <ul className="gx-m08-method">{t.method.map((m, i) => <li key={i}>{m}</li>)}</ul>}
                </div>

                <div className="gx-m08-changed">
                    <span className="gx-eyebrow gx-m08-changed-title">{t.changedTitle}</span>
                    {t.changed.map((c, i) => (
                        <div className="gx-m08-change" key={i}>
                            <span className="gx-m08-change-num">{i + 1}</span>
                            <p><span className="gx-m08-obs">{c.obs}</span> <span aria-hidden="true">→</span> {c.act} <span className="gx-m08-change-link">→ {c.link}</span></p>
                        </div>
                    ))}
                </div>

                <div className="gx-m08-limits">
                    <span className="gx-eyebrow" style={{ color: 'var(--gx-iris)' }}>{t.limitsTitle}</span>
                    <p>{t.limits}</p>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m08-styles', `
.gx-m08-frame { font-family: var(--gx-font-data); font-size: 12px; line-height: 1.6; color: var(--gx-text-2); padding: 14px 16px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-left: 2px solid var(--gx-iris); border-radius: var(--gx-r-sm); margin: 0 0 16px; }
.gx-m08-legend { display: flex; gap: 20px; margin-bottom: 16px; }
.gx-m08-legend span { display: inline-flex; align-items: center; gap: 8px; font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-text-2); }
.gx-m08-legend i { width: 12px; height: 12px; border-radius: 3px; }
.gx-m08-charts { display: grid; grid-template-columns: 1fr; gap: 16px; }
.gx-m08-chart { margin: 0; padding: 16px; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m08-chart figcaption { margin-bottom: 12px; }
.gx-m08-chart-title { display: block; font-size: 14px; font-weight: 600; color: var(--gx-text-1); }
.gx-m08-chart-unit { font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-text-3); }
.gx-m08-svg { width: 100%; height: auto; display: block; }
.gx-m08-axis { font-family: var(--gx-font-data); font-size: 9px; fill: var(--gx-text-3); }
.gx-m08-plabel { font-family: var(--gx-font-data); font-size: 10px; fill: var(--gx-text-2); }
.gx-m08-barval { font-family: var(--gx-font-data); font-size: 12px; fill: var(--gx-text-1); }
.gx-m08-chart-sim { margin-top: 10px; }
.gx-m08-accordion { margin-top: 18px; border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); overflow: hidden; }
.gx-m08-acc-btn { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 14px 16px; background: var(--gx-bg-2); color: var(--gx-text-1); font-family: var(--gx-font-data); font-size: 16px; }
.gx-m08-method { list-style: none; margin: 0; padding: 4px 16px 16px; }
.gx-m08-method li { position: relative; padding: 8px 0 8px 18px; font-size: 13px; line-height: 1.6; color: var(--gx-text-2); border-bottom: 1px dashed var(--gx-line-1); }
.gx-m08-method li::before { content: '—'; position: absolute; left: 0; color: var(--gx-iris); }
.gx-m08-changed { margin-top: 18px; }
.gx-m08-changed-title { display: block; color: var(--gx-text-3); margin-bottom: 12px; }
.gx-m08-change { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px dashed var(--gx-line-1); }
.gx-m08-change-num { flex: 0 0 auto; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-iris); border: 1px solid var(--gx-iris); border-radius: 50%; }
.gx-m08-change p { margin: 0; font-size: 13px; line-height: 1.6; color: var(--gx-text-2); }
.gx-m08-obs { color: var(--gx-text-1); }
.gx-m08-change-link { font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-iris); white-space: nowrap; }
.gx-m08-limits { margin-top: 18px; padding: 16px; background: color-mix(in srgb, var(--gx-iris) 8%, var(--gx-bg-1)); border: 1px solid var(--gx-iris); border-radius: var(--gx-r-md); }
.gx-m08-limits p { margin: 8px 0 0; font-size: 13.5px; line-height: 1.65; color: var(--gx-text-1); }
@media (min-width: 780px) {
  .gx-m08-charts { grid-template-columns: 1fr 1fr; }
  .gx-m08-charts > :first-child { grid-column: 1 / -1; }
}
`);
