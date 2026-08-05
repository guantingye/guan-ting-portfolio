import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, onActivate } from './shared/ispKit.jsx';
import { MODULES, SPECIMEN_COMPANIES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M05');

const SECTIONS = [
    { key: 'founders', en: 'FOUNDING TEAM', zh: '創辦團隊' },
    { key: 'moat', en: 'THE MOAT', zh: '護城河' },
    { key: 'businessModel', en: 'BUSINESS MODEL', zh: '商業模式' },
    { key: 'funding', en: 'FUNDING STATUS', zh: '募資狀態' },
    { key: 'risks', en: 'KEY RISKS', zh: '關鍵風險' },
    { key: 'verdict', en: 'RESEARCH JUDGMENT', zh: '研究判斷' },
];

const COPY = {
    en: {
        title: 'Anatomy of an analyst note',
        lead: 'This module presents three companies from different industries through the same six-part analysis structure: an AI coding agent, a humanoid-robotics company, and a CRISPR gene-editing therapeutics platform. Switch companies to compare how a fixed schema accommodates different business models, technical risks, and research judgments — and how a company record moves from being included to becoming analysis that can be read and discussed.',
        switchLabel: 'Switch company',
        verdictNote: 'This area presents research judgment formed from publicly available materials. Its content can be challenged, revised, and continually updated; it is not investment advice.',
        soWhat: 'A consistent research framework lets companies from different industries be compared through the same questions; the real differences belong in the answers, not the format.',
    },
    zh: {
        title: '一則分析師註記的解剖',
        lead: '這個模組讓三家來自不同產業的公司以同一套六段分析結構呈現：AI 編碼代理、人形機器人與 CRISPR 基因編輯療法。切換公司後，可以比較固定 schema 如何容納不同的商業模式、技術風險與研究判斷，也看見公司資料如何從「被收錄」進一步成為「可閱讀、可討論的分析」。',
        switchLabel: '切換公司',
        verdictNote: '此區呈現分析基於公開資料形成的研究判斷，內容可被質疑、修正與持續更新，不視為投資建議。',
        soWhat: '一致的研究框架，讓不同產業的公司仍能在同一套問題下被比較；真正的差異留在答案，而不是格式。',
    },
};

export default function M05_AnalystNote() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [activeId, setActiveId] = useState(SPECIMEN_COMPANIES[0].id);
    const company = SPECIMEN_COMPANIES.find(c => c.id === activeId);

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <span className="isp-caption isp-m5-switch-label">{t.switchLabel}</span>
            <div className="isp-m5-switch" role="tablist" aria-label={t.switchLabel}>
                {SPECIMEN_COMPANIES.map(c => (
                    <button
                        key={c.id}
                        role="tab"
                        aria-selected={activeId === c.id}
                        className={`isp-m5-switch-btn${activeId === c.id ? ' is-on' : ''}`}
                        onClick={() => setActiveId(c.id)}
                        onKeyDown={onActivate(() => setActiveId(c.id))}>
                        <span className="isp-m5-switch-name">{c.name}</span>
                        <span className="isp-m5-switch-sector">{c.sector[lang] ?? c.sector.en}</span>
                    </button>
                ))}
            </div>

            <div className="isp-m5-note" aria-live="polite">
                <div className="isp-m5-note-head">
                    <span className="isp-mono isp-m5-date">{company.date}</span>
                    <strong className="isp-m5-name">{company.name}</strong>
                    <span className="isp-m5-sector">{company.sector[lang] ?? company.sector.en}</span>
                </div>
                <div className="isp-m5-grid">
                    {SECTIONS.map(s => (
                        <div className={`isp-m5-section${s.key === 'verdict' ? ' isp-m5-section--verdict' : ''}`} key={s.key}>
                            <span className="isp-m5-section-label">{lang === 'zh' ? s.zh : s.en}</span>
                            <p>{company[s.key]}</p>
                            {s.key === 'verdict' && <span className="isp-m5-verdict-note">{t.verdictNote}</span>}
                        </div>
                    ))}
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m5-style', `
.isp-m5-switch-label { display: block; margin-bottom: 10px; }
.isp-m5-switch { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 18px; }
.isp-m5-switch-btn { display: flex; flex-direction: column; gap: 3px; padding: 11px 13px; border: 1px solid var(--isp-line-2); border-radius: var(--isp-r-sm); background: var(--isp-bg-2); text-align: left; transition: border-color 160ms var(--isp-ease), background 160ms var(--isp-ease); }
.isp-m5-switch-btn:hover { border-color: var(--isp-teal); }
.isp-m5-switch-btn.is-on { border-color: var(--isp-teal); background: var(--isp-teal-dim); }
.isp-m5-switch-name { font-size: 13px; font-weight: 600; color: var(--isp-text-1); }
.isp-m5-switch-sector { font-size: 11px; color: var(--isp-text-3); }
@media (max-width: 720px) { .isp-m5-switch { grid-template-columns: 1fr; } }

.isp-m5-note { border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); overflow: hidden; }
.isp-m5-note-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; padding: 13px 16px; background: var(--isp-bg-2); border-bottom: 1px solid var(--isp-line-1); }
.isp-m5-date { font-size: 11px; color: var(--isp-text-3); }
.isp-m5-name { font-size: 14.5px; color: var(--isp-text-1); }
.isp-m5-sector { font-size: 12.5px; color: var(--isp-text-2); }
.isp-m5-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.isp-m5-section { padding: 16px 18px; border-bottom: 1px solid var(--isp-line-1); border-right: 1px solid var(--isp-line-1); }
.isp-m5-section:nth-child(3n) { border-right: none; }
.isp-m5-section-label { display: block; font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--isp-text-3); margin-bottom: 8px; }
.isp-m5-section p { margin: 0; font-size: 13px; line-height: 1.62; color: var(--isp-text-2); }
.isp-m5-section--verdict { background: var(--isp-iris-dim); grid-column: 1 / -1; border-right: none; border-bottom: none; }
.isp-m5-section--verdict .isp-m5-section-label { color: var(--isp-iris); }
.isp-m5-section--verdict p { color: var(--isp-text-1); font-family: var(--isp-font-display); font-size: 15px; font-style: italic; }
.isp-m5-verdict-note { display: block; margin-top: 8px; font-family: var(--isp-font-data); font-size: 11px; color: var(--isp-text-3); }
@media (max-width: 900px) { .isp-m5-grid { grid-template-columns: 1fr; } .isp-m5-section { border-right: none; } }
`);
