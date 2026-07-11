import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/dsKit.jsx';
import { MODULES } from './data/dsContent.js';

const MOD = MODULES.find(m => m.key === 'M09');

const STAR = { en: 'The number of analyst decisions improved every week — briefs that lead to a correct go / no-go call.', zh: '每週被改善的分析師決策數——能導向正確 go / no-go 判斷的 brief。' };
const INPUTS = [
    { name: { en: 'Coverage', zh: '覆蓋率' }, body: { en: 'Share of scouted entities with a usable brief.', zh: '有可用 brief 的偵搜對象佔比。' } },
    { name: { en: 'Signal-to-noise', zh: '訊噪比' }, body: { en: 'Confirmed signal per unit of raw source volume.', zh: '每單位原始來源量中，經確認的訊號比例。' } },
    { name: { en: 'Time-to-brief', zh: 'Time-to-brief' }, body: { en: 'Minutes from query to a decision-ready brief.', zh: '從查詢到產出可決策 brief，中間花的分鐘數。' } },
    { name: { en: 'Brief adoption rate', zh: 'Brief 採用率' }, body: { en: 'Share of briefs an analyst acts on.', zh: '分析師實際據以行動的 brief 佔比。' } },
];
const GUARDS = [
    { name: { en: 'False-positive rate', zh: '誤判率' }, body: { en: 'Confident claims that turn out wrong.', zh: '看似有把握、結果卻是錯的斷言。' } },
    { name: { en: 'Source freshness', zh: '來源時效' }, body: { en: 'Age of the data behind each field.', zh: '每個欄位背後資料的新舊程度。' } },
    { name: { en: 'Unverified-honesty rate', zh: '未驗證誠實率' }, body: { en: 'Share of truly uncertain fields correctly flagged as such.', zh: '真正不確定的欄位，有沒有被老實標成未驗證。' } },
];

const COPY = {
    en: {
        title: 'Metric tree',
        lead: 'One north star, four input metrics that move it, three guardrail metrics that keep the product honest while it moves. Click any metric to read what it means.',
        inputLabel: 'INPUT — moves the star',
        guardLabel: 'GUARDRAIL — keeps it honest',
        expLabel: 'Experiment design',
        expBody: 'The shipped experiment module live-computes sample size and duration from an MDE slider, then plots a 95% confidence-interval effect alongside guardrail metrics built to catch quiet over-trust or fabrication-acceptance — not just whether the headline number moved.',
        soWhat: 'A north star without guardrail metrics can be gamed by an AI product; DeepScout\'s guardrails are metrics for the ways the product could quietly hurt, not just help.',
    },
    zh: {
        title: '北極星與護欄',
        lead: '一個北極星，四個推動它的 input 指標，三個在推動過程中守住誠實的 guardrail 指標。點任一指標閱讀它的定義。',
        inputLabel: 'INPUT——推動北極星',
        guardLabel: 'GUARDRAIL——守住誠實',
        expLabel: '實驗設計',
        expBody: '上線的實驗模組會用 MDE 滑桿即時算出樣本數與所需天數，再畫出 95% 信賴區間的效果圖，同時搭配專門抓「悄悄過度信任」或「接受捏造內容」的護欄指標——不只是看主指標有沒有動。',
        soWhat: '沒有護欄指標的北極星，AI 產品是能被操弄的；DeepScout 的護欄指標，量的是產品可能悄悄造成傷害的地方，不只是它有幫助的地方。',
    },
};

export default function M09_MetricTree() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState(INPUTS[0]);

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ds-m09-star">
                <span className="ds-eyebrow" style={{ color: 'var(--ds-text-1)' }}>NORTH STAR</span>
                <p>{STAR[lang] ?? STAR.en}</p>
            </div>
            <div className="ds-m09-tree">
                <div className="ds-m09-col">
                    <span className="ds-eyebrow" style={{ color: 'var(--ds-teal)' }}>{t.inputLabel}</span>
                    <div className="ds-m09-items">
                        {INPUTS.map(m => (
                            <button key={m.name.en} className={`ds-m09-item ds-m09-item--teal${active === m ? ' is-on' : ''}`} onClick={() => setActive(m)}>
                                {m.name[lang] ?? m.name.en}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="ds-m09-col">
                    <span className="ds-eyebrow" style={{ color: 'var(--ds-amber)' }}>{t.guardLabel}</span>
                    <div className="ds-m09-items">
                        {GUARDS.map(m => (
                            <button key={m.name.en} className={`ds-m09-item ds-m09-item--amber${active === m ? ' is-on' : ''}`} onClick={() => setActive(m)}>
                                {m.name[lang] ?? m.name.en}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ds-m09-detail">
                <span className="ds-m09-detail-name">{active.name[lang] ?? active.name.en}</span>
                <p>{active.body[lang] ?? active.body.en}</p>
            </div>
            <div className="ds-m09-exp">
                <span className="ds-eyebrow" style={{ color: 'var(--ds-sky)' }}>{t.expLabel}</span>
                <p>{t.expBody}</p>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ds-m09-style', `
.ds-m09-star { padding: 16px 18px; background: var(--ds-bg-3); border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-md); margin-bottom: 18px; }
.ds-m09-star p { margin: 8px 0 0; font-family: var(--ds-font-display); font-size: 17px; font-style: italic; color: var(--ds-text-1); line-height: 1.5; }
.ds-m09-tree { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ds-m09-items { display: grid; gap: 6px; margin-top: 10px; }
.ds-m09-item { text-align: left; padding: 9px 12px; border: 1px solid var(--ds-line-1); border-radius: var(--ds-r-sm); background: var(--ds-bg-2); font-size: 13px; color: var(--ds-text-2); }
.ds-m09-item--teal.is-on { border-color: var(--ds-teal); color: var(--ds-teal); background: var(--ds-teal-dim); }
.ds-m09-item--amber.is-on { border-color: var(--ds-amber); color: var(--ds-amber); background: var(--ds-amber-dim); }
.ds-m09-detail { margin-top: 18px; padding: 14px 16px; background: var(--ds-bg-2); border-left: 2px solid var(--ds-teal); border-radius: 0 var(--ds-r-sm) var(--ds-r-sm) 0; }
.ds-m09-detail-name { font-family: var(--ds-font-data); font-size: 12px; letter-spacing: 0.06em; color: var(--ds-text-3); }
.ds-m09-detail p { margin: 6px 0 0; font-size: 14px; color: var(--ds-text-1); }
.ds-m09-exp { margin-top: 18px; padding: 14px 16px; background: var(--ds-sky-dim); border: 1px solid var(--ds-sky); border-radius: var(--ds-r-md); }
.ds-m09-exp p { margin: 8px 0 0; font-size: 13.5px; line-height: 1.6; color: var(--ds-text-1); }
@media (max-width: 700px) { .ds-m09-tree { grid-template-columns: 1fr; } }
`);
