import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// Fictional scenario: "Meridian", an AI reply assistant for B2B support teams.
// ✅ 修改：將案例資料語氣改得更像真實產品評估紀錄，減少工程術語與硬翻譯。

const DIMENSIONS = ['reach', 'impact', 'confidence', 'effort'];
const DEFAULT_WEIGHTS = { reach: 40, impact: 0, confidence: 40, effort: 20 };

const SIGNALS = [
    {
        id: 'S1',
        category: 'customer',
        confidence: 'corroborated',
        opportunities: ['A', 'C'],
        text: {
            en: 'A substantial share of frontline support tickets concern repeat questions, yet agents still spend time rewriting similar replies every day.',
            zh: '一線客服工單中，有相當比例屬於重複問題；客服人員每天仍需花時間重新撰寫相似回覆。',
        },
        source: { en: 'support ticket review', zh: '客服工單回顧' },
    },
    {
        id: 'S2',
        category: 'customer',
        confidence: 'corroborated',
        opportunities: ['B'],
        text: {
            en: 'Escalated tickets typically take longer to close and are more likely to receive negative customer-satisfaction feedback.',
            zh: '需要升級處理的工單通常結案時間更長，也更容易收到負面的客戶滿意度回饋。',
        },
        source: { en: 'support performance review', zh: '客服表現回顧' },
    },
    {
        id: 'S3',
        category: 'market',
        confidence: 'single',
        opportunities: ['A'],
        text: {
            en: 'Several support tools have recently introduced AI draft-reply features, suggesting that reply assistance is gradually becoming a baseline expectation for enterprise buyers.',
            zh: '多家客服工具近期推出 AI 草稿回覆功能，顯示「回覆輔助」正逐漸成為企業買方的基本期待。',
        },
        source: { en: 'early signal', zh: '初步訊號' },
    },
    {
        id: 'S4',
        category: 'technical',
        confidence: 'corroborated',
        opportunities: ['A', 'B'],
        text: {
            en: 'The team has accumulated historical tickets and agent replies for offline testing to assess whether AI suggestions can shorten handling time while maintaining response quality.',
            zh: '團隊已累積歷史工單與客服回覆，可用於離線測試，評估 AI 建議是否能縮短處理時間並維持回覆品質。',
        },
        source: { en: 'data review', zh: '資料盤點' },
    },
    {
        id: 'S5',
        category: 'regulatory',
        confidence: 'single',
        confidenceLabel: { en: 'Initial opinion', zh: '初步意見' },
        opportunities: ['A'],
        text: {
            en: 'Legal’s initial recommendation is to retain a human confirmation step before AI-generated replies are sent, to avoid unnecessary review records.',
            zh: '法務初步建議：AI 產生的回覆在送出前，應保留人工確認機制，以避免不必要的審核紀錄。',
        },
        source: { en: 'legal review', zh: '法務審查' },
    },
    {
        id: 'S6',
        category: 'customer',
        confidence: 'weak',
        opportunities: ['D'],
        text: {
            en: 'Several support leads want a weekly view of the issues customers raise most often, but actual usage frequency and decision contexts still need validation.',
            zh: '多位客服主管希望每週掌握客戶最常反映的問題，但仍需進一步確認實際使用頻率與決策情境。',
        },
        source: { en: 'lead interviews', zh: '主管訪談' },
    },
    {
        id: 'S7',
        category: 'technical',
        confidence: 'weak',
        opportunities: ['C'],
        text: {
            en: 'Some reopened tickets are linked to outdated help-center articles, suggesting that knowledge-content gaps may be increasing the handling burden on support staff.',
            zh: '部分重新開啟的工單與過期說明文件有關，顯示知識內容落差可能正在增加客服人員的處理負擔。',
        },
        source: { en: 'ticket review', zh: '工單回顧' },
    },
    {
        id: 'S8',
        category: 'market',
        confidence: 'corroborated',
        opportunities: ['A', 'B'],
        text: {
            en: 'In recent churn interviews, several customers mentioned that slow first-response times were one reason they considered switching support tools.',
            zh: '在近期流失訪談中，多位客戶提到首次回覆速度過慢，是考慮更換客服工具的原因之一。',
        },
        source: { en: 'churn interviews', zh: '流失訪談' },
    },
];

const OPPORTUNITIES = [
    {
        id: 'A',
        // ✅ 修改：name 改成中英文物件，讓中文頁不再顯示硬式英文功能名。
        name: {
            en: 'Draft-reply assistant for common questions',
            zh: '常見問題回覆草稿助手',
        },
        scores: { reach: 7, impact: 6, confidence: 7, effort: 8 },
        gates: [2, 3, 6],
        gateLabels: [
            { en: '02 Data readiness', zh: '02 資料準備度' },
            { en: '03 AI risk controllability', zh: '03 AI 風險可控性' },
            { en: '06 Fallback flow', zh: '06 備援流程' },
        ],
        rationale: {
            en: 'This is currently the most suitable version to validate first. The team has historical tickets and agent replies as a testing foundation, and every AI draft is confirmed by a support agent before it is sent, keeping risk relatively manageable. It mainly shortens the time spent writing repetitive content, making it a suitable first-stage MVP rather than a direct replacement for the full support-reply workflow.',
            zh: '這是目前最適合先行驗證的版本。團隊已有歷史工單與客服回覆可作為測試基礎，每則 AI 草稿也會在送出前由客服人員確認，風險相對可控。它主要縮短重複內容的撰寫時間，因此適合作為第一階段 MVP，而不是直接取代完整的客服回覆流程。',
        },
    },
    {
        id: 'B',
        name: {
            en: 'Early warning for risky support tickets',
            zh: '高風險工單預警',
        },
        scores: { reach: 9, impact: 9, confidence: 7, effort: 4 },
        gates: [1, 3, 7],
        gateLabels: [
            { en: '01 Demand urgency', zh: '01 需求急迫性' },
            { en: '03 AI risk controllability', zh: '03 AI 風險可控性' },
            { en: '07 Ongoing monitoring ownership', zh: '07 持續監測責任' },
        ],
        rationale: {
            en: 'Under the current weighting, this opportunity scores highest because it directly addresses the handling time, operating cost, and customer-trust losses caused by escalated tickets. However, false positives or missed alerts from an early-warning model could also disrupt support prioritization. The next step is to validate alert accuracy, risk-tolerance thresholds, and ongoing monitoring before deciding whether to scale investment.',
            zh: '在目前的評估權重下，這項機會取得最高分，因為它直接對應升級工單造成的處理時間、營運成本與客戶信任損失。不過，預警模型若出現誤判或漏判，也可能干擾客服的處理順序。下一步應先驗證預警準確度、風險容忍範圍與持續監測機制，再決定是否擴大投入。',
        },
    },
    {
        id: 'C',
        name: {
            en: 'Knowledge-base gap detection',
            zh: '知識文件缺口偵測',
        },
        scores: { reach: 5, impact: 7, confidence: 5, effort: 6 },
        gates: [1, 4, 7],
        gateLabels: [
            { en: '01 Demand urgency', zh: '01 需求急迫性' },
            { en: '04 Workflow fit', zh: '04 工作流程適配' },
            { en: '07 Ongoing maintenance ownership', zh: '07 持續維護責任' },
        ],
        rationale: {
            en: 'This function is less conspicuous, but it may deliver steady long-term benefits. If outdated or missing knowledge content is indeed causing repeat tickets, improving documentation quality can reduce future support load. The evidence is still early, so it is better suited to small-scale validation before deciding whether to make it part of the main product roadmap.',
            zh: '這項功能較不顯眼，卻可能帶來穩定的長期效益。若過期或缺漏的知識內容確實造成重複工單，改善文件品質就能降低未來的客服負擔。現階段證據仍偏早期，較適合先進行小規模驗證，再評估是否納入主要產品路線。',
        },
    },
    {
        id: 'D',
        name: {
            en: 'Weekly customer question trend summary',
            zh: '每週客戶問題趨勢摘要',
        },
        scores: { reach: 6, impact: 6, confidence: 8, effort: 6 },
        gates: [4, 5],
        gateLabels: [
            { en: '04 Workflow fit', zh: '04 工作流程適配' },
            { en: '05 Value clarity', zh: '05 產品價值可理解性' },
        ],
        rationale: {
            en: 'This feature is easy to understand and can naturally fit into existing weekly meetings and support-review workflows. It can help teams identify recurring issues and changing trends from large volumes of feedback, but it still needs to show that its summaries genuinely improve product prioritization or operational decisions.',
            zh: '這項功能容易理解，也能自然融入既有的週會與客服檢討流程。它可以協助團隊從大量回饋中辨認重複問題與變化趨勢，但目前仍需進一步證明，摘要結果是否真的能改善產品優先排序或營運決策。',
        },
    },
];

const GATES = [
    {
        id: 1,
        // ✅ 修改：gate name 改成中英文物件，讓中文頁變成自然的上市檢查項目。
        name: {
            en: 'User need is clear and urgent enough',
            zh: '需求是否足夠明確且急迫',
        },
        status: 'pass',
        signals: ['S1', 'S2', 'S8'],
        statusNote: {
            en: 'Supported by multiple market and user evidence sources',
            zh: '已有多項市場與使用者證據支持',
        },
        criteria: [
            {
                done: true,
                en: 'The pain appears in more than one source',
                zh: '痛點不只出現在單一來源',
            },
            {
                done: true,
                en: 'The issue creates visible time, cost, or trust loss',
                zh: '問題已造成明確的時間、成本或信任損失',
            },
        ],
        evidence: {
            en: 'Support ticket review and churn notes both point to slow response and repeated support friction.',
            zh: '客服工單回顧與流失紀錄都指向回覆速度慢、重複問題多等客服摩擦。',
        },
    },
    {
        id: 2,
        name: {
            en: 'Usable, compliant data is available',
            zh: '是否具備可用且合規的資料',
        },
        status: 'pass',
        signals: ['S4'],
        statusNote: {
            en: 'Data scope and quality have completed an initial review',
            zh: '資料範圍與品質已完成初步盤點',
        },
        criteria: [
            {
                done: true,
                en: 'Past support data is available and allowed to be used',
                zh: '過去客服資料可以取得，且允許被用於產品驗證',
            },
            {
                done: true,
                en: 'Someone is responsible for keeping the dataset updated',
                zh: '已有負責人維護資料更新',
            },
        ],
        evidence: {
            en: 'The team has reviewed 18 months of resolved tickets and agent replies.',
            zh: '團隊已盤點 18 個月的已結案工單與客服回覆。',
        },
    },
    {
        id: 3,
        name: {
            en: 'Model and AI risks are manageable',
            zh: '模型與 AI 風險是否可控',
        },
        status: 'conditional',
        signals: ['S5'],
        statusNote: {
            en: 'Legal and risk reviews still need completion',
            zh: '仍需完成法務與風險審查',
        },
        criteria: [
            {
                done: true,
                en: 'Likely failure cases have been listed with response plans',
                zh: '主要失誤情境已列出，並有初步處理方式',
            },
            {
                done: false,
                en: 'Disclosure rules are clear for each launch market',
                zh: '各上市市場的 AI 揭露規則仍需確認',
            },
        ],
        evidence: {
            en: 'The team has a first risk list, but legal review is still needed before launch.',
            zh: '團隊已有初步風險清單，但正式上線前仍需要法務確認。',
        },
    },
    {
        id: 4,
        name: {
            en: 'Can it be embedded in the existing workflow',
            zh: '是否能嵌入既有工作流程',
        },
        status: 'pass',
        signals: ['S1', 'S6'],
        statusNote: {
            en: 'Can connect with the current customer-support reply flow',
            zh: '可銜接目前的客服回覆流程',
        },
        criteria: [
            {
                done: true,
                en: 'Agents can use it without switching tools',
                zh: '客服不需要切換工具即可使用',
            },
            {
                done: true,
                en: 'The feature appears at the moment when help is needed',
                zh: '功能出現在客服真正需要協助的工作當下',
            },
        ],
        evidence: {
            en: 'The draft appears in the existing reply editor, so agents can review and adjust it before sending.',
            zh: '草稿可出現在既有回覆編輯器中，客服能在送出前直接檢查與修改。',
        },
    },
    {
        id: 5,
        name: {
            en: 'Can buyers clearly understand the product value',
            zh: '買方是否能清楚理解產品價值',
        },
        status: 'pass',
        signals: ['S3', 'S8'],
        statusNote: {
            en: 'Core value and priority use cases are clear',
            zh: '核心價值與優先使用情境已明確',
        },
        criteria: [
            {
                done: true,
                en: 'The buyer can explain the value in one sentence',
                zh: '買方能用一句話說出產品價值',
            },
            {
                done: true,
                en: 'The value story can survive competitor comparison',
                zh: '產品敘事經得起與競品比較',
            },
        ],
        evidence: {
            en: 'Slow first response gives the product a clear urgency story, while market scans show the category is becoming familiar to buyers.',
            zh: '首次回覆太慢提供了清楚的急迫性，而市場觀察也顯示買方已逐漸熟悉這類功能。',
        },
    },
    {
        id: 6,
        name: {
            en: 'Are failure and fallback processes complete',
            zh: '失效與備援流程是否完成',
        },
        status: 'conditional',
        signals: ['S5', 'S7'],
        statusNote: {
            en: 'Fallback and human-handoff procedures have not been rehearsed',
            zh: '尚未完成備援流程與人工接手機制演練',
        },
        criteria: [
            {
                done: true,
                en: 'The team knows what happens when AI is unavailable',
                zh: '已定義 AI 不可用時的處理方式',
            },
            {
                done: false,
                en: 'The team has rehearsed how to handle a wrong suggestion',
                zh: '錯誤建議的撤回與回報流程尚未演練',
            },
        ],
        evidence: {
            en: 'Fallback behavior is drafted, but the team still needs to walk through failure cases with support operations.',
            zh: '備援方式已有草稿，但仍需要和客服營運團隊實際走過失敗情境。',
        },
    },
    {
        id: 7,
        name: {
            en: 'Is someone continuously monitoring after launch',
            zh: '上線後是否有人持續監測',
        },
        status: 'blocked',
        signals: ['S4'],
        statusNote: {
            en: 'No metric owner or monitoring cadence has been assigned',
            zh: '尚未指定指標負責人與追蹤節奏',
        },
        criteria: [
            {
                done: false,
                en: 'Someone reviews usage and edit patterns every week',
                zh: '尚未指定每週檢視使用與修改紀錄的負責人',
            },
            {
                done: false,
                en: 'Agent edits are used to improve future evaluation',
                zh: '客服修改紀錄尚未規劃回流到後續評估',
            },
        ],
        evidence: {
            en: 'Launching without a learning owner means the product could ship without anyone watching whether it actually improves the workflow.',
            zh: '如果沒有學習迴圈負責人，產品即使上線，也可能沒有人持續判斷它是否真的改善了工作流程。',
        },
    },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 01 — PRODUCT DECISION SYSTEM',
        title: 'From Market Signals to Launch Decisions',
        lead: [
            'This module demonstrates how an AI product can turn market trends, user feedback, and internal constraints into comparable product opportunities before formal investment.',
            'The left side consolidates evidence supporting or challenging product directions; the middle ranks them by reach, product value, confidence in the evidence, and investment cost; the right checks whether demand, data, AI risk, and operating conditions have reached the threshold to proceed.',
        ],
        context: 'Scenario: “Meridian” is a fictional B2B support reply assistant. This page uses simulated data to show how a team organizes product opportunities, validation evidence, and unresolved risks before committing to development and market launch.',
        signature: 'Signature interaction: drag a weight slider and the opportunity ranking updates live.',
        feedTitle: 'EVIDENCE SIGNALS',
        scoringTitle: 'OPPORTUNITY SCORING',
        gatesTitle: 'LAUNCH READINESS',
        filterAll: 'All',
        categories: {
            market: 'Market',
            customer: 'Customer',
            regulatory: 'Legal',
            technical: 'Data',
        },
        confidenceLabels: {
            corroborated: 'Corroborated',
            single: 'Single source',
            weak: 'Needs supporting evidence',
        },
        feedsHint: 'related to',
        emptyBody: 'No signals in this category yet. Clear the filter to see all signals.',
        clearFilter: 'Clear filter',
        weightsHint: 'After adjusting the weight of each criterion, the system immediately recalculates the product opportunity ranking, letting the team see how different decision criteria affect investment priority.',
        effortNote: 'Effort reflects execution difficulty: 10 = easier to ship, 1 = harder to ship.',
        weightAria: 'weight',
        scoreLabel: 'Score',
        relatedGates: 'Related launch checks',
        relatedSignals: 'Related signals',
        criteriaLabel: 'What to check',
        evidenceLabel: 'Current evidence',
        statusWord: {
            pass: 'Passed',
            conditional: 'Needs review',
            blocked: 'Not ready',
        },
        tabSignals: 'SIGNALS',
        tabGates: 'CHECKS',
        expandRationale: 'Expand rationale',
        collapseRationale: 'Collapse rationale',
        expandCriteria: 'Expand check',
        collapseCriteria: 'Collapse check',
        gateWord: 'Check',
        srScores: (o, score, rank) =>
            `Reach ${o.scores.reach}, Impact ${o.scores.impact}, Confidence ${o.scores.confidence}, Effort ${o.scores.effort}. Score ${score}. Rank ${rank}.`,
    },
    zh: {
        eyebrow: 'MODULE 01 — PRODUCT DECISION SYSTEM',
        title: '從市場訊號到上市判斷',
        lead: [
            '這個模組示範 AI 產品在正式投入前，如何將市場趨勢、使用者回饋與內部限制，整理成可比較的產品機會。',
            '左側彙整支持或反對產品方向的證據；中間依據影響範圍、產品價值、證據信心與投入成本進行排序；右側則檢查需求、資料、AI 風險與營運條件是否已達到推進門檻。',
        ],
        context: '案例情境：Meridian 是一套虛構的 B2B 客服回覆輔助工具。本頁使用模擬資料，呈現團隊如何在投入開發與市場推出前，整理產品機會、驗證證據與尚待處理的風險。',
        signature: '拖動權重滑桿，產品機會排序會即時更新。',
        feedTitle: 'EVIDENCE SIGNALS',
        scoringTitle: 'OPPORTUNITY SCORING',
        gatesTitle: 'LAUNCH READINESS',
        filterAll: '全部',
        categories: {
            market: '市場',
            customer: '客戶',
            regulatory: '法務',
            technical: '資料',
        },
        confidenceLabels: {
            corroborated: '多方佐證',
            single: '單一來源',
            weak: '待補證據',
        },
        feedsHint: '關聯機會',
        emptyBody: '這個類別目前沒有資料。清除篩選即可查看全部訊號。',
        clearFilter: '清除篩選',
        weightsHint: '調整各項評估權重後，系統會即時重新計算產品機會的排序，讓團隊看見不同判斷標準如何影響投入優先順序。',
        effortNote: 'Effort 代表執行難度：10 = 較容易推進，1 = 成本較高。',
        weightAria: '權重',
        scoreLabel: '總分',
        relatedGates: '關聯上市檢核',
        relatedSignals: '相關訊號',
        criteriaLabel: '檢查重點',
        evidenceLabel: '目前依據',
        statusWord: {
            pass: '已通過',
            conditional: '待確認',
            blocked: '未就緒',
        },
        tabSignals: 'SIGNALS',
        tabGates: 'CHECKS',
        expandRationale: '展開評估理由',
        collapseRationale: '收合評估理由',
        expandCriteria: '展開檢查內容',
        collapseCriteria: '收合檢查內容',
        gateWord: '檢查項目',
        srScores: (o, score, rank) =>
            `觸及 ${o.scores.reach}、影響 ${o.scores.impact}、信心 ${o.scores.confidence}、執行難度 ${o.scores.effort}。總分 ${score}，排序第 ${rank}。`,
    },
};

// ---- helpers ------------------------------------------------------------------
function renormalizeWeights(weights, changedKey, value) {
    const clamped = Math.max(0, Math.min(100, value));
    const others = DIMENSIONS.filter(k => k !== changedKey);
    const rest = others.reduce((sum, k) => sum + weights[k], 0);
    const remaining = 100 - clamped;

    const shares = others.map(k => ({
        key: k,
        share: rest === 0 ? remaining / others.length : weights[k] * remaining / rest,
    }));

    const next = { [changedKey]: clamped };
    shares.forEach(s => {
        next[s.key] = Math.floor(s.share);
    });

    let leftover = remaining - shares.reduce((sum, s) => sum + Math.floor(s.share), 0);

    shares
        .map(s => ({ key: s.key, frac: s.share - Math.floor(s.share) }))
        .sort((a, b) => b.frac - a.frac)
        .forEach(s => {
            if (leftover > 0) {
                next[s.key] += 1;
                leftover -= 1;
            }
        });

    return next;
}

const weightedScore = (opp, weights) =>
    DIMENSIONS.reduce((sum, d) => sum + weights[d] * opp.scores[d], 0);

// ✅ 修改：新增 helper，支援 name 為字串或 { en, zh } 物件。
const localizedName = (item, lang) =>
    typeof item.name === 'string' ? item.name : item.name[lang];

// ---- icons ----------------------------------------------------------------------
const CATEGORY_ICONS = {
    market: <polyline points="2 12 6 7 9 9.5 14 3" fill="none" strokeWidth="1.6" />,
    customer: (
        <>
            <circle cx="8" cy="5.5" r="2.6" fill="none" strokeWidth="1.6" />
            <path d="M2.8 13.6c1-2.6 3-3.9 5.2-3.9s4.2 1.3 5.2 3.9" fill="none" strokeWidth="1.6" />
        </>
    ),
    regulatory: <path d="M8 1.8l5 2v4c0 3.3-2.1 5.4-5 6.4-2.9-1-5-3.1-5-6.4v-4z" fill="none" strokeWidth="1.6" />,
    technical: (
        <>
            <rect x="4" y="4" width="8" height="8" rx="1.5" fill="none" strokeWidth="1.6" />
            <path d="M6 1.5v2M10 1.5v2M6 12.5v2M10 12.5v2M1.5 6h2M1.5 10h2M12.5 6h2M12.5 10h2" strokeWidth="1.4" />
        </>
    ),
};

function CategoryIcon({ category }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            aria-hidden="true"
        >
            {CATEGORY_ICONS[category]}
        </svg>
    );
}

function ConfidenceMark({ level }) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style={{ flexShrink: 0 }}>
            {level === 'corroborated' && <circle cx="5" cy="5" r="4" fill="var(--teal)" />}
            {level === 'single' && (
                <>
                    <circle cx="5" cy="5" r="3.4" fill="none" stroke="var(--teal)" strokeWidth="1.2" />
                    <path d="M5 1.6a3.4 3.4 0 0 1 0 6.8z" fill="var(--teal)" />
                </>
            )}
            {level === 'weak' && <circle cx="5" cy="5" r="3.4" fill="none" stroke="var(--teal)" strokeWidth="1.2" />}
        </svg>
    );
}

function GateStatusIcon({ status }) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0 }}>
            {status === 'pass' && (
                <path
                    d="M2.5 7.5l3 3 6-7"
                    fill="none"
                    stroke="var(--teal)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
            {status === 'conditional' && (
                <>
                    <circle cx="7" cy="7" r="5.4" fill="none" stroke="var(--amber)" strokeWidth="1.4" />
                    <path d="M7 1.6a5.4 5.4 0 0 1 0 10.8z" fill="var(--amber)" />
                </>
            )}
            {status === 'blocked' && (
                <path
                    d="M3 3l8 8M11 3l-8 8"
                    stroke="var(--red)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            )}
        </svg>
    );
}

const CriteriaBox = ({ done }) => (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }}>
        <rect
            x="1"
            y="1"
            width="12"
            height="12"
            rx="3"
            fill={done ? 'var(--teal-dim)' : 'none'}
            stroke={done ? 'var(--teal)' : 'var(--text-3)'}
            strokeWidth="1.2"
        />
        {done && (
            <path
                d="M4 7.2l2.2 2.2 4-4.8"
                fill="none"
                stroke="var(--teal)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        )}
    </svg>
);

// ---- panels -----------------------------------------------------------------
function SignalFeed({ t, lang, filter, setFilter, hoveredHandlers, highlightIds, flashId, viewport }) {
    const visible = filter === 'all' ? SIGNALS : SIGNALS.filter(s => s.category === filter);
    const chips = ['all', 'market', 'customer', 'regulatory', 'technical'];

    return (
        <div className="los-m1-panel">
            <div className="los-m1-panel-head">
                <span className="los-eyebrow">{t.feedTitle}</span>
            </div>

            <div className="los-m1-filter" role="group" aria-label={t.feedTitle}>
                {chips.map(chip => (
                    <button
                        key={chip}
                        className={`los-m1-chip${filter === chip ? ' is-active' : ''}`}
                        aria-pressed={filter === chip}
                        onClick={() => setFilter(chip)}
                    >
                        {chip === 'all' ? t.filterAll : t.categories[chip]}
                    </button>
                ))}
            </div>

            {visible.length === 0 ? (
                <div className="los-m1-empty">
                    <p className="los-body" style={{ margin: '0 0 12px' }}>
                        {t.emptyBody}
                    </p>
                    <button className="los-m1-clear" onClick={() => setFilter('all')}>
                        {t.clearFilter}
                    </button>
                </div>
            ) : (
                <ul className="los-m1-feed-list">
                    {visible.map(signal => {
                        const flash = flashId === signal.id;
                        const highlighted = highlightIds.has(signal.id);

                        return (
                            <li key={signal.id}>
                                <div
                                    id={`los-m1-signal-${signal.id}`}
                                    className={`los-m1-signal${highlighted ? ' is-related' : ''}${flash ? ' is-flash' : ''}`}
                                    tabIndex="0"
                                    onMouseEnter={() => hoveredHandlers.enter(signal.id)}
                                    onMouseLeave={hoveredHandlers.leave}
                                    onFocus={() => hoveredHandlers.enter(signal.id)}
                                    onBlur={hoveredHandlers.leave}
                                >
                                    <div className="los-m1-signal-top">
                                        <span className="los-m1-signal-cat">
                                            <CategoryIcon category={signal.category} />
                                            {t.categories[signal.category]}
                                        </span>
                                        <span className="los-m1-signal-id los-data-sm">{signal.id}</span>
                                    </div>

                                    <p className="los-m1-signal-text">{signal.text[lang]}</p>

                                    <div className="los-m1-signal-meta">
                                        <span className="los-m1-signal-conf">
                                            <ConfidenceMark level={signal.confidence} />
                                            {signal.confidenceLabel?.[lang] ?? t.confidenceLabels[signal.confidence]}
                                        </span>
                                        <span className="los-m1-signal-src los-data-sm">
                                            {signal.source[lang]}
                                        </span>
                                    </div>

                                    <span className={`los-m1-signal-feeds los-data-sm${viewport === 'desktop' ? '' : ' is-static'}`}>
                                        → {t.feedsHint} {signal.opportunities.join(' · ')}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

function ScoringPanel({ t, lang, weights, onWeightChange, expandedId, onToggle, highlightIds, reducedMotion }) {
    const ranked = useMemo(() => {
        const rows = OPPORTUNITIES.map(o => ({ ...o, total: weightedScore(o, weights) }));
        rows.sort((a, b) => b.total - a.total || a.id.localeCompare(b.id));
        return rows;
    }, [weights]);

    const orderKey = ranked.map(r => r.id).join('');
    const listRef = useRef(null);
    const prevRects = useRef(null);
    const prevOrder = useRef(orderKey);

    useLayoutEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const rects = new Map();
        for (const el of list.children) {
            rects.set(el.dataset.oppId, el.getBoundingClientRect().top);
        }

        if (prevRects.current && prevOrder.current !== orderKey && !reducedMotion) {
            for (const el of list.children) {
                const before = prevRects.current.get(el.dataset.oppId);
                const after = rects.get(el.dataset.oppId);

                if (before != null && before !== after) {
                    el.animate(
                        [{ transform: `translateY(${before - after}px)` }, { transform: 'translateY(0)' }],
                        { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
                    );
                }
            }
        }

        prevRects.current = rects;
        prevOrder.current = orderKey;
    });

    const segmentAlpha = { reach: 0.85, impact: 0.6, confidence: 0.38, effort: 0.2 };

    return (
        <div className="los-m1-panel">
            <div className="los-m1-panel-head">
                <span className="los-eyebrow">{t.scoringTitle}</span>
            </div>

            <p className="los-data-sm los-m1-note">{t.weightsHint}</p>

            <div className="los-m1-sliders">
                {DIMENSIONS.map(dim => (
                    <label className="los-m1-slider" key={dim}>
                        <span className="los-data-sm los-m1-slider-label">
                            {dim.charAt(0).toUpperCase() + dim.slice(1)}
                            <strong>{weights[dim]}</strong>
                        </span>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={weights[dim]}
                            aria-label={`${dim} ${t.weightAria}`}
                            aria-valuetext={`${weights[dim]} / 100`}
                            onChange={e => onWeightChange(dim, Number(e.target.value))}
                        />
                    </label>
                ))}
            </div>

            <p className="los-data-sm los-m1-note los-m1-effort-note">{t.effortNote}</p>

            <ol className="los-m1-opps" ref={listRef}>
                {ranked.map((opp, index) => {
                    const expanded = expandedId === opp.id;
                    const score = (opp.total / 100).toFixed(2);
                    const oppName = localizedName(opp, lang);

                    return (
                        <li
                            key={opp.id}
                            data-opp-id={opp.id}
                            className={`los-m1-opp${highlightIds.has(opp.id) ? ' is-related' : ''}`}
                        >
                            <button
                                className="los-m1-opp-row"
                                aria-expanded={expanded}
                                aria-label={`${opp.id}. ${oppName}. ${expanded ? t.collapseRationale : t.expandRationale}`}
                                onClick={() => onToggle(expanded ? null : opp.id)}
                            >
                                <span className="los-m1-opp-rank los-data-sm">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <span className="los-m1-opp-main">
                                    <span className="los-m1-opp-name">
                                        <em>{opp.id}</em>
                                        {oppName}
                                    </span>

                                    <span className="los-m1-opp-bar" aria-hidden="true">
                                        {DIMENSIONS.map(dim => (
                                            <i
                                                key={dim}
                                                style={{
                                                    width: `${(weights[dim] * opp.scores[dim]) / 10}%`,
                                                    background: `rgba(53,194,176,${segmentAlpha[dim]})`,
                                                }}
                                            />
                                        ))}
                                    </span>

                                    <span className="los-sr-only">
                                        {t.srScores(opp, score, index + 1)}
                                    </span>
                                </span>

                                <span className="los-m1-opp-score" aria-hidden="true">
                                    {score}
                                </span>
                            </button>

                            {expanded && (
                                <div className="los-m1-opp-detail">
                                    <p className="los-m1-rationale">
                                        {opp.rationale[lang]}
                                    </p>

                                    <p className="los-data-sm los-m1-gate-refs">
                                        {t.relatedGates}: {(opp.gateLabels ?? opp.gates.map(g => ({
                                            en: `${t.gateWord} ${g}`,
                                            zh: `${t.gateWord} ${g}`,
                                        }))).map(gate => gate[lang]).join(' · ')}
                                    </p>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>

            <div className="los-m1-legend los-data-sm" aria-hidden="true">
                {DIMENSIONS.map(dim => (
                    <span key={dim}>
                        <i style={{ background: `rgba(53,194,176,${segmentAlpha[dim]})` }} />
                        {dim.charAt(0).toUpperCase()}
                    </span>
                ))}
            </div>
        </div>
    );
}

function GatePanel({ t, lang, expandedId, onToggle, highlightIds, onSignalRef, viewport }) {
    return (
        <div className="los-m1-panel">
            <div className="los-m1-panel-head">
                <span className="los-eyebrow">{t.gatesTitle}</span>
            </div>

            <ol className="los-m1-gates">
                {GATES.map(gate => {
                    const expanded = expandedId === gate.id;
                    const gateName = localizedName(gate, lang);

                    return (
                        <li
                            key={gate.id}
                            className={`los-m1-gate is-${gate.status}${highlightIds.has(gate.id) ? ' is-related' : ''}`}
                        >
                            <button
                                className="los-m1-gate-row"
                                aria-expanded={expanded}
                                aria-label={`${t.gateWord} ${gate.id}: ${gateName}. ${t.statusWord[gate.status]}. ${expanded ? t.collapseCriteria : t.expandCriteria}`}
                                onClick={() => onToggle(expanded ? null : gate.id)}
                            >
                                <GateStatusIcon status={gate.status} />

                                <span className="los-m1-gate-main">
                                    <span className="los-m1-gate-name">
                                        {gate.id}. {gateName}
                                    </span>

                                    <span className={`los-data-sm los-m1-gate-status is-${gate.status}`}>
                                        {t.statusWord[gate.status]} — {gate.statusNote[lang]}
                                    </span>
                                </span>

                                <svg
                                    className={`los-m1-caret${expanded ? ' is-open' : ''}`}
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M2 3.5l3 3 3-3"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {expanded && (
                                <div className="los-m1-gate-detail">
                                    <span className="los-data-sm los-m1-detail-label">
                                        {t.criteriaLabel}
                                    </span>

                                    <ul className="los-m1-criteria">
                                        {gate.criteria.map((c, i) => (
                                            <li key={i}>
                                                <CriteriaBox done={c.done} />
                                                <span>{c[lang]}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <span className="los-data-sm los-m1-detail-label">
                                        {t.evidenceLabel}
                                    </span>

                                    <p className="los-m1-gate-evidence">
                                        {gate.evidence[lang]}
                                    </p>

                                    <span className="los-data-sm los-m1-detail-label">
                                        {t.relatedSignals}
                                    </span>

                                    <div className="los-m1-signal-refs">
                                        {gate.signals.map(id =>
                                            viewport === 'mobile' ? (
                                                <span key={id} className="los-m1-ref-chip los-data-sm">
                                                    {id}
                                                </span>
                                            ) : (
                                                <button
                                                    key={id}
                                                    className="los-m1-ref-chip los-data-sm is-link"
                                                    onClick={() => onSignalRef(id)}
                                                    aria-label={`${t.relatedSignals}: ${id}`}
                                                >
                                                    {id}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

// ---- module ----------------------------------------------------------------------
export default function LaunchDecisionCockpit() {
    const { lang, t } = useI18n(COPY);
    const viewport = useViewport();
    const reducedMotion = usePrefersReducedMotion();

    const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
    const [filter, setFilter] = useState('all');
    const [expandedOpp, setExpandedOpp] = useState(null);
    const [expandedGate, setExpandedGate] = useState(null);
    const [hoveredSignal, setHoveredSignal] = useState(null);
    const [flashSignal, setFlashSignal] = useState(null);
    const [tabletTab, setTabletTab] = useState('signals');
    const flashTimer = useRef(null);

    useEffect(() => () => clearTimeout(flashTimer.current), []);

    const hoveredHandlers = useMemo(() => ({
        enter: id => setHoveredSignal(id),
        leave: () => setHoveredSignal(null),
    }), []);

    const highlightOpps = useMemo(() => {
        const signal = SIGNALS.find(s => s.id === hoveredSignal);
        return new Set(signal ? signal.opportunities : []);
    }, [hoveredSignal]);

    const highlightGates = useMemo(() => {
        const opp = OPPORTUNITIES.find(o => o.id === expandedOpp);
        return new Set(opp ? opp.gates : []);
    }, [expandedOpp]);

    const highlightSignals = useMemo(() => {
        const gate = GATES.find(g => g.id === expandedGate);
        return new Set(gate ? gate.signals : []);
    }, [expandedGate]);

    const onSignalRef = id => {
        setFilter('all');

        if (viewport === 'tablet') {
            setTabletTab('signals');
        }

        clearTimeout(flashTimer.current);
        setFlashSignal(id);
        flashTimer.current = setTimeout(() => setFlashSignal(null), 1200);
    };

    useEffect(() => {
        if (!flashSignal) return;

        document.getElementById(`los-m1-signal-${flashSignal}`)
            ?.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
    }, [flashSignal, reducedMotion]);

    const onWeightChange = (dim, value) =>
        setWeights(w => renormalizeWeights(w, dim, value));

    const feed = (
        <SignalFeed
            t={t}
            lang={lang}
            filter={filter}
            setFilter={setFilter}
            hoveredHandlers={hoveredHandlers}
            highlightIds={highlightSignals}
            flashId={flashSignal}
            viewport={viewport}
        />
    );

    const scoring = (
        <ScoringPanel
            t={t}
            lang={lang}
            weights={weights}
            onWeightChange={onWeightChange}
            expandedId={expandedOpp}
            onToggle={setExpandedOpp}
            highlightIds={highlightOpps}
            reducedMotion={reducedMotion}
        />
    );

    const gates = (
        <GatePanel
            t={t}
            lang={lang}
            expandedId={expandedGate}
            onToggle={setExpandedGate}
            highlightIds={highlightGates}
            onSignalRef={onSignalRef}
            viewport={viewport}
        />
    );

    const tabletTabs = [
        { id: 'signals', label: t.tabSignals },
        { id: 'gates', label: t.tabGates },
    ];

    const onTabKeyDown = e => {
        const ids = tabletTabs.map(tab => tab.id);
        const idx = ids.indexOf(tabletTab);
        let next = null;

        if (e.key === 'ArrowRight') {
            next = ids[(idx + 1) % ids.length];
        } else if (e.key === 'ArrowLeft') {
            next = ids[(idx - 1 + ids.length) % ids.length];
        } else if (e.key === 'Home') {
            next = ids[0];
        } else if (e.key === 'End') {
            next = ids[ids.length - 1];
        }

        if (!next) return;

        e.preventDefault();
        setTabletTab(next);
        document.getElementById(`los-m1-tab-${next}`)?.focus();
    };

    return (
        <ModuleFrame
            id="los-module-cockpit"
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
            context={t.context}
            roles={['AI PM', 'TECHNICAL PM']}
            signature={t.signature}
        >
            {viewport === 'desktop' && (
                <div className="los-m1-grid">
                    {feed}
                    {scoring}
                    {gates}
                </div>
            )}

            {viewport === 'tablet' && (
                <div className="los-m1-stack">
                    {scoring}

                    <div className="los-m1-tablist" role="tablist" aria-label={t.title}>
                        {tabletTabs.map(tab => (
                            <button
                                key={tab.id}
                                id={`los-m1-tab-${tab.id}`}
                                role="tab"
                                aria-selected={tabletTab === tab.id}
                                aria-controls={`los-m1-tabpanel-${tab.id}`}
                                tabIndex={tabletTab === tab.id ? 0 : -1}
                                className={`los-m1-tab${tabletTab === tab.id ? ' is-active' : ''}`}
                                onClick={() => setTabletTab(tab.id)}
                                onKeyDown={onTabKeyDown}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div
                        id={`los-m1-tabpanel-${tabletTab}`}
                        role="tabpanel"
                        aria-labelledby={`los-m1-tab-${tabletTab}`}
                    >
                        {tabletTab === 'signals' ? feed : gates}
                    </div>
                </div>
            )}

            {viewport === 'mobile' && (
                <div className="los-m1-stack">
                    {scoring}
                    {gates}
                    {feed}
                </div>
            )}
        </ModuleFrame>
    );
}

// ---- styles ---------------------------------------------------------------------
injectStyles('los-m1-styles', `
.los-m1-grid {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 24px;
  align-items: start;
}

.los-m1-stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.los-m1-panel-head {
  margin-bottom: 12px;
}

.los-m1-note {
  color: var(--text-3);
  margin: 0 0 12px;
}

/* -- signal feed -- */
.los-m1-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.los-m1-chip {
  font-family: var(--font-data);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-2);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-sm);
  padding: 4px 9px;
  transition: border-color 120ms var(--ease), color 120ms var(--ease), background 120ms var(--ease);
}

.los-m1-chip:hover {
  border-color: var(--line-2);
}

.los-m1-chip.is-active {
  color: var(--teal);
  border-color: var(--teal);
  background: var(--teal-dim);
}

.los-m1-feed-list {
  list-style: none;
  margin: 0;
  padding: 0 4px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 640px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--line-2) transparent;
}

.los-m1-signal {
  background: var(--bg-2);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-md);
  padding: 12px;
  transition: background 200ms var(--ease), border-color 200ms var(--ease);
}

.los-m1-signal:hover {
  background: var(--bg-3);
  border-color: var(--line-2);
}

.los-m1-signal.is-related {
  border-color: var(--teal);
}

.los-m1-signal.is-flash {
  border-color: var(--teal);
  box-shadow: 0 0 0 1px var(--teal);
}

.los-m1-signal-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.los-m1-signal-cat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-data);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
}

.los-m1-signal-id {
  color: var(--text-3);
}

.los-m1-signal-text {
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-2);
  margin: 0 0 8px;
}

.los-m1-signal-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.los-m1-signal-conf {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-data);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-2);
}

.los-m1-signal-src {
  color: var(--text-3);
}

.los-m1-signal-feeds {
  display: block;
  margin-top: 8px;
  color: var(--teal);
  opacity: 0;
  transition: opacity 200ms var(--ease);
}

.los-m1-signal:hover .los-m1-signal-feeds,
.los-m1-signal:focus-visible .los-m1-signal-feeds,
.los-m1-signal-feeds.is-static {
  opacity: 1;
}

.los-m1-empty {
  background: var(--bg-2);
  border: 1px dashed var(--line-2);
  border-radius: var(--radius-md);
  padding: 24px 16px;
  text-align: center;
}

.los-m1-clear {
  font-family: var(--font-data);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--teal);
  border: 1px solid var(--teal);
  border-radius: var(--radius-sm);
  padding: 6px 14px;
}

.los-m1-clear:hover {
  background: var(--teal-dim);
}

/* -- scoring -- */
.los-m1-sliders {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  background: var(--bg-2);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-md);
  padding: 14px;
}

.los-m1-slider {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.los-m1-slider-label {
  display: flex;
  justify-content: space-between;
  color: var(--text-3);
}

.los-m1-slider-label strong {
  color: var(--text-1);
  font-weight: 500;
}

.los-m1-slider input[type="range"] {
  width: 100%;
  height: 18px;
  margin: 0;
  accent-color: var(--teal);
  background: transparent;
  cursor: pointer;
}

.los-m1-effort-note {
  margin-top: 8px;
}

.los-m1-opps {
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.los-m1-opp {
  background: var(--bg-2);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-md);
  transition: border-color 200ms var(--ease), box-shadow 200ms var(--ease);
}

.los-m1-opp.is-related {
  box-shadow: inset 2px 0 0 var(--teal);
  border-color: var(--line-2);
}

.los-m1-opp-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
}

.los-m1-opp-row:hover {
  background: var(--bg-3);
  border-radius: var(--radius-md);
}

.los-m1-opp-rank {
  color: var(--text-3);
}

.los-m1-opp-main {
  flex: 1;
  min-width: 0;
}

.los-m1-opp-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-1);
  margin-bottom: 8px;
  line-height: 1.4;
}

.los-m1-opp-name em {
  font-style: normal;
  font-family: var(--font-data);
  font-size: 11px;
  color: var(--teal);
  border: 1px solid var(--line-2);
  border-radius: 4px;
  padding: 1px 5px;
  margin-right: 8px;
}

.los-m1-opp-bar {
  display: flex;
  gap: 2px;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  background: var(--bg-0);
  width: 100%;
}

.los-m1-opp-bar i {
  display: block;
  height: 100%;
  transition: width 320ms var(--ease);
}

.los-m1-opp-score {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 500;
  color: var(--text-1);
  line-height: 1;
  min-width: 76px;
  text-align: right;
}

.los-m1-opp-detail {
  padding: 0 14px 14px 46px;
}

.los-m1-rationale {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-2);
  margin: 0 0 8px;
}

.los-m1-gate-refs {
  color: var(--text-3);
  margin: 0;
}

.los-m1-legend {
  display: flex;
  gap: 14px;
  margin-top: 10px;
  color: var(--text-3);
}

.los-m1-legend i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  margin-right: 5px;
  vertical-align: -1px;
}

/* -- gates -- */
.los-m1-gates {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.los-m1-gate {
  background: var(--bg-2);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-md);
  transition: border-color 200ms var(--ease), box-shadow 200ms var(--ease);
}

.los-m1-gate.is-related {
  box-shadow: inset 2px 0 0 var(--teal);
  border-color: var(--line-2);
}

.los-m1-gate-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 11px 12px;
}

.los-m1-gate-row:hover {
  background: var(--bg-3);
  border-radius: var(--radius-md);
}

.los-m1-gate-row > svg:first-child {
  margin-top: 4px;
}

.los-m1-gate-main {
  flex: 1;
  min-width: 0;
}

.los-m1-gate-name {
  display: block;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-1);
  line-height: 1.4;
}

.los-m1-gate-status {
  display: block;
  margin-top: 2px;
  color: var(--text-3);
}

.los-m1-gate-status.is-pass {
  color: var(--teal);
}

.los-m1-gate-status.is-conditional {
  color: var(--amber);
}

.los-m1-gate-status.is-blocked {
  color: var(--red);
}

.los-m1-caret {
  color: var(--text-3);
  margin-top: 7px;
  transition: transform 200ms var(--ease);
}

.los-m1-caret.is-open {
  transform: rotate(180deg);
}

.los-m1-gate-detail {
  padding: 2px 12px 14px 36px;
}

.los-m1-detail-label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-3);
  margin: 10px 0 6px;
}

.los-m1-criteria {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.los-m1-criteria li {
  display: flex;
  gap: 8px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-2);
}

.los-m1-gate-evidence {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-2);
  margin: 0;
}

.los-m1-signal-refs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.los-m1-ref-chip {
  color: var(--text-2);
  border: 1px solid var(--line-2);
  border-radius: var(--radius-sm);
  padding: 2px 8px;
}

.los-m1-ref-chip.is-link {
  color: var(--teal);
  border-color: var(--teal);
}

.los-m1-ref-chip.is-link:hover {
  background: var(--teal-dim);
}

/* -- tablet tabs -- */
.los-m1-tablist {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--line-1);
}

.los-m1-tab {
  font-family: var(--font-data);
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--text-3);
  padding: 10px 16px;
  border-bottom: 2px solid transparent;
  transition: color 200ms var(--ease), border-color 200ms var(--ease);
}

.los-m1-tab.is-active {
  color: var(--teal);
  border-bottom-color: var(--teal);
}

@media (max-width: 767px) {
  .los-m1-sliders {
    grid-template-columns: repeat(2, 1fr);
  }

  .los-m1-opp-score {
    font-size: 22px;
    min-width: 60px;
  }

  .los-m1-opp-detail {
    padding-left: 14px;
  }

  .los-m1-gate-detail {
    padding-left: 12px;
  }

  .los-m1-feed-list {
    max-height: none;
    overflow: visible;
  }
}
`);
