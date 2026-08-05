import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, onActivate } from './shared/ispKit.jsx';
import { MODULES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M07');

// Editorial state machine — colocated data. Card subjects are real companies
// from the public dataset; the workflow state itself is a designed proposal
// (badge: CONCEPT), not a claim about the live platform's internal ops.
const COLUMNS = ['backlog', 'drafted', 'review', 'factcheck', 'published', 'stale'];

const CARDS = [
    { id: 'neura', company: 'Neura Robotics', col: 'backlog', run: null, days: null,
        note: { en: 'New funding round detected — queued for a first pass.', zh: '偵測到新一輪募資——排入初稿佇列。' } },
    { id: 'h2pro', company: 'H2Pro', col: 'backlog', run: null, days: null,
        note: { en: 'Sector re-scan flagged a moat claim worth re-checking.', zh: '產業重掃描標出一個值得重查的護城河主張。' } },
    { id: 'skild', company: 'Skild AI', col: 'drafted', run: 'run-2418', days: 1,
        note: { en: 'Agent draft v1 complete — awaiting human review.', zh: 'Agent 草稿 v1 完成——等待人工審核。' } },
    { id: 'antora', company: 'Antora Energy', col: 'drafted', run: 'run-2422', days: 1,
        note: { en: 'Agent draft v2 — v1 was returned by the evidence gate.', zh: 'Agent 草稿 v2——v1 曾被證據閘門退回。' } },
    { id: 'figure', company: 'Figure AI', col: 'review', run: 'run-2401', days: 3,
        note: { en: 'Reviewer is tightening the verdict — see diff.', zh: '審稿人正在收緊判斷段落——見 diff。' },
        diff: {
            en: { before: 'Figure AI is a strong bet on humanoid robots.', after: 'A flagship bet on humanoid robots with elite founder and capital backing, but priced for perfection and highly sensitive to real-world reliability and labor-replacement economics.' },
            zh: { before: 'Figure AI 是人形機器人領域的強力賭注。', after: '一個由頂尖創辦人與資本背書的人形機器人旗艦賭注，但估值已定價到接近完美，對真實世界的可靠度與勞動替代經濟學高度敏感。' },
        } },
    { id: 'crispr', company: 'CRISPR Therapeutics', col: 'factcheck', run: 'run-2390', days: 5,
        note: { en: 'Verifying CASGEVY commercial figures against the 10-K.', zh: '正對照 10-K 查核 CASGEVY 商業化數字。' } },
    { id: 'cognition', company: 'Cognition AI', col: 'published', run: 'run-2350', days: 2,
        note: { en: 'Published — fresh, no open signals.', zh: '已發佈——新鮮，無未結訊號。' } },
    { id: 'lightmatter', company: 'Lightmatter', col: 'published', run: 'run-2288', days: 8,
        note: { en: 'Published — within the freshness window.', zh: '已發佈——仍在鮮度窗口內。' } },
    { id: 'altos', company: 'Altos Labs', col: 'stale', run: 'run-2140', days: 34,
        note: { en: '34 days since last touch; a new reprogramming round was reported — due for rewrite.', zh: '34 天未更新；已有新一輪重編程募資報導——應排入重寫。' } },
];

const COL_META = {
    backlog:   { en: 'BACKLOG', zh: '待辦', tone: 'var(--isp-text-3)' },
    drafted:   { en: 'AGENT-DRAFTED', zh: 'AI 已草擬', tone: 'var(--isp-amber)' },
    review:    { en: 'HUMAN-REVIEW', zh: '人工審核', tone: 'var(--isp-sky)' },
    factcheck: { en: 'FACT-CHECK', zh: '事實查核', tone: 'var(--isp-iris)' },
    published: { en: 'PUBLISHED', zh: '已發佈', tone: 'var(--isp-teal)' },
    stale:     { en: 'STALE', zh: '已過期', tone: 'var(--isp-red)' },
};

const COPY = {
    en: {
        title: 'AI draft review workspace',
        lead: 'Module 06 produces the draft; this module manages it. The workspace divides an AI content item’s lifecycle into six states—backlog, agent-drafted, human review, fact check, published, and stale—while retaining human edit diffs, source traceability, and freshness reminders. This is the layer AI content systems most often overlook, yet it determines whether they can be maintained over time. Select any card to see its current status, related sources, and human reviewer edits. For example, the Figure AI card retains a complete record of the draft and its human revisions.',
        stateFlow: 'BACKLOG → AGENT-DRAFTED → HUMAN-REVIEW → FACT-CHECK → PUBLISHED → STALE → BACK TO BACKLOG',
        diffBefore: 'Agent draft', diffAfter: 'Reviewer revision',
        staleQueue: n => `${n} content ${n === 1 ? 'item has' : 'items have'} exceeded the update threshold and await renewed fact-checking and revision.`,
        soWhat: 'AI-generated drafts are only the starting point. A content system that truly scales must let every draft be reviewed, traced, published, and returned to backlog when it becomes stale.',
    },
    zh: {
        title: 'AI 草稿審查工作台',
        lead: 'Module 06 負責產生草稿，這個模組則負責讓草稿被管理。工作台將 AI 內容的生命週期拆成待辦、已草擬、人工審核、事實查核、已發布與已過期六種狀態，並保留人工修改差異、來源追溯與鮮度提醒。這是 AI 內容系統最容易被忽略，卻決定它能否長期維護的一層。點選任一卡片，可查看草稿目前的狀態、相關來源，以及人類審稿人之間的修改差異。例如 Figure AI 卡片保留完整的草稿與人工修訂紀錄。',
        stateFlow: 'BACKLOG → AGENT-DRAFTED → HUMAN-REVIEW → FACT-CHECK → PUBLISHED → STALE → 回到 BACKLOG',
        diffBefore: 'Agent 草稿', diffAfter: '審稿人修訂',
        staleQueue: n => `${n} 筆內容已超過更新門檻，等待重新查核與改寫。`,
        soWhat: 'AI 生成草稿只是起點。真正可規模化的內容系統，必須讓每一筆草稿都能被審查、追溯、發布，也能在失效時回到待辦。',
    },
};

export default function M07_EditorialOps() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [selected, setSelected] = useState(null);
    const staleCount = CARDS.filter(c => c.col === 'stale').length;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <p className="isp-mono isp-m7-flow">{t.stateFlow}</p>

            <div className="isp-m7-board">
                {COLUMNS.map(col => {
                    const meta = COL_META[col];
                    const cards = CARDS.filter(c => c.col === col);
                    return (
                        <div className="isp-m7-col" key={col}>
                            <div className="isp-m7-col-head" style={{ '--isp-cm': meta.tone }}>
                                <span>{lang === 'zh' ? meta.zh : meta.en}</span>
                                <span className="isp-m7-col-count">{cards.length}</span>
                            </div>
                            <div className="isp-m7-col-body">
                                {cards.map(c => (
                                    <button key={c.id}
                                        className={`isp-m7-card${selected === c.id ? ' is-on' : ''}${col === 'stale' ? ' is-stale' : ''}`}
                                        onClick={() => setSelected(selected === c.id ? null : c.id)}
                                        onKeyDown={onActivate(() => setSelected(selected === c.id ? null : c.id))}>
                                        <strong>{c.company}</strong>
                                        {c.run && <span className="isp-m7-card-run">{c.run}{c.days != null ? ` · ${c.days}d` : ''}</span>}
                                    </button>
                                ))}
                                {!cards.length && <span className="isp-m7-col-empty">—</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selected && (() => {
                const c = CARDS.find(x => x.id === selected);
                const note = c.note[lang] ?? c.note.en;
                const diff = c.diff ? (c.diff[lang] ?? c.diff.en) : null;
                return (
                    <div className="isp-m7-detail" aria-live="polite">
                        <div className="isp-m7-detail-head">
                            <strong>{c.company}</strong>
                            {c.run && <span className="isp-mono">{c.run}</span>}
                        </div>
                        <p>{note}</p>
                        {diff && (
                            <div className="isp-m7-diff">
                                <div className="isp-m7-diff-row isp-m7-diff-before"><span>{t.diffBefore}</span><p>{diff.before}</p></div>
                                <div className="isp-m7-diff-row isp-m7-diff-after"><span>{t.diffAfter}</span><p>{diff.after}</p></div>
                            </div>
                        )}
                    </div>
                );
            })()}

            <div className="isp-m7-stale-banner">
                <span className="isp-tag isp-tag--red">{t.staleQueue(staleCount)}</span>
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m7-style', `
.isp-m7-flow { font-size: 11px; color: var(--isp-text-3); margin: 0 0 18px; overflow-x: auto; white-space: nowrap; }
.isp-m7-board { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; overflow-x: auto; }
.isp-m7-col { display: flex; flex-direction: column; gap: 8px; min-width: 130px; }
.isp-m7-col-head { display: flex; align-items: center; justify-content: space-between; gap: 6px; padding: 6px 8px; border-bottom: 2px solid var(--isp-cm); font-family: var(--isp-font-data); font-size: 9.5px; letter-spacing: 0.06em; color: var(--isp-cm); }
.isp-m7-col-count { font-size: 10px; color: var(--isp-text-3); }
.isp-m7-col-body { display: flex; flex-direction: column; gap: 6px; min-height: 40px; }
.isp-m7-col-empty { font-size: 11px; color: var(--isp-text-3); padding: 6px 2px; }
.isp-m7-card { display: flex; flex-direction: column; gap: 4px; padding: 9px 10px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-2); border-radius: var(--isp-r-sm); text-align: left; transition: border-color 160ms var(--isp-ease); }
.isp-m7-card:hover { border-color: var(--isp-teal); }
.isp-m7-card.is-on { border-color: var(--isp-teal); background: var(--isp-teal-dim); }
.isp-m7-card.is-stale { border-color: var(--isp-red); }
.isp-m7-card strong { font-size: 12px; color: var(--isp-text-1); font-weight: 600; line-height: 1.3; }
.isp-m7-card-run { font-family: var(--isp-font-data); font-size: 10px; color: var(--isp-text-3); }
@media (max-width: 900px) { .isp-m7-board { grid-template-columns: repeat(6, 150px); } }

.isp-m7-detail { margin-top: 18px; padding: 14px 16px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); }
.isp-m7-detail-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
.isp-m7-detail-head strong { color: var(--isp-text-1); font-size: 13.5px; }
.isp-m7-detail-head .isp-mono { font-size: 11px; color: var(--isp-text-3); }
.isp-m7-detail > p { margin: 0; font-size: 13px; color: var(--isp-text-2); }
.isp-m7-diff { display: grid; gap: 8px; margin-top: 12px; }
.isp-m7-diff-row { display: grid; grid-template-columns: 90px 1fr; gap: 10px; padding: 8px 10px; border-radius: var(--isp-r-sm); }
.isp-m7-diff-row span { font-family: var(--isp-font-data); font-size: 10px; color: var(--isp-text-3); }
.isp-m7-diff-row p { margin: 0; font-size: 13px; line-height: 1.55; }
.isp-m7-diff-before { background: var(--isp-red-dim); }
.isp-m7-diff-before p { color: var(--isp-text-2); text-decoration: line-through; text-decoration-color: var(--isp-red); }
.isp-m7-diff-after { background: var(--isp-teal-dim); }
.isp-m7-diff-after p { color: var(--isp-text-1); }
.isp-m7-stale-banner { margin-top: 16px; }
`);
