import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M06');

const TREE = [
    { en: 'Semiconductor', zh: '半導體', n: 148, subs: [
        { en: 'Chip design / EDA', zh: '晶片設計 / EDA', n: 52 },
        { en: 'Foundry & packaging', zh: '晶圓代工與封裝', n: 61 },
        { en: 'Memory', zh: '記憶體', n: 35 },
    ] },
    { en: 'AI', zh: '人工智慧', n: 203, subs: [
        { en: 'Foundation models', zh: '基礎模型', n: 88 },
        { en: 'AI infrastructure', zh: 'AI 基礎設施', n: 71 },
        { en: 'Applied / vertical AI', zh: '應用 / 垂直 AI', n: 44 },
    ] },
    { en: 'Biotech', zh: '生物科技', n: 64, subs: [
        { en: 'Drug discovery', zh: '藥物開發', n: 29 },
        { en: 'Medtech devices', zh: '醫療器材', n: 35 },
    ] },
    { en: 'Cleantech', zh: '潔淨科技', n: 57, subs: [
        { en: 'Energy storage', zh: '儲能', n: 31 },
        { en: 'Grid & renewables', zh: '電網與再生能源', n: 26 },
    ] },
    { en: 'Policy', zh: '政策', n: 41, subs: [
        { en: 'Export controls', zh: '出口管制', n: 18 },
        { en: 'Industrial subsidy', zh: '產業補助', n: 23 },
    ] },
];

const COPY = {
    en: {
        title: 'Bilingual taxonomy design',
        lead: 'Every category is a ZH↔EN pair, so a Taiwan-specific description maps onto a label an international reader can follow. The counts show roughly how the shipped set breaks down.',
        treeLabel: 'Classification tree — ZH ↔ EN',
        expand: 'expand', collapse: 'collapse',
        hardLabel: 'Hard cases & tie-break rules',
        hard: [
            { head: 'A chip-design AI startup raises Series B', rule: 'primary = AI (business model) · secondary = Semiconductor (domain)', code: 'tag = domain_of(revenue) ?? domain_of(headline_noun)' },
            { head: 'TSMC builds a solar-powered fab', rule: 'primary = Semiconductor · Cleantech is context, not the story', code: 'if mention.is_incidental → drop_secondary' },
            { head: 'Export-control ruling hits memory makers', rule: 'primary = Policy · secondary = Semiconductor/Memory', code: 'if event.is_regulatory → primary = Policy' },
            { head: 'A biotech firm licenses an AI folding model', rule: 'primary = Biotech · secondary = AI', code: 'tag = domain_of(who_benefits)' },
        ],
        raterLabel: 'Inter-rater agreement',
        raterNote: 'AI tags vs. my manual tags on a 100-article sample: 87% agreement (κ ≈ 0.81). The remaining 13% clustered in three confusion pairs — mostly the AI ⇄ Semiconductor boundary the tie-break rules above were written to settle.',
        confusion: ['AI ⇄ Semiconductor', 'Cleantech ⇄ Policy', 'Biotech ⇄ AI'],
        soWhat: 'I design the information model, not just the interface.',
    },
    zh: {
        title: '雙語分類法設計',
        lead: '每個類別都是 ZH↔EN 配對，讓在地的台灣描述能對應到國際讀者看得懂的標籤。數量大致反映出貨版本的分布。',
        treeLabel: '分類樹——ZH ↔ EN',
        expand: '展開', collapse: '收合',
        hardLabel: '難例與 tie-break 規則',
        hard: [
            { head: '一家晶片設計 AI 新創完成 B 輪', rule: '主 = AI（商業模式）· 次 = 半導體（領域）', code: 'tag = domain_of(revenue) ?? domain_of(headline_noun)' },
            { head: '台積電蓋一座太陽能供電的廠', rule: '主 = 半導體 · 潔淨科技只是背景，不是主題', code: 'if mention.is_incidental → drop_secondary' },
            { head: '出口管制裁定衝擊記憶體廠', rule: '主 = 政策 · 次 = 半導體/記憶體', code: 'if event.is_regulatory → primary = Policy' },
            { head: '一家生技公司授權 AI 摺疊模型', rule: '主 = 生技 · 次 = AI', code: 'tag = domain_of(who_benefits)' },
        ],
        raterLabel: '標註者間一致性',
        raterNote: 'AI 標籤對我的人工標籤（100 篇樣本）：一致率 87%（κ ≈ 0.81）。其餘 13% 集中在三組混淆對——多半是上方 tie-break 規則要處理的 AI ⇄ 半導體邊界。',
        confusion: ['AI ⇄ 半導體', '潔淨科技 ⇄ 政策', '生技 ⇄ AI'],
        soWhat: '我設計的是資訊模型，不只是介面。',
    },
};

export default function M06_Taxonomy() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [open, setOpen] = useState(() => new Set([0, 1]));
    const toggle = i => setOpen(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <span className="ni-caption ni-m6-treelabel">{t.treeLabel}</span>
            <ul className="ni-m6-tree">
                {TREE.map((cat, i) => {
                    const isOpen = open.has(i);
                    return (
                        <li key={cat.en} className="ni-m6-cat">
                            <button className="ni-m6-cat-row" aria-expanded={isOpen} onClick={() => toggle(i)}>
                                <span className="ni-m6-chevron" data-open={isOpen} aria-hidden="true">▸</span>
                                <span className="ni-m6-zh">{cat.zh}</span>
                                <span className="ni-m6-arrow" aria-hidden="true">↔</span>
                                <span className="ni-m6-en">{cat.en}</span>
                                <span className="ni-m6-count">{cat.n}</span>
                            </button>
                            {isOpen && (
                                <ul className="ni-m6-subs">
                                    {cat.subs.map(s => (
                                        <li key={s.en} className="ni-m6-sub">
                                            <span className="ni-m6-zh">{s.zh}</span>
                                            <span className="ni-m6-arrow" aria-hidden="true">↔</span>
                                            <span className="ni-m6-en">{s.en}</span>
                                            <span className="ni-m6-count">{s.n}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>

            <div className="ni-m6-hard">
                <span className="ni-m6-hard-label">{t.hardLabel}</span>
                <div className="ni-m6-hard-grid">
                    {t.hard.map((h, i) => (
                        <div key={i} className="ni-m6-hard-card">
                            <p className="ni-m6-hard-head">{h.head}</p>
                            <p className="ni-m6-hard-rule">{h.rule}</p>
                            <code className="ni-m6-hard-code">{h.code}</code>
                        </div>
                    ))}
                </div>
            </div>

            <div className="ni-m6-rater">
                <span className="ni-tag ni-tag--teal">{t.raterLabel}</span>
                <p>{t.raterNote}</p>
                <div className="ni-m6-confusion">
                    {t.confusion.map(c => <span key={c} className="ni-m6-conf">{c}</span>)}
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m6', `
.ni-m6-treelabel { display: block; margin-bottom: 10px; }
.ni-m6-tree { list-style: none; margin: 0; padding: 0; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); overflow: hidden; }
.ni-m6-cat { border-bottom: 1px solid var(--ni-line-1); }
.ni-m6-cat:last-child { border-bottom: none; }
.ni-m6-cat-row { display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 14px; background: var(--ni-bg-2); transition: background 150ms var(--ni-ease); }
.ni-m6-cat-row:hover { background: var(--ni-bg-3); }
.ni-m6-chevron { color: var(--ni-teal); font-size: 11px; transition: transform 160ms var(--ni-ease); }
.ni-m6-chevron[data-open="true"] { transform: rotate(90deg); }
.ni-m6-zh { font-size: 14px; color: var(--ni-text-1); }
.ni-m6-arrow { color: var(--ni-text-3); font-family: var(--ni-font-data); font-size: 12px; }
.ni-m6-en { font-family: var(--ni-font-data); font-size: 12.5px; color: var(--ni-text-2); }
.ni-m6-count { margin-left: auto; font-family: var(--ni-font-data); font-size: 11px; color: var(--ni-text-3); border: 1px solid var(--ni-line-1); border-radius: 999px; padding: 1px 9px; }
.ni-m6-subs { list-style: none; margin: 0; padding: 0; background: var(--ni-bg-1); }
.ni-m6-sub { display: flex; align-items: center; gap: 10px; padding: 9px 14px 9px 40px; border-top: 1px solid var(--ni-line-1); }
.ni-m6-sub .ni-m6-zh { font-size: 13px; color: var(--ni-text-2); }
.ni-m6-sub .ni-m6-en { font-size: 11.5px; }
.ni-m6-hard { margin-top: 22px; }
.ni-m6-hard-label { display: block; font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ni-amber); margin-bottom: 12px; }
.ni-m6-hard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ni-m6-hard-card { padding: 14px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m6-hard-head { margin: 0 0 8px; font-size: 13.5px; line-height: 1.45; color: var(--ni-text-1); font-weight: 500; }
.ni-m6-hard-rule { margin: 0 0 8px; font-size: 12.5px; line-height: 1.5; color: var(--ni-text-2); }
.ni-m6-hard-code { display: block; font-family: var(--ni-font-data); font-size: 11px; color: var(--ni-teal); background: var(--ni-bg-0); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-sm); padding: 8px 10px; overflow-x: auto; white-space: pre; }
.ni-m6-rater { margin-top: 20px; padding: 16px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m6-rater p { margin: 10px 0 0; font-size: 13px; line-height: 1.6; color: var(--ni-text-2); }
.ni-m6-confusion { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.ni-m6-conf { font-family: var(--ni-font-data); font-size: 11px; color: var(--ni-text-2); border: 1px solid var(--ni-line-2); border-radius: var(--ni-r-sm); padding: 3px 9px; background: var(--ni-bg-1); }
@media (max-width: 767px) { .ni-m6-hard-grid { grid-template-columns: 1fr; } }
`);
