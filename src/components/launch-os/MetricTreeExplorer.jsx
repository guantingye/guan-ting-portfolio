import React, { useLayoutEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// Fixed three-level tree (spec M2.2). Values carry 12-week simulated trends.
// "goodDirection" drives the aria narration; the line itself shows the shape.

const TREE = {
    id: 'ns', level: 0, value: '3.4', goodDirection: 'up',
    spark: [2.1, 2.2, 2.4, 2.3, 2.6, 2.7, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4],
    name: { en: 'Decision-grade insights delivered per active team / week', zh: '每個活躍團隊每週交付的 decision-grade insights' },
    definition: {
        en: 'How many insights per team per week actually reach a decision-maker in a usable state.',
        zh: '每個團隊每週有多少 insight 以可用的狀態，真正抵達一位決策者手上。',
    },
    formula: 'count(insights ∧ decision_grade) / active_teams / week',
    guardrail: {
        en: 'Volume of dashboards is explicitly not the metric. “Decision-grade” has a written definition and gets audited quarterly — if the audit ever feels unnecessary, the metric has already started lying.',
        zh: 'Dashboard 的數量明確不是這個指標。「Decision-grade」有成文定義並每季稽核——如果哪天覺得稽核多餘了，這個指標已經開始說謊。',
    },
    laddersUp: null,
    children: [
        {
            id: 'activation', level: 1, value: '71%', goodDirection: 'up',
            spark: [52, 55, 58, 57, 60, 63, 64, 66, 68, 69, 70, 71],
            name: { en: 'Activation', zh: 'Activation' },
            headline: { en: 'Teams live within 14 days', zh: '14 天內上線的團隊' },
            definition: { en: 'Share of new teams that reach a working setup within two weeks of signing.', zh: '新團隊在簽約後兩週內完成可用設定的比例。' },
            formula: 'teams_live_≤14d / teams_started',
            guardrail: {
                en: 'Cannot be bought with defaults that silently switch drafting on for every queue. Forced activation inflates this number and poisons Trust one branch over.',
                zh: '不能靠預設值偷偷幫所有佇列開啟草稿功能來灌水。強迫式啟用會撐高這個數字，然後毒害隔壁那條 Trust 支線。',
            },
            laddersUp: { en: 'No activated team, no insight delivery — this branch feeds the denominator of the north star.', zh: '沒有啟用的團隊就沒有 insight 交付——這條支線餵的是 north star 的分母。' },
            children: [
                {
                    id: 'a1', level: 2, value: '62%', goodDirection: 'up',
                    spark: [45, 47, 50, 49, 52, 54, 56, 57, 59, 60, 61, 62],
                    name: { en: 'Setup + first insight within 7 days', zh: '7 天內完成設定並產出第一個 insight' },
                    definition: { en: 'Teams that finish setup and see one real insight inside their first week.', zh: '第一週內完成設定、並看到一個真實 insight 的團隊比例。' },
                    formula: 'teams(setup ∧ first_insight ≤ 7d) / teams_started',
                    guardrail: {
                        en: 'The first insight must come from the team’s own data. A canned demo insight makes week one look great and week eight look like churn.',
                        zh: '第一個 insight 必須來自團隊自己的資料。罐頭示範 insight 會讓第一週很好看，然後讓第八週看起來像流失。',
                    },
                    laddersUp: { en: 'Early value is the strongest predictor of week-8 retention in this model.', zh: '在這個模型裡，早期價值是第八週留存最強的預測因子。' },
                },
                {
                    id: 'a2', level: 2, value: '4.2 d', goodDirection: 'down',
                    spark: [9.1, 8.6, 8.0, 7.7, 7.1, 6.5, 6.0, 5.6, 5.1, 4.8, 4.5, 4.2],
                    name: { en: 'Median time to first accepted suggestion', zh: '第一個被採用建議的中位時間' },
                    definition: { en: 'Days from signup until an agent accepts a suggestion for the first time. Lower is better.', zh: '從註冊到客服第一次採用建議所需的天數。越低越好。' },
                    formula: 'median(t_first_accepted − t_signup)',
                    guardrail: {
                        en: 'Speed must not come from seeding easy tickets. If the first accepted draft is a toy case, week-2 usage drops — the experiment card below is the receipt.',
                        zh: '速度不能靠塞簡單工單製造。如果第一個被採用的草稿是玩具案例，第二週使用率就會掉——下方的實驗卡就是憑據。',
                    },
                    laddersUp: { en: 'Every day shaved here moves teams into the activated pool sooner.', zh: '這裡省下的每一天，都讓團隊更早進入已啟用的池子。' },
                    experiment: {
                        title: { en: 'Guided first-ticket walkthrough', zh: '首張工單引導式走查' },
                        hypothesis: { en: 'An interactive walkthrough on the first live ticket cuts time-to-first-accept by 30%.', zh: '在第一張真實工單上做互動式引導，可將首次採用時間縮短 30%。' },
                        variant: { en: 'A: static onboarding doc · B: in-editor walkthrough', zh: 'A：靜態導入文件 · B：編輯器內引導' },
                        primary: { en: 'Median time to first accepted suggestion', zh: '首個被採用建議的中位時間' },
                        guardrailMetric: { en: 'Week-2 voluntary usage', zh: '第二週自願使用率' },
                        result: 'supported',
                        conclusion: {
                            en: 'Hypothesis supported: median fell from 9.1 to 4.2 days over the quarter and week-2 usage held. Kept variant B.',
                            zh: '假設成立：中位時間在一季內從 9.1 天降至 4.2 天，且第二週使用率未受影響。保留 B 版。',
                        },
                    },
                },
            ],
        },
        {
            id: 'workflow', level: 1, value: '5.6 h', goodDirection: 'up',
            spark: [3.1, 3.4, 3.6, 3.9, 4.1, 4.4, 4.6, 4.9, 5.1, 5.3, 5.5, 5.6],
            name: { en: 'Workflow value', zh: 'Workflow value' },
            headline: { en: 'Agent-hours saved per team / week', zh: '每團隊每週節省的客服工時' },
            definition: { en: 'Estimated hours a team gets back per week from accepted drafts.', zh: '團隊每週因採用草稿而拿回的估計工時。' },
            formula: 'Σ(minutes_saved) / 60 / teams / week',
            guardrail: {
                en: 'Saved time is only real if it is measured against each team’s own baseline, re-sampled quarterly. A stale baseline turns this into a compliments generator.',
                zh: '省下的時間只有對照各團隊自己的基準線、且每季重新抽樣才算數。過期的基準線會把這個指標變成讚美產生器。',
            },
            laddersUp: { en: 'Hours returned are the raw material of “decision-grade” — teams reinvest them in the tickets that need judgment.', zh: '拿回來的工時是「decision-grade」的原料——團隊會把它再投資到需要判斷的工單上。' },
            children: [
                {
                    id: 'w1', level: 2, value: '31', goodDirection: 'up',
                    spark: [18, 20, 22, 23, 25, 26, 27, 28, 29, 30, 30, 31],
                    name: { en: 'Tickets resolved with an accepted draft / agent / week', zh: '每位客服每週以採用草稿結案的工單數' },
                    definition: { en: 'Resolved tickets where the final reply started from an accepted draft.', zh: '最終回覆源自被採用草稿的結案工單數。' },
                    formula: 'tickets(draft_accepted ∧ resolved) / agents / week',
                    guardrail: {
                        en: 'Must not rise by drafting everything. Watch the share of tickets where a draft was even appropriate — flooding the editor raises this numerator and burns review attention.',
                        zh: '不能靠什麼都出草稿來衝高。要盯著「本來就適合出草稿」的工單占比——灌爆編輯器會撐高分子，燒掉的是審核注意力。',
                    },
                    laddersUp: { en: 'Direct driver of the hours-saved rollup above it.', zh: '直接驅動上層的工時節省彙總。' },
                },
                {
                    id: 'w2', level: 2, value: '3.8 min', goodDirection: 'up',
                    spark: [2.6, 2.8, 2.9, 3.0, 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.7, 3.8],
                    name: { en: 'Minutes saved per resolved ticket (median)', zh: '每張結案工單節省分鐘數（中位）' },
                    definition: { en: 'Median handling-time gap between drafted and baseline tickets of the same type.', zh: '同類型工單中，使用草稿與基準線處理時間的中位差。' },
                    formula: 'median(t_baseline − t_with_draft)',
                    guardrail: {
                        en: 'Cannot come from shorter review. If minutes saved rises while edit time falls toward zero, we are measuring rubber-stamping — that is risk R5 wearing a nice hat.',
                        zh: '不能來自更短的審核。如果節省分鐘數上升、編輯時間卻趨近於零，我們量到的是橡皮圖章——那是風險 R5 戴著漂亮帽子的樣子。',
                    },
                    laddersUp: { en: 'The per-ticket unit that multiplies into team-level hours.', zh: '乘上工單量後就是團隊層級工時的那個單位值。' },
                },
            ],
        },
        {
            id: 'trust', level: 1, value: '64%', goodDirection: 'up',
            spark: [48, 50, 53, 52, 55, 57, 58, 60, 61, 62, 63, 64],
            name: { en: 'Trust', zh: 'Trust' },
            headline: { en: 'Agents rating drafts “usually right”', zh: '認為草稿「通常是對的」的客服比例' },
            definition: { en: 'Quarterly survey: share of agents who say drafts are usually right for their queue.', zh: '每季調查：認為草稿對自己佇列「通常是對的」的客服比例。' },
            formula: 'survey(usually_right) / respondents, quarterly',
            guardrail: {
                en: 'Trust that only ever rises is not trust, it is habituation. The healthy pattern dips after every model change and recovers within two weeks.',
                zh: '只會上升的信任不是信任，是習慣化。健康的樣態是每次模型更新後小幅下滑，兩週內回升。',
            },
            laddersUp: { en: 'Trust gates everything: an insight nobody believes is not decision-grade by definition.', zh: 'Trust 是所有東西的閘門：沒有人相信的 insight，照定義就不是 decision-grade。' },
            children: [
                {
                    id: 't1', level: 2, value: '58%', goodDirection: 'up',
                    spark: [41, 43, 46, 45, 48, 50, 52, 53, 55, 56, 57, 58],
                    name: { en: 'Suggestion acceptance rate (edited vs. as-is)', zh: '建議採用率（edited vs. as-is）' },
                    definition: { en: 'Accepted drafts over offered drafts, always reported split by edited versus as-is.', zh: '被採用草稿佔提供草稿的比例，一律拆成「有編輯」與「原文照收」兩段回報。' },
                    formula: 'accepted / offered, split edited | as-is',
                    guardrail: {
                        en: 'Edited-acceptance share must stay above 30%. A wall of as-is acceptance is an over-trust warning, not a quality win — the day agents stop editing is the day they stopped reading.',
                        zh: 'Edited-acceptance 佔比不得低於 30%。整片原文照收是 over-trust 警訊，不是品質勝利——客服停止編輯的那天，就是他們停止閱讀的那天。',
                    },
                    laddersUp: { en: 'The behavioral half of Trust; the survey above is the attitudinal half.', zh: 'Trust 的行為面；上層的調查則是態度面。' },
                    experiment: {
                        title: { en: 'Numeric confidence display', zh: '數值化信心顯示' },
                        hypothesis: { en: 'Showing a numeric confidence score (0.87) instead of a three-level badge increases appropriate acceptance.', zh: '以數值信心分數（0.87）取代三段式標記，能提升「恰當的」採用率。' },
                        variant: { en: 'A: three-level badge · B: numeric score', zh: 'A：三段式標記 · B：數值分數' },
                        primary: { en: 'Edited-acceptance share', zh: 'Edited-acceptance 佔比' },
                        guardrailMetric: { en: 'Wrong-draft incidents per 1k accepted', zh: '每千次採用的錯誤草稿事件數' },
                        result: 'rejected',
                        conclusion: {
                            en: 'Hypothesis rejected: two decimal places read as authority. As-is acceptance jumped 11 points on low-confidence drafts — the opposite of appropriate. Learned that precision formatting signals false certainty; kept the three-level badge and wrote the finding into the PRD’s confidence-display spec.',
                            zh: '假設不成立：小數點兩位被讀成權威。低信心草稿的原文照收率反而跳升 11 個百分點——與「恰當」完全相反。學到的是：精確的格式會傳遞虛假的確定性。保留三段式標記，並把這個發現寫進 PRD 的 confidence 顯示規格。',
                        },
                    },
                },
                {
                    id: 't2', level: 2, value: '87%', goodDirection: 'up',
                    spark: [78, 80, 81, 83, 82, 84, 85, 85, 86, 86, 87, 87],
                    name: { en: 'Escalation-to-human rate on low-confidence outputs', zh: '低信心輸出的人工轉送率' },
                    definition: { en: 'Share of below-threshold outputs that actually get routed human-first.', zh: '低於門檻的輸出中，真正被導入 human-first 佇列的比例。' },
                    formula: 'low_conf_escalated / low_conf_outputs',
                    guardrail: {
                        en: 'If this approaches 100%, check τ before celebrating — a threshold set high enough hides the assistant from every hard ticket, and coverage collapses while this metric looks virtuous.',
                        zh: '如果這個數字逼近 100%，先檢查 τ 再慶祝——門檻設得夠高，助手就能躲掉所有困難工單；覆蓋率崩掉的同時，這個指標看起來還很有美德。',
                    },
                    laddersUp: { en: 'Proves the confidence gate is honored in practice, not just drawn on the model card.', zh: '證明 confidence 閘門在實務上被遵守，而不是只畫在 model card 上。' },
                },
            ],
        },
        {
            id: 'retention', level: 1, value: '74%', goodDirection: 'up',
            spark: [61, 63, 64, 66, 67, 68, 70, 71, 72, 73, 73, 74],
            name: { en: 'Retention', zh: 'Retention' },
            headline: { en: 'Teams still active in week 8', zh: '第八週仍活躍的團隊' },
            definition: { en: 'Activated teams still using drafts in their eighth week.', zh: '已啟用團隊到第八週仍在使用草稿的比例。' },
            formula: 'teams_active_week8 / teams_activated',
            guardrail: {
                en: 'Retention held up by a manager mandate is not retention. The unit that matters is the agent who could quietly stop and does not.',
                zh: '靠主管命令撐住的留存不是留存。真正要緊的單位，是那個可以悄悄不用、卻沒有停用的客服。',
            },
            laddersUp: { en: 'Keeps activated teams in the north star denominator instead of quietly leaking out.', zh: '讓已啟用的團隊留在 north star 的分母裡，而不是安靜地漏掉。' },
            children: [
                {
                    id: 'r1', level: 2, value: '81%', goodDirection: 'up',
                    spark: [70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 80, 81],
                    name: { en: 'Voluntary weekly seat usage', zh: '每週自願使用席次比例' },
                    definition: { en: 'Provisioned seats that used drafting this week without a team-level mandate.', zh: '本週在沒有團隊強制要求下使用草稿功能的席次比例。' },
                    formula: 'seats_active_7d / seats_provisioned',
                    guardrail: {
                        en: 'Excludes mandated teams by design — mixing them in makes the number bigger and the signal smaller.',
                        zh: '刻意排除被強制使用的團隊——混進來會讓數字變大，訊號變小。',
                    },
                    laddersUp: { en: 'The leading indicator: seats go quiet before teams cancel.', zh: '領先指標：席次會先安靜下來，團隊才會解約。' },
                },
                {
                    id: 'r2', level: 2, value: '9%', goodDirection: 'down',
                    spark: [16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 9],
                    name: { en: 'Agent opt-out rate after first month', zh: '首月後的客服停用率' },
                    definition: { en: 'Agents who switch drafting off within 30 days of onboarding. Lower is better.', zh: '導入後 30 天內關閉草稿功能的客服比例。越低越好。' },
                    formula: 'agents_opted_out_≤30d / agents_onboarded',
                    guardrail: {
                        en: 'A low opt-out rate with low usage is worse than honest churn — dormant seats hide the failure. Read this only next to voluntary usage.',
                        zh: '停用率低但使用率也低，比誠實的流失更糟——沉睡的席次會把失敗藏起來。這個指標只能和自願使用率一起讀。',
                    },
                    laddersUp: { en: 'Early opt-outs predict team-level churn two quarters ahead in the simulation.', zh: '在模擬中，早期停用可提前兩季預測團隊層級的流失。' },
                },
            ],
        },
        {
            id: 'risk', level: 1, value: '1.8', goodDirection: 'down',
            spark: [4.1, 3.8, 3.6, 3.4, 3.1, 2.9, 2.7, 2.5, 2.3, 2.1, 1.9, 1.8],
            name: { en: 'Risk reduction', zh: 'Risk reduction' },
            headline: { en: 'Wrong-draft incidents per 1k accepted', zh: '每千次採用的錯誤草稿事件數' },
            definition: { en: 'Reported incidents where an accepted draft was materially wrong, per thousand acceptances. Lower is better.', zh: '被採用草稿事後證實有實質錯誤的通報數，以每千次採用計。越低越好。' },
            formula: 'incidents_reported / accepted × 1000',
            guardrail: {
                en: 'Falling incidents can mean fewer reports, not fewer errors. This number is only trusted in quarters where the audit sample moved the same direction.',
                zh: '事件數下降可能代表通報變少，而不是錯誤變少。只有在稽核抽樣同向移動的季度，這個數字才值得相信。',
            },
            laddersUp: { en: 'One public wrong answer can erase a quarter of trust gains — this branch protects the others.', zh: '一個公開的錯誤答案可以抹掉一季的信任累積——這條支線保護其他所有支線。' },
            children: [
                {
                    id: 'k1', level: 2, value: '96.5%', goodDirection: 'up',
                    spark: [91.0, 91.8, 92.5, 93.1, 93.6, 94.2, 94.7, 95.1, 95.5, 95.9, 96.2, 96.5],
                    name: { en: 'Policy-citation retrieval-check pass rate', zh: '政策引用檢索比對通過率' },
                    definition: { en: 'Citations in drafts that were verified against the policy corpus before display.', zh: '草稿中的政策引用在顯示前通過語料庫比對的比例。' },
                    formula: 'citations_passing / citations_emitted',
                    guardrail: {
                        en: 'A 100% pass rate likely means citations are being stripped rather than verified. The check has to fail sometimes to be alive.',
                        zh: '100% 的通過率多半代表引用被直接拿掉，而不是被驗證。這個檢查必須偶爾失敗，才證明它還活著。',
                    },
                    laddersUp: { en: 'The mechanical mitigation for risk R1, expressed as a number.', zh: '風險 R1 的機械式緩解措施，換成數字的樣子。' },
                },
                {
                    id: 'k2', level: 2, value: '99.2%', goodDirection: 'up',
                    spark: [98.8, 99.0, 98.9, 99.1, 99.0, 99.2, 99.1, 99.2, 99.3, 99.2, 99.2, 99.2],
                    name: { en: 'PII scrubber recall on audit sample', zh: 'PII 清洗器稽核抽樣召回率' },
                    definition: { en: 'Share of planted PII the scrubber catches in the quarterly audit sample.', zh: '每季稽核抽樣中，清洗器成功攔截植入 PII 的比例。' },
                    formula: 'PII_caught / PII_present (audit sample)',
                    guardrail: {
                        en: 'The audit sample must keep including the weird formats — pasted ID numbers in free text — or this becomes a test the scrubber studied for.',
                        zh: '稽核樣本必須持續包含奇怪的格式——自由文字裡貼上的證件號碼——否則這會變成一場清洗器早就押到題的考試。',
                    },
                    laddersUp: { en: 'Backs risk R4; a flat high line here is the point, not a problem.', zh: '支撐風險 R4；這條線又高又平正是目的，不是問題。' },
                },
            ],
        },
    ],
};

const ALL_NODES = (() => {
    const list = [];
    const walk = (node, parent) => {
        list.push({ node, parent });
        (node.children || []).forEach(child => walk(child, node));
    };
    walk(TREE, null);
    return list;
})();

const findEntry = id => ALL_NODES.find(entry => entry.node.id === id);

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 02 — METRIC SYSTEM',
        title: 'Metric Tree Explorer',
        lead: 'A north star, five branches, ten leaf metrics. Every node carries a definition, a formula, and a guardrail that names what the metric is not allowed to cost. Two experiment cards show the tree doing real work — one of them failed.',
        context: 'Scenario: “Meridian”, the same fictional support-AI bet as Module 01. Twelve weeks of simulated trend per node.',
        signature: 'Signature interaction: select a node — the path to the north star draws itself.',
        detailTitle: 'NODE DETAIL',
        definition: 'Definition',
        formula: 'Formula',
        guardrail: 'Guardrail',
        laddersUp: 'Why this ladders up',
        experiment: 'Experiment card',
        expFields: { hypothesis: 'Hypothesis', variant: 'Variants', primary: 'Primary metric', guardrailMetric: 'Guardrail metric', conclusion: 'Conclusion' },
        resultWord: { supported: 'HYPOTHESIS SUPPORTED', rejected: 'HYPOTHESIS REJECTED' },
        northStar: 'NORTH STAR',
        branch: 'BRANCH',
        leaf: 'METRIC',
        srTree: 'Metric tree as a nested list',
        trend: (first, last, dir, good) =>
            `12-week trend, from ${first} to ${last}, ${dir === 'up' ? 'rising' : 'falling'}${good ? '' : ' (down is better for this metric)'}`,
        lowerBetter: 'down = better',
    },
    zh: {
        eyebrow: 'MODULE 02 — METRIC SYSTEM',
        title: '指標樹瀏覽器',
        lead: '一顆 north star、五條支線、十個子指標。每個節點都有定義、計算式，以及一條寫明「這個指標不准犧牲什麼」的 guardrail。兩張實驗卡展示這棵樹真的在工作——其中一張是失敗的。',
        context: '情境：「Meridian」，與 Module 01 相同的虛構客服 AI 賭注。每個節點附 12 週模擬趨勢。',
        signature: '招牌互動：點選節點，通往 north star 的路徑會自己畫出來。',
        detailTitle: 'NODE DETAIL',
        definition: '定義',
        formula: '計算式',
        guardrail: 'Guardrail',
        laddersUp: '對上層的影響',
        experiment: '實驗卡',
        expFields: { hypothesis: '假設', variant: '變體', primary: '主指標', guardrailMetric: '護欄指標', conclusion: '模擬結論' },
        resultWord: { supported: 'HYPOTHESIS SUPPORTED', rejected: 'HYPOTHESIS REJECTED' },
        northStar: 'NORTH STAR',
        branch: 'BRANCH',
        leaf: 'METRIC',
        srTree: '指標樹的巢狀清單版本',
        trend: (first, last, dir, good) =>
            `12 週趨勢，自 ${first} 至 ${last}，${dir === 'up' ? '上升' : '下降'}${good ? '' : '（此指標越低越好）'}`,
        lowerBetter: '越低越好',
    },
};

// ---- sparkline ----------------------------------------------------------------
function Sparkline({ node, t }) {
    const { spark } = node;
    const min = Math.min(...spark);
    const max = Math.max(...spark);
    const span = max - min || 1;
    const points = spark
        .map((v, i) => `${(i * (64 / 11)).toFixed(1)},${(18 - ((v - min) / span) * 16).toFixed(1)}`)
        .join(' ');
    const dir = spark[spark.length - 1] >= spark[0] ? 'up' : 'down';
    const good = dir === node.goodDirection;
    return (
        <svg
            width="64" height="20" viewBox="0 0 64 20"
            role="img"
            aria-label={t.trend(spark[0], spark[spark.length - 1], dir, good)}
        >
            <polyline points={points} fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ---- tree (desktop / tablet: measured connectors) --------------------------------
function NodeCard({ node, t, lang, selected, onSelect, registerRef }) {
    return (
        <button
            ref={el => registerRef(node.id, el)}
            className={`los-m2-node is-l${node.level}${selected ? ' is-selected' : ''}`}
            aria-pressed={selected}
            onClick={() => onSelect(node.id)}
        >
            <span className="los-data-sm los-m2-node-name">{node.name[lang]}</span>
            <span className="los-m2-node-row">
                <span className="los-m2-node-value">{node.value}</span>
                <Sparkline node={node} t={t} />
            </span>
            {node.goodDirection === 'down' && <span className="los-data-sm los-m2-node-dir">{t.lowerBetter}</span>}
        </button>
    );
}

function TreeCanvas({ t, lang, selectedId, onSelect, reducedMotion }) {
    const canvasRef = useRef(null);
    const nodeEls = useRef(new Map());
    const [edges, setEdges] = useState([]);
    const registerRef = (id, el) => { if (el) nodeEls.current.set(id, el); };

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const compute = () => {
            const base = canvas.getBoundingClientRect();
            const anchor = (el, side) => {
                const r = el.getBoundingClientRect();
                return {
                    x: (side === 'right' ? r.right : r.left) - base.left + canvas.scrollLeft,
                    y: r.top + r.height / 2 - base.top,
                };
            };
            const next = [];
            for (const { node, parent } of ALL_NODES) {
                if (!parent) continue;
                const fromEl = nodeEls.current.get(parent.id);
                const toEl = nodeEls.current.get(node.id);
                if (!fromEl || !toEl) continue;
                const a = anchor(fromEl, 'right');
                const b = anchor(toEl, 'left');
                const mid = (a.x + b.x) / 2;
                next.push({
                    key: `${parent.id}-${node.id}`,
                    d: `M ${a.x} ${a.y} C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x} ${b.y}`,
                });
            }
            setEdges(next);
        };
        compute();
        const observer = new ResizeObserver(compute);
        observer.observe(canvas);
        return () => observer.disconnect();
    }, [lang]);

    const activeKeys = (() => {
        const entry = findEntry(selectedId);
        if (!entry || !entry.parent) return new Set();
        const keys = [`${entry.parent.id}-${selectedId}`];
        const grand = findEntry(entry.parent.id);
        if (grand && grand.parent) keys.push(`${grand.parent.id}-${entry.parent.id}`);
        return new Set(keys);
    })();

    return (
        <div className="los-m2-canvas" ref={canvasRef}>
            <svg className="los-m2-edges" aria-hidden="true">
                {edges.map(edge => (
                    <path key={edge.key} d={edge.d} className="los-m2-edge" />
                ))}
                {edges.filter(edge => activeKeys.has(edge.key)).map(edge => (
                    <path
                        key={`${edge.key}-${selectedId}`}
                        d={edge.d}
                        pathLength="1"
                        className={`los-m2-edge is-active${reducedMotion ? ' is-static' : ''}`}
                    />
                ))}
            </svg>
            <div className="los-m2-cols">
                <div className="los-m2-col is-root">
                    <NodeCard node={TREE} t={t} lang={lang} selected={selectedId === 'ns'} onSelect={onSelect} registerRef={registerRef} />
                </div>
                <div className="los-m2-col is-branches">
                    {TREE.children.map(branch => (
                        <NodeCard key={branch.id} node={branch} t={t} lang={lang} selected={selectedId === branch.id} onSelect={onSelect} registerRef={registerRef} />
                    ))}
                </div>
                <div className="los-m2-col is-leaves">
                    {TREE.children.map(branch => (
                        <div className="los-m2-leafgroup" key={branch.id}>
                            {branch.children.map(leaf => (
                                <NodeCard key={leaf.id} node={leaf} t={t} lang={lang} selected={selectedId === leaf.id} onSelect={onSelect} registerRef={registerRef} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Mobile: indented list, no SVG connectors (spec M2.4)
function TreeList({ t, lang, selectedId, onSelect }) {
    const item = (node, depth) => (
        <li key={node.id} style={{ paddingLeft: depth * 18 }}>
            <NodeCard node={node} t={t} lang={lang} selected={selectedId === node.id} onSelect={onSelect} registerRef={() => {}} />
        </li>
    );
    return (
        <ul className="los-m2-list">
            {item(TREE, 0)}
            {TREE.children.map(branch => (
                <React.Fragment key={branch.id}>
                    {item(branch, 1)}
                    {branch.children.map(leaf => item(leaf, 2))}
                </React.Fragment>
            ))}
        </ul>
    );
}

// ---- detail panel ------------------------------------------------------------
function DetailPanel({ t, lang, node, reducedMotion }) {
    const levelWord = node.level === 0 ? t.northStar : node.level === 1 ? t.branch : t.leaf;
    return (
        <aside className="los-m2-detail" aria-live="polite">
            <div className="los-m2-detail-sticky">
                <span className="los-eyebrow">{t.detailTitle}</span>
            </div>
            <div key={node.id} className={`los-m2-detail-body${reducedMotion ? '' : ' is-entering'}`}>
                <span className="los-data-sm los-m2-detail-level">{levelWord}</span>
                <h4 className="los-m2-detail-name">{node.name[lang]}</h4>
                {node.headline && <p className="los-data-sm los-m2-detail-headline">{node.headline[lang]}</p>}
                <div className="los-m2-field">
                    <span className="los-data-sm los-m2-field-label">{t.definition}</span>
                    <p>{node.definition[lang]}</p>
                </div>
                <div className="los-m2-field">
                    <span className="los-data-sm los-m2-field-label">{t.formula}</span>
                    <code className="los-m2-formula">{node.formula}</code>
                </div>
                <div className="los-m2-field is-guardrail">
                    <span className="los-data-sm los-m2-field-label">{t.guardrail}</span>
                    <p>{node.guardrail[lang]}</p>
                </div>
                {node.laddersUp && (
                    <div className="los-m2-field">
                        <span className="los-data-sm los-m2-field-label">{t.laddersUp}</span>
                        <p>{node.laddersUp[lang]}</p>
                    </div>
                )}
                {node.experiment && (
                    <div className="los-m2-exp">
                        <div className="los-m2-exp-head">
                            <span className="los-data-sm los-m2-field-label">{t.experiment}</span>
                            <span className={`los-data-sm los-m2-exp-result is-${node.experiment.result}`}>
                                {t.resultWord[node.experiment.result]}
                            </span>
                        </div>
                        <p className="los-m2-exp-title">{node.experiment.title[lang]}</p>
                        {['hypothesis', 'variant', 'primary', 'guardrailMetric'].map(field => (
                            <p className="los-m2-exp-line" key={field}>
                                <span className="los-data-sm">{t.expFields[field]}</span>
                                {node.experiment[field][lang]}
                            </p>
                        ))}
                        <p className="los-m2-exp-line">
                            <span className="los-data-sm">{t.expFields.conclusion}</span>
                            {node.experiment.conclusion[lang]}
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
}

// ---- module -------------------------------------------------------------------
export default function MetricTreeExplorer() {
    const { lang, t } = useI18n(COPY);
    const viewport = useViewport();
    const reducedMotion = usePrefersReducedMotion();
    const [selectedId, setSelectedId] = useState('t1');
    const selected = findEntry(selectedId).node;

    return (
        <ModuleFrame
            id="los-module-metric-tree"
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
            context={t.context}
            roles={['TECHNICAL PM', 'AI PRODUCT DESIGNER']}
            signature={t.signature}
        >
            <div className={`los-m2-layout is-${viewport}`}>
                {viewport === 'mobile'
                    ? <TreeList t={t} lang={lang} selectedId={selectedId} onSelect={setSelectedId} />
                    : (
                        <div className="los-m2-scroll">
                            <TreeCanvas t={t} lang={lang} selectedId={selectedId} onSelect={setSelectedId} reducedMotion={reducedMotion} />
                        </div>
                    )}
                <DetailPanel t={t} lang={lang} node={selected} reducedMotion={reducedMotion} />
            </div>
            <ul className="los-sr-only" aria-label={t.srTree}>
                <li>
                    {TREE.name[lang]}: {TREE.value}
                    <ul>
                        {TREE.children.map(branch => (
                            <li key={branch.id}>
                                {branch.name[lang]} — {branch.headline?.[lang]}: {branch.value}
                                <ul>
                                    {branch.children.map(leaf => (
                                        <li key={leaf.id}>{leaf.name[lang]}: {leaf.value}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </ModuleFrame>
    );
}

// ---- styles ---------------------------------------------------------------------
injectStyles('los-m2-styles', `
.los-m2-layout { display: grid; grid-template-columns: 60% 1fr; gap: 28px; align-items: start; }
.los-m2-layout.is-tablet, .los-m2-layout.is-mobile { grid-template-columns: 1fr; }
.los-m2-scroll { overflow-x: auto; min-width: 0; scrollbar-width: thin; scrollbar-color: var(--line-2) transparent; }
.los-m2-canvas { position: relative; }
.los-m2-edges { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.los-m2-edge { fill: none; stroke: var(--line-2); stroke-width: 1.2; }
.los-m2-edge.is-active {
  stroke: var(--teal); stroke-width: 1.6;
  stroke-dasharray: 1; stroke-dashoffset: 0;
  animation: los-m2-draw 600ms var(--ease);
}
.los-m2-edge.is-active.is-static { animation: none; }
@keyframes los-m2-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }

.los-m2-cols { display: grid; grid-template-columns: 1.1fr 1fr 1.2fr; gap: 24px; }
.los-m2-col { display: flex; flex-direction: column; justify-content: center; gap: 14px; }
.los-m2-col.is-leaves { gap: 22px; }
.los-m2-leafgroup { display: flex; flex-direction: column; gap: 8px; }

.los-m2-node {
  display: block; width: 100%;
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  padding: 10px 12px;
  transition: border-color 200ms var(--ease), background 200ms var(--ease);
}
.los-m2-node:hover { background: var(--bg-3); border-color: var(--line-2); }
.los-m2-node.is-selected { border-color: var(--teal); }
.los-m2-node.is-l0 { border-left: 3px solid var(--teal); }
.los-m2-node-name { display: block; color: var(--text-2); margin-bottom: 6px; letter-spacing: 0.02em; }
.los-m2-node.is-l2 .los-m2-node-name { font-size: 11px; }
.los-m2-node-row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.los-m2-node-value { font-family: var(--font-display); font-size: 24px; font-weight: 500; color: var(--text-1); line-height: 1; }
.los-m2-node.is-l2 .los-m2-node-value { font-size: 19px; }
.los-m2-node-dir { display: block; color: var(--text-3); margin-top: 4px; font-size: 10px; }

.los-m2-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }

.los-m2-detail { background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md); padding: 16px; }
.los-m2-detail-sticky { position: sticky; top: 0; background: var(--bg-2); padding-bottom: 8px; }
.los-m2-detail-body.is-entering { animation: los-m2-enter 320ms var(--ease); }
@keyframes los-m2-enter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
.los-m2-detail-level { color: var(--teal); letter-spacing: 0.14em; }
.los-m2-detail-name { font-size: 17px; font-weight: 600; color: var(--text-1); line-height: 1.4; margin: 6px 0 2px; }
.los-m2-detail-headline { color: var(--text-3); margin: 0 0 4px; }
.los-m2-field { margin-top: 14px; }
.los-m2-field p { margin: 4px 0 0; font-size: 13.5px; line-height: 1.65; color: var(--text-2); }
.los-m2-field-label { display: block; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-3); }
.los-m2-formula {
  display: block; margin-top: 6px;
  font-family: var(--font-data); font-size: 12.5px; color: var(--text-1);
  background: var(--bg-0); border: 1px solid var(--line-1); border-radius: var(--radius-sm);
  padding: 8px 10px; overflow-x: auto; white-space: nowrap;
}
.los-m2-field.is-guardrail {
  border-left: 2px solid var(--amber);
  padding-left: 12px;
}
.los-m2-exp {
  margin-top: 18px; border: 1px solid var(--line-2); border-radius: var(--radius-md);
  padding: 12px 14px; background: var(--bg-1);
}
.los-m2-exp-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.los-m2-exp-result.is-rejected { color: var(--amber); }
.los-m2-exp-result.is-supported { color: var(--teal); }
.los-m2-exp-title { font-size: 14px; font-weight: 600; color: var(--text-1); margin: 8px 0 2px; }
.los-m2-exp-line { font-size: 13px; line-height: 1.6; color: var(--text-2); margin: 8px 0 0; }
.los-m2-exp-line .los-data-sm { display: block; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.08em; }

@media (max-width: 1199px) {
  .los-m2-detail { margin-top: 4px; }
  .los-m2-canvas { min-width: 720px; }
}
@media (max-width: 767px) {
  .los-m2-node-value { font-size: 20px; }
}
`);
