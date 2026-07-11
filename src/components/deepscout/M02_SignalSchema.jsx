import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/dsKit.jsx';
import { MODULES } from './data/dsContent.js';

const MOD = MODULES.find(m => m.key === 'M02');

// Real field data for Corintis, ported from the shipped src/data/companies.js.
const FIELDS = [
    { key: 'funding', signal: 'FUNDING', label: { en: 'Funding', zh: '融資' }, value: { en: '$58M total · $24M Series A + $25M extension (2025)', zh: '累計 5800 萬美元 · A 輪 2400 萬 + 2500 萬追加輪（2025）' }, confidence: 'high', source: { en: 'Tech.eu + GlobeNewswire', zh: 'Tech.eu + GlobeNewswire' } },
    { key: 'moat', signal: 'PATENTS', label: { en: 'Technology / moat', zh: '技術 / 護城河' }, value: { en: 'Microfluidic cold plates etched into the die package', zh: '直接刻入晶片封裝的微流體冷板' }, confidence: 'high', source: { en: 'Company + EPFL Innovation Park listing', zh: '官方 + EPFL 創新園區登記' } },
    { key: 'traction', signal: 'NEWS', label: { en: 'Traction', zh: '驗證進度' }, value: { en: 'Named collaboration with Microsoft on chip cooling', zh: '與微軟有明確具名的晶片散熱合作案' }, confidence: 'high', source: { en: 'GlobeNewswire funding announcement', zh: 'GlobeNewswire 募資公告' } },
    { key: 'team', signal: 'TEAM', label: { en: 'Team', zh: '團隊' }, value: { en: 'Founded 2022 out of EPFL, Lausanne', zh: '2022 年由 EPFL 洛桑衍生成立' }, confidence: 'medium', source: { en: 'Vestbee + company profile', zh: 'Vestbee + 公司檔案' } },
];

const COPY = {
    en: {
        title: 'Signal → schema',
        lead: 'Every field in a DeepScout brief traces back to exactly one signal source. This is Corintis\'s real, shipped brief — click a field to trace it back to the source that fed it.',
        company: 'Corintis · Series A · Microfluidic Cooling',
        retrievedNote: 'Retrieved 2026-07-10',
        confLabel: 'CONFIDENCE',
        sourceLabel: 'SOURCE',
        soWhat: 'A schema is only trustworthy if every field can name the signal that produced it — this one always can.',
    },
    zh: {
        title: '訊號變欄位',
        lead: 'DeepScout brief 裡的每個欄位，都能追溯回恰好一個訊號源。這是 Corintis 真實上線的 brief——點一個欄位，追溯回餵給它的訊號源。',
        company: 'Corintis · A 輪 · 微流體散熱',
        retrievedNote: '擷取於 2026-07-10',
        confLabel: '信心',
        sourceLabel: '來源',
        soWhat: '一份 schema 只有在每個欄位都能指出產生它的訊號時，才值得信任——這一份，每次都能。',
    },
};

const SIGNAL_LIST = ['FUNDING', 'PATENTS', 'NEWS', 'TEAM'];

export default function M02_SignalSchema() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState('funding');
    const field = FIELDS.find(f => f.key === active);

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ds-m02-layout">
                <div className="ds-m02-sources">
                    {SIGNAL_LIST.map(s => (
                        <div key={s} className={`ds-m02-source${field.signal === s ? ' is-lit' : ''}`}>
                            <span className="ds-m02-source-dot" />
                            <span className="ds-m02-source-label">{s}</span>
                        </div>
                    ))}
                </div>
                <div className="ds-m02-arrow" aria-hidden="true">
                    <svg viewBox="0 0 60 24" width="60" height="24"><path d="M2 12h50M42 4l10 8-10 8" fill="none" stroke="var(--ds-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div className="ds-m02-brief">
                    <span className="ds-eyebrow" style={{ color: 'var(--ds-amber)' }}>{t.company}</span>
                    <div className="ds-m02-fields">
                        {FIELDS.map(f => (
                            <button key={f.key} className={`ds-m02-field${active === f.key ? ' is-on' : ''}`} onClick={() => setActive(f.key)} aria-pressed={active === f.key}>
                                <span className="ds-m02-field-label">{f.label[lang] ?? f.label.en}</span>
                                <span className="ds-m02-field-value">{f.value[lang] ?? f.value.en}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ds-m02-detail">
                <div className="ds-m02-detail-row">
                    <span className="ds-m02-pg-label">{t.confLabel}</span>
                    <span className={`ds-tag ds-tag--${field.confidence === 'high' ? 'teal' : 'amber'}`}>{field.confidence.toUpperCase()}</span>
                </div>
                <div className="ds-m02-detail-row">
                    <span className="ds-m02-pg-label">{t.sourceLabel}</span>
                    <span className="ds-data-sm" style={{ color: 'var(--ds-text-1)' }}>{field.source[lang] ?? field.source.en}</span>
                </div>
                <div className="ds-m02-detail-row">
                    <span className="ds-m02-pg-label">SIGNAL</span>
                    <span className="ds-tag ds-tag--teal">{field.signal}</span>
                </div>
                <span className="ds-caption">{t.retrievedNote}</span>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ds-m02-style', `
.ds-m02-layout { display: grid; grid-template-columns: auto auto 1fr; gap: 16px; align-items: center; }
.ds-m02-sources { display: grid; gap: 8px; }
.ds-m02-source { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-sm); background: var(--ds-bg-2); transition: border-color 160ms var(--ds-ease), background 160ms var(--ds-ease); }
.ds-m02-source-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ds-line-2); transition: background 160ms var(--ds-ease); }
.ds-m02-source-label { font-family: var(--ds-font-data); font-size: 11px; letter-spacing: 0.08em; color: var(--ds-text-3); }
.ds-m02-source.is-lit { border-color: var(--ds-teal); background: var(--ds-teal-dim); }
.ds-m02-source.is-lit .ds-m02-source-dot { background: var(--ds-teal); }
.ds-m02-source.is-lit .ds-m02-source-label { color: var(--ds-teal); }
.ds-m02-arrow { display: flex; align-items: center; }
.ds-m02-brief { padding: 14px 16px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); background: var(--ds-bg-1); }
.ds-m02-fields { display: grid; gap: 6px; margin-top: 10px; }
.ds-m02-field { display: flex; flex-direction: column; gap: 3px; text-align: left; padding: 9px 12px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-sm); background: var(--ds-bg-2); transition: border-color 160ms var(--ds-ease); }
.ds-m02-field:hover { border-color: var(--ds-line-2); }
.ds-m02-field.is-on { border-color: var(--ds-teal); background: var(--ds-teal-dim); }
.ds-m02-field-label { font-family: var(--ds-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--ds-text-3); }
.ds-m02-field-value { font-size: 13px; color: var(--ds-text-1); }
.ds-m02-detail { margin-top: 18px; display: flex; align-items: center; gap: 22px; flex-wrap: wrap; padding: 12px 16px; background: var(--ds-bg-2); border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); }
.ds-m02-detail-row { display: flex; align-items: center; gap: 8px; }
.ds-m02-pg-label { font-family: var(--ds-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--ds-text-3); }
@media (max-width: 767px) { .ds-m02-layout { grid-template-columns: 1fr; } .ds-m02-arrow { transform: rotate(90deg); justify-content: center; } .ds-m02-sources { grid-template-columns: repeat(2, 1fr); } }
`);
