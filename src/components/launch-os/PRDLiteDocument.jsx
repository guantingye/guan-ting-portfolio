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
                'Meridian’s frontline support agents handle a high volume of similar tickets every day. Each agent completes roughly 40–60 tickets per shift; a substantial share are not new problems but recurring requests such as password resets, plan changes, invoice copies, and export limits.',
                'These tasks do not look complex on the surface, but the real risk emerges after high repetition. When agents rewrite similar content many times in a day, attention gradually declines: they may miss conditional differences, cite outdated information, or fail to reconfirm crucial details before sending. Even when the answer already exists, the agent still bears responsibility for an incorrect reply.',
                'Meridian v1’s opportunity is not to replace agents. It is to offer a source-backed, editable reply draft that must be human-confirmed at the moments when repetitive work most readily drains attention—helping agents start faster while retaining final judgment.',
            ],
            zh: [
                'Meridian 的第一線客服每天需要處理大量內容相似的工單。每位客服一個班次約需完成 40–60 張工單，其中相當一部分並不是新的問題，而是密碼重設、方案異動、發票副本與匯出限制等反覆出現的請求。',
                '這些工作表面上並不複雜，真正的風險卻出現在高度重複之後。當客服在一天內多次重新撰寫相似內容，注意力會逐漸下降，容易漏掉條件差異、引用過期資訊，或在送出前沒有再次確認關鍵細節。即使答案早已存在，最後承擔錯誤責任的仍是客服本人。',
                'Meridian v1 的機會不是取代客服，而是在重複工作最容易消耗注意力的時刻，提供一份有來源、可修改且必須由人工確認的回覆草稿，協助客服更快開始，同時保留最後判斷權。',
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
                'At 4:10 p.m. on Thursday, support agent Ren has already handled more than thirty tickets. The next is another familiar export-limit issue—the third similar request she has answered today.',
                'She knows the correct answer. The hard part is not understanding the question, but remembering to check plan differences, applicable conditions, and cited sources even as fatigue accumulates. She quickly rewrites a familiar reply, but omits the export limit for that customer’s plan.',
                'Twenty minutes later, the customer replies to point out that the information was wrong. Ren not only needs to explain again; she also has to bear the loss of trust caused by the incorrect reply.',
                'Meridian should help at this moment: generate a draft from the current ticket and verified knowledge sources, clearly label citations and confidence status, and keep the final editing and sending decision with Ren.',
            ],
            zh: [
                '星期四下午四點十分，客服 Ren 已經處理超過三十張工單。下一張仍然是常見的匯出限制問題，也是她今天第三次回答相似請求。',
                '她知道正確答案，真正困難的不是理解問題，而是在疲勞累積之後，仍然記得檢查方案差異、適用條件與引用來源。她快速重寫了一段熟悉的回覆，卻漏掉該客戶方案的匯出上限。',
                '二十分鐘後，客戶回信指出資訊有誤。Ren 不只需要重新說明，也必須承擔錯誤回覆造成的信任損失。',
                'Meridian 應在這個時刻提供協助：根據當前工單與已驗證的知識來源產生草稿，清楚標示引用依據與信心狀態，並將最後的修改與送出決定保留給 Ren。',
            ],
        },
        annotation: {
            en: 'Decision rationale | This scenario establishes the core value of v1: not merely enabling agents to respond faster, but providing a verifiable starting point when fatigue and repetitive work heighten error risk so they can maintain judgment quality.',
            zh: '決策理由｜這個情境確立了第一版的核心價值：不是讓客服單純回覆得更快，而是在疲勞與重複工作增加錯誤風險時，提供可核對的起稿協助，幫助客服維持判斷品質。',
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
                    'Shorten drafting time for common questions without increasing ticket reopen rates.',
                    'Ensure agents always make the final decision; every reply must be viewed by a human before it is sent.',
                    'Let agents know what a draft is based on, and when to reduce trust, verify again, or handle the case manually.',
                    'Retain draft edit records as evidence for later improvements to knowledge sources and product quality.',
                ],
                zh: [
                    '縮短常見問題的回覆起稿時間，同時不提高工單重新開啟率。',
                    '確保客服始終是最後決定者；所有回覆在送出前都必須經過人工查看。',
                    '讓客服知道草稿根據哪些內容產生，以及何時應降低信任、重新查證或改由人工處理。',
                    '保留草稿修改紀錄，作為後續改善知識來源與產品品質的依據。',
                ],
            },
        },
        nonGoals: {
            label: { en: 'Non-goals', zh: '非目標' },
            items: {
                en: [
                    'Do not automatically send any customer reply. The first version does not pursue unattended automation.',
                    'Do not include agent ranking or performance scoring in product scope. Usage data is used only to improve the product and workflow.',
                    'Do not handle tickets that are highly contentious, highly customized, or require cross-functional judgment. These cases should return to existing human workflows.',
                    'Do not automatically adjust tone according to customer demographic attributes. The first version generates drafts only from account type, ticket context, and confirmed information.',
                    'Do not support multilingual output that has not completed quality validation. The first version focuses on the established support scope for Chinese and English.',
                ],
                zh: [
                    '不自動送出任何客戶回覆。第一版不追求無人介入的自動化。',
                    '不將客服人員排名或績效評分納入產品範圍。使用資料只用於改善產品與流程。',
                    '不處理高爭議、高客製或需要跨部門判斷的工單。這些情境應回到既有人工流程。',
                    '不依不同客戶人口屬性自動調整語氣。第一版只依帳戶類型、工單情境與已確認資訊產生草稿。',
                    '不支援尚未完成品質驗證的多語言輸出。第一版先聚焦中文與英文的既定支援範圍。',
                ],
            },
        },
        annotation: {
            en: 'Decision rationale | Non-goals protect the safety boundary of the first version. Explicitly stating what the product will not do prevents it from prematurely moving toward auto-send, performance monitoring, or complex situations it cannot handle reliably, and makes validation results easier to interpret.',
            zh: '決策理由｜非目標用來保護第一版的安全邊界。明確說明不做什麼，可以避免產品過早走向自動送出、績效監控或無法穩定處理的複雜情境，也讓驗證結果更容易解讀。',
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
                'Generate editable reply drafts for common, low-contention tickets.',
                'Show the cited knowledge sources and applicable content beside each draft.',
                'Present confidence status with high / medium / low labels.',
                'Prioritize human review when sources are incomplete, content conflicts, or confidence is insufficient.',
                'Record agents’ edits and final adoption status as signals for product improvement.',
                'Embed drafts directly in the existing ticket reply interface rather than requiring agents to switch tools.',
            ],
            zh: [
                '為常見、低爭議工單產生可編輯的回覆草稿。',
                '在每份草稿旁標示所引用的知識來源與適用內容。',
                '以高／中／低三段式標籤呈現信心狀態。',
                '在來源不完整、內容衝突或信心不足時，優先提示人工檢查。',
                '將客服的修改與最終採用狀態記錄為產品改善訊號。',
                '將草稿直接嵌入現有工單回覆介面，不要求客服切換工具。',
            ],
        },
        scopeOut: {
            en: [
                {
                    item: 'Automatic sending',
                    why: 'Every reply must be reviewed and actively sent by an agent before it reaches the customer.',
                },
                {
                    item: 'Shift-level summaries',
                    why: 'The first version focuses on real-time assistance in the current ticket and does not add a summary dashboard that must be opened separately.',
                },
                {
                    item: 'Tone adjustment based on demographic attributes',
                    why: 'The first version does not rewrite tone according to age, gender, or other demographic attributes, avoiding unnecessary inference and bias.',
                },
                {
                    item: 'Multilingual generation outside validated scope',
                    why: 'Languages that have not completed data-quality and language evaluation are not included in the first-version generation scope.',
                },
            ],
            zh: [
                {
                    item: '自動送出',
                    why: '所有回覆在送達客戶前，都必須由客服查看並主動送出。',
                },
                {
                    item: '班次層級摘要',
                    why: '第一版聚焦當前工單中的即時協助，不新增需要額外開啟的摘要儀表板。',
                },
                {
                    item: '依人口屬性調整語氣',
                    why: '第一版不根據年齡、性別或其他人口屬性改寫語氣，以避免不必要的推測與偏誤。',
                },
                {
                    item: '超出驗證範圍的多語言生成',
                    why: '尚未完成資料品質與語言評估的語言，不納入第一版產生範圍。',
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
                    en: [
                        'Every draft should display a high / medium / low three-level confidence indicator.',
                        'High confidence: The draft can be fully expanded and identifies its primary sources.',
                        'Medium confidence: The agent can continue editing, but must modify at least one key piece of information.',
                        'Low confidence: The system explicitly recommends human review and should not use a default state that encourages direct sending.',
                        'Confidence indicators must be paired with sources and rationale; they cannot simply show a precise-looking score that cannot be explained.',
                    ],
                    zh: [
                        '每份草稿都應顯示高／中／低三段式信心提示。',
                        '高信心：草稿可完整展開，並標示主要來源。',
                        '中信心：客服能持續可編輯，但至少要修改一次關鍵資訊。',
                        '低信心：系統明確建議人工檢查，不應以預設狀態鼓勵直接送出。',
                        '信心提示必須搭配來源與理由，不能只呈現一個看似精確、卻無法解釋的分數。',
                    ],
                },
                annotation: {
                    en: 'Decision rationale | Use a simple three-level indicator rather than show a numeric confidence score. Early testing showed that precise figures easily create unnecessary authority; what agents really need is a clear cue for when they may continue and when they should stop to review.',
                    zh: '決策理由｜採用簡單的三段式提示，而不顯示數值信心分數。前期測試顯示，精確數字容易製造不必要的權威感；客服真正需要的是何時可以繼續、何時應該停下來檢查的明確提示。',
                },
            },
            {
                name: {
                    en: 'Fallback states',
                    zh: '備援狀態',
                },
                body: {
                    en: [
                        'Whenever system latency is too high, it cannot produce a draft temporarily, or it cannot verify the knowledge source, the interface must clearly explain its current state and the next available action.',
                        'With mild delays, it may provide verified baseline templates, but must not present them as complete personalized recommendations.',
                        'When sources cannot be verified, remove or mark relevant citations and remind agents to verify them independently.',
                        'If the system becomes completely unavailable, the reply editor must continue functioning normally so agents can return to their existing manual workflow.',
                        'Do not show unfinished, truncated, or source-unknown drafts.',
                    ],
                    zh: [
                        '當系統延遲過高、暫時無法產生草稿，或無法確認知識來源時，介面必須清楚說明目前狀態與可採取的下一步。',
                        '延遲輕微時，可提供已驗證的基礎範本，但不得假裝為完整的個人化建議。',
                        '來源無法驗證時，應移除或標記相關引用，並提醒客服自行查證。',
                        '系統完全不可用時，回覆編輯器應維持正常運作，讓客服能回到原有人工作流程。',
                        '不得顯示未完成、截斷或來源不明的草稿。',
                    ],
                },
                annotation: {
                    en: 'Decision rationale | Fallback is not a narrow engineering exception; it is a complete user experience. Agents decide whether to trust a draft based on the state they see, so the system must truthfully disclose its limits and must not retain an apparently normal interface when it fails.',
                    zh: '決策理由｜備援不是單純的工程例外，而是完整的使用者體驗。客服會根據畫面狀態決定是否信任草稿，因此系統必須如實呈現能力限制，不能在失效時維持看似正常的介面。',
                },
            },
            {
                name: {
                    en: 'Wrong-reply recovery',
                    zh: '錯誤回覆的補救流程',
                },
                body: {
                    en: [
                        'If a sent reply is later found to be wrong, an agent or lead should be able to flag the issue in the original ticket and start a recovery workflow:',
                        'Create a corrected version and send it to the customer.',
                        'Preserve the original draft, cited sources, agent edits, and sent version.',
                        'Send the case to human review to determine whether the issue came from the model, knowledge source, or operating workflow.',
                        'If similar errors recur, suspend draft generation for the related ticket type until the review is complete.',
                        'The recovery workflow must remain in context with the original ticket, avoiding error records scattered across other systems.',
                    ],
                    zh: [
                        '若已送出的回覆後續被發現有誤，客服或主管應能在原工單中標記問題，並啟動補救流程：',
                        '建立更正版本並回覆客戶。',
                        '保存原始草稿、引用來源、客服修改內容與送出版本。',
                        '將案例送入人工審核，確認問題來自模型、知識來源或操作流程。',
                        '若同類錯誤重複出現，暫停相關工單類型的草稿產生，直到檢查完成。',
                        '補救流程應與原工單保留在同一脈絡中，避免錯誤紀錄散落於其他系統。',
                    ],
                },
            },
            {
                name: {
                    en: 'Learning from edits',
                    zh: '從客服編輯中學習',
                },
                body: {
                    en: [
                        'Agent edits to drafts should be treated as signals for product improvement, not automatically as a declaration that model output was wrong.',
                        'The team can regularly sample and review edit content, identifying common tone adjustments, information additions, or knowledge-base gaps as evidence for later improvements to the knowledge base and drafting behavior.',
                        'This data may be used only to improve the product and process. It must not evaluate individual agent performance or automatically be written back as new standard answers without review.',
                    ],
                    zh: [
                        '客服對草稿的修改應被視為產品改善訊號，而不是自動判定模型輸出錯誤。',
                        '團隊可定期抽樣檢視修改內容，辨識常見的語氣調整、資訊補充或知識庫落差，作為後續改善知識庫與草稿行為的依據。',
                        '這些資料只能用於產品與流程改善，不得直接用來評估客服個人績效，也不能在未經審核的情況下自動回寫為新的標準答案。',
                    ],
                },
                annotation: {
                    en: 'Decision rationale | An agent’s edits may correct an error, or they may add context, tone, and responsibility judgment. Edit records can help the team understand the product and workflow, but they must not be blindly treated as factual annotation data.',
                    zh: '決策理由｜客服修改草稿，可能是在修正錯誤，也可能是在補足情境、語氣與責任判斷。編輯紀錄能協助團隊理解產品與工作流程，但不能被盲目視為事實標註資料。',
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
                'When an agent opens a common, low-contention ticket, the reply draft should appear within 2 seconds. If it exceeds that limit, the interface must show a clear loading or degraded state.',
                'Every draft must show a high / medium / low confidence indicator and at least one viewable cited source.',
                'Before sending a medium- or low-confidence draft, the agent must make at least one edit or actively confirm it; low-confidence drafts must not be directly sendable by default.',
                'When the draft service is temporarily unavailable, the existing reply editor and manual workflow must continue to function normally, without unfinished or partial drafts.',
                'After an agent edits and sends a draft, the system must save the original draft, final version, cited sources, and key interaction records.',
                'Only policy or knowledge content that passes source verification may be shown as formal citations; unverified content must be clearly marked or removed.',
                'When ticket content is outside the first version’s support scope, the system must not generate a draft and should guide the agent back to the standard manual workflow.',
                'If a specific agent directly adopts drafts multiple times in a week, Support Operations may receive an alert to arrange a usage review; this alert must not be used for individual performance discipline.',
                'If a sent reply is marked as incorrect, an agent can create a corrected reply in the original ticket and start the issue-reporting flow.',
            ],
            zh: [
                '開啟常見、低爭議工單時，回覆草稿應在 2 秒內顯示；若超時，介面需顯示明確的載入或降級狀態。',
                '每份草稿都必須顯示高／中／低信心提示，以及至少一項可檢視的引用來源。',
                '中信心或低信心草稿在送出前，客服必須至少進行一次編輯或主動確認；低信心草稿不得預設為可直接送出。',
                '當草稿服務暫時無法使用時，原有回覆編輯器與人工流程仍可正常運作，不得出現未完成或殘缺草稿。',
                '客服修改並送出草稿後，系統需保存原始草稿、最終版本、引用來源與主要操作紀錄。',
                '只有通過來源驗證的政策或知識內容，才能顯示為正式引用；無法驗證的內容必須明確標示或移除。',
                '當工單內容超出第一版支援範圍時，系統不產生草稿，並引導客服回到標準人工流程。',
                '若特定客服一週內多次直接採用草稿，Support Operations 可收到提醒以安排使用回顧；此提醒不得被用作個人績效處分。',
                '已送出的回覆若被標記為錯誤，客服可在原工單中建立更正回覆並啟動問題回報流程。',
            ],
        },
    },
    {
        id: 'questions',
        title: {
            en: '7 · Open questions',
            zh: '7 · 未決問題',
        },
        questions: {
            en: [
                {
                    title: 'Q1 | Should confidence thresholds vary by context?',
                    body: 'Should different confidence thresholds be set by support team, ticket type, or risk level? Current test results come mainly from a single team, which is not enough to determine whether the same threshold works in every context.',
                },
                {
                    title: 'Q2 | Can the correction workflow repair customer trust?',
                    body: 'Correction templates and recovery workflows may make internal handling more consistent, but whether they can reduce customer dissatisfaction and loss of trust still needs to be observed through real error cases.',
                },
                {
                    title: 'Q3 | Could AI mask knowledge-base problems?',
                    body: 'If AI drafts continually compensate for outdated or missing documentation, the team may feel more efficient in the short term while delaying real knowledge maintenance. Future work needs to distinguish which issues AI should assist with and which should return to content-governance workflows.',
                },
            ],
            zh: [
                {
                    title: 'Q1｜信心門檻是否需要依情境調整？',
                    body: '是否應依客服團隊、工單類型或風險等級設定不同的信心門檻？目前測試結果主要來自單一團隊，尚不足以判斷相同門檻能否適用於所有情境。',
                },
                {
                    title: 'Q2｜更正流程能否修復客戶信任？',
                    body: '更正範本與補救流程可能讓內部處理更一致，但是否能降低客戶的不滿與信任損失，仍需觀察真實錯誤案例。',
                },
                {
                    title: 'Q3｜AI 是否會掩蓋知識庫問題？',
                    body: '若 AI 草稿持續補足過期或缺漏的說明文件，團隊可能短期內感覺效率提升，卻延後真正的知識維護。後續需要區分哪些問題應由 AI 協助，哪些問題應回到內容治理流程處理。',
                },
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
                    en: 'Adopt high / medium / low three-level confidence indicators.',
                    zh: '採用高／中／低三段式信心提示。',
                },
                rejected: {
                    en: 'Display a 0–100 numeric confidence score.',
                    zh: '顯示 0–100 數值信心分數。',
                },
                reason: {
                    en: 'Testing showed that numeric scores can make uncertain model output appear overly precise, increasing the risk that users directly accept low-confidence drafts. Three-level indicators are better for communicating the next action than pretending to be precise.',
                    zh: '測試顯示，數值分數容易讓不確定的模型輸出看起來過度精確，增加使用者直接接受低信心草稿的風險。三段式提示更適合傳達後續行動，而不是假裝精準。',
                },
            },
            {
                date: '2026-04-02',
                decision: {
                    en: 'Evaluate confidence per ticket and per draft.',
                    zh: '信心提示依單張工單與單次草稿判斷。',
                },
                rejected: {
                    en: 'Show confidence as shift- or team-level average scores.',
                    zh: '以班次或團隊平均分數呈現信心。',
                },
                reason: {
                    en: 'Agents handle one specific ticket at a time. Average scores can conceal a small number of high-risk cases and cannot help agents judge whether the draft in front of them is reliable.',
                    zh: '客服一次處理的是一張具體工單；平均分數可能掩蓋少數高風險案例，也無法協助客服判斷眼前草稿是否可靠。',
                },
            },
            {
                date: '2026-04-21',
                decision: {
                    en: 'Require human review before sending medium- or low-confidence drafts; low-confidence drafts must not be directly sendable by default.',
                    zh: '中、低信心草稿在送出前必須經過人工查看；低信心草稿不得預設直接送出。',
                },
                rejected: {
                    en: 'Completely lock all uncertain drafts and prevent agents from using them.',
                    zh: '完全鎖定所有不確定草稿，禁止客服使用。',
                },
                reason: {
                    en: 'A blanket block removes human judgment from the workflow and may delay valid use cases. Preserving the right to edit and confirm keeps agents in control while reducing the risk of unchecked direct sending.',
                    zh: '全面封鎖會把人工判斷從流程中移除，也可能延誤合理使用情境。保留編輯與確認權，既能維持客服控制，也能降低未經檢查直接送出的風險。',
                },
            },
        ],
    },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 04 — PRODUCT REQUIREMENTS',
        title: 'PRD-lite: Customer Support Reply Draft Assistant',
        lead: [
            'This is a lightweight product requirements document for Meridian’s first release, translating the product opportunities, research insights, and risk constraints validated earlier into a specification that cross-functional teams can review together.',
            'It focuses on what the first version genuinely needs to align on: the problem it solves, where it provides assistance, what AI can and cannot do, and how the team judges readiness for testing. Rather than a complete specification, it is an execution baseline sufficient to support design, engineering, and product decisions.',
        ],
        context: 'Scenario: This document extends Module 01’s opportunity prioritization, defining the “Draft-reply assistant for common questions” as Meridian v1’s priority validation direction. It uses a simulated case to show how product judgment is translated into an executable specification.',
        signature: 'Signature interaction: review the acceptance criteria like a product reviewer and check them off as you go.',
        readingTime: 'Reading time: 6 min',
        tocLabel: 'CONTENTS',
        inLabel: 'IN',
        outLabel: 'OUT — with rationale',
        logHeaders: {
            date: 'Date',
            decision: 'Final decision',
            rejected: 'Not selected',
            reason: 'Decision basis',
        },
        criteriaHint: 'Checkboxes are local to this visit — nothing is saved.',
    },
    zh: {
        eyebrow: 'MODULE 04 — PRODUCT REQUIREMENTS',
        title: 'PRD-lite：客服回覆草稿助手',
        lead: [
            '這是一份為 Meridian 第一版設計的輕量產品需求文件，將前面確認的產品機會、研究洞察與風險限制，轉化為可供跨職能團隊共同審閱的產品規格。',
            '文件聚焦於第一版真正需要對齊的內容：產品要解決什麼問題、在哪些情境中提供協助、AI 可以做什麼與不能做什麼，以及團隊如何判斷它具備測試條件。它不是完整規格書，而是一份足以支援設計、工程與產品決策的執行基準。',
        ],
        context: '案例情境：本文件延續 Module 01 的產品機會排序，將「常見問題回覆草稿助手」定義為 Meridian v1 的優先驗證方向。內容使用模擬案例，重點在於呈現產品判斷如何轉化為可執行規格。',
        signature: '你可以像產品審查者一樣逐條檢查驗收條件，並在閱讀過程中勾選確認。',
        readingTime: '閱讀時間：6 分鐘',
        tocLabel: 'CONTENTS',
        inLabel: 'IN',
        outLabel: 'OUT——每一項附上原因',
        logHeaders: {
            date: '日期',
            decision: '最終決策',
            rejected: '未採用方案',
            reason: '決策依據',
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

            {section.questions?.[lang].map(question => (
                <p className="los-m5-para" key={question.title}>
                    <strong>{question.title}</strong><br />
                    {question.body}
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
                    {(Array.isArray(req.body[lang]) ? req.body[lang] : [req.body[lang]]).map((paragraph, paragraphIndex) => (
                        <p className="los-m5-para" key={paragraphIndex}>
                            {paragraph}
                        </p>
                    ))}
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
