import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/ecoKit.jsx';
import { MODULES } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E02');

const RECORD = `company {
  id, name_zh, name_en, founded, hq_city,
  headcount, headcount_trend, capital, last_round,
  sector, subsector[], value_chain_stage,
  tech_tags_zh[], tech_tags_en[],          // bilingual taxonomy
  patents, grants[], sources[],            // provenance
  confidence, review_state, updated_at
}`;

const COPY = {
    en: {
        title: 'Record schema & bilingual tagging',
        lead: 'Fragmented public signals become one comparable record, tagged in both languages.',
        soWhat: 'Fragmented signals became comparable, queryable records.',
        schemaLabel: '40+ dimensions per company',
        taxLabel: 'Bilingual taxonomy (ZH ↔ EN)',
        tax: [
            ['異質整合', 'Heterogeneous integration'],
            ['第三代半導體', 'Wide-bandgap semiconductors'],
            ['生成式 AI', 'Generative AI'],
            ['固態電池', 'Solid-state battery'],
            ['細胞治療', 'Cell therapy'],
        ],
        note: 'The taxonomy is the hard part: a Taiwan company describes itself in Chinese marketing language; an international analyst searches in English category terms. The tag layer maps one onto the other so a record is findable from either side.',
        caption: 'One company record (40+ fields) and a sample of the ZH↔EN tag map.',
    },
    zh: {
        title: '紀錄結構與雙語標籤',
        lead: '分散的公開訊號變成一筆可比較的紀錄，並以雙語標籤化。',
        soWhat: '分散的訊號變成可比較、可查詢的紀錄。',
        schemaLabel: '每家公司 40+ 維度',
        taxLabel: '雙語分類法（中 ↔ 英）',
        tax: [
            ['異質整合', 'Heterogeneous integration'],
            ['第三代半導體', 'Wide-bandgap semiconductors'],
            ['生成式 AI', 'Generative AI'],
            ['固態電池', 'Solid-state battery'],
            ['細胞治療', 'Cell therapy'],
        ],
        note: '分類法是最難的部分：台灣公司以中文行銷語言描述自己，國際分析師卻用英文類別詞搜尋。標籤層把兩者對映起來，讓一筆紀錄從任一端都找得到。',
        caption: '一筆公司紀錄（40+ 欄位）與 ZH↔EN 標籤對映樣本。',
    },
};

export default function E02_SchemaTagging() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="eco-schema">
                <div>
                    <span className="eco-schema-k">{c.schemaLabel}</span>
                    <pre className="eco-code" tabIndex={0}><code>{RECORD}</code></pre>
                </div>
                <div>
                    <span className="eco-schema-k">{c.taxLabel}</span>
                    <ul className="eco-tax">
                        {c.tax.map(([zh, en]) => (
                            <li key={en}>
                                <span className="eco-tax-zh">{zh}</span>
                                <span className="eco-tax-arrow" aria-hidden="true">↔</span>
                                <span className="eco-tax-en">{en}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="eco-schema-note">{c.note}</p>
            <Caption kind="Plate" n={2}>{c.caption}</Caption>
        </SectionModule>
    );
}

injectStyles('eco-e2', `
.eco-schema { display: grid; grid-template-columns: 1.15fr 1fr; gap: 18px; align-items: start; }
.eco-schema-k { display: block; font-family: var(--eco-font-data); font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--eco-text-3); margin-bottom: 8px; }
.eco-tax { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.eco-tax li { display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center; padding: 9px 12px; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-sm); background: var(--eco-bg-2); }
.eco-tax-zh { font-size: 13px; color: var(--eco-text-1); }
.eco-tax-arrow { color: var(--eco-ink); font-family: var(--eco-font-data); }
.eco-tax-en { font-size: 12.5px; color: var(--eco-teal); font-family: var(--eco-font-data); text-align: right; }
.eco-schema-note { margin: 18px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--eco-text-2); border-left: 2px solid var(--eco-line-2); padding-left: 12px; }
@media (max-width: 767px) { .eco-schema { grid-template-columns: 1fr; } }
`);
