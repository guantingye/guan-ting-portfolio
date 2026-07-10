import React, { useMemo, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/ispKit.jsx';
import { MODULES, SPECIMEN_ROWS, SECTOR_CLUSTERS } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M02');

const FIELDS = [
    { key: 'date', en: 'DATE', zh: '日期', note: { en: 'When the record was curated', zh: '紀錄被策展的日期' } },
    { key: 'company', en: 'COMPANY', zh: '公司', note: { en: 'Canonical name + legal aka', zh: '標準名稱 + 法律別名' } },
    { key: 'sector', en: 'SECTOR', zh: '產業', note: { en: 'Free-text label, one of ~40 clusters', zh: '自由文字標籤，屬於 ~40 個叢集之一' } },
    { key: 'snapshot', en: 'SNAPSHOT', zh: '摘要', note: { en: 'One-line thesis, expands into six sections', zh: '一行論點，展開為六段' } },
    { key: 'founders', en: 'FOUNDERS BACKGROUND', zh: '創辦人背景', note: { en: 'Pedigree, prior companies, why this team', zh: '學經歷、前公司、為何是這個團隊' } },
    { key: 'moat', en: 'THE MOAT', zh: '護城河', note: { en: 'Type of moat + its durability, stated plainly', zh: '護城河型別 + 耐久度，直接寫明' } },
    { key: 'model', en: 'BUSINESS MODEL', zh: '商業模式', note: { en: 'Pricing motion, GTM, upsell surface', zh: '定價機制、GTM、追加銷售面' } },
    { key: 'funding', en: 'FUNDING STATUS', zh: '募資狀態', note: { en: 'Rounds, investors, valuation trajectory', zh: '輪次、投資人、估值軌跡' } },
    { key: 'risks', en: 'KEY RISKS', zh: '關鍵風險', note: { en: 'Enumerated, including one non-obvious risk', zh: '逐項列出，含一個非顯而易見的風險' } },
    { key: 'verdict', en: 'VERDICT', zh: '判斷', note: { en: 'Track / watch / pass, with a defensible reason', zh: '追蹤／觀察／放過，附可辯護的理由' } },
];

const COPY = {
    en: {
        title: 'Schema & sector taxonomy',
        lead: 'Every row is the same ten fields, whether the company does CRISPR editing or laser weeding. That constancy is what makes 201 companies comparable instead of 201 one-off write-ups.',
        schemaCaption: 'The ten-field schema — the four table columns you see, then the six sections a row expands into.',
        specimenCaption: `A live specimen — ${SPECIMEN_ROWS.length} of the real 201 records. Click a cluster to filter; this is the same interaction the real /startups sector filter uses.`,
        allClusters: 'All clusters',
        results: n => `${n} rows`,
        clustersTitle: `Real sector-cluster sizes (top 15 of ~40, verified 2026-07-10)`,
        soWhat: 'A schema this constant is what lets an analyst — or an AI strategist — write the same six sections for a laser-weeding robot and a CRISPR platform.',
    },
    zh: {
        title: 'Schema 與產業分類法',
        lead: '不管公司是做 CRISPR 編輯還是雷射除草，每一列都是同一套十個欄位。正是這種一致性，讓 201 家公司可以互相比較，而不是 201 篇各自獨立的介紹文。',
        schemaCaption: '十欄位 schema——先是你看到的四個表格欄，再是一列展開後的六段。',
        specimenCaption: `一個即時範本——來自真實 201 筆紀錄中的 ${SPECIMEN_ROWS.length} 筆。點一個叢集即可篩選；這與真實 /startups 產業篩選使用同一種互動。`,
        allClusters: '全部叢集',
        results: n => `${n} 列`,
        clustersTitle: '真實產業叢集大小（~40 個中的前 15 個，2026-07-10 核實）',
        soWhat: '正是這種一致的 schema，讓分析師——或 AI 策略師——能為一台雷射除草機器人和一個 CRISPR 平台，寫出同樣的六段結構。',
    },
};

export default function M02_SchemaTaxonomy() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState(null);

    const clusters = useMemo(() => Array.from(new Set(SPECIMEN_ROWS.map(r => r.cluster))), []);
    const rows = active ? SPECIMEN_ROWS.filter(r => r.cluster === active) : SPECIMEN_ROWS;
    const maxCount = Math.max(...SECTOR_CLUSTERS.map(c => c.count));

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <span className="isp-caption isp-m2-caption">{t.schemaCaption}</span>
            <div className="isp-m2-fields">
                {FIELDS.map((f, i) => (
                    <div className="isp-m2-field" key={f.key}>
                        <span className="isp-m2-field-idx">{String(i + 1).padStart(2, '0')}</span>
                        <span className="isp-m2-field-name">{lang === 'zh' ? f.zh : f.en}</span>
                        <span className="isp-m2-field-note">{f.note[lang]}</span>
                    </div>
                ))}
            </div>

            <span className="isp-caption isp-m2-caption isp-m2-caption-2">{t.clustersTitle}</span>
            <div className="isp-m2-bars">
                {SECTOR_CLUSTERS.map(c => (
                    <div className="isp-m2-bar-row" key={c.name}>
                        <span className="isp-m2-bar-label">{c.name}</span>
                        <span className="isp-m2-bar-track">
                            <span className="isp-m2-bar-fill" style={{ width: `${(c.count / maxCount) * 100}%` }} />
                        </span>
                        <span className="isp-m2-bar-count">{c.count}</span>
                    </div>
                ))}
            </div>

            <span className="isp-caption isp-m2-caption isp-m2-caption-2">{t.specimenCaption}</span>
            <div className="isp-m2-chips" role="group" aria-label="Filter by cluster">
                <button className={`isp-btn isp-m2-chip${!active ? ' is-on' : ''}`} onClick={() => setActive(null)}>{t.allClusters}</button>
                {clusters.map(c => (
                    <button key={c} className={`isp-btn isp-m2-chip${active === c ? ' is-on' : ''}`} onClick={() => setActive(active === c ? null : c)}>{c}</button>
                ))}
            </div>
            <div className="isp-m2-results">{t.results(rows.length)}</div>
            <div className="isp-m2-scroll">
                <table className="isp-m2-table">
                    <thead><tr><th>{lang === 'zh' ? '日期' : 'DATE'}</th><th>{lang === 'zh' ? '公司' : 'COMPANY'}</th><th>{lang === 'zh' ? '產業' : 'SECTOR'}</th></tr></thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.company}>
                                <td className="isp-mono isp-m2-date">{r.date}</td>
                                <td className="isp-m2-company">{r.company}</td>
                                <td className="isp-m2-sector">{r.sector}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m2-style', `
.isp-m2-caption { display: block; margin-bottom: 12px; }
.isp-m2-caption-2 { margin-top: 26px; }
.isp-m2-fields { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.isp-m2-field { display: grid; grid-template-columns: 24px auto; grid-template-rows: auto auto; gap: 2px 10px; padding: 10px 12px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-sm); }
.isp-m2-field-idx { grid-row: 1 / 3; font-family: var(--isp-font-data); font-size: 11px; color: var(--isp-teal); align-self: center; }
.isp-m2-field-name { font-family: var(--isp-font-data); font-size: 11.5px; letter-spacing: 0.04em; color: var(--isp-text-1); }
.isp-m2-field-note { font-size: 12px; color: var(--isp-text-3); }
@media (max-width: 640px) { .isp-m2-fields { grid-template-columns: 1fr; } }

.isp-m2-bars { display: grid; gap: 7px; }
.isp-m2-bar-row { display: grid; grid-template-columns: 220px 1fr 28px; align-items: center; gap: 10px; }
.isp-m2-bar-label { font-size: 12.5px; color: var(--isp-text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.isp-m2-bar-track { height: 8px; background: var(--isp-bg-2); border-radius: 4px; overflow: hidden; }
.isp-m2-bar-fill { display: block; height: 100%; background: var(--isp-teal); border-radius: 4px; }
.isp-m2-bar-count { font-family: var(--isp-font-data); font-size: 11.5px; color: var(--isp-text-3); text-align: right; }
@media (max-width: 640px) { .isp-m2-bar-row { grid-template-columns: 100px 1fr 24px; } .isp-m2-bar-label { font-size: 11px; } }

.isp-m2-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.isp-m2-chip { font-size: 11.5px; padding: 6px 11px; }
.isp-m2-results { margin: 10px 0; font-family: var(--isp-font-data); font-size: 11px; color: var(--isp-text-3); }
.isp-m2-scroll { overflow-x: auto; }
.isp-m2-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 560px; }
.isp-m2-table th, .isp-m2-table td { text-align: left; padding: 9px 12px; border-bottom: 1px solid var(--isp-line-1); }
.isp-m2-table thead th { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.09em; color: var(--isp-text-3); border-bottom: 1px solid var(--isp-line-2); }
.isp-m2-date { color: var(--isp-text-3); white-space: nowrap; }
.isp-m2-company { color: var(--isp-text-1); font-weight: 500; white-space: nowrap; }
.isp-m2-sector { color: var(--isp-text-2); }
`);
