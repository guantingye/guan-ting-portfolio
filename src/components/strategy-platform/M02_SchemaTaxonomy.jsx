import React, { useMemo, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/ispKit.jsx';
import { MODULES, SPECIMEN_ROWS, SECTOR_CLUSTERS } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M02');

const FIELDS = [
    { key: 'date', en: 'DATE', zh: '日期', note: { en: 'Records the date this entry was curated', zh: '記錄本筆資料完成策展的日期' } },
    { key: 'company', en: 'COMPANY', zh: '公司', note: { en: 'Standard company name, legal name, and common aliases', zh: '標準公司名稱、法定名稱與常用別名' } },
    { key: 'sector', en: 'SECTOR', zh: '產業', note: { en: 'Free-text description, assigned to one of ~40 industry clusters', zh: '以自由文字描述，並歸入約 40 個產業叢集之一' } },
    { key: 'snapshot', en: 'SNAPSHOT', zh: '摘要', note: { en: 'A one-line statement of core value, expanded into six research sections', zh: '以一句話說明核心價值，並延伸為六段研究分析' } },
    { key: 'founders', en: 'FOUNDING TEAM', zh: '創辦團隊', note: { en: 'Profiles core members’ education, work history, prior companies, and team strengths', zh: '整理核心成員的學經歷、過往公司與團隊優勢' } },
    { key: 'moat', en: 'THE MOAT', zh: '護城河', note: { en: 'Identifies the moat type, formation mechanism, and sustainability', zh: '標示護城河類型、形成機制與可持續性' } },
    { key: 'model', en: 'BUSINESS MODEL', zh: '商業模式', note: { en: 'Revenue sources, pricing model, GTM path, and expansion mechanism', zh: '收入來源、定價方式、GTM 路徑與擴張機制' } },
    { key: 'funding', en: 'FUNDING STATUS', zh: '募資狀態', note: { en: 'Rounds, key investors, funding amount, and valuation trajectory', zh: '輪次、主要投資人、募資金額與估值軌跡' } },
    { key: 'risks', en: 'KEY RISKS', zh: '關鍵風險', note: { en: 'Lists the primary risks and identifies one risk that surface signals can obscure', zh: '列出主要風險，並辨識一項容易被表面訊號掩蓋的風險' } },
    { key: 'verdict', en: 'RESEARCH JUDGMENT', zh: '研究判斷', note: { en: 'Continue tracking, keep under observation, or hold off for now, with traceable reasoning', zh: '持續追蹤、列入觀察或暫不投入，並附上可追溯的判斷理由' } },
];

const COPY = {
    en: {
        title: 'Data schema & industry taxonomy',
        lead: 'Whether a company develops CRISPR therapies, laser-weeding robots, or enterprise software, every company is documented through the same ten fields. This consistent structure lets 201 companies be compared against a shared research baseline, while providing stable inputs for industry filtering, analytical writing, and AI-assisted queries.',
        schemaCaption: 'The ten fields work at two levels: four core details for quickly identifying a company in a list, then six research field groups revealed in its expanded profile.',
        specimenCaption: `Below are ${SPECIMEN_ROWS.length} interactive samples from the real records. Select any industry cluster to filter the company list; this uses the same interaction as the live /startups page.`,
        allClusters: 'All clusters',
        results: n => `${n} rows`,
        clustersTitle: 'Top 15 industry cluster distribution (about 40 industry clusters; data verified 2026-07-10)',
        soWhat: 'A consistent schema gives analysts and AI-assisted modules the same research structure for comparing a laser-weeding robot with a CRISPR platform, without reinventing the analytical format for every company.',
    },
    zh: {
        title: '資料 Schema 與產業分類法',
        lead: '不論公司開發的是 CRISPR 療法、雷射除草機器人，還是企業軟體，每家公司都以相同的十項欄位建檔。這套一致結構讓 201 家公司能在同一組研究基準上被比較，也為後續的產業篩選、分析撰寫與 AI 輔助查詢提供穩定的資料輸入。',
        schemaCaption: '十項欄位分成兩個層次：列表中快速辨識公司的四項核心資訊，以及展開公司檔案後的六組研究欄位。',
        specimenCaption: `下方展示真實紀錄中的 ${SPECIMEN_ROWS.length} 筆互動樣本。選擇任一產業叢集，即可同步篩選公司列表；互動方式與正式上線的 /startups 頁面一致。`,
        allClusters: '全部叢集',
        results: n => `${n} 列`,
        clustersTitle: '前 15 個產業叢集分布（約 40 個產業叢集，資料核實日期：2026-07-10）',
        soWhat: '一致的 schema，讓分析師與 AI 輔助模組能用同一套研究結構，比較一台雷射除草機器人與一個 CRISPR 平台，而不必為每家公司重新發明分析格式。',
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
