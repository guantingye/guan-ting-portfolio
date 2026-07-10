import React, { useEffect, useMemo, useRef, useState } from 'react';
import SectionModule, { injectStyles, useI18n, usePrefersReducedMotion } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M05');

const GATES = [
  { id: 'coverage', label: { en: 'Coverage', zh: '覆蓋範圍' }, verdict: 'pass',
    metric: { en: '234 companies tracked', zh: '234 家公司已追蹤' },
    note: { en: 'Meets the ≥200-company coverage target for this research cycle.', zh: '達成本研究週期 ≥200 家公司的覆蓋目標。' } },
  { id: 'traceability', label: { en: 'Traceability', zh: '來源追溯' }, verdict: 'pass',
    metric: { en: '100% raw rows linked', zh: '100% 原始資料列已連結' },
    note: { en: 'Every source_rows entry resolves to a valid source_id.', zh: '每一列 source_rows 都能解析到有效的 source_id。' } },
  { id: 'identity', label: { en: 'Identity control', zh: '身份控制' }, verdict: 'review',
    metric: { en: '4 alias candidates below 0.70', zh: '4 個別名候選低於 0.70' },
    note: { en: 'Alias confidence below the working threshold — routed to manual review, not auto-merged.', zh: '別名可信度低於工作門檻 — 導向人工審核，不自動合併。' },
    sample: { en: ['TSMC Hsinchu · 0.62', 'SBL Systems · 0.58', 'Vantage Power Systems · 0.51', '+1 more'], zh: ['TSMC Hsinchu · 0.62', 'SBL Systems · 0.58', 'Vantage Power Systems · 0.51', '+1 筆'] } },
  { id: 'freshness', label: { en: 'Freshness', zh: '更新鮮度' }, verdict: 'review',
    metric: { en: '2 sources stale > 30 days', zh: '2 個來源超過 30 天未更新' },
    note: { en: 'Stale-source check flags sources for re-fetch before the next research cycle.', zh: 'Stale-source 檢查標記需在下個研究週期前重新擷取的來源。' },
    sample: { en: ['Startup lists — last fetch 34 days ago', 'News search — last fetch 41 days ago'], zh: ['新創名單 — 34 天前擷取', '新聞搜尋 — 41 天前擷取'] } },
  { id: 'conflict', label: { en: 'Conflict handling', zh: '衝突處理' }, verdict: 'blocked',
    metric: { en: '1 field in contradiction', zh: '1 個欄位存在衝突' },
    note: { en: 'Two trusted sources disagree on one field — held pending manual resolution, not silently overwritten.', zh: '兩個可信來源對同一欄位有不同數值 — held 待人工判定，不會被靜默覆寫。' },
    sample: { en: ['company_profiles.capital — MOPS: NT$8.9B vs. manual sheet: NT$9.4B'], zh: ['company_profiles.capital — MOPS：NT$8.9B ／人工表格：NT$9.4B'] } },
  { id: 'output', label: { en: 'Output readiness', zh: '輸出準備度' }, verdict: 'pass',
    metric: { en: 'All export tables populated', zh: '所有匯出資料表皆已填入' },
    note: { en: 'No null primary keys across companies, company_profiles, or company_tags.', zh: 'companies、company_profiles、company_tags 皆無空值主鍵。' } },
];

const VERDICT_LABEL = {
  pass: { en: 'Pass', zh: '通過' },
  review: { en: 'Needs review', zh: '待審核' },
  blocked: { en: 'Blocked', zh: '已阻擋' },
};

const COPY = {
  en: {
    title: 'Quality Gate Board',
    lead: 'Six checks make uncertainty visible instead of letting it become a silent database field. Run a gate to see its verdict and any rows it sends to review.',
    soWhat: 'A conflict that gets held for review is a data point you can trust later; a conflict that gets silently overwritten is one you cannot.',
    run: 'Run check', running: 'Running…', queueTitle: 'Review queue', queueEmpty: 'No items — run a gate to populate the queue.',
    summary: (pass, review, blocked) => `${pass} pass, ${review} need review, ${blocked} blocked.`,
  },
  zh: {
    title: '品質閘門看板',
    lead: '六個檢核項目讓不確定性可見，而不是默默成為資料庫欄位。執行一個閘門以檢視判定結果與送入審核的資料列。',
    soWhat: '被保留審核的衝突，是之後可以信任的資料點；被靜默覆寫的衝突則不是。',
    run: '執行檢核', running: '執行中…', queueTitle: '審核佇列', queueEmpty: '尚無項目 — 執行閘門以填入佇列。',
    summary: (pass, review, blocked) => `${pass} 通過、${review} 待審核、${blocked} 已阻擋。`,
  },
};

export default function M05_QualityGates() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const reduced = usePrefersReducedMotion();
  const [status, setStatus] = useState({});
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = id => {
    setStatus(s => ({ ...s, [id]: 'running' }));
    const delay = reduced ? 0 : 380;
    const t = setTimeout(() => setStatus(s => ({ ...s, [id]: 'done' })), delay);
    timers.current.push(t);
  };

  const resolved = GATES.filter(g => status[g.id] === 'done');
  const pass = resolved.filter(g => g.verdict === 'pass').length;
  const review = resolved.filter(g => g.verdict === 'review').length;
  const blocked = resolved.filter(g => g.verdict === 'blocked').length;
  const queue = resolved.filter(g => g.sample);
  const announce = useMemo(() => resolved.length ? c.summary(pass, review, blocked) : '', [resolved.length, pass, review, blocked, c]);

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat}>
      <div className="dt-qg">
        <p className="dt-sr-only" aria-live="polite">{announce}</p>
        <div className="dt-qg-grid">
          {GATES.map(g => {
            const st = status[g.id] || 'idle';
            return (
              <div className="dt-panel dt-qg-card" key={g.id} data-verdict={st === 'done' ? g.verdict : undefined}>
                <div className="dt-qg-card-head">
                  <strong>{g.label[lang]}</strong>
                  {st === 'done' && <span className={`dt-tag dt-qg-verdict-${g.verdict}`}>{VERDICT_LABEL[g.verdict][lang]}</span>}
                </div>
                {st === 'done' ? (
                  <>
                    <p className="dt-qg-metric">{g.metric[lang]}</p>
                    <p className="dt-data-sm dt-qg-note">{g.note[lang]}</p>
                  </>
                ) : (
                  <button type="button" className="dt-btn" onClick={() => run(g.id)} disabled={st === 'running'}>
                    {st === 'running' ? c.running : c.run}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="dt-panel dt-qg-queue">
          <span className="dt-data-sm dt-qg-queue-title">{c.queueTitle}</span>
          {queue.length ? (
            <ul>
              {queue.map(g => (
                <li key={g.id}>
                  <span className={`dt-tag dt-qg-verdict-${g.verdict}`}>{g.label[lang]}</span>
                  <ul className="dt-qg-queue-rows">
                    {g.sample[lang].map(row => <li key={row}>{row}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          ) : <p className="dt-data-sm">{c.queueEmpty}</p>}
        </div>
      </div>
    </SectionModule>
  );
}

injectStyles('dt-m05-styles', `
.dt-qg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.dt-qg-card { padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; min-height: 96px; }
.dt-qg-card-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.dt-qg-card-head strong { color: var(--dt-text-1); font-size: 13.5px; }
.dt-qg-metric { margin: 0; font-family: var(--dt-font-data); font-size: 13px; color: var(--dt-text-1); }
.dt-qg-note { margin: 0; }
.dt-qg-verdict-pass { color: var(--dt-teal); border-color: var(--dt-teal); }
.dt-qg-verdict-review { color: var(--dt-amber); border-color: var(--dt-amber); }
.dt-qg-verdict-blocked { color: var(--dt-red); border-color: var(--dt-red); }
.dt-qg-card[data-verdict="review"] { box-shadow: inset 3px 0 0 var(--dt-amber); }
.dt-qg-card[data-verdict="blocked"] { box-shadow: inset 3px 0 0 var(--dt-red); }
.dt-qg-queue { margin-top: 18px; padding: 16px 18px; }
.dt-qg-queue-title { color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.08em; }
.dt-qg-queue > ul { list-style: none; margin: 12px 0 0; padding: 0; display: grid; gap: 12px; }
.dt-qg-queue-rows { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 4px; }
.dt-qg-queue-rows li { font-family: var(--dt-font-data); font-size: 12px; color: var(--dt-text-2); }
`);
