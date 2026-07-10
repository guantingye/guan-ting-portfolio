import React from 'react';
import SectionModule, { injectStyles, useI18n } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M07');

const ARTIFACTS = [
  { id: 'index', type: 'index', title: { en: 'Startup / DeepTech Company Index', zh: 'Startup / DeepTech Company Index' },
    desc: { en: 'Searchable table and company profile structure with aliases, tags, and review state.', zh: '可搜尋公司表與 profile 結構，包含別名、標籤與審核狀態。' },
    tables: ['companies', 'company_aliases', 'company_tags'] },
  { id: 'map', type: 'map', title: { en: 'Taiwan Semiconductor / DeepTech Map', zh: 'Taiwan Semiconductor / DeepTech Map' },
    desc: { en: 'Region-based mapping supported by normalized city, park, latitude, and longitude fields.', zh: '以標準化城市、園區、緯度與經度欄位支援區域地圖。' },
    tables: ['company_profiles', 'companies'] },
  { id: 'dashboard', type: 'dashboard', title: { en: 'Ecosystem Segmentation Dashboard', zh: 'Ecosystem Segmentation Dashboard' },
    desc: { en: 'Category distribution, region clusters, source coverage, and trend filters for analysis.', zh: '呈現類別分布、區域群聚、來源覆蓋與趨勢篩選。' },
    tables: ['company_tags', 'companies'] },
  { id: 'brief', type: 'brief', title: { en: 'Research Brief Materials', zh: 'Research Brief Materials' },
    desc: { en: 'Analysis-ready exports for internal research, meetings, and stakeholder communication.', zh: '為內部研究、會議與利害關係人溝通準備的分析輸出。' },
    tables: ['company_profiles', 'company_sources'] },
  { id: 'package', type: 'package', title: { en: 'Enriched Dataset Package', zh: 'Enriched Dataset Package' },
    desc: { en: 'Clean CSV, XLSX, and SQL-ready tables with source metadata and update protocol.', zh: '整理為 CSV、XLSX 與 SQL-ready tables，附來源 metadata 與更新 protocol。' },
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
    title: 'Decision Surfaces Gallery',
    lead: 'The database earns its keep here: five downstream surfaces, each traceable back to the tables that feed it.',
    soWhat: 'Every card lists its source tables — so a stakeholder question about a map or dashboard number has a one-click answer, not a guess.',
    fedBy: 'Fed by tables', dictionaryTitle: 'Field dictionary preview',
    field: 'Field', type: 'Type', source: 'Source', review: 'Review',
  },
  zh: {
    title: '決策輸出藝廊',
    lead: '資料庫的價值在此體現：五個下游輸出面，每一個都能追溯回供應它的資料表。',
    soWhat: '每張卡片都列出來源資料表 — 讓利害關係人對地圖或儀表板數字的提問，能一鍵得到答案，而不是用猜的。',
    fedBy: '來源資料表', dictionaryTitle: '欄位字典預覽',
    field: '欄位', type: '型別', source: '來源', review: '審核',
  },
};

export default function M07_DecisionSurfaces() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const goToSchema = () => document.getElementById('dt-m04')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat}>
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
