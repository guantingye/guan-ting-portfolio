import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M13');

const COPY = {
    en: {
        title: 'System reliability & operations log',
        lead: 'The figures above are reconstructed from existing execution records, scheduling frequency, and run logs. They describe the system\'s operating scale and common failure patterns; the postmortem on the right comes from a real operations incident and preserves its timeline, impact, root cause, correction, and preventive measures. Reconstructed figures show an approximate range and are not precise monitoring statistics.',
        stats: [
            { v: '~14', l: 'months of continuous operation' },
            { v: '~400', l: 'scheduled runs' },
            { v: '~96%', l: 'batch-run success rate' },
            { v: '~150', l: 'articles per successful run (median)' },
        ],
        failLabel: 'Failure taxonomy',
        failCols: ['Failure mode', 'Count', 'Recovery'],
        fails: [
            { m: 'Anti-bot block', n: 'frequent', r: 'auto', rt: 'backoff retries, request-header adjustments, and pausing the source' },
            { m: 'Source layout change', n: 'rare', r: 'manual', rt: 'update selectors and content-parsing rules' },
            { m: 'LLM timeout', n: 'occasional', r: 'auto', rt: 'timeout controls, exponential backoff, and retrying requests' },
            { m: 'API rate limit', n: 'occasional', r: 'auto', rt: 'write queue and adaptive throttling' },
        ],
        pmLabel: 'Incident postmortem',
        pm: {
            title: 'Silent data gap caused by a source redesign',
            timeline: [
                { t: 'D0 06:20', e: 'The run was marked successful, but one source produced 0 articles and the system still marked the full batch complete.' },
                { t: 'D2 09:00', e: 'The morning briefing was noticeably thinner than usual. I checked each source’s actual output; the run log showed no error.' },
                { t: 'D2 10:30', e: 'Confirmed that the source had changed its HTML structure overnight, so the existing extraction rules could no longer identify the article list.' },
                { t: 'D2 12:00', e: 'Updated the content selector, reran the missing dates, and backfilled the content missed over two days.' },
            ],
            impact: 'For two consecutive days, the morning briefing was missing one source. The system emitted no error, but readers had no way to know that some content was missing.',
            cause: 'The extractor did not treat “articles were expected but actual output was zero” as a failure. The source returned a normal HTTP status, so the empty result was mistakenly treated as no new content that day.',
            fix: 'Set a baseline output and anomaly threshold for each source. If the median article count across the prior seven days is greater than 5 but the current run returns 0, the system flags an anomaly instead of silently passing it.',
            prevention: 'Each source now records both whether the request succeeded and whether extraction produced a reasonable volume of data, along with output trends, so layout changes and data anomalies can be detected earlier.',
        },
        pmFields: { impact: 'Impact', cause: 'Root cause', fix: 'Fix', prevention: 'Prevention' },
        soWhat: 'Review failure categories, the incident timeline, and preventive measures.',
    },
    zh: {
        title: '可靠度與維運紀錄',
        lead: '上方數字依既有執行紀錄、排程頻率與運行日誌重建，用來描述系統的運作規模與常見失敗模式；右側事後檢討則來自一次真實維運事故，完整保留事件時間線、影響、根因、修正與預防措施。重建數字用於呈現大致範圍，不視為精確的監控統計。',
        stats: [
            { v: '~14', l: '個月持續運作' },
            { v: '~400', l: '次排程執行' },
            { v: '~96%', l: '批次執行成功率' },
            { v: '~150', l: '篇／每次成功執行（中位數）' },
        ],
        failLabel: '失敗分類',
        failCols: ['失敗模式', '次數', '復原'],
        fails: [
            { m: '反爬蟲封鎖', n: '頻繁', r: 'auto', rt: '退避重試、請求標頭調整與來源暫停' },
            { m: '來源版面變更', n: '罕見', r: 'manual', rt: '更新選擇器與內容解析規則' },
            { m: 'LLM 逾時', n: '偶爾', r: 'auto', rt: '逾時控制、指數退避與重新請求' },
            { m: 'API 速率限制', n: '偶爾', r: 'auto', rt: '寫入佇列與動態節流' },
        ],
        pmLabel: '事後檢討',
        pm: {
            title: '來源改版造成的靜默資料缺漏',
            timeline: [
                { t: 'D0 06:20', e: '排程顯示執行成功，但其中一個來源產出 0 篇文章，系統仍將整批流程標記為完成。' },
                { t: 'D2 09:00', e: '晨間簡報的內容量明顯低於平常，開始檢查各來源的實際產出；執行日誌中沒有出現錯誤。' },
                { t: 'D2 10:30', e: '確認該來源前一晚更新了 HTML 結構，既有擷取規則已無法辨識文章列表。' },
                { t: 'D2 12:00', e: '更新內容選擇器、重新執行缺漏日期，並回補兩天內未被擷取的內容。' },
            ],
            impact: '連續兩天的晨間簡報少了一個資料來源。系統沒有產生錯誤資訊，但讀者無法知道部分內容已經缺漏。',
            cause: '擷取器沒有把「預期應有文章，但實際產出為零」視為失敗。來源回傳的 HTTP 狀態正常，因此空結果被誤判為當日沒有新內容。',
            fix: '為每個來源設定基準產量與異常門檻。若來源過去七日的文章量中位數大於 5，但本次回傳為 0，系統會標記為異常，而不是無聲通過。',
            prevention: '每個來源現在都對「請求是否成功、擷取是否產生合理資料量」進行檢查，並記錄來源產出趨勢，提早辨識版型變更與資料異常。',
        },
        pmFields: { impact: '影響', cause: '根因', fix: '修正', prevention: '預防' },
        soWhat: '查看失敗分類、事故時間線與預防措施。',
    },
};

export default function M13_ReliabilityOps() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const pm = t.pm;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m13-stats">
                {t.stats.map((s, i) => (
                    <div key={i} className="ni-m13-stat">
                        <span className="ni-m13-stat-v">{s.v}</span>
                        <span className="ni-m13-stat-l">{s.l}</span>
                    </div>
                ))}
            </div>

            <div className="ni-m13-cols">
                <div className="ni-m13-fail">
                    <span className="ni-caption ni-m13-sublabel">{t.failLabel}</span>
                    <table className="ni-m13-table">
                        <thead><tr>{t.failCols.map(c => <th key={c} scope="col">{c}</th>)}</tr></thead>
                        <tbody>
                            {t.fails.map((f, i) => (
                                <tr key={i}>
                                    <th scope="row">{f.m}</th>
                                    <td className="ni-mono">{f.n}</td>
                                    <td><span className={`ni-tag ni-tag--${f.r === 'auto' ? 'teal' : 'amber'}`}>{f.r}</span> <span className="ni-m13-rt">{f.rt}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="ni-m13-pm">
                    <span className="ni-caption ni-m13-sublabel">{t.pmLabel}</span>
                    <div className="ni-m13-pm-card">
                        <div className="ni-m13-pm-title">{pm.title}</div>
                        <ol className="ni-m13-timeline">
                            {pm.timeline.map((row, i) => (
                                <li key={i}><span className="ni-m13-tl-t">{row.t}</span><span className="ni-m13-tl-e">{row.e}</span></li>
                            ))}
                        </ol>
                        <dl className="ni-m13-pm-dl">
                            {['impact', 'cause', 'fix', 'prevention'].map(k => (
                                <div key={k} className="ni-m13-pm-row">
                                    <dt>{t.pmFields[k]}</dt><dd>{pm[k]}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m13', `
.ni-m13-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 22px; }
.ni-m13-stat { padding: 14px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); text-align: center; }
.ni-m13-stat-v { display: block; font-family: var(--ni-font-data); font-size: 24px; color: var(--ni-teal); }
.ni-m13-stat-l { display: block; font-size: 11px; color: var(--ni-text-3); margin-top: 4px; line-height: 1.4; }
.ni-m13-cols { display: grid; grid-template-columns: 1fr 1.1fr; gap: 16px; }
.ni-m13-sublabel { display: block; margin-bottom: 10px; }
.ni-m13-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.ni-m13-table th, .ni-m13-table td { text-align: left; padding: 9px 8px; border-bottom: 1px solid var(--ni-line-1); }
.ni-m13-table thead th { font-family: var(--ni-font-data); font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ni-text-3); }
.ni-m13-table tbody th { font-family: var(--ni-font-body); font-weight: 400; color: var(--ni-text-1); }
.ni-m13-rt { font-size: 10.5px; color: var(--ni-text-3); }
.ni-m13-pm-card { padding: 16px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m13-pm-title { font-family: var(--ni-font-display); font-size: 16px; color: var(--ni-text-1); margin-bottom: 12px; }
.ni-m13-timeline { list-style: none; margin: 0 0 14px; padding: 0; display: flex; flex-direction: column; gap: 7px; border-left: 1px solid var(--ni-line-2); padding-left: 12px; }
.ni-m13-timeline li { display: flex; gap: 10px; align-items: baseline; }
.ni-m13-tl-t { flex: 0 0 auto; font-family: var(--ni-font-data); font-size: 10.5px; color: var(--ni-amber); width: 58px; }
.ni-m13-tl-e { font-size: 12.5px; line-height: 1.45; color: var(--ni-text-2); }
.ni-m13-pm-dl { margin: 0; display: flex; flex-direction: column; gap: 8px; }
.ni-m13-pm-row { display: grid; grid-template-columns: 78px 1fr; gap: 10px; }
.ni-m13-pm-row dt { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ni-teal); }
.ni-m13-pm-row dd { margin: 0; font-size: 12.5px; line-height: 1.5; color: var(--ni-text-1); }
@media (max-width: 767px) { .ni-m13-stats { grid-template-columns: repeat(2, 1fr); } .ni-m13-cols { grid-template-columns: 1fr; } }
`);
