import React, { useMemo, useState } from 'react';
import SectionModule, { injectStyles, useI18n, mulberry32 } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M02');

const STAGES = [
  { step: '00', key: 'source', title: { en: 'Source Retrieval', zh: '來源讀取' },
    inputs: { en: ['Public registries', 'MOPS disclosures', '104 job pages', 'Startup lists', 'Manual sheets'], zh: ['公開登記資料', 'MOPS 揭露', '104 徵才頁', '新創名單', '人工表格'] },
    ops: { en: ['Source registry lookup', 'Fetch-timestamp log', 'Access notes'], zh: ['來源登錄查詢', '擷取時間戳記錄', '接入備註'] },
    outputs: { en: ['Source metadata', 'Candidate rows'], zh: ['來源 metadata', '候選資料列'] } },
  { step: '01', key: 'staging', title: { en: 'Raw Staging', zh: '原始暫存' },
    inputs: { en: ['CSV / XLSX snapshots', 'HTML tables', 'Manual rows'], zh: ['CSV / XLSX 快照', 'HTML 表格', '人工維護列'] },
    ops: { en: ['source_rows insert', 'Raw payload capture', 'Parse-status flag'], zh: ['source_rows 寫入', 'raw payload 保存', '解析狀態標記'] },
    outputs: { en: ['Traceable raw rows', 'Parse status'], zh: ['可追溯原始列', '解析狀態'] } },
  { step: '02', key: 'cleaning', title: { en: 'Cleaning & Normalization', zh: '清理與標準化' },
    inputs: { en: ['Raw company names', 'Addresses', 'Sector labels'], zh: ['原始公司名', '地址', '產業標籤'] },
    ops: { en: ['Name normalization', 'Missing-value flags', 'Region parsing'], zh: ['名稱標準化', '缺失值標記', '區域解析'] },
    outputs: { en: ['Clean staging table', 'Review queue'], zh: ['乾淨暫存表', '審核佇列'] } },
  { step: '03', key: 'resolution', title: { en: 'Company Entity Resolution', zh: '企業實體解析' },
    inputs: { en: ['Company names', 'Aliases', 'URLs'], zh: ['公司名稱', '別名', '網址'] },
    ops: { en: ['Alias mapping', 'Duplicate candidates', 'Confidence scoring'], zh: ['別名映射', '重複候選', '可信度評分'] },
    outputs: { en: ['Canonical profile', 'company_aliases'], zh: ['標準公司檔案', 'company_aliases'] } },
  { step: '04', key: 'enrichment', title: { en: 'Profile Enrichment', zh: '公司資料補強' },
    inputs: { en: ['Registry fields', 'Job pages', 'Association records'], zh: ['登記欄位', '徵才頁', '協會資料'] },
    ops: { en: ['Field extraction', 'lat/lng mapping', 'Technology tagging'], zh: ['欄位擷取', 'lat/lng 映射', '技術標籤'] },
    outputs: { en: ['company_profiles', 'company_tags'], zh: ['company_profiles', 'company_tags'] } },
  { step: '05', key: 'database', title: { en: 'Research Database', zh: '研究資料庫' },
    inputs: { en: ['Clean rows', 'Canonical entities', 'Source evidence'], zh: ['清理後資料', '標準實體', '來源證據'] },
    ops: { en: ['Relational indexing', 'Source linkage', 'Version snapshots'], zh: ['關聯式索引', '來源鏈接', '版本快照'] },
    outputs: { en: ['companies', 'source_rows', 'company_sources'], zh: ['companies', 'source_rows', 'company_sources'] } },
  { step: '06', key: 'analysis', title: { en: 'Analysis Data Layer', zh: '分析資料層' },
    inputs: { en: ['Filtered entities', 'Quality summary', 'Tag groups'], zh: ['篩選實體', '品質摘要', '標籤群組'] },
    ops: { en: ['Ecosystem segmentation', 'Value-chain view', 'Geography distribution'], zh: ['生態分群', '價值鏈視圖', '地理分布'] },
    outputs: { en: ['Analysis views', 'Dashboard tables'], zh: ['分析視圖', '儀表板資料表'] } },
  { step: '07', key: 'outputs', title: { en: 'Dashboard & Research Outputs', zh: '儀表板與研究輸出' },
    inputs: { en: ['Analysis mart', 'Map-ready fields', 'Briefing tables'], zh: ['分析資料層', '地圖欄位', '簡報資料表'] },
    ops: { en: ['Power BI views', 'HTML map export', 'Research brief'], zh: ['Power BI 視圖', 'HTML 地圖匯出', '研究 brief'] },
    outputs: { en: ['Ecosystem map', 'Dashboard dataset'], zh: ['生態地圖', '儀表板資料集'] } },
];

const ROW_DELTAS = STAGES.map((_, i) => {
  const rng = mulberry32(900 + i);
  const rowsIn = Math.round(420 + rng() * 1400);
  const rowsOut = Math.round(rowsIn * (0.68 + rng() * 0.27));
  return { rowsIn, rowsOut, dropped: rowsIn - rowsOut };
});

const COPY = {
  en: {
    title: 'Data Pipeline Console',
    lead: 'Eight processing stages show how a batch of data moves from its original sources into the research database. Users can run the workflow step by step or complete it at once, and inspect each stage’s inputs, outputs, and changes in record counts.',
    soWhat: 'Every processing stage can be inspected and rerun. When record counts are abnormal or the workflow is interrupted, users can quickly locate the problem instead of inferring the cause from the final output alone.',
    soWhatLabel: 'Design focus →',
    step: 'Run this stage', run: 'Run full workflow', reset: 'Reset workflow', prev: '← Prev', next: 'Next →',
    inputs: 'Inputs', operations: 'Operations', outputs: 'Outputs',
    rowsLabel: 'Simulated row count', rowsIn: 'in', rowsOut: 'out', dropped: 'filtered/merged',
    idle: 'Not yet run. Select a processing stage or start the full workflow.',
    announce: (i, title) => `Stage ${i} of 8: ${title}`,
  },
  zh: {
    title: '資料管線主控台',
    lead: '以八個處理階段呈現一批資料如何從原始來源進入研究資料庫。使用者可以逐步執行或一次完成流程，並查看各階段的輸入、輸出與資料筆數變化。',
    soWhat: '每個處理階段都可以被檢視與重新執行。當資料筆數異常或流程中斷時，使用者能快速定位問題，而不是只能從最終輸出反推原因。',
    soWhatLabel: '設計重點 →',
    step: '執行此階段', run: '執行完整流程', reset: '重置流程', prev: '← 上一步', next: '下一步 →',
    inputs: '輸入', operations: '處理', outputs: '輸出',
    rowsLabel: '模擬資料列數', rowsIn: '輸入', rowsOut: '輸出', dropped: '過濾／合併',
    idle: '尚未執行。請選擇一個處理階段，或啟動完整流程。',
    announce: (i, title) => `第 ${i} / 8 階段：${title}`,
  },
};

export default function M02_RunConsole() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const [cursor, setCursor] = useState(-1);

  const active = cursor >= 0 ? STAGES[cursor] : null;
  const delta = cursor >= 0 ? ROW_DELTAS[cursor] : null;
  const announce = useMemo(() => active ? c.announce(cursor + 1, active.title[lang]) : c.idle, [active, cursor, lang, c]);

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat} soWhatLabel={c.soWhatLabel}>
      <div className="dt-rc">
        <div className="dt-rc-controls">
          <button type="button" className="dt-btn" onClick={() => setCursor(v => Math.max(0, v - 1))} disabled={cursor <= 0}>{c.prev}</button>
          <button type="button" className="dt-btn" onClick={() => setCursor(v => Math.min(STAGES.length - 1, v + 1))} disabled={cursor >= STAGES.length - 1}>
            {cursor < 0 ? c.step : c.next}
          </button>
          <button type="button" className="dt-btn dt-btn-run" onClick={() => setCursor(STAGES.length - 1)}>{c.run}</button>
          <button type="button" className="dt-btn" onClick={() => setCursor(-1)}>{c.reset}</button>
        </div>

        <ol className="dt-rc-dag">
          {STAGES.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                className="dt-rc-node"
                aria-pressed={cursor === i}
                data-state={cursor < 0 ? 'pending' : i <= cursor ? 'done' : 'pending'}
                onClick={() => setCursor(i)}
              >
                <span className="dt-rc-node-step">{s.step}</span>
                <span className="dt-rc-node-title">{s.title[lang]}</span>
              </button>
              {i < STAGES.length - 1 && <span className="dt-rc-edge" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <p className="dt-sr-only" aria-live="polite">{announce}</p>

        {active ? (
          <div className="dt-panel dt-rc-inspector">
            <div className="dt-rc-inspector-head">
              <strong>{active.step} · {active.title[lang]}</strong>
              <span className="dt-data-sm">{c.rowsLabel}: {delta.rowsIn.toLocaleString()} {c.rowsIn} → {delta.rowsOut.toLocaleString()} {c.rowsOut} ({delta.dropped.toLocaleString()} {c.dropped})</span>
            </div>
            <div className="dt-rc-cols">
              <div>
                <span className="dt-data-sm dt-rc-col-label">{c.inputs}</span>
                <ul>{active.inputs[lang].map(x => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <span className="dt-data-sm dt-rc-col-label">{c.operations}</span>
                <ul>{active.ops[lang].map(x => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <span className="dt-data-sm dt-rc-col-label">{c.outputs}</span>
                <ul>{active.outputs[lang].map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="dt-data-sm">{c.idle}</p>
        )}
      </div>
    </SectionModule>
  );
}

injectStyles('dt-m02-styles', `
.dt-rc-controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.dt-btn-run { border-color: var(--dt-accent); color: var(--dt-accent); }
.dt-rc-dag { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 0; }
.dt-rc-dag li { display: flex; align-items: center; }
.dt-rc-node { display: flex; flex-direction: column; gap: 4px; padding: 9px 12px; border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-sm); background: var(--dt-bg-2); min-width: 92px; }
.dt-rc-node[data-state="done"] { border-color: var(--dt-accent); background: var(--dt-bg-3); }
.dt-rc-node[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--dt-accent) inset; }
.dt-rc-node-step { font-family: var(--dt-font-data); font-size: 11px; color: var(--dt-text-3); }
.dt-rc-node[data-state="done"] .dt-rc-node-step { color: var(--dt-accent); }
.dt-rc-node-title { font-size: 12px; color: var(--dt-text-2); }
.dt-rc-edge { width: 18px; height: 1px; background: var(--dt-line-2); flex: 0 0 auto; }
.dt-rc-inspector { margin-top: 18px; padding: 18px 20px; }
.dt-rc-inspector-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; color: var(--dt-text-1); font-size: 14px; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--dt-line-1); }
.dt-rc-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.dt-rc-col-label { color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.08em; }
.dt-rc-cols ul { margin: 8px 0 0; padding-left: 16px; }
.dt-rc-cols li { font-size: 13px; color: var(--dt-text-2); margin-bottom: 4px; }
@media (max-width: 640px) { .dt-rc-cols { grid-template-columns: 1fr; } }
`);
