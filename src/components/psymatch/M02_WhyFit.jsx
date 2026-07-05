import React from 'react';
import SectionModule, { useI18n, Fn, Caption, injectStyles } from './shared/psyKit.jsx';
import { MODULES } from './data/psyContent.js';

const MOD = MODULES.find(m => m.key === 'M02');

const COPY = {
    en: {
        title: 'Why fit matters — evidence brief',
        lead: 'The product premise, grounded in literature rather than vibes.',
        soWhat: 'The product premise is grounded in evidence, not assertion.',
        paras: [
            <>The strongest and most replicated predictor of a good outcome in talk therapy is not the school of therapy but the <em>working alliance</em> — the bond and agreement between a person and their helper. Its link to outcome holds across hundreds of studies.<Fn n={1} /></>,
            <>People also do better when they get the kind of help they say they want. A client’s own treatment preferences measurably improve outcome and reduce early drop-out.<Fn n={2} /> A directory that ignores preference throws that signal away.</>,
            <>Yet consumer counselling directories rarely measure the person before showing options. Because so much of what works is shared across methods rather than unique to one,<Fn n={3} /> the useful thing a matcher can add is structure: measure need, then route.</>,
        ],
        figKind: 'Fig.',
        figCaption: 'State × support fit — the two mismatch cases a directory quietly produces.',
        axisState: 'Person’s stated need',
        axisStyle: 'Helper’s focus',
        cells: [
            { good: true, label: 'Aligned', note: 'need meets focus' },
            { good: false, label: 'Mismatch', note: 'right person, wrong focus' },
            { good: false, label: 'Mismatch', note: 'right focus, wrong depth' },
            { good: true, label: 'Aligned', note: 'need meets focus' },
        ],
    },
    zh: {
        title: '為什麼「適配」重要——證據摘要',
        lead: '產品前提建立在文獻上，而不是感覺上。',
        soWhat: '產品前提建立在證據上，而不是主張上。',
        paras: [
            <>談話治療中，對良好療效最一致、最可重複驗證的預測因子，不是治療學派，而是<em>治療同盟</em>——使用者與協助者之間的連結與共識。這個關聯在數百篇研究中都成立。<Fn n={1} /></>,
            <>當人們得到自己說想要的那種協助時，也會做得更好。個案自身的治療偏好可測量地改善療效並降低早期流失。<Fn n={2} />一個忽略偏好的名錄，等於丟掉了這個訊號。</>,
            <>然而消費端的諮商名錄，很少在呈現選項之前先量測使用者。由於有效成分多半是各種方法共有、而非某一派獨有，<Fn n={3} />媒合真正能加上的價值就是結構：先量測需求，再導向。</>,
        ],
        figKind: 'Fig.',
        figCaption: '狀態 × 支持適配——名錄悄悄製造的兩種錯配情形。',
        axisState: '使用者陳述的需求',
        axisStyle: '協助者的專長焦點',
        cells: [
            { good: true, label: '相符', note: '需求對上焦點' },
            { good: false, label: '錯配', note: '對的人，錯的焦點' },
            { good: false, label: '錯配', note: '對的焦點，錯的深度' },
            { good: true, label: '相符', note: '需求對上焦點' },
        ],
    },
};

export default function M02_WhyFit() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="pm-whyfit">
                <div className="pm-whyfit-prose">
                    {c.paras.map((p, i) => <p key={i} className="pm-prose">{p}</p>)}
                </div>
                <figure className="pm-whyfit-fig">
                    <div className="pm-quad" role="img" aria-label={c.figCaption}>
                        <span className="pm-quad-axis pm-quad-axis-y">{c.axisStyle}</span>
                        <span className="pm-quad-axis pm-quad-axis-x">{c.axisState}</span>
                        <div className="pm-quad-grid">
                            {c.cells.map((cell, i) => (
                                <div key={i} className={`pm-quad-cell${cell.good ? ' is-good' : ''}`}>
                                    <span className="pm-quad-mark" aria-hidden="true">{cell.good ? '✓' : '×'}</span>
                                    <strong>{cell.label}</strong>
                                    <span>{cell.note}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Caption kind={c.figKind} n={1}>{c.figCaption}</Caption>
                </figure>
            </div>
        </SectionModule>
    );
}

injectStyles('pm-m2', `
.pm-whyfit { display: grid; grid-template-columns: 1.35fr 1fr; gap: 28px; align-items: start; }
.pm-prose { margin: 0 0 14px; font-size: 15px; line-height: 1.68; color: var(--pm-text-2); }
.pm-prose:last-child { margin-bottom: 0; }
.pm-prose em { color: var(--pm-text-1); font-style: italic; }
.pm-quad { position: relative; padding: 0 0 22px 30px; }
.pm-quad-axis { font-family: var(--pm-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--pm-text-3); text-transform: uppercase; }
.pm-quad-axis-y { position: absolute; left: -4px; top: 50%; transform: rotate(-90deg) translateX(50%); transform-origin: left center; white-space: nowrap; }
.pm-quad-axis-x { position: absolute; left: 30px; right: 0; bottom: 0; text-align: center; }
.pm-quad-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.pm-quad-cell { display: flex; flex-direction: column; gap: 3px; padding: 14px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); background: var(--pm-bg-2); min-height: 92px; }
.pm-quad-cell.is-good { border-color: var(--pm-teal); background: var(--pm-teal-dim); }
.pm-quad-mark { font-family: var(--pm-font-data); font-size: 14px; color: var(--pm-red); }
.pm-quad-cell.is-good .pm-quad-mark { color: var(--pm-teal); }
.pm-quad-cell strong { color: var(--pm-text-1); font-size: 14px; }
.pm-quad-cell span { font-size: 12px; color: var(--pm-text-3); }
@media (max-width: 860px) { .pm-whyfit { grid-template-columns: 1fr; } }
`);
