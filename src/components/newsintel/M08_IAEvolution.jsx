import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M08');

const COPY = {
    en: {
        title: 'From daily reports to an intelligence platform | Information architecture evolution',
        lead: 'The product information architecture went through three versions: from a one-page Notion daily report, to a filterable single-page dashboard, and finally to product paths split by clear tasks. v3 is not a conceptual diagram; it is the navigation structure used by the live platform. Each adjustment addressed a specific question: whether content can be found, whether different tasks interfere with one another, and whether users can build a reading habit along a stable path.',
        versions: [
            {
                v: 'v1', era: 'One-page Notion daily report',
                tree: [
                    { d: 0, label: 'All intelligence gathered on one page' },
                    { d: 1, label: 'Manual tagging and sorting' },
                    { d: 1, label: 'English and Chinese content interleaved' },
                    { d: 1, label: 'Fast to publish, but hard to review and compare' },
                ],
            },
            {
                v: 'v2', era: 'Filterable single-page dashboard',
                tree: [
                    { d: 0, label: 'A feed displaying all content' },
                    { d: 1, label: 'Tag filters and search' },
                    { d: 1, label: 'Improved findability' },
                    { d: 1, label: 'Daily intelligence and company lookup still share one reading context' },
                ],
            },
            {
                v: 'v3', era: 'Live platform split by user task', shipped: true,
                tree: [
                    { d: 0, label: '/ | Product entry and feature navigation' },
                    { d: 1, label: '/insights | Daily industry intelligence', hot: true },
                    { d: 1, label: '/startups | Deep-tech company directory' },
                ],
            },
        ],
        notes: [
            'v1 → v2 | From a fixed document to a queryable interface. A Notion page is quick to publish, but poor for filtering by sector, looking back across days, or comparing signals. In a dashboard, content can be searched, sorted, and recombined.',
            'v2 → v3 | Split information paths by usage frequency. Daily intelligence and company data are used at different rhythms: the former needs regular reading, while the latter is mostly task-based lookup. v3 therefore makes them separate paths instead of keeping them on one page.',
        ],
        hotNote: '/insights is the formal publishing entry point for the daily news pipeline.',
        soWhat: 'Review the navigation changes and trade-offs across the three versions',
    },
    zh: {
        title: '從每日報告到情報平台｜資訊架構演進',
        lead: '產品的資訊架構經歷三個版本：從一頁式 Notion 日報，到可篩選的單頁儀表板，最後拆分為具有明確任務的產品路徑。v3 並不是概念示意，而是線上平台實際使用的導覽結構。每一次調整都對應一個具體問題：內容能否查找、不同任務是否互相干擾，以及使用者能否在固定路徑中建立閱讀習慣。',
        versions: [
            {
                v: 'v1', era: '一頁式 Notion 日報',
                tree: [
                    { d: 0, label: '所有情報集中在單一頁面' },
                    { d: 1, label: '手動標記與排序' },
                    { d: 1, label: '中英文內容交錯排列' },
                    { d: 1, label: '適合快速發布，但不利於回查與比較' },
                ],
            },
            {
                v: 'v2', era: '可篩選的單頁儀表板',
                tree: [
                    { d: 0, label: '以 Feed 顯示所有內容' },
                    { d: 1, label: '支援標籤篩選與搜尋' },
                    { d: 1, label: '改善查找效率' },
                    { d: 1, label: '但每日情報與企業查詢仍共用同一個閱讀脈絡' },
                ],
            },
            {
                v: 'v3', era: '依使用任務拆分的線上平台', shipped: true,
                tree: [
                    { d: 0, label: '/｜產品入口與功能導覽' },
                    { d: 1, label: '/insights｜每日產業情報', hot: true },
                    { d: 1, label: '/startups｜深科技企業目錄' },
                ],
            },
        ],
        notes: [
            'v1 → v2｜從固定文件改為可查詢介面。Notion 頁適合快速發布，卻不利於依產業篩選、跨日回查或比較訊號。改為儀表板後，內容可以被搜尋、排序與重新組合。',
            'v2 → v3｜依使用頻率拆分資訊路徑。每日情報與企業資料的使用節奏不同：前者需要固定閱讀，後者多半是任務式查詢。因此 v3 將兩者拆成獨立路徑，而不是繼續塞在同一頁中。',
        ],
        hotNote: '/insights 是每日新聞管線的正式發布入口。',
        soWhat: '查看三個版本的導覽變化與取捨',
    },
};

export default function M08_IAEvolution() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m8-grid">
                {t.versions.map((ver, i) => (
                    <div key={ver.v} className={`ni-m8-col${ver.shipped ? ' is-shipped' : ''}`}>
                        <div className="ni-m8-colhead">
                            <span className="ni-m8-v">{ver.v}</span>
                            <span className="ni-m8-era">{ver.era}</span>
                            {ver.shipped && <span className="ni-tag ni-tag--teal ni-m8-shippedtag">LIVE</span>}
                        </div>
                        <ul className="ni-m8-tree">
                            {ver.tree.map((node, j) => (
                                <li key={j} className={`ni-m8-node${node.hot ? ' is-hot' : ''}`} style={{ paddingLeft: `${node.d * 16 + 2}px` }}>
                                    <span className="ni-m8-branch" aria-hidden="true">{node.d > 0 ? '└' : '▪'}</span>
                                    {node.label}
                                </li>
                            ))}
                        </ul>
                        {i < t.versions.length - 1 && <span className="ni-m8-flow" aria-hidden="true">→</span>}
                    </div>
                ))}
            </div>
            <p className="ni-caption ni-m8-hotnote">◆ {t.hotNote}</p>
            <div className="ni-m8-notes">
                {t.notes.map((n, i) => (
                    <div key={i} className="ni-m8-note">
                        <span className="ni-m8-note-mark" aria-hidden="true" />
                        <p>{n}</p>
                    </div>
                ))}
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m8', `
.ni-m8-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.ni-m8-col { position: relative; padding: 16px; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); background: var(--ni-bg-2); }
.ni-m8-col.is-shipped { border-color: var(--ni-teal); background: linear-gradient(180deg, var(--ni-teal-dim), transparent 40%), var(--ni-bg-2); }
.ni-m8-colhead { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.ni-m8-v { font-family: var(--ni-font-data); font-size: 12px; color: var(--ni-teal); }
.ni-m8-era { font-size: 13px; color: var(--ni-text-1); font-weight: 500; }
.ni-m8-shippedtag { margin-left: auto; }
.ni-m8-tree { list-style: none; margin: 0; padding: 0; }
.ni-m8-node { display: flex; gap: 8px; align-items: baseline; font-family: var(--ni-font-data); font-size: 12px; line-height: 2; color: var(--ni-text-2); }
.ni-m8-branch { color: var(--ni-text-3); flex: 0 0 auto; }
.ni-m8-node.is-hot { color: var(--ni-teal); }
.ni-m8-flow { position: absolute; right: -12px; top: 50%; transform: translateY(-50%); color: var(--ni-text-3); font-size: 16px; z-index: 1; }
.ni-m8-hotnote { display: block; margin-top: 12px; color: var(--ni-teal); }
.ni-m8-notes { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 18px; }
.ni-m8-note { display: flex; gap: 10px; padding: 12px 14px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m8-note-mark { flex: 0 0 auto; width: 3px; align-self: stretch; background: var(--ni-amber); border-radius: 2px; }
.ni-m8-note p { margin: 0; font-size: 12.5px; line-height: 1.55; color: var(--ni-text-2); }
@media (max-width: 900px) {
  .ni-m8-grid { grid-template-columns: 1fr; }
  .ni-m8-flow { right: 50%; top: auto; bottom: -12px; transform: translateX(50%) rotate(90deg); }
  .ni-m8-notes { grid-template-columns: 1fr; }
}
`);
