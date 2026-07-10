import React, { useMemo, useState } from 'react';
import SectionModule, { injectStyles, useI18n } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M03');

const CLUSTERS = [
  {
    id: 'tsmc',
    canonical: { en: 'Taiwan Semiconductor Manufacturing Co.', zh: '台灣積體電路製造股份有限公司' },
    real: true,
    candidates: [
      { id: 'tsmc-1', name: '台積電', confidence: 0.94, source: { en: 'MOPS registration', zh: 'MOPS 登記資料' }, why: { en: 'Legal Chinese name matches MOPS record exactly.', zh: '與 MOPS 登記的法定中文名稱完全相符。' } },
      { id: 'tsmc-2', name: 'TSMC', confidence: 0.91, source: { en: 'News byline', zh: '新聞署名' }, why: { en: 'Common English short form used across press coverage.', zh: '各新聞來源共同使用的英文簡稱。' } },
      { id: 'tsmc-3', name: 'Taiwan Semiconductor', confidence: 0.88, source: { en: 'Association list', zh: '協會名單' }, why: { en: 'Partial legal name, consistent capitalization pattern.', zh: '法定名稱的部分寫法，大小寫模式一致。' } },
      { id: 'tsmc-4', name: 'TSMC Hsinchu', confidence: 0.62, source: { en: '104 job page', zh: '104 徵才頁' }, why: { en: 'Could be a site-specific job posting, not necessarily a distinct alias — flagged for review.', zh: '可能只是特定廠區的徵才頁，不一定是獨立別名 — 標記為待審核。' } },
    ],
  },
  {
    id: 'northline',
    canonical: { en: 'Northline Photonics Co.', zh: '北方光電股份有限公司' },
    real: false,
    candidates: [
      { id: 'nl-1', name: 'Northline Photonics', confidence: 0.92, source: { en: 'MOPS registration', zh: 'MOPS 登記資料' }, why: { en: 'Legal English name matches MOPS record.', zh: '與 MOPS 登記的英文名稱相符。' } },
      { id: 'nl-2', name: 'NL Photonics', confidence: 0.85, source: { en: '104 job page', zh: '104 徵才頁' }, why: { en: 'Abbreviated form used consistently in job listings.', zh: '徵才頁一致使用的縮寫形式。' } },
      { id: 'nl-3', name: '北方光電', confidence: 0.79, source: { en: 'Manual sheet', zh: '人工表格' }, why: { en: 'Chinese name added by the research team, not yet cross-verified.', zh: '研究團隊人工補充的中文名稱，尚未交叉驗證。' } },
    ],
  },
  {
    id: 'sable',
    canonical: { en: 'Sable Microsystems Inc.', zh: '賽博微系統股份有限公司' },
    real: false,
    candidates: [
      { id: 'sb-1', name: 'Sable Microsystems', confidence: 0.90, source: { en: 'Association list', zh: '協會名單' }, why: { en: 'Full legal name matches association membership record.', zh: '完整法定名稱與協會會員紀錄相符。' } },
      { id: 'sb-2', name: 'Sable Micro', confidence: 0.83, source: { en: 'News search', zh: '新聞搜尋' }, why: { en: 'Shortened form used in two independent articles.', zh: '兩篇獨立報導中使用的簡稱。' } },
      { id: 'sb-3', name: 'SBL Systems', confidence: 0.58, source: { en: 'Startup list', zh: '新創名單' }, why: { en: 'Ambiguous abbreviation — could belong to a different company entirely.', zh: '縮寫語意不明 — 也可能是完全不同的公司。' } },
    ],
  },
  {
    id: 'vantage',
    canonical: { en: 'Vantage Circuits Co.', zh: '萬德電路股份有限公司' },
    real: false,
    candidates: [
      { id: 'vc-1', name: 'Vantage Circuits', confidence: 0.95, source: { en: 'MOPS registration', zh: 'MOPS 登記資料' }, why: { en: 'Exact legal name match.', zh: '法定名稱完全相符。' } },
      { id: 'vc-2', name: 'Vantage Power Systems', confidence: 0.51, source: { en: 'News search', zh: '新聞搜尋' }, why: { en: 'Shared "Vantage" prefix only — evidence suggests this is a distinct, unrelated company.', zh: '僅共用「Vantage」字首 — 證據顯示這其實是另一家不相關的公司。' } },
    ],
  },
];

const PRESETS = [
  { key: 'conservative', value: 0.85, label: { en: 'Conservative', zh: '保守' } },
  { key: 'balanced', value: 0.70, label: { en: 'Balanced', zh: '平衡' } },
  { key: 'permissive', value: 0.50, label: { en: 'Permissive', zh: '寬鬆' } },
];

const COPY = {
  en: {
    title: 'Entity Resolution Workbench',
    lead: 'Alias candidates are scored against a canonical company profile. Move the confidence threshold to see how many candidates auto-merge versus fall into manual review — then accept or hold any candidate yourself.',
    soWhat: 'The threshold is a judgment call, not a fixed constant: the Vantage cluster shows why a permissive threshold can merge two unrelated companies into one profile.',
    canonical: 'Canonical profile', threshold: 'Confidence threshold', preset: 'Preset',
    candidate: 'Candidate', confidence: 'Confidence', status: 'Status', source: 'Source',
    autoMerge: 'Auto-merge', review: 'Review', accepted: 'Accepted', held: 'Held',
    accept: 'Accept', hold: 'Hold', clear: 'Clear override',
    why: 'Why', announce: (auto, review) => `${auto} candidates auto-merge, ${review} sent to review at this threshold.`,
  },
  zh: {
    title: '實體解析工作台',
    lead: '別名候選會依標準公司檔案評分。調整可信度門檻，觀察多少候選會自動合併、多少會進入人工審核，也可以自行接受或保留任一候選。',
    soWhat: '門檻是一個判斷，而不是固定常數：Vantage 群組示範了寬鬆門檻如何把兩家不相關公司誤判為同一檔案。',
    canonical: '標準公司檔案', threshold: '可信度門檻', preset: '快速設定',
    candidate: '候選別名', confidence: '可信度', status: '狀態', source: '來源',
    autoMerge: '自動合併', review: '待審核', accepted: '已接受', held: '已保留',
    accept: '接受', hold: '保留', clear: '清除覆寫',
    why: '判斷依據', announce: (auto, review) => `此門檻下 ${auto} 個候選自動合併，${review} 個進入審核。`,
  },
};

export default function M03_EntityWorkbench() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const [clusterId, setClusterId] = useState(CLUSTERS[0].id);
  const [threshold, setThreshold] = useState(0.70);
  const [overrides, setOverrides] = useState({});
  const [detailId, setDetailId] = useState(null);

  const cluster = CLUSTERS.find(cl => cl.id === clusterId);
  const detail = cluster.candidates.find(cd => cd.id === detailId);

  const rows = useMemo(() => cluster.candidates.map(cd => {
    const override = overrides[cd.id];
    const status = override || (cd.confidence >= threshold ? 'auto' : 'review');
    return { ...cd, status };
  }), [cluster, overrides, threshold]);

  const autoCount = rows.filter(r => r.status === 'auto' || r.status === 'accept').length;
  const reviewCount = rows.length - autoCount;

  const setOverride = (id, val) => setOverrides(o => ({ ...o, [id]: o[id] === val ? null : val }));

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat}>
      <div className="dt-ew">
        <div className="dt-ew-clusters">
          {CLUSTERS.map(cl => (
            <button
              type="button"
              key={cl.id}
              className="dt-btn"
              aria-pressed={cl.id === clusterId}
              onClick={() => { setClusterId(cl.id); setDetailId(null); }}
            >
              {cl.canonical[lang].split(/[\s,（(]/)[0]}
            </button>
          ))}
        </div>

        <div className="dt-panel dt-ew-canonical">
          <span className="dt-data-sm">{c.canonical}</span>
          <strong>{cluster.canonical[lang]}</strong>
        </div>

        <div className="dt-ew-threshold">
          <label className="dt-data-sm" htmlFor="dt-ew-range">{c.threshold}: {threshold.toFixed(2)}</label>
          <input
            id="dt-ew-range"
            type="range"
            min="0.4" max="1" step="0.01"
            value={threshold}
            onChange={e => setThreshold(parseFloat(e.target.value))}
            style={{ accentColor: 'var(--dt-accent)' }}
          />
          <div className="dt-ew-presets">
            {PRESETS.map(p => (
              <button type="button" key={p.key} className="dt-btn" aria-pressed={threshold === p.value} onClick={() => setThreshold(p.value)}>
                {p.label[lang]} ({p.value.toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        <p className="dt-sr-only" aria-live="polite">{c.announce(autoCount, reviewCount)}</p>

        <table className="dt-table dt-ew-table">
          <thead>
            <tr>
              <th>{c.candidate}</th>
              <th>{c.source}</th>
              <th>{c.confidence}</th>
              <th>{c.status}</th>
              <th aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className={detailId === r.id ? 'is-active' : ''}>
                <td>
                  <button type="button" className="dt-ew-name" onClick={() => setDetailId(r.id === detailId ? null : r.id)}>
                    {r.name}
                  </button>
                </td>
                <td>{r.source[lang]}</td>
                <td>
                  <div className="dt-ew-bar"><span style={{ width: `${r.confidence * 100}%` }} /></div>
                  <span className="dt-data-sm">{r.confidence.toFixed(2)}</span>
                </td>
                <td>
                  <span className={`dt-tag dt-ew-status-${r.status === 'auto' || r.status === 'accept' ? 'auto' : 'review'}`}>
                    {r.status === 'accept' ? c.accepted : r.status === 'hold' ? c.held : r.status === 'auto' ? c.autoMerge : c.review}
                  </span>
                </td>
                <td className="dt-ew-actions">
                  <button type="button" className="dt-btn" onClick={() => setOverride(r.id, 'accept')}>{c.accept}</button>
                  <button type="button" className="dt-btn" onClick={() => setOverride(r.id, 'hold')}>{c.hold}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {detail && (
          <div className="dt-panel dt-ew-detail">
            <span className="dt-data-sm">{c.why}</span>
            <p>{detail.why[lang]}</p>
          </div>
        )}
      </div>
    </SectionModule>
  );
}

injectStyles('dt-m03-styles', `
.dt-ew-clusters { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.dt-ew-canonical { padding: 12px 16px; display: flex; flex-direction: column; gap: 2px; margin-bottom: 16px; }
.dt-ew-canonical strong { color: var(--dt-text-1); font-family: var(--dt-font-display); font-size: 16px; font-weight: 500; }
.dt-ew-threshold { margin-bottom: 18px; }
.dt-ew-threshold input[type="range"] { width: 100%; margin: 8px 0 10px; }
.dt-ew-presets { display: flex; flex-wrap: wrap; gap: 6px; }
.dt-ew-table { margin-top: 4px; }
.dt-ew-table tr.is-active td { background: var(--dt-bg-2); }
.dt-ew-name { color: var(--dt-text-1); font-weight: 600; text-decoration: underline; text-decoration-color: var(--dt-line-2); text-underline-offset: 3px; }
.dt-ew-bar { width: 70px; height: 5px; border-radius: 3px; background: var(--dt-bg-3); overflow: hidden; margin-bottom: 3px; }
.dt-ew-bar span { display: block; height: 100%; background: var(--dt-accent); }
.dt-ew-status-auto { color: var(--dt-teal); border-color: var(--dt-teal); }
.dt-ew-status-review { color: var(--dt-amber); border-color: var(--dt-amber); }
.dt-ew-actions { display: flex; gap: 6px; white-space: nowrap; }
.dt-ew-detail { margin-top: 14px; padding: 14px 16px; }
.dt-ew-detail p { margin: 6px 0 0; font-size: 13.5px; color: var(--dt-text-2); }
@media (max-width: 640px) {
  .dt-ew-table, .dt-ew-table thead, .dt-ew-table tbody, .dt-ew-table th, .dt-ew-table td, .dt-ew-table tr { display: block; }
  .dt-ew-table thead { display: none; }
  .dt-ew-table tr { border: 1px solid var(--dt-line-1); border-radius: var(--dt-r-sm); margin-bottom: 8px; padding: 8px 10px; }
  .dt-ew-table td { border-bottom: none; padding: 4px 0; }
}
`);
