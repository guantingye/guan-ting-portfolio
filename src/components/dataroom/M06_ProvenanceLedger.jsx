import React, { useMemo, useState } from 'react';
import SectionModule, { injectStyles, useI18n } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M06');

const FIELDS = [
  {
    id: 'capital', label: 'company_profiles.capital',
    rows: [
      { table: 'sources', ref: 'MOPS · registration filing', verified: '—', note: { en: 'source registered', zh: '來源已登錄' } },
      { table: 'source_rows', ref: 'SR-10432', verified: '2025-11-02', note: { en: 'parsed', zh: '已解析' } },
      { table: 'company_sources', ref: 'capital = NT$8.9B', verified: '2025-11-03', note: { en: 'evidence linked', zh: '證據已鏈接' } },
      { table: 'company_profiles', ref: 'capital = NT$8.9B', verified: '2025-11-03', note: { en: 'no review flag', zh: '無審核標記' } },
    ],
  },
  {
    id: 'latlng', label: 'company_profiles.lat_lng',
    rows: [
      { table: 'sources', ref: '104 · job page address', verified: '—', note: { en: 'source registered', zh: '來源已登錄' } },
      { table: 'source_rows', ref: 'SR-20981', verified: '2025-10-18', note: { en: 'parsed, geocoded', zh: '已解析、已定位' } },
      { table: 'company_sources', ref: 'lat_lng = 24.7738, 120.9675', verified: '2025-10-19', note: { en: 'geocoded from address text', zh: '從地址文字定位' } },
      { table: 'company_profiles', ref: 'lat_lng = 24.7738, 120.9675', verified: '2025-10-19', note: { en: 'review required before map export', zh: '匯出地圖前需審核' } },
    ],
  },
  {
    id: 'person', label: 'company_profiles.responsible_person',
    rows: [
      { table: 'sources', ref: 'MOPS · registration filing', verified: '—', note: { en: 'source registered', zh: '來源已登錄' } },
      { table: 'source_rows', ref: 'SR-10432', verified: '2025-11-02', note: { en: 'parsed', zh: '已解析' } },
      { table: 'company_sources', ref: 'responsible_person field captured', verified: '2025-11-03', note: { en: 'evidence linked', zh: '證據已鏈接' } },
      { table: 'company_profiles', ref: 'responsible_person set', verified: '2025-11-03', note: { en: 'no review flag', zh: '無審核標記' } },
    ],
  },
  {
    id: 'tag', label: "company_tags.tag = 'semiconductor'",
    rows: [
      { table: 'sources', ref: 'TSIA · association list', verified: '—', note: { en: 'source registered', zh: '來源已登錄' } },
      { table: 'source_rows', ref: 'SR-30877', verified: '2025-09-30', note: { en: 'parsed', zh: '已解析' } },
      { table: 'company_sources', ref: 'tag = semiconductor (sector classification)', verified: '2025-10-01', note: { en: 'evidence linked', zh: '證據已鏈接' } },
      { table: 'company_tags', ref: 'tag=semiconductor, confidence=0.91', verified: '2025-10-01', note: { en: 'no review flag', zh: '無審核標記' } },
    ],
  },
  {
    id: 'segment', label: 'analysis_mart.segment_counts (semiconductor)',
    rows: [
      { table: 'company_tags', ref: "62 rows where tag='semiconductor'", verified: '—', note: { en: 'rollup input', zh: '彙總輸入' } },
      { table: 'companies', ref: 'joined via company_id', verified: '—', note: { en: 'resolves each tag to one canonical company', zh: '將每個標籤解析到唯一公司' } },
      { table: 'analysis_mart.segment_counts', ref: 'semiconductor = 62', verified: '2025-11-05', note: { en: 'recomputed on every pipeline run (see Module 02)', zh: '每次管線執行皆重新計算（見模組 02）' } },
    ],
  },
];

const COPY = {
  en: {
    title: 'Data Provenance Ledger',
    lead: 'Select any output field or analytical metric to trace its original source, transformation record, and verification time through the data tables and processing steps.',
    soWhat: 'Only data that can be traced back to its source and processing records is suitable for research and decision outputs. This ledger lets every item be checked again instead of only presenting the final result.',
    soWhatLabel: 'Design focus →',
    fieldLabel: 'Trace field', step: 'Step', table: 'Table', ref: 'Reference details', verified: 'Verified', note: 'Processing status',
    announce: (label, n) => `Lineage loaded for ${label}: ${n} steps.`,
  },
  zh: {
    title: '資料溯源台',
    lead: '選擇任一輸出欄位或分析指標，即可沿著資料表與處理步驟，回查其原始來源、轉換紀錄與驗證時間。',
    soWhat: '只有能回到來源與處理紀錄的數據，才適合進入研究與決策輸出。這份清單讓每項資料都能被重新核對，而不是只呈現最終結果。',
    soWhatLabel: '設計重點 →',
    fieldLabel: '追溯欄位', step: '步驟', table: '資料表', ref: '參照內容', verified: '驗證時間', note: '處理狀態',
    announce: (label, n) => `已載入 ${label} 的血緣：共 ${n} 個步驟。`,
  },
};

export default function M06_ProvenanceLedger() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const [fieldId, setFieldId] = useState(FIELDS[0].id);
  const field = FIELDS.find(f => f.id === fieldId);
  const announce = useMemo(() => c.announce(field.label, field.rows.length), [field, c]);

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat} soWhatLabel={c.soWhatLabel}>
      <div className="dt-pl">
        <label className="dt-data-sm dt-pl-label" htmlFor="dt-pl-select">{c.fieldLabel}</label>
        <select id="dt-pl-select" className="dt-pl-select" value={fieldId} onChange={e => setFieldId(e.target.value)}>
          {FIELDS.map(f => <option value={f.id} key={f.id}>{f.label}</option>)}
        </select>

        <p className="dt-sr-only" aria-live="polite">{announce}</p>

        <table className="dt-table dt-pl-table">
          <thead>
            <tr>
              <th>{c.step}</th>
              <th>{c.table}</th>
              <th>{c.ref}</th>
              <th>{c.verified}</th>
              <th>{c.note}</th>
            </tr>
          </thead>
          <tbody>
            {field.rows.map((r, i) => (
              <tr key={r.table + i}>
                <td className="dt-mono">{String(i + 1).padStart(2, '0')}</td>
                <td className="dt-mono">{r.table}</td>
                <td>{r.ref}</td>
                <td className="dt-mono">{r.verified}</td>
                <td>{r.note[lang]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionModule>
  );
}

injectStyles('dt-m06-styles', `
.dt-pl-label { display: block; margin-bottom: 6px; color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.08em; }
.dt-pl-select { width: 100%; max-width: 420px; font-family: var(--dt-font-data); font-size: 13px; color: var(--dt-text-1); background: var(--dt-bg-2); border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-sm); padding: 9px 12px; margin-bottom: 18px; }
.dt-pl-table { margin-top: 4px; }
@media (max-width: 640px) {
  .dt-pl-table thead { display: none; }
  .dt-pl-table, .dt-pl-table tbody, .dt-pl-table tr, .dt-pl-table td { display: block; }
  .dt-pl-table tr { border: 1px solid var(--dt-line-1); border-radius: var(--dt-r-sm); margin-bottom: 8px; padding: 8px 10px; }
  .dt-pl-table td { border-bottom: none; padding: 3px 0; }
}
`);
