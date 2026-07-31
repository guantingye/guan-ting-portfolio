import React, { useCallback, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M10');

const COPY = {
    en: {
        title: 'From Notion daily reports to a queryable interface',
        lead: 'The left side recreates the early daily reports published in Notion; the right side is the redesigned /insights interface now live. Both versions are rebuilt as DOM components rather than static screenshots, so you can drag the divider or use the controls to experience the differences in information composition and reading patterns. The redesign did not add visual elements for their own sake: it reorganized information density, scan order, source evidence, and bilingual content so analysts can identify signals worth further reading more quickly.',
        beforeBtn: 'Before', afterBtn: 'After',
        beforeTag: 'Notion report era', afterTag: 'Shipped platform',
        divider: 'Comparison divider',
        ledgerLabel: 'Design adjustments and decision rationale',
        rows: [
            { k: 'Density', before: 'All content sits on one page, with summaries, original text, and sources expanded at once; it is hard to scan quickly.', after: 'A dense list supports quick scanning, while the detail page expands the full content; more signals can be compared on the same screen.' },
            { k: 'Scan order', before: 'Headlines draw attention first, but dates, categories, and sources have no fixed position, so judging credibility requires extra searching.', after: 'Dates, categories, and confidence information retain a fixed hierarchy, so users can judge freshness and relevance before reading the summary.' },
            { k: 'Trust signals', before: 'After repeated copying and rearranging, source links can become separated from summaries, making verification more costly.', after: 'Every intelligence item retains its source link, original-text excerpt, and category information, so key claims can be checked directly.' },
            { k: 'Bilingual', before: 'Traditional Chinese summaries and English originals are mixed together, interrupting reading rhythm and making comparison difficult.', after: 'Traditional Chinese summaries and English originals are layered separately, so users can switch or compare them as needed.' },
        ],
        beforeReport: {
            title: 'Daily tech report — 2025/01/15',
            items: [
                'AI chip market booming — NVIDIA still leads, 全球AI晶片市場…',
                'TSMC CoWoS packaging key to AI chip volume 台積電…',
                'AMD / Intel / Google 自研晶片 to reduce NVIDIA reliance',
                '#AI #半導體 (tags typed by hand)',
            ],
        },
        afterReport: {
            brand: 'Strategy Intelligence Platform',
            section: '/insights · Insights',
            reportTitle: '全球半導體產業AI晶片市場趨勢分析',
            date: '發布日期 2025-01-15', cat: 'Semiconductor',
            tags: ['AI', '半導體', '晶片設計', '市場趨勢'],
            summaryLabel: '重點摘要',
            summary: '2024年全球AI晶片市場規模達530億美元，預計2028年突破1,200億美元，年複合成長率23.6%。',
        },
        soWhat: 'Review the interface differences and design rationale before and after the redesign',
    },
    zh: {
        title: '從 Notion 日報到可查詢介面',
        lead: '左側重現早期以 Notion 發布的每日報告，右側則是改版後實際上線的 /insights 介面。兩個版本皆以 DOM 元件重建，而不是靜態截圖，因此可以直接拖曳分隔線，或使用按鍵感受內容組成與閱讀方式的差異。這次改版的重點不是增加視覺元件，而是重新安排資訊密度、掃描順序、來源證據與雙語內容，讓分析師能更快判斷哪些訊號值得進一步閱讀。',
        beforeBtn: 'Before', afterBtn: 'After',
        beforeTag: 'Notion 報告時期', afterTag: '已上線平台',
        divider: '對照分隔線',
        ledgerLabel: '設計調整與判斷依據',
        rows: [
            { k: '密度', before: '所有內容集中在一頁，摘要、原文與來源同時展開，難以快速掃描。', after: '以密集清單支援快速掃描，再於詳情頁展開完整內容，同一畫面能比較更多訊號。' },
            { k: '掃描順序', before: '標題最先吸引注意，但日期、分類與來源位置不固定，判斷可信度需要額外搜尋。', after: '日期、分類與信心資訊維持固定層級，讓使用者在閱讀摘要前先判斷內容的新鮮度與相關性。' },
            { k: '信任訊號', before: '內容經過多次複製與重排後，來源連結容易與摘要分離，回查成本較高。', after: '每則情報都保留來源連結、原文片段與分類資訊，讓關鍵敘述可以直接回查。' },
            { k: '雙語', before: '繁中摘要與英文原文混排，閱讀節奏不一致，也不容易快速對照。', after: '繁中摘要與英文原文分層呈現，使用者可依閱讀需求切換或對照。' },
        ],
        beforeReport: {
            title: '每日科技報告 — 2025/01/15',
            items: [
                'AI 晶片市場火熱 — NVIDIA 仍領先，全球AI晶片市場…',
                'TSMC CoWoS 封裝是 AI 晶片量產關鍵 台積電…',
                'AMD / Intel / Google 自研晶片以降低對 NVIDIA 依賴',
                '#AI #半導體（手打標籤）',
            ],
        },
        afterReport: {
            brand: 'Strategy Intelligence Platform',
            section: '/insights · Insights',
            reportTitle: '全球半導體產業AI晶片市場趨勢分析',
            date: '發布日期 2025-01-15', cat: 'Semiconductor',
            tags: ['AI', '半導體', '晶片設計', '市場趨勢'],
            summaryLabel: '重點摘要',
            summary: '2024年全球AI晶片市場規模達530億美元，預計2028年突破1,200億美元，年複合成長率23.6%。',
        },
        soWhat: '查看改版前後的介面差異與設計依據',
    },
};

function BeforePanel({ r }) {
    return (
        <div className="ni-m10-notion">
            <div className="ni-m10-notion-title">{r.title}</div>
            <ul>{r.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
        </div>
    );
}
function AfterPanel({ r }) {
    return (
        <div className="ni-m10-plat">
            <div className="ni-m10-plat-top">
                <span className="ni-m10-plat-logo">ITRI</span>
                <span className="ni-m10-plat-brand">{r.brand}</span>
            </div>
            <div className="ni-m10-plat-section">{r.section}</div>
            <div className="ni-m10-plat-card">
                <div className="ni-m10-plat-h">{r.reportTitle}</div>
                <div className="ni-m10-plat-meta"><span>{r.date}</span><span className="ni-m10-plat-cat">{r.cat}</span></div>
                <div className="ni-m10-plat-tags">{r.tags.map(tg => <span key={tg}>{tg}</span>)}</div>
                <div className="ni-m10-plat-sumlabel">{r.summaryLabel}</div>
                <p className="ni-m10-plat-sum">{r.summary}</p>
            </div>
        </div>
    );
}

export default function M10_HiFiComparator() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [pos, setPos] = useState(52);
    const boxRef = useRef(null);
    const drag = useRef(false);

    const setFromClientX = useCallback(cx => {
        const box = boxRef.current;
        if (!box) return;
        const rect = box.getBoundingClientRect();
        setPos(Math.max(0, Math.min(100, ((cx - rect.left) / rect.width) * 100)));
    }, []);
    const onKey = e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); setPos(p => Math.max(0, p - 5)); }
        if (e.key === 'ArrowRight') { e.preventDefault(); setPos(p => Math.min(100, p + 5)); }
        if (e.key === 'Home') { e.preventDefault(); setPos(0); }
        if (e.key === 'End') { e.preventDefault(); setPos(100); }
    };

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m10-controls">
                <button className="ni-btn" onClick={() => setPos(100)}>{t.beforeBtn}</button>
                <button className="ni-btn" onClick={() => setPos(0)}>{t.afterBtn}</button>
            </div>
            <div className="ni-m10-box" ref={boxRef}
                onPointerMove={e => { if (drag.current) setFromClientX(e.clientX); }}
                onPointerUp={() => (drag.current = false)}
                onPointerLeave={() => (drag.current = false)}>
                <div className="ni-m10-layer ni-m10-before"><span className="ni-m10-pt ni-m10-pt--before">{t.beforeTag}</span><BeforePanel r={t.beforeReport} /></div>
                <div className="ni-m10-layer ni-m10-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}><span className="ni-m10-pt ni-m10-pt--after">{t.afterTag}</span><AfterPanel r={t.afterReport} /></div>
                <div className="ni-m10-divider" style={{ left: `${pos}%` }}
                    role="slider" aria-label={t.divider} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} tabIndex={0}
                    onKeyDown={onKey}
                    onPointerDown={e => { drag.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); }}>
                    <span className="ni-m10-handle" aria-hidden="true">⟺</span>
                </div>
            </div>

            <table className="ni-m10-ledger">
                <caption className="ni-caption ni-m10-ledger-cap">{t.ledgerLabel}</caption>
                <thead><tr><th scope="col"></th><th scope="col">{t.beforeTag}</th><th scope="col">{t.afterTag}</th></tr></thead>
                <tbody>
                    {t.rows.map(row => (
                        <tr key={row.k}>
                            <th scope="row">{row.k}</th>
                            <td className="ni-m10-cell--before">{row.before}</td>
                            <td className="ni-m10-cell--after">{row.after}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ModuleFrame>
    );
}

injectStyles('ni-m10', `
.ni-m10-controls { display: flex; gap: 8px; margin-bottom: 12px; }
.ni-m10-box { position: relative; height: 300px; border: 1px solid var(--ni-line-2); border-radius: var(--ni-r-md); overflow: hidden; touch-action: none; user-select: none; }
.ni-m10-layer { position: absolute; inset: 0; overflow: hidden; }
.ni-m10-pt { position: absolute; top: 10px; z-index: 3; font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.08em; padding: 3px 8px; border-radius: 3px; }
.ni-m10-pt--before { left: 10px; color: #7a7160; background: #efeadd; }
.ni-m10-pt--after { right: 10px; color: #fff; background: #2f9be0; }

/* before: notion doc */
.ni-m10-notion { height: 100%; background: #fbfaf7; color: #37352f; padding: 40px 26px 20px; overflow: hidden; font-family: 'Inter', sans-serif; }
.ni-m10-notion-title { font-size: 20px; font-weight: 700; margin-bottom: 14px; }
.ni-m10-notion ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 9px; }
.ni-m10-notion li { font-size: 13px; line-height: 1.5; color: #4b4941; }

/* after: shipped platform (light) */
.ni-m10-plat { height: 100%; background: #f4f7fb; overflow: hidden; font-family: 'Inter', 'Noto Sans TC', sans-serif; }
.ni-m10-plat-top { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e6ebf2; }
.ni-m10-plat-logo { font-family: var(--ni-font-data); font-size: 11px; font-weight: 700; color: #fff; background: #f26a4b; border-radius: 5px; padding: 3px 6px; }
.ni-m10-plat-brand { font-size: 14px; font-weight: 700; color: #1f2a37; }
.ni-m10-plat-section { padding: 12px 16px 8px; font-size: 12px; font-weight: 600; color: #2f9be0; }
.ni-m10-plat-card { margin: 4px 16px 16px; background: #fff; border: 1px solid #e6ebf2; border-radius: 10px; padding: 16px; }
.ni-m10-plat-h { font-size: 16px; font-weight: 700; color: #1f2a37; margin-bottom: 8px; }
.ni-m10-plat-meta { display: flex; gap: 12px; align-items: center; font-size: 11px; color: #77828f; margin-bottom: 10px; }
.ni-m10-plat-cat { color: #2f9be0; }
.ni-m10-plat-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.ni-m10-plat-tags span { font-size: 11px; color: #55606d; background: #eef2f7; border-radius: 4px; padding: 2px 8px; }
.ni-m10-plat-sumlabel { font-size: 12px; font-weight: 600; color: #1f2a37; margin-bottom: 6px; }
.ni-m10-plat-sum { margin: 0; font-size: 12px; line-height: 1.7; color: #4b5563; }

.ni-m10-divider { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--ni-teal); transform: translateX(-1px); z-index: 4; cursor: ew-resize; }
.ni-m10-handle { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--ni-bg-0); background: var(--ni-teal); border-radius: 50%; box-shadow: 0 0 0 4px rgba(53,194,176,0.28); }
.ni-m10-divider:focus-visible { outline: none; }
.ni-m10-divider:focus-visible .ni-m10-handle { box-shadow: 0 0 0 3px var(--ni-bg-0), 0 0 0 5px var(--ni-teal); }

.ni-m10-ledger { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
.ni-m10-ledger-cap { text-align: left; margin-bottom: 10px; caption-side: top; }
.ni-m10-ledger th, .ni-m10-ledger td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--ni-line-1); vertical-align: top; }
.ni-m10-ledger thead th { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ni-text-3); }
.ni-m10-ledger tbody th { font-family: var(--ni-font-data); font-weight: 400; color: var(--ni-teal); font-size: 12px; width: 108px; }
.ni-m10-cell--before { color: var(--ni-text-3); }
.ni-m10-cell--after { color: var(--ni-text-1); }
@media (max-width: 640px) { .ni-m10-box { height: 340px; } }
`);
