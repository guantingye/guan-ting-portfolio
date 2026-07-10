// Module registry (single source of truth for ids/order) + shell copy for the
// Research Database Console evidence layer. DOM anchors are `dt-m01`…`dt-m07`;
// injectStyles ids for each module are `dt-m01-styles`…`dt-m07-styles` — never
// let a style id collide with a section id (see AUDIT.md).

export const MODULES = [
  {
    id: 'dt-m01', key: 'M01', num: '01', tone: 'var(--dt-sky)', badge: 'reconstructed',
    roles: ['TPM', 'UXR'],
    kicker: { en: 'SOURCE LEDGER', zh: '來源登錄冊' },
    type: { en: 'Intake registry', zh: '來源登錄' },
    title: { en: 'Source Signal Intake', zh: '來源訊號登錄' },
    badgeNote: {
      en: 'Source list and access method are project-real; the row registry UI is a reconstruction.',
      zh: '來源清單與取得方式為專案真實資訊；登錄介面為作品集重建版本。',
    },
  },
  {
    id: 'dt-m02', key: 'M02', num: '02', tone: 'var(--dt-teal)', badge: 'reconstructed',
    roles: ['TPM', 'FE'],
    kicker: { en: 'RUN CONSOLE', zh: '執行主控台' },
    type: { en: 'Pipeline run', zh: '管線執行' },
    title: { en: 'Pipeline Run Console', zh: '管線執行主控台' },
    badgeNote: {
      en: 'Stage architecture is project-real; step-through run and row deltas are simulated for demonstration.',
      zh: '階段架構為專案真實設計；逐步執行與資料列差異為示範用模擬數值。',
    },
  },
  {
    id: 'dt-m03', key: 'M03', num: '03', tone: 'var(--dt-amber)', badge: 'reconstructed',
    roles: ['AIPD', 'UXR'],
    kicker: { en: 'MERGE WORKBENCH', zh: '合併工作台' },
    type: { en: 'Entity resolution', zh: '實體解析' },
    title: { en: 'Entity Resolution Workbench', zh: '實體解析工作台' },
    badgeNote: {
      en: 'TSMC alias cluster reflects the real workflow logic; other clusters are illustrative samples, not live company records.',
      zh: '台積電別名群組反映真實流程邏輯；其餘群組為示意樣本，非真實公司紀錄。',
    },
  },
  {
    id: 'dt-m04', key: 'M04', num: '04', tone: 'var(--dt-iris)', badge: 'reconstructed',
    roles: ['TPM', 'FE'],
    kicker: { en: 'SCHEMA MODEL', zh: '資料模型' },
    type: { en: 'Data modeling', zh: '資料建模' },
    title: { en: 'Schema Explorer', zh: '資料模型導覽' },
    badgeNote: {
      en: 'Table and field names match the project schema; the explorer UI is a reconstruction.',
      zh: '資料表與欄位名稱對應專案實際 schema；導覽介面為重建版本。',
    },
  },
  {
    id: 'dt-m05', key: 'M05', num: '05', tone: 'var(--dt-teal)', badge: 'simulated',
    roles: ['TPM'],
    kicker: { en: 'QUALITY GATES', zh: '品質閘門' },
    type: { en: 'QA checks', zh: '品質檢核' },
    title: { en: 'Quality Gate Board', zh: '品質閘門看板' },
    badgeNote: {
      en: 'Gate definitions are project-real; pass/warn/fail outcomes are deterministic simulated runs.',
      zh: '閘門定義為專案真實設計；通過／警告／失敗結果為確定性模擬執行。',
    },
  },
  {
    id: 'dt-m06', key: 'M06', num: '06', tone: 'var(--dt-sky)', badge: 'simulated',
    roles: ['TPM', 'AIPD'],
    kicker: { en: 'AUDIT LEDGER', zh: '溯源台帳' },
    type: { en: 'Lineage trace', zh: '血緣追溯' },
    title: { en: 'Provenance Ledger', zh: '溯源台帳' },
    badgeNote: {
      en: 'Table relationships are project-real; ledger rows are simulated sample lineage, not exported records.',
      zh: '資料表關聯為專案真實設計；台帳列為模擬血緣樣本，非匯出紀錄。',
    },
  },
  {
    id: 'dt-m07', key: 'M07', num: '07', tone: 'var(--dt-amber)', badge: 'reconstructed',
    roles: ['PD', 'FE'],
    kicker: { en: 'OUTPUT GALLERY', zh: '輸出藝廊' },
    type: { en: 'Decision surfaces', zh: '決策輸出' },
    title: { en: 'Decision Surfaces Gallery', zh: '決策輸出藝廊' },
    badgeNote: {
      en: 'Artifact list is project-real; card previews are self-drawn reconstructions, not screenshots.',
      zh: '輸出清單為專案真實項目；卡片預覽為自繪重建，非實際截圖。',
    },
  },
];

export const SHELL = {
  en: {
    eyebrow: 'RESEARCH DATABASE CONSOLE',
    title: 'Data Room: Research Database Console',
    stand: 'Seven working modules that turn a fragmented deep-tech ecosystem into a traceable research database — from source intake and entity resolution to quality gates and decision-ready exports. Each module is rendered live in React, operable rather than illustrated.',
    meta: ['7 interactive modules', '8 sources · 8 tables', 'keyboard accessible', 'reduced-motion aware'],
    navLabel: 'Evidence modules',
  },
  zh: {
    eyebrow: '研究資料庫主控台',
    title: '資料室：研究資料庫主控台',
    stand: '七個可操作模組，展示如何把分散的深科技產業訊號整理成可追溯的研究資料庫——從來源登錄、實體解析到品質閘門與決策輸出。每個模組都由 React 即時渲染，可操作而非僅供瀏覽。',
    meta: ['7 個互動模組', '8 來源 · 8 資料表', '支援鍵盤操作', '尊重減少動態'],
    navLabel: '實作證據模組',
  },
};
