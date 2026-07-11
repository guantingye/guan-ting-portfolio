import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/dsKit.jsx';
import { MODULES } from './data/dsContent.js';

const MOD = MODULES.find(m => m.key === 'M06');

// Real values read live off the shipped Component Lab (/design-system).
const TOKENS = [
    { name: 'ink', hex: '#E9EEF6', ratio: '16.60:1', grade: 'AAA', role: { en: 'Primary text', zh: '主要文字' } },
    { name: 'ink-2', hex: '#9BA9BC', ratio: '8.10:1', grade: 'AAA', role: { en: 'Secondary text', zh: '次要文字' } },
    { name: 'ink-3', hex: '#66748A', ratio: '4.08:1', grade: 'AA Large', role: { en: 'Muted labels', zh: '弱化標籤' } },
    { name: 'teal', hex: '#34D8C4', ratio: '10.84:1', grade: 'AAA', role: { en: 'Signal · primary accent', zh: '訊號 · 主色' } },
    { name: 'amber', hex: '#F2A93C', ratio: '9.68:1', grade: 'AAA', role: { en: 'Structure · secondary', zh: '結構 · 次色' } },
    { name: 'rose', hex: '#E27A72', ratio: '6.69:1', grade: 'AA', role: { en: 'Risk · danger', zh: '風險 · 危險' } },
];

const COPY = {
    en: {
        title: 'Component honesty',
        lead: 'DeepScout\'s design system claims one thing that most portfolios only assert: every contrast ratio shown in its live Component Lab is computed against WCAG at render time, not typed in once and forgotten.',
        colLabel: 'Ratio vs background', roleLabel: 'Role',
        printLabel: 'Print is a deliverable, not an afterthought',
        printBody: 'A scouting brief is meant to be handed to someone. The site\'s print stylesheet hides the header, footer, search console, and pager — everything that only makes sense on screen — and leaves only the brief on the page.',
        soWhat: 'A design system that shows its math, not just its swatches, is the same honesty discipline the product asks of its own AI output.',
    },
    zh: {
        title: '元件誠實',
        lead: 'DeepScout 的設計系統敢說一件多數作品集只會宣稱的事：它的 Component Lab 裡顯示的每一個對比度，都是渲染當下對照 WCAG 即時算出來的，不是打一次字就再也沒人查證。',
        colLabel: '對比背景的比值', roleLabel: '角色',
        printLabel: '列印是交付物，不是順帶一提',
        printBody: '一份偵搜 brief 本來就是要交給別人的文件。網站的列印樣式隱藏了頁首、頁尾、搜尋主控台與翻頁列——所有只在螢幕上才有意義的東西——只留下 brief 本身。',
        soWhat: '一個敢攤開算式、不只是秀色票的設計系統，跟產品要求自己 AI 輸出的誠實紀律，是同一套標準。',
    },
};

export default function M06_ComponentHonesty() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ds-m06-grid">
                {TOKENS.map(tok => (
                    <div key={tok.name} className="ds-m06-token">
                        <span className="ds-m06-swatch" style={{ background: tok.hex }}>Aa</span>
                        <div className="ds-m06-meta">
                            <span className="ds-m06-name">{tok.name}</span>
                            <span className="ds-data-sm" style={{ color: 'var(--ds-text-3)' }}>{tok.hex}</span>
                            <span className="ds-m06-role">{tok.role[lang] ?? tok.role.en}</span>
                            <span className="ds-m06-ratio">
                                <span className="ds-data-sm">{tok.ratio}</span>
                                <span className={`ds-tag ${tok.grade === 'AA' ? 'ds-tag--amber' : 'ds-tag--teal'}`}>{tok.grade}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="ds-m06-print">
                <span className="ds-eyebrow" style={{ color: 'var(--ds-amber)' }}>{t.printLabel}</span>
                <p>{t.printBody}</p>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ds-m06-style', `
.ds-m06-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.ds-m06-token { display: flex; gap: 12px; padding: 12px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); background: var(--ds-bg-2); }
.ds-m06-swatch { flex: 0 0 auto; width: 52px; height: 52px; border-radius: var(--ds-r-sm); display: flex; align-items: center; justify-content: center; font-family: var(--ds-font-display); font-size: 18px; color: #0C0E12; }
.ds-m06-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.ds-m06-name { font-family: var(--ds-font-data); font-size: 13px; color: var(--ds-text-1); }
.ds-m06-role { font-size: 12px; color: var(--ds-text-2); margin: 2px 0; }
.ds-m06-ratio { display: flex; align-items: center; gap: 8px; margin-top: 2px; }
.ds-m06-print { margin-top: 20px; padding: 14px 16px; background: var(--ds-amber-dim); border: 1px solid var(--ds-amber); border-radius: var(--ds-r-md); }
.ds-m06-print p { margin: 8px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--ds-text-1); }
@media (max-width: 900px) { .ds-m06-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .ds-m06-grid { grid-template-columns: 1fr; } }
`);
