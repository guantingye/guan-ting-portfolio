import React from 'react';
import SectionModule, { useI18n, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';

const MOD = MODULES.find(m => m.key === 'M09');

const COPY = {
    en: {
        title: 'Algorithm decision record',
        lead: 'Model choice as a written, costed decision — with the rejected options kept.',
        soWhat: 'Model choice is a written, costed decision, not a default.',
        context: 'Context',
        contextBody: 'No users yet, heterogeneous inputs (one 1–7 scale, one categorical preference, one number, one boolean), and a reviewer who must be able to see why a name rose. The model has to rank, stay legible, and survive a cold start.',
        optionsLabel: 'Options',
        options: [
            { name: 'Weighted additive score', verdict: 'chosen', note: 'Each criterion adds a fixed weight; ranks cleanly, reads out loud, and needs no training data.' },
            { name: 'Cosine similarity', verdict: 'rejected', note: 'The inputs are not a shared vector space — direction between a boolean and a fee has no meaning.' },
            { name: 'Hard filters only', verdict: 'rejected', note: 'All-or-nothing filtering cannot rank, and empties the result set when constraints stack.' },
            { name: 'Learned ranking / kNN', verdict: 'deferred', note: 'Cold start — there is no selection history to learn from yet. Revisited in M16.' },
        ],
        decisionLabel: 'Decision',
        decision: 'Ship the weighted additive score. It is the simplest model that ranks, explains itself, and works with zero data.',
        consequenceLabel: 'Consequences',
        consequences: [
            'The four weights are hand-set and must be defended (M8) and audited (M14).',
            'Ties are possible and are handled explicitly rather than hidden (M12).',
            'Every selection is logged as the training signal a future learned model would need.',
        ],
        principleTag: 'PRINCIPLE',
        principle: 'Recommendation ≠ mandate. The top match is marked, but every option stays selectable and the person chooses freely. That protects autonomy, measures H1, and feeds the data flywheel at the same time.',
    },
    zh: {
        title: '演算法決策紀錄',
        lead: '把模型選擇寫成一個有成本的決策——並保留被拒的選項。',
        soWhat: '模型選擇是一個寫下來、算過成本的決策，而非預設值。',
        context: '脈絡',
        contextBody: '尚無使用者、輸入異質（一個 1–7 量表、一個類別偏好、一個數字、一個布林），而審查者必須看得見某個名字為何上升。模型必須能排序、保持可讀，並撐過冷啟動。',
        optionsLabel: '選項',
        options: [
            { name: '加權加總評分', verdict: 'chosen', note: '每個準則加上固定權重；排序乾淨、可以唸出來，且不需要訓練資料。' },
            { name: '餘弦相似度', verdict: 'rejected', note: '輸入並非共同向量空間——布林與費用之間的「方向」沒有意義。' },
            { name: '純硬性過濾', verdict: 'rejected', note: '全有全無的過濾無法排序，且條件疊加時會清空結果集。' },
            { name: '學習式排序／kNN', verdict: 'deferred', note: '冷啟動——目前沒有選擇歷史可學。於 M16 再議。' },
        ],
        decisionLabel: '決策',
        decision: '交付加權加總評分。它是能排序、能自我解釋、且在零資料下也能運作的最簡單模型。',
        consequenceLabel: '後果',
        consequences: [
            '四個權重是手動設定，必須被辯護（M8）並稽核（M14）。',
            '平手是可能的，被明確處理而非隱藏（M12）。',
            '每一次選擇都被記錄為未來學習式模型所需的訓練訊號。',
        ],
        principleTag: '原則',
        principle: '推薦 ≠ 指派。最佳媒合會被標示，但所有選項保持可選，由使用者自由選擇。這同時保護自主性、量測 H1，並餵養資料飛輪。',
    },
};

const VERDICT = { chosen: 'pm-tag--teal', rejected: 'pm-tag--red', deferred: 'pm-tag--amber' };

export default function M09_DecisionRecord() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="pm-adr">
                <div className="pm-adr-block">
                    <span className="pm-adr-k">{c.context}</span>
                    <p>{c.contextBody}</p>
                </div>
                <div className="pm-adr-block">
                    <span className="pm-adr-k">{c.optionsLabel}</span>
                    <ul className="pm-adr-options">
                        {c.options.map(o => (
                            <li key={o.name}>
                                <div className="pm-adr-opt-head">
                                    <strong>{o.name}</strong>
                                    <span className={`pm-tag ${VERDICT[o.verdict]}`}>{o.verdict}</span>
                                </div>
                                <p>{o.note}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pm-adr-row">
                    <div className="pm-adr-block">
                        <span className="pm-adr-k">{c.decisionLabel}</span>
                        <p className="pm-adr-decision">{c.decision}</p>
                    </div>
                    <div className="pm-adr-block">
                        <span className="pm-adr-k">{c.consequenceLabel}</span>
                        <ul className="pm-adr-cons">{c.consequences.map((x, i) => <li key={i}>{x}</li>)}</ul>
                    </div>
                </div>
                <p className="pm-adr-principle">
                    <span className="pm-tag pm-tag--teal">{c.principleTag}</span>{c.principle}
                </p>
            </div>
        </SectionModule>
    );
}

injectStyles('pm-m9', `
.pm-adr { display: flex; flex-direction: column; gap: 18px; }
.pm-adr-block .pm-adr-k { font-family: var(--pm-font-data); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pm-teal); display: block; margin-bottom: 8px; }
.pm-adr-block p { margin: 0; font-size: 14px; line-height: 1.6; color: var(--pm-text-2); }
.pm-adr-options { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.pm-adr-options li { padding: 13px 15px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); background: var(--pm-bg-2); }
.pm-adr-opt-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
.pm-adr-opt-head strong { color: var(--pm-text-1); font-size: 14px; }
.pm-adr-opt-head .pm-tag { text-transform: uppercase; }
.pm-adr-options p { font-size: 12.5px; line-height: 1.5; color: var(--pm-text-3); }
.pm-adr-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.pm-adr-decision { font-family: var(--pm-font-display); font-size: 16px; color: var(--pm-text-1); font-style: italic; }
.pm-adr-cons { margin: 0; padding-left: 18px; font-size: 13.5px; line-height: 1.55; color: var(--pm-text-2); }
.pm-adr-cons li { margin-bottom: 5px; }
.pm-adr-principle { margin: 0; padding: 14px 16px; border-left: 2px solid var(--pm-teal); background: var(--pm-bg-2); border-radius: 0 var(--pm-r-sm) var(--pm-r-sm) 0; font-size: 14px; line-height: 1.6; color: var(--pm-text-1); }
.pm-adr-principle .pm-tag { margin-right: 8px; }
@media (max-width: 720px) { .pm-adr-options, .pm-adr-row { grid-template-columns: 1fr; } }
`);
