import React, { useCallback, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M10');

const COPY = {
    en: {
        title: 'Hi-fi redesign comparator',
        lead: 'Left is the Notion report era; right is the shipped platform’s /insights page. Both are rebuilt as DOM, not screenshots — drag the divider, or use the buttons and arrow keys.',
        beforeBtn: 'Before', afterBtn: 'After',
        beforeTag: 'Notion report era', afterTag: 'Shipped platform',
        divider: 'Comparison divider',
        ledgerLabel: 'What changed and why',
        rows: [
            { k: 'Density', before: 'One long page, everything inline', after: 'Filtered list + focused detail — more items per screen' },
            { k: 'Scan order', before: 'Headline first, provenance buried', after: 'Confidence + date + tag before the headline' },
            { k: 'Trust signals', before: 'Source link sometimes lost in copy-paste', after: 'Source span + category shown on every item' },
            { k: 'Bilingual', before: 'EN and ZH mixed in the same paragraph', after: 'Parallel zh-TW / EN, switchable' },
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
        soWhat: 'The redesign is measurable in scan order and density.',
    },
    zh: {
        title: '高保真改版對照',
        lead: '左邊是 Notion 報告時期，右邊是已上線平台的 /insights 頁。兩邊都是用 DOM 重建的，不是截圖——拖動分隔線，或用按鈕和方向鍵。',
        beforeBtn: 'Before', afterBtn: 'After',
        beforeTag: 'Notion 報告時期', afterTag: '已上線平台',
        divider: '對照分隔線',
        ledgerLabel: '改了什麼、為什麼',
        rows: [
            { k: '密度', before: '一頁長文，全部就地展開', after: '篩選清單 + 聚焦詳情——每頁更多項目' },
            { k: '掃描順序', before: '標題優先，出處被埋沒', after: '信心 + 日期 + 標籤放在標題之前' },
            { k: '信任訊號', before: '來源連結常在複製貼上中遺失', after: '每則都顯示來源片段 + 類別' },
            { k: '雙語', before: '中英混在同一段', after: '繁中／英文並排，可切換' },
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
        soWhat: '改版的成效可用掃描順序與密度衡量。',
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
