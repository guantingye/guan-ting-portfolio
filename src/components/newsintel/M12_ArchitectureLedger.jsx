import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M12');

const NODES = [
    { x: 8,   label: { en: 'Sources', zh: '來源' }, sub: '6 + feeds' },
    { x: 138, label: { en: 'Content extraction', zh: '內容擷取' }, sub: 'Playwright' },
    { x: 268, label: { en: 'Data cleanup', zh: '資料清理' }, sub: 'Trafilatura' },
    { x: 398, label: { en: 'Duplicate merging', zh: '重複合併' }, sub: 'hash + fuzzy', accent: true },
    { x: 528, label: { en: 'Summarization & classification', zh: '摘要與分類' }, sub: 'Gemini Flash', accent: true },
    { x: 658, label: { en: 'Data publishing', zh: '資料發布' }, sub: 'Notion API' },
    { x: 788, label: { en: 'Frontend presentation', zh: '前端呈現' }, sub: '/insights' },
];

const COPY = {
    en: {
        title: 'MVP architecture decision model',
        lead: 'This pipeline is intentionally linear, observable, and easy to troubleshoot. The first version did not aim to add architectural complexity; it aimed to complete the daily batch reliably and quickly locate a failure at any stage. The five key engineering decisions below retain the alternatives not adopted, along with the limits and costs accepted for each choice.',
        cols: ['Adopted approach', 'Alternative not adopted', 'Trade-offs and impact'],
        rows: [
            { d: 'Scheduling: cron, one run every morning', alt: 'Create a real-time stream for each source', c: 'The primary use case is scheduled morning reading, not real-time processing of every story. A daily batch substantially reduces cost and maintenance overhead, but is not suitable for scenarios that require minute-level updates.' },
            { d: 'Exponential backoff, up to three retries', alt: 'End the whole batch immediately after any request fails', c: 'Temporary API rate limits, network timeouts, and source volatility no longer directly interrupt the entire run. If retries still fail, the system preserves an error record and marks the affected source.' },
            { d: 'Content hash plus title similarity, with a 0.85 threshold', alt: 'Match only exactly identical URLs', c: 'When the same event is syndicated or rewritten by different outlets, it can be merged into one primary record while retaining source differences. Fuzzy matching can still merge incorrectly, so boundary cases need sample checks.' },
            { d: 'Use a queue and rate limiting for writes', alt: 'Send every write request in parallel at once', c: 'The system writes reliably within API rate limits and avoids data gaps when some requests are rejected. The trade-off is a slightly longer total publishing time.' },
            { d: 'Store credentials in environment variables; centralize model calls in an adapter layer', alt: 'Write keys and provider logic directly into execution scripts', c: 'When changing models or service providers, adjustments stay concentrated in configuration and integration layers instead of requiring a rewrite of the pipeline. It also reduces the risk of credentials entering version control.' },
        ],
        soWhat: 'Review the five architecture decisions and their failure-handling approaches',
    },
    zh: {
        title: 'MVP 架構決策模型',
        lead: '這條管線刻意維持線性、可觀察且容易排查。第一版的目標不是增加架構複雜度，而是確保每日批次能穩定完成，並在任一階段失敗時快速定位問題。下方整理五項關鍵工程決策，同時保留未採用的替代方案，以及每項選擇所接受的限制與代價。',
        cols: ['採用方案', '未採用方案', '取捨與影響'],
        rows: [
            { d: '排程：cron，每天早晨執行一次', alt: '為每個來源建立即時串流', c: '主要使用情境是固定時段的晨間閱讀，不需要即時處理每則新聞。每日批次執行可大幅降低成本與維護負擔，但不適合需要分鐘級更新的情境。' },
            { d: '指數退避，最多重試三次', alt: '任一請求失敗後立即終止整批流程', c: '暫時性的 API 速率限制、網路逾時與來源波動不再直接中斷整次執行。若重試仍失敗，系統會保留錯誤紀錄並標記受影響來源。' },
            { d: '內容雜湊搭配標題相似度，門檻為 0.85', alt: '只比對完全相同的網址', c: '同一事件被不同媒體轉載或改寫時，可以合併為一則主要紀錄，同時保留來源差異。模糊比對仍可能誤合併，因此邊界案例需要抽樣檢查。' },
            { d: '使用佇列與速率節流機制寫入', alt: '一次平行送出所有寫入請求', c: '系統能在 API 速率限制內穩定寫入，並避免部分請求被拒絕後造成資料缺漏，代價是整批發布時間略有增加。' },
            { d: '以環境變數保存憑證，模型呼叫集中於 Adapter 層', alt: '將金鑰與供應商邏輯直接寫入執行腳本', c: '更換模型或服務供應商時，主要調整集中在設定與接入層，不需要重寫整條管線，同時也降低憑證進入版本控制的風險。' },
        ],
        soWhat: '查看五項架構決策與失敗處理方式',
    },
};

export default function M12_ArchitectureLedger() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m12-diagram">
                <svg viewBox="0 0 900 96" role="img" aria-label="Pipeline architecture: sources to platform" preserveAspectRatio="xMinYMid meet">
                    {NODES.slice(0, -1).map((n, i) => (
                        <g key={i}>
                            <line x1={n.x + 104} y1="40" x2={NODES[i + 1].x} y2="40" stroke="var(--ni-line-2)" strokeWidth="1.4" />
                            <path d={`M${NODES[i + 1].x - 6} 36 L${NODES[i + 1].x} 40 L${NODES[i + 1].x - 6} 44`} fill="none" stroke="var(--ni-line-2)" strokeWidth="1.4" />
                        </g>
                    ))}
                    {NODES.map((n, i) => (
                        <g key={i}>
                            <rect x={n.x} y="18" width="104" height="44" rx="6"
                                fill={n.accent ? 'rgba(53,194,176,0.1)' : 'var(--ni-bg-2)'}
                                stroke={n.accent ? 'var(--ni-teal)' : 'var(--ni-line-2)'} strokeWidth="1.2" />
                            <text x={n.x + 52} y="38" textAnchor="middle" fontSize="13" fill="var(--ni-text-1)" fontFamily="Inter, sans-serif">{n.label[lang]}</text>
                            <text x={n.x + 52} y="52" textAnchor="middle" fontSize="9.5" fill="var(--ni-text-3)" fontFamily="JetBrains Mono, monospace">{n.sub}</text>
                        </g>
                    ))}
                </svg>
            </div>

            <div className="ni-m12-scroll">
                <table className="ni-m12-table">
                    <thead><tr>{t.cols.map(c => <th key={c} scope="col">{c}</th>)}</tr></thead>
                    <tbody>
                        {t.rows.map((r, i) => (
                            <tr key={i}>
                                <th scope="row" className="ni-m12-d">{r.d}</th>
                                <td className="ni-m12-alt">{r.alt}</td>
                                <td className="ni-m12-c">{r.c}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m12', `
.ni-m12-diagram { overflow-x: auto; padding: 6px 0 18px; }
.ni-m12-diagram svg { width: 100%; min-width: 720px; height: auto; }
.ni-m12-scroll { overflow-x: auto; }
.ni-m12-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 640px; }
.ni-m12-table th, .ni-m12-table td { text-align: left; padding: 11px 12px; border-bottom: 1px solid var(--ni-line-1); vertical-align: top; }
.ni-m12-table thead th { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ni-text-3); }
.ni-m12-d { font-family: var(--ni-font-body); font-weight: 500; color: var(--ni-text-1); width: 32%; }
.ni-m12-alt { color: var(--ni-text-3); width: 30%; }
.ni-m12-c { color: var(--ni-text-2); }
`);
