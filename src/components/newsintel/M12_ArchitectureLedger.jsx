import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M12');

const NODES = [
    { x: 8,   label: { en: 'Sources', zh: '來源' }, sub: '6 + feeds' },
    { x: 138, label: { en: 'Crawler', zh: '爬蟲' }, sub: 'Playwright' },
    { x: 268, label: { en: 'Clean', zh: '清理' }, sub: 'Trafilatura' },
    { x: 398, label: { en: 'Dedupe', zh: '去重' }, sub: 'hash + fuzzy', accent: true },
    { x: 528, label: { en: 'LLM stage', zh: 'LLM 階段' }, sub: 'Gemini Flash', accent: true },
    { x: 658, label: { en: 'Publish', zh: '發布' }, sub: 'Notion API' },
    { x: 788, label: { en: 'Platform', zh: '平台' }, sub: '/insights' },
];

const COPY = {
    en: {
        title: 'MVP architecture ledger',
        lead: 'The pipeline is linear and boring on purpose. Every operational decision below also names the alternative it beat and what that choice cost.',
        cols: ['Decision', 'Alternative rejected', 'Consequence'],
        rows: [
            { d: 'Scheduling: cron, one morning run', alt: 'Real-time streaming per source', c: 'The desk is a morning read — a daily batch is simpler and cheaper.' },
            { d: 'Retry: exponential backoff, 3 tries', alt: 'Fail-fast on first error', c: 'Transient 429/timeout no longer kills a whole run.' },
            { d: 'Dedupe: content hash + fuzzy title (≥0.85)', alt: 'Exact-URL match only', c: 'Same story across sources collapses instead of five near-copies.' },
            { d: 'Notion API: queue + rate-limit throttle', alt: 'Fire all writes at once', c: 'Stays under the 3 req/s cap without dropping items.' },
            { d: 'Secrets: env vars + adapter layer', alt: 'Keys inline in scripts', c: 'A provider swap is a config change, not a code edit.' },
        ],
        soWhat: 'The MVP runs unattended because failure was designed for.',
    },
    zh: {
        title: 'MVP 架構台帳',
        lead: '這條管線刻意做得線性又無聊。下方每個維運決策，也都寫出它擊敗的替代方案，以及那個選擇的代價。',
        cols: ['決策', '被否決的替代方案', '後果'],
        rows: [
            { d: '排程：cron，每早一次執行', alt: '每來源即時串流', c: '這是早晨閱讀——每日批次更簡單也更省。' },
            { d: '重試：指數退避，最多 3 次', alt: '首次錯誤即失敗', c: '暫時性的 429／逾時不再拖垮整次執行。' },
            { d: '去重：內容雜湊 + 模糊標題（≥0.85）', alt: '僅精確 URL 比對', c: '跨來源的同一則會摺疊，而非留下五筆近似複本。' },
            { d: 'Notion API：佇列 + 速率節流', alt: '一次全部寫入', c: '在 3 req/s 上限內運作，且不丟項目。' },
            { d: '機密：env 變數 + adapter 層', alt: '金鑰寫死在腳本裡', c: '換供應商是改設定，不是改程式。' },
        ],
        soWhat: 'MVP 能無人值守地運作，是因為失敗被設計進去了。',
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
