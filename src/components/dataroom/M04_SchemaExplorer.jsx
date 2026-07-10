import React, { useState } from 'react';
import SectionModule, { injectStyles, useI18n } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M04');

const TABLES = [
  { name: 'companies', pk: 'company_id', fields: ['company_id', 'canonical_name_zh', 'canonical_name_en', 'industry_group', 'region_id'] },
  { name: 'company_aliases', pk: 'alias_id', fk: ['company_id', 'source_id'], fields: ['alias_id', 'company_id', 'alias_name', 'source_id', 'confidence'] },
  { name: 'sources', pk: 'source_id', fields: ['source_id', 'source_name', 'source_type', 'access_method', 'volatility'] },
  { name: 'source_rows', pk: 'row_id', fk: ['source_id'], fields: ['row_id', 'source_id', 'raw_payload', 'fetched_at', 'parse_status'] },
  { name: 'company_sources', fk: ['company_id', 'source_id'], fields: ['company_id', 'source_id', 'field_name', 'evidence_value', 'verified_at'] },
  { name: 'company_profiles', pk: 'company_id', fields: ['company_id', 'capital', 'responsible_person', 'address', 'lat_lng', 'last_updated'] },
  { name: 'company_tags', fk: ['company_id'], fields: ['company_id', 'tag', 'tag_group', 'confidence', 'evidence_source'] },
  { name: 'update_logs', pk: 'run_id', fk: ['source_id'], fields: ['run_id', 'source_id', 'started_at', 'changed_rows', 'review_note'] },
];

const RELATIONS = [
  { id: 'alias', label: { en: 'company_aliases.company_id → companies.company_id', zh: 'company_aliases.company_id → companies.company_id' },
    text: { en: 'Each alias row resolves to exactly one canonical company row. This is what lets 台積電, TSMC, and Taiwan Semiconductor all point back to one profile.', zh: '每一列別名都對應到唯一一列標準公司紀錄。這讓「台積電」「TSMC」「Taiwan Semiconductor」都能指回同一份檔案。' } },
  { id: 'rows', label: { en: 'source_rows.source_id → sources.source_id', zh: 'source_rows.source_id → sources.source_id' },
    text: { en: 'Every raw row keeps a pointer back to the source it came from, so nothing enters the database anonymously.', zh: '每一列原始資料都保留指回來源的指標，沒有任何資料是匿名進入資料庫的。' } },
  { id: 'evidence', label: { en: 'company_sources.(company_id, source_id) → companies / sources', zh: 'company_sources.(company_id, source_id) → companies / sources' },
    text: { en: 'Field-level evidence links one company field (like capital or address) to the specific source that proved it — the basis of the Provenance Ledger.', zh: '欄位層級的證據把單一公司欄位（如資本額或地址）連結到證明它的特定來源 — 這也是溯源台帳的基礎。' } },
  { id: 'enrich', label: { en: 'company_profiles / company_tags.company_id → companies.company_id', zh: 'company_profiles / company_tags.company_id → companies.company_id' },
    text: { en: 'Profiles and tags are enrichments hung off the canonical company row — they never exist without a resolved entity behind them.', zh: 'Profiles 與 tags 是掛在標準公司紀錄上的補強欄位 — 沒有已解析的實體，它們就不會存在。' } },
];

const COPY = {
  en: {
    title: 'Schema Explorer',
    lead: 'Eight relational tables carry the database — not a stack of spreadsheets. Select a table for its fields, or a relation for a plain-language join explanation.',
    soWhat: 'A relational model with explicit joins is what makes "why does this record say this?" answerable in one query instead of a spreadsheet hunt.',
    fields: 'Fields', relations: 'Relations', selectTable: 'Select a table to see its fields.',
    selectRelation: 'Select a relation to see how the join works.', pk: 'PK', fk: 'FK',
  },
  zh: {
    title: '資料模型導覽',
    lead: '八個關聯式資料表構成資料庫，而不是一堆試算表。點選資料表檢視欄位，或點選關聯查看白話的 join 說明。',
    soWhat: '明確的關聯式模型讓「這筆資料為什麼是這樣」可以用一次查詢回答，而不是在試算表裡大海撈針。',
    fields: '欄位', relations: '關聯', selectTable: '選擇一個資料表以檢視欄位。',
    selectRelation: '選擇一個關聯以檢視 join 如何運作。', pk: 'PK', fk: 'FK',
  },
};

export default function M04_SchemaExplorer() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const [tableId, setTableId] = useState(null);
  const [relationId, setRelationId] = useState(null);

  const table = TABLES.find(t => t.name === tableId);
  const relation = RELATIONS.find(r => r.id === relationId);

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat}>
      <div className="dt-se">
        <div className="dt-se-grid">
          {TABLES.map(t => (
            <button
              type="button"
              key={t.name}
              className="dt-se-card"
              aria-pressed={tableId === t.name}
              onClick={() => setTableId(t.name === tableId ? null : t.name)}
            >
              <span className="dt-mono">{t.name}</span>
              <span className="dt-data-sm">{t.fields.length} {c.fields.toLowerCase()}</span>
            </button>
          ))}
        </div>

        <div className="dt-panel dt-se-fields">
          {table ? (
            <>
              <span className="dt-data-sm dt-se-fields-title">{table.name} · {c.fields}</span>
              <ul>
                {table.fields.map(f => (
                  <li key={f}>
                    <span className="dt-mono">{f}</span>
                    {f === table.pk && <span className="dt-tag dt-se-pk">{c.pk}</span>}
                    {table.fk && table.fk.includes(f) && f !== table.pk && <span className="dt-tag dt-se-fk">{c.fk}</span>}
                  </li>
                ))}
              </ul>
            </>
          ) : <p className="dt-data-sm">{c.selectTable}</p>}
        </div>

        <div className="dt-se-relations">
          <span className="dt-data-sm dt-se-relations-title">{c.relations}</span>
          <ul>
            {RELATIONS.map(r => (
              <li key={r.id}>
                <button type="button" className="dt-se-relation" aria-pressed={relationId === r.id} onClick={() => setRelationId(r.id === relationId ? null : r.id)}>
                  {r.label[lang]}
                </button>
              </li>
            ))}
          </ul>
          <div className="dt-panel dt-se-relation-detail">
            <p>{relation ? relation.text[lang] : c.selectRelation}</p>
          </div>
        </div>
      </div>
    </SectionModule>
  );
}

injectStyles('dt-m04-styles', `
.dt-se-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }
.dt-se-card { display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-sm); background: var(--dt-bg-2); text-align: left; }
.dt-se-card[aria-pressed="true"] { border-color: var(--dt-accent); background: var(--dt-bg-3); box-shadow: 0 0 0 1px var(--dt-accent) inset; }
.dt-se-card .dt-mono { color: var(--dt-text-1); font-size: 13px; }
.dt-se-fields { margin-top: 14px; padding: 14px 18px; min-height: 60px; }
.dt-se-fields-title { color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.08em; }
.dt-se-fields ul { list-style: none; margin: 10px 0 0; padding: 0; }
.dt-se-fields li { display: flex; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px solid var(--dt-line-1); font-size: 13px; }
.dt-se-fields li:last-child { border-bottom: none; }
.dt-se-pk { color: var(--dt-teal); border-color: var(--dt-teal); }
.dt-se-fk { color: var(--dt-sky); border-color: var(--dt-sky); }
.dt-se-relations { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--dt-line-1); }
.dt-se-relations-title { color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.08em; }
.dt-se-relations ul { list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 6px; }
.dt-se-relation { display: block; width: 100%; padding: 9px 12px; border: 1px solid var(--dt-line-1); border-radius: var(--dt-r-sm); font-family: var(--dt-font-data); font-size: 12px; color: var(--dt-text-2); background: var(--dt-bg-2); }
.dt-se-relation[aria-pressed="true"] { color: var(--dt-text-1); border-color: var(--dt-accent); background: var(--dt-bg-3); }
.dt-se-relation-detail { margin-top: 10px; padding: 12px 16px; min-height: 20px; }
.dt-se-relation-detail p { margin: 0; font-size: 13.5px; color: var(--dt-text-2); }
`);
