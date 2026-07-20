// Module registry (single source of truth for ids/order) + shell copy for the
// Research Database Console evidence layer. DOM anchors are `dt-m01`…`dt-m07`;
// injectStyles ids for each module are `dt-m01-styles`…`dt-m07-styles` — never
// let a style id collide with a section id (see AUDIT.md).

export const MODULES = [
  {
    id: 'dt-m01', key: 'M01', num: '01', tone: 'var(--dt-sky)', badge: 'reconstructed',
    labels: ['Source Governance', 'Research Operations'],
    kicker: { en: 'SOURCE MANAGEMENT', zh: '來源管理' },
    type: { en: 'Intake registry', zh: '來源登錄' },
    title: { en: 'Data Source Login', zh: '資料來源登入' },
    badgeNote: {
      en: 'Source list and access method are project-real; the row registry UI is a reconstruction.',
      zh: '來源清單與取得方式為專案真實資訊；登錄介面為作品集重建版本。',
    },
  },
  {
    id: 'dt-m02', key: 'M02', num: '02', tone: 'var(--dt-teal)', badge: 'reconstructed',
    labels: ['Pipeline Orchestration', 'Observability'],
    kicker: { en: 'DATA PIPELINE CONSOLE', zh: '資料管線主控台' },
    type: { en: 'Pipeline run', zh: '管線執行' },
    title: { en: 'Data Pipeline Console', zh: '資料管線主控台' },
    badgeNote: {
      en: 'Stage architecture is project-real; step-through run and row deltas are simulated for demonstration.',
      zh: '階段架構為專案真實設計；逐步執行與資料列差異為示範用模擬數值。',
    },
  },
  {
    id: 'dt-m03', key: 'M03', num: '03', tone: 'var(--dt-amber)', badge: 'reconstructed',
    labels: ['Entity Resolution', 'Human Review'],
    kicker: { en: 'COMPANY ENTITY RESOLUTION', zh: '企業實體解析' },
    type: { en: 'Entity resolution', zh: '實體解析' },
    title: { en: 'Company Entity Resolution Workbench', zh: '企業實體解析工作台' },
    badgeNote: {
      en: 'TSMC alias cluster reflects the real workflow logic; other clusters are illustrative samples, not live company records.',
      zh: '台積電別名群組反映真實流程邏輯；其餘群組為示意樣本，非真實公司紀錄。',
    },
  },
  {
    id: 'dt-m04', key: 'M04', num: '04', tone: 'var(--dt-iris)', badge: 'reconstructed',
    labels: ['Relational Modeling', 'Data Architecture'],
    kicker: { en: 'SCHEMA MODEL', zh: '資料模型' },
    type: { en: 'Data modeling', zh: '資料建模' },
    title: { en: 'Data Model & Relationship Explorer', zh: '資料模型與關聯導覽' },
    badgeNote: {
      en: 'Table and field names match the project schema; the explorer UI is a reconstruction.',
      zh: '資料表與欄位名稱對應專案實際 schema；導覽介面為重建版本。',
    },
  },
  {
    id: 'dt-m05', key: 'M05', num: '05', tone: 'var(--dt-teal)', badge: 'simulated',
    labels: ['Data Quality', 'Audit Workflow'],
    kicker: { en: 'DATA QUALITY', zh: '資料品質' },
    type: { en: 'QA checks', zh: '品質檢核' },
    title: { en: 'Data Quality Review Console', zh: '資料品質檢核台' },
    badgeNote: {
      en: 'Gate definitions are project-real; pass/warn/fail outcomes are deterministic simulated runs.',
      zh: '閘門定義為專案真實設計；通過／警告／失敗結果為確定性模擬執行。',
    },
  },
  {
    id: 'dt-m06', key: 'M06', num: '06', tone: 'var(--dt-sky)', badge: 'simulated',
    labels: ['Data Lineage', 'Provenance'],
    kicker: { en: 'DATA PROVENANCE', zh: '資料溯源' },
    type: { en: 'Lineage trace', zh: '血緣追溯' },
    title: { en: 'Data Provenance Ledger', zh: '資料溯源台' },
    badgeNote: {
      en: 'Table relationships are project-real; ledger rows are simulated sample lineage, not exported records.',
      zh: '資料表關聯為專案真實設計；台帳列為模擬血緣樣本，非匯出紀錄。',
    },
  },
  {
    id: 'dt-m07', key: 'M07', num: '07', tone: 'var(--dt-amber)', badge: 'reconstructed',
    labels: ['Research Delivery', 'Data Product'],
    kicker: { en: 'RESEARCH OUTPUTS', zh: '研究輸出' },
    type: { en: 'Decision surfaces', zh: '決策輸出' },
    title: { en: 'Research Outputs Overview', zh: '研究輸出總覽' },
    badgeNote: {
      en: 'Artifact list is project-real; card previews are self-drawn reconstructions, not screenshots.',
      zh: '輸出清單為專案真實項目；卡片預覽為自繪重建，非實際截圖。',
    },
  },
];

export const SHELL = {
  en: {
    eyebrow: 'RESEARCH DATABASE CONSOLE',
    title: 'Interactive Research Database Console',
    stand: 'Seven operable modules recreate the full workflow from source registration, company entity resolution, relational modeling, and quality checks through research outputs. Readers can directly use each function to see how data is organized, assessed, and traced—not merely browse static screens.',
    meta: ['7 operable modules', '8 source categories · 8 tables', 'keyboard accessible', 'supports reduced motion'],
    navLabel: 'Evidence modules',
  },
  zh: {
    eyebrow: '互動系統原型',
    title: '互動研究資料庫主控台',
    stand: '七個可操作模組，重現資料從來源登錄、企業實體解析、關聯式建模、品質檢核到研究輸出的完整流程。讀者可以直接操作各項功能，查看資料如何被整理、判斷與追溯，而不只是瀏覽靜態畫面。',
    meta: ['七個可操作模組', '8 類來源・8 張資料表', '支援鍵盤操作', '支援減少動態'],
    navLabel: '實作證據模組',
  },
};
