import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/dsKit.jsx';
import { MODULES, ROUTES, LIVE_URL } from './data/dsContent.js';

const MOD = MODULES.find(m => m.key === 'MB');
const IMG_BASE = (import.meta.env.BASE_URL || '/') + 'deepscout/';

const CHAPTERS = [
    { num: '01', img: '02-copilot-idle.png', route: 'copilot', title: { en: 'The Copilot', zh: '偵搜副駕' } },
    { num: '02', img: '13-personas.png', route: 'personas', title: { en: 'Personas & Jobs to Be Done', zh: '使用者與待辦任務' } },
    { num: '03', img: '11-journey.png', route: 'journey', title: { en: 'Analyst Journey', zh: '分析師旅程' } },
    { num: '04', img: '07-risks-on.png', route: 'risks', title: { en: 'Risk & Guardrail Register', zh: '風險與護欄登錄' } },
    { num: '05', img: '08-roadmap.png', route: 'roadmap', title: { en: 'Prioritization & Decision Gates', zh: '優先級與決策閘門' } },
    { num: '06', img: '14-experiment.png', route: 'experiment', title: { en: 'Experiment Design', zh: '實驗設計' } },
    { num: '07', img: '09-graph.png', route: 'graph', title: { en: 'Deep-Tech Knowledge Graph', zh: '深科技知識圖譜' } },
    { num: '08', img: '10-component-lab.png', route: 'designSystem', title: { en: 'Component Lab', zh: '元件實驗室' } },
];

const CROSS_LINKS = [
    { num: '02', title: { en: 'Global DeepTech Database', zh: '全球深科技資料庫' }, body: { en: 'The research-grade data pipeline this domain\'s signal layer is built on.', zh: '這個領域訊號層所仰賴的研究等級資料管線。' } },
    { num: '04', title: { en: 'AI News Intelligence System', zh: 'AI 新聞情報系統' }, body: { en: 'The same "signal → structured → sourced" belief, running as a daily production pipeline.', zh: '同一套「訊號 → 結構化 → 附來源」的信念，正每天以生產管線運作著。' } },
];

const COPY = {
    en: {
        title: 'Live bridge',
        lead: 'Every module above rebuilds one decision as evidence. Here are the eight real chapters at guantingye.github.io/DeepScout — open them and check the claims against the running site.',
        openLabel: 'Open',
        printNote: 'Plain URL for print / PDF:',
        crossLabel: 'The rest of the lineage',
        soWhat: 'This page argues for decisions. The link is where you go to see whether they held up.',
    },
    zh: {
        title: '實品入口',
        lead: '上方每個模組都把一個決策重建成證據。這裡是 guantingye.github.io/DeepScout 的八個真實章節——打開它們，對照運作中的網站核對每一項宣稱。',
        openLabel: '開啟',
        printNote: '列印／PDF 用純文字網址：',
        crossLabel: '其餘的血緣',
        soWhat: '這一頁談的是決策的理由。連結，才是你能去核對它們是否站得住的地方。',
    },
};

export default function MB_LiveBridge() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ds-mb-grid">
                {CHAPTERS.map(c => (
                    <a key={c.num} className="ds-mb-card" href={ROUTES[c.route]} target="_blank" rel="noopener noreferrer">
                        <span className="ds-mb-card-shot"><img src={`${IMG_BASE}${c.img}`} alt="" loading="lazy" /></span>
                        <span className="ds-mb-card-meta">
                            <span className="ds-mb-card-num">{c.num}</span>
                            <span className="ds-mb-card-title">{c.title[lang] ?? c.title.en}</span>
                            <span className="ds-mb-card-open">{t.openLabel} ↗</span>
                        </span>
                    </a>
                ))}
            </div>
            <p className="ds-caption ds-mb-url">{t.printNote} <span className="ds-mono" style={{ color: 'var(--ds-teal)' }}>{LIVE_URL}</span></p>

            <div className="ds-mb-cross">
                <span className="ds-eyebrow" style={{ color: 'var(--ds-amber)' }}>{t.crossLabel}</span>
                <div className="ds-mb-cross-grid">
                    {CROSS_LINKS.map(c => (
                        <div key={c.num} className="ds-mb-cross-card">
                            <span className="ds-data-sm" style={{ color: 'var(--ds-amber)' }}>{lang === 'zh' ? `專案 ${c.num}` : `Project ${c.num}`}</span>
                            <h5>{c.title[lang] ?? c.title.en}</h5>
                            <p>{c.body[lang] ?? c.body.en}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ds-mb-style', `
.ds-mb-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.ds-mb-card { display: flex; flex-direction: column; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); overflow: hidden; background: var(--ds-bg-2); text-decoration: none; transition: border-color 180ms var(--ds-ease), transform 180ms var(--ds-ease); }
.ds-mb-card:hover { border-color: var(--ds-teal); transform: translateY(-2px); }
.ds-mb-card-shot { display: block; aspect-ratio: 16 / 10; overflow: hidden; background: var(--ds-bg-0); border-bottom: 1px solid var(--ds-line-1); }
.ds-mb-card-shot img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.ds-mb-card-meta { padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 3px; }
.ds-mb-card-num { font-family: var(--ds-font-data); font-size: 11px; color: var(--ds-teal); }
.ds-mb-card-title { font-size: 12.5px; color: var(--ds-text-1); line-height: 1.35; }
.ds-mb-card-open { font-family: var(--ds-font-data); font-size: 10px; letter-spacing: 0.1em; color: var(--ds-text-3); margin-top: 4px; }
.ds-mb-url { margin: 16px 0 0; }
.ds-mb-cross { margin-top: 26px; padding-top: 20px; border-top: 1px dashed var(--ds-line-1); }
.ds-mb-cross-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
.ds-mb-cross-card { padding: 14px 16px; background: var(--ds-bg-2); border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); }
.ds-mb-cross-card h5 { margin: 6px 0 8px; font-family: var(--ds-font-display); font-size: 16px; color: var(--ds-text-1); }
.ds-mb-cross-card p { margin: 0; font-size: 13px; line-height: 1.55; color: var(--ds-text-2); }
@media (max-width: 900px) { .ds-mb-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .ds-mb-grid { grid-template-columns: 1fr; } .ds-mb-cross-grid { grid-template-columns: 1fr; } }
`);
