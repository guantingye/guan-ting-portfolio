import React, { useLayoutEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// ✅ 修改：將 Metric Tree 的文字改成更像真實產品案例語氣。
// 保留原本的互動結構：North Star → Branches → Leaf metrics。
// 沒有改動模組邏輯，只優化節點名稱、定義、guardrail、laddersUp 與實驗卡文案。

const TREE = {
    id: 'ns',
    level: 0,
    value: '3.4',
    goodDirection: 'up',
    spark: [2.1, 2.2, 2.4, 2.3, 2.6, 2.7, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4],
    name: {
        en: 'Usable insights adopted per active team / week',
        zh: '每週被團隊採用的可用洞察',
    },
    definition: {
        en: 'The average number of AI-assisted insights that reach a team and are actually used in a decision each week.',
        zh: '每個活躍團隊每週實際用於判斷或討論的 AI 輔助洞察數量。',
    },
    formula: 'used_insights / active_teams / week',
    guardrail: {
        en: 'The goal is not to generate more dashboards or longer summaries. An insight only counts when it is clear enough, timely enough, and useful enough to support a real decision.',
        zh: '目標不是產生更多 dashboard 或更長的摘要。只有當洞察足夠清楚、及時，並真的被團隊拿來支持決策時，才算數。',
    },
    laddersUp: null,
    children: [
        {
            id: 'activation',
            level: 1,
            value: '71%',
            goodDirection: 'up',
            spark: [52, 55, 58, 57, 60, 63, 64, 66, 68, 69, 70, 71],
            name: { en: 'Activation', zh: '導入啟用' },
            headline: {
                en: 'Teams reaching a working setup within 14 days',
                zh: '14 天內完成可用設定的團隊',
            },
            definition: {
                en: 'The share of new teams that finish setup and start using the product in a real workflow within two weeks.',
                zh: '新團隊在兩週內完成設定，並開始在真實工作流程中使用產品的比例。',
            },
            formula: 'teams_live_≤14d / teams_started',
            guardrail: {
                en: 'Activation should not be inflated by quietly turning features on for everyone. A team only counts as activated when people understand what changed and choose to use it in their own work.',
                zh: '啟用率不能靠偷偷幫所有人打開功能來撐高。只有當團隊理解功能用途，並真的在自己的工作中開始使用，才算啟用。',
            },
            laddersUp: {
                en: 'If a team never reaches a working setup, no later metric matters. Activation creates the base for insight delivery.',
                zh: '如果團隊沒有完成可用設定，後面的價值就不會發生。導入啟用是所有洞察交付的起點。',
            },
            children: [
                {
                    id: 'a1',
                    level: 2,
                    value: '62%',
                    goodDirection: 'up',
                    spark: [45, 47, 50, 49, 52, 54, 56, 57, 59, 60, 61, 62],
                    name: {
                        en: 'First useful insight within 7 days',
                        zh: '7 天內看到第一個可用洞察',
                    },
                    definition: {
                        en: 'The share of new teams that see at least one useful insight from their own data during the first week.',
                        zh: '新團隊在第一週內，從自己的資料中看到至少一個可用洞察的比例。',
                    },
                    formula: 'teams(first_useful_insight_≤7d) / teams_started',
                    guardrail: {
                        en: 'The first insight must come from the team’s real data. A polished demo can make onboarding look smooth, but it does not prove the product works in daily use.',
                        zh: '第一個洞察必須來自團隊自己的真實資料。漂亮的示範可以讓導入看起來順利，但不能證明產品真的能在日常使用中產生價值。',
                    },
                    laddersUp: {
                        en: 'Early value is one of the strongest signals that a team will keep using the product after onboarding.',
                        zh: '越早看見真實價值，團隊越有機會在導入後繼續使用產品。',
                    },
                },
                {
                    id: 'a2',
                    level: 2,
                    value: '4.2 d',
                    goodDirection: 'down',
                    spark: [9.1, 8.6, 8.0, 7.7, 7.1, 6.5, 6.0, 5.6, 5.1, 4.8, 4.5, 4.2],
                    name: {
                        en: 'Time to first accepted suggestion',
                        zh: '首次採用建議所需時間',
                    },
                    definition: {
                        en: 'The median number of days from signup to the first time an agent accepts an AI suggestion.',
                        zh: '從註冊到客服第一次採用 AI 建議所花的中位天數。越短越好。',
                    },
                    formula: 'median(t_first_accepted − t_signup)',
                    guardrail: {
                        en: 'Faster is only better when the first accepted suggestion comes from a real case. If the team accepts a toy example quickly, the metric looks good but the product has not earned trust.',
                        zh: '速度變快只有在建議來自真實工單時才有意義。如果團隊只是很快接受一個練習案例，數字會變好，但產品還沒有真正取得信任。',
                    },
                    laddersUp: {
                        en: 'Reducing the first-value delay helps teams move from setup to regular use sooner.',
                        zh: '縮短第一次感受到價值的時間，可以讓團隊更快從設定階段進入穩定使用。',
                    },
                    experiment: {
                        title: {
                            en: 'Guided first-ticket walkthrough',
                            zh: '首張工單引導式走查',
                        },
                        hypothesis: {
                            en: 'Guiding agents through their first real ticket will reduce time to first accepted suggestion without lowering week-two usage.',
                            zh: '如果在第一張真實工單中提供引導，應該能縮短首次採用時間，且不會降低第二週使用率。',
                        },
                        variant: {
                            en: 'A: static onboarding document · B: in-editor walkthrough',
                            zh: 'A：靜態導入文件 · B：編輯器內引導',
                        },
                        primary: {
                            en: 'Time to first accepted suggestion',
                            zh: '首次採用建議所需時間',
                        },
                        guardrailMetric: {
                            en: 'Voluntary usage in week two',
                            zh: '第二週自願使用率',
                        },
                        result: 'supported',
                        conclusion: {
                            en: 'The walkthrough reduced the median time from 9.1 to 4.2 days, while week-two usage remained stable. The guided version stayed in the launch plan.',
                            zh: '引導式版本將中位時間從 9.1 天降到 4.2 天，且第二週使用率維持穩定。因此，導入引導被保留在上市方案中。',
                        },
                    },
                },
            ],
        },
        {
            id: 'workflow',
            level: 1,
            value: '5.6 h',
            goodDirection: 'up',
            spark: [3.1, 3.4, 3.6, 3.9, 4.1, 4.4, 4.6, 4.9, 5.1, 5.3, 5.5, 5.6],
            name: { en: 'Workflow value', zh: '流程價值' },
            headline: {
                en: 'Agent-hours saved per team / week',
                zh: '每團隊每週節省的客服工時',
            },
            definition: {
                en: 'Estimated time a team gets back each week when agents use AI drafts in real support work.',
                zh: '客服在真實工作中使用 AI 草稿後，團隊每週估計節省的工作時間。',
            },
            formula: 'Σ(minutes_saved) / 60 / teams / week',
            guardrail: {
                en: 'Saved time should be measured against each team’s own baseline. Otherwise, the product may look efficient simply because the comparison is outdated.',
                zh: '節省時間必須和各團隊自己的基準線比較。否則產品看起來變有效率，可能只是因為比較基準已經過期。',
            },
            laddersUp: {
                en: 'When routine replies take less time, agents can spend more attention on cases that need judgment.',
                zh: '當例行回覆花更少時間，客服就能把注意力留給真正需要判斷的工單。',
            },
            children: [
                {
                    id: 'w1',
                    level: 2,
                    value: '31',
                    goodDirection: 'up',
                    spark: [18, 20, 22, 23, 25, 26, 27, 28, 29, 30, 30, 31],
                    name: {
                        en: 'Tickets resolved with AI-assisted drafts',
                        zh: '透過 AI 草稿完成的工單數',
                    },
                    definition: {
                        en: 'The number of resolved tickets where the final reply started from an accepted AI draft.',
                        zh: '最終回覆由 AI 草稿開始，並完成結案的工單數。',
                    },
                    formula: 'tickets(draft_used ∧ resolved) / agents / week',
                    guardrail: {
                        en: 'This should not rise because AI drafts are forced into every ticket. The product should help where a draft is appropriate, not flood the editor with unnecessary suggestions.',
                        zh: '這個數字不能靠每張工單都塞 AI 草稿來衝高。產品應該在適合的地方提供協助，而不是把編輯器塞滿不必要的建議。',
                    },
                    laddersUp: {
                        en: 'This is the direct driver behind the weekly hours saved by the team.',
                        zh: '這是團隊每週節省工時最直接的來源。',
                    },
                },
                {
                    id: 'w2',
                    level: 2,
                    value: '3.8 min',
                    goodDirection: 'up',
                    spark: [2.6, 2.8, 2.9, 3.0, 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.7, 3.8],
                    name: {
                        en: 'Minutes saved per resolved ticket',
                        zh: '每張結案工單節省時間',
                    },
                    definition: {
                        en: 'The median time saved when a ticket is handled with an accepted draft compared with similar tickets without AI assistance.',
                        zh: '使用 AI 草稿處理工單時，相較於相似的人工處理工單，平均節省的中位時間。',
                    },
                    formula: 'median(t_baseline − t_with_draft)',
                    guardrail: {
                        en: 'Time saved should not come from agents skipping review. If editing time drops to almost zero, the product may be encouraging blind acceptance.',
                        zh: '節省時間不能來自客服跳過審查。如果編輯時間趨近於零，產品可能正在鼓勵盲目接受。',
                    },
                    laddersUp: {
                        en: 'Small savings per ticket compound into meaningful team-level workflow value.',
                        zh: '每張工單省下的幾分鐘，累積起來就是團隊層級的流程價值。',
                    },
                },
            ],
        },
        {
            id: 'trust',
            level: 1,
            value: '64%',
            goodDirection: 'up',
            spark: [48, 50, 53, 52, 55, 57, 58, 60, 61, 62, 63, 64],
            name: { en: 'Trust quality', zh: '信任品質' },
            headline: {
                en: 'Agents who say suggestions are usually reliable',
                zh: '認為建議通常可靠的客服比例',
            },
            definition: {
                en: 'The share of agents who say AI suggestions are usually reliable enough to review and use in their queue.',
                zh: '認為 AI 建議通常可靠，值得在自己的工作佇列中檢查與使用的客服比例。',
            },
            formula: 'survey(reliable_enough) / respondents',
            guardrail: {
                en: 'Trust should not only move upward. After a model or workflow change, a small dip can be healthy because it means agents are still paying attention.',
                zh: '信任不應該只會往上升。模型或流程調整後，短暫下滑有時是健康訊號，代表客服仍然在認真判斷。',
            },
            laddersUp: {
                en: 'An insight that no one trusts will never become decision-grade, no matter how accurate it looks in a dashboard.',
                zh: '沒有人信任的洞察，不管在 dashboard 上看起來多準，都不會成為真正可用的決策依據。',
            },
            children: [
                {
                    id: 't1',
                    level: 2,
                    value: '58%',
                    goodDirection: 'up',
                    spark: [41, 43, 46, 45, 48, 50, 52, 53, 55, 56, 57, 58],
                    name: {
                        en: 'Suggestion acceptance rate',
                        zh: '建議採用率',
                    },
                    definition: {
                        en: 'The share of AI suggestions that agents accept, reported together with whether they edited the draft first.',
                        zh: '客服採用 AI 建議的比例，並同時區分是否有先修改草稿。',
                    },
                    formula: 'accepted / offered, split edited | as_is',
                    guardrail: {
                        en: 'A high acceptance rate is not always good. If agents accept too many drafts without editing, it may signal over-trust rather than product quality.',
                        zh: '採用率高不一定代表好。如果客服大量原文接受草稿，這可能代表過度信任，而不是品質真的更好。',
                    },
                    laddersUp: {
                        en: 'This captures trust through behavior, while the branch-level survey captures trust through attitude.',
                        zh: '這個指標從行為面觀察信任，上層調查則從態度面觀察信任。',
                    },
                    experiment: {
                        title: {
                            en: 'Confidence display format',
                            zh: '信心程度顯示方式',
                        },
                        hypothesis: {
                            en: 'Showing a numeric confidence score will help agents make better review decisions.',
                            zh: '如果顯示數值化信心分數，客服應該能更精準地判斷哪些建議可以採用。',
                        },
                        variant: {
                            en: 'A: three-level label · B: numeric score',
                            zh: 'A：三段式標籤 · B：數值分數',
                        },
                        primary: {
                            en: 'Share of accepted suggestions that were reviewed or edited',
                            zh: '採用建議中經過檢查或修改的比例',
                        },
                        guardrailMetric: {
                            en: 'Wrong suggestions accepted per 1,000 accepted drafts',
                            zh: '每千次採用中的錯誤建議數',
                        },
                        result: 'rejected',
                        conclusion: {
                            en: 'The numeric score created false certainty. Agents accepted more low-confidence drafts without editing, so the team kept the simpler three-level label.',
                            zh: '數值分數反而製造了過度確定感。客服更常原文接受低信心草稿，因此團隊最後保留較簡單的三段式標籤。',
                        },
                    },
                },
                {
                    id: 't2',
                    level: 2,
                    value: '87%',
                    goodDirection: 'up',
                    spark: [78, 80, 81, 83, 82, 84, 85, 85, 86, 86, 87, 87],
                    name: {
                        en: 'Low-confidence suggestions sent to human review',
                        zh: '低信心建議轉人工檢查比例',
                    },
                    definition: {
                        en: 'The share of low-confidence suggestions that are routed to a human-first review path instead of being shown as normal drafts.',
                        zh: '低信心建議中，被導向人工優先檢查流程，而不是直接作為一般草稿呈現的比例。',
                    },
                    formula: 'low_conf_reviewed / low_conf_outputs',
                    guardrail: {
                        en: 'A very high review rate can also mean the system is avoiding hard cases. Read this next to product coverage, not by itself.',
                        zh: '轉人工比例太高，也可能代表系統正在避開困難案例。這個數字必須和產品覆蓋率一起看，不能單獨解讀。',
                    },
                    laddersUp: {
                        en: 'It shows whether the confidence boundary is actually respected in the workflow.',
                        zh: '它用來確認信心邊界是否真的在流程中被遵守，而不只是寫在文件裡。',
                    },
                },
            ],
        },
        {
            id: 'retention',
            level: 1,
            value: '74%',
            goodDirection: 'up',
            spark: [61, 63, 64, 66, 67, 68, 70, 71, 72, 73, 73, 74],
            name: { en: 'Continued use', zh: '持續使用' },
            headline: {
                en: 'Teams still active in week 8',
                zh: '第八週仍持續使用的團隊',
            },
            definition: {
                en: 'The share of activated teams still using the product in their eighth week.',
                zh: '已啟用團隊在第八週仍持續使用產品的比例。',
            },
            formula: 'teams_active_week8 / teams_activated',
            guardrail: {
                en: 'Retention should not rely on a manager mandate. The signal that matters is whether agents keep using the product when they are free to stop.',
                zh: '留存不能只靠主管要求撐住。真正重要的是：當客服可以不用時，他們是否仍然願意繼續使用。',
            },
            laddersUp: {
                en: 'Continued use keeps teams in the active base that produces weekly adopted insights.',
                zh: '持續使用讓團隊留在活躍基礎中，持續產生可被採用的洞察。',
            },
            children: [
                {
                    id: 'r1',
                    level: 2,
                    value: '81%',
                    goodDirection: 'up',
                    spark: [70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 80, 81],
                    name: {
                        en: 'Voluntary weekly usage',
                        zh: '每週自願使用率',
                    },
                    definition: {
                        en: 'The share of provisioned agents who used the product this week without a team-level requirement.',
                        zh: '在沒有團隊強制要求下，本週仍主動使用產品的客服比例。',
                    },
                    formula: 'agents_active_7d / agents_provisioned',
                    guardrail: {
                        en: 'Mandated usage is excluded because it makes the number larger but the signal weaker.',
                        zh: '強制使用不列入計算，因為它會讓數字變大，但讓訊號變弱。',
                    },
                    laddersUp: {
                        en: 'Voluntary use usually changes before team-level churn appears.',
                        zh: '自願使用率通常會比團隊流失更早開始變化。',
                    },
                },
                {
                    id: 'r2',
                    level: 2,
                    value: '9%',
                    goodDirection: 'down',
                    spark: [16, 15, 14, 14, 13, 12, 12, 11, 10, 10, 9, 9],
                    name: {
                        en: 'Opt-out rate after the first month',
                        zh: '首月後停用率',
                    },
                    definition: {
                        en: 'The share of onboarded agents who turn the feature off within the first month.',
                        zh: '導入後一個月內，主動關閉功能的客服比例。越低越好。',
                    },
                    formula: 'agents_opted_out_≤30d / agents_onboarded',
                    guardrail: {
                        en: 'A low opt-out rate can be misleading if people simply stop using the product without turning it off.',
                        zh: '如果使用者只是放著不用、但沒有正式關閉功能，低停用率也可能造成誤判。',
                    },
                    laddersUp: {
                        en: 'Early opt-out behavior helps explain whether retention is real or only passive.',
                        zh: '早期停用行為可以幫助判斷留存是真實使用，還是只是被動留著。',
                    },
                },
            ],
        },
        {
            id: 'risk',
            level: 1,
            value: '1.8',
            goodDirection: 'down',
            spark: [4.1, 3.8, 3.6, 3.4, 3.1, 2.9, 2.7, 2.5, 2.3, 2.1, 1.9, 1.8],
            name: { en: 'Risk reduction', zh: '風險降低' },
            headline: {
                en: 'Wrong suggestions per 1,000 accepted drafts',
                zh: '每千次採用中的錯誤建議數',
            },
            definition: {
                en: 'Reported cases where an accepted AI suggestion was materially wrong, counted per thousand accepted drafts.',
                zh: '被採用的 AI 建議事後確認有實質錯誤的通報數，以每千次採用計算。越低越好。',
            },
            formula: 'reported_errors / accepted × 1000',
            guardrail: {
                en: 'A falling error count can mean fewer reports, not fewer mistakes. This metric only matters when audit samples move in the same direction.',
                zh: '錯誤數下降可能代表通報變少，不一定代表錯誤真的變少。只有當稽核抽樣也同向改善時，這個指標才可信。',
            },
            laddersUp: {
                en: 'One visible wrong answer can damage trust across the whole product, so this branch protects the rest of the tree.',
                zh: '一次明顯錯誤就可能傷害整個產品的信任，因此這條支線是在保護整棵指標樹。',
            },
            children: [
                {
                    id: 'k1',
                    level: 2,
                    value: '96.5%',
                    goodDirection: 'up',
                    spark: [91.0, 91.8, 92.5, 93.1, 93.6, 94.2, 94.7, 95.1, 95.5, 95.9, 96.2, 96.5],
                    name: {
                        en: 'Policy citation check pass rate',
                        zh: '政策引用檢查通過率',
                    },
                    definition: {
                        en: 'The share of policy references in AI drafts that are checked against the approved knowledge base before being shown.',
                        zh: 'AI 草稿中的政策引用，在顯示前通過核准知識庫比對的比例。',
                    },
                    formula: 'citations_checked / citations_shown',
                    guardrail: {
                        en: 'A perfect pass rate can be suspicious if the system simply removes citations instead of verifying them.',
                        zh: '如果通過率完美到不合理，可能不是系統更準，而是它乾脆不顯示引用。',
                    },
                    laddersUp: {
                        en: 'This reduces the chance that the assistant gives a confident but unsupported policy answer.',
                        zh: '這能降低 AI 給出看似自信、但缺乏依據的政策回答風險。',
                    },
                },
                {
                    id: 'k2',
                    level: 2,
                    value: '99.2%',
                    goodDirection: 'up',
                    spark: [98.8, 99.0, 98.9, 99.1, 99.0, 99.2, 99.1, 99.2, 99.3, 99.2, 99.2, 99.2],
                    name: {
                        en: 'Sensitive data detection in audit samples',
                        zh: '敏感資料偵測通過率',
                    },
                    definition: {
                        en: 'The share of planted sensitive data that the system catches in quarterly audit samples.',
                        zh: '每季稽核樣本中，系統成功攔截刻意放入的敏感資料比例。',
                    },
                    formula: 'sensitive_data_caught / sensitive_data_present',
                    guardrail: {
                        en: 'Audit samples must include messy real-world formats. Otherwise, the test becomes too easy and stops reflecting real risk.',
                        zh: '稽核樣本必須包含真實世界中混亂的格式，否則測試會變得太簡單，無法反映真正風險。',
                    },
                    laddersUp: {
                        en: 'This protects the product from leaking sensitive customer information while still allowing useful drafting support.',
                        zh: '這能在保留草稿輔助價值的同時，降低敏感客戶資訊外洩的風險。',
                    },
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
        eyebrow: 'MODULE 02 — PRODUCT METRIC SYSTEM',
        title: 'Metric Tree Explorer',
        lead: [
            'This module turns the question “Is AI truly improving support work?” into a traceable metric tree, linking adoption, workflow efficiency, and user trust to sustained use and risk control.',
            'Each metric node includes a clear definition, calculation method, relationship to its parent objective, and a guardrail that prevents the metric from being optimized in the wrong way. The team can therefore see not only growth, but also the risks and trade-offs behind the numbers.',
        ],
        context: 'Scenario: This module continues the Meridian support-reply assistant and uses 12 weeks of simulated data to show how teams define product value, track adoption behavior, and avoid overlooking quality and safety while pursuing growth.',
        signature: 'Signature interaction: select a metric and the path back to the North Star is highlighted.',
        detailTitle: 'NODE DETAIL',
        definition: 'Definition',
        formula: 'Formula',
        guardrail: 'What not to sacrifice',
        laddersUp: 'Why this affects the upper metric',
        experiment: 'Validation experiment',
        expFields: {
            hypothesis: 'Hypothesis',
            variant: 'Variants',
            primary: 'Primary metric',
            guardrailMetric: 'Guardrail metric',
            conclusion: 'Conclusion',
        },
        resultWord: {
            supported: 'SUPPORTED',
            rejected: 'REJECTED',
        },
        northStar: 'NORTH STAR',
        branch: 'BRANCH',
        leaf: 'METRIC',
        srTree: 'Metric tree as a nested list',
        trend: (first, last, dir, good) =>
            `12-week trend, from ${first} to ${last}, ${dir === 'up' ? 'rising' : 'falling'}${good ? '' : ' (down is better for this metric)'}`,
        lowerBetter: 'down = better',
    },
    zh: {
        eyebrow: 'MODULE 02 — PRODUCT METRIC SYSTEM',
        title: '指標樹瀏覽器',
        lead: [
            '這個模組將「AI 是否真正改善客服工作」拆成一套可追蹤的指標樹，從導入、流程效益與使用者信任，一路連結到持續使用與風險控制。',
            '每個指標節點都包含明確定義、計算方式、與上層目標的關係，以及一項防止數字被錯誤優化的護欄條件。團隊因此不只看見成長，也能理解數字背後的風險與取捨。',
        ],
        context: '案例情境：本模組延續 Meridian 客服回覆輔助工具，使用 12 週模擬資料，示範團隊如何定義產品價值、追蹤採用行為，並避免在追求成長時忽略品質與安全。',
        signature: '點選任一指標，系統會標示它如何一路連回 North Star。',
        detailTitle: 'NODE DETAIL',
        definition: '定義',
        formula: '計算方式',
        guardrail: '不能犧牲的事',
        laddersUp: '為什麼影響上層指標',
        experiment: '驗證實驗',
        expFields: {
            hypothesis: '假設',
            variant: '測試版本',
            primary: '主要觀察指標',
            guardrailMetric: '護欄指標',
            conclusion: '結果與判斷',
        },
        resultWord: {
            supported: '假設成立',
            rejected: '假設不成立',
        },
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
            width="64"
            height="20"
            viewBox="0 0 64 20"
            role="img"
            aria-label={t.trend(spark[0], spark[spark.length - 1], dir, good)}
        >
            <polyline
                points={points}
                fill="none"
                stroke="var(--teal)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ---- tree -------------------------------------------------------------------
function NodeCard({ node, t, lang, selected, onSelect, registerRef }) {
    return (
        <button
            ref={el => registerRef(node.id, el)}
            className={`los-m2-node is-l${node.level}${selected ? ' is-selected' : ''}`}
            aria-pressed={selected}
            onClick={() => onSelect(node.id)}
        >
            <span className="los-data-sm los-m2-node-name">
                {node.name[lang]}
            </span>

            <span className="los-m2-node-row">
                <span className="los-m2-node-value">
                    {node.value}
                </span>
                <Sparkline node={node} t={t} />
            </span>

            {node.goodDirection === 'down' && (
                <span className="los-data-sm los-m2-node-dir">
                    {t.lowerBetter}
                </span>
            )}
        </button>
    );
}

function TreeCanvas({ t, lang, selectedId, onSelect, reducedMotion }) {
    const canvasRef = useRef(null);
    const nodeEls = useRef(new Map());
    const [edges, setEdges] = useState([]);

    const registerRef = (id, el) => {
        if (el) nodeEls.current.set(id, el);
    };

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

        if (grand && grand.parent) {
            keys.push(`${grand.parent.id}-${entry.parent.id}`);
        }

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
                    <NodeCard
                        node={TREE}
                        t={t}
                        lang={lang}
                        selected={selectedId === 'ns'}
                        onSelect={onSelect}
                        registerRef={registerRef}
                    />
                </div>

                <div className="los-m2-col is-branches">
                    {TREE.children.map(branch => (
                        <NodeCard
                            key={branch.id}
                            node={branch}
                            t={t}
                            lang={lang}
                            selected={selectedId === branch.id}
                            onSelect={onSelect}
                            registerRef={registerRef}
                        />
                    ))}
                </div>

                <div className="los-m2-col is-leaves">
                    {TREE.children.map(branch => (
                        <div className="los-m2-leafgroup" key={branch.id}>
                            {branch.children.map(leaf => (
                                <NodeCard
                                    key={leaf.id}
                                    node={leaf}
                                    t={t}
                                    lang={lang}
                                    selected={selectedId === leaf.id}
                                    onSelect={onSelect}
                                    registerRef={registerRef}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TreeList({ t, lang, selectedId, onSelect }) {
    const item = (node, depth) => (
        <li key={node.id} style={{ paddingLeft: depth * 18 }}>
            <NodeCard
                node={node}
                t={t}
                lang={lang}
                selected={selectedId === node.id}
                onSelect={onSelect}
                registerRef={() => {}}
            />
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
                <span className="los-data-sm los-m2-detail-level">
                    {levelWord}
                </span>

                <h4 className="los-m2-detail-name">
                    {node.name[lang]}
                </h4>

                {node.headline && (
                    <p className="los-data-sm los-m2-detail-headline">
                        {node.headline[lang]}
                    </p>
                )}

                <div className="los-m2-field">
                    <span className="los-data-sm los-m2-field-label">
                        {t.definition}
                    </span>
                    <p>{node.definition[lang]}</p>
                </div>

                <div className="los-m2-field">
                    <span className="los-data-sm los-m2-field-label">
                        {t.formula}
                    </span>
                    <code className="los-m2-formula">
                        {node.formula}
                    </code>
                </div>

                <div className="los-m2-field is-guardrail">
                    <span className="los-data-sm los-m2-field-label">
                        {t.guardrail}
                    </span>
                    <p>{node.guardrail[lang]}</p>
                </div>

                {node.laddersUp && (
                    <div className="los-m2-field">
                        <span className="los-data-sm los-m2-field-label">
                            {t.laddersUp}
                        </span>
                        <p>{node.laddersUp[lang]}</p>
                    </div>
                )}

                {node.experiment && (
                    <div className="los-m2-exp">
                        <div className="los-m2-exp-head">
                            <span className="los-data-sm los-m2-field-label">
                                {t.experiment}
                            </span>

                            <span className={`los-data-sm los-m2-exp-result is-${node.experiment.result}`}>
                                {t.resultWord[node.experiment.result]}
                            </span>
                        </div>

                        <p className="los-m2-exp-title">
                            {node.experiment.title[lang]}
                        </p>

                        {['hypothesis', 'variant', 'primary', 'guardrailMetric'].map(field => (
                            <p className="los-m2-exp-line" key={field}>
                                <span className="los-data-sm">
                                    {t.expFields[field]}
                                </span>
                                {node.experiment[field][lang]}
                            </p>
                        ))}

                        <p className="los-m2-exp-line">
                            <span className="los-data-sm">
                                {t.expFields.conclusion}
                            </span>
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
                {viewport === 'mobile' ? (
                    <TreeList
                        t={t}
                        lang={lang}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                ) : (
                    <div className="los-m2-scroll">
                        <TreeCanvas
                            t={t}
                            lang={lang}
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                            reducedMotion={reducedMotion}
                        />
                    </div>
                )}

                <DetailPanel
                    t={t}
                    lang={lang}
                    node={selected}
                    reducedMotion={reducedMotion}
                />
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
                                        <li key={leaf.id}>
                                            {leaf.name[lang]}: {leaf.value}
                                        </li>
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
.los-m2-layout {
  display: grid;
  grid-template-columns: 60% 1fr;
  gap: 28px;
  align-items: start;
}

.los-m2-layout.is-tablet,
.los-m2-layout.is-mobile {
  grid-template-columns: 1fr;
}

.los-m2-scroll {
  overflow-x: auto;
  min-width: 0;
  scrollbar-width: thin;
  scrollbar-color: var(--line-2) transparent;
}

.los-m2-canvas {
  position: relative;
  min-width: 760px;
}

.los-m2-edges {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.los-m2-edge {
  fill: none;
  stroke: var(--line-2);
  stroke-width: 1.2;
}

.los-m2-edge.is-active {
  stroke: var(--teal);
  stroke-width: 1.6;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: los-m2-draw 600ms var(--ease);
}

.los-m2-edge.is-active.is-static {
  animation: none;
}

@keyframes los-m2-draw {
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
}

.los-m2-cols {
  display: grid;
  grid-template-columns: 1.1fr 1fr 1.2fr;
  gap: 24px;
}

.los-m2-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
}

.los-m2-col.is-leaves {
  gap: 22px;
}

.los-m2-leafgroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.los-m2-node {
  display: block;
  width: 100%;
  background: var(--bg-2);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  transition: border-color 200ms var(--ease), background 200ms var(--ease), box-shadow 200ms var(--ease);
}

.los-m2-node:hover {
  background: var(--bg-3);
  border-color: var(--line-2);
}

.los-m2-node.is-selected {
  border-color: var(--teal);
  box-shadow: 0 0 0 1px rgba(53, 194, 176, 0.2);
}

.los-m2-node.is-l0 {
  border-left: 3px solid var(--teal);
}

.los-m2-node.is-l1 {
  border-left: 3px solid rgba(53, 194, 176, 0.55);
}

.los-m2-node.is-l2 {
  border-left: 3px solid rgba(53, 194, 176, 0.28);
}

.los-m2-node-name {
  display: block;
  color: var(--text-2);
  margin-bottom: 8px;
}

.los-m2-node-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.los-m2-node-value {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1;
  color: var(--text-1);
}

.los-m2-node-dir {
  display: inline-block;
  color: var(--amber);
  margin-top: 6px;
}

.los-m2-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.los-m2-detail {
  min-width: 0;
}

.los-m2-detail-sticky {
  margin-bottom: 12px;
}

.los-m2-detail-body {
  background: var(--bg-2);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.los-m2-detail-body.is-entering {
  animation: los-m2-fade 260ms var(--ease);
}

@keyframes los-m2-fade {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.los-m2-detail-level {
  color: var(--teal);
  display: block;
  margin-bottom: 8px;
}

.los-m2-detail-name {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1.12;
  color: var(--text-1);
  margin: 0 0 8px;
}

.los-m2-detail-headline {
  color: var(--text-3);
  margin: 0 0 18px;
}

.los-m2-field {
  margin-top: 16px;
}

.los-m2-field-label {
  display: block;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 6px;
}

.los-m2-field p {
  margin: 0;
  color: var(--text-2);
  line-height: 1.72;
}

.los-m2-field.is-guardrail {
  border-left: 2px solid var(--amber);
  padding-left: 12px;
}

.los-m2-formula {
  display: block;
  color: var(--teal);
  background: var(--bg-0);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  font-family: var(--font-data);
  font-size: 12px;
  line-height: 1.6;
  white-space: normal;
  word-break: break-word;
}

.los-m2-exp {
  margin-top: 20px;
  padding: 14px;
  background: var(--bg-0);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-md);
}

.los-m2-exp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.los-m2-exp-result {
  color: var(--text-3);
  border: 1px solid var(--line-2);
  border-radius: var(--radius-sm);
  padding: 2px 8px;
}

.los-m2-exp-result.is-supported {
  color: var(--teal);
  border-color: var(--teal);
  background: var(--teal-dim);
}

.los-m2-exp-result.is-rejected {
  color: var(--amber);
  border-color: var(--amber);
  background: var(--amber-dim);
}

.los-m2-exp-title {
  color: var(--text-1);
  font-weight: 600;
  margin: 0 0 10px;
}

.los-m2-exp-line {
  margin: 8px 0 0;
  color: var(--text-2);
  line-height: 1.65;
}

.los-m2-exp-line span {
  display: block;
  color: var(--text-3);
  margin-bottom: 2px;
}

@media (max-width: 767px) {
  .los-m2-detail-body {
    padding: 16px;
  }

  .los-m2-detail-name {
    font-size: 24px;
  }

  .los-m2-node-value {
    font-size: 24px;
  }
}
`);
