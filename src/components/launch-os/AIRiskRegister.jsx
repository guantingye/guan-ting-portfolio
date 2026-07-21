import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// Same fictional scenario as Module 01: "Meridian", an AI reply assistant
// for B2B support teams. Likelihood and impact are 1–5.
// ✅ 文案優化：保留原本互動與資料結構，將風險說明、Model Card 與流程文字改得更自然易懂。

const RISKS = [
    {
        id: 'R1',
        likelihood: 4,
        impact: 5,
        title: {
            en: 'Wrong or outdated policy details in a reply',
            zh: '回覆引用錯誤或過期的政策內容',
        },
        mitigation: {
            en: 'Any draft that mentions a policy must show the source it is based on. If the source cannot be verified, the policy sentence is removed or marked for agent review before the reply can be sent.',
            zh: '任何提到政策內容的草稿，都必須顯示它依據的來源。若來源無法確認，該段政策內容會被移除，或標記為需要客服再次確認後才能送出。',
        },
        owner: {
            en: 'AI lead',
            zh: 'AI 負責人',
        },
        cadence: {
            en: 'Weekly during pilot, monthly after launch',
            zh: '試點期間每週檢查，上線後每月檢查',
        },
        residual: {
            en: 'A verified source does not always mean the answer is correct. The assistant can still combine the right source with the wrong interpretation.',
            zh: '來源被確認，不代表整段回答一定正確。助理仍可能引用了對的資料，卻把它解讀成錯的答案。',
        },
    },
    {
        id: 'R2',
        likelihood: 3,
        impact: 3,
        title: {
            en: 'Product information changes faster than the assistant updates',
            zh: '產品資訊更新後，助理仍使用舊內容',
        },
        mitigation: {
            en: 'When the product catalog changes, the knowledge base is refreshed within 24 hours. The team also watches for sudden drops in draft acceptance by product area, because that can be an early sign that answers have gone stale.',
            zh: '當產品目錄或方案內容更新時，知識庫需要在 24 小時內重新整理。團隊也會觀察各產品線的草稿採用率是否突然下降，因為這可能代表助理開始使用過期內容。',
        },
        owner: {
            en: 'Data engineer',
            zh: '資料工程負責人',
        },
        cadence: {
            en: 'Monthly, plus every product catalog release',
            zh: '每月檢查一次，並在每次產品目錄更新後額外檢查',
        },
        residual: {
            en: 'There is still a short window where new product changes may not be reflected yet, especially if agents continue accepting old-looking drafts.',
            zh: '產品剛更新後仍會有一段空窗期，助理可能還沒反映最新內容；如果客服持續接受看似正常的舊草稿，這個風險會更不容易被發現。',
        },
    },
    {
        id: 'R3',
        likelihood: 2,
        impact: 4,
        title: {
            en: 'Unfair tone differences across customer groups',
            zh: '不同客戶群收到不公平的語氣差異',
        },
        mitigation: {
            en: 'Tone adjustments only use account type and ticket context. The system is not allowed to use demographic information, names, or signals that are likely to stand in for identity. Sampled conversations are reviewed every quarter.',
            zh: '語氣調整只使用帳戶類型與工單情境，不使用人口屬性、姓名，或可能間接代表身份的資訊。團隊每季會抽樣檢查對話內容。',
        },
        owner: {
            en: 'AI lead + Support ops',
            zh: 'AI 負責人與客服營運團隊',
        },
        cadence: {
            en: 'Quarterly review with sampled conversations',
            zh: '每季以抽樣對話進行檢查',
        },
        residual: {
            en: 'Even when sensitive fields are removed, indirect signals can still create unfair differences. The review reduces risk, but it does not prove the issue is gone.',
            zh: '即使排除敏感欄位，某些間接訊號仍可能造成不公平差異。抽樣檢查可以降低風險，但不能證明問題完全不存在。',
        },
    },
    {
        id: 'R4',
        likelihood: 2,
        impact: 5,
        title: {
            en: 'Sensitive customer information stored in logs',
            zh: '敏感客戶資訊被寫入系統紀錄',
        },
        mitigation: {
            en: 'Customer messages are cleaned before they are saved for analysis. Raw content is kept only for a short emergency window, and any access must leave an audit trail.',
            zh: '客戶訊息在被保存或用於分析前，會先清理可能的敏感資訊。原始內容只會短時間保留於緊急排查用途，任何取用都必須留下稽核紀錄。',
        },
        owner: {
            en: 'Platform engineer',
            zh: '平台工程負責人',
        },
        cadence: {
            en: 'Weekly log review during pilot',
            zh: '試點期間每週檢查系統紀錄',
        },
        residual: {
            en: 'Some sensitive information appears in unusual formats. A customer may paste an ID number or contract detail into free text, and those cases are harder to catch.',
            zh: '敏感資訊有時會以非典型格式出現，例如客戶把證件號碼或合約細節直接貼進自由文字中，這類情況比較難完全攔截。',
        },
    },
    {
        id: 'R5',
        likelihood: 4,
        impact: 4,
        title: {
            en: 'Agents trust drafts too much and stop reviewing carefully',
            zh: '客服過度信任草稿，逐漸不再仔細檢查',
        },
        mitigation: {
            en: 'Drafts show their sources, and agents must at least review the full draft before sending. If an agent accepts nearly every draft without changes, support ops receives a coaching signal. This is treated as a training moment, not a punishment.',
            zh: '草稿會顯示來源，客服至少需要完整檢查草稿後才能送出。如果某位客服幾乎都原文接受草稿，客服營運團隊會收到 coaching 提醒。這被視為訓練與提醒，不是懲罰。',
        },
        owner: {
            en: 'Support ops',
            zh: '客服營運團隊',
        },
        cadence: {
            en: 'Weekly during pilot, monthly after launch',
            zh: '試點期間每週檢查，上線後每月檢查',
        },
        residual: {
            en: 'The better the drafts become, the easier it is for people to stop paying attention. This risk may grow as the product improves.',
            zh: '草稿越穩定、越好用，人就越容易放鬆警覺。這個風險可能會隨著產品變好而增加。',
        },
    },
];

const MODEL_CARD = {
    intended: [
        {
            en: 'Help trained support agents draft replies for common frontline support tickets in English and Traditional Chinese.',
            zh: '協助受訓客服為常見一線工單起草英文與繁體中文回覆。',
        },
        {
            en: 'Show the source passages behind each draft so agents can review the answer before sending.',
            zh: '在每份草稿旁顯示答案來源，讓客服能在送出前檢查依據。',
        },
        {
            en: 'Send uncertain or high-risk cases into a human-first review path instead of presenting them as normal drafts.',
            zh: '將不確定或高風險案例導向人工優先檢查，而不是像一般草稿一樣直接呈現。',
        },
    ],
    outOfScope: [
        {
            en: 'Sending replies to customers without human review.',
            zh: '未經人類審查就直接把回覆送給客戶。',
        },
        {
            en: 'Answering legal, medical, or complex billing-dispute questions, even if related text exists in the knowledge base.',
            zh: '回答法律、醫療或複雜帳務爭議問題，即使知識庫中存在相關文字也不適用。',
        },
        {
            en: 'Evaluating or ranking agent performance. Usage data is for improving the product, not judging people.',
            zh: '評估或排名客服績效。使用資料只用於改善產品，不用來評比人員。',
        },
    ],
    assumptions: [
        {
            en: 'The system learns from 18 months of resolved support tickets. Because “resolved” does not always mean “answered well,” a sample of past replies is reviewed by senior agents before use.',
            zh: '系統使用過去 18 個月的已結案工單作為參考資料。但「已結案」不一定代表「回答得好」，因此部分歷史回覆需要先由資深客服重新檢查。',
        },
        {
            en: 'Most tickets are in English, with a smaller share in Traditional Chinese and mixed English-Chinese. Mixed-language tickets are treated as a harder case and are tested more carefully.',
            zh: '大多數工單為英文，另有部分繁體中文與中英混合內容。中英混合工單被視為較困難情境，需要更仔細測試。',
        },
        {
            en: 'Agent edits are useful feedback about tone and context, but they are not treated as automatic proof that the original draft was factually wrong.',
            zh: '客服編輯可以反映語氣與情境需求，但不會被自動視為「原草稿事實錯誤」的證據。',
        },
    ],
    limitations: [
        {
            en: 'The trust indicator is based on historical tickets. It may look precise when a new product area launches, even though the system has less evidence there.',
            zh: '信任提示是根據歷史工單校準的。當新產品線剛上線時，它可能看起來很明確，但實際可依據的資料較少。',
        },
        {
            en: 'The assistant cannot know that a policy changed yesterday unless the knowledge base has already been updated.',
            zh: '如果知識庫尚未更新，助理無法知道某條政策昨天才剛修改。',
        },
        {
            en: 'Very long ticket threads are outside the safe range for v1. When a conversation becomes too long, the product should stop offering drafts instead of offering weaker ones.',
            zh: '過長的工單對話超出 v1 的安全使用範圍。當對話太長時，產品應停止提供草稿，而不是給出品質較弱的草稿。',
        },
        {
            en: 'Traditional Chinese drafts may sound more formal than how agents usually write. Those drafts should be expected to need more editing.',
            zh: '繁體中文草稿可能比客服平常的語氣更正式，因此需要預期會有較高的編輯比例。',
        },
    ],
    trustNote: {
        en: 'The trust threshold can be adjusted by team. The pilot starts with a conservative setting.',
        zh: '信任門檻可依團隊調整。試點階段會先採用較保守的設定。',
    },
    fallback: {
        en: 'If the assistant is slow, unavailable, or unable to verify its sources, the editor should clearly show what changed. It may fall back to template suggestions or return to the normal editor. This is not only an engineering concern: agents decide what to do next based on whether a draft is coming, so the product state must be obvious and calm.',
        zh: '當助理變慢、暫時無法使用，或無法確認來源時，編輯器必須清楚顯示目前狀態。它可以改提供範本建議，也可以回到原本的標準編輯器。這不只是工程問題：客服會根據「草稿到底會不會出現」決定下一步，因此產品狀態必須清楚、穩定，而且不要製造焦慮。',
    },
};

const HITL_STEPS = [
    {
        id: 'in',
        kind: 'plain',
        label: { en: 'Ticket arrives', zh: '工單進入' },
    },
    {
        id: 'draft',
        kind: 'plain',
        label: { en: 'Draft suggested', zh: '產生草稿' },
    },
    {
        id: 'gate',
        kind: 'decision',
        label: { en: 'Trust level check', zh: '檢查信任程度' },
    },
    {
        id: 'review',
        kind: 'human',
        label: { en: 'Agent reviews', zh: '客服審查' },
        branch: 'yes',
    },
    {
        id: 'send',
        kind: 'plain',
        label: { en: 'Reply sent', zh: '送出回覆' },
        branch: 'yes',
    },
    {
        id: 'queue',
        kind: 'human',
        label: { en: 'Human-first review', zh: '人工優先處理' },
        branch: 'no',
    },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 05 — RESPONSIBLE AI',
        title: 'AI Risk Register & Model Card',
        lead: [
            'This module organizes the AI assistant’s capability boundaries, failure scenarios, and ongoing monitoring responsibilities into a document that product, engineering, and governance teams can review together.',
            'The risk register prioritizes each risk by likelihood and impact, and assigns preventive measures, an accountable role, review cadence, and residual risk that still requires attention. The Model Card then clarifies the product’s appropriate and inappropriate uses, data assumptions, known limitations, human-intervention conditions, and fallback behavior during failure.',
        ],
        context: 'Scenario: This module continues the Meridian customer-support reply assistant, using simulated data to show how an AI product can establish a traceable risk-governance foundation before entering a pilot.',
        signature: 'Signature interaction: select a risk dot on the heat map and the matching risk detail opens in the register.',
        tabRegister: 'RISK REGISTER',
        tabCard: 'MODEL CARD',
        axisX: 'LIKELIHOOD →',
        axisY: 'IMPACT →',
        axisLegend: 'L = Likelihood | I = Impact',
        heatmapAria: 'Risk heat map: five risks plotted by likelihood and impact',
        srTableCaption: 'Risks by likelihood and impact',
        srHeaders: { risk: 'Risk', likelihood: 'Likelihood', impact: 'Impact' },
        riskDotAria: (id, title, likelihood, impact) =>
            `${id}: ${title}. Likelihood ${likelihood}, impact ${impact}.`,
        fields: {
            mitigation: 'Prevention and response',
            owner: 'Owner',
            cadence: 'Review rhythm',
            residual: 'What still needs attention',
        },
        expandRisk: 'Expand risk detail',
        collapseRisk: 'Collapse risk detail',
        sections: {
            intended: 'Intended use',
            outOfScope: 'Not for',
            assumptions: 'Data and use assumptions',
            limitations: 'Known limitations',
            hitl: 'Human review path',
            fallback: 'Fallback behavior',
        },
        branchYes: 'yes',
        branchNo: 'no',
        flowLabels: {
            in: 'Ticket in',
            draft: 'Draft',
            checkTop: 'trust level',
            checkBottom: 'high enough?',
            review: 'Agent review',
            send: 'Send',
            queue: 'Human-first review',
        },
        flowAria: 'Human review flow: ticket enters, a draft is suggested, trust level is checked; higher-trust drafts go to agent review and then send, lower-trust drafts go to human-first review.',
    },
    zh: {
        eyebrow: 'MODULE 05 — RESPONSIBLE AI',
        title: 'AI 風險登錄與 Model Card',
        lead: [
            '這個模組將 AI 助理的能力邊界、失效情境與持續監測責任，整理成可供產品、工程與治理團隊共同審查的文件。',
            '風險登錄表依照發生可能性與影響程度排列優先順序，並為每項風險指定預防措施、負責角色、檢查頻率與仍需留意的殘餘風險。Model Card 則進一步說明產品適合與不適合的用途、資料假設、已知限制、人工介入條件與失效時的備援方式。',
        ],
        context: '案例情境：本模組延續 Meridian 客服回覆輔助工具，使用模擬資料呈現 AI 產品在進入試點前，如何建立可追蹤的風險治理基礎。',
        signature: '點選熱度圖上的風險點，右側會展開對應的風險說明。',
        tabRegister: '風險登錄',
        tabCard: 'MODEL CARD',
        axisX: '發生可能性 →',
        axisY: '影響程度 →',
        axisLegend: 'L = 發生可能性（Likelihood）｜I = 影響程度（Impact）',
        heatmapAria: '風險熱度圖：五項風險依發生可能性與影響程度標示',
        srTableCaption: '各風險的發生可能性與影響程度',
        srHeaders: { risk: '風險', likelihood: '發生可能性', impact: '影響程度' },
        riskDotAria: (id, title, likelihood, impact) =>
            `${id}：${title}。發生可能性 ${likelihood}，影響程度 ${impact}。`,
        fields: {
            mitigation: '預防與處理方式',
            owner: '負責角色',
            cadence: '檢視頻率',
            residual: '仍需留意的風險',
        },
        expandRisk: '展開風險細節',
        collapseRisk: '收合風險細節',
        sections: {
            intended: '適合使用的情境',
            outOfScope: '不適合使用的情境',
            assumptions: '資料與使用假設',
            limitations: '已知限制',
            hitl: '人工審查流程',
            fallback: '異常與備援處理',
        },
        branchYes: '足夠',
        branchNo: '不足',
        flowLabels: {
            in: '工單進入',
            draft: '產生草稿',
            checkTop: '信任程度',
            checkBottom: '足夠嗎？',
            review: '客服審查',
            send: '送出',
            queue: '人工優先處理',
        },
        flowAria: '人工審查流程：工單進入後產生草稿，接著檢查信任程度；信任程度足夠時交由客服審查後送出，不足時進入人工優先處理。',
    },
};

// ---- heat map ----------------------------------------------------------------
const CELL = 56;
const GRID = CELL * 5;
const PAD_LEFT = 34;
const PAD_TOP = 10;
const PAD_BOTTOM = 30;

function cellTint(likelihood, impact) {
    const score = likelihood * impact;
    if (score <= 8) return 0;
    return ((score - 8) / 17) * 0.28;
}

function HeatMap({ t, lang, selectedId, onSelect }) {
    const width = PAD_LEFT + GRID + 10;
    const height = PAD_TOP + GRID + PAD_BOTTOM;

    return (
        <div className="los-m3-heatwrap">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="los-m3-heatmap"
                role="img"
                aria-label={t.heatmapAria}
            >
                {Array.from({ length: 5 }, (_, row) =>
                    Array.from({ length: 5 }, (_, col) => {
                        const likelihood = col + 1;
                        const impact = 5 - row;
                        const tint = cellTint(likelihood, impact);

                        return (
                            <g key={`${row}-${col}`}>
                                <rect
                                    x={PAD_LEFT + col * CELL + 1}
                                    y={PAD_TOP + row * CELL + 1}
                                    width={CELL - 2}
                                    height={CELL - 2}
                                    rx="4"
                                    fill="var(--bg-2)"
                                    stroke="var(--line-1)"
                                    strokeWidth="1"
                                />

                                {tint > 0 && (
                                    <rect
                                        x={PAD_LEFT + col * CELL + 1}
                                        y={PAD_TOP + row * CELL + 1}
                                        width={CELL - 2}
                                        height={CELL - 2}
                                        rx="4"
                                        fill={`rgba(217,106,91,${tint.toFixed(3)})`}
                                    />
                                )}
                            </g>
                        );
                    })
                )}

                {[1, 2, 3, 4, 5].map(n => (
                    <text
                        key={`x${n}`}
                        x={PAD_LEFT + (n - 0.5) * CELL}
                        y={PAD_TOP + GRID + 14}
                        className="los-m3-axis-num"
                        textAnchor="middle"
                    >
                        {n}
                    </text>
                ))}

                {[1, 2, 3, 4, 5].map(n => (
                    <text
                        key={`y${n}`}
                        x={PAD_LEFT - 8}
                        y={PAD_TOP + (5 - n + 0.5) * CELL + 3}
                        className="los-m3-axis-num"
                        textAnchor="end"
                    >
                        {n}
                    </text>
                ))}

                <text
                    x={PAD_LEFT + GRID / 2}
                    y={height - 4}
                    className="los-m3-axis-label"
                    textAnchor="middle"
                >
                    {t.axisX}
                </text>

                <text
                    x={0}
                    y={0}
                    className="los-m3-axis-label"
                    textAnchor="middle"
                    transform={`translate(10 ${PAD_TOP + GRID / 2}) rotate(-90)`}
                >
                    {t.axisY}
                </text>

                {RISKS.map(risk => {
                    const cx = PAD_LEFT + (risk.likelihood - 0.5) * CELL;
                    const cy = PAD_TOP + (5 - risk.impact + 0.5) * CELL;
                    const selected = selectedId === risk.id;

                    return (
                        <g
                            key={risk.id}
                            tabIndex="0"
                            role="button"
                            aria-pressed={selected}
                            aria-label={t.riskDotAria(risk.id, risk.title[lang], risk.likelihood, risk.impact)}
                            className="los-m3-dotgroup"
                            onClick={() => onSelect(risk.id)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onSelect(risk.id);
                                }
                            }}
                        >
                            <circle cx={cx} cy={cy} r="14" fill="transparent" />
                            <circle cx={cx} cy={cy} r="5" className={`los-m3-dot${selected ? ' is-selected' : ''}`} />
                            <text x={cx + 9} y={cy - 7} className="los-m3-dot-label">
                                {risk.id}
                            </text>
                        </g>
                    );
                })}
            </svg>

            <table className="los-sr-only">
                <caption>{t.srTableCaption}</caption>
                <thead>
                    <tr>
                        <th scope="col">{t.srHeaders.risk}</th>
                        <th scope="col">{t.srHeaders.likelihood}</th>
                        <th scope="col">{t.srHeaders.impact}</th>
                    </tr>
                </thead>
                <tbody>
                    {RISKS.map(risk => (
                        <tr key={risk.id}>
                            <th scope="row">
                                {risk.id} — {risk.title[lang]}
                            </th>
                            <td>{risk.likelihood}</td>
                            <td>{risk.impact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="los-data-sm los-m3-axis-legend">
                {t.axisLegend}
            </p>
        </div>
    );
}

function RiskList({ t, lang, selectedId, onSelect }) {
    return (
        <ol className="los-m3-risks">
            {RISKS.map(risk => {
                const expanded = selectedId === risk.id;

                return (
                    <li key={risk.id} className={`los-m3-risk${expanded ? ' is-open' : ''}`}>
                        <button
                            className="los-m3-risk-row"
                            aria-expanded={expanded}
                            aria-label={`${risk.id}: ${risk.title[lang]}. ${expanded ? t.collapseRisk : t.expandRisk}`}
                            onClick={() => onSelect(expanded ? null : risk.id)}
                        >
                            <span className="los-m3-risk-id los-data-sm">
                                {risk.id}
                            </span>

                            <span className="los-m3-risk-title">
                                {risk.title[lang]}
                            </span>

                            <span className="los-m3-risk-pos los-data-sm">
                                L{risk.likelihood} × I{risk.impact}
                            </span>
                        </button>

                        {expanded && (
                            <div className="los-m3-risk-detail">
                                <div className="los-m3-field">
                                    <span className="los-data-sm los-m3-field-label">
                                        {t.fields.mitigation}
                                    </span>
                                    <p>{risk.mitigation[lang]}</p>
                                </div>

                                <div className="los-m3-field-row">
                                    <div className="los-m3-field">
                                        <span className="los-data-sm los-m3-field-label">
                                            {t.fields.owner}
                                        </span>
                                        <p className="los-data-md">
                                            {risk.owner[lang]}
                                        </p>
                                    </div>

                                    <div className="los-m3-field">
                                        <span className="los-data-sm los-m3-field-label">
                                            {t.fields.cadence}
                                        </span>
                                        <p className="los-data-md">
                                            {risk.cadence[lang]}
                                        </p>
                                    </div>
                                </div>

                                <div className="los-m3-field is-residual">
                                    <span className="los-data-sm los-m3-field-label">
                                        {t.fields.residual}
                                    </span>
                                    <p>{risk.residual[lang]}</p>
                                </div>
                            </div>
                        )}
                    </li>
                );
            })}
        </ol>
    );
}

// ---- HITL diagram --------------------------------------------------------------
function HitlDiagram({ t }) {
    const box = (x, y, w, label, kind) => (
        <g>
            <rect
                x={x}
                y={y}
                width={w}
                height="38"
                rx="8"
                fill="var(--bg-2)"
                stroke={kind === 'human' ? 'var(--teal)' : 'var(--line-2)'}
                strokeWidth="1.2"
            />
            <text x={x + w / 2} y={y + 23} textAnchor="middle" className="los-m3-flow-text">
                {label}
            </text>
        </g>
    );

    return (
        <svg
            viewBox="0 0 680 190"
            className="los-m3-flow"
            role="img"
            aria-label={t.flowAria}
        >
            <defs>
                <marker
                    id="los-m3-arrow"
                    viewBox="0 0 8 8"
                    refX="7"
                    refY="4"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                >
                    <path d="M0 0.5L7.5 4L0 7.5z" fill="var(--text-3)" />
                </marker>
            </defs>

            {box(6, 76, 82, t.flowLabels.in, 'plain')}
            {box(128, 76, 92, t.flowLabels.draft, 'plain')}

            <g>
                <polygon
                    points="310,60 376,95 310,130 244,95"
                    fill="var(--bg-2)"
                    stroke="var(--amber)"
                    strokeWidth="1.2"
                />
                <text x="310" y="92" textAnchor="middle" className="los-m3-flow-text">
                    {t.flowLabels.checkTop}
                </text>
                <text x="310" y="106" textAnchor="middle" className="los-m3-flow-text">
                    {t.flowLabels.checkBottom}
                </text>
            </g>

            {box(440, 26, 112, t.flowLabels.review, 'human')}
            {box(602, 26, 68, t.flowLabels.send, 'plain')}
            {box(440, 130, 150, t.flowLabels.queue, 'human')}

            <line
                x1="88"
                y1="95"
                x2="122"
                y2="95"
                stroke="var(--text-3)"
                strokeWidth="1.2"
                markerEnd="url(#los-m3-arrow)"
            />
            <line
                x1="220"
                y1="95"
                x2="238"
                y2="95"
                stroke="var(--text-3)"
                strokeWidth="1.2"
                markerEnd="url(#los-m3-arrow)"
            />
            <path
                d="M376 95 L408 95 L408 45 L434 45"
                fill="none"
                stroke="var(--text-3)"
                strokeWidth="1.2"
                markerEnd="url(#los-m3-arrow)"
            />
            <path
                d="M376 95 L408 95 L408 149 L434 149"
                fill="none"
                stroke="var(--text-3)"
                strokeWidth="1.2"
                markerEnd="url(#los-m3-arrow)"
            />
            <line
                x1="552"
                y1="45"
                x2="596"
                y2="45"
                stroke="var(--text-3)"
                strokeWidth="1.2"
                markerEnd="url(#los-m3-arrow)"
            />

            <text x="414" y="38" className="los-m3-flow-branch is-yes">
                {t.branchYes}
            </text>
            <text x="414" y="143" className="los-m3-flow-branch is-no">
                {t.branchNo}
            </text>
        </svg>
    );
}

function HitlSteps({ t, lang }) {
    return (
        <ol className="los-m3-flowsteps">
            {HITL_STEPS.map(step => (
                <li key={step.id} className={`los-m3-flowstep is-${step.kind}`}>
                    {step.branch && (
                        <span className={`los-m3-flow-branch is-${step.branch}`}>
                            {step.branch === 'yes' ? t.branchYes : t.branchNo} →
                        </span>
                    )}
                    <span className="los-data-md">
                        {step.label[lang]}
                    </span>
                </li>
            ))}
        </ol>
    );
}

// ---- model card ------------------------------------------------------------------
function ModelCard({ t, lang, viewport }) {
    return (
        <div className="los-m3-card">
            <div className="los-m3-card-cols">
                <section aria-label={t.sections.intended}>
                    <h4 className="los-eyebrow los-m3-card-heading">
                        {t.sections.intended}
                    </h4>
                    <ul className="los-m3-card-list">
                        {MODEL_CARD.intended.map((item, i) => (
                            <li key={i}>{item[lang]}</li>
                        ))}
                    </ul>
                </section>

                <section aria-label={t.sections.outOfScope}>
                    <h4 className="los-eyebrow los-m3-card-heading">
                        {t.sections.outOfScope}
                    </h4>
                    <ul className="los-m3-card-list is-outscope">
                        {MODEL_CARD.outOfScope.map((item, i) => (
                            <li key={i}>{item[lang]}</li>
                        ))}
                    </ul>
                </section>
            </div>

            <section aria-label={t.sections.assumptions}>
                <h4 className="los-eyebrow los-m3-card-heading">
                    {t.sections.assumptions}
                </h4>
                <ol className="los-m3-card-list is-numbered">
                    {MODEL_CARD.assumptions.map((item, i) => (
                        <li key={i}>{item[lang]}</li>
                    ))}
                </ol>
            </section>

            <section aria-label={t.sections.limitations}>
                <h4 className="los-eyebrow los-m3-card-heading">
                    {t.sections.limitations}
                </h4>
                <ul className="los-m3-card-list">
                    {MODEL_CARD.limitations.map((item, i) => (
                        <li key={i}>{item[lang]}</li>
                    ))}
                </ul>
            </section>

            <section aria-label={t.sections.hitl}>
                <h4 className="los-eyebrow los-m3-card-heading">
                    {t.sections.hitl}
                </h4>
                {viewport === 'mobile' ? (
                    <HitlSteps t={t} lang={lang} />
                ) : (
                    <HitlDiagram t={t} />
                )}
                <p className="los-data-sm los-m3-tau">
                    {MODEL_CARD.trustNote[lang]}
                </p>
            </section>

            <section aria-label={t.sections.fallback}>
                <h4 className="los-eyebrow los-m3-card-heading">
                    {t.sections.fallback}
                </h4>
                <p className="los-m3-fallback">
                    {MODEL_CARD.fallback[lang]}
                </p>
            </section>
        </div>
    );
}

// ---- module ------------------------------------------------------------------------
export default function AIRiskRegister() {
    const { lang, t } = useI18n(COPY);
    const viewport = useViewport();
    const [tab, setTab] = useState('register');
    const [selectedRisk, setSelectedRisk] = useState('R1');

    const tabs = [
        { id: 'register', label: t.tabRegister },
        { id: 'card', label: t.tabCard },
    ];

    const onTabKeyDown = e => {
        const ids = tabs.map(item => item.id);
        const idx = ids.indexOf(tab);
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
        setTab(next);
        document.getElementById(`los-m3-tab-${next}`)?.focus();
    };

    return (
        <ModuleFrame
            id="los-module-risk"
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
            context={t.context}
            roles={['AI PM', 'AI PRODUCT DESIGNER']}
            signature={t.signature}
        >
            <div className="los-m3-tablist" role="tablist" aria-label={t.title}>
                {tabs.map(item => (
                    <button
                        key={item.id}
                        id={`los-m3-tab-${item.id}`}
                        role="tab"
                        aria-selected={tab === item.id}
                        aria-controls={`los-m3-panel-${item.id}`}
                        tabIndex={tab === item.id ? 0 : -1}
                        className={`los-m3-tab${tab === item.id ? ' is-active' : ''}`}
                        onClick={() => setTab(item.id)}
                        onKeyDown={onTabKeyDown}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div
                key={tab}
                id={`los-m3-panel-${tab}`}
                role="tabpanel"
                aria-labelledby={`los-m3-tab-${tab}`}
                className="los-m3-panel"
            >
                {tab === 'register' ? (
                    <div className="los-m3-register">
                        <HeatMap
                            t={t}
                            lang={lang}
                            selectedId={selectedRisk}
                            onSelect={setSelectedRisk}
                        />
                        <RiskList
                            t={t}
                            lang={lang}
                            selectedId={selectedRisk}
                            onSelect={setSelectedRisk}
                        />
                    </div>
                ) : (
                    <ModelCard
                        t={t}
                        lang={lang}
                        viewport={viewport}
                    />
                )}
            </div>
        </ModuleFrame>
    );
}

// ---- styles ------------------------------------------------------------------------
injectStyles('los-m3-styles', `
.los-m3-tablist { display: flex; gap: 4px; border-bottom: 1px solid var(--line-1); margin-bottom: 24px; }
.los-m3-tab {
  font-family: var(--font-data); font-size: 12px; letter-spacing: 0.12em;
  color: var(--text-3); padding: 10px 16px;
  border-bottom: 2px solid transparent;
  transition: color 200ms var(--ease), border-color 200ms var(--ease);
}
.los-m3-tab.is-active { color: var(--teal); border-bottom-color: var(--teal); }
.los-m3-panel { animation: los-m3-fade 200ms var(--ease); }
@keyframes los-m3-fade { from { opacity: 0; } to { opacity: 1; } }

/* -- register -- */
.los-m3-register {
  display: grid;
  grid-template-columns: minmax(300px, 380px) 1fr;
  gap: 32px;
  align-items: start;
}
.los-m3-heatwrap { position: relative; }
.los-m3-heatmap { width: 100%; height: auto; display: block; }
.los-m3-axis-legend { color: var(--text-3); margin: 8px 0 0; }
.los-m3-axis-num { font-family: var(--font-data); font-size: 10px; fill: var(--text-3); }
.los-m3-axis-label { font-family: var(--font-data); font-size: 10px; letter-spacing: 0.12em; fill: var(--text-3); }
.los-m3-dotgroup { cursor: pointer; }
.los-m3-dotgroup:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; border-radius: 4px; }
.los-m3-dot {
  fill: var(--teal);
  transform-box: fill-box; transform-origin: center;
  transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.los-m3-dot.is-selected { transform: scale(1.5); }
.los-m3-dot-label { font-family: var(--font-data); font-size: 10px; fill: var(--text-1); }
.los-m3-risks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.los-m3-risk {
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  transition: border-color 200ms var(--ease);
}
.los-m3-risk.is-open { border-color: var(--line-2); }
.los-m3-risk-row { display: flex; align-items: baseline; gap: 12px; width: 100%; padding: 12px 14px; }
.los-m3-risk-row:hover { background: var(--bg-3); border-radius: var(--radius-md); }
.los-m3-risk-id { color: var(--teal); }
.los-m3-risk-title { flex: 1; font-size: 14.5px; font-weight: 500; color: var(--text-1); line-height: 1.45; }
.los-m3-risk-pos { color: var(--text-3); white-space: nowrap; }
.los-m3-risk-detail { padding: 2px 14px 16px 44px; }
.los-m3-field { margin-top: 10px; }
.los-m3-field p { margin: 4px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--text-2); }
.los-m3-field-label { text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-3); }
.los-m3-field-row { display: flex; gap: 32px; flex-wrap: wrap; }
.los-m3-field.is-residual { border-left: 2px solid var(--amber); padding-left: 12px; }

/* -- model card -- */
.los-m3-card { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px; }
.los-m3-card-heading { display: block; color: var(--text-3); margin: 0 0 12px; }
.los-m3-card-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.los-m3-card-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.los-m3-card-list li { font-size: 14px; line-height: 1.65; color: var(--text-2); }
.los-m3-card-list.is-outscope li { border-left: 2px solid var(--amber); padding-left: 12px; }
.los-m3-card-list.is-numbered { counter-reset: los-m3-item; }
.los-m3-card-list.is-numbered li { counter-increment: los-m3-item; padding-left: 28px; position: relative; }
.los-m3-card-list.is-numbered li::before {
  content: counter(los-m3-item, decimal-leading-zero);
  position: absolute; left: 0; top: 2px;
  font-family: var(--font-data); font-size: 11px; color: var(--teal);
}
.los-m3-flow { width: 100%; height: auto; display: block; }
.los-m3-flow-text { font-family: var(--font-data); font-size: 11px; fill: var(--text-2); }
.los-m3-flow-branch { font-family: var(--font-data); font-size: 10px; letter-spacing: 0.08em; }
svg .los-m3-flow-branch.is-yes { fill: var(--teal); }
svg .los-m3-flow-branch.is-no { fill: var(--amber); }
.los-m3-tau { color: var(--text-3); margin: 8px 0 0; }
.los-m3-fallback { font-size: 14px; line-height: 1.7; color: var(--text-2); margin: 0; }
.los-m3-flowsteps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.los-m3-flowstep {
  background: var(--bg-2); border: 1px solid var(--line-2); border-radius: var(--radius-md);
  padding: 10px 14px; color: var(--text-2);
  display: flex; align-items: center; gap: 10px;
}
.los-m3-flowstep.is-human { border-color: var(--teal); }
.los-m3-flowstep.is-decision { border-color: var(--amber); }
.los-m3-flowstep .los-m3-flow-branch.is-yes { color: var(--teal); }
.los-m3-flowstep .los-m3-flow-branch.is-no { color: var(--amber); }

@media (max-width: 1023px) {
  .los-m3-register { grid-template-columns: 1fr; }
  .los-m3-heatwrap { max-width: 420px; }
}
@media (max-width: 767px) {
  .los-m3-card-cols { grid-template-columns: 1fr; }
  .los-m3-risk-detail { padding-left: 14px; }
  .los-m3-field-row { gap: 16px; }
}
`);
