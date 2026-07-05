import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M16');

const COPY = {
    en: {
        title: 'Roadmap & honest limits',
        lead: 'Everything under “next” has a gate: I only build it once a specific number moves. Everything under “limits” is what I would tell you about this system if you asked me off the record.',
        nextLabel: 'Next — each with a validation gate',
        next: [
            { t: 'Retrieval grounding for numeric claims', gate: 'Ship only if hallucinated-number rate stays <1 / 50 on a doubled golden set.' },
            { t: 'Calibrated confidence score, not a flag', gate: 'Ship only if the score correlates with real tag error on held-out articles.' },
            { t: 'Add three more zh-TW sources', gate: 'Ship only if they raise the original-signal ratio without adding dedupe load.' },
            { t: 'Reader feedback loop on the platform', gate: 'Ship only if at least one analyst marks usefulness weekly.' },
        ],
        limitsLabel: 'Current limits',
        limits: [
            'zh-TW bias in the source mix — the English long-tail is under-covered.',
            'No retrieval grounding — numbers are quoted verbatim, but not cross-checked against a source of truth.',
            'Single-maintainer bus factor — if I stop, it stops.',
            'The eval set is small and I graded it — trends are directional, not statistically reliable.',
        ],
        reflectLabel: 'Reflection',
        reflect: 'Building both the AI system and the interface that delivers it changed the order I work in. I stopped starting with the model and started with the analyst’s morning — the friction, the trust, the moment a wrong number does damage. The prompts, the taxonomy, and the interface all became answers to that one scene, and the honest constraint “quote numbers only from the source” taught me more about designing for AI than any accuracy score did. I would rather ship a system that says “I’m not sure” than one that is confidently wrong.',
        soWhat: 'I know exactly where this system is weak.',
    },
    zh: {
        title: '路線圖與誠實限制',
        lead: '「接下來」底下每一項都有一道 gate：某個具體數字真的動了，我才會去做。「限制」底下寫的，是如果你私下問我，我會老實告訴你的那些話。',
        nextLabel: '接下來——每項都有驗證 gate',
        next: [
            { t: '數字宣稱的檢索接地（grounding）', gate: '只有在 golden set 加倍後、幻覺數字率仍 <1 / 50 才出貨。' },
            { t: '校準過的信心分數，而非旗標', gate: '只有在該分數與 held-out 文章的實際標籤誤差相關時才出貨。' },
            { t: '再加三個繁中來源', gate: '只有在能提高原創訊號比、又不增加去重負擔時才出貨。' },
            { t: '平台上的讀者回饋迴圈', gate: '只有在每週至少有一位分析師標記有用性時才出貨。' },
        ],
        limitsLabel: '目前的限制',
        limits: [
            '來源組合偏繁中——英文長尾覆蓋不足。',
            '沒有檢索接地——數字逐字引用，但未對照真實來源交叉核對。',
            '單一維護者的 bus factor——我停，它就停。',
            '評測集小且由我評分——趨勢是方向性的，非統計上穩健。',
        ],
        reflectLabel: '反思',
        reflect: '同時設計 AI 系統與交付它的介面，改變了我工作的順序。我不再從模型開始，而是從分析師的早晨開始——那些摩擦、那份信任，以及一個錯誤數字造成傷害的瞬間。提示、分類法與介面，全都變成對那一幕的回答；而「數字只從來源引用」這個誠實約束，教我的關於為 AI 而設計的事，比任何準確率分數都多。我寧願出貨一個會說「我不確定」的系統，也不要一個自信地錯的系統。',
        soWhat: '我很清楚這個系統弱在哪裡。',
    },
};

export default function M16_Roadmap() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-m16-cols">
                <div className="ni-m16-next">
                    <span className="ni-caption ni-m16-collabel">{t.nextLabel}</span>
                    <ol className="ni-m16-nextlist">
                        {t.next.map((n, i) => (
                            <li key={i}>
                                <span className="ni-m16-next-t">{n.t}</span>
                                <span className="ni-m16-gate"><span className="ni-m16-gate-tag">GATE</span>{n.gate}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="ni-m16-limits">
                    <span className="ni-caption ni-m16-collabel">{t.limitsLabel}</span>
                    <ul className="ni-m16-limitlist">
                        {t.limits.map((l, i) => <li key={i}><span className="ni-m16-limit-mark" aria-hidden="true">▸</span>{l}</li>)}
                    </ul>
                </div>
            </div>
            <figure className="ni-m16-reflect">
                <figcaption className="ni-m16-reflect-label">{t.reflectLabel}</figcaption>
                <blockquote>{t.reflect}</blockquote>
            </figure>
        </ModuleFrame>
    );
}

injectStyles('ni-m16', `
.ni-m16-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ni-m16-collabel { display: block; margin-bottom: 12px; }
.ni-m16-nextlist { list-style: none; margin: 0; padding: 0; counter-reset: nx; display: flex; flex-direction: column; gap: 12px; }
.ni-m16-nextlist li { counter-increment: nx; position: relative; padding: 12px 14px 12px 40px; background: var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); }
.ni-m16-nextlist li::before { content: counter(nx, decimal-leading-zero); position: absolute; left: 14px; top: 12px; font-family: var(--ni-font-data); font-size: 12px; color: var(--ni-teal); }
.ni-m16-next-t { display: block; font-size: 13.5px; font-weight: 500; color: var(--ni-text-1); margin-bottom: 6px; }
.ni-m16-gate { display: block; font-size: 12px; line-height: 1.5; color: var(--ni-text-3); }
.ni-m16-gate-tag { display: inline-block; font-family: var(--ni-font-data); font-size: 9px; letter-spacing: 0.1em; color: var(--ni-amber); border: 1px solid var(--ni-amber); border-radius: 3px; padding: 1px 5px; margin-right: 7px; }
.ni-m16-limitlist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.ni-m16-limitlist li { display: flex; gap: 10px; font-size: 13px; line-height: 1.55; color: var(--ni-text-2); }
.ni-m16-limit-mark { color: var(--ni-red); flex: 0 0 auto; }
.ni-m16-reflect { margin: 24px 0 0; padding: 22px 24px; background: linear-gradient(180deg, var(--ni-teal-dim), transparent 70%), var(--ni-bg-2); border: 1px solid var(--ni-line-1); border-left: 3px solid var(--ni-teal); border-radius: var(--ni-r-md); }
.ni-m16-reflect-label { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ni-teal); margin-bottom: 12px; }
.ni-m16-reflect blockquote { margin: 0; font-family: var(--ni-font-display); font-size: clamp(17px, 1.9vw, 21px); font-style: italic; line-height: 1.55; color: var(--ni-text-1); }
@media (max-width: 767px) { .ni-m16-cols { grid-template-columns: 1fr; } }
`);
