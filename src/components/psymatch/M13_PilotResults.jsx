import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';

const MOD = MODULES.find(m => m.key === 'M13');

const DIST = [
    { id: 'CBT', v: 6 }, { id: 'ACT', v: 3 }, { id: 'Humanistic', v: 2 },
    { id: 'Existential', v: 2 }, { id: 'DBT', v: 1 },
];

const COPY = {
    en: {
        title: 'Pilot results',
        lead: 'Reported against the thresholds set in M3 — including a skew I did not want.',
        soWhat: 'Results are reported against pre-registered thresholds, skew included.',
        n: 'n = 18 · convenience pilot · self-report',
        cols: ['Pre-registered criterion', 'Threshold', 'Result', 'Verdict'],
        rows: [
            ['H2 · completion rate', '≥ 70%', '78% (14 / 18 reached a result)', 'met'],
            ['H1 · top-match acceptance', '> 20% chance', '39% picked the top-ranked name', 'met'],
            ['H3 · median completion time', '≤ 8:00', '5:10 (IQR 4:05–6:40)', 'met'],
        ],
        distTitle: 'Match distribution — the finding',
        distNote: 'Recommendations skewed toward CBT-tagged therapists. Not a preference effect: anxiety and sleep are the most-rated topics, and those specialties cluster on CBT profiles, so the topic criterion favours them. Reported, not smoothed — the fix is in M14/M16.',
        caveat: 'Every figure carries the same caveat: small n, convenience sample, self-report; treat as directional, not confirmatory.',
        caption: 'Pilot read against the three pre-registered rows, plus the orientation skew.',
    },
    zh: {
        title: '試辦結果',
        lead: '對照 M3 設定的門檻回報——包含一個我並不想要的偏斜。',
        soWhat: '結果對照事前登錄的門檻回報，連偏斜也一併呈現。',
        n: 'n = 18 · 便利樣本試辦 · 自陳',
        cols: ['事前登錄標準', '門檻', '結果', '判定'],
        rows: [
            ['H2 · 完成率', '≥ 70%', '78%（14 / 18 抵達結果）', '達標'],
            ['H1 · 最佳媒合接受度', '> 20% 隨機', '39% 選了排名第一的名字', '達標'],
            ['H3 · 完成時間中位數', '≤ 8:00', '5:10（IQR 4:05–6:40）', '達標'],
        ],
        distTitle: '媒合分布——這個發現',
        distNote: '推薦偏向被標為 CBT 的心理師。這不是偏好效應：焦慮與睡眠是最常被評分的議題，而這些專長聚集在 CBT 檔案上，因此議題準則偏袒它們。如實回報、未加平滑——修正方向見 M14／M16。',
        caveat: '每個數字都帶同一個但書：小樣本、便利取樣、自陳；視為方向性而非驗證性。',
        caption: '試辦對照三列事前登錄標準，加上取向偏斜。',
    },
};

const VERDICT = { met: 'pm-tag--teal', 達標: 'pm-tag--teal', missed: 'pm-tag--red' };
const maxV = Math.max(...DIST.map(d => d.v));

export default function M13_PilotResults() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="pm-pilot-n">{c.n}</div>
            <figure style={{ margin: 0 }}>
                <div className="pm-table-wrap">
                    <table className="pm-table pm-table--pilot">
                        <thead><tr>{c.cols.map(h => <th key={h}>{h}</th>)}</tr></thead>
                        <tbody>
                            {c.rows.map((r, i) => (
                                <tr key={i}>
                                    <td data-label={c.cols[0]} className="pm-table-lead">{r[0]}</td>
                                    <td data-label={c.cols[1]}>{r[1]}</td>
                                    <td data-label={c.cols[2]}>{r[2]}</td>
                                    <td data-label={c.cols[3]}><span className={`pm-tag ${VERDICT[r[3]] || 'pm-tag--teal'}`}>{r[3]}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Caption kind="Table" n={3}>{c.caption}</Caption>
            </figure>

            <div className="pm-dist">
                <span className="pm-budget-head">{c.distTitle}</span>
                <ul className="pm-dist-bars">
                    {DIST.map(d => (
                        <li key={d.id}>
                            <span className="pm-dist-label">{d.id}</span>
                            <span className="pm-dist-track"><span className="pm-dist-fill" style={{ width: `${(d.v / maxV) * 100}%` }} /></span>
                            <span className="pm-dist-val">{d.v}</span>
                        </li>
                    ))}
                </ul>
                <p className="pm-dist-note">{c.distNote}</p>
            </div>
            <p className="pm-pilot-caveat">{c.caveat}</p>
        </SectionModule>
    );
}

injectStyles('pm-m13', `
.pm-pilot-n { font-family: var(--pm-font-data); font-size: 11px; letter-spacing: 0.06em; color: var(--pm-text-3); margin-bottom: 12px; }
.pm-table--pilot tbody td:nth-child(2), .pm-table--pilot tbody td:nth-child(3) { font-family: var(--pm-font-data); font-size: 12.5px; color: var(--pm-text-2); }
.pm-dist { margin-top: 22px; }
.pm-dist-bars { list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
.pm-dist-bars li { display: grid; grid-template-columns: 96px 1fr 24px; gap: 10px; align-items: center; }
.pm-dist-label { font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-text-2); }
.pm-dist-track { height: 10px; border-radius: 5px; background: var(--pm-bg-0); overflow: hidden; }
.pm-dist-fill { display: block; height: 100%; background: linear-gradient(90deg, var(--pm-amber), var(--pm-amber-dim)); }
.pm-dist-val { font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-amber); text-align: right; }
.pm-dist-note { margin: 12px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--pm-text-2); border-left: 2px solid var(--pm-amber); padding-left: 12px; }
.pm-pilot-caveat { margin: 16px 0 0; font-size: 12.5px; color: var(--pm-text-3); font-style: italic; }
`);
