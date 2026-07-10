import React, { useMemo, useState } from 'react';
import SectionModule, { injectStyles, useI18n } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M01');

const SOURCES = [
  { id: 'mops', name: 'MOPS', access: 'request', volatility: 'stable', cadence: { en: 'Monthly', zh: '每月' },
    fields: { en: 'Legal name, capital, responsible person, registration status', zh: '法定名稱、資本額、負責人、登記狀態' } },
  { id: '104', name: '104', access: 'playwright', volatility: 'watch', cadence: { en: 'Weekly', zh: '每週' },
    fields: { en: 'Hiring count, job titles, operating location', zh: '徵才人數、職缺類型、營運地點' } },
  { id: 'tsia', name: 'TSIA', access: 'request', volatility: 'stable', cadence: { en: 'Quarterly', zh: '每季' },
    fields: { en: 'Membership list, sector tag', zh: '會員名單、產業標籤' } },
  { id: 'semi', name: 'SEMI', access: 'request', volatility: 'stable', cadence: { en: 'Quarterly', zh: '每季' },
    fields: { en: 'Sector tag, supply-chain role', zh: '產業標籤、供應鏈角色' } },
  { id: 'asip', name: 'ASIP', access: 'request', volatility: 'stable', cadence: { en: 'Quarterly', zh: '每季' },
    fields: { en: 'Membership list, technology focus', zh: '會員名單、技術領域' } },
  { id: 'startups', name: { en: 'Startup lists', zh: '新創名單' }, access: 'manual', volatility: 'volatile', cadence: { en: 'Manual', zh: '人工更新' },
    fields: { en: 'Founding year, funding stage', zh: '成立年份、募資階段' } },
  { id: 'news', name: { en: 'News search', zh: '新聞搜尋' }, access: 'playwright', volatility: 'volatile', cadence: { en: 'Weekly', zh: '每週' },
    fields: { en: 'Recent activity signal, funding mentions', zh: '近期動態訊號、募資提及' } },
  { id: 'manual', name: { en: 'Manual sheets', zh: '人工表格' }, access: 'manual', volatility: 'watch', cadence: { en: 'Manual', zh: '人工更新' },
    fields: { en: 'Research-team field overrides', zh: '研究團隊欄位覆寫' } },
];

const ACCESS_LABEL = {
  request: { en: 'Structured request', zh: '結構化請求' },
  playwright: { en: 'Playwright', zh: 'Playwright' },
  manual: { en: 'Manual ingestion', zh: '人工匯入' },
};
const VOLATILITY_LABEL = {
  stable: { en: 'Stable', zh: '穩定' },
  watch: { en: 'Watch', zh: '觀察中' },
  volatile: { en: 'Volatile', zh: '不穩定' },
};

const COPY = {
  en: {
    title: 'Source Signal Intake',
    lead: 'Every source is registered as a signal — not just a URL — with its access method, update cadence, volatility, and the fields it is trusted to supply.',
    soWhat: 'Treating sources as registered, faceted records (not ad-hoc scripts) is what let the pipeline survive a source going stale or changing its page layout without silently corrupting downstream data.',
    accessLabel: 'Access method', volLabel: 'Volatility',
    all: 'All', count: n => `Showing ${n} of ${SOURCES.length} sources`,
    detailHint: 'Select a source to see its trusted fields and limits.',
    trustedFields: 'Trusted fields', cadence: 'Update cadence', limits: 'Limit',
    limitText: 'Fields outside this list are not treated as authoritative for this source.',
  },
  zh: {
    title: '來源訊號登錄',
    lead: '每個來源都被登錄為一個訊號，而不只是一個網址——記錄取得方式、更新頻率、波動程度，以及可被信任提供的欄位。',
    soWhat: '把來源當作有面向標記的登錄紀錄（而非臨時腳本）處理，讓管線在來源失效或改版時不會靜默污染下游資料。',
    accessLabel: '取得方式', volLabel: '波動程度',
    all: '全部', count: n => `顯示 ${n} / ${SOURCES.length} 個來源`,
    detailHint: '選擇一個來源以檢視其可信欄位與限制。',
    trustedFields: '可信欄位', cadence: '更新頻率', limits: '限制',
    limitText: '清單以外的欄位不被視為此來源的權威資料。',
  },
};

export default function M01_SourceIntake() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const [access, setAccess] = useState(null);
  const [volatility, setVolatility] = useState(null);
  const [activeId, setActiveId] = useState(SOURCES[0].id);

  const filtered = useMemo(() => SOURCES.filter(s =>
    (!access || s.access === access) && (!volatility || s.volatility === volatility)
  ), [access, volatility]);

  const active = SOURCES.find(s => s.id === activeId) || filtered[0];
  const nameOf = s => (typeof s.name === 'string' ? s.name : s.name[lang]);

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat}>
      <div className="dt-si">
        <div className="dt-si-facets">
          <div className="dt-si-facet-group">
            <span className="dt-data-sm dt-si-facet-label">{c.accessLabel}</span>
            <div className="dt-si-facet-row">
              <button type="button" className="dt-btn" aria-pressed={access === null} onClick={() => setAccess(null)}>{c.all}</button>
              {Object.keys(ACCESS_LABEL).map(k => (
                <button type="button" className="dt-btn" key={k} aria-pressed={access === k} onClick={() => setAccess(a => a === k ? null : k)}>
                  {ACCESS_LABEL[k][lang]}
                </button>
              ))}
            </div>
          </div>
          <div className="dt-si-facet-group">
            <span className="dt-data-sm dt-si-facet-label">{c.volLabel}</span>
            <div className="dt-si-facet-row">
              <button type="button" className="dt-btn" aria-pressed={volatility === null} onClick={() => setVolatility(null)}>{c.all}</button>
              {Object.keys(VOLATILITY_LABEL).map(k => (
                <button type="button" className="dt-btn" key={k} aria-pressed={volatility === k} onClick={() => setVolatility(v => v === k ? null : k)}>
                  {VOLATILITY_LABEL[k][lang]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="dt-data-sm dt-si-count" aria-live="polite">{c.count(filtered.length)}</p>

        <ul className="dt-si-list">
          {filtered.map(s => (
            <li key={s.id}>
              <button
                type="button"
                className="dt-si-row"
                aria-pressed={active && active.id === s.id}
                onClick={() => setActiveId(s.id)}
              >
                <span className="dt-si-row-name">{nameOf(s)}</span>
                <span className="dt-tag" style={{ color: 'var(--dt-accent)' }}>{ACCESS_LABEL[s.access][lang]}</span>
                <span className={`dt-si-dot dt-si-dot-${s.volatility}`} aria-hidden="true" />
                <span className="dt-data-sm">{VOLATILITY_LABEL[s.volatility][lang]}</span>
              </button>
            </li>
          ))}
        </ul>

        {active ? (
          <div className="dt-panel dt-si-detail">
            <div className="dt-si-detail-head">
              <strong>{nameOf(active)}</strong>
              <span className="dt-data-sm">{c.cadence}: {active.cadence[lang]}</span>
            </div>
            <div className="dt-si-detail-row">
              <span className="dt-data-sm dt-si-detail-key">{c.trustedFields}</span>
              <p>{active.fields[lang]}</p>
            </div>
            <p className="dt-data-sm dt-si-limit">{c.limits}: {c.limitText}</p>
          </div>
        ) : (
          <p className="dt-data-sm">{c.detailHint}</p>
        )}
      </div>
    </SectionModule>
  );
}

injectStyles('dt-m01-styles', `
.dt-si-facets { display: flex; flex-wrap: wrap; gap: 20px; }
.dt-si-facet-group { display: flex; flex-direction: column; gap: 8px; }
.dt-si-facet-label { color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.1em; }
.dt-si-facet-row { display: flex; flex-wrap: wrap; gap: 6px; }
.dt-si-count { margin: 14px 0 0; color: var(--dt-text-3); }
.dt-si-list { list-style: none; margin: 10px 0 0; padding: 0; border: 1px solid var(--dt-line-1); border-radius: var(--dt-r-md); overflow: hidden; }
.dt-si-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 14px; border-bottom: 1px solid var(--dt-line-1); background: var(--dt-bg-2); transition: background 140ms var(--dt-ease); }
.dt-si-list li:last-child .dt-si-row { border-bottom: none; }
.dt-si-row:hover { background: var(--dt-bg-3); }
.dt-si-row[aria-pressed="true"] { background: var(--dt-bg-3); box-shadow: inset 3px 0 0 var(--dt-accent); }
.dt-si-row-name { font-weight: 600; color: var(--dt-text-1); font-size: 13.5px; min-width: 120px; text-align: left; }
.dt-si-dot { width: 7px; height: 7px; border-radius: 50%; margin-left: auto; }
.dt-si-dot-stable { background: var(--dt-teal); }
.dt-si-dot-watch { background: var(--dt-amber); }
.dt-si-dot-volatile { background: var(--dt-red); }
.dt-si-detail { margin-top: 16px; padding: 16px 18px; }
.dt-si-detail-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; color: var(--dt-text-1); font-size: 15px; }
.dt-si-detail-row { margin-top: 10px; display: grid; gap: 4px; }
.dt-si-detail-key { color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.08em; }
.dt-si-detail-row p { margin: 0; font-size: 13.5px; color: var(--dt-text-2); }
.dt-si-limit { margin: 12px 0 0; color: var(--dt-text-3); }
`);
