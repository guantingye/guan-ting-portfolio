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
            en: 'One visible mistake can change how people use it afterward',
            zh: '一次明顯錯誤，可能改變後續使用方式',
        },
        notes: [
            {
                id: 'n1',
                p: 'P2',
                round: 1,
                insight: 'i1',
                quote: {
                    en: 'Once it cited an outdated refund policy. Since then, I double-check nearly every number.',
                    zh: '有一次它引用了舊的退款規則。從那之後，我幾乎每個數字都會再確認一次。',
                },
            },
            {
                id: 'n2',
                p: 'P6',
                round: 1,
                insight: 'i1',
                quote: {
                    en: 'At first I thought it was impressive. Then it made up a plan name that did not exist, and I no longer felt comfortable trusting it directly.',
                    zh: '一開始我覺得它很厲害，後來它編出一個不存在的方案名稱，我就不太敢直接相信了。',
                },
            },
            {
                id: 'n3',
                p: 'P3',
                round: 2,
                insight: 'i1',
                quote: {
                    en: 'People remember drafts that go wrong. Good drafts, by contrast, quickly become routine and are rarely mentioned.',
                    zh: '大家會記得出錯的草稿。好的草稿反而很快就被當成例行工作，不太會特別提起。',
                },
            },
            {
                id: 'n4',
                p: 'P5',
                round: 2,
                insight: 'i1',
                quote: {
                    en: 'If an incorrect reply actually goes to an enterprise customer, I am still the one who has to explain it.',
                    zh: '如果錯誤回覆真的送到企業客戶那邊，最後需要出面解釋的人還是我。',
                },
            },
            {
                id: 'n5',
                p: 'P8',
                round: 1,
                insight: 'i1',
                quote: {
                    en: 'I usually trust it on password issues, but when it comes to billing, I slow down and check again.',
                    zh: '密碼類問題我通常會相信，但遇到帳務問題，就會放慢速度重新確認。',
                },
            },
            {
                id: 'n6',
                p: 'P7',
                round: 2,
                insight: 'i1',
                quote: {
                    en: 'The second rollout was harder than the first, because it was no longer about introducing a new feature; it was about rebuilding trust.',
                    zh: '第二次推行比第一次更困難，因為那已經不是介紹新功能，而是重新建立信任。',
                },
            },
        ],
    },
    {
        id: 'c2',
        title: {
            en: 'Efficiency has value, but agents still want to retain their voice and judgment',
            zh: '效率有價值，但客服仍想保有語氣與判斷權',
        },
        notes: [
            {
                id: 'n7',
                p: 'P1',
                round: 1,
                insight: 'i2',
                quote: {
                    en: 'Speed is not all there is to this job. Customers still need to feel that someone truly understands them.',
                    zh: '速度不是這份工作的全部。客戶還是需要感覺到有人真的理解他。',
                },
            },
            {
                id: 'n8',
                p: 'P4',
                round: 2,
                insight: 'i2',
                quote: {
                    en: 'I rewrite the opening almost every time because it sounds too much like a template.',
                    zh: '開頭我幾乎每次都會重寫，因為它聽起來太像制式回覆。',
                },
            },
            {
                id: 'n9',
                p: 'P2',
                round: 2,
                insight: 'i2',
                quote: {
                    en: 'If I send it directly and the content is wrong, customers will not blame the tool; they will still come to me.',
                    zh: '如果我直接送出，結果內容有錯，客戶不會怪工具，最後還是會找我。',
                },
            },
            {
                id: 'n10',
                p: 'P6',
                round: 2,
                insight: 'i2',
                quote: {
                    en: 'The draft is broadly usable, but for customers with stronger emotions, merely “okay” is usually not enough.',
                    zh: '草稿大致可用，但遇到情緒比較強烈的客戶，只是「還可以」通常不夠。',
                },
            },
        ],
    },
    {
        id: 'c3',
        title: {
            en: 'Assistance must appear inside the existing workflow',
            zh: '協助必須出現在既有工作流程裡',
        },
        notes: [
            {
                id: 'n11',
                p: 'P8',
                round: 2,
                insight: 'i3',
                quote: {
                    en: 'I do not separately decide which ticket to handle next; the system sends tickets to me in sequence.',
                    zh: '我不是另外決定下一張要處理什麼，而是系統依序把工單送到我面前。',
                },
            },
            {
                id: 'n12',
                p: 'P3',
                round: 1,
                insight: 'i3',
                quote: {
                    en: 'A shift summary is nice, but it does not help the person handling the ticket in front of them.',
                    zh: '班次摘要不錯，但它幫不了正在眼前處理這張工單的人。',
                },
            },
            {
                id: 'n13',
                p: 'P1',
                round: 2,
                insight: 'i3',
                quote: {
                    en: 'After handling dozens of tickets, I am not going to open another dashboard. What I need is help that appears directly in the reply flow.',
                    zh: '處理了幾十張工單之後，我不會再開另一個儀表板。我需要的是直接出現在回覆流程裡的協助。',
                },
            },
            {
                id: 'n14',
                p: 'P5',
                round: 1,
                insight: 'i3',
                quote: {
                    en: 'Routing rules are an organization-level decision; agents simply handle what has been assigned to their queue.',
                    zh: '派單規則是公司層級的決定，客服只是處理分配到自己佇列裡的內容。',
                },
            },
        ],
    },
    {
        id: 'c4',
        title: {
            en: 'When knowledge documents fail, teams create informal workarounds',
            zh: '知識文件失效後，團隊會建立非正式替代方式',
        },
        notes: [
            {
                id: 'n15',
                p: 'P4',
                round: 1,
                insight: 'i4',
                quote: {
                    en: 'That article has had problems for months. Now everyone knows not to reply according to it.',
                    zh: '那篇文章幾個月前就有問題了。現在大家都知道不要照著它回覆。',
                },
            },
            {
                id: 'n16',
                p: 'P7',
                round: 1,
                insight: 'i4',
                quote: {
                    en: 'I asked the documentation team to fix the same page several times, and eventually stopped reporting it.',
                    zh: '同一頁我請文件團隊修過幾次，後來就不再回報了。',
                },
            },
            {
                id: 'n17',
                p: 'P6',
                round: 2,
                insight: 'i4',
                quote: {
                    en: 'I answer directly from memory because searching our own documents is slower instead.',
                    zh: '我會直接憑記憶回答，因為搜尋自己的文件反而更慢。',
                },
            },
            {
                id: 'n18',
                p: 'P2',
                round: 1,
                insight: 'i5',
                quote: {
                    en: 'When a new agent asks why the documentation says something different, I simply remind them not to look at that article for that situation.',
                    zh: '新人問為什麼文件寫得不一樣時，我只會提醒他，那種情況不要看那一篇。',
                },
            },
            {
                id: 'n19',
                p: 'P3',
                round: 2,
                insight: 'i5',
                quote: {
                    en: 'New support agents sometimes treat AI drafts as standard examples and watch how senior colleagues usually reply.',
                    zh: '新進客服有時會把 AI 草稿當成標準範例，觀察資深同事平常怎麼回覆。',
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
            en: 'Trust in AI is often shaped by a small number of major errors rather than overall average performance. One obvious error can cause users to recheck every future suggestion.',
            zh: '客服對 AI 的信任，往往受到少數重大錯誤影響，而不是由整體平均表現決定。一次明顯的錯誤，就可能讓使用者之後重新檢查每一則建議。',
        },
        decisions: ['d1', 'd2'],
    },
    {
        id: 'i2',
        confidence: 'medium',
        statement: {
            en: 'When agents edit AI drafts, it does not necessarily mean the suggestion failed. If a draft shortens the time needed to begin writing while preserving the agent’s own voice and sense of responsibility, adoption after editing is still a valuable usage outcome.',
            zh: '客服修改 AI 草稿，不一定代表建議失敗。只要草稿能縮短起稿時間，同時保留客服自己的語氣與責任感，修改後採用仍然是具有價值的使用結果。',
        },
        decisions: ['d3'],
    },
    {
        id: 'i3',
        confidence: 'medium',
        statement: {
            en: 'Support work is driven by the ticket queue, so AI assistance should appear directly in the current ticket and reply interface rather than requiring users to open a separate summary or analytics tool.',
            zh: '客服工作由工單佇列推動，因此 AI 協助應直接出現在當前工單與回覆介面中，而不是要求使用者額外開啟另一套摘要或分析工具。',
        },
        decisions: ['d4', 'd5'],
    },
    {
        id: 'i4',
        confidence: 'medium',
        statement: {
            en: 'Outdated or contradictory knowledge documents force agents to rely on memory, colleague experience, and informal workarounds. These substitute processes make the problem harder to see and increase the cost of onboarding new staff and keeping replies consistent.',
            zh: '過期或互相矛盾的知識文件，會迫使客服依賴記憶、同事經驗與非正式處理方式。這些替代流程讓問題難以被看見，也增加新進人員學習與一致回覆的成本。',
        },
        decisions: [],
    },
    {
        id: 'i5',
        confidence: 'emerging',
        followUp: true,
        statement: {
            en: 'New support agents may treat AI drafts as “standard answers,” learning product knowledge and service tone from them. If this behavior exists, draft quality affects not only individual replies but may also influence how new agents work afterward.',
            zh: '新進客服可能把 AI 草稿視為「標準答案」，進而從中學習產品知識與服務語氣。如果這項行為確實存在，草稿品質影響的就不只是單次回覆，也可能影響新人後續的工作方式。',
        },
        decisions: [],
    },
];

const DECISIONS = [
    {
        id: 'd1',
        label: {
            en: 'Launch requirement | Before formal release, establish reporting, human handoff, and remediation flows for incorrect suggestions.',
            zh: '上線條件｜正式推出前，必須建立錯誤建議的回報、人工接手與補救流程。',
        },
    },
    {
        id: 'd2',
        label: {
            en: 'Interface specification | Use high / medium / low three-level confidence labels; do not show precise numeric scores that can encourage over-trust.',
            zh: '介面規格｜採用高 / 中 / 低三段式信心標籤，不呈現容易造成過度信任的精確數值分數。',
        },
    },
    {
        id: 'd3',
        label: {
            en: 'Success definition | Track “as-is adoption” and “adoption after editing” separately; as long as a draft shortens writing time while preserving agent judgment, adoption after editing still counts as effective use.',
            zh: '成效定義｜將「原文採用」與「修改後採用」分開追蹤；只要草稿縮短起稿時間並保留客服判斷，修改後採用仍計入有效使用。',
        },
    },
    {
        id: 'd4',
        label: {
            en: 'Scope decision | The first version prioritizes reply assistance for the current ticket and does not treat shift summaries as a core capability.',
            zh: '範圍決策｜第一版優先提供當前工單的回覆協助，暫不將班次摘要列為核心功能。',
        },
    },
    {
        id: 'd5',
        label: {
            en: 'Workflow design | Embed AI suggestions in the existing reply editor instead of adding a separate dashboard.',
            zh: '流程設計｜將 AI 建議嵌入既有回覆編輯器，不另外新增獨立儀表板。',
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
        eyebrow: 'MODULE 03 — RESEARCH EVIDENCE SYSTEM',
        title: 'UX Research Evidence Hub',
        lead: [
            'This module shows how interview data moves from scattered quotes into research insights and design decisions that product teams can adopt. Raw quotes are first organized into affinity clusters, then synthesized into insight cards with confidence levels and source evidence, before being connected to actual product decisions.',
            'Readers see not only the conclusions, but can trace each judgment back to the participants, contexts, and original quotes that support it.',
        ],
        context: 'Scenario: This module continues the Meridian support-reply assistant. It simulates two rounds of internal interviews; all quotes and research materials are for demonstration purposes, with the focus on showing how research evidence is organized, evaluated, and translated into product decisions.',
        signature: 'Signature interaction: open an insight’s source quotes and the affinity map highlights the notes behind it.',
        method: [
            { label: 'METHOD', value: 'Semi-structured interviews, 45 minutes, remote' },
            { label: 'PARTICIPANTS', value: '8 internal participants: 5 support agents, 2 support leads, 1 operations manager' },
            { label: 'RECRUITMENT', value: 'Internal participants with at least 6 months of support experience' },
            { label: 'ANALYSIS', value: 'Open coding → affinity clustering → insight synthesis → decision mapping' },
        ],
        tabs: {
            affinity: 'A · SOURCE QUOTES & AFFINITY MAP',
            insights: 'B · RESEARCH INSIGHT CARDS',
            trace: 'C · INSIGHT & DECISION TRACE',
        },
        feedsInsight: 'supports',
        roundLabel: 'R',
        confidenceRule: 'Confidence level: High = repeated across multiple participants and roles, with multiple supporting quotes · Medium = mentioned by multiple participants, but mainly concentrated in specific roles or contexts · Emerging = limited evidence so far and needs confirmation through further research',
        confidenceWord: {
            high: 'HIGH',
            medium: 'MEDIUM',
            emerging: 'EMERGING',
        },
        statsLine: s => `${s.peopleCount}/8 participants · ${s.roleCount} ${s.roleCount > 1 ? 'roles' : 'role'} · ${s.quoteCount} quotes`,
        viewQuotes: 'View source quotes',
        followUp: 'Evidence is still limited, so it is not being directly converted into a product decision yet.',
        insightsCol: 'INSIGHTS',
        decisionsCol: 'PRODUCT DECISIONS',
        informed: 'informed',
        noDecision: 'not yet mapped to a decision',
        backlogNote: ids => `Unvalidated insights | ${ids} remain in the research backlog until evidence is sufficient to assess whether they should become product decisions.`,
    },
    zh: {
        eyebrow: 'MODULE 03 — RESEARCH EVIDENCE SYSTEM',
        title: '研究證據庫',
        lead: [
            '這個模組呈現訪談資料如何從零散引述，逐步整理成可供產品團隊採用的研究洞察與設計決策。原始引述先依主題整理成親和圖，再彙整為附有信心等級與來源證據的洞察卡，最後連結到實際產品決策。',
            '讀者不只看見結論，也能回查每項判斷由哪些受訪者、情境與原始引述支持。',
        ],
        context: '案例情境：本模組延續 Meridian 客服回覆輔助工具，模擬兩輪內部訪談；引述與研究資料皆為展示用途，重點在於呈現研究證據如何被整理、評估並轉化為產品決策。',
        signature: '點開洞察的來源引述，親和圖會標示出支持這個洞察的便箋。',
        method: [
            { label: '研究方法', value: '半結構式訪談，45 分鐘，遠端進行' },
            { label: '受訪者', value: '8 位內部受訪者：5 位客服人員、2 位客服主管、1 位營運經理' },
            { label: '招募條件', value: '內部受訪者，皆具備至少 6 個月客服相關經驗' },
            { label: '分析方式', value: '開放編碼 → 親和圖分群 → 洞察整理 → 決策對應' },
        ],
        tabs: {
            affinity: 'A · 原始引述與親和圖',
            insights: 'B · 研究洞察卡',
            trace: 'C · 洞察與決策追蹤',
        },
        feedsInsight: '支持洞察',
        roundLabel: '第',
        confidenceRule: '信心水準：高 = 在多位受訪者與不同角色中重複出現，且有多則引述支持 · 中 = 由多位受訪者提及，但主要集中於特定角色或情境 · 初步 = 目前僅有少量證據，需透過後續研究確認',
        confidenceWord: {
            high: '高',
            medium: '中',
            emerging: '初步',
        },
        statsLine: s => `${s.peopleCount}/8 位受訪者 · ${s.roleCount} 種角色 · ${s.quoteCount} 句引述`,
        viewQuotes: '查看來源引述',
        followUp: '目前證據仍有限，暫不直接轉為產品決策。',
        insightsCol: '研究洞察',
        decisionsCol: '產品決策',
        informed: '影響了',
        noDecision: '尚未對應到產品決策',
        backlogNote: ids => `尚待驗證的洞察｜${ids} 暫留於研究待辦，待補足證據後再評估是否轉為產品決策。`,
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
    const backlogIds = backlog.map(item => item.id.toUpperCase()).join(lang === 'zh' ? '、' : ', ');

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
                    {t.backlogNote(backlogIds)}
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
                {t.backlogNote(backlogIds)}
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
