import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M05');

const COPY = {
    en: {
        title: 'Model selection decision record',
        lead: 'Written up as an ADR — the context, the three models I benchmarked, the call I made, and the one downside I decided I could live with.',
        adr: [
            { k: 'Context', v: 'Daily runs over ~200 articles. The workload is high-volume, low-latency-sensitivity, needs reliable structured output and good zh-TW. Cost per run matters because it runs unattended forever.' },
            { k: 'Decision', v: 'Migrate the summarise/classify stage from GPT-4o to Gemini 1.5 Flash. Same golden-set quality band at roughly a quarter of the per-run cost.' },
        ],
        tableLabel: 'Options benchmarked',
        cols: ['Criterion', 'GPT-4o-mini', 'Gemini 1.5 Flash', 'Local open model'],
        winnerCol: 2,
        winnerStamp: 'DECISION',
        rows: [
            { c: 'zh-TW summary quality (1–5)', vals: ['4', '4', '3'] },
            { c: 'Latency p50', vals: ['1.9s', '1.4s', '4.8s'] },
            { c: 'Cost / 1,000 articles', vals: ['~5.6 USD', '~1.4 USD', '~0 (self-host)'] },
            { c: 'Structured-output reliability', vals: ['High', 'High', 'Medium'] },
            { c: 'Rate-limit behavior', vals: ['Tight', 'Generous', 'None (local)'] },
        ],
        consLabel: 'Consequences',
        consGood: ['~75% lower cost per run at the same quality band', 'Generous rate limits removed a throttling class of failures'],
        consBadLabel: 'Accepted negative consequence',
        consBad: 'Vendor lock-in risk on one provider. Mitigation: prompts live as provider-agnostic templates behind a thin adapter layer, so a re-migration is a config change, not a rewrite.',
        soWhat: 'Model choice was a costed tradeoff with a written record.',
    },
    zh: {
        title: '模型選型決策紀錄',
        lead: '用一份 ADR 記錄下來——脈絡、我實測的三個模型、最後的決定，以及我判斷自己承受得起的那一個缺點。',
        adr: [
            { k: '脈絡', v: '每日執行約 200 篇。工作負載量大、對延遲不敏感、需要可靠的結構化輸出與良好繁中。每次執行成本很重要，因為它會無人值守地一直跑。' },
            { k: '決策', v: '將摘要／分類階段從 GPT-4o 遷移到 Gemini 1.5 Flash。golden set 品質同一區間，每次成本約為四分之一。' },
        ],
        tableLabel: '實測的選項',
        cols: ['準則', 'GPT-4o-mini', 'Gemini 1.5 Flash', '本地開源模型'],
        winnerCol: 2,
        winnerStamp: 'DECISION',
        rows: [
            { c: '繁中摘要品質（1–5）', vals: ['4', '4', '3'] },
            { c: '延遲 p50', vals: ['1.9s', '1.4s', '4.8s'] },
            { c: '每 1,000 篇成本', vals: ['約 5.6 USD', '約 1.4 USD', '約 0（自架）'] },
            { c: '結構化輸出可靠度', vals: ['高', '高', '中'] },
            { c: '速率限制行為', vals: ['吃緊', '寬裕', '無（本地）'] },
        ],
        consLabel: '後果',
        consGood: ['同品質區間下每次成本降低約 75%', '寬裕的速率限制移除了一整類節流失敗'],
        consBadLabel: '接受的負面後果',
        consBad: '單一供應商的鎖定風險。緩解：提示以「供應商中立」模板存放於一層薄 adapter 之後，因此再遷移是改設定，不是重寫。',
        soWhat: '模型選擇是一個算過成本、有書面紀錄的取捨。',
    },
};

export default function M05_ModelDecision() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m5-adr">
                {t.adr.map(a => (
                    <div key={a.k} className="ni-m5-adr-row">
                        <span className="ni-m5-adr-k">{a.k}</span>
                        <p className="ni-m5-adr-v">{a.v}</p>
                    </div>
                ))}
            </div>

            <span className="ni-caption ni-m5-tablelabel">{t.tableLabel}</span>
            <div className="ni-m5-scroll">
                <table className="ni-m5-table">
                    <thead>
                        <tr>
                            {t.cols.map((c, i) => (
                                <th key={c} scope="col" className={i === t.winnerCol ? 'is-winner' : ''}>
                                    {c}
                                    {i === t.winnerCol && <span className="ni-m5-decision">{t.winnerStamp}</span>}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {t.rows.map(r => (
                            <tr key={r.c}>
                                <th scope="row">{r.c}</th>
                                {r.vals.map((val, i) => (
                                    <td key={i} className={i + 1 === t.winnerCol ? 'is-winner' : ''}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="ni-m5-cons">
                <div className="ni-m5-cons-good">
                    <span className="ni-m5-cons-label">{t.consLabel}</span>
                    <ul>{t.consGood.map((c, i) => <li key={i}>{c}</li>)}</ul>
                </div>
                <div className="ni-m5-cons-bad">
                    <span className="ni-tag ni-tag--amber">{t.consBadLabel}</span>
                    <p>{t.consBad}</p>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m5', `
.ni-m5-adr { display: flex; flex-direction: column; gap: 12px; margin-bottom: 22px; }
.ni-m5-adr-row { display: grid; grid-template-columns: 92px 1fr; gap: 14px; }
.ni-m5-adr-k { font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ni-teal); padding-top: 3px; }
.ni-m5-adr-v { margin: 0; font-size: 14px; line-height: 1.6; color: var(--ni-text-2); }
.ni-m5-tablelabel { display: block; margin-bottom: 10px; }
.ni-m5-scroll { overflow-x: auto; }
.ni-m5-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 620px; }
.ni-m5-table th, .ni-m5-table td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--ni-line-1); }
.ni-m5-table thead th { font-family: var(--ni-font-data); font-size: 11px; letter-spacing: 0.04em; color: var(--ni-text-3); vertical-align: bottom; }
.ni-m5-table tbody th { font-family: var(--ni-font-body); font-weight: 400; color: var(--ni-text-2); }
.ni-m5-table td { font-family: var(--ni-font-data); color: var(--ni-text-1); }
.ni-m5-table .is-winner { background: var(--ni-teal-dim); }
.ni-m5-table thead th.is-winner { color: var(--ni-teal); border-bottom: 1px solid var(--ni-teal); }
.ni-m5-decision { display: inline-block; margin-left: 8px; font-size: 9px; letter-spacing: 0.12em; color: var(--ni-bg-0); background: var(--ni-teal); border-radius: 3px; padding: 1px 6px; vertical-align: middle; }
.ni-m5-cons { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 20px; }
.ni-m5-cons-label { display: block; font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ni-teal); margin-bottom: 8px; }
.ni-m5-cons-good ul { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; }
.ni-m5-cons-good li { font-size: 13px; line-height: 1.5; color: var(--ni-text-2); }
.ni-m5-cons-bad { padding: 14px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m5-cons-bad p { margin: 8px 0 0; font-size: 13px; line-height: 1.55; color: var(--ni-text-1); }
@media (max-width: 767px) { .ni-m5-cons { grid-template-columns: 1fr; } .ni-m5-adr-row { grid-template-columns: 1fr; gap: 4px; } }
`);
