import React from 'react';
import SectionModule, { injectStyles, useI18n } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M07');

const ARTIFACTS = [
  { id: 'index', type: 'index', title: { en: 'Startup / DeepTech Company Index', zh: 'Startup / DeepTech Company Index' },
    desc: { en: 'Search companies by name, aliases, industry tags, and review status to quickly access company profiles for research.', zh: '依公司名稱、別名、產業標籤與審核狀態搜尋企業，快速查詢供研究使用的公司檔案。' },
    tables: ['companies', 'company_aliases', 'company_tags'] },
  { id: 'map', type: 'map', title: { en: 'Taiwan Semiconductor / DeepTech Map', zh: 'Taiwan Semiconductor / DeepTech Map' },
    desc: { en: 'Show company distribution by city, park, coordinates, and industry tags to support regional comparison and industry-cluster analysis.', zh: '依城市、園區、經緯度與產業標籤呈現企業分布，支援區域比較或與產業聚落分析。' },
    tables: ['company_profiles', 'companies'] },
  { id: 'dashboard', type: 'dashboard', title: { en: 'Ecosystem Segmentation Dashboard', zh: 'Ecosystem Segmentation Dashboard' },
    desc: { en: 'Compare company categories, regional clusters, source coverage, and development trends to support industry mapping and research presentations.', zh: '比較企業類別、區域群聚、來源覆蓋率與發展趨勢，支援產業盤點與研究簡報。' },
    tables: ['company_tags', 'companies'] },
  { id: 'brief', type: 'brief', title: { en: 'Research Brief Materials', zh: 'Research Brief Materials' },
    desc: { en: 'Turn the data into charts, summaries, and key findings for internal research, presentation meetings, and stakeholder communication.', zh: '將資料整理為可供內部研究、會議簡報與利害關係人溝通使用的圖表、摘要與重點發現。' },
    tables: ['company_profiles', 'company_sources'] },
  { id: 'package', type: 'package', title: { en: 'Enriched Dataset Package', zh: 'Enriched Dataset Package' },
    desc: { en: 'Export CSV, XLSX, and query-ready data tables with source metadata, field definitions, and update rules to support follow-on analysis and handoff.', zh: '輸出為 CSV、XLSX 與可直接查詢的資料表，並附上來源 Metadata、欄位說明與更新規則，支援後續分析與交接。' },
    tables: ['companies', 'company_profiles', 'company_tags', 'update_logs'] },
];

const DICTIONARY = [
  { field: 'company_id', type: { en: 'stable key', zh: 'stable key' }, source: 'company_sources', review: { en: 'required before export', zh: '匯出前需審核' } },
  { field: 'lat_lng', type: { en: 'geo pair', zh: 'geo pair' }, source: 'company_profiles', review: { en: 'required before map export', zh: '匯出地圖前需審核' } },
];

function OutputVisual({ type }) {
  if (type === 'index') return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="8" y="10" width="184" height="16" rx="3" fill="var(--dt-bg-3)" />
      <rect x="8" y="34" width="140" height="10" rx="2" fill="var(--dt-line-2)" />
      <rect x="8" y="50" width="164" height="10" rx="2" fill="var(--dt-line-2)" />
      <rect x="8" y="66" width="112" height="10" rx="2" fill="var(--dt-line-2)" />
      <circle cx="182" cy="18" r="5" fill="var(--dt-accent)" />
    </svg>
  );
  if (type === 'map') return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="8" y="8" width="184" height="80" rx="6" fill="var(--dt-bg-3)" />
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 20 + (i % 8) * 21;
        const y = 20 + Math.floor(i / 8) * 22;
        const hot = [3, 10, 14, 19].includes(i);
        return <circle key={i} cx={x} cy={y} r={hot ? 3.4 : 2} fill={hot ? 'var(--dt-accent)' : 'var(--dt-line-2)'} />;
      })}
    </svg>
  );
  if (type === 'dashboard') return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="8" y="52" width="24" height="34" fill="var(--dt-line-2)" />
      <rect x="40" y="34" width="24" height="52" fill="var(--dt-accent)" opacity="0.85" />
      <rect x="72" y="44" width="24" height="42" fill="var(--dt-line-2)" />
      <rect x="104" y="20" width="24" height="66" fill="var(--dt-accent)" opacity="0.55" />
      <polyline points="8,30 40,26 72,32 104,14 136,18" fill="none" stroke="var(--dt-accent)" strokeWidth="2" />
    </svg>
  );
  if (type === 'brief') return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="46" y="8" width="108" height="80" rx="4" fill="var(--dt-bg-3)" stroke="var(--dt-line-2)" />
      <rect x="58" y="22" width="60" height="8" rx="2" fill="var(--dt-accent)" opacity="0.7" />
      {[38, 50, 62, 74].map(y => <rect key={y} x="58" y={y} width="84" height="6" rx="2" fill="var(--dt-line-2)" />)}
    </svg>
  );
  return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="60" y="18" width="80" height="52" rx="4" fill="var(--dt-bg-3)" stroke="var(--dt-line-2)" />
      <rect x="70" y="28" width="60" height="10" rx="2" fill="var(--dt-line-2)" />
      <rect x="70" y="44" width="60" height="10" rx="2" fill="var(--dt-line-2)" />
      <rect x="24" y="76" width="34" height="14" rx="3" fill="none" stroke="var(--dt-accent)" />
      <rect x="66" y="76" width="34" height="14" rx="3" fill="none" stroke="var(--dt-accent)" />
      <rect x="108" y="76" width="34" height="14" rx="3" fill="none" stroke="var(--dt-accent)" />
    </svg>
  );
}

const COPY = {
  en: {
    title: 'Research Outputs Overview',
    lead: 'The database’s value ultimately lies in how it is used for subsequent research. Five outputs share the same company master records and source logs, allowing every map, chart, and data package to be traced back to its corresponding tables.',
    soWhat: 'Every output clearly identifies its source tables and export conditions. When stakeholders question a map, dashboard, or research brief, they can quickly return to the source data and processing records for confirmation.',
    soWhatLabel: 'Design focus →',
    fedBy: 'Fed by tables', dictionaryTitle: 'Field Dictionary & Export Rules',
    field: 'Field', type: 'Type', source: 'Source', review: 'Review',
  },
  zh: {
    title: '研究輸出總覽',
    lead: '資料庫的價值，最終體現在後續研究如何使用它。五種輸出共用同一套企業主檔與來源紀錄，讓每張地圖、圖表與資料包都能回查到對應資料表。',
    soWhat: '每項輸出都清楚標示來源資料表與匯出條件。當利害關係人對地圖、儀表板或研究摘要提出疑問時，可以快速回到資料來源與處理紀錄確認。',
    soWhatLabel: '設計重點 →',
    fedBy: '來源資料表', dictionaryTitle: '欄位字典與匯出規則',
    field: '欄位', type: '型別', source: '來源', review: '審核',
  },
};

export default function M07_DecisionSurfaces() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const goToSchema = () => document.getElementById('dt-m04')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat} soWhatLabel={c.soWhatLabel}>
      <div className="dt-ds">
        <div className="dt-ds-grid">
          {ARTIFACTS.map(a => (
            <article className="dt-panel dt-ds-card" key={a.id}>
              <div className="dt-ds-visual">
                <OutputVisual type={a.type} />
              </div>
              <h4>{a.title[lang]}</h4>
              <p>{a.desc[lang]}</p>
              <button type="button" className="dt-ds-fedby" onClick={goToSchema}>
                <span className="dt-data-sm">{c.fedBy}:</span> {a.tables.join(', ')} →
              </button>
            </article>
          ))}
        </div>

        <div className="dt-panel dt-ds-dict">
          <span className="dt-data-sm">{c.dictionaryTitle}</span>
          <table className="dt-table">
            <thead><tr><th>{c.field}</th><th>{c.type}</th><th>{c.source}</th><th>{c.review}</th></tr></thead>
            <tbody>
              {DICTIONARY.map(d => (
                <tr key={d.field}>
                  <td className="dt-mono">{d.field}</td>
                  <td className="dt-mono">{d.type[lang]}</td>
                  <td className="dt-mono">{d.source}</td>
                  <td>{d.review[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionModule>
  );
}

injectStyles('dt-m07-styles', `
.dt-ds-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
.dt-ds-card { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.dt-ds-visual { background: var(--dt-bg-2); border-radius: var(--dt-r-sm); overflow: hidden; }
.dt-ds-visual svg { display: block; width: 100%; height: auto; }
.dt-ds-card h4 { margin: 4px 0 0; font-size: 13.5px; color: var(--dt-text-1); font-weight: 600; }
.dt-ds-card p { margin: 0; font-size: 12.5px; color: var(--dt-text-2); line-height: 1.55; flex: 1; }
.dt-ds-fedby { text-align: left; font-family: var(--dt-font-data); font-size: 11px; color: var(--dt-accent); border-top: 1px solid var(--dt-line-1); padding-top: 8px; }
.dt-ds-fedby .dt-data-sm { color: var(--dt-text-3); }
.dt-ds-dict { margin-top: 18px; padding: 16px 18px; }
.dt-ds-dict > .dt-data-sm { color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.08em; }
.dt-ds-dict table { margin-top: 10px; }
`);
