import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// The document itself is the artifact: a full PRD-lite for Meridian's
// draft-reply assistant, written end to end in both languages.
// ✅ 文案優化：保留原本 PRD 結構與互動，只讓內容更自然、可讀、接近真實產品案例。

const SECTIONS = [
    {
        id: 'problem',
        title: {
            en: '1 · Problem',
            zh: '1 · 問題：為什麼需要這個產品',
        },
        body: {
            en: [
                'Meridian is designed for frontline support teams that answer a high volume of repeat questions every day. In the accounts we are targeting, agents often handle 40–60 tickets per shift. A large share of those tickets are not new problems — they are familiar requests like password resets, plan changes, invoice copies, and export limits.',
                'The work looks simple from the outside because the answers already exist. But that is exactly where mistakes happen. When agents answer the same question for the fifth or sixth time in a day, attention drops, small details are easier to miss, and the cost of a wrong reply still lands on the person who sends it.',
                'The opportunity is not to replace the agent. It is to help the agent stay careful at the moment when the work has become repetitive.',
            ],
            zh: [
                'Meridian 服務的是每天需要處理大量重複問題的一線客服團隊。在目標客戶中，客服一個班次通常要處理 40–60 張工單，其中相當多並不是全新的問題，而是密碼重設、方案變更、發票副本、匯出上限這類反覆出現的請求。',
                '從外部看，這些工作好像很簡單，因為答案早就存在。但真正容易出錯的地方也在這裡：當客服一天中第五次、第六次回答類似問題時，注意力會下降，細節更容易看漏，而錯誤回覆的責任仍然會落在送出的人身上。',
                '這個產品的機會不是取代客服，而是在工作變得重複、注意力開始消耗的時候，幫助客服維持原本的謹慎。',
            ],
        },
    },
    {
        id: 'moment',
        title: {
            en: '2 · User moment',
            zh: '2 · 使用情境：錯誤通常發生在哪一刻',
        },
        body: {
            en: [
                'It is 4:10 on a Thursday. Ren has already closed thirty-nine tickets. The next one is another export-limit question — the third time today. She knows the answer, so she starts typing quickly, half-reading the details, and accidentally uses the limit for the wrong plan.',
                'The customer replies twenty minutes later, polite but confused. What should have been an easy ticket has now become a repair job.',
                'Meridian should help in exactly that moment: when the answer is familiar enough to make the agent move fast, but still specific enough that the details matter. The assistant should offer a careful draft, show where the answer comes from, and leave the final judgment to Ren.',
            ],
            zh: [
                '星期四下午四點十分。Ren 已經處理完三十九張工單，下一張又是匯出上限的問題，今天第三次。她其實知道答案，所以開始很快地打字，只大概掃過細節，結果不小心用了錯誤方案的上限數字。',
                '二十分鐘後，客戶回信了，語氣禮貌但困惑。原本應該很快解決的一張工單，現在變成需要補救的問題。',
                'Meridian 要介入的正是這個時刻：答案熟到讓客服容易加速，但細節又重要到不能出錯。助理應該提供一份謹慎的草稿，清楚標出答案來源，並把最後判斷留給 Ren。',
            ],
        },
        annotation: {
            en: 'This scene shaped the rest of the PRD. The product is not mainly about typing faster. It is about helping agents stay accurate when repetitive work makes accuracy harder.',
            zh: '這個場景決定了後面的需求方向。這個產品的核心不是讓客服打字更快，而是在重複工作讓人更容易分心時，幫助客服維持準確。',
        },
    },
    {
        id: 'goals',
        title: {
            en: '3 · Goals and non-goals',
            zh: '3 · 目標與非目標',
        },
        goals: {
            label: { en: 'Goals', zh: '目標' },
            items: {
                en: [
                    'Reduce the median handling time for common support tickets without increasing reopen rates.',
                    'Keep the agent as the visible author. Every sent reply should still reflect an explicit human review or edit.',
                    'Help agents understand when to trust a draft and when to slow down.',
                ],
                zh: [
                    '降低常見客服工單的處理時間，同時不提高工單重開率。',
                    '讓客服始終是可見的作者。每一封送出的回覆，都必須經過明確的人類檢查或編輯。',
                    '幫助客服判斷什麼時候可以相信草稿，什麼時候應該放慢速度再確認。',
                ],
            },
        },
        nonGoals: {
            label: { en: 'Non-goals', zh: '非目標' },
            items: {
                en: [
                    'Meridian v1 will not send replies automatically. If the product cannot create value while a human reviews every draft, it has not earned more autonomy.',
                    'Meridian will not rank or monitor agents. Usage data is for product improvement, not people evaluation.',
                    'Meridian v1 will not cover complex billing disputes or highly customized support cases. Those may look draftable, but “sometimes plausible” is not safe enough for launch.',
                ],
                zh: [
                    'Meridian v1 不做自動送出。如果這個產品在每封回覆都有人類檢查的情況下都無法創造價值，那它還沒有資格談更高程度的自動化。',
                    'Meridian 不用來排名或監控客服。使用資料只用於產品改善，不作為人員評比。',
                    'Meridian v1 不涵蓋複雜帳務爭議或高度客製化的客服案件。這些情境有時看起來也能生成草稿，但「偶爾看似合理」還不足以上線。',
                ],
            },
        },
        annotation: {
            en: 'The non-goals matter because they protect the product from becoming a surveillance tool or an unsafe automation feature. They also make the first version easier to evaluate.',
            zh: '非目標很重要，因為它們保護產品不會變成監控工具，也避免第一版過早走向不安全的自動化。範圍清楚，第一版才更容易被驗證。',
        },
    },
    {
        id: 'scope',
        title: {
            en: '4 · Scope: what is in and out',
            zh: '4 · 範圍：這一版做什麼、不做什麼',
        },
        scopeIn: {
            en: [
                'Draft replies for the most common support ticket types',
                'Source passages shown beside each draft',
                'A simple three-level trust indicator',
                'A human review path when the assistant is unsure',
                'Agent edits captured as product feedback',
            ],
            zh: [
                '為最常見的客服工單提供回覆草稿',
                '在每份草稿旁顯示答案來源段落',
                '提供簡單的三段式信任提示',
                '當助理不確定時，導向人工優先檢查',
                '將客服的編輯紀錄作為產品改善回饋',
            ],
        },
        scopeOut: {
            en: [
                {
                    item: 'Automatic sending',
                    why: 'Replies should not reach customers without a human review in v1.',
                },
                {
                    item: 'Shift-level summaries',
                    why: 'Research shows agents need help inside the ticket they are currently handling, not in a separate summary view.',
                },
                {
                    item: 'Tone personalization based on customer demographics',
                    why: 'This introduces unnecessary risk. Account type and ticket context are enough for v1.',
                },
                {
                    item: 'Additional languages beyond English and Traditional Chinese',
                    why: 'Mixed-language tickets are already complex enough for the first release.',
                },
            ],
            zh: [
                {
                    item: '自動送出',
                    why: 'v1 不讓任何回覆在未經人類檢查的情況下直接送到客戶端。',
                },
                {
                    item: '班次層級摘要',
                    why: '研究顯示，客服需要的是眼前這張工單中的協助，而不是另一個需要額外打開的摘要畫面。',
                },
                {
                    item: '依客戶人口屬性調整語氣',
                    why: '這會帶來不必要的風險。第一版只需要依照帳戶類型與工單情境調整即可。',
                },
                {
                    item: '英文與繁中以外的語言',
                    why: '中英混合工單已經是第一版需要處理的高複雜情境，不應在尚未穩定前繼續擴張語言範圍。',
                },
            ],
        },
    },
    {
        id: 'ai-reqs',
        title: {
            en: '5 · AI-specific requirements',
            zh: '5 · AI 相關需求',
        },
        reqs: [
            {
                name: {
                    en: 'Trust indicator',
                    zh: '信任提示',
                },
                body: {
                    en: 'Each draft shows one of three trust levels. When the system is confident, the draft opens with source passages beside it. When the system is unsure, the draft appears in a more cautious state: the agent can still open and edit it, but cannot send it without making at least one change.',
                    zh: '每份草稿都會顯示三段式信任提示。當系統判斷把握較高時，草稿會完整展開，旁邊附上來源段落。當系統不確定時，草稿會以較謹慎的狀態呈現：客服仍然可以打開與編輯，但至少要修改過一次，才能送出。',
                },
                annotation: {
                    en: 'I chose a simple trust indicator instead of a numeric confidence score because decimals can create false authority. Agents need a review cue, not a score that pretends to be precise.',
                    zh: '我選擇簡單的信任提示，而不是數值化信心分數，因為小數點很容易製造過度精準的錯覺。客服需要的是檢查提醒，而不是一個看起來像絕對答案的分數。',
                },
            },
            {
                name: {
                    en: 'Fallback states',
                    zh: '備援狀態',
                },
                body: {
                    en: 'If the assistant is slow, unavailable, or unable to verify its sources, the editor should clearly explain what changed. In the lightest case, the system can show template suggestions. If source verification fails, the citation should be removed or marked. If the assistant is fully unavailable, the editor should return to the normal pre-AI experience.',
                    zh: '當助理變慢、暫時無法使用，或無法確認答案來源時，編輯器必須清楚告訴客服目前發生了什麼。最輕微的情況下，系統可以改提供範本建議；如果來源無法驗證，引用應該被移除或標示；如果助理完全不可用，編輯器應回到原本沒有 AI 的使用狀態。',
                },
                annotation: {
                    en: 'Fallback is a user experience requirement, not only an engineering concern. Agents make their next move based on whether a draft is coming, so the product must be honest about its state.',
                    zh: '備援不是單純的工程問題，而是使用者體驗問題。客服會根據「草稿到底會不會出現」來決定下一步，因此產品必須誠實呈現自己的狀態。',
                },
            },
            {
                name: {
                    en: 'Wrong-reply recovery',
                    zh: '錯誤回覆的補救流程',
                },
                body: {
                    en: 'If a sent reply is later found to be wrong, the agent or lead can flag it inside the same ticket. The product should open a correction template, save the draft, the sources, and the edit history, and route the case to review. If the same ticket type produces repeated confirmed errors, drafting for that ticket type should be paused until it is reviewed.',
                    zh: '如果已送出的回覆事後被發現有誤，客服或主管可以在同一張工單內標記。產品應開啟更正範本，保存原草稿、來源與編輯紀錄，並將該案例送入審查。如果同一種工單類型重複出現確認錯誤，該類型應暫停產生草稿，直到重新檢查完成。',
                },
            },
            {
                name: {
                    en: 'Learning from edits',
                    zh: '從客服編輯中學習',
                },
                body: {
                    en: 'Agent edits should be treated as context and tone feedback, not automatic proof that the original draft was factually wrong. A sample of edits should be reviewed weekly and used to improve future drafts. Acceptance metrics are for product improvement only and should never appear in people-performance dashboards.',
                    zh: '客服的編輯應被視為情境與語氣回饋，而不是自動判定原草稿事實錯誤。團隊應每週抽樣檢視編輯紀錄，並用來改善後續草稿。採用率與編輯資料只能用於產品改善，不能出現在人員績效儀表板中。',
                },
                annotation: {
                    en: 'An edit can make a wrong answer sound more convincing. That is why edits should inform tone and workflow learning, but should not be blindly treated as factual correction data.',
                    zh: '一次編輯可能只是讓錯誤答案聽起來更有說服力。因此，編輯可以幫助產品理解語氣與工作流程，但不能被盲目當作事實修正資料。',
                },
            },
        ],
    },
    {
        id: 'acceptance',
        title: {
            en: '6 · Acceptance criteria',
            zh: '6 · 驗收條件',
        },
        criteria: {
            en: [
                'When an agent opens a common support ticket, the reply editor should show a draft with source passages within 2 seconds. If it cannot, the fallback state should appear instead.',
                'When a draft is marked as uncertain, the agent should be able to open and edit it, but sending should stay disabled until at least one edit is made.',
                'When the assistant is unavailable, the editor should clearly show that state and avoid displaying partial or unfinished drafts.',
                'When an agent edits a draft and sends the reply, the edit history should be saved with the ticket as product feedback.',
                'When a draft includes a policy reference, the product should only show that reference if it passes source verification.',
                'When a ticket thread is too long or too complex for the current version, the product should not offer a draft and should return to the standard editor.',
                'When an agent accepts nearly all drafts without editing over a week, support ops should receive a coaching signal. This should never become an automatic lockout or performance penalty.',
                'When a sent reply is flagged as wrong, the correction template and reporting path should open inside the same ticket view.',
            ],
            zh: [
                '客服打開常見類型的工單時，回覆編輯器應在 2 秒內顯示附來源段落的草稿；如果無法做到，應顯示清楚的備援狀態。',
                '當草稿被標記為不確定時，客服仍可打開與編輯，但在至少修改一次之前，送出按鈕應保持停用。',
                '當助理暫時無法使用時，編輯器應清楚顯示目前狀態，並避免出現半完成或殘缺的草稿。',
                '客服修改草稿並送出後，編輯紀錄應與工單一起保存，作為後續產品改善回饋。',
                '當草稿引用政策或文件內容時，只有通過來源驗證的引用才應顯示。',
                '當工單對話太長或情境超出第一版能力範圍時，產品不應提供草稿，並應回到標準編輯器。',
                '如果某位客服一週內幾乎都原文接受草稿，support ops 應收到 coaching 提醒；這不應成為自動鎖定或績效懲罰。',
                '當已送出的回覆被標記為錯誤時，更正範本與回報路徑應在同一張工單視圖內開啟。',
            ],
        },
    },
    {
        id: 'questions',
        title: {
            en: '7 · Open questions',
            zh: '7 · 未決問題',
        },
        body: {
            en: [
                'Should the trust threshold be adjusted by team, ticket type, or individual agent behavior? The pilot suggests team-level settings, but there may be meaningful variation within the same team.',
                'Does a correction template actually repair customer trust, or does it only help the internal team close the loop? We still need outcome data from real correction cases.',
                'If AI drafts quietly compensate for outdated help-center articles, are we hiding a documentation problem that should be fixed at the source?',
            ],
            zh: [
                '信任門檻應該依團隊、工單類型，還是個別客服行為調整？試點結果目前偏向團隊層級，但同一團隊內也可能存在重要差異。',
                '更正範本真的能修復客戶信任，還是只是幫內部團隊把流程補完？我們仍需要來自真實更正案例的結果資料。',
                '如果 AI 草稿默默補上了過期說明文件的缺口，我們是不是反而把一個本該從源頭修正的文件問題藏起來了？',
            ],
        },
    },
    {
        id: 'log',
        title: {
            en: '8 · Decision log',
            zh: '8 · 決策記錄',
        },
        log: [
            {
                date: '2026-03-14',
                decision: {
                    en: 'Use a three-level trust indicator',
                    zh: '採用三段式信任提示',
                },
                rejected: {
                    en: 'Numeric confidence score',
                    zh: '數值化信心分數',
                },
                reason: {
                    en: 'In testing, numeric scores made uncertain drafts feel more authoritative than they were.',
                    zh: '測試中，數值分數讓不確定的草稿看起來比實際上更有權威感。',
                },
            },
            {
                date: '2026-04-02',
                decision: {
                    en: 'Evaluate trust per ticket',
                    zh: '逐張工單判斷可信度',
                },
                rejected: {
                    en: 'Session-level average score',
                    zh: '班次層級平均分數',
                },
                reason: {
                    en: 'Agents make decisions one ticket at a time. Averages can hide the exact cases that need caution.',
                    zh: '客服一次只判斷一張工單。平均分數可能剛好藏住最需要小心的個案。',
                },
            },
            {
                date: '2026-04-21',
                decision: {
                    en: 'Require an edit before sending uncertain drafts',
                    zh: '不確定草稿送出前必須經過編輯',
                },
                rejected: {
                    en: 'Hard block all uncertain drafts',
                    zh: '直接封鎖所有不確定草稿',
                },
                reason: {
                    en: 'A hard block removes judgment from the workflow. Requiring an edit keeps the agent in control while still slowing down risky sends.',
                    zh: '直接封鎖會把人的判斷從流程中拿掉。要求編輯可以讓客服保有控制權，同時放慢高風險送出的速度。',
                },
            },
        ],
    },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 04 — LAUNCH ARTIFACT',
        title: 'PRD-lite: Draft Reply Assistant',
        lead: [
            'This module presents a lightweight product requirements document for Meridian’s first release.',
            'Instead of showing a blank PRD template, it demonstrates how product decisions, AI boundaries, user moments, scope trade-offs, and acceptance criteria can be written clearly enough for design, engineering, and business teams to review together.',
        ],
        context: 'Scenario: “Meridian” v1, the draft-reply opportunity selected as the safest first build in Module 01.',
        signature: 'Signature interaction: review the acceptance criteria like a product reviewer and check them off as you go.',
        readingTime: 'Reading time: 6 min',
        tocLabel: 'CONTENTS',
        inLabel: 'IN',
        outLabel: 'OUT — with rationale',
        logHeaders: {
            date: 'Date',
            decision: 'Decision',
            rejected: 'Rejected option',
            reason: 'Why',
        },
        criteriaHint: 'Checkboxes are local to this visit — nothing is saved.',
    },
    zh: {
        eyebrow: 'MODULE 04 — LAUNCH ARTIFACT',
        title: 'PRD-lite：客服草稿回覆助手',
        lead: [
            '這個模組是一份為 Meridian 第一版設計的輕量產品需求文件。',
            '它不是空白 PRD 範本，而是示範如何把產品判斷、AI 邊界、使用者情境、範圍取捨與驗收條件，寫成設計、工程與商業團隊都能一起審查的文件。',
        ],
        context: '情境：「Meridian」v1，延續 Module 01 中被選為最適合先做的草稿回覆機會。',
        signature: '你可以像產品審查者一樣逐條檢查驗收條件，並在閱讀過程中勾選確認。',
        readingTime: '閱讀時間：6 分鐘',
        tocLabel: 'CONTENTS',
        inLabel: 'IN',
        outLabel: 'OUT——每一項附上原因',
        logHeaders: {
            date: '日期',
            decision: '決策',
            rejected: '放棄的選項',
            reason: '理由',
        },
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
            {(section.body?.[lang] || []).map((para, i) => (
                <p className="los-m5-para" key={i}>
                    {para}
                </p>
            ))}

            {section.goals && (
                <>
                    <h5 className="los-data-sm los-m5-sublabel">
                        {section.goals.label[lang]}
                    </h5>
                    <ul className="los-m5-list">
                        {section.goals.items[lang].map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>

                    <h5 className="los-data-sm los-m5-sublabel">
                        {section.nonGoals.label[lang]}
                    </h5>
                    <ul className="los-m5-list is-nongoals">
                        {section.nonGoals.items[lang].map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </>
            )}

            {section.scopeIn && (
                <div className="los-m5-scope">
                    <div>
                        <h5 className="los-data-sm los-m5-sublabel">
                            {t.inLabel}
                        </h5>
                        <ul className="los-m5-list">
                            {section.scopeIn[lang].map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 className="los-data-sm los-m5-sublabel">
                            {t.outLabel}
                        </h5>
                        <ul className="los-m5-list is-out">
                            {section.scopeOut[lang].map((row, i) => (
                                <li key={i}>
                                    <strong>{row.item}</strong>
                                    <span>{row.why}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {section.reqs && section.reqs.map((req, i) => (
                <div className="los-m5-req" key={i}>
                    <h5 className="los-m5-req-name">
                        {req.name[lang]}
                    </h5>
                    <p className="los-m5-para">
                        {req.body[lang]}
                    </p>
                    {req.annotation && (
                        <Annotation text={req.annotation[lang]} />
                    )}
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
                    <p className="los-data-sm los-m5-hint">
                        {t.criteriaHint}
                    </p>
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
                                    <td className="los-data-sm">
                                        {entry.date}
                                    </td>
                                    <td>{entry.decision[lang]}</td>
                                    <td>{entry.rejected[lang]}</td>
                                    <td>{entry.reason[lang]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {section.annotation && (
                <Annotation text={section.annotation[lang]} />
            )}
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
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.dataset.sectionId);
                }
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

        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    const scrollToSection = id => {
        document.getElementById(`los-m5-section-${id}`)
            ?.scrollIntoView({
                behavior: reducedMotion ? 'auto' : 'smooth',
                block: 'start',
            });
    };

    const toc = (
        <nav className={`los-m5-toc${viewport === 'desktop' ? '' : ' is-chips'}`} aria-label={t.tocLabel}>
            <span className="los-eyebrow los-m5-toc-label">
                {t.tocLabel}
            </span>

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
                <div
                    className="los-m5-progress-fill"
                    style={{ width: `${(progress * 100).toFixed(1)}%` }}
                />
            </div>

            <div className="los-m5-meta">
                <span className="los-data-sm">
                    {t.readingTime}
                </span>
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
                            <h4 className="los-m5-section-title">
                                {section.title[lang]}
                            </h4>

                            <SectionBody
                                section={section}
                                lang={lang}
                                t={t}
                                checks={checks}
                                onCheck={onCheck}
                            />
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