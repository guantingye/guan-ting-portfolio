import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// Same fictional scenario as Module 01: "Meridian", an AI reply assistant
// for B2B support teams. Likelihood and impact are 1–5.

const RISKS = [
    {
        id: 'R1', likelihood: 4, impact: 5,
        title: { en: 'Hallucinated policy details in replies', zh: '回覆中捏造政策細節' },
        mitigation: {
            en: 'Replies citing policy must pass a retrieval check against the policy corpus; no match → the suggestion is demoted to draft-only and the citation is stripped.',
            zh: '引用政策的回覆必須通過對政策語料庫的檢索比對；比對不到來源時，建議會降級為僅供草稿，並移除引用字句。',
        },
        owner: 'ML lead',
        cadence: { en: 'Weekly during pilot, monthly after GA', zh: '試點期間每週，GA 後每月' },
        residual: {
            en: 'A verified quote can still be stitched into a misleading answer — retrieval checks the source, not the reasoning.',
            zh: '逐句驗證過的引文仍可能被拼進一個誤導的答案——檢索驗的是來源，不是推理。',
        },
    },
    {
        id: 'R2', likelihood: 3, impact: 3,
        title: { en: 'Data drift as product catalog changes', zh: '產品目錄更動造成資料漂移' },
        mitigation: {
            en: 'Catalog releases trigger a re-index within 24 hours; acceptance rate is tracked per product area, and a week-over-week drop above 5 points opens an investigation ticket automatically.',
            zh: '目錄發版後 24 小時內觸發重新索引；各產品線的草稿採用率持續追蹤，週對週下滑超過 5 個百分點會自動開立調查工單。',
        },
        owner: 'Data engineer',
        cadence: { en: 'Monthly, plus on every catalog release', zh: '每月一次，另加每次目錄發版後' },
        residual: {
            en: 'Drift between releases stays invisible for up to a week if agents keep accepting stale drafts.',
            zh: '兩次發版之間的漂移最長會隱形一週——如果客服持續接受過期草稿的話。',
        },
    },
    {
        id: 'R3', likelihood: 2, impact: 4,
        title: { en: 'Demographic bias in tone adaptation', zh: '語氣調整中的族群偏誤' },
        mitigation: {
            en: 'Tone adaptation reads account tier and ticket type only; demographic and name-derived features are excluded at the feature-contract level, and the contract is tested in CI.',
            zh: '語氣調整只讀取帳戶層級與工單類型兩個特徵；人口屬性與姓名衍生特徵在 feature contract 層級被排除，且該 contract 有 CI 測試把關。',
        },
        owner: 'ML lead + Support ops',
        cadence: { en: 'Quarterly audit with sampled transcripts', zh: '每季抽樣逐字稿稽核' },
        residual: {
            en: 'Proxy features can encode demographics anyway. The quarterly transcript audit is the honest backstop — and it samples, it does not prove.',
            zh: '代理特徵仍可能間接編碼人口屬性。每季逐字稿稽核是誠實的最後防線——但它是抽樣，不是證明。',
        },
    },
    {
        id: 'R4', likelihood: 2, impact: 5,
        title: { en: 'PII leakage through prompt logging', zh: 'Prompt 日誌外洩個資' },
        mitigation: {
            en: 'Prompts are logged only after a PII scrubber pass; raw prompts live in a 24-hour buffer with access behind a break-glass audit trail.',
            zh: 'Prompt 先經過 PII 清洗才寫入日誌；原始 prompt 僅存放於 24 小時緩衝區，取用需走 break-glass 稽核流程。',
        },
        owner: 'Platform engineer',
        cadence: { en: 'Weekly log audit during pilot', zh: '試點期間每週稽核日誌' },
        residual: {
            en: 'Scrubbers miss unusual formats — an ID number pasted into free text is the case I still worry about.',
            zh: '清洗器會漏掉非典型格式——自由文字裡貼上的證件號碼，是我到現在仍然擔心的情況。',
        },
    },
    {
        id: 'R5', likelihood: 4, impact: 4,
        title: { en: 'Agent over-trust: replies sent unreviewed', zh: '客服過度信任：未審核就送出' },
        mitigation: {
            en: 'Send stays disabled until the draft has been scrolled to the end once; per-agent as-is acceptance above 90% triggers a coaching conversation, not a lockout.',
            zh: '草稿必須完整捲動到底一次才能按下送出；單一客服的原文照收率超過 90% 時，觸發的是一次 coaching 對話，而不是封鎖帳號。',
        },
        owner: 'Support ops',
        cadence: { en: 'Weekly during pilot, monthly after GA', zh: '試點期間每週，GA 後每月' },
        residual: {
            en: 'Scroll-through is a speed bump, not a guarantee. If drafts stay good for months, attention will fade — this risk grows as the product gets better.',
            zh: '強制捲動只是減速丘，不是保證。草稿如果連續幾個月都很準，注意力終究會鬆懈——這個風險會隨產品變好而變大。',
        },
    },
];

const MODEL_CARD = {
    intended: [
        {
            en: 'Drafting replies for tier-1 support tickets in English and Traditional Chinese, for review by a trained agent.',
            zh: '為 tier-1 客服工單起草英文與繁體中文回覆，交由受訓客服審核。',
        },
        {
            en: 'Showing the source passages each draft was grounded on.',
            zh: '顯示每份草稿所依據的來源段落。',
        },
        {
            en: 'Routing low-confidence drafts into a human-first queue.',
            zh: '將低信心草稿導入 human-first 佇列。',
        },
    ],
    outOfScope: [
        {
            en: 'Sending any reply without human review. The register of this product is “confident draft”, not “silent automation”.',
            zh: '未經真人審核就送出任何回覆。這個產品的基調是「有把握的草稿」，不是「無聲的自動化」。',
        },
        {
            en: 'Legal, medical, or billing-dispute answers — even when the corpus contains related text.',
            zh: '法律、醫療或帳務爭議的答覆——即使語料庫裡有相關文字。',
        },
        {
            en: 'Rating agent performance. Acceptance metrics exist to tune the model, not to rank people.',
            zh: '評比客服績效。採用率指標是用來調模型的，不是用來排名的。',
        },
    ],
    assumptions: [
        {
            en: 'Fine-tuning and retrieval corpora come from 18 months of resolved tickets. Resolved does not mean well answered, so 15% were re-graded by senior agents before use.',
            zh: '微調與檢索語料來自 18 個月的已結案工單。「已結案」不等於「答得好」，因此使用前由資深客服重新評分了其中 15%。',
        },
        {
            en: 'Ticket language is roughly 70% English, 25% Traditional Chinese, 5% mixed-code. Mixed-code tickets — zh sentences carrying EN product terms — are the hardest case and are over-sampled in the evaluation set.',
            zh: '工單語言約 70% 英文、25% 繁體中文、5% 中英夾雜。夾雜工單——中文句子裡帶英文產品詞——是最難的情境，在評估集中被刻意過採樣。',
        },
        {
            en: 'Agent edits are treated as ground truth for tone, not for facts. An edit can make a wrong answer sound better.',
            zh: '客服的編輯被視為語氣的 ground truth，而不是事實的 ground truth。一次編輯可以讓錯的答案聽起來更順。',
        },
    ],
    limitations: [
        {
            en: 'Confidence is calibrated on historical tickets; new product areas launch with confidence scores that look precise and are not.',
            zh: 'Confidence 以歷史工單校準；新產品線上線初期的信心分數看起來精確，實際上不是。',
        },
        {
            en: 'The model cannot tell “this policy changed yesterday” from grounded text unless the corpus has been re-indexed.',
            zh: '除非語料庫重新索引，模型無法從 grounding 文字判斷「這條政策昨天改了」。',
        },
        {
            en: 'Draft quality degrades measurably past 12 conversation turns; the UI stops offering drafts at that depth rather than offering worse ones.',
            zh: '超過 12 輪的長串工單，草稿品質會可測量地下降；UI 的做法是超過該深度就不再出草稿，而不是端出比較差的。',
        },
        {
            en: 'Traditional Chinese drafts run more formal than most agents’ voice; edit rates sit around 1.4× the English baseline.',
            zh: '繁體中文草稿比多數客服的語感更書面；編輯率約為英文基準的 1.4 倍。',
        },
    ],
    tauNote: {
        en: 'τ is tunable per team; the pilot starts at 0.72.',
        zh: 'τ 為各團隊可調參數；試點自 0.72 起。',
    },
    fallback: {
        en: 'If the model times out or the retrieval index is stale, the composer degrades to template suggestions with a visible “assistant offline” state. Fallback is a UX decision, not an engineering afterthought: agents plan their next thirty seconds around whether a draft is coming, so the state change has to be explicit, instant, and boring.',
        zh: '模型逾時或檢索索引過期時，編輯器降級為範本建議，並明確顯示「assistant offline」狀態。Fallback 是 UX 決策，不是工程的尾巴：客服會用「草稿到底會不會來」規劃接下來的三十秒，所以狀態切換必須明確、即時，而且無聊。',
    },
};

const HITL_STEPS = [
    { id: 'in', kind: 'plain', label: 'Ticket in' },
    { id: 'draft', kind: 'plain', label: 'AI draft' },
    { id: 'gate', kind: 'decision', label: 'confidence ≥ τ ?' },
    { id: 'review', kind: 'human', label: 'Agent review', branch: 'yes' },
    { id: 'send', kind: 'plain', label: 'Send', branch: 'yes' },
    { id: 'queue', kind: 'human', label: 'Human-first queue', branch: 'no' },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 05 — RESPONSIBLE AI',
        title: 'AI Risk Register & Model Card',
        lead: 'Two artifacts most AI portfolios skip: a likelihood × impact register whose mitigations name an owner and a cadence, and a model card that says out loud what the system must not be used for.',
        context: 'Scenario: “Meridian”, a fictional AI reply assistant for B2B support teams — the same product bet scored in Module 01.',
        signature: 'Signature interaction: pick a risk dot on the heat map — the register follows.',
        tabRegister: 'RISK REGISTER',
        tabCard: 'MODEL CARD',
        axisX: 'LIKELIHOOD →',
        axisY: 'IMPACT →',
        heatmapAria: 'Risk heat map: five risks plotted by likelihood and impact',
        srTableCaption: 'Risks by likelihood and impact',
        fields: { mitigation: 'Mitigation', owner: 'Owner', cadence: 'Review cadence', residual: 'Residual risk' },
        expandRisk: 'Expand risk detail', collapseRisk: 'Collapse risk detail',
        sections: {
            intended: 'Intended use',
            outOfScope: 'Out-of-scope use',
            assumptions: 'Training data assumptions',
            limitations: 'Known limitations',
            hitl: 'Human-in-the-loop map',
            fallback: 'Escalation & fallback',
        },
        branchYes: 'yes', branchNo: 'no',
    },
    zh: {
        eyebrow: 'MODULE 05 — RESPONSIBLE AI',
        title: 'AI 風險登錄簿與 Model Card',
        lead: '多數 AI 作品集會跳過的兩份文件：一張把負責人與檢視節奏寫進緩解措施的 likelihood × impact 登錄簿，以及一份把「不能拿來做什麼」大聲說清楚的 model card。',
        context: '情境：「Meridian」——虛構的 B2B 客服 AI 回覆輔助工具，與 Module 01 評分的是同一個產品賭注。',
        signature: '招牌互動：點選熱度圖上的風險點，右側清單會跟著展開。',
        tabRegister: 'RISK REGISTER',
        tabCard: 'MODEL CARD',
        axisX: 'LIKELIHOOD →',
        axisY: 'IMPACT →',
        heatmapAria: '風險熱度圖：五項風險依 likelihood 與 impact 標示',
        srTableCaption: '各風險的 likelihood 與 impact',
        fields: { mitigation: '緩解措施', owner: '負責人', cadence: '檢視節奏', residual: '殘餘風險' },
        expandRisk: '展開風險細節', collapseRisk: '收合風險細節',
        sections: {
            intended: '預期用途',
            outOfScope: '不適用範圍',
            assumptions: '訓練資料假設',
            limitations: '已知限制',
            hitl: 'Human-in-the-loop 流程',
            fallback: '升級與 fallback',
        },
        branchYes: 'yes', branchNo: 'no',
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
                                    x={PAD_LEFT + col * CELL + 1} y={PAD_TOP + row * CELL + 1}
                                    width={CELL - 2} height={CELL - 2} rx="4"
                                    fill="var(--bg-2)" stroke="var(--line-1)" strokeWidth="1"
                                />
                                {tint > 0 && (
                                    <rect
                                        x={PAD_LEFT + col * CELL + 1} y={PAD_TOP + row * CELL + 1}
                                        width={CELL - 2} height={CELL - 2} rx="4"
                                        fill={`rgba(217,106,91,${tint.toFixed(3)})`}
                                    />
                                )}
                            </g>
                        );
                    }))}
                {[1, 2, 3, 4, 5].map(n => (
                    <text key={`x${n}`} x={PAD_LEFT + (n - 0.5) * CELL} y={PAD_TOP + GRID + 14}
                        className="los-m3-axis-num" textAnchor="middle">{n}</text>
                ))}
                {[1, 2, 3, 4, 5].map(n => (
                    <text key={`y${n}`} x={PAD_LEFT - 8} y={PAD_TOP + (5 - n + 0.5) * CELL + 3}
                        className="los-m3-axis-num" textAnchor="end">{n}</text>
                ))}
                <text x={PAD_LEFT + GRID / 2} y={height - 4} className="los-m3-axis-label" textAnchor="middle">{t.axisX}</text>
                <text
                    x={0} y={0} className="los-m3-axis-label" textAnchor="middle"
                    transform={`translate(10 ${PAD_TOP + GRID / 2}) rotate(-90)`}
                >{t.axisY}</text>
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
                            aria-label={`${risk.id}: ${risk.title[lang]} — likelihood ${risk.likelihood}, impact ${risk.impact}`}
                            className="los-m3-dotgroup"
                            onClick={() => onSelect(risk.id)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(risk.id); }
                            }}
                        >
                            <circle cx={cx} cy={cy} r="14" fill="transparent" />
                            <circle cx={cx} cy={cy} r="5" className={`los-m3-dot${selected ? ' is-selected' : ''}`} />
                            <text x={cx + 9} y={cy - 7} className="los-m3-dot-label">{risk.id}</text>
                        </g>
                    );
                })}
            </svg>
            <table className="los-sr-only">
                <caption>{t.srTableCaption}</caption>
                <thead>
                    <tr><th scope="col">Risk</th><th scope="col">Likelihood</th><th scope="col">Impact</th></tr>
                </thead>
                <tbody>
                    {RISKS.map(risk => (
                        <tr key={risk.id}>
                            <th scope="row">{risk.id} — {risk.title[lang]}</th>
                            <td>{risk.likelihood}</td>
                            <td>{risk.impact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                            <span className="los-m3-risk-id los-data-sm">{risk.id}</span>
                            <span className="los-m3-risk-title">{risk.title[lang]}</span>
                            <span className="los-m3-risk-pos los-data-sm">L{risk.likelihood} × I{risk.impact}</span>
                        </button>
                        {expanded && (
                            <div className="los-m3-risk-detail">
                                <div className="los-m3-field">
                                    <span className="los-data-sm los-m3-field-label">{t.fields.mitigation}</span>
                                    <p>{risk.mitigation[lang]}</p>
                                </div>
                                <div className="los-m3-field-row">
                                    <div className="los-m3-field">
                                        <span className="los-data-sm los-m3-field-label">{t.fields.owner}</span>
                                        <p className="los-data-md">{risk.owner}</p>
                                    </div>
                                    <div className="los-m3-field">
                                        <span className="los-data-sm los-m3-field-label">{t.fields.cadence}</span>
                                        <p className="los-data-md">{risk.cadence[lang]}</p>
                                    </div>
                                </div>
                                <div className="los-m3-field is-residual">
                                    <span className="los-data-sm los-m3-field-label">{t.fields.residual}</span>
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
            <rect x={x} y={y} width={w} height="38" rx="8"
                fill="var(--bg-2)"
                stroke={kind === 'human' ? 'var(--teal)' : 'var(--line-2)'} strokeWidth="1.2" />
            <text x={x + w / 2} y={y + 23} textAnchor="middle" className="los-m3-flow-text">{label}</text>
        </g>
    );
    return (
        <svg viewBox="0 0 680 190" className="los-m3-flow" role="img"
            aria-label="Human-in-the-loop flow: ticket in, AI draft, confidence check; above threshold goes to agent review then send, below threshold goes to the human-first queue.">
            <defs>
                <marker id="los-m3-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0 0.5L7.5 4L0 7.5z" fill="var(--text-3)" />
                </marker>
            </defs>
            {box(6, 76, 82, 'Ticket in', 'plain')}
            {box(128, 76, 82, 'AI draft', 'plain')}
            <g>
                <polygon points="300,60 366,95 300,130 234,95" fill="var(--bg-2)" stroke="var(--amber)" strokeWidth="1.2" />
                <text x="300" y="92" textAnchor="middle" className="los-m3-flow-text">confidence</text>
                <text x="300" y="106" textAnchor="middle" className="los-m3-flow-text">≥ τ ?</text>
            </g>
            {box(430, 26, 112, 'Agent review', 'human')}
            {box(592, 26, 68, 'Send', 'plain')}
            {box(430, 130, 150, 'Human-first queue', 'human')}
            <line x1="88" y1="95" x2="122" y2="95" stroke="var(--text-3)" strokeWidth="1.2" markerEnd="url(#los-m3-arrow)" />
            <line x1="210" y1="95" x2="228" y2="95" stroke="var(--text-3)" strokeWidth="1.2" markerEnd="url(#los-m3-arrow)" />
            <path d="M366 95 L398 95 L398 45 L424 45" fill="none" stroke="var(--text-3)" strokeWidth="1.2" markerEnd="url(#los-m3-arrow)" />
            <path d="M366 95 L398 95 L398 149 L424 149" fill="none" stroke="var(--text-3)" strokeWidth="1.2" markerEnd="url(#los-m3-arrow)" />
            <line x1="542" y1="45" x2="586" y2="45" stroke="var(--text-3)" strokeWidth="1.2" markerEnd="url(#los-m3-arrow)" />
            <text x="404" y="38" className="los-m3-flow-branch is-yes">{t.branchYes}</text>
            <text x="404" y="143" className="los-m3-flow-branch is-no">{t.branchNo}</text>
        </svg>
    );
}

function HitlSteps({ t }) {
    return (
        <ol className="los-m3-flowsteps">
            {HITL_STEPS.map(step => (
                <li key={step.id} className={`los-m3-flowstep is-${step.kind}`}>
                    {step.branch && <span className={`los-m3-flow-branch is-${step.branch}`}>{step.branch === 'yes' ? t.branchYes : t.branchNo} →</span>}
                    <span className="los-data-md">{step.label}</span>
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
                    <h4 className="los-eyebrow los-m3-card-heading">{t.sections.intended}</h4>
                    <ul className="los-m3-card-list">
                        {MODEL_CARD.intended.map((item, i) => <li key={i}>{item[lang]}</li>)}
                    </ul>
                </section>
                <section aria-label={t.sections.outOfScope}>
                    <h4 className="los-eyebrow los-m3-card-heading">{t.sections.outOfScope}</h4>
                    <ul className="los-m3-card-list is-outscope">
                        {MODEL_CARD.outOfScope.map((item, i) => <li key={i}>{item[lang]}</li>)}
                    </ul>
                </section>
            </div>
            <section aria-label={t.sections.assumptions}>
                <h4 className="los-eyebrow los-m3-card-heading">{t.sections.assumptions}</h4>
                <ol className="los-m3-card-list is-numbered">
                    {MODEL_CARD.assumptions.map((item, i) => <li key={i}>{item[lang]}</li>)}
                </ol>
            </section>
            <section aria-label={t.sections.limitations}>
                <h4 className="los-eyebrow los-m3-card-heading">{t.sections.limitations}</h4>
                <ul className="los-m3-card-list">
                    {MODEL_CARD.limitations.map((item, i) => <li key={i}>{item[lang]}</li>)}
                </ul>
            </section>
            <section aria-label={t.sections.hitl}>
                <h4 className="los-eyebrow los-m3-card-heading">{t.sections.hitl}</h4>
                {viewport === 'mobile' ? <HitlSteps t={t} /> : <HitlDiagram t={t} />}
                <p className="los-data-sm los-m3-tau">{MODEL_CARD.tauNote[lang]}</p>
            </section>
            <section aria-label={t.sections.fallback}>
                <h4 className="los-eyebrow los-m3-card-heading">{t.sections.fallback}</h4>
                <p className="los-m3-fallback">{MODEL_CARD.fallback[lang]}</p>
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
        if (e.key === 'ArrowRight') next = ids[(idx + 1) % ids.length];
        else if (e.key === 'ArrowLeft') next = ids[(idx - 1 + ids.length) % ids.length];
        else if (e.key === 'Home') next = ids[0];
        else if (e.key === 'End') next = ids[ids.length - 1];
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
                        <HeatMap t={t} lang={lang} selectedId={selectedRisk} onSelect={setSelectedRisk} />
                        <RiskList t={t} lang={lang} selectedId={selectedRisk} onSelect={setSelectedRisk} />
                    </div>
                ) : (
                    <ModelCard t={t} lang={lang} viewport={viewport} />
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
