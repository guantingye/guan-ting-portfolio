import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// Fictional scenario: "Meridian", an AI reply assistant for B2B support teams.
// Numbers are chosen so the math survives mental arithmetic: at the default
// weights 25/30/25/20 the ranking is B > A > D > C; pushing the Effort weight
// past ~32 flips A ahead of B.

const DIMENSIONS = ['reach', 'impact', 'confidence', 'effort'];
const DEFAULT_WEIGHTS = { reach: 25, impact: 30, confidence: 25, effort: 20 };

const SIGNALS = [
    {
        id: 'S1', category: 'customer', confidence: 'corroborated', opportunities: ['A', 'C'],
        text: {
            en: '41% of tier-1 tickets fall into twelve repeating question shapes; agents retype near-identical answers.',
            zh: '41% 的 tier-1 工單落在十二種重複的問題型態裡，客服人員一再重打幾乎相同的回覆。',
        },
        source: { en: 'support ticket cluster', zh: '客服工單群集' },
    },
    {
        id: 'S2', category: 'customer', confidence: 'corroborated', opportunities: ['B'],
        text: {
            en: 'Escalated tickets take 4.2× longer to close and produce most of the negative CSAT comments.',
            zh: '升級工單的結案時間是一般工單的 4.2 倍，也是負面 CSAT 留言的主要來源。',
        },
        source: { en: 'support ticket cluster', zh: '客服工單群集' },
    },
    {
        id: 'S3', category: 'market', confidence: 'single', opportunities: ['A'],
        text: {
            en: 'An analyst note counts three helpdesk vendors that shipped draft-reply features in the past two quarters.',
            zh: '一份分析師報告指出，過去兩季已有三家 helpdesk 廠商推出草稿回覆功能。',
        },
        source: { en: 'analyst report', zh: '分析師報告' },
    },
    {
        id: 'S4', category: 'technical', confidence: 'corroborated', opportunities: ['A', 'B'],
        text: {
            en: '18 months of resolved tickets exist with agent-written replies attached — usable for grounding and evaluation.',
            zh: '站內留有 18 個月的已結案工單與客服撰寫的回覆，可作為 grounding 與評估資料。',
        },
        source: { en: 'internal data audit', zh: '內部資料盤點' },
    },
    {
        id: 'S5', category: 'regulatory', confidence: 'single', opportunities: ['A'],
        text: {
            en: 'Counsel flags that auto-sent replies would trigger AI-disclosure duties in two target markets; human-reviewed drafts do not.',
            zh: '法務提醒：自動送出的回覆在兩個目標市場會觸發 AI 揭露義務；經真人審核的草稿則不會。',
        },
        source: { en: 'legal memo', zh: '法務備忘錄' },
    },
    {
        id: 'S6', category: 'customer', confidence: 'weak', opportunities: ['D'],
        text: {
            en: 'Two team leads separately asked whether the product could summarize "what customers complained about this week."',
            zh: '兩位 team lead 分別問過：產品能不能整理「這週客戶都在抱怨什麼」。',
        },
        source: { en: 'sales call pattern', zh: '銷售通話樣態' },
    },
    {
        id: 'S7', category: 'technical', confidence: 'weak', opportunities: ['C'],
        text: {
            en: 'Tickets citing a help-center article reopen more often when that article was last edited over a year ago.',
            zh: '引用說明中心文章的工單，若該文章超過一年未更新，重開率明顯較高。',
        },
        source: { en: 'support ticket cluster', zh: '客服工單群集' },
    },
    {
        id: 'S8', category: 'market', confidence: 'corroborated', opportunities: ['A', 'B'],
        text: {
            en: 'Churn reviews from the last two quarters name slow first response as the top stated reason for leaving.',
            zh: '近兩季的流失回顧中，「首次回覆太慢」是客戶最常說出口的離開原因。',
        },
        source: { en: 'churn review notes', zh: '流失回顧筆記' },
    },
];

const OPPORTUNITIES = [
    {
        id: 'A', name: 'Draft-reply copilot for tier-1 tickets',
        scores: { reach: 7, impact: 6, confidence: 7, effort: 8 },
        gates: [2, 3, 6],
        rationale: {
            en: 'The safest first build. Grounding data already exists (S4), agents keep authorship, and the disclosure question stays manageable because a human reviews every draft (S5). The score is honest about impact: a copilot compresses time agents already know how to spend — it changes cost, not outcomes.',
            zh: '最穩的第一步。Grounding 資料已經存在（S4），客服保有回覆的著作感，而且每份草稿都經真人審核，揭露義務相對可控（S5）。分數也誠實反映影響力：copilot 壓縮的是客服本來就知道怎麼花的時間——它改變成本，不改變結果。',
        },
    },
    {
        id: 'B', name: 'Escalation-risk early warning',
        scores: { reach: 9, impact: 9, confidence: 7, effort: 4 },
        gates: [1, 2, 7],
        rationale: {
            en: 'Highest weighted score at the default weights, and the one I would still argue about. Escalations are where money and reputation leak (S2, S8), so Reach and Impact run high. But the label quality for "this ticket is about to go bad" is unproven, and the build is the heaviest of the four — the Effort score of 4 is doing real work in this row.',
            zh: '預設權重下的最高分，但也是我到現在仍會爭論的一項。升級工單是金錢與商譽流失的破口（S2、S8），所以 Reach 與 Impact 都高。但「這張工單快要出事」的標記品質還沒被驗證，工程量也是四個選項中最重的——這一列的 Effort 給 4 分，不是客氣。',
        },
    },
    {
        id: 'C', name: 'Knowledge-gap detector for docs team',
        scores: { reach: 5, impact: 7, confidence: 5, effort: 6 },
        gates: [4, 7],
        rationale: {
            en: 'The quiet compounding bet. If stale articles really drive repeat tickets (S7), fixing the docs reduces load on every future ticket, not just the one in front of an agent. Confidence is the honest weak point: the evidence is a single pattern in reopen rates, and nobody has interviewed the docs team yet.',
            zh: '安靜但會複利的一注。如果過期文章真的造成重複工單（S7），修文件降低的是未來每一張工單的負擔，而不只是眼前這張。Confidence 是誠實的弱點：目前的證據只有工單重開率的一個型態，而且還沒有人訪談過文件團隊。',
        },
    },
    {
        id: 'D', name: 'Voice-of-customer weekly digest',
        scores: { reach: 6, impact: 6, confidence: 8, effort: 6 },
        gates: [4, 5],
        rationale: {
            en: 'Cheap, likable, and easy to overrate. Two team leads asked for it in almost the same words (S6), which is why Confidence is the highest score in this column. I kept Impact at 6: a digest informs decisions, but nothing in the current evidence shows it changing one.',
            zh: '便宜、討喜，也最容易被高估。兩位 team lead 幾乎用同樣的話要求過它（S6），所以這一欄的 Confidence 是最高分。但我把 Impact 留在 6：週報能餵養決策，可是目前沒有任何證據顯示它改變過哪一個決策。',
        },
    },
];

const GATES = [
    {
        id: 1, name: 'Problem urgency verified', status: 'pass', signals: ['S1', 'S2', 'S8'],
        statusNote: { en: 'Two independent sources agree', zh: '兩個獨立來源相互印證' },
        criteria: [
            { done: true, en: 'Pain appears in at least two independent sources', zh: '痛點至少出現在兩個獨立來源' },
            { done: true, en: 'Someone measurably loses time or money every week this stays unsolved', zh: '只要問題不解，每週都有人在可量測地損失時間或金錢' },
        ],
        evidence: {
            en: 'Ticket-volume analysis plus churn review notes; both corroborated.',
            zh: '工單量分析加上流失回顧筆記，兩者皆有多方佐證。',
        },
    },
    {
        id: 2, name: 'Data readiness confirmed', status: 'pass', signals: ['S4'],
        statusNote: { en: 'Corpus audited', zh: '語料已完成盤點' },
        criteria: [
            { done: true, en: 'Historical data exists, is exportable, and is legally usable', zh: '歷史資料存在、可匯出、法律上可用' },
            { done: true, en: 'A named owner keeps the pipeline fresh', zh: '有具名負責人維持資料管線更新' },
        ],
        evidence: {
            en: 'An 18-month resolved-ticket corpus with agent replies, confirmed by a data audit.',
            zh: '18 個月的已結案工單與客服回覆語料，已由資料盤點確認。',
        },
    },
    {
        id: 3, name: 'Model risk bounded', status: 'conditional', signals: ['S5'],
        statusNote: { en: 'One legal review still open', zh: '一項法務審查未完成' },
        criteria: [
            { done: true, en: 'Failure modes listed with concrete mitigations', zh: '失效模式已列出並附具體緩解措施' },
            { done: false, en: 'Disclosure obligations mapped for every launch market', zh: '每個上市市場的揭露義務都已釐清' },
        ],
        evidence: {
            en: 'The risk register covers failure modes; the second market’s disclosure rules are still with counsel.',
            zh: '風險登錄簿已涵蓋失效模式；第二個市場的揭露規範仍在法務手上。',
        },
    },
    {
        id: 4, name: 'Workflow fit validated', status: 'pass', signals: ['S1', 'S6'],
        statusNote: { en: 'Lives inside the reply editor', zh: '內嵌於回覆編輯器' },
        criteria: [
            { done: true, en: 'Agents adopt without switching tools', zh: '客服不需切換工具即可使用' },
            { done: true, en: 'The feature meets the moment of work, not a separate dashboard', zh: '功能出現在工作當下，而不是另一個 dashboard' },
        ],
        evidence: {
            en: 'Drafts render inside the existing reply editor; two dry runs with support ops confirmed the placement.',
            zh: '草稿直接出現在既有的回覆編輯器內；與 support ops 的兩次 dry run 確認了這個位置。',
        },
    },
    {
        id: 5, name: 'Buyer story coherent', status: 'pass', signals: ['S3', 'S8'],
        statusNote: { en: 'One-sentence retell works', zh: '買方能一句話轉述' },
        criteria: [
            { done: true, en: 'The buyer can retell the value in one sentence', zh: '買方能用一句話轉述產品價值' },
            { done: true, en: 'The pricing story survives a competitor comparison', zh: '價格敘事經得起與競品比較' },
        ],
        evidence: {
            en: 'Churn reviews supply the urgency line; the analyst note frames the category we get priced against.',
            zh: '流失回顧提供了急迫性的那句話；分析師報告則框出了我們會被比價的類別。',
        },
    },
    {
        id: 6, name: 'Support & fallback designed', status: 'conditional', signals: ['S5', 'S7'],
        statusNote: { en: 'Recall path unrehearsed', zh: '撤回路徑尚未演練' },
        criteria: [
            { done: true, en: 'A model-unavailable path is specified', zh: '模型不可用時的路徑已定義' },
            { done: false, en: 'A wrong-suggestion recall path is specified and rehearsed', zh: '錯誤建議的撤回路徑已定義並演練過' },
        ],
        evidence: {
            en: 'Fallback UX is drafted in the model card; the recall-and-report flow still needs a walkthrough with support ops.',
            zh: 'Fallback UX 已寫入 model card；撤回與回報流程仍需與 support ops 實際走一次。',
        },
    },
    {
        id: 7, name: 'Post-launch learning loop staffed', status: 'blocked', signals: ['S4'],
        statusNote: { en: 'No owner named', zh: '尚無具名負責人' },
        criteria: [
            { done: false, en: 'A named owner reviews acceptance and edit patterns weekly', zh: '有具名負責人每週檢視採用率與編輯樣態' },
            { done: false, en: 'Agent edits flow back into the evaluation set', zh: '客服的編輯會回流進評估資料集' },
        ],
        evidence: {
            en: 'A staffing decision, not a document. Until someone owns the weekly review, launching means shipping a product nobody is watching.',
            zh: '這需要的是人力決策，不是文件。在有人負責每週檢視之前，上線等於推出一個沒有人在看的產品。',
        },
    },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 01 — DECISION SYSTEM',
        title: 'Launch Decision Cockpit',
        lead: 'Three linked panels: market signals on the left, a weighted opportunity matrix in the middle, seven decision gates on the right. Hover a signal or expand a gate — the connections light up, because nothing on this board stands alone.',
        context: 'Scenario: “Meridian”, a fictional AI reply assistant for B2B support teams. The framework is the portable part.',
        signature: 'Signature interaction: drag a weight slider — the ranking re-sorts live.',
        feedTitle: 'SIGNAL FEED',
        scoringTitle: 'OPPORTUNITY SCORING',
        gatesTitle: 'DECISION GATES',
        filterAll: 'All',
        categories: { market: 'Market', customer: 'Customer', regulatory: 'Regulatory', technical: 'Technical' },
        confidenceLabels: { corroborated: 'Corroborated', single: 'Single-source', weak: 'Weak signal' },
        feedsHint: 'feeds',
        emptyBody: 'No signals in this category yet. Clear the filter to see all eight.',
        clearFilter: 'Clear filter',
        weightsHint: 'Drag a weight — the other three renormalize to 100 and the ranking re-sorts.',
        effortNote: 'Effort is scored as ease of build: 10 = lightest, 1 = heaviest.',
        weightAria: 'weight',
        scoreLabel: 'Weighted score',
        relatedGates: 'Related gates',
        relatedSignals: 'Related signals',
        criteriaLabel: 'Criteria',
        evidenceLabel: 'Evidence required',
        statusWord: { pass: 'Pass', conditional: 'Conditional', blocked: 'Blocked' },
        tabSignals: 'SIGNALS',
        tabGates: 'GATES',
        expandRationale: 'Expand rationale', collapseRationale: 'Collapse rationale',
        expandCriteria: 'Expand criteria', collapseCriteria: 'Collapse criteria',
        gateWord: 'Gate',
        srScores: (o, score, rank) =>
            `Reach ${o.scores.reach}, Impact ${o.scores.impact}, Confidence ${o.scores.confidence}, Effort ease ${o.scores.effort}. Weighted score ${score}. Rank ${rank}.`,
    },
    zh: {
        eyebrow: 'MODULE 01 — DECISION SYSTEM',
        title: '上市決策儀表板',
        lead: '三個相連的面板：左邊是市場訊號流，中間是可調權重的機會評分矩陣，右邊是七道 decision gates（決策關卡）。滑過訊號、展開 gate，關聯就會跟著亮起——這塊板子上沒有任何一格是孤立的。',
        context: '情境：「Meridian」——虛構的 B2B 客服 AI 回覆輔助工具。框架本身才是可遷移的部分。',
        signature: '招牌互動：拖動權重滑桿，排序即時重排。',
        feedTitle: 'SIGNAL FEED',
        scoringTitle: 'OPPORTUNITY SCORING',
        gatesTitle: 'DECISION GATES',
        filterAll: '全部',
        categories: { market: '市場', customer: '客戶', regulatory: '法規', technical: '技術' },
        confidenceLabels: { corroborated: '多方佐證', single: '單一來源', weak: '微弱訊號' },
        feedsHint: '連動機會',
        emptyBody: '這個類別目前沒有訊號。清除篩選即可看到全部八則。',
        clearFilter: '清除篩選',
        weightsHint: '拖動任一權重，其餘三支會按比例補回總和 100，下方排序隨之重排。',
        effortNote: 'Effort 以建置輕重反向計分：10 = 最輕，1 = 最重。',
        weightAria: '權重',
        scoreLabel: '加權總分',
        relatedGates: '相關 gates',
        relatedSignals: '相關訊號',
        criteriaLabel: '判準',
        evidenceLabel: '需要的證據',
        statusWord: { pass: 'Pass', conditional: 'Conditional', blocked: 'Blocked' },
        tabSignals: 'SIGNALS',
        tabGates: 'GATES',
        expandRationale: '展開評分理由', collapseRationale: '收合評分理由',
        expandCriteria: '展開判準', collapseCriteria: '收合判準',
        gateWord: 'Gate',
        srScores: (o, score, rank) =>
            `Reach ${o.scores.reach}、Impact ${o.scores.impact}、Confidence ${o.scores.confidence}、Effort（輕重反向）${o.scores.effort}。加權總分 ${score}，名次 ${rank}。`,
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
    shares.forEach(s => { next[s.key] = Math.floor(s.share); });
    let leftover = remaining - shares.reduce((sum, s) => sum + Math.floor(s.share), 0);
    shares
        .map(s => ({ key: s.key, frac: s.share - Math.floor(s.share) }))
        .sort((a, b) => b.frac - a.frac)
        .forEach(s => { if (leftover > 0) { next[s.key] += 1; leftover -= 1; } });
    return next;
}

const weightedScore = (opp, weights) =>
    DIMENSIONS.reduce((sum, d) => sum + weights[d] * opp.scores[d], 0);

// ---- icons ----------------------------------------------------------------------
const CATEGORY_ICONS = {
    market: <polyline points="2 12 6 7 9 9.5 14 3" fill="none" strokeWidth="1.6" />,
    customer: <><circle cx="8" cy="5.5" r="2.6" fill="none" strokeWidth="1.6" /><path d="M2.8 13.6c1-2.6 3-3.9 5.2-3.9s4.2 1.3 5.2 3.9" fill="none" strokeWidth="1.6" /></>,
    regulatory: <path d="M8 1.8l5 2v4c0 3.3-2.1 5.4-5 6.4-2.9-1-5-3.1-5-6.4v-4z" fill="none" strokeWidth="1.6" />,
    technical: <><rect x="4" y="4" width="8" height="8" rx="1.5" fill="none" strokeWidth="1.6" /><path d="M6 1.5v2M10 1.5v2M6 12.5v2M10 12.5v2M1.5 6h2M1.5 10h2M12.5 6h2M12.5 10h2" strokeWidth="1.4" /></>,
};

function CategoryIcon({ category }) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none" aria-hidden="true">
            {CATEGORY_ICONS[category]}
        </svg>
    );
}

function ConfidenceMark({ level }) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style={{ flexShrink: 0 }}>
            {level === 'corroborated' && <circle cx="5" cy="5" r="4" fill="var(--teal)" />}
            {level === 'single' && <>
                <circle cx="5" cy="5" r="3.4" fill="none" stroke="var(--teal)" strokeWidth="1.2" />
                <path d="M5 1.6a3.4 3.4 0 0 1 0 6.8z" fill="var(--teal)" />
            </>}
            {level === 'weak' && <circle cx="5" cy="5" r="3.4" fill="none" stroke="var(--teal)" strokeWidth="1.2" />}
        </svg>
    );
}

function GateStatusIcon({ status }) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0 }}>
            {status === 'pass' && <path d="M2.5 7.5l3 3 6-7" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
            {status === 'conditional' && <>
                <circle cx="7" cy="7" r="5.4" fill="none" stroke="var(--amber)" strokeWidth="1.4" />
                <path d="M7 1.6a5.4 5.4 0 0 1 0 10.8z" fill="var(--amber)" />
            </>}
            {status === 'blocked' && <path d="M3 3l8 8M11 3l-8 8" stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" />}
        </svg>
    );
}

const CriteriaBox = ({ done }) => (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }}>
        <rect x="1" y="1" width="12" height="12" rx="3" fill={done ? 'var(--teal-dim)' : 'none'} stroke={done ? 'var(--teal)' : 'var(--text-3)'} strokeWidth="1.2" />
        {done && <path d="M4 7.2l2.2 2.2 4-4.8" fill="none" stroke="var(--teal)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
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
                    <p className="los-body" style={{ margin: '0 0 12px' }}>{t.emptyBody}</p>
                    <button className="los-m1-clear" onClick={() => setFilter('all')}>{t.clearFilter}</button>
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
                                        <span className="los-m1-signal-cat"><CategoryIcon category={signal.category} />{t.categories[signal.category]}</span>
                                        <span className="los-m1-signal-id los-data-sm">{signal.id}</span>
                                    </div>
                                    <p className="los-m1-signal-text">{signal.text[lang]}</p>
                                    <div className="los-m1-signal-meta">
                                        <span className="los-m1-signal-conf"><ConfidenceMark level={signal.confidence} />{t.confidenceLabels[signal.confidence]}</span>
                                        <span className="los-m1-signal-src los-data-sm">{signal.source[lang]}</span>
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
        for (const el of list.children) rects.set(el.dataset.oppId, el.getBoundingClientRect().top);
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
                            type="range" min="0" max="100" step="5"
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
                    return (
                        <li key={opp.id} data-opp-id={opp.id} className={`los-m1-opp${highlightIds.has(opp.id) ? ' is-related' : ''}`}>
                            <button
                                className="los-m1-opp-row"
                                aria-expanded={expanded}
                                aria-label={`${opp.id}. ${opp.name}. ${expanded ? t.collapseRationale : t.expandRationale}`}
                                onClick={() => onToggle(expanded ? null : opp.id)}
                            >
                                <span className="los-m1-opp-rank los-data-sm">{String(index + 1).padStart(2, '0')}</span>
                                <span className="los-m1-opp-main">
                                    <span className="los-m1-opp-name"><em>{opp.id}</em>{opp.name}</span>
                                    <span className="los-m1-opp-bar" aria-hidden="true">
                                        {DIMENSIONS.map(dim => (
                                            <i key={dim} style={{
                                                width: `${(weights[dim] * opp.scores[dim]) / 10}%`,
                                                background: `rgba(53,194,176,${segmentAlpha[dim]})`,
                                            }} />
                                        ))}
                                    </span>
                                    <span className="los-sr-only">{t.srScores(opp, score, index + 1)}</span>
                                </span>
                                <span className="los-m1-opp-score" aria-hidden="true">{score}</span>
                            </button>
                            {expanded && (
                                <div className="los-m1-opp-detail">
                                    <p className="los-m1-rationale">{opp.rationale[lang]}</p>
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
                    <span key={dim}><i style={{ background: `rgba(53,194,176,${segmentAlpha[dim]})` }} />{dim.charAt(0).toUpperCase()}</span>
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
                    return (
                        <li key={gate.id} className={`los-m1-gate is-${gate.status}${highlightIds.has(gate.id) ? ' is-related' : ''}`}>
                            <button
                                className="los-m1-gate-row"
                                aria-expanded={expanded}
                                aria-label={`${t.gateWord} ${gate.id}: ${gate.name}. ${t.statusWord[gate.status]}. ${expanded ? t.collapseCriteria : t.expandCriteria}`}
                                onClick={() => onToggle(expanded ? null : gate.id)}
                            >
                                <GateStatusIcon status={gate.status} />
                                <span className="los-m1-gate-main">
                                    <span className="los-m1-gate-name">{gate.id}. {gate.name}</span>
                                    <span className={`los-data-sm los-m1-gate-status is-${gate.status}`}>
                                        {t.statusWord[gate.status]} — {gate.statusNote[lang]}
                                    </span>
                                </span>
                                <svg className={`los-m1-caret${expanded ? ' is-open' : ''}`} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                                    <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            {expanded && (
                                <div className="los-m1-gate-detail">
                                    <span className="los-data-sm los-m1-detail-label">{t.criteriaLabel}</span>
                                    <ul className="los-m1-criteria">
                                        {gate.criteria.map((c, i) => (
                                            <li key={i}><CriteriaBox done={c.done} /><span>{c[lang]}</span></li>
                                        ))}
                                    </ul>
                                    <span className="los-data-sm los-m1-detail-label">{t.evidenceLabel}</span>
                                    <p className="los-m1-gate-evidence">{gate.evidence[lang]}</p>
                                    <span className="los-data-sm los-m1-detail-label">{t.relatedSignals}</span>
                                    <div className="los-m1-signal-refs">
                                        {gate.signals.map(id => viewport === 'mobile'
                                            ? <span key={id} className="los-m1-ref-chip los-data-sm">{id}</span>
                                            : (
                                                <button
                                                    key={id}
                                                    className="los-m1-ref-chip los-data-sm is-link"
                                                    onClick={() => onSignalRef(id)}
                                                    aria-label={`${t.relatedSignals}: ${id}`}
                                                >
                                                    {id}
                                                </button>
                                            ))}
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

    // Cross-panel links (spec M1.3)
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
        if (viewport === 'tablet') setTabletTab('signals');
        clearTimeout(flashTimer.current);
        setFlashSignal(id);
        flashTimer.current = setTimeout(() => setFlashSignal(null), 1200);
    };
    useEffect(() => {
        if (!flashSignal) return;
        document.getElementById(`los-m1-signal-${flashSignal}`)
            ?.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
    }, [flashSignal, reducedMotion]);

    const onWeightChange = (dim, value) => setWeights(w => renormalizeWeights(w, dim, value));

    const feed = (
        <SignalFeed
            t={t} lang={lang} filter={filter} setFilter={setFilter}
            hoveredHandlers={hoveredHandlers} highlightIds={highlightSignals}
            flashId={flashSignal} viewport={viewport}
        />
    );
    const scoring = (
        <ScoringPanel
            t={t} lang={lang} weights={weights} onWeightChange={onWeightChange}
            expandedId={expandedOpp} onToggle={setExpandedOpp}
            highlightIds={highlightOpps} reducedMotion={reducedMotion}
        />
    );
    const gates = (
        <GatePanel
            t={t} lang={lang} expandedId={expandedGate} onToggle={setExpandedGate}
            highlightIds={highlightGates} onSignalRef={onSignalRef} viewport={viewport}
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
        if (e.key === 'ArrowRight') next = ids[(idx + 1) % ids.length];
        else if (e.key === 'ArrowLeft') next = ids[(idx - 1 + ids.length) % ids.length];
        else if (e.key === 'Home') next = ids[0];
        else if (e.key === 'End') next = ids[ids.length - 1];
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
                <div className="los-m1-grid">{feed}{scoring}{gates}</div>
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
                    <div id={`los-m1-tabpanel-${tabletTab}`} role="tabpanel" aria-labelledby={`los-m1-tab-${tabletTab}`}>
                        {tabletTab === 'signals' ? feed : gates}
                    </div>
                </div>
            )}
            {viewport === 'mobile' && (
                <div className="los-m1-stack">{scoring}{gates}{feed}</div>
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
.los-m1-stack { display: flex; flex-direction: column; gap: 24px; }
.los-m1-panel-head { margin-bottom: 12px; }
.los-m1-note { color: var(--text-3); margin: 0 0 12px; }

/* -- signal feed -- */
.los-m1-filter { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
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
.los-m1-chip:hover { border-color: var(--line-2); }
.los-m1-chip.is-active { color: var(--teal); border-color: var(--teal); background: var(--teal-dim); }
.los-m1-feed-list {
  list-style: none;
  margin: 0; padding: 0 4px 0 0;
  display: flex; flex-direction: column; gap: 10px;
  max-height: 640px; overflow-y: auto;
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
.los-m1-signal:hover { background: var(--bg-3); border-color: var(--line-2); }
.los-m1-signal.is-related { border-color: var(--teal); }
.los-m1-signal.is-flash { border-color: var(--teal); box-shadow: 0 0 0 1px var(--teal); }
.los-m1-signal-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.los-m1-signal-cat {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-data); font-size: 11px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-3);
}
.los-m1-signal-id { color: var(--text-3); }
.los-m1-signal-text { font-size: 14px; line-height: 1.55; color: var(--text-2); margin: 0 0 8px; }
.los-m1-signal-meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
.los-m1-signal-conf {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-data); font-size: 11px; letter-spacing: 0.06em; color: var(--text-2);
}
.los-m1-signal-src { color: var(--text-3); }
.los-m1-signal-feeds {
  display: block; margin-top: 8px; color: var(--teal);
  opacity: 0; transition: opacity 200ms var(--ease);
}
.los-m1-signal:hover .los-m1-signal-feeds,
.los-m1-signal:focus-visible .los-m1-signal-feeds,
.los-m1-signal-feeds.is-static { opacity: 1; }
.los-m1-empty {
  background: var(--bg-2); border: 1px dashed var(--line-2);
  border-radius: var(--radius-md); padding: 24px 16px; text-align: center;
}
.los-m1-clear {
  font-family: var(--font-data); font-size: 12px; letter-spacing: 0.06em;
  color: var(--teal); border: 1px solid var(--teal); border-radius: var(--radius-sm);
  padding: 6px 14px;
}
.los-m1-clear:hover { background: var(--teal-dim); }

/* -- scoring -- */
.los-m1-sliders {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
  background: var(--bg-2); border: 1px solid var(--line-1);
  border-radius: var(--radius-md); padding: 14px;
}
.los-m1-slider { display: flex; flex-direction: column; gap: 6px; }
.los-m1-slider-label { display: flex; justify-content: space-between; color: var(--text-3); }
.los-m1-slider-label strong { color: var(--text-1); font-weight: 500; }
.los-m1-slider input[type="range"] {
  width: 100%; height: 18px; margin: 0;
  accent-color: var(--teal);
  background: transparent;
  cursor: pointer;
}
.los-m1-effort-note { margin-top: 8px; }
.los-m1-opps { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.los-m1-opp {
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  transition: border-color 200ms var(--ease), box-shadow 200ms var(--ease);
}
.los-m1-opp.is-related { box-shadow: inset 2px 0 0 var(--teal); border-color: var(--line-2); }
.los-m1-opp-row {
  display: flex; align-items: center; gap: 12px;
  width: 100%; padding: 12px 14px;
}
.los-m1-opp-row:hover { background: var(--bg-3); border-radius: var(--radius-md); }
.los-m1-opp-rank { color: var(--text-3); }
.los-m1-opp-main { flex: 1; min-width: 0; }
.los-m1-opp-name {
  display: block; font-size: 14px; font-weight: 500; color: var(--text-1);
  margin-bottom: 8px; line-height: 1.4;
}
.los-m1-opp-name em {
  font-style: normal; font-family: var(--font-data); font-size: 11px;
  color: var(--teal); border: 1px solid var(--line-2); border-radius: 4px;
  padding: 1px 5px; margin-right: 8px;
}
.los-m1-opp-bar {
  display: flex; gap: 2px; height: 6px; border-radius: 3px; overflow: hidden;
  background: var(--bg-0); width: 100%;
}
.los-m1-opp-bar i { display: block; height: 100%; transition: width 320ms var(--ease); }
.los-m1-opp-score {
  font-family: var(--font-display); font-size: 28px; font-weight: 500;
  color: var(--text-1); line-height: 1; min-width: 76px; text-align: right;
}
.los-m1-opp-detail { padding: 0 14px 14px 46px; }
.los-m1-rationale { font-size: 14px; line-height: 1.65; color: var(--text-2); margin: 0 0 8px; }
.los-m1-gate-refs { color: var(--text-3); margin: 0; }
.los-m1-legend { display: flex; gap: 14px; margin-top: 10px; color: var(--text-3); }
.los-m1-legend i {
  display: inline-block; width: 10px; height: 10px; border-radius: 2px;
  margin-right: 5px; vertical-align: -1px;
}

/* -- gates -- */
.los-m1-gates { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.los-m1-gate {
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  transition: border-color 200ms var(--ease), box-shadow 200ms var(--ease);
}
.los-m1-gate.is-related { box-shadow: inset 2px 0 0 var(--teal); border-color: var(--line-2); }
.los-m1-gate-row { display: flex; align-items: flex-start; gap: 10px; width: 100%; padding: 11px 12px; }
.los-m1-gate-row:hover { background: var(--bg-3); border-radius: var(--radius-md); }
.los-m1-gate-row > svg:first-child { margin-top: 4px; }
.los-m1-gate-main { flex: 1; min-width: 0; }
.los-m1-gate-name { display: block; font-size: 13.5px; font-weight: 500; color: var(--text-1); line-height: 1.4; }
.los-m1-gate-status { display: block; margin-top: 2px; color: var(--text-3); }
.los-m1-gate-status.is-pass { color: var(--teal); }
.los-m1-gate-status.is-conditional { color: var(--amber); }
.los-m1-gate-status.is-blocked { color: var(--red); }
.los-m1-caret { color: var(--text-3); margin-top: 7px; transition: transform 200ms var(--ease); }
.los-m1-caret.is-open { transform: rotate(180deg); }
.los-m1-gate-detail { padding: 2px 12px 14px 36px; }
.los-m1-detail-label {
  display: block; text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--text-3); margin: 10px 0 6px;
}
.los-m1-criteria { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.los-m1-criteria li { display: flex; gap: 8px; font-size: 13px; line-height: 1.55; color: var(--text-2); }
.los-m1-gate-evidence { font-size: 13px; line-height: 1.6; color: var(--text-2); margin: 0; }
.los-m1-signal-refs { display: flex; gap: 6px; flex-wrap: wrap; }
.los-m1-ref-chip {
  color: var(--text-2); border: 1px solid var(--line-2); border-radius: var(--radius-sm);
  padding: 2px 8px;
}
.los-m1-ref-chip.is-link { color: var(--teal); border-color: var(--teal); }
.los-m1-ref-chip.is-link:hover { background: var(--teal-dim); }

/* -- tablet tabs -- */
.los-m1-tablist { display: flex; gap: 4px; border-bottom: 1px solid var(--line-1); }
.los-m1-tab {
  font-family: var(--font-data); font-size: 12px; letter-spacing: 0.12em;
  color: var(--text-3); padding: 10px 16px;
  border-bottom: 2px solid transparent;
  transition: color 200ms var(--ease), border-color 200ms var(--ease);
}
.los-m1-tab.is-active { color: var(--teal); border-bottom-color: var(--teal); }

@media (max-width: 767px) {
  .los-m1-sliders { grid-template-columns: repeat(2, 1fr); }
  .los-m1-opp-score { font-size: 22px; min-width: 60px; }
  .los-m1-opp-detail { padding-left: 14px; }
  .los-m1-gate-detail { padding-left: 12px; }
  .los-m1-feed-list { max-height: none; overflow: visible; }
}
`);
