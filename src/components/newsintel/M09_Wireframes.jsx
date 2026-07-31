import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, onActivate } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M09');

// Grayscale sketch primitives (sketch-weight strokes on the dark surface).
const G = { fill: 'none', stroke: '#5a616e', strokeWidth: 1.4, strokeLinecap: 'round' };
const Callout = ({ x, y, c }) => (
    <g>
        <circle cx={x} cy={y} r="6" fill="#14171D" stroke="#35C2B0" strokeWidth="1.2" />
        <text x={x} y={y + 3.2} textAnchor="middle" fontSize="7" fill="#35C2B0" fontFamily="JetBrains Mono, monospace">{c}</text>
    </g>
);

const PLATES = [
    {
        id: 'home', title: { en: 'Product home and feature entry', zh: '產品首頁與功能入口' },
        svg: (
            <>
                <rect x="8" y="8" width="184" height="16" {...G} />
                <rect x="8" y="30" width="42" height="26" {...G} /><rect x="55" y="30" width="42" height="26" {...G} />
                <rect x="102" y="30" width="42" height="26" {...G} /><rect x="149" y="30" width="43" height="26" {...G} />
                <rect x="8" y="62" width="184" height="50" {...G} />
                <line x1="55" y1="62" x2="55" y2="112" {...G} /><line x1="102" y1="62" x2="102" y2="112" {...G} /><line x1="149" y1="62" x2="149" y2="112" {...G} />
                <line x1="8" y1="87" x2="192" y2="87" {...G} />
                <Callout x={16} y={16} c="A" /><Callout x={16} y={43} c="B" /><Callout x={16} y={70} c="C" />
            </>
        ),
        callouts: {
            en: [['A', 'Header + section nav — six working desks, always visible'], ['B', 'KPI row first — at-a-glance metrics before any list'], ['C', 'Domain mix as a filled grid — proportion read without a legend']],
            zh: [['A', '頁首 + 區塊導覽——六個工作檯，始終可見'], ['B', 'KPI 列優先——先給一眼看懂的指標，再給清單'], ['C', '領域分布以填色格呈現——不用圖例也能讀出比例']],
        },
    },
    {
        id: 'feed', title: { en: 'Intelligence list | Dense list', zh: '情報列表｜密集清單' }, shipped: true,
        svg: (
            <>
                <rect x="8" y="8" width="30" height="12" {...G} /><rect x="42" y="8" width="30" height="12" {...G} /><rect x="76" y="8" width="30" height="12" {...G} />
                {[30, 52, 74, 96].map(y => <g key={y}><line x1="8" y1={y} x2="14" y2={y} stroke="#35C2B0" strokeWidth="2" /><rect x="20" y={y - 6} width="120" height="5" {...G} /><rect x="20" y={y + 1} width="80" height="4" {...G} /><rect x="160" y={y - 5} width="32" height="10" {...G} /></g>)}
                <Callout x={11} y={30} c="A" /><Callout x={176} y={24} c="B" />
            </>
        ),
        callouts: {
            en: [['A', 'Confidence tick before the headline — analysts triage by trust first'], ['B', 'Tag + date right-aligned — scannable metadata column']],
            zh: [['A', '信心標記放在標題之前——分析師先以信任分流'], ['B', '標籤 + 日期右對齊——可掃描的中繼資料欄']],
        },
    },
    {
        id: 'feed-grid', title: { en: 'Intelligence list | Card grid', zh: '情報列表｜卡片網格' }, reject: true,
        reason: { en: 'Card grid rejected: scanning speed loses to a dense list when items are read daily.', zh: '卡片網格被否決：每日閱讀時，掃描速度輸給密集清單。' },
        svg: (
            <>
                {[0, 1, 2].map(c => [0, 1].map(r => <rect key={`${c}${r}`} x={12 + c * 62} y={14 + r * 50} width="52" height="42" {...G} />))}
                <Callout x={38} y={35} c="A" />
            </>
        ),
        callouts: { en: [['A', 'Big cards look nice, but halve the items per screen — fails the morning scan']], zh: [['A', '大卡片好看，卻讓每頁項目減半——過不了早晨掃描']] },
    },
    {
        id: 'detail', title: { en: 'Intelligence detail | Standalone page', zh: '情報詳情｜獨立頁面' }, shipped: true,
        svg: (
            <>
                <rect x="20" y="10" width="130" height="9" {...G} />
                <rect x="20" y="24" width="60" height="5" {...G} />
                <rect x="20" y="34" width="20" height="8" {...G} /><rect x="44" y="34" width="20" height="8" {...G} /><rect x="68" y="34" width="20" height="8" {...G} />
                <rect x="20" y="50" width="160" height="1.5" {...G} />
                <rect x="20" y="58" width="160" height="4" {...G} /><rect x="20" y="66" width="160" height="4" {...G} /><rect x="20" y="74" width="120" height="4" {...G} />
                <rect x="20" y="88" width="160" height="20" {...G} />
                <Callout x={28} y={38} c="A" /><Callout x={28} y={98} c="B" />
            </>
        ),
        callouts: {
            en: [['A', 'Tags + source span up top — provenance before prose'], ['B', 'Charts embedded in the body — the strategy take is inline, not a tab']],
            zh: [['A', '標籤 + 來源片段置頂——先給出處，再給內文'], ['B', '圖表嵌在內文——策略觀點就地呈現，不另開分頁']],
        },
    },
    {
        id: 'detail-modal', title: { en: 'Intelligence detail | Pop-up window', zh: '情報詳情｜彈出視窗' }, reject: true,
        reason: { en: 'Modal rejected: breaks deep-linking and print/PDF export — reports get shared as links.', zh: '彈窗被否決：破壞深連結與列印／PDF 匯出——報告會以連結分享。' },
        svg: (
            <>
                <rect x="8" y="8" width="184" height="104" fill="#0c0e12" stroke="#333a47" strokeWidth="1.2" />
                <rect x="40" y="26" width="120" height="68" {...G} fill="#14171D" />
                <rect x="48" y="34" width="70" height="6" {...G} /><rect x="48" y="46" width="104" height="4" {...G} /><rect x="48" y="54" width="104" height="4" {...G} />
                <line x1="146" y1="30" x2="154" y2="38" stroke="#e5675a" strokeWidth="1.4" /><line x1="154" y1="30" x2="146" y2="38" stroke="#e5675a" strokeWidth="1.4" />
                <Callout x={48} y={92} c="A" />
            </>
        ),
        callouts: { en: [['A', 'Overlay traps the report — no URL to cite, no clean print']], zh: [['A', '覆蓋層把報告困住——沒有可引用的網址，也難乾淨列印']] },
    },
    {
        id: 'filter', title: { en: 'Industry filters and search sidebar', zh: '產業篩選與查詢側欄' },
        svg: (
            <>
                <rect x="8" y="8" width="46" height="104" {...G} />
                {[20, 34, 48, 62, 76].map(y => <g key={y}><rect x="14" y={y} width="8" height="8" {...G} /><rect x="26" y={y + 1} width="22" height="5" {...G} /></g>)}
                <rect x="62" y="8" width="130" height="104" {...G} />
                <Callout x={18} y={24} c="A" />
            </>
        ),
        callouts: { en: [['A', 'Industry filter mirrors the taxonomy from M6 — one model, two surfaces']], zh: [['A', '產業篩選對映 M6 的分類法——同一套模型，兩個介面']] },
    },
    {
        id: 'empty', title: { en: 'Search and filter empty state', zh: '搜尋與篩選空狀態' },
        svg: (
            <>
                <rect x="8" y="8" width="184" height="16" {...G} />
                <circle cx="100" cy="58" r="16" {...G} /><line x1="90" y1="58" x2="110" y2="58" {...G} />
                <rect x="66" y="82" width="68" height="5" {...G} /><rect x="78" y="92" width="44" height="4" {...G} />
                <Callout x={100} y={40} c="A" />
            </>
        ),
        callouts: { en: [['A', 'Empty ≠ broken — states why it is empty and what to do next']], zh: [['A', '空 ≠ 壞——說明為何為空，以及下一步該做什麼']] },
    },
    {
        id: 'error', title: { en: 'Data-loading error state', zh: '資料載入錯誤狀態' },
        svg: (
            <>
                <rect x="8" y="8" width="184" height="16" {...G} />
                <path d="M100 42 L118 74 H82 Z" fill="none" stroke="#e5675a" strokeWidth="1.6" /><line x1="100" y1="54" x2="100" y2="64" stroke="#e5675a" strokeWidth="1.6" />
                <rect x="70" y="84" width="60" height="10" {...G} />
                <Callout x={100} y={92} c="A" />
            </>
        ),
        callouts: { en: [['A', 'A specific failure + a retry — the source layout changed, not "something went wrong"']], zh: [['A', '具體失敗 + 重試——是來源版面改了，而非「發生了一些錯誤」']] },
    },
];

const COPY = {
    en: {
        title: 'Lo-fi wireframes and layout trade-offs',
        lead: 'These lo-fi wireframes compare content density, browsing patterns, and page hierarchy—not visual style. Of the eight layouts, two were removed after evaluation. Select any wireframe to see the questions discussed at the time, the reasons for adoption, and the basis for rejection, and understand how the final interface converged from different options.',
        open: 'Open plate', rejected: 'REJECTED', shipped: 'SHIPPED',
        soWhat: 'Review the eight wireframe options and the reasons they were adopted',
        close: 'Close',
    },
    zh: {
        title: '低保真線框圖與版型取捨',
        lead: '這組低保真線框用來比較內容密度、瀏覽方式與頁面層級，而不是提前決定視覺風格。八個版型中，有兩個方案在評估後被排除。選取任一線框，可查看當時討論的問題、採用理由與否決依據，理解最終介面如何從不同方案中收斂。',
        open: '打開', rejected: 'REJECTED', shipped: 'SHIPPED',
        soWhat: '查看八個線框方案與採用理由',
        close: '關閉',
    },
};

function Lightbox({ plate, lang, t, onClose }) {
    const ref = useRef(null);
    const closeRef = useRef(null);
    useEffect(() => {
        const opener = document.activeElement;
        closeRef.current?.focus();
        const onKey = e => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab') {
                const f = ref.current.querySelectorAll('button, [href], [tabindex="0"]');
                if (!f.length) return;
                const first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            if (opener instanceof HTMLElement) opener.focus();
        };
    }, [onClose]);
    return (
        <div className="ni-m9-backdrop" onClick={onClose}>
            <div className="ni ni-m9-dialog" role="dialog" aria-modal="true" aria-label={plate.title[lang]} ref={ref} onClick={e => e.stopPropagation()}>
                <div className="ni-m9-dialog-head">
                    <span className="ni-m9-dialog-title">{plate.title[lang]}</span>
                    {plate.reject && <span className="ni-tag ni-tag--red">{t.rejected}</span>}
                    {plate.shipped && <span className="ni-tag ni-tag--teal">{t.shipped}</span>}
                    <button className="ni-btn ni-m9-close" ref={closeRef} onClick={onClose}>{t.close} ✕</button>
                </div>
                <svg className="ni-m9-dialog-svg" viewBox="0 0 200 120" role="img" aria-label={plate.title[lang]}>{plate.svg}</svg>
                {plate.reject && <p className="ni-m9-reason">{plate.reason[lang]}</p>}
                <ul className="ni-m9-callouts">
                    {plate.callouts[lang].map(([c, txt]) => (
                        <li key={c}><span className="ni-m9-callout-c">{c}</span>{txt}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function M09_Wireframes() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [open, setOpen] = useState(null);
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m9-grid">
                {PLATES.map(p => (
                    <button key={p.id} className={`ni-m9-plate${p.reject ? ' is-reject' : ''}`} onClick={() => setOpen(p)} onKeyDown={onActivate(() => setOpen(p))}>
                        <span className="ni-m9-plate-thumb">
                            <svg viewBox="0 0 200 120" aria-hidden="true">{p.svg}</svg>
                            {p.reject && <span className="ni-m9-strike" aria-hidden="true" />}
                        </span>
                        <span className="ni-m9-plate-foot">
                            <span className="ni-m9-plate-title">{p.title[lang]}</span>
                            {p.reject && <span className="ni-tag ni-tag--red">{t.rejected}</span>}
                            {p.shipped && <span className="ni-tag ni-tag--teal">{t.shipped}</span>}
                        </span>
                    </button>
                ))}
            </div>
            {open && <Lightbox plate={open} lang={lang} t={t} onClose={() => setOpen(null)} />}
        </ModuleFrame>
    );
}

injectStyles('ni-m9', `
.ni-m9-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.ni-m9-plate { display: flex; flex-direction: column; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); overflow: hidden; background: var(--ni-bg-2); transition: border-color 160ms var(--ni-ease), transform 160ms var(--ni-ease); }
.ni-m9-plate:hover { border-color: var(--ni-teal); transform: translateY(-2px); }
.ni-m9-plate.is-reject:hover { border-color: var(--ni-red); }
.ni-m9-plate-thumb { position: relative; display: block; background: var(--ni-bg-1); border-bottom: 1px solid var(--ni-line-1); }
.ni-m9-plate-thumb svg { display: block; width: 100%; height: auto; }
.ni-m9-strike { position: absolute; inset: 0; background: repeating-linear-gradient(-45deg, transparent 0 8px, rgba(229,103,90,0.14) 8px 9px); }
.ni-m9-plate-foot { display: flex; align-items: center; gap: 6px; padding: 9px 10px; flex-wrap: wrap; }
.ni-m9-plate-title { font-size: 12px; color: var(--ni-text-1); text-align: left; }
.ni-m9-backdrop { position: fixed; inset: 0; z-index: 60; background: rgba(4,5,7,0.78); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(3px); }
.ni-m9-dialog { width: min(560px, 100%); background: var(--ni-bg-1); border: 1px solid var(--ni-line-2); border-radius: var(--ni-r-lg); padding: 20px; max-height: 90vh; overflow-y: auto; }
.ni-m9-dialog-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
.ni-m9-dialog-title { font-family: var(--ni-font-display); font-size: 19px; color: var(--ni-text-1); }
.ni-m9-close { margin-left: auto; font-size: 12px; padding: 6px 12px; }
.ni-m9-dialog-svg { width: 100%; height: auto; background: var(--ni-bg-0); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m9-reason { margin: 14px 0 0; padding: 10px 12px; font-size: 13px; line-height: 1.5; color: var(--ni-text-1); background: var(--ni-red-dim); border: 1px solid var(--ni-red); border-radius: var(--ni-r-sm); }
.ni-m9-callouts { list-style: none; margin: 14px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.ni-m9-callouts li { display: flex; gap: 10px; align-items: baseline; font-size: 13px; line-height: 1.55; color: var(--ni-text-2); }
.ni-m9-callout-c { flex: 0 0 auto; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-family: var(--ni-font-data); font-size: 10px; color: var(--ni-teal); border: 1px solid var(--ni-teal); border-radius: 50%; }
@media (max-width: 900px) { .ni-m9-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 460px) { .ni-m9-grid { grid-template-columns: 1fr; } }
`);
