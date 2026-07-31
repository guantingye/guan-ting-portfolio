import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M15');

const SEV_TONE = { S1: 'red', S2: 'amber', S3: 'teal' };

const COPY = {
    en: {
        title: 'Usability-test findings & fixes',
        lead: 'I ran three think-aloud usability tests with the same task and identified five findings that affected understanding, interaction, and trust. Each finding maps to an interface adjustment and a re-test result. One also overturned an earlier design assumption, so this record preserves not only the final design but also which judgments were validated and which needed correction.',
        cols: ['Research finding', 'Impact', 'Final adjustment', 'Re-test result'],
        rows: [
            { f: 'Users checked confidence information before deciding whether to read the headline.', s: 'S3', c: 'Kept the confidence marker in a stable, easy-to-scan position instead of mixing it with content information.', v: 'All 3 participants identified the confidence state first, then began reading content and heading hierarchy.', flip: false },
            { f: 'Filter tags looked like content labels, so users were unsure whether they could interact with them.', s: 'S2', c: 'Added clear selected, hover, and keyboard-focus states, plus button semantics and aria-pressed or aria-selected to convey the current filter state.', v: 'All 3 participants completed filtering without prompting and could identify the active condition.', flip: false },
            { f: 'Putting the date first made it harder for users to quickly identify an article’s topic.', s: 'S1', c: 'Moved date and time to a secondary position, letting topic and headline lead scanning order and keeping their placement consistent.', v: 'Time to complete the same task decreased, and no participant missed the date.', flip: true },
            { f: 'A language switch at the top of the page was easy to overlook while reading.', s: 'S2', c: 'Moved the language switch beside the content-block heading so the control stays close to the content it affects.', v: 'Two participants who had not initially used the switch changed language on their own during the task.', flip: false },
            { f: 'When no content matched a week’s conditions, users read the empty screen as a loading failure.', s: 'S3', c: 'Added the reason for no results, the active filter conditions, and the next data-update time to the empty state.', v: 'On re-test, participants correctly understood that no content met the conditions and no longer read the screen as a system failure.', flip: false },
        ],
        flipLabel: 'reversed my own decision',
        protoToggle: 'Session protocol & task',
        protoLabel: 'Method: ',
        proto: 'Three moderated think-aloud usability tests with ISTI analysts. Each participant completed the same task: “Find this week’s semiconductor-policy content and identify the item you consider most important.” I recorded completion time, interaction paths, pauses, and misunderstandings, then used recurring behaviours as the basis for revisions. Because the sample is limited, the results identify interface issues and design directions rather than support statistical inference.',
        severityGuide: 'S1 | Clearly blocks task completion   S2 | Creates comprehension or interaction friction   S3 | Affects efficiency or confidence',
        soWhat: 'Review five research findings, the interface fixes, and their re-test results.',
    },
    zh: {
        title: '可用性測試發現與修正',
        lead: '我以相同任務進行三場放聲思考測試，整理出五項影響理解、操作與信任判斷的發現。每項發現都對應一項介面修正與再測結果，其中一項也推翻了我原先的設計假設。這份紀錄保留的不是最後採用的設計，也包括哪些判斷被驗證、哪些判斷必須修正。',
        cols: ['研究發現', '影響程度', '最終調整', '再測結果'],
        rows: [
            { f: '使用者會先確認信心資訊，再決定是否閱讀標題。', s: 'S3', c: '保留信心標記在穩定且容易掃描的位置，不將它與內容資訊混在一起。', v: '3 位受測者都先辨識到信心狀態，再開始閱讀內容與標題層級。', flip: false },
            { f: '篩選標籤看起來像內容標籤，使用者不確定它是否可以操作。', s: 'S2', c: '增加明確的選取、滑入與鍵盤焦點狀態，並以按鈕語意與 aria-pressed 或 aria-selected 表達目前篩選狀態。', v: '3 位受測者未經提示完成篩選，並能辨識目前啟用的條件。', flip: false },
            { f: '將日期放在首位，使用者反而更難快速辨識文章主題。', s: 'S1', c: '將日期與時間放在次要位置，改由主題與標題主導掃描順序，並固定其位置。', v: '完成相同任務所需時間縮短，且沒有受測者漏看日期。', flip: true },
            { f: '位於頁面頂端的語言切換，容易在閱讀過程中被忽略。', s: 'S2', c: '將語言切換移至內容區塊標題旁，使控制項與它影響的內容維持鄰近。', v: '2 位原本未主動使用切換功能的受測者，在任務進行中自行切換語言。', flip: false },
            { f: '當某週沒有符合條件的內容時，使用者會把空畫面解讀為載入失敗。', s: 'S3', c: '空狀態補上沒有結果的原因、目前套用的篩選條件，以及下一次資料更新時間。', v: '再測時，受測者能正確理解目前沒有符合條件的內容，不再將畫面判斷為系統故障。', flip: false },
        ],
        flipLabel: '反轉了我自己的決策',
        protoToggle: '測試流程與任務',
        protoLabel: '方法：',
        proto: '以主持式放聲思考進行 3 場可用性測試，受測者皆為 ISTI 分析師。每位受測者完成相同任務：「找出本週與半導體政策相關的內容，並指出你認為最重要的一則。」過程中記錄完成時間、操作路徑、停頓與誤解，並以重複出現的行為作為修正依據。由於樣本規模有限，結果用於辨識介面問題與設計方向，不作為統計推論。',
        severityGuide: 'S1｜明顯妨礙任務　S2｜造成理解或操作摩擦　S3｜影響效率或信心',
        soWhat: '查看五項研究發現、介面修正與再測結果。',
    },
};

export default function M15_UsabilityFindings() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [open, setOpen] = useState(false);
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m15-scroll">
                <table className="ni-m15-table">
                    <thead><tr>{t.cols.map(c => <th key={c} scope="col">{c}</th>)}</tr></thead>
                    <tbody>
                        {t.rows.map((r, i) => (
                            <tr key={i} className={r.flip ? 'is-flip' : ''}>
                                <th scope="row" className="ni-m15-f">
                                    {r.f}
                                    {r.flip && <span className="ni-m15-flip">↺ {t.flipLabel}</span>}
                                </th>
                                <td><span className={`ni-tag ni-tag--${SEV_TONE[r.s]}`}>{r.s}</span></td>
                                <td className="ni-m15-c">{r.c}</td>
                                <td className="ni-m15-v">{r.v}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="ni-caption">{t.severityGuide}</p>
            <button className="ni-m15-toggle" aria-expanded={open} onClick={() => setOpen(o => !o)}>
                <span className="ni-m15-chevron" data-open={open} aria-hidden="true">▸</span>{t.protoToggle}
            </button>
            {open && <p className="ni-m15-proto"><strong>{t.protoLabel}</strong>{t.proto}</p>}
        </ModuleFrame>
    );
}

injectStyles('ni-m15', `
.ni-m15-scroll { overflow-x: auto; }
.ni-m15-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 680px; }
.ni-m15-table th, .ni-m15-table td { text-align: left; padding: 11px 12px; border-bottom: 1px solid var(--ni-line-1); vertical-align: top; }
.ni-m15-table thead th { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ni-text-3); }
.ni-m15-table tr.is-flip { background: var(--ni-amber-dim); }
.ni-m15-f { font-family: var(--ni-font-body); font-weight: 500; color: var(--ni-text-1); width: 30%; }
.ni-m15-flip { display: block; font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.04em; color: var(--ni-amber); margin-top: 6px; }
.ni-m15-c { color: var(--ni-text-2); width: 32%; }
.ni-m15-v { color: var(--ni-text-3); }
.ni-m15-toggle { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; font-family: var(--ni-font-data); font-size: 12px; letter-spacing: 0.06em; color: var(--ni-teal); }
.ni-m15-chevron { transition: transform 160ms var(--ni-ease); }
.ni-m15-chevron[data-open="true"] { transform: rotate(90deg); }
.ni-m15-proto { margin: 12px 0 0; padding: 14px 16px; font-size: 13px; line-height: 1.6; color: var(--ni-text-2); background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
`);
