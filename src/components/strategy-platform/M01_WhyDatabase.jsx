import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/ispKit.jsx';
import { MODULES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M01');

const COPY = {
    en: {
        title: 'Why another company database is still needed',
        lead: 'Crunchbase can tell you whether a company exists, but it has a harder time answering questions closer to investment and strategic decisions: Is the moat real? Has the current valuation already priced in its growth expectations? Is this company worth continued tracking, or should it be set aside for now? I built this system to close the gap between finding data and forming a judgment.',
        body: [
            'While using company databases in practice, I repeatedly encountered the same break: funding records, company descriptions, and lists of similar companies are only the starting point of research.',
            'The time-consuming work is returning to public documents and first-hand signals, cross-checking business model, technical barriers, and market position, then forming a judgment that can be challenged and updated as new evidence appears.',
            'This product therefore does not aim to collect the most companies. It aims to make each company record sufficient to support the next decision. Alongside basic facts, every profile includes six analytical field groups: moat durability, business model, primary risks, funding signals, tracking status, and the analyst\'s basis for judgment.',
            'At 201 companies, the database is far smaller than large commercial directories. That is a deliberate trade-off: I optimize for research depth, source traceability, and judgment quality rather than coverage.',
            'This page explains the product hypothesis. The following modules show the methods and evidence that support it: the data schema (M02), the curation process that keeps research consistent and traceable at scale (M03), and the AI support layer that prevents deep research from becoming a capacity bottleneck (M06–M08).',
        ],
        compareTitle: 'Coverage scale and judgment depth: a deliberate product trade-off',
        compareCols: ['', 'General company directory', 'This strategy intelligence system'],
        compareRows: [
            { label: 'Coverage scale', a: 'Millions of companies, mainly from self-reported submissions, partner data, and automated collection', b: '201 companies, manually curated and strengthened record by record' },
            { label: 'Per-record depth', a: 'Basic company facts, fundraising records, and market tags', b: 'Six analytical field groups covering moat, business model, funding, risk, and the basis for judgment' },
            { label: 'Research perspective', a: 'Primarily fact lookup; does not directly offer a judgment', b: 'Explicitly marks track, watch, or pass, and retains the reasoning' },
            { label: 'Update model', a: 'Continuous ingestion, prioritising scale and freshness', b: 'Updated in research batches; each record retains sources, dates, and a revision trail' },
            { label: 'Best for', a: 'Broad company discovery and fast fact checking', b: 'Deciding whether a company merits more research time' },
        ],
        soWhat: 'A company directory helps you find a company; an analysis system helps you decide whether the next research hour is worth spending on it.',
    },
    zh: {
        title: '為什麼還需要一座公司資料庫',
        lead: 'Crunchbase 能告訴你一家公司是否存在，卻很難回答更接近投資與策略決策的問題：它的護城河是否成立？目前估值是否已經透支成長預期？這家公司值得持續追蹤，還是應該暫時放下？我建立這套系統，就是為了補上從「查到資料」到「形成判斷」之間的落差。',
        body: [
            '在實際使用公司資料庫的過程中，我反覆遇到同一個斷點：募資紀錄、公司描述與相似企業名單，都只是研究的起點。',
            '真正耗時的工作，是回到公開文件與一手訊號，交叉檢查商業模式、技術壁壘與市場位置，最後形成一個能被質疑，也能隨新證據更新的判斷。',
            '因此，這個產品追求的不是收錄最多公司，而是讓每一筆公司資料都足以支撐下一步決策。每份公司檔案除了基本事實，也包含六組分析欄位：護城河耐久度、商業模式、主要風險、資金訊號、追蹤狀態，以及分析師的判斷依據。',
            '201 家的規模遠小於大型商業資料庫，但這是刻意的取捨：我優先最佳化研究深度、來源可追溯性與判斷品質，而不是覆蓋率。',
            '這一頁先說明產品假設；後續模組則展示支撐它的具體方法與證據：資料 schema（M02）、讓研究在規模化後仍保持一致與可追溯的策展流程（M03），以及避免深度研究成為產能瓶頸的 AI 輔助層（M06–M08）。',
        ],
        compareTitle: '覆蓋規模與判斷深度：刻意選擇的產品取捨',
        compareCols: ['', '一般公司資料目錄', '本策略情報系統'],
        compareRows: [
            { label: '收錄規模', a: '數百萬家公司，主要來自自報、合作資料與自動抓取', b: '201 家公司，經人工策展與逐筆補強' },
            { label: '單筆深度', a: '公司基本資料、募資紀錄與市場標籤', b: '六組分析欄位，涵蓋護城河、商業模式、資金、風險與判斷依據' },
            { label: '研究觀點', a: '以事實查詢為主，不直接提供判斷', b: '明確標示追蹤、觀察或放下，並保留判斷理由' },
            { label: '更新方式', a: '持續匯入，偏重規模與即時性', b: '依研究批次更新，每筆保留來源、日期與修訂軌跡' },
            { label: '最適合', a: '廣泛搜尋公司與快速查證基本事實', b: '判斷某家公司是否值得投入更多研究時間' },
        ],
        soWhat: '公司目錄幫你找到一家公司；分析系統幫你判斷，下一個研究小時是否值得花在它身上。',
    },
};

export default function M01_WhyDatabase() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            {t.body.map((p, i) => <p className="isp-m1-p" key={i}>{p}</p>)}
            <div className="isp-m1-compare">
                <span className="isp-caption isp-m1-compare-title">{t.compareTitle}</span>
                <div className="isp-m1-scroll">
                    <table className="isp-m1-table">
                        <thead>
                            <tr>{t.compareCols.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr>
                        </thead>
                        <tbody>
                            {t.compareRows.map(r => (
                                <tr key={r.label}>
                                    <th scope="row">{r.label}</th>
                                    <td className="isp-m1-a">{r.a}</td>
                                    <td className="isp-m1-b">{r.b}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m1-style', `
.isp-m1-p { margin: 0 0 14px; font-size: 15px; line-height: 1.75; color: var(--isp-text-2); max-width: 780px; }
.isp-m1-p:last-of-type { margin-bottom: 0; }
.isp-m1-compare { margin-top: 24px; }
.isp-m1-compare-title { display: block; margin-bottom: 10px; }
.isp-m1-scroll { overflow-x: auto; }
.isp-m1-table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 520px; }
.isp-m1-table th, .isp-m1-table td { text-align: left; padding: 11px 14px; border-bottom: 1px solid var(--isp-line-1); vertical-align: top; }
.isp-m1-table thead th { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.09em; text-transform: uppercase; color: var(--isp-text-3); border-bottom: 1px solid var(--isp-line-2); }
.isp-m1-table tbody th { font-weight: 500; color: var(--isp-text-1); white-space: nowrap; }
.isp-m1-a { color: var(--isp-text-3); }
.isp-m1-b { color: var(--isp-text-1); }
.isp-m1-b::before { content: '→ '; color: var(--isp-teal); }
`);
