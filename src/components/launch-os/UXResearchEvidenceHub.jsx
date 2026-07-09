import React, { useLayoutEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, usePrefersReducedMotion, useViewport } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// n=8, two interview rounds. P1,P2,P4,P6,P8 support agents · P3,P7 team leads ·
// P5 ops manager.
// ✅ 修改：保留原本研究結構，將訪談、洞察與決策文案改得更自然、可讀、接近真實產品研究案例。

const PARTICIPANTS = {
    P1: 'agent', P2: 'agent', P3: 'lead', P4: 'agent',
    P5: 'ops', P6: 'agent', P7: 'lead', P8: 'agent',
};

const CLUSTERS = [
    {
        id: 'c1',
        title: {
            en: 'One visible mistake can reset trust',
            zh: '一次明顯錯誤，就足以讓信任重來',
        },
        notes: [
            {
                id: 'n1',
                p: 'P2',
                round: 1,
                insight: 'i1',
                quote: {
                    en: 'It once used an old refund policy. Since then, I check every number before I send anything.',
                    zh: '它有一次用了舊的退款規則。從那之後，它給我的每個數字我都會再查一次。',
                },
            },
            {
                id: 'n2',
                p: 'P6',
                round: 1,
                insight: 'i1',
                quote: {
                    en: 'At first I thought it was impressive. Then it made up a plan name, and I stopped trusting it so easily.',
                    zh: '一開始我覺得它很厲害。後來它編了一個不存在的方案名稱，我就不敢太快相信它了。',
                },
            },
            {
                id: 'n3',
                p: 'P3',
                round: 2,
                insight: 'i1',
                quote: {
                    en: 'People remember the bad drafts. Good drafts just disappear into the workday.',
                    zh: '大家會記得錯的草稿。好的草稿反而就這樣融進工作裡，不會特別被提起。',
                },
            },
            {
                id: 'n4',
                p: 'P5',
                round: 2,
                insight: 'i1',
                quote: {
                    en: 'If a wrong reply goes to an enterprise customer, I’m the one who has to explain what happened.',
                    zh: '如果錯誤回覆送到企業客戶那邊，最後要解釋的人會是我。',
                },
            },
            {
                id: 'n5',
                p: 'P8',
                round: 1,
                insight: 'i1',
                quote: {
                    en: 'For password questions, I usually trust it. For billing questions, I slow down.',
                    zh: '密碼問題我通常會相信它。可是遇到帳務問題，我就會放慢速度再確認。',
                },
            },
            {
                id: 'n6',
                p: 'P7',
                round: 2,
                insight: 'i1',
                quote: {
                    en: 'The second rollout was harder. We were not introducing it anymore; we were asking people to try trusting it again.',
                    zh: '第二次推行比較難。那已經不是介紹新功能，而是在請大家重新試著相信它。',
                },
            },
        ],
    },
    {
        id: 'c2',
        title: {
            en: 'Agents care about voice, not just speed',
            zh: '客服在意的不只是速度，而是語氣與責任',
        },
        notes: [
            {
                id: 'n7',
                p: 'P1',
                round: 1,
                insight: 'i2',
                quote: {
                    en: 'Being fast is not the whole job. The customer needs to feel that someone understands them.',
                    zh: '快不是這份工作的全部。客戶需要感覺到有人真的理解他。',
                },
            },
            {
                id: 'n8',
                p: 'P4',
                round: 2,
                insight: 'i2',
                quote: {
                    en: 'I rewrite the opening almost every time. It has to sound like something I would actually say.',
                    zh: '開頭我幾乎每次都會重寫。它要聽起來像我真的會說的話。',
                },
            },
            {
                id: 'n9',
                p: 'P2',
                round: 2,
                insight: 'i2',
                quote: {
                    en: 'If I send the draft as-is and something is wrong, the customer will not blame the tool. They will blame me.',
                    zh: '如果我原封不動送出結果錯了，客戶不會怪工具，會怪我。',
                },
            },
            {
                id: 'n10',
                p: 'P6',
                round: 2,
                insight: 'i2',
                quote: {
                    en: 'The draft is usually okay. But “okay” is not always good enough for a tense customer.',
                    zh: '草稿通常還可以。但遇到情緒緊繃的客戶，「還可以」不一定夠。',
                },
            },
        ],
    },
    {
        id: 'c3',
        title: {
            en: 'The help has to meet the ticket they are on',
            zh: '協助必須出現在客服正在處理的那張工單上',
        },
        notes: [
            {
                id: 'n11',
                p: 'P8',
                round: 2,
                insight: 'i3',
                quote: {
                    en: 'I don’t really choose what to work on next. The queue decides that for me.',
                    zh: '我其實不是自己決定下一張要處理什麼。是佇列把工單丟給我。',
                },
            },
            {
                id: 'n12',
                p: 'P3',
                round: 1,
                insight: 'i3',
                quote: {
                    en: 'A shift summary is nice, but it does not help someone who is stuck on the ticket in front of them.',
                    zh: '班次摘要不錯，但幫不了正在卡在眼前那張工單的人。',
                },
            },
            {
                id: 'n13',
                p: 'P1',
                round: 2,
                insight: 'i3',
                quote: {
                    en: 'After dozens of tickets, I am not opening another dashboard. I need help inside the reply flow.',
                    zh: '處理了幾十張工單之後，我不會再打開另一個 dashboard。我需要的是回覆流程裡的協助。',
                },
            },
            {
                id: 'n14',
                p: 'P5',
                round: 1,
                insight: 'i3',
                quote: {
                    en: 'Routing is decided by the organization. Agents work on what lands in their queue.',
                    zh: '派單規則是公司層級決定的。客服就是處理落到自己佇列裡的東西。',
                },
            },
        ],
    },
    {
        id: 'c4',
        title: {
            en: 'When docs go stale, agents work from memory',
            zh: '文件過期後，客服就改靠記憶工作',
        },
        notes: [
            {
                id: 'n15',
                p: 'P4',
                round: 1,
                insight: 'i4',
                quote: {
                    en: 'That article has been wrong for months. At this point, everyone just knows not to use it.',
                    zh: '那篇文章錯了好幾個月。現在大家都知道不要照著它用。',
                },
            },
            {
                id: 'n16',
                p: 'P7',
                round: 1,
                insight: 'i4',
                quote: {
                    en: 'I asked the docs team to fix the same page a few times. After a while, I stopped asking.',
                    zh: '同一頁我請文件團隊修過幾次。後來我就不再問了。',
                },
            },
            {
                id: 'n17',
                p: 'P6',
                round: 2,
                insight: 'i4',
                quote: {
                    en: 'I answer from memory because searching our own docs takes longer.',
                    zh: '我會直接憑記憶回答，因為搜尋我們自己的文件反而更慢。',
                },
            },
            {
                id: 'n18',
                p: 'P2',
                round: 1,
                insight: 'i5',
                quote: {
                    en: 'A new agent asked why the doc said something different. I told him to ignore the doc for that case.',
                    zh: '新人問我為什麼文件寫得不一樣。我跟他說，那種情況先不要看那篇。',
                },
            },
            {
                id: 'n19',
                p: 'P3',
                round: 2,
                insight: 'i5',
                quote: {
                    en: 'New agents sometimes read the AI drafts like examples of how we answer customers.',
                    zh: '新進客服有時候會把 AI 草稿當成範例，看我們應該怎麼回客戶。',
                },
            },
        ],
    },
];

const ALL_NOTES = CLUSTERS.flatMap(cluster => cluster.notes);

const INSIGHTS = [
    {
        id: 'i1',
        confidence: 'high',
        statement: {
            en: 'Trust is shaped by memorable failures, not average performance. A single visible mistake can make agents review every future draft more carefully.',
            zh: '客服對 AI 的信任，往往不是由平均表現決定，而是被那些記得住的錯誤影響。一次明顯失誤，就可能讓他們之後重新檢查每一份草稿。',
        },
        decisions: ['d1', 'd2'],
    },
    {
        id: 'i2',
        confidence: 'medium',
        statement: {
            en: 'Agents edit drafts to protect their tone and accountability. An edited draft can still be a success signal if it helps them start faster without losing their voice.',
            zh: '客服修改草稿，不一定是因為 AI 錯了，而是為了保留自己的語氣與責任感。只要草稿能幫他們更快開始，且仍能保有自己的表達，被修改後採用仍然是成功訊號。',
        },
        decisions: ['d3'],
    },
    {
        id: 'i3',
        confidence: 'medium',
        statement: {
            en: 'Support work is driven by the ticket queue. Assistance works best when it appears inside the current ticket, not in a separate summary view.',
            zh: '客服工作是被工單佇列推著走的。協助最好出現在正在處理的那張工單裡，而不是另一個需要額外打開的摘要畫面。',
        },
        decisions: ['d4', 'd5'],
    },
    {
        id: 'i4',
        confidence: 'medium',
        statement: {
            en: 'Outdated help-center content creates hidden support load. Agents work around the docs from memory, which makes the documentation problem less visible to the people who can fix it.',
            zh: '過期的說明文件會製造隱性的客服負擔。客服用記憶繞過文件，反而讓真正能修文件的人不容易看見問題有多嚴重。',
        },
        decisions: [],
    },
    {
        id: 'i5',
        confidence: 'emerging',
        followUp: true,
        statement: {
            en: 'New agents may be learning from AI drafts as examples of “how we answer customers.” If this pattern holds, draft quality affects onboarding, not only response speed.',
            zh: '新進客服可能會把 AI 草稿當成「我們通常怎麼回客戶」的範例。如果這個現象成立，草稿品質影響的就不只是回覆速度，也會影響新人如何學會產品與服務語氣。',
        },
        decisions: [],
    },
];

const DECISIONS = [
    {
        id: 'd1',
        label: {
            en: 'Launch check — wrong-suggestion recovery path required before rollout',
            zh: '上線檢查——正式推出前，必須先設計錯誤建議的回報與補救流程',
        },
    },
    {
        id: 'd2',
        label: {
            en: 'PRD — use a simple three-level confidence label instead of a numeric score',
            zh: 'PRD——採用三段式信心標記，不使用容易造成過度信任的數值分數',
        },
    },
    {
        id: 'd3',
        label: {
            en: 'PRD — treat agent edits as tone and context feedback, not only error correction',
            zh: 'PRD——將客服編輯視為語氣與情境回饋，而不只當成錯誤修正',
        },
    },
    {
        id: 'd4',
        label: {
            en: 'Scope decision — prioritize per-ticket assistance and remove session summaries from v1',
            zh: '範圍決策——v1 優先做逐張工單協助，暫時拿掉班次摘要',
        },
    },
    {
        id: 'd5',
        label: {
            en: 'Workflow decision — place support inside the reply editor',
            zh: '流程決策——將 AI 協助放進既有回覆編輯器，而不是新增獨立 dashboard',
        },
    },
];

const insightStats = insight => {
    const notes = ALL_NOTES.filter(note => note.insight === insight.id);
    const people = [...new Set(notes.map(note => note.p))];
    const roles = [...new Set(people.map(p => PARTICIPANTS[p]))];

    return {
        quoteCount: notes.length,
        peopleCount: people.length,
        roleCount: roles.length,
    };
};

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 03 — RESEARCH SYSTEM',
        title: 'UX Research Evidence Hub',
        lead: [
            'This module shows how interview evidence becomes product direction, not just research notes.',
            'The flow connects raw quotes, affinity clusters, synthesized insights, and the product decisions they influenced — including findings that are important but not ready to become decisions yet.',
        ],
        context: 'Scenario: “Meridian” pilot research across two interview rounds. Quotes are simulated; the research workflow is the portfolio artifact.',
        signature: 'Signature interaction: open an insight’s source quotes and the affinity map highlights the notes behind it.',
        method: [
            { label: 'METHOD', value: 'Semi-structured interviews, 45 minutes, remote' },
            { label: 'PARTICIPANTS', value: 'n=8 — 5 support agents, 2 team leads, 1 ops manager' },
            { label: 'RECRUITMENT', value: 'Internal participants with at least 6 months of support experience' },
            { label: 'ANALYSIS', value: 'Open coding → affinity clustering → insight synthesis → decision mapping' },
        ],
        tabs: {
            affinity: 'A · AFFINITY MAP',
            insights: 'B · INSIGHTS',
            trace: 'C · DECISION TRACE',
        },
        feedsInsight: 'supports',
        roundLabel: 'R',
        confidenceRule: 'Confidence level: High = repeated across roles · Medium = repeated by several participants · Emerging = early pattern that needs follow-up',
        confidenceWord: {
            high: 'HIGH',
            medium: 'MEDIUM',
            emerging: 'EMERGING',
        },
        statsLine: s => `${s.peopleCount}/8 participants · ${s.roleCount} ${s.roleCount > 1 ? 'roles' : 'role'} · ${s.quoteCount} quotes`,
        viewQuotes: 'View source quotes',
        followUp: 'Needs follow-up research before it becomes a product decision.',
        insightsCol: 'INSIGHTS',
        decisionsCol: 'PRODUCT DECISIONS',
        informed: 'informed',
        noDecision: 'not yet mapped to a decision',
        backlogNote: 'Insights not mapped to a decision yet — kept in the research backlog:',
    },
    zh: {
        eyebrow: 'MODULE 03 — RESEARCH SYSTEM',
        title: '研究證據庫',
        lead: [
            '這個模組展示訪談資料如何從零散引述，整理成可以影響產品方向的研究洞察。',
            '它把原始引述、親和圖分群、洞察卡與產品決策串在一起，讓讀者看見每個產品判斷背後的使用者證據，也保留那些重要但還不適合立刻變成決策的發現。',
        ],
        context: '情境：「Meridian」試點研究，兩輪訪談。引述為模擬內容；這個作品重點在於研究整理與決策轉譯的方法。',
        signature: '點開洞察的來源引述，親和圖會標示出支持這個洞察的便箋。',
        method: [
            { label: '研究方法', value: '半結構式訪談，45 分鐘，遠端進行' },
            { label: '受訪者', value: 'n=8——5 位客服、2 位團隊主管、1 位營運經理' },
            { label: '招募條件', value: '內部受訪者，皆具備至少 6 個月客服相關經驗' },
            { label: '分析方式', value: '開放編碼 → 親和圖分群 → 洞察整理 → 決策對應' },
        ],
        tabs: {
            affinity: 'A · 親和圖',
            insights: 'B · 洞察卡',
            trace: 'C · 決策追溯',
        },
        feedsInsight: '支持洞察',
        roundLabel: '第',
        confidenceRule: '信心等級：高 = 跨角色重複出現 · 中 = 多位受訪者提及 · 初步 = 早期跡象，仍需後續研究確認',
        confidenceWord: {
            high: '高',
            medium: '中',
            emerging: '初步',
        },
        statsLine: s => `${s.peopleCount}/8 位受訪者 · ${s.roleCount} 種角色 · ${s.quoteCount} 句引述`,
        viewQuotes: '查看來源引述',
        followUp: '這個發現仍需要後續研究確認，暫時不直接轉成產品決策。',
        insightsCol: '研究洞察',
        decisionsCol: '產品決策',
        informed: '影響了',
        noDecision: '尚未對應到產品決策',
        backlogNote: '尚未轉成決策的洞察——先保留在研究 backlog：',
    },
};

// ---- views ----------------------------------------------------------------------
function MethodBar({ t }) {
    return (
        <div className="los-m4-method">
            {t.method.map(cell => (
                <div className="los-m4-method-cell" key={cell.label}>
                    <span className="los-eyebrow los-m4-method-label">
                        {cell.label}
                    </span>
                    <span className="los-m4-method-value">
                        {cell.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

function AffinityView({ t, lang, highlightInsight }) {
    return (
        <div className="los-m4-clusters">
            {CLUSTERS.map(cluster => (
                <section
                    className="los-m4-cluster"
                    key={cluster.id}
                    aria-label={cluster.title[lang]}
                >
                    <h4 className="los-m4-cluster-title">
                        {cluster.title[lang]}
                    </h4>

                    <div className="los-m4-notes">
                        {cluster.notes.map(note => (
                            <div
                                key={note.id}
                                tabIndex="0"
                                className={`los-m4-note${highlightInsight === note.insight ? ' is-related' : ''}`}
                            >
                                <p className="los-m4-note-quote">
                                    “{note.quote[lang]}”
                                </p>

                                <span className="los-data-sm los-m4-note-meta">
                                    {note.p} · {t.roundLabel}{note.round}
                                </span>

                                <span className="los-data-sm los-m4-note-feeds">
                                    → {t.feedsInsight} {note.insight.toUpperCase()}
                                </span>
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
            <p className="los-data-sm los-m4-rule">
                {t.confidenceRule}
            </p>

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
                                <span className="los-data-sm los-m4-insight-id">
                                    {insight.id.toUpperCase()}
                                </span>

                                <span className={`los-data-sm los-m4-conf is-${insight.confidence}`}>
                                    {t.confidenceWord[insight.confidence]}
                                </span>
                            </div>

                            <p className="los-m4-insight-text">
                                {insight.statement[lang]}
                            </p>

                            <p className="los-data-sm los-m4-insight-stats">
                                {t.statsLine(stats)}
                            </p>

                            {insight.followUp && (
                                <p className="los-data-sm los-m4-followup">
                                    {t.followUp}
                                </p>
                            )}

                            <button
                                className="los-data-sm los-m4-quotes-btn"
                                onClick={() => onViewQuotes(insight.id)}
                            >
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

    const registerRef = (id, el) => {
        if (el) itemEls.current.set(id, el);
    };

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
                        from: insight.id,
                        to: decisionId,
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
            (edge.from === hovered && edge.to === id) ||
            (edge.to === hovered && edge.from === id)
        );
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
                    <div
                        className="los-m4-trace-item"
                        key={insight.id}
                        style={{ marginBottom: 12 }}
                    >
                        <span className="los-data-sm los-m4-insight-id">
                            {insight.id.toUpperCase()}
                        </span>

                        <p
                            className="los-m4-insight-text"
                            style={{ margin: '4px 0' }}
                        >
                            {insight.statement[lang]}
                        </p>

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
                    <span className="los-eyebrow">
                        {t.insightsCol}
                    </span>

                    {INSIGHTS.map(insight => (
                        <div
                            key={insight.id}
                            ref={el => registerRef(insight.id, el)}
                            tabIndex="0"
                            className={`los-m4-trace-item${isLinked(insight.id) ? ' is-linked' : ''}${insight.decisions.length === 0 ? ' is-parked' : ''}`}
                            {...hoverProps(insight.id)}
                        >
                            <span className="los-data-sm los-m4-insight-id">
                                {insight.id.toUpperCase()}
                            </span>
                            <p>{insight.statement[lang]}</p>
                        </div>
                    ))}
                </div>

                <div className="los-m4-trace-col">
                    <span className="los-eyebrow">
                        {t.decisionsCol}
                    </span>

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
                {view === 'affinity' && (
                    <AffinityView
                        t={t}
                        lang={lang}
                        highlightInsight={highlightInsight}
                    />
                )}

                {view === 'insights' && (
                    <InsightsView
                        t={t}
                        lang={lang}
                        onViewQuotes={onViewQuotes}
                        animateIn={animateIn}
                    />
                )}

                {view === 'trace' && (
                    <TraceView
                        t={t}
                        lang={lang}
                        viewport={viewport}
                    />
                )}
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