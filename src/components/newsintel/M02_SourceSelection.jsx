import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M02');

// Intensity marks — filled squares carry the count (color is never the only channel).
function Marks({ n, tone = 'var(--ni-teal)', label }) {
    return (
        <span className="ni-marks" role="img" aria-label={`${label}: ${n} of 5`}>
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={`ni-mark${i <= n ? ' is-on' : ''}`} style={{ '--ni-m': tone }} />
            ))}
        </span>
    );
}

const COPY = {
    en: {
        title: 'Source selection audit',
        lead: 'Six live sources and a set of domain feeds. I scored each one on how much original signal it carries against how hard it is to pull clean text out of — then dropped two that did not earn their place.',
        cols: ['Source', 'Lang', 'Signal density', 'Cadence', 'Extract difficulty', 'Dedupe overlap'],
        rows: [
            { src: 'TechCrunch',        lang: 'EN',    signal: 4, cadence: 'Hourly',   diff: 3, overlap: '31%' },
            { src: 'MIT Tech Review',   lang: 'EN',    signal: 5, cadence: 'Daily',    diff: 2, overlap: '9%' },
            { src: 'TechNews 科技新報', lang: 'zh-TW', signal: 4, cadence: 'Hourly',   diff: 2, overlap: '38%' },
            { src: 'INSIDE 硬塞',       lang: 'zh-TW', signal: 3, cadence: '~4×/day',  diff: 2, overlap: '42%' },
            { src: 'TechNewsWorld',     lang: 'EN',    signal: 3, cadence: 'Daily',    diff: 4, overlap: '22%' },
            { src: 'Domain RSS feeds',  lang: 'EN/zh', signal: 4, cadence: 'Varies',   diff: 1, overlap: '17%' },
        ],
        rejectLabel: 'Evaluated & rejected',
        rejects: [
            { src: 'Aggregator portal', reason: 'Low original-reporting ratio — mostly re-hosted wire copy, inflates dedupe load.' },
            { src: 'Social trending feed', reason: 'High volume, low verifiability — no stable source link to cite in a briefing.' },
        ],
        legend: 'Signal density and extract difficulty: 1 (low) → 5 (high).',
        soWhat: 'Source selection was a scored decision, not a default.',
    },
    zh: {
        title: '來源選擇盤點',
        lead: '六個線上來源，加上一組領域 feed。我替每一個評分：帶多少原創訊號、又有多難把乾淨內文抓出來——再砍掉兩個不夠格的。',
        cols: ['來源', '語言', '訊號密度', '更新頻率', '擷取難度', '重複重疊'],
        rows: [
            { src: 'TechCrunch',        lang: 'EN',    signal: 4, cadence: '每小時',  diff: 3, overlap: '31%' },
            { src: 'MIT Tech Review',   lang: 'EN',    signal: 5, cadence: '每日',    diff: 2, overlap: '9%' },
            { src: 'TechNews 科技新報', lang: 'zh-TW', signal: 4, cadence: '每小時',  diff: 2, overlap: '38%' },
            { src: 'INSIDE 硬塞',       lang: 'zh-TW', signal: 3, cadence: '約每日4次', diff: 2, overlap: '42%' },
            { src: 'TechNewsWorld',     lang: 'EN',    signal: 3, cadence: '每日',    diff: 4, overlap: '22%' },
            { src: '領域 RSS feed',     lang: 'EN/中', signal: 4, cadence: '不定',    diff: 1, overlap: '17%' },
        ],
        rejectLabel: '評估後排除',
        rejects: [
            { src: '聚合入口站', reason: '原創報導比例低——多為轉載通訊社稿，反而墊高去重負擔。' },
            { src: '社群熱門 feed', reason: '量大但可驗證性低——沒有穩定來源連結可在簡報中引用。' },
        ],
        legend: '訊號密度與擷取難度：1（低）→ 5（高）。',
        soWhat: '來源選擇是一個評分後的決策，不是預設值。',
    },
};

export default function M02_SourceSelection() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m2-scroll">
                <table className="ni-m2-table">
                    <thead>
                        <tr>{t.cols.map(c => <th key={c} scope="col">{c}</th>)}</tr>
                    </thead>
                    <tbody>
                        {t.rows.map(r => (
                            <tr key={r.src}>
                                <th scope="row" className="ni-m2-src">{r.src}</th>
                                <td><span className="ni-tag">{r.lang}</span></td>
                                <td><Marks n={r.signal} tone="var(--ni-teal)" label={t.cols[2]} /></td>
                                <td className="ni-mono ni-m2-cadence">{r.cadence}</td>
                                <td><Marks n={r.diff} tone="var(--ni-amber)" label={t.cols[4]} /></td>
                                <td className="ni-mono ni-m2-overlap">{r.overlap}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="ni-caption ni-m2-legend">{t.legend}</p>
            <div className="ni-m2-rejects">
                <span className="ni-tag ni-tag--red">{t.rejectLabel}</span>
                <ul>
                    {t.rejects.map(r => (
                        <li key={r.src}><strong>{r.src}</strong> — {r.reason}</li>
                    ))}
                </ul>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m2', `
.ni-m2-scroll { overflow-x: auto; }
.ni-m2-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 620px; }
.ni-m2-table th, .ni-m2-table td { text-align: left; padding: 11px 12px; border-bottom: 1px solid var(--ni-line-1); vertical-align: middle; }
.ni-m2-table thead th { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.09em; text-transform: uppercase; color: var(--ni-text-3); border-bottom: 1px solid var(--ni-line-2); }
.ni-m2-src { font-weight: 500; color: var(--ni-text-1); font-family: var(--ni-font-body); }
.ni-m2-cadence { color: var(--ni-text-2); font-size: 12px; }
.ni-m2-overlap { color: var(--ni-text-2); }
.ni-marks { display: inline-flex; gap: 3px; }
.ni-mark { width: 9px; height: 9px; border-radius: 2px; border: 1px solid var(--ni-line-2); background: transparent; }
.ni-mark.is-on { background: var(--ni-m); border-color: var(--ni-m); }
.ni-m2-legend { display: block; margin-top: 12px; }
.ni-m2-rejects { display: flex; gap: 14px; margin-top: 18px; padding: 14px 16px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m2-rejects ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
.ni-m2-rejects li { font-size: 13px; line-height: 1.5; color: var(--ni-text-2); }
.ni-m2-rejects strong { color: var(--ni-text-1); font-weight: 600; }
@media (max-width: 640px) { .ni-m2-rejects { flex-direction: column; gap: 10px; } }
`);
