import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M13');

const COPY = {
    en: {
        title: 'Reliability & ops log',
        lead: 'The operating figures here are reconstructed from memory of the run history; the postmortem below is a real incident I still remember clearly.',
        stats: [
            { v: '~14', l: 'months in operation' },
            { v: '~400', l: 'runs executed' },
            { v: '~96%', l: 'run success rate' },
            { v: '~150', l: 'articles/run (p50)' },
        ],
        failLabel: 'Failure taxonomy',
        failCols: ['Failure mode', 'Count', 'Recovery'],
        fails: [
            { m: 'Anti-bot block', n: 'frequent', r: 'auto', rt: 'retry + header rotation' },
            { m: 'Source layout change', n: 'rare', r: 'manual', rt: 'selector patch' },
            { m: 'LLM timeout', n: 'occasional', r: 'auto', rt: 'backoff + retry' },
            { m: 'API rate limit', n: 'occasional', r: 'auto', rt: 'queue + throttle' },
        ],
        pmLabel: 'Incident postmortem',
        pm: {
            title: 'Silent extraction failure after a source redesign',
            timeline: [
                { t: 'D0 06:20', e: 'Run completes "green" — but one source yields 0 articles.' },
                { t: 'D2 09:00', e: 'Noticed the briefing was thinner than usual; no error was raised.' },
                { t: 'D2 10:30', e: 'Traced to a source that had shipped a new HTML layout overnight.' },
                { t: 'D2 12:00', e: 'Patched the extractor; backfilled the two missed days.' },
            ],
            impact: 'Two days of briefings missing one source. No wrong data shipped — just missing data.',
            cause: 'The extractor returned an empty list on a layout it no longer recognised, and empty was treated as "no news", not "broken".',
            fix: 'Per-source expected-yield floor: a source returning 0 when its 7-day median is >5 now raises an alert instead of passing silently.',
            prevention: 'Every source now has a health check on yield, not just on HTTP status.',
        },
        pmFields: { impact: 'Impact', cause: 'Root cause', fix: 'Fix', prevention: 'Prevention' },
        soWhat: 'I run what I build, and I write down what breaks.',
    },
    zh: {
        title: '可靠度與維運紀錄',
        lead: '這裡的運作數字是憑執行歷史的記憶重建的；下方的事後檢討，則是一次我到現在還記得很清楚的真實事故。',
        stats: [
            { v: '~14', l: '個月運作' },
            { v: '~400', l: '次執行' },
            { v: '~96%', l: '執行成功率' },
            { v: '~150', l: '篇/次（p50）' },
        ],
        failLabel: '失敗分類',
        failCols: ['失敗模式', '次數', '復原'],
        fails: [
            { m: '反爬蟲封鎖', n: '頻繁', r: 'auto', rt: '重試 + 標頭輪替' },
            { m: '來源版面變更', n: '罕見', r: 'manual', rt: '選擇器修補' },
            { m: 'LLM 逾時', n: '偶爾', r: 'auto', rt: '退避 + 重試' },
            { m: 'API 速率限制', n: '偶爾', r: 'auto', rt: '佇列 + 節流' },
        ],
        pmLabel: '事後檢討',
        pm: {
            title: '來源改版後的無聲擷取失敗',
            timeline: [
                { t: 'D0 06:20', e: '執行顯示「綠燈」——但某來源產出 0 篇文章。' },
                { t: 'D2 09:00', e: '注意到簡報比平常單薄；系統沒有拋出任何錯誤。' },
                { t: 'D2 10:30', e: '追查到某來源在隔夜上線了新的 HTML 版面。' },
                { t: 'D2 12:00', e: '修補擷取器；回補漏掉的兩天。' },
            ],
            impact: '兩天的簡報少了一個來源。沒有出錯的資料——只是缺資料。',
            cause: '擷取器在它不再認得的版面上回傳空清單，而「空」被當成「沒有新聞」，而非「壞了」。',
            fix: '各來源預期產量下限：當某來源 7 日中位數 >5 卻回傳 0，現在會發警示，而不是無聲通過。',
            prevention: '每個來源現在都對「產量」做健康檢查，而不只看 HTTP 狀態。',
        },
        pmFields: { impact: '影響', cause: '根因', fix: '修正', prevention: '預防' },
        soWhat: '我運維我建的東西，也把壞掉的地方寫下來。',
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
