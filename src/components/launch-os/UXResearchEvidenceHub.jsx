import React, { useLayoutEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// n=8, two interview rounds. P1,P2,P4,P6,P8 support agents · P3,P7 team leads ·
// P5 ops manager. Quote counts back the confidence math on each insight card.

const PARTICIPANTS = {
    P1: 'agent', P2: 'agent', P3: 'lead', P4: 'agent',
    P5: 'ops', P6: 'agent', P7: 'lead', P8: 'agent',
};

const CLUSTERS = [
    {
        id: 'c1',
        title: { en: 'They trust the draft until it’s wrong once', zh: '他們信任草稿——直到它錯一次' },
        notes: [
            { id: 'n1', p: 'P2', round: 1, insight: 'i1', quote: { en: 'It quoted the old refund policy once. Once. I still check every number it gives me.', zh: '它引用過一次舊的退款政策。就一次。到現在它給的每個數字我都要查。' } },
            { id: 'n2', p: 'P6', round: 1, insight: 'i1', quote: { en: 'First week I was like, wow. Then it made up a plan name.', zh: '第一週我還想說，哇。然後它就捏造了一個方案名稱。' } },
            { id: 'n3', p: 'P3', round: 2, insight: 'i1', quote: { en: 'My team screenshots the bad ones. They don’t screenshot the good ones.', zh: '我的組員會截圖爛的草稿。好的沒人截圖。' } },
            { id: 'n4', p: 'P5', round: 2, insight: 'i1', quote: { en: 'One wrong reply to an enterprise account and I’m in a meeting about it.', zh: '對企業客戶回錯一封，我就要進會議室解釋。' } },
            { id: 'n5', p: 'P8', round: 1, insight: 'i1', quote: { en: 'I trust it on password stuff. Billing? No.', zh: '密碼那類的我信它。帳務？不。' } },
            { id: 'n6', p: 'P7', round: 2, insight: 'i1', quote: { en: 'We rolled it out twice. The second rollout was “please just try it again”.', zh: '我們推行了兩次。第二次的說法是「拜託再試一次就好」。' } },
        ],
    },
    {
        id: 'c2',
        title: { en: 'Speed is not the thing they’re proud of', zh: '速度不是他們引以為傲的東西' },
        notes: [
            { id: 'n7', p: 'P1', round: 1, insight: 'i2', quote: { en: 'Anyone can be fast. I’m the one who calms people down.', zh: '快誰都會。能把人安撫下來的是我。' } },
            { id: 'n8', p: 'P4', round: 2, insight: 'i2', quote: { en: 'I rewrite the greeting every time. It has to sound like me.', zh: '開頭那句我每次都重寫。要聽起來像我。' } },
            { id: 'n9', p: 'P2', round: 2, insight: 'i2', quote: { en: 'If I send it as-is and it’s wrong, that’s on me. So I always change something.', zh: '照收送出結果錯了，算我頭上。所以我一定會改點什麼。' } },
            { id: 'n10', p: 'P6', round: 2, insight: 'i2', quote: { en: 'The drafts are fine. Fine isn’t my standard.', zh: '草稿是還行。「還行」不是我的標準。' } },
        ],
    },
    {
        id: 'c3',
        title: { en: 'The queue decides, not the agent', zh: '決定順序的是佇列，不是客服' },
        notes: [
            { id: 'n11', p: 'P8', round: 2, insight: 'i3', quote: { en: 'I don’t pick tickets. The queue picks me.', zh: '不是我挑工單，是佇列挑我。' } },
            { id: 'n12', p: 'P3', round: 1, insight: 'i3', quote: { en: 'Session summaries are useless mid-shift. They need help on THIS ticket.', zh: '排班排到一半，session 摘要沒有用。他們需要的是「這張」工單的幫忙。' } },
            { id: 'n13', p: 'P1', round: 2, insight: 'i3', quote: { en: 'By ticket forty I’m not reading dashboards, I promise.', zh: '到第四十張工單的時候，我保證我不會去看 dashboard。' } },
            { id: 'n14', p: 'P5', round: 1, insight: 'i3', quote: { en: 'Routing is set at the org level. Agents work what lands.', zh: '派單規則是公司層級設定的。掉下來什麼，客服就做什麼。' } },
        ],
    },
    {
        id: 'c4',
        title: { en: 'Nobody reads the help center twice', zh: '沒有人會讀第二次說明中心' },
        notes: [
            { id: 'n15', p: 'P4', round: 1, insight: 'i4', quote: { en: 'That article’s been wrong since March. We just know it’s wrong.', zh: '那篇文章從三月就是錯的。我們都知道它是錯的，就這樣。' } },
            { id: 'n16', p: 'P7', round: 1, insight: 'i4', quote: { en: 'I asked docs to fix one page three times. I stopped asking.', zh: '同一頁我請文件團隊修過三次。後來我就不問了。' } },
            { id: 'n17', p: 'P6', round: 2, insight: 'i4', quote: { en: 'I answer from memory. Faster than searching our own docs.', zh: '我用記憶回答。比搜我們自己的文件還快。' } },
            { id: 'n18', p: 'P2', round: 1, insight: 'i5', quote: { en: 'New guy asked me why the doc says X. I said ignore the doc.', zh: '新人問我為什麼文件寫 X。我說，別理文件。' } },
            { id: 'n19', p: 'P3', round: 2, insight: 'i5', quote: { en: 'Our newest agent reads the drafts like a textbook. Interesting, right?', zh: '我們最新的客服把草稿當教科書在讀。很有意思吧？' } },
        ],
    },
];

const ALL_NOTES = CLUSTERS.flatMap(cluster => cluster.notes);

const INSIGHTS = [
    {
        id: 'i1', confidence: 'high',
        statement: {
            en: 'One visibly wrong draft costs more trust than ten good drafts earn. Trust is asymmetric — agents remember the incident, not the rate.',
            zh: '一份明顯出錯的草稿，賠掉的信任比十份好草稿賺到的還多。信任是不對稱的——客服記得的是那次事件，不是比率。',
        },
        decisions: ['d1', 'd2'],
    },
    {
        id: 'i2', confidence: 'medium',
        statement: {
            en: 'Agents edit drafts to protect their voice, not to fix errors. An accepted-but-edited draft is a success signal, not a failure signal.',
            zh: '客服編輯草稿是為了保住自己的語氣，不是為了修錯。「被採用但有編輯」是成功訊號，不是失敗訊號。',
        },
        decisions: ['d3'],
    },
    {
        id: 'i3', confidence: 'medium',
        statement: {
            en: 'Agents don’t choose their next ticket — the queue does. Per-ticket assistance beats per-session summaries by construction.',
            zh: '客服不選下一張工單——佇列選。逐張工單的協助，從結構上就贏過 session 層級的摘要。',
        },
        decisions: ['d4', 'd5'],
    },
    {
        id: 'i4', confidence: 'medium',
        statement: {
            en: 'Stale help-center articles create repeat tickets that agents answer from memory, bypassing the docs entirely — so fixing docs never feels urgent to the people who suffer from them.',
            zh: '過期的說明中心文章製造重複工單，客服用記憶回答、完全繞過文件——所以最受其害的人，反而永遠不覺得修文件是急事。',
        },
        decisions: [],
    },
    {
        id: 'i5', confidence: 'emerging', followUp: true,
        statement: {
            en: 'New agents may be using drafts as onboarding curriculum, not just as a speed tool. If true, draft quality shapes how the next cohort learns the product.',
            zh: '新進客服可能把草稿當成入職教材，而不只是提速工具。若屬實，草稿品質會形塑下一批人如何認識這個產品。',
        },
        decisions: [],
    },
];

const DECISIONS = [
    { id: 'd1', label: { en: 'Gate 6 — recall path made a launch criterion', zh: 'Gate 6——撤回路徑列為上線判準' } },
    { id: 'd2', label: { en: 'PRD §5 — three-level confidence badge, no numeric scores', zh: 'PRD §5——三段式信心標記，不用數值分數' } },
    { id: 'd3', label: { en: 'PRD §5 — edit-diff loop treats edits as tone signal', zh: 'PRD §5——編輯 diff 回流視為語氣訊號' } },
    { id: 'd4', label: { en: 'PRD scope cut #2 — per-ticket confidence; session summaries dropped from v1', zh: 'PRD scope cut #2——逐工單 confidence；session 摘要退出 v1' } },
    { id: 'd5', label: { en: 'Gate 4 — workflow fit validated inside the reply editor', zh: 'Gate 4——workflow fit 在回覆編輯器內驗證' } },
];

const insightStats = insight => {
    const notes = ALL_NOTES.filter(note => note.insight === insight.id);
    const people = [...new Set(notes.map(note => note.p))];
    const roles = [...new Set(people.map(p => PARTICIPANTS[p]))];
    return { quoteCount: notes.length, peopleCount: people.length, roleCount: roles.length };
};

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 03 — RESEARCH SYSTEM',
        title: 'UX Research Evidence Hub',
        lead: 'Nineteen interview quotes, four tension clusters, five insights with computed confidence, and a traceability view of which insight moved which decision. Two insights lead nowhere yet — real synthesis has leftovers.',
        context: 'Scenario: “Meridian” pilot research, two interview rounds. Quotes simulated; the synthesis method is the artifact.',
        signature: 'Signature interaction: open an insight’s quotes — the affinity view lights up its sources.',
        method: [
            { label: 'METHOD', value: 'Semi-structured interviews, 45 min, remote' },
            { label: 'PARTICIPANTS', value: 'n=8 — 5 support agents, 2 team leads, 1 ops manager' },
            { label: 'RECRUITMENT', value: 'Internal panel, screened for ≥ 6 mo tenure' },
            { label: 'ANALYSIS', value: 'Open coding → affinity mapping → insight synthesis' },
        ],
        tabs: { affinity: 'A · AFFINITY MAP', insights: 'B · INSIGHTS', trace: 'C · TRACEABILITY' },
        feedsInsight: 'feeds',
        roundLabel: 'R',
        confidenceRule: 'Confidence: High = 6+ participants across roles · Medium = 3–5 · Emerging = 1–2',
        confidenceWord: { high: 'HIGH', medium: 'MEDIUM', emerging: 'EMERGING' },
        statsLine: (s) => `${s.peopleCount}/8 participants · ${s.roleCount} ${s.roleCount > 1 ? 'roles' : 'role'} · ${s.quoteCount} quotes`,
        viewQuotes: 'View source quotes',
        followUp: 'Needs a follow-up diary study before anyone bets on it.',
        insightsCol: 'INSIGHTS',
        decisionsCol: 'PRODUCT DECISIONS',
        informed: 'informed',
        noDecision: 'not yet mapped to a decision',
        backlogNote: '2 insights did not map to any decision — parked in the research backlog:',
    },
    zh: {
        eyebrow: 'MODULE 03 — RESEARCH SYSTEM',
        title: '研究證據庫',
        lead: '十九句訪談引述、四個張力群集、五張信心等級算得出來的 insight 卡，以及一個「哪個 insight 改變了哪個決策」的 traceability 檢視。有兩張 insight 目前還沒有去處——真實的 synthesis 本來就會有剩料。',
        context: '情境：「Meridian」試點研究，兩輪訪談。引述為模擬；synthesis 方法本身才是作品。',
        signature: '招牌互動：點開 insight 的來源引述，affinity 檢視會亮出它的便箋。',
        method: [
            { label: 'METHOD', value: '半結構式訪談，45 分鐘，遠端' },
            { label: 'PARTICIPANTS', value: 'n=8——5 位客服、2 位 team lead、1 位 ops manager' },
            { label: 'RECRUITMENT', value: '內部名單，篩選年資 ≥ 6 個月' },
            { label: 'ANALYSIS', value: 'Open coding → affinity mapping → insight synthesis' },
        ],
        tabs: { affinity: 'A · AFFINITY MAP', insights: 'B · INSIGHTS', trace: 'C · TRACEABILITY' },
        feedsInsight: '餵給',
        roundLabel: 'R',
        confidenceRule: '信心等級：High = 6 位以上、跨角色 · Medium = 3–5 位 · Emerging = 1–2 位',
        confidenceWord: { high: 'HIGH', medium: 'MEDIUM', emerging: 'EMERGING' },
        statsLine: (s) => `${s.peopleCount}/8 位受訪者 · ${s.roleCount} 種角色 · ${s.quoteCount} 句引述`,
        viewQuotes: '回看來源引述',
        followUp: '需要一次後續的 diary study，在那之前別對它下注。',
        insightsCol: 'INSIGHTS',
        decisionsCol: 'PRODUCT DECISIONS',
        informed: '影響了',
        noDecision: '尚未對應到任何決策',
        backlogNote: '有 2 張 insight 沒有對應到任何決策——先放進 research backlog：',
    },
};

// ---- views ----------------------------------------------------------------------
function MethodBar({ t }) {
    return (
        <div className="los-m4-method">
            {t.method.map(cell => (
                <div className="los-m4-method-cell" key={cell.label}>
                    <span className="los-eyebrow los-m4-method-label">{cell.label}</span>
                    <span className="los-m4-method-value">{cell.value}</span>
                </div>
            ))}
        </div>
    );
}

function AffinityView({ t, lang, highlightInsight }) {
    return (
        <div className="los-m4-clusters">
            {CLUSTERS.map(cluster => (
                <section className="los-m4-cluster" key={cluster.id} aria-label={cluster.title[lang]}>
                    <h4 className="los-m4-cluster-title">{cluster.title[lang]}</h4>
                    <div className="los-m4-notes">
                        {cluster.notes.map(note => (
                            <div
                                key={note.id}
                                tabIndex="0"
                                className={`los-m4-note${highlightInsight === note.insight ? ' is-related' : ''}`}
                            >
                                <p className="los-m4-note-quote">“{note.quote[lang]}”</p>
                                <span className="los-data-sm los-m4-note-meta">
                                    {note.p} · {t.roundLabel}{note.round}
                                </span>
                                <span className="los-data-sm los-m4-note-feeds">→ {t.feedsInsight} {note.insight.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

function InsightsView({ t, lang, onViewQuotes, animateIn }) {
    return (
        <div>
            <p className="los-data-sm los-m4-rule">{t.confidenceRule}</p>
            <div className={`los-m4-insights${animateIn ? ' is-gathering' : ''}`}>
                {INSIGHTS.map((insight, index) => {
                    const stats = insightStats(insight);
                    return (
                        <article
                            className="los-m4-insight"
                            key={insight.id}
                            style={animateIn ? { animationDelay: `${index * 70}ms` } : undefined}
                        >
                            <div className="los-m4-insight-top">
                                <span className="los-data-sm los-m4-insight-id">{insight.id.toUpperCase()}</span>
                                <span className={`los-data-sm los-m4-conf is-${insight.confidence}`}>{t.confidenceWord[insight.confidence]}</span>
                            </div>
                            <p className="los-m4-insight-text">{insight.statement[lang]}</p>
                            <p className="los-data-sm los-m4-insight-stats">{t.statsLine(stats)}</p>
                            {insight.followUp && <p className="los-data-sm los-m4-followup">{t.followUp}</p>}
                            <button className="los-data-sm los-m4-quotes-btn" onClick={() => onViewQuotes(insight.id)}>
                                {t.viewQuotes} ({stats.quoteCount})
                            </button>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

function TraceView({ t, lang, viewport }) {
    const wrapRef = useRef(null);
    const itemEls = useRef(new Map());
    const [edges, setEdges] = useState([]);
    const [hovered, setHovered] = useState(null);
    const registerRef = (id, el) => { if (el) itemEls.current.set(id, el); };

    useLayoutEffect(() => {
        if (viewport === 'mobile') return;
        const wrap = wrapRef.current;
        if (!wrap) return;
        const compute = () => {
            const base = wrap.getBoundingClientRect();
            const next = [];
            for (const insight of INSIGHTS) {
                const fromEl = itemEls.current.get(insight.id);
                if (!fromEl) continue;
                for (const decisionId of insight.decisions) {
                    const toEl = itemEls.current.get(decisionId);
                    if (!toEl) continue;
                    const a = fromEl.getBoundingClientRect();
                    const b = toEl.getBoundingClientRect();
                    const x1 = a.right - base.left;
                    const y1 = a.top + a.height / 2 - base.top;
                    const x2 = b.left - base.left;
                    const y2 = b.top + b.height / 2 - base.top;
                    const mid = (x1 + x2) / 2;
                    next.push({
                        key: `${insight.id}-${decisionId}`,
                        from: insight.id, to: decisionId,
                        d: `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`,
                    });
                }
            }
            setEdges(next);
        };
        compute();
        const observer = new ResizeObserver(compute);
        observer.observe(wrap);
        return () => observer.disconnect();
    }, [lang, viewport]);

    const isLinked = id => {
        if (!hovered) return false;
        if (id === hovered) return true;
        return edges.some(edge =>
            (edge.from === hovered && edge.to === id) || (edge.to === hovered && edge.from === id));
    };
    const hoverProps = id => ({
        onMouseEnter: () => setHovered(id),
        onMouseLeave: () => setHovered(null),
        onFocus: () => setHovered(id),
        onBlur: () => setHovered(null),
    });

    const backlog = INSIGHTS.filter(insight => insight.decisions.length === 0);

    if (viewport === 'mobile') {
        return (
            <div>
                {INSIGHTS.map(insight => (
                    <div className="los-m4-trace-item" key={insight.id} style={{ marginBottom: 12 }}>
                        <span className="los-data-sm los-m4-insight-id">{insight.id.toUpperCase()}</span>
                        <p className="los-m4-insight-text" style={{ margin: '4px 0' }}>{insight.statement[lang]}</p>
                        <p className="los-data-sm los-m4-trace-informed">
                            → {insight.decisions.length
                                ? `${t.informed}: ${insight.decisions.map(id => DECISIONS.find(d => d.id === id).label[lang]).join('; ')}`
                                : t.noDecision}
                        </p>
                    </div>
                ))}
                <p className="los-data-sm los-m4-backlog">
                    {t.backlogNote} {backlog.map(item => item.id.toUpperCase()).join(', ')}
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="los-m4-trace" ref={wrapRef}>
                <svg className="los-m4-trace-edges" aria-hidden="true">
                    {edges.map(edge => (
                        <path
                            key={edge.key}
                            d={edge.d}
                            className={`los-m4-edge${hovered && isLinked(edge.from) && isLinked(edge.to) ? ' is-active' : ''}`}
                        />
                    ))}
                </svg>
                <div className="los-m4-trace-col">
                    <span className="los-eyebrow">{t.insightsCol}</span>
                    {INSIGHTS.map(insight => (
                        <div
                            key={insight.id}
                            ref={el => registerRef(insight.id, el)}
                            tabIndex="0"
                            className={`los-m4-trace-item${isLinked(insight.id) ? ' is-linked' : ''}${insight.decisions.length === 0 ? ' is-parked' : ''}`}
                            {...hoverProps(insight.id)}
                        >
                            <span className="los-data-sm los-m4-insight-id">{insight.id.toUpperCase()}</span>
                            <p>{insight.statement[lang]}</p>
                        </div>
                    ))}
                </div>
                <div className="los-m4-trace-col">
                    <span className="los-eyebrow">{t.decisionsCol}</span>
                    {DECISIONS.map(decision => (
                        <div
                            key={decision.id}
                            ref={el => registerRef(decision.id, el)}
                            tabIndex="0"
                            className={`los-m4-trace-item${isLinked(decision.id) ? ' is-linked' : ''}`}
                            {...hoverProps(decision.id)}
                        >
                            <p>{decision.label[lang]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <p className="los-data-sm los-m4-backlog">
                {t.backlogNote} {backlog.map(item => item.id.toUpperCase()).join(', ')}
            </p>
        </div>
    );
}

// ---- module ------------------------------------------------------------------------
export default function UXResearchEvidenceHub() {
    const { lang, t } = useI18n(COPY);
    const viewport = useViewport();
    const reducedMotion = usePrefersReducedMotion();
    const [view, setView] = useState('affinity');
    const [highlightInsight, setHighlightInsight] = useState(null);
    const playedGather = useRef(false);
    const [animateIn, setAnimateIn] = useState(false);

    const switchView = next => {
        if (next === 'insights' && !playedGather.current && !reducedMotion) {
            playedGather.current = true;
            setAnimateIn(true);
        } else {
            setAnimateIn(false);
        }
        if (next !== 'affinity') setHighlightInsight(null);
        setView(next);
    };

    const onViewQuotes = insightId => {
        setHighlightInsight(insightId);
        setAnimateIn(false);
        setView('affinity');
    };

    const tabs = ['affinity', 'insights', 'trace'];
    const onTabKeyDown = e => {
        const idx = tabs.indexOf(view);
        let next = null;
        if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (!next) return;
        e.preventDefault();
        switchView(next);
        document.getElementById(`los-m4-tab-${next}`)?.focus();
    };

    return (
        <ModuleFrame
            id="los-module-research"
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
            context={t.context}
            roles={['UX RESEARCHER', 'PRODUCT DESIGNER']}
            signature={t.signature}
        >
            <MethodBar t={t} />
            <div className="los-m4-tablist" role="tablist" aria-label={t.title}>
                {tabs.map(id => (
                    <button
                        key={id}
                        id={`los-m4-tab-${id}`}
                        role="tab"
                        aria-selected={view === id}
                        aria-controls={`los-m4-panel-${id}`}
                        tabIndex={view === id ? 0 : -1}
                        className={`los-m4-tab${view === id ? ' is-active' : ''}`}
                        onClick={() => switchView(id)}
                        onKeyDown={onTabKeyDown}
                    >
                        {t.tabs[id]}
                    </button>
                ))}
            </div>
            <div
                key={view}
                id={`los-m4-panel-${view}`}
                role="tabpanel"
                aria-labelledby={`los-m4-tab-${view}`}
                className="los-m4-panel"
            >
                {view === 'affinity' && <AffinityView t={t} lang={lang} highlightInsight={highlightInsight} />}
                {view === 'insights' && <InsightsView t={t} lang={lang} onViewQuotes={onViewQuotes} animateIn={animateIn} />}
                {view === 'trace' && <TraceView t={t} lang={lang} viewport={viewport} />}
            </div>
        </ModuleFrame>
    );
}

// ---- styles ---------------------------------------------------------------------
injectStyles('los-m4-styles', `
.los-m4-method {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--line-1);
  border: 1px solid var(--line-1); border-radius: var(--radius-md);
  overflow: hidden; margin-bottom: 24px;
}
.los-m4-method-cell { background: var(--bg-2); padding: 12px 14px; }
.los-m4-method-label { display: block; margin-bottom: 6px; font-size: 10px; }
.los-m4-method-value { font-size: 13px; line-height: 1.5; color: var(--text-2); }

.los-m4-tablist { display: flex; gap: 4px; border-bottom: 1px solid var(--line-1); margin-bottom: 20px; flex-wrap: wrap; }
.los-m4-tab {
  font-family: var(--font-data); font-size: 12px; letter-spacing: 0.1em;
  color: var(--text-3); padding: 10px 14px;
  border-bottom: 2px solid transparent;
  transition: color 200ms var(--ease), border-color 200ms var(--ease);
}
.los-m4-tab.is-active { color: var(--teal); border-bottom-color: var(--teal); }
.los-m4-panel { animation: los-m4-fade 200ms var(--ease); }
@keyframes los-m4-fade { from { opacity: 0; } to { opacity: 1; } }

/* -- affinity -- */
.los-m4-clusters { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; align-items: start; }
.los-m4-cluster-title {
  font-family: var(--font-display); font-size: 17px; font-weight: 500;
  color: var(--text-1); line-height: 1.35; margin: 0 0 12px; min-height: 46px;
}
.los-m4-notes { display: flex; flex-direction: column; gap: 8px; }
.los-m4-note {
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-sm);
  padding: 10px 12px;
  transition: background 200ms var(--ease), border-color 200ms var(--ease);
}
.los-m4-note:hover { background: var(--bg-3); border-color: var(--line-2); }
.los-m4-note.is-related { border-color: var(--teal); background: var(--teal-dim); }
.los-m4-note-quote { font-size: 13px; line-height: 1.55; color: var(--text-2); margin: 0 0 6px; }
.los-m4-note-meta { color: var(--text-3); }
.los-m4-note-feeds { display: block; color: var(--teal); opacity: 0; transition: opacity 200ms var(--ease); margin-top: 4px; }
.los-m4-note:hover .los-m4-note-feeds, .los-m4-note:focus-visible .los-m4-note-feeds, .los-m4-note.is-related .los-m4-note-feeds { opacity: 1; }

/* -- insights -- */
.los-m4-rule { color: var(--text-3); margin: 0 0 14px; }
.los-m4-insights { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; align-items: start; }
.los-m4-insights.is-gathering .los-m4-insight { animation: los-m4-gather 600ms var(--ease) backwards; }
@keyframes los-m4-gather {
  from { opacity: 0; transform: translateY(-14px) scale(0.92); }
  to { opacity: 1; transform: none; }
}
.los-m4-insight {
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  padding: 14px;
}
.los-m4-insight-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.los-m4-insight-id { color: var(--text-3); }
.los-m4-conf { letter-spacing: 0.1em; }
.los-m4-conf.is-high { color: var(--teal); }
.los-m4-conf.is-medium { color: var(--text-2); }
.los-m4-conf.is-emerging { color: var(--amber); }
.los-m4-insight-text { font-size: 14px; line-height: 1.6; color: var(--text-1); margin: 0 0 10px; }
.los-m4-insight-stats { color: var(--text-3); margin: 0 0 8px; }
.los-m4-followup { color: var(--amber); margin: 0 0 8px; }
.los-m4-quotes-btn {
  color: var(--teal); border: 1px solid var(--line-2); border-radius: var(--radius-sm);
  padding: 5px 10px;
}
.los-m4-quotes-btn:hover { border-color: var(--teal); background: var(--teal-dim); }

/* -- traceability -- */
.los-m4-trace { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 120px; }
.los-m4-trace-edges { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.los-m4-edge { fill: none; stroke: var(--line-2); stroke-width: 1.2; transition: stroke 200ms var(--ease); }
.los-m4-edge.is-active { stroke: var(--teal); stroke-width: 1.6; }
.los-m4-trace-col { display: flex; flex-direction: column; gap: 10px; }
.los-m4-trace-item {
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  padding: 10px 12px;
  transition: border-color 200ms var(--ease);
}
.los-m4-trace-item p { font-size: 13px; line-height: 1.55; color: var(--text-2); margin: 0; }
.los-m4-trace-item.is-linked { border-color: var(--teal); }
.los-m4-trace-item.is-parked { border-style: dashed; }
.los-m4-trace-informed { color: var(--text-3); margin: 0; }
.los-m4-backlog { color: var(--amber); margin: 16px 0 0; }

@media (max-width: 1023px) {
  .los-m4-clusters { grid-template-columns: repeat(2, 1fr); }
  .los-m4-insights { grid-template-columns: repeat(2, 1fr); }
  .los-m4-method { grid-template-columns: repeat(2, 1fr); }
  .los-m4-cluster-title { min-height: 0; }
}
@media (max-width: 767px) {
  .los-m4-clusters { grid-template-columns: 1fr; }
  .los-m4-insights { grid-template-columns: 1fr; }
  .los-m4-method { grid-template-columns: 1fr; }
  .los-m4-trace { grid-template-columns: 1fr; gap: 16px; }
}
`);
