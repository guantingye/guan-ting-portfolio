import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// Fictional scenario: "Meridian", an AI reply assistant for B2B support teams.
// ✅ 修改：將案例資料語氣改得更像真實產品評估紀錄，減少工程術語與硬翻譯。

const DIMENSIONS = ['reach', 'impact', 'confidence', 'effort'];
const DEFAULT_WEIGHTS = { reach: 25, impact: 30, confidence: 25, effort: 20 };

const SIGNALS = [
    {
        id: 'S1',
        category: 'customer',
        confidence: 'corroborated',
        opportunities: ['A', 'C'],
        text: {
            en: 'A large share of entry-level support tickets repeat the same question patterns, forcing agents to rewrite similar replies throughout the day.',
            zh: '一線客服工單中，有不少問題其實反覆出現。客服人員每天花很多時間重寫類似回覆。',
        },
        source: { en: 'support ticket review', zh: '客服工單回顧' },
    },
    {
        id: 'S2',
        category: 'customer',
        confidence: 'corroborated',
        opportunities: ['B'],
        text: {
            en: 'Escalated tickets take much longer to close and are often where the most negative customer comments appear.',
            zh: '需要升級處理的工單通常花更久才能結案，也最容易出現負面滿意度回饋。',
        },
        source: { en: 'support performance review', zh: '客服表現回顧' },
    },
    {
        id: 'S3',
        category: 'market',
        confidence: 'single',
        opportunities: ['A'],
        text: {
            en: 'Several helpdesk tools have recently added draft-reply features, suggesting that reply assistance is becoming a common buyer expectation.',
            zh: '近期已有多家客服工具推出草稿回覆功能，顯示「回覆輔助」正在變成買方期待的一部分。',
        },
        source: { en: 'market scan', zh: '市場觀察' },
    },
    {
        id: 'S4',
        category: 'technical',
        confidence: 'corroborated',
        opportunities: ['A', 'B'],
        text: {
            en: 'The team already has resolved support tickets and agent-written replies, which can be used to test whether AI suggestions are helpful.',
            zh: '團隊已經累積過去結案工單與客服回覆，可用來測試 AI 建議是否真的有幫助。',
        },
        source: { en: 'data review', zh: '資料盤點' },
    },
    {
        id: 'S5',
        category: 'regulatory',
        confidence: 'single',
        opportunities: ['A'],
        text: {
            en: 'Legal review suggests that AI-generated replies should remain human-reviewed before being sent to customers.',
            zh: '法務初步提醒：AI 生成的回覆在送出前，仍應保留人工確認。',
        },
        source: { en: 'legal review', zh: '法務意見' },
    },
    {
        id: 'S6',
        category: 'customer',
        confidence: 'weak',
        opportunities: ['D'],
        text: {
            en: 'Team leads asked for a weekly summary of what customers complained about most, but the need is still exploratory.',
            zh: '幾位主管提到希望每週知道客戶最常抱怨什麼，但這個需求還需要進一步確認。',
        },
        source: { en: 'sales conversation', zh: '銷售訪談' },
    },
    {
        id: 'S7',
        category: 'technical',
        confidence: 'weak',
        opportunities: ['C'],
        text: {
            en: 'Some reopened tickets point back to outdated help-center articles, suggesting that documentation gaps may be creating extra support load.',
            zh: '部分重開工單和過期說明文件有關，代表文件落差可能正在增加客服負擔。',
        },
        source: { en: 'ticket review', zh: '工單回顧' },
    },
    {
        id: 'S8',
        category: 'market',
        confidence: 'corroborated',
        opportunities: ['A', 'B'],
        text: {
            en: 'Recent churn reviews repeatedly mention slow first response as a reason customers considered leaving.',
            zh: '近幾次流失回顧中，客戶反覆提到「首次回覆太慢」是考慮離開的原因之一。',
        },
        source: { en: 'churn review', zh: '流失回顧' },
    },
];

const OPPORTUNITIES = [
    {
        id: 'A',
        // ✅ 修改：name 改成中英文物件，讓中文頁不再顯示硬式英文功能名。
        name: {
            en: 'Draft-reply assistant for common support tickets',
            zh: '常見工單草稿回覆助手',
        },
        scores: { reach: 7, impact: 6, confidence: 7, effort: 8 },
        gates: [2, 3, 6],
        rationale: {
            en: 'A practical first step. The team already has past tickets and agent replies to learn from, and every AI draft still goes through a human before it reaches the customer. This option mainly saves writing time, so I kept the impact score realistic.',
            zh: '這是最適合先做的版本。團隊已經有過去工單與客服回覆可以參考，而且每一則 AI 草稿在送出前仍會由真人確認。它主要節省的是撰寫時間，所以我把影響力分數維持在務實範圍。',
        },
    },
    {
        id: 'B',
        name: {
            en: 'Early warning for risky support tickets',
            zh: '高風險工單預警',
        },
        scores: { reach: 9, impact: 9, confidence: 7, effort: 4 },
        gates: [1, 2, 7],
        rationale: {
            en: 'This has the strongest business value, but it is also harder to build safely. Escalated tickets are where time, cost, and trust are lost, yet the team still needs to prove that the system can reliably identify risk before a ticket gets worse.',
            zh: '這個方向的商業價值最高，但也最需要謹慎。升級工單通常代表時間、成本與信任正在流失；不過團隊還需要證明，系統能在工單惡化前可靠地辨識風險。',
        },
    },
    {
        id: 'C',
        name: {
            en: 'Help-center gap finder',
            zh: '說明文件缺口偵測',
        },
        scores: { reach: 5, impact: 7, confidence: 5, effort: 6 },
        gates: [4, 7],
        rationale: {
            en: 'This is a quieter but useful product direction. If outdated help articles are causing repeat tickets, improving the content can reduce future support load. The evidence is still early, so this should stay in validation before becoming a launch priority.',
            zh: '這個方向比較安靜，但長期價值不低。如果過期文件真的造成重複工單，改善文件就能降低未來的客服負擔。不過目前證據仍偏早期，因此比較適合先驗證，而不是立刻推成上市主軸。',
        },
    },
    {
        id: 'D',
        name: {
            en: 'Weekly customer pain summary',
            zh: '每週客戶痛點摘要',
        },
        scores: { reach: 6, impact: 6, confidence: 8, effort: 6 },
        gates: [4, 5],
        rationale: {
            en: 'This is easy to understand and likely easy to adopt, but it may not directly change a workflow. It helps teams see patterns in customer feedback, yet more evidence is needed to prove that it leads to better decisions.',
            zh: '這個方向容易理解，也可能容易被採用，但它未必會直接改變工作流程。它能幫助團隊看見客戶回饋中的模式，但仍需要更多證據證明它真的能帶來更好的決策。',
        },
    },
];

const GATES = [
    {
        id: 1,
        // ✅ 修改：gate name 改成中英文物件，讓中文頁變成自然的上市檢查項目。
        name: {
            en: 'User need is urgent enough',
            zh: '需求是否足夠急迫',
        },
        status: 'pass',
        signals: ['S1', 'S2', 'S8'],
        statusNote: {
            en: 'Confirmed by multiple sources',
            zh: '已由多方來源確認',
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
            en: 'Data is ready for validation',
            zh: '可用資料是否準備好',
        },
        status: 'pass',
        signals: ['S4'],
        statusNote: {
            en: 'Data has been reviewed',
            zh: '資料已完成盤點',
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
            en: 'AI risk is manageable',
            zh: 'AI 風險是否可控',
        },
        status: 'conditional',
        signals: ['S5'],
        statusNote: {
            en: 'Legal review still needed',
            zh: '仍需完成法務確認',
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
            en: 'Fits into the existing workflow',
            zh: '是否能放進既有工作流',
        },
        status: 'pass',
        signals: ['S1', 'S6'],
        statusNote: {
            en: 'Works inside the reply flow',
            zh: '可放入現有回覆流程',
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
            en: 'Buyer value is easy to explain',
            zh: '買方是否能理解價值',
        },
        status: 'pass',
        signals: ['S3', 'S8'],
        statusNote: {
            en: 'Value can be retold simply',
            zh: '價值敘事已足夠清楚',
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
            en: 'Fallback is designed',
            zh: '是否設計好備援流程',
        },
        status: 'conditional',
        signals: ['S5', 'S7'],
        statusNote: {
            en: 'Fallback still needs rehearsal',
            zh: '備援流程尚未演練',
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
            en: 'Post-launch learning is owned',
            zh: '上線後是否有人持續追蹤',
        },
        status: 'blocked',
        signals: ['S4'],
        statusNote: {
            en: 'No owner assigned',
            zh: '尚未指定負責人',
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
        eyebrow: 'MODULE 01 — DECISION SYSTEM',
        title: 'From Signals to Product Decisions',
        lead: [
            'This module simulates the first question before launching an AI product: which market and user signals are strong enough to act on?',
            'The left panel collects external trends and internal feedback, the middle panel compares product opportunities, and the right panel checks what still needs to be true before launch.',
        ],
        context: 'Scenario: “Meridian” is a fictional B2B support reply assistant used to demonstrate how an AI product team can organize opportunities, evidence, and risk before launch.',
        signature: 'Signature interaction: drag a weight slider and the opportunity ranking updates live.',
        feedTitle: 'SIGNAL FEED',
        scoringTitle: 'PRIORITY SCORING',
        gatesTitle: 'LAUNCH CHECKS',
        filterAll: 'All',
        categories: {
            market: 'Market',
            customer: 'Customer',
            regulatory: 'Legal',
            technical: 'Data',
        },
        confidenceLabels: {
            corroborated: 'Confirmed',
            single: 'Single source',
            weak: 'Needs validation',
        },
        feedsHint: 'related to',
        emptyBody: 'No signals in this category yet. Clear the filter to see all signals.',
        clearFilter: 'Clear filter',
        weightsHint: 'Adjust the weights to see how the product opportunity ranking changes.',
        effortNote: 'Effort reflects execution difficulty: 10 = easier to ship, 1 = harder to ship.',
        weightAria: 'weight',
        scoreLabel: 'Score',
        relatedGates: 'Related checks',
        relatedSignals: 'Related signals',
        criteriaLabel: 'What to check',
        evidenceLabel: 'Current evidence',
        statusWord: {
            pass: 'Ready',
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
        eyebrow: 'MODULE 01 — DECISION SYSTEM',
        title: '從訊號到產品決策',
        lead: [
            '這個模組模擬 AI 產品上市前的第一個判斷：哪些市場與使用者訊號真的值得投入。',
            '左側整理外部趨勢與內部回饋，中間比較不同產品機會的優先順序，右側檢查上市前還有哪些條件尚未到位。',
        ],
        context: '情境：「Meridian」是一個虛構的 B2B 客服回覆輔助工具，用來示範 AI 產品在正式上市前，如何整理機會、證據與風險。',
        signature: '拖動權重滑桿，產品機會排序會即時更新。',
        feedTitle: 'SIGNAL FEED',
        scoringTitle: 'PRIORITY SCORING',
        gatesTitle: 'LAUNCH CHECKS',
        filterAll: '全部',
        categories: {
            market: '市場',
            customer: '客戶',
            regulatory: '法務',
            technical: '資料',
        },
        confidenceLabels: {
            corroborated: '多方確認',
            single: '單一來源',
            weak: '待確認',
        },
        feedsHint: '關聯機會',
        emptyBody: '這個類別目前沒有資料。清除篩選即可查看全部訊號。',
        clearFilter: '清除篩選',
        weightsHint: '拖動權重後，系統會重新計算各產品機會的排序。',
        effortNote: 'Effort 代表執行難度：10 = 較容易推進，1 = 成本較高。',
        weightAria: '權重',
        scoreLabel: '總分',
        relatedGates: '相關檢查項目',
        relatedSignals: '相關訊號',
        criteriaLabel: '檢查重點',
        evidenceLabel: '目前依據',
        statusWord: {
            pass: '通過',
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
                                            {t.confidenceLabels[signal.confidence]}
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
                                        {t.relatedGates}: {opp.gates.map(g => `${t.gateWord} ${g}`).join(' · ')}
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