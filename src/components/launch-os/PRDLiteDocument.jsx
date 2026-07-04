import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// The document itself is the artifact: a full PRD-lite for Meridian's
// draft-reply copilot, written end to end in both languages.

const SECTIONS = [
    {
        id: 'problem',
        title: { en: '1 · Problem statement', zh: '1 · Problem statement 問題陳述' },
        body: {
            en: [
                'Tier-1 support agents at Meridian’s target accounts handle 40–60 tickets per shift. Internal sampling (Module 01, signal S1) puts 41% of those tickets in twelve recurring question shapes — password resets, plan changes, invoice copies, export limits. The reply to each is near-identical, yet every agent still types it by hand, because the cost of a wrong shortcut lands on them personally: a bad macro is anonymous, a bad reply has their name on it.',
                'The team we are building for is not drowning in novel problems. It is drowning in the hundredth repetition of solved ones, at the exact hours when attention is most expensive.',
            ],
            zh: [
                'Meridian 目標客戶的 tier-1 客服，每班要處理 40–60 張工單。內部抽樣（Module 01 的訊號 S1）顯示其中 41% 落在十二種重複的問題型態——密碼重設、方案變更、發票副本、匯出上限。每一種的回覆幾乎一模一樣，但每位客服仍然親手打字，因為抄捷徑出錯的代價會落在個人頭上：一個爛的罐頭回覆是匿名的，一封爛的回信上面有你的名字。',
                '我們服務的團隊不是被新問題淹沒，而是被已解問題的第一百次重複淹沒——而且正好發生在注意力最昂貴的時段。',
            ],
        },
    },
    {
        id: 'moment',
        title: { en: '2 · The user moment', zh: '2 · The user moment 使用者瞬間' },
        body: {
            en: [
                'It is 4:10 on a Thursday. Ren has closed thirty-nine tickets; number forty is another export-limit question, the third today. She knows the answer by heart, which is precisely the problem — she starts typing on autopilot, half-reading, and pastes the limit for the wrong plan tier. The customer replies twenty minutes later, polite and confused. The easy ticket has just become a hard one.',
                'Meridian’s job is that moment: put a grounded draft in front of Ren at ticket forty that is as careful as she was at ticket four — and make it her draft the second she touches it.',
            ],
            zh: [
                '星期四下午四點十分。Ren 已經結了三十九張工單；第四十張又是匯出上限的問題，今天第三次。她對答案倒背如流，而這正是問題所在——她開始自動駕駛式地打字，半讀不讀，然後貼上了錯誤方案層級的上限數字。二十分鐘後客戶回信，語氣禮貌而困惑。一張簡單的工單，剛剛變成了一張困難的。',
                'Meridian 的工作就是那個瞬間：在第四十張工單時，把一份和她第四張工單時一樣謹慎的草稿放到 Ren 面前——並且在她碰到它的那一秒，讓它變成她的草稿。',
            ],
        },
        annotation: {
            en: 'I wrote this scene before writing a single requirement, and it settled two arguments later on: the product serves attention decay, not typing speed. Speed was never Ren’s problem.',
            zh: '我在寫下任何一條需求之前先寫了這個場景，它後來替我解決了兩場爭論：這個產品服務的是注意力的衰減，不是打字速度。速度從來不是 Ren 的問題。',
        },
    },
    {
        id: 'goals',
        title: { en: '3 · Goals & non-goals', zh: '3 · Goals 與 non-goals' },
        goals: {
            label: { en: 'Goals', zh: 'Goals' },
            items: {
                en: [
                    'Cut median handling time on tier-1 tickets by 25% without raising reopen rates.',
                    'Keep agents the visible author: every sent reply reflects an explicit agent action.',
                    'Make confidence legible enough that agents calibrate trust per ticket, not per product.',
                ],
                zh: [
                    '將 tier-1 工單的處理時間中位數降低 25%，且不推高重開率。',
                    '讓客服始終是可見的作者：每封送出的回覆都對應一個明確的客服動作。',
                    '讓 confidence 清楚到客服能逐張工單校準信任，而不是對整個產品一次定生死。',
                ],
            },
        },
        nonGoals: {
            label: { en: 'Non-goals', zh: 'Non-goals' },
            items: {
                en: [
                    'Not building autonomous send in v1. The register of this product is “confident draft”, not “silent automation”. If we cannot win while a human reads every reply, we have not earned autonomy anyway.',
                    'Not optimizing agent-utilization metrics. This tool reports nothing that ranks people; the day it becomes a surveillance instrument is the day agents teach it to lie.',
                    'Not covering tier-2 or billing-dispute tickets in v1, even though the model sometimes drafts them plausibly. “Sometimes plausible” is exactly the risk profile we refuse to launch.',
                ],
                zh: [
                    'v1 不做自動送出。這個產品的基調是「有把握的草稿」，不是「無聲的自動化」。如果連每封回覆都有真人閱讀的情況下我們都贏不了，那我們本來就還沒資格談自動化。',
                    '不優化客服使用率指標。這個工具不產出任何可以拿來排名的報表；它變成監控工具的那一天，就是客服開始教它說謊的那一天。',
                    'v1 不涵蓋 tier-2 與帳務爭議工單——即使模型偶爾能寫出看似合理的草稿。「偶爾看似合理」正是我們拒絕上線的那種風險輪廓。',
                ],
            },
        },
        annotation: {
            en: 'Non-goals earn their keep in reviews. Two of the three above were relitigated in month one — losing the argument twice is how they stayed non-goals.',
            zh: 'Non-goals 的價值在評審會議裡才看得到。上面三條有兩條在第一個月被重新翻案——連輸兩次辯論，正是它們得以留在 non-goals 的原因。',
        },
    },
    {
        id: 'scope',
        title: { en: '4 · Scope: in / out', zh: '4 · Scope：in / out' },
        scopeIn: {
            en: ['Drafts for the twelve tier-1 ticket shapes', 'Source-passage display beside every draft', 'Three-level confidence badge', 'Human-first queue routing below τ', 'Edit-diff capture as tone signal'],
            zh: ['十二種 tier-1 工單型態的草稿', '每份草稿旁的來源段落顯示', '三段式 confidence 標記', '低於 τ 時導入 human-first 佇列', '以語氣訊號形式擷取編輯 diff'],
        },
        scopeOut: {
            en: [
                { item: 'Autonomous send', why: 'Disclosure obligations change shape in two markets the moment no human reviews (S5).' },
                { item: 'Per-session summaries', why: 'Agents work the queue’s order, not sessions; research insight I3 killed this.' },
                { item: 'Tone personalization by customer demographics', why: 'Risk R3. Account tier and ticket type carry all the signal we need.' },
                { item: 'Languages beyond EN / zh-TW', why: 'Mixed-code tickets are already the hardest case we ship; adding languages before nailing it multiplies the failure surface.' },
            ],
            zh: [
                { item: '自動送出', why: '只要沒有真人審核，兩個市場的揭露義務就會變形（S5）。' },
                { item: 'Session 層級摘要', why: '客服照佇列的順序工作，不照 session；研究洞見 I3 否決了這項。' },
                { item: '依客戶人口屬性調整語氣', why: '風險 R3。帳戶層級加工單類型已涵蓋我們需要的全部訊號。' },
                { item: 'EN / zh-TW 以外的語言', why: '中英夾雜已是我們要出貨的最難情境；在做穩之前加語言，等於把失效面積乘上去。' },
            ],
        },
    },
    {
        id: 'ai-reqs',
        title: { en: '5 · AI-specific requirements', zh: '5 · AI 特有需求' },
        reqs: [
            {
                name: { en: 'Confidence display', zh: 'Confidence 顯示' },
                body: {
                    en: 'Three levels, computed per ticket. At or above τ, the draft renders expanded with its source passages. Below τ, the draft collapses to an outline behind an “assistant unsure” label — it can be expanded and edited, but cannot be sent without at least one edit.',
                    zh: '三個等級，逐張工單計算。達到 τ 以上，草稿完整展開並附來源段落。低於 τ，草稿收合為大綱並標示「assistant unsure」——可以展開、可以編輯，但至少要編輯過一次才能送出。',
                },
                annotation: {
                    en: 'I chose per-ticket confidence over per-session because agents judge one ticket at a time; session-level averages hide exactly the failures that matter.',
                    zh: '我選擇逐張工單而非 session 層級的 confidence，因為客服一次只判斷一張工單；session 層級的平均值，藏起來的正是最要緊的那些失敗。',
                },
            },
            {
                name: { en: 'Fallback UX', zh: 'Fallback UX' },
                body: {
                    en: 'Three layers. Layer 1 — model timeout past two seconds: the editor shows template suggestions under a visible “assistant offline” state. Layer 2 — retrieval index stale: drafting continues, citations are disabled and marked. Layer 3 — full outage: the composer is identical to pre-Meridian; nothing half-renders.',
                    zh: '三層降級。第一層——模型逾時超過兩秒：編輯器改出範本建議，並明確顯示「assistant offline」。第二層——檢索索引過期：草稿照出，但引用功能停用並標示。第三層——全面停擺：編輯器回到沒有 Meridian 的樣子；不允許任何半渲染狀態。',
                },
                annotation: {
                    en: 'The fallback ladder is a UX artifact, not an infrastructure note: agents plan their next thirty seconds around whether a draft is coming.',
                    zh: '這座降級階梯是 UX 產物，不是基礎設施備註：客服會用「草稿到底會不會來」規劃接下來的三十秒。',
                },
            },
            {
                name: { en: 'Error states', zh: '錯誤狀態' },
                body: {
                    en: 'When an accepted draft is later found wrong: the agent or lead flags it; a customer-facing correction template opens in the same ticket; the draft, its sources, and the edit history route to a review queue. If the same ticket shape produces two confirmed wrong drafts, that shape is pulled from drafting until re-evaluated.',
                    zh: '當已採用的草稿事後被發現有誤：客服或 lead 標記它；同一張工單內開啟面向客戶的更正範本；該草稿、其來源與編輯歷程一併送入審查佇列。同一種工單型態累積兩次確認錯誤，該型態即暫停出草稿，直到重新評估。',
                },
            },
            {
                name: { en: 'Feedback loop', zh: 'Feedback loop' },
                body: {
                    en: 'Edit diffs are stored as tone signal, not fact signal (model card, assumption 3). Sampled diffs join the evaluation set weekly. Acceptance metrics exist to tune the model and never surface in people dashboards.',
                    zh: '編輯 diff 以語氣訊號的身分儲存，不當作事實訊號（見 model card 假設 3）。每週抽樣的 diff 併入評估集。採用率指標只用來調整模型，永遠不出現在人員儀表板上。',
                },
                annotation: {
                    en: 'Treating edits as tone-only was contested. But an edit can make a wrong answer more convincing — grading facts by edits would teach the model confidence, not correctness.',
                    zh: '「編輯只算語氣」這條當初有人反對。但一次編輯可以讓錯的答案更有說服力——用編輯來評判事實，教會模型的會是自信，不是正確。',
                },
            },
        ],
    },
    {
        id: 'acceptance',
        title: { en: '6 · Acceptance criteria', zh: '6 · Acceptance criteria 驗收條件' },
        criteria: {
            en: [
                'Given a tier-1 ticket in a known shape, when the agent opens the reply editor, then a draft with source passages renders within 2 seconds, or the fallback state shows.',
                'Given a draft below τ, when the agent attempts to send without editing, then send stays disabled and the “assistant unsure” outline remains.',
                'Given a model timeout, when the editor falls back to templates, then the state is labeled “assistant offline” and no partial draft renders.',
                'Given an agent edits a draft, when the reply is sent, then the edit diff is stored with the ticket id and marked as tone signal.',
                'Given a draft cites policy, when the citation fails the retrieval check, then the suggestion demotes to draft-only with the citation stripped.',
                'Given a thread past 12 turns, when the agent opens the editor, then no draft is offered and the standard composer shows.',
                'Given an agent’s as-is acceptance exceeds 90% over a week, when the weekly review runs, then a coaching flag routes to support ops — never a lockout.',
                'Given a sent reply is flagged wrong, when the flag is submitted, then the correction template and report path open inside the same ticket view.',
            ],
            zh: [
                'Given 一張已知型態的 tier-1 工單，when 客服打開回覆編輯器，then 附來源段落的草稿在 2 秒內渲染完成，否則顯示 fallback 狀態。',
                'Given 一份低於 τ 的草稿，when 客服未編輯就嘗試送出，then 送出鍵維持停用，「assistant unsure」大綱保持原狀。',
                'Given 模型逾時，when 編輯器降級為範本，then 狀態標示「assistant offline」，且不渲染任何殘缺草稿。',
                'Given 客服編輯了草稿，when 回覆送出，then 編輯 diff 連同工單 id 儲存，並標記為語氣訊號。',
                'Given 草稿引用了政策，when 該引用未通過檢索比對，then 建議降級為僅供草稿並移除引用。',
                'Given 一串超過 12 輪的工單，when 客服打開編輯器，then 不提供草稿，顯示標準編輯器。',
                'Given 某位客服一週內原文照收率超過 90%，when 週檢視執行，then 對 support ops 發出 coaching 標記——絕不鎖帳號。',
                'Given 一封已送出的回覆被標記有誤，when 標記送出，then 更正範本與回報路徑在同一工單視圖內開啟。',
            ],
        },
    },
    {
        id: 'questions',
        title: { en: '7 · Open questions', zh: '7 · Open questions 未決問題' },
        body: {
            en: [
                'Where does τ live long-term — per team, per ticket shape, or per agent? The pilot says per team, but the variance inside teams is bigger than the variance between them.',
                'Does the correction template actually repair customer trust, or does it just close the loop for us? We have no outcome data on whether a good apology works.',
                'The docs-decay insight (I4) keeps resurfacing: if drafts quietly compensate for stale articles, are we subsidizing the rot we should be fixing?',
            ],
            zh: [
                'τ 長期應該放在哪一層——每團隊、每工單型態，還是每位客服？試點結果支持每團隊，但團隊內部的變異比團隊之間還大。',
                '更正範本真的能修復客戶信任，還是只是替我們把流程閉環？關於一封好的道歉信是否有效，我們沒有任何結果資料。',
                '文件腐化的洞見（I4）不斷浮上來：如果草稿在安靜地替過期文章擦屁股，我們是不是正在補貼那個本來該修好的爛攤子？',
            ],
        },
    },
    {
        id: 'log',
        title: { en: '8 · Decision log', zh: '8 · Decision log 決策記錄' },
        log: [
            {
                date: '2026-03-14',
                decision: { en: 'Three-level confidence badge', zh: '三段式 confidence 標記' },
                rejected: { en: 'Numeric confidence score', zh: '數值化信心分數' },
                reason: { en: 'Experiment: two decimal places read as authority; as-is acceptance jumped 11 points on low-confidence drafts.', zh: '實驗結果：小數點兩位被讀成權威；低信心草稿的原文照收率跳升 11 個百分點。' },
            },
            {
                date: '2026-04-02',
                decision: { en: 'Per-ticket confidence', zh: '逐工單 confidence' },
                rejected: { en: 'Session-level averages', zh: 'Session 層級平均' },
                reason: { en: 'Agents judge one ticket at a time (insight I3); averages hide the failures that matter.', zh: '客服一次只判斷一張工單（洞見 I3）；平均值把最要緊的失敗藏起來。' },
            },
            {
                date: '2026-04-21',
                decision: { en: 'Below τ: send requires an edit', zh: '低於 τ：送出前必須編輯' },
                rejected: { en: 'Hard block on low confidence', zh: '低信心直接封鎖送出' },
                reason: { en: 'A hard block turns τ into a wall agents route around; requiring an edit keeps judgment in the loop without theater.', zh: '硬性封鎖會讓 τ 變成一堵客服繞路的牆；要求編輯讓判斷留在迴圈裡，而且不用演戲。' },
            },
        ],
    },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 04 — LAUNCH ARTIFACT',
        title: 'PRD-lite: Draft-Reply Copilot',
        lead: 'A product requirements document written all the way through, not a template with headings. The amber notes mark the trade-offs I would defend in a review — the document doubles as a writing sample.',
        context: 'Scenario: “Meridian” v1, the opportunity that Module 01 scores as the safest first build.',
        signature: 'Signature interaction: the acceptance criteria are checkable — walk the list like a reviewer.',
        readingTime: 'Reading time: 6 min',
        tocLabel: 'CONTENTS',
        inLabel: 'IN',
        outLabel: 'OUT — each with its why',
        logHeaders: { date: 'Date', decision: 'Decision', rejected: 'Rejected option', reason: 'Why' },
        criteriaHint: 'Checkboxes are local to this visit — nothing is saved.',
    },
    zh: {
        eyebrow: 'MODULE 04 — LAUNCH ARTIFACT',
        title: 'PRD-lite：草稿回覆 Copilot',
        lead: '一份從頭寫到尾的產品需求文件，不是掛著標題的範本。琥珀色註記標出我願意在評審會議上捍衛的取捨——這份文件同時是一份 writing sample。',
        context: '情境：「Meridian」v1，即 Module 01 評為最穩第一步的那個機會。',
        signature: '招牌互動：acceptance criteria 可以逐條勾選——像審查者一樣走一遍。',
        readingTime: '閱讀時間：6 分鐘',
        tocLabel: 'CONTENTS',
        inLabel: 'IN',
        outLabel: 'OUT——每一項附上原因',
        logHeaders: { date: '日期', decision: '決策', rejected: '放棄的選項', reason: '理由' },
        criteriaHint: '勾選狀態僅存在於本次瀏覽——不會被儲存。',
    },
};

// ---- pieces -----------------------------------------------------------------
const Annotation = ({ text }) => (
    <aside className="los-m5-annotation">
        <span className="los-data-sm los-m5-annotation-tag">DECISION NOTE</span>
        <p>{text}</p>
    </aside>
);

function SectionBody({ section, lang, t, checks, onCheck }) {
    return (
        <>
            {(section.body?.[lang] || []).map((para, i) => <p className="los-m5-para" key={i}>{para}</p>)}
            {section.goals && (
                <>
                    <h5 className="los-data-sm los-m5-sublabel">{section.goals.label[lang]}</h5>
                    <ul className="los-m5-list">
                        {section.goals.items[lang].map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <h5 className="los-data-sm los-m5-sublabel">{section.nonGoals.label[lang]}</h5>
                    <ul className="los-m5-list is-nongoals">
                        {section.nonGoals.items[lang].map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </>
            )}
            {section.scopeIn && (
                <div className="los-m5-scope">
                    <div>
                        <h5 className="los-data-sm los-m5-sublabel">{t.inLabel}</h5>
                        <ul className="los-m5-list">
                            {section.scopeIn[lang].map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h5 className="los-data-sm los-m5-sublabel">{t.outLabel}</h5>
                        <ul className="los-m5-list is-out">
                            {section.scopeOut[lang].map((row, i) => (
                                <li key={i}><strong>{row.item}</strong><span>{row.why}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {section.reqs && section.reqs.map((req, i) => (
                <div className="los-m5-req" key={i}>
                    <h5 className="los-m5-req-name">{req.name[lang]}</h5>
                    <p className="los-m5-para">{req.body[lang]}</p>
                    {req.annotation && <Annotation text={req.annotation[lang]} />}
                </div>
            ))}
            {section.criteria && (
                <>
                    <ul className="los-m5-criteria">
                        {section.criteria[lang].map((criterion, i) => (
                            <li key={i}>
                                <label className="los-m5-criterion">
                                    <input
                                        type="checkbox"
                                        checked={!!checks[i]}
                                        onChange={() => onCheck(i)}
                                    />
                                    <span>{criterion}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <p className="los-data-sm los-m5-hint">{t.criteriaHint}</p>
                </>
            )}
            {section.log && (
                <div className="los-m5-logwrap">
                    <table className="los-m5-log">
                        <thead>
                            <tr>
                                <th>{t.logHeaders.date}</th>
                                <th>{t.logHeaders.decision}</th>
                                <th>{t.logHeaders.rejected}</th>
                                <th>{t.logHeaders.reason}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {section.log.map(entry => (
                                <tr key={entry.date}>
                                    <td className="los-data-sm">{entry.date}</td>
                                    <td>{entry.decision[lang]}</td>
                                    <td>{entry.rejected[lang]}</td>
                                    <td>{entry.reason[lang]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {section.annotation && <Annotation text={section.annotation[lang]} />}
        </>
    );
}

// ---- module ------------------------------------------------------------------
export default function PRDLiteDocument() {
    const { lang, t } = useI18n(COPY);
    const viewport = useViewport();
    const reducedMotion = usePrefersReducedMotion();
    const [activeSection, setActiveSection] = useState('problem');
    const [checks, setChecks] = useState({});
    const [progress, setProgress] = useState(0);
    const articleRef = useRef(null);

    const onCheck = i => setChecks(prev => ({ ...prev, [i]: !prev[i] }));

    useEffect(() => {
        const article = articleRef.current;
        if (!article) return;
        const headings = article.querySelectorAll('[data-section-id]');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.dataset.sectionId);
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        headings.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [lang]);

    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const article = articleRef.current;
                if (!article) return;
                const rect = article.getBoundingClientRect();
                const total = rect.height - window.innerHeight;
                const read = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
                setProgress(read);
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, []);

    const scrollToSection = id => {
        document.getElementById(`los-m5-section-${id}`)
            ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    };

    const toc = (
        <nav className={`los-m5-toc${viewport === 'desktop' ? '' : ' is-chips'}`} aria-label={t.tocLabel}>
            <span className="los-eyebrow los-m5-toc-label">{t.tocLabel}</span>
            <ul>
                {SECTIONS.map(section => (
                    <li key={section.id}>
                        <button
                            className={`los-m5-toc-item${activeSection === section.id ? ' is-active' : ''}`}
                            aria-current={activeSection === section.id ? 'true' : undefined}
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.title[lang]}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );

    return (
        <ModuleFrame
            id="los-module-prd"
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
            context={t.context}
            roles={['TECHNICAL PM', 'AI PM']}
            signature={t.signature}
        >
            <div className="los-m5-progress" aria-hidden="true">
                <div className="los-m5-progress-fill" style={{ width: `${(progress * 100).toFixed(1)}%` }} />
            </div>
            <div className="los-m5-meta">
                <span className="los-data-sm">{t.readingTime}</span>
            </div>
            <div className={`los-m5-layout is-${viewport}`}>
                {toc}
                <article className="los-m5-article" ref={articleRef}>
                    {SECTIONS.map(section => (
                        <section
                            key={section.id}
                            id={`los-m5-section-${section.id}`}
                            data-section-id={section.id}
                            className="los-m5-section"
                            aria-label={section.title[lang]}
                        >
                            <h4 className="los-m5-section-title">{section.title[lang]}</h4>
                            <SectionBody section={section} lang={lang} t={t} checks={checks} onCheck={onCheck} />
                        </section>
                    ))}
                </article>
            </div>
        </ModuleFrame>
    );
}

// ---- styles ---------------------------------------------------------------------
injectStyles('los-m5-styles', `
.los-m5-progress {
  position: sticky; top: 0; z-index: 2;
  height: 2px; background: var(--line-1); border-radius: 1px;
  margin-bottom: 12px;
}
.los-m5-progress-fill { height: 100%; background: var(--teal); border-radius: 1px; }
.los-m5-meta { display: flex; justify-content: flex-end; color: var(--text-3); margin-bottom: 16px; }
.los-m5-layout { display: grid; grid-template-columns: 240px minmax(0, 680px); gap: 40px; }
.los-m5-layout.is-tablet, .los-m5-layout.is-mobile { grid-template-columns: 1fr; gap: 20px; }
.los-m5-layout > * { min-width: 0; }

.los-m5-toc { align-self: start; position: sticky; top: 80px; }
.los-m5-toc-label { display: block; margin-bottom: 10px; }
.los-m5-toc ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.los-m5-toc-item {
  display: block; width: 100%;
  font-size: 13px; line-height: 1.45; color: var(--text-3);
  padding: 6px 10px; border-left: 2px solid var(--line-1);
  transition: color 200ms var(--ease), border-color 200ms var(--ease);
}
.los-m5-toc-item:hover { color: var(--text-2); }
.los-m5-toc-item.is-active { color: var(--teal); border-left-color: var(--teal); }
.los-m5-toc.is-chips { position: static; }
.los-m5-toc.is-chips ul { flex-direction: row; overflow-x: auto; gap: 6px; padding-bottom: 6px; }
.los-m5-toc.is-chips .los-m5-toc-item {
  white-space: nowrap; border: 1px solid var(--line-1); border-radius: var(--radius-sm);
  padding: 5px 10px; font-size: 12px;
}
.los-m5-toc.is-chips .los-m5-toc-item.is-active { border-color: var(--teal); }

.los-m5-section { margin-bottom: 40px; scroll-margin-top: 90px; }
.los-m5-section-title {
  font-family: var(--font-display); font-size: 22px; font-weight: 500;
  color: var(--text-1); margin: 0 0 14px;
}
.los-m5-para { font-size: 15px; line-height: 1.75; color: var(--text-2); margin: 0 0 14px; }
.los-m5-sublabel { text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-3); margin: 18px 0 8px; }
.los-m5-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.los-m5-list li { font-size: 14px; line-height: 1.65; color: var(--text-2); padding-left: 16px; position: relative; }
.los-m5-list li::before { content: '·'; position: absolute; left: 2px; color: var(--teal); }
.los-m5-list.is-nongoals li::before { content: '×'; color: var(--text-3); }
.los-m5-list.is-out li::before { content: '×'; color: var(--text-3); }
.los-m5-list.is-out strong { display: block; color: var(--text-1); font-weight: 500; }
.los-m5-list.is-out span { color: var(--text-3); font-size: 13px; }
.los-m5-scope { display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; }

.los-m5-annotation {
  border-left: 2px solid var(--amber);
  background: var(--amber-dim);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: 10px 14px; margin: 16px 0;
}
.los-m5-annotation-tag { color: var(--amber); letter-spacing: 0.12em; }
.los-m5-annotation p { font-size: 13.5px; line-height: 1.65; color: var(--text-2); margin: 4px 0 0; font-style: italic; }

.los-m5-req { margin-top: 20px; }
.los-m5-req-name { font-size: 15px; font-weight: 600; color: var(--text-1); margin: 0 0 6px; }

.los-m5-criteria { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.los-m5-criterion { display: flex; gap: 10px; align-items: flex-start; cursor: pointer; }
.los-m5-criterion input {
  margin-top: 4px; accent-color: var(--teal);
  width: 14px; height: 14px; flex-shrink: 0; cursor: pointer;
}
.los-m5-criterion span { font-size: 13.5px; line-height: 1.6; color: var(--text-2); }
.los-m5-criterion input:checked + span { color: var(--text-3); }
.los-m5-hint { color: var(--text-3); margin: 10px 0 0; }

.los-m5-logwrap { overflow-x: auto; }
.los-m5-log { width: 100%; border-collapse: collapse; min-width: 560px; }
.los-m5-log th {
  font-family: var(--font-data); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-3); text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line-2);
}
.los-m5-log td {
  font-size: 13px; line-height: 1.55; color: var(--text-2);
  padding: 10px; border-bottom: 1px solid var(--line-1); vertical-align: top;
}

@media (max-width: 767px) {
  .los-m5-scope { grid-template-columns: 1fr; }
}
`);
