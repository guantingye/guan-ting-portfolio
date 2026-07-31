import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/labKit.jsx';

const A = 'var(--gx-amber)', B = 'var(--gx-teal)';

// Fixed, plausible simulated pilot dataset (n=8).
// A = baseline dashboard, B = calm-layer redesign.
// The numbers are intentionally framed as simulated pilot data, not statistical proof.
const NOTICE = [[4.2, 2.1], [3.6, 2.4], [5.8, 2.0], [3.1, 1.8], [4.9, 2.6], [6.2, 2.3], [3.9, 2.2], [4.5, 1.9]];
const SEQ = [[4, 6], [5, 6], [3, 7], [5, 6], [4, 6], [3, 7], [5, 6], [4, 7]];
const SUCCESS = { a: 5, b: 8, n: 8 };

const STRINGS = {
    en: {
        eyebrow: 'VALIDATION',
        title: 'UX/HMI Pilot Research Evidence Panel',
        intent: 'This module demonstrates how to present a small UX/HMI pilot: clearly state the research design, task, and measures; translate observations into concrete design changes; and retain the limits of the sample size and evidence strength. The goal is not to use limited data to prove that one version is “definitely better,” but to identify where the baseline design fails and which directions are worth validating next.',
        frame: 'Research design: moderated usability testing, n=8, within-subjects A/B comparison · Versions: A, baseline dashboard; B, calm-layer redesign · Task: detect and handle one predefined pressure anomaly · Evidence position: simulated pilot data for portfolio demonstration, used to show research interpretation and design translation—not statistical inference.',
        legendA: 'A · Baseline dashboard',
        legendB: 'B · Calm-layer redesign',
        c1: 'Time to notice an anomaly',
        c1unit: 'seconds · lower means faster detection',
        c2: 'Completion without prompting',
        c2unit: 'participants who completed the task without assistance',
        c3: 'Single Ease Question rating',
        c3unit: 'SEQ 1–7 · higher scores indicate an easier task experience',
        participant: 'P',
        simLabel: 'Simulated pilot data',
        methodTitle: 'Method',
        changedTitle: 'What changed after the pilot',
        limitsTitle: 'Limits',
        method: [
            'Protocol: each participant completed the same injected-fault task twice — once with the baseline dashboard and once with the calm-layer redesign — while thinking aloud in a moderated session.',
            'Why within-subjects: with only eight participants, it is more useful to compare each person with themselves than to compare two separate groups. This reduces noise from individual speed, confidence, and prior experience.',
            'Order control: half of the participants saw the baseline first, and half saw the redesign first, so the result is less likely to be explained only by practice or familiarity.',
            'What a production study would add: more participants, eye-tracking for actual glance behavior, and longer-term observation to understand whether the calmer alert layer reduces alarm fatigue over time.',
        ],
        changed: [
            {
                obs: 'P3 and P6 did not notice the advisory state when it was shown only through color.',
                act: 'Every key state now includes at least one non-color cue, such as an icon, text label, or value change, so color is never the only way to identify it.',
                link: 'Module 01',
            },
            {
                obs: 'Two participants clearly hesitated when the critical dialog requested confirmation.',
                act: 'Typed confirmation is used only for high-impact actions that are hard to reverse; lower-risk actions use a button or secondary confirmation to reduce unnecessary operational burden.',
                link: 'Module 03',
            },
            {
                obs: 'Participants identified key values more slowly in a three-metre viewing context.',
                act: 'The main value is enlarged, visual contrast is increased, and nonessential explanatory text is removed so the distant view first answers: “Does this need attention now?”',
                link: 'Module 02 / 09',
            },
        ],
        limits: 'This study has only eight participants and uses simulated pilot data for portfolio demonstration, so it cannot show that version B is better than version A in every context. Its purpose is to identify where the baseline interface fails, confirm whether the redesign direction is worth continuing, and form hypotheses for the next research round. Formal conclusions still require a larger sample, real tasks, and validation in actual operating environments.',
        notes: [
            {
                tag: 'Decision / 設計判斷',
                text: 'Research methods, limits, and design changes sit on the same page so the charts do not merely show a more flattering result while hiding how the data was interpreted or which conclusions still cannot be made.',
            },
            {
                tag: 'Trade-off / 設計取捨',
                text: 'n=8 cannot support broad inference, but it is enough for early design learning. The value of a small study is to surface major friction earlier at lower cost, refine the research question, and improve the quality of information for a later formal study.',
            },
        ],
    },
    zh: {
        eyebrow: '驗證',
        title: 'UX/HMI 前導研究證據面板',
        intent: '這個模組示範如何呈現一項小規模 UX/HMI 前導研究：清楚交代研究設計、任務與衡量方式，將觀察結果轉化為具體設計修正，同時保留樣本規模與證據強度的限制。重點不在用小量資料證明某個版本「一定更好」，而是辨識基準設計在哪裡失效，以及哪些方向值得進入下一輪驗證。',
        frame: '研究設計：主持式可用性測試，n=8，受試者內 A/B 比較 · 比較版本：A，基準儀表板；B，冷靜層重設計 · 測試任務：察覺並處理一項預先設定的壓力異常 · 證據定位：本頁使用作品集展示用模擬前導資料，用於示範研究判讀與設計轉譯，不作為統計推論。',
        legendA: 'A · 基準儀表板',
        legendB: 'B · 冷靜層重設計',
        c1: '察覺異常所需時間',
        c1unit: '秒 · 越低代表越快察覺',
        c2: '無提示完成率',
        c2unit: '未接受協助即完成任務的參與者人數',
        c3: '單題易用性評分',
        c3unit: 'SEQ 1–7 分 · 分數越高代表任務感受越容易',
        participant: 'P',
        simLabel: '展示用模擬前導資料',
        methodTitle: '研究方法',
        changedTitle: '研究後改了什麼',
        limitsTitle: '研究限制',
        method: [
            '流程：每位參與者都完成同一個注入故障任務兩次——一次使用基準儀表板，一次使用冷靜層重設計——過程中放聲思考，並由研究者引導。',
            '為什麼用受試者內設計：只有 8 位參與者時，讓同一個人比較兩種版本，比把人分成兩組更有用。這可以降低個人速度、信心與經驗差異造成的雜訊。',
            '順序控制：一半參與者先看基準版，一半先看重設計版，避免結果只是因為第二次比較熟悉任務。',
            '正式研究還需要補上：更多參與者、用眼動追蹤觀察真實一瞥行為，以及更長時間的現場觀察，確認較冷靜的警示層是否真的能降低警報疲勞。',
        ],
        changed: [
            {
                obs: 'P3 與 P6 未察覺僅以顏色呈現的注意狀態。',
                act: '所有關鍵狀態至少增加一項非顏色線索，例如圖示、文字標籤或數值變化，避免顏色成為唯一辨識方式。',
                link: '模組 01',
            },
            {
                obs: '兩位參與者在危急彈窗要求確認時明顯猶豫。',
                act: '僅在高影響、難以回復的操作中使用輸入確認；較低風險的操作改用按鈕或二次確認，降低不必要的操作負擔。',
                link: '模組 03',
            },
            {
                obs: '參與者在三公尺遠距離情境下，對關鍵數值的辨識速度較慢。',
                act: '放大主要數值、提升視覺對比，並移除非必要說明文字，使遠距畫面優先回答「目前是否需要處理」。',
                link: '模組 02 / 09',
            },
        ],
        limits: '本研究樣本數僅為 8 人，且使用展示用模擬前導資料，因此不能推論 B 版本在所有情境下都優於 A 版本。這項研究的用途是辨識基準介面的失效點、確認改版方向是否值得繼續，以及形成下一輪研究假設；正式結論仍需要更大的樣本、真實任務與實際操作環境驗證。',
        notes: [
            {
                tag: 'Decision / 設計判斷',
                text: '研究方法、限制與設計修正被放在同一個畫面中，避免圖表只展示「比較好看的結果」，卻隱藏資料如何被解讀，以及哪些結論仍不能成立。',
            },
            {
                tag: 'Trade-off / 設計取捨',
                text: 'n=8 無法支撐廣泛推論，但足以作為早期設計學習。小規模研究的價值，在於以較低成本提早暴露主要摩擦、修正研究題目，並提高後續正式研究的資訊品質。',
            },
        ],
    },
};

function DotStrip({ t }) {
    const W = 360, H = 210, x0 = 40, x1 = 344, max = 7;
    const sx = v => x0 + (v / max) * (x1 - x0);

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            className="gx-m08-svg"
            role="img"
            aria-label={`${t.c1}: baseline vs redesign, seconds`}
        >
            {[0, 2, 4, 6].map(v => (
                <g key={v}>
                    <line
                        x1={sx(v)}
                        y1="8"
                        x2={sx(v)}
                        y2={H - 18}
                        stroke="var(--gx-line-1)"
                        strokeWidth="1"
                    />
                    <text
                        x={sx(v)}
                        y={H - 5}
                        textAnchor="middle"
                        className="gx-m08-axis"
                    >
                        {v}s
                    </text>
                </g>
            ))}

            {NOTICE.map(([a, b], i) => {
                const y = 16 + i * 22;

                return (
                    <g key={i}>
                        <text x="6" y={y + 4} className="gx-m08-plabel">
                            {t.participant}{i + 1}
                        </text>

                        <line
                            x1={sx(Math.min(a, b))}
                            y1={y}
                            x2={sx(Math.max(a, b))}
                            y2={y}
                            stroke="var(--gx-line-2)"
                            strokeWidth="1.5"
                        />

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
    const rows = [
        { k: 'a', v: SUCCESS.a, c: A },
        { k: 'b', v: SUCCESS.b, c: B },
    ];

    return (
        <svg
            viewBox={`0 0 ${W} 96`}
            className="gx-m08-svg"
            role="img"
            aria-label={`${t.c2}: baseline ${SUCCESS.a} of ${SUCCESS.n}, redesign ${SUCCESS.b} of ${SUCCESS.n}`}
        >
            {rows.map((r, i) => {
                const y = 20 + i * 40;

                return (
                    <g key={r.k}>
                        <text x="6" y={y + 15} className="gx-m08-plabel">
                            {r.k === 'a' ? 'A' : 'B'}
                        </text>

                        <rect
                            x={x0}
                            y={y}
                            width={x1 - x0}
                            height="20"
                            rx="4"
                            fill="var(--gx-bg-3)"
                        />

                        <rect
                            x={x0}
                            y={y}
                            width={bw(r.v)}
                            height="20"
                            rx="4"
                            fill={r.c}
                        />

                        <text x={x0 + bw(r.v) + 8} y={y + 15} className="gx-m08-barval">
                            {r.v}/{SUCCESS.n}
                        </text>
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
        <svg
            viewBox={`0 0 ${W} ${H}`}
            className="gx-m08-svg"
            role="img"
            aria-label={`${t.c3}: baseline vs redesign per participant`}
        >
            {[1, 3, 5, 7].map(v => (
                <g key={v}>
                    <line
                        x1={xa - 8}
                        y1={sy(v)}
                        x2={xb + 8}
                        y2={sy(v)}
                        stroke="var(--gx-line-1)"
                        strokeWidth="1"
                    />

                    <text
                        x={xa - 16}
                        y={sy(v) + 4}
                        textAnchor="end"
                        className="gx-m08-axis"
                    >
                        {v}
                    </text>
                </g>
            ))}

            {SEQ.map(([a, b], i) => (
                <g key={i}>
                    <line
                        x1={xa}
                        y1={sy(a)}
                        x2={xb}
                        y2={sy(b)}
                        stroke="var(--gx-line-2)"
                        strokeWidth="1.5"
                        opacity="0.7"
                    />
                    <circle cx={xa} cy={sy(a)} r="4" fill={A} />
                    <circle cx={xb} cy={sy(b)} r="4" fill={B} />
                </g>
            ))}

            <text x={xa} y={H - 6} textAnchor="middle" className="gx-m08-plabel">
                A
            </text>

            <text x={xb} y={H - 6} textAnchor="middle" className="gx-m08-plabel">
                B
            </text>
        </svg>
    );
}

function Chart({ title, unit, children, t }) {
    return (
        <figure className="gx-m08-chart">
            <figcaption>
                <span className="gx-m08-chart-title">
                    {title}
                </span>
                <span className="gx-m08-chart-unit">
                    {unit}
                </span>
            </figcaption>

            {children}

            <span className="gx-caption gx-m08-chart-sim">
                {t.simLabel}
            </span>
        </figure>
    );
}

export default function M08ResearchEvidence() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const [openMethod, setOpenMethod] = useState(false);

    return (
        <ModuleFrame
            id="gx-m08"
            num="08"
            tone="var(--gx-iris)"
            eyebrow={t.eyebrow}
            title={t.title}
            intent={t.intent}
            notes={t.notes}
        >
            <div className="gx-m08">
                <p className="gx-m08-frame">
                    {t.frame}
                </p>

                <div className="gx-m08-legend">
                    <span>
                        <i style={{ background: A }} />{t.legendA}
                    </span>
                    <span>
                        <i style={{ background: B }} />{t.legendB}
                    </span>
                </div>

                <div className="gx-m08-charts">
                    <Chart title={t.c1} unit={t.c1unit} t={t}>
                        <DotStrip t={t} />
                    </Chart>

                    <Chart title={t.c2} unit={t.c2unit} t={t}>
                        <BarPair t={t} />
                    </Chart>

                    <Chart title={t.c3} unit={t.c3unit} t={t}>
                        <SlopeChart t={t} />
                    </Chart>
                </div>

                <div className="gx-m08-accordion">
                    <button
                        className="gx-m08-acc-btn"
                        aria-expanded={openMethod}
                        onClick={() => setOpenMethod(o => !o)}
                    >
                        <span className="gx-eyebrow">
                            {t.methodTitle}
                        </span>
                        <span>
                            {openMethod ? '−' : '+'}
                        </span>
                    </button>

                    {openMethod && (
                        <ul className="gx-m08-method">
                            {t.method.map((m, i) => (
                                <li key={i}>
                                    {m}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="gx-m08-changed">
                    <span className="gx-eyebrow gx-m08-changed-title">
                        {t.changedTitle}
                    </span>

                    {t.changed.map((c, i) => (
                        <div className="gx-m08-change" key={i}>
                            <span className="gx-m08-change-num">
                                {i + 1}
                            </span>

                            <p>
                                <span className="gx-m08-obs">
                                    {c.obs}
                                </span>{' '}
                                <span aria-hidden="true">→</span>{' '}
                                {c.act}{' '}
                                <span className="gx-m08-change-link">
                                    → {c.link}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>

                <div className="gx-m08-limits">
                    <span className="gx-eyebrow" style={{ color: 'var(--gx-iris)' }}>
                        {t.limitsTitle}
                    </span>

                    <p>
                        {t.limits}
                    </p>
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
