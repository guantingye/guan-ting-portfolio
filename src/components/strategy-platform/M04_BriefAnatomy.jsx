import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, onActivate } from './shared/ispKit.jsx';
import { MODULES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M04');

// Real brief, scraped 2026-07-10 from /insights: "Power is becoming the
// binding constraint for AI scale-out." Segmented by section; annotation
// text is mine, explaining the job each section does for the reader.
const SEGMENTS = [
    {
        id: 'label', en: { tag: 'Strategic brief', job: 'Sets the register before the reader hits a single fact — this is analysis, not a news clip.' },
        zh: { tag: 'Strategic brief', job: '在讀者看到第一個事實之前，先定調——這是分析，不是新聞剪報。' },
    },
    {
        id: 'headline',
        en: { tag: 'Power is becoming the binding constraint for AI scale-out', job: 'States the thesis as a claim, not a topic — "X is becoming the constraint," something a reader can agree or disagree with.' },
        zh: { tag: 'Power is becoming the binding constraint for AI scale-out', job: '把論點寫成一個主張，而不是一個主題——「X 正成為限制」，讀者可以同意或反駁。' },
    },
    {
        id: 'summary',
        en: { tag: 'As accelerator supply normalizes, grid capacity, interconnect queues, and cooling envelopes are increasingly the true gating factors — shifting advantage to operators who secure energy early and schedule workloads intelligently.', job: 'One sentence that survives being read alone in a Slack forward — the whole brief compressed to its load-bearing claim.' },
        zh: { tag: 'As accelerator supply normalizes, grid capacity, interconnect queues, and cooling envelopes are increasingly the true gating factors — shifting advantage to operators who secure energy early and schedule workloads intelligently.', job: '一句話，即使被單獨轉貼到 Slack 也站得住——整篇簡報壓縮成它承重的主張。' },
    },
    {
        id: 'tags',
        en: { tag: 'AI infrastructure · Energy · Data centers', job: 'Three tags, not twelve — enough to route the brief to the right reader without pretending the topic is broader than it is.' },
        zh: { tag: 'AI infrastructure · Energy · Data centers', job: '三個標籤，不是十二個——足夠把簡報導向對的讀者，卻不假裝主題比實際更廣。' },
    },
    {
        id: 'takeaways',
        en: {
            tag: 'KEY TAKEAWAYS', job: 'This section turns the core judgment into three actionable sentences, so readers can understand what to prioritize now without first reading the whole brief. It is usually the first part of the brief to be read and cited.',
            list: [
                'Treat power procurement as a roadmap dependency: interconnect visibility + PPAs + site readiness become first-order constraints.',
                'Shift from "maximum compute" to "effective compute": power-aware placement and time-shifting convert scarcity into reliability advantage.',
                'Cooling and power delivery are now product variables (liquid cooling, higher-voltage distribution, serviceability workflows).',
            ],
        },
        zh: {
            tag: 'KEY TAKEAWAYS', job: '這一段的任務是用三句話把核心判斷轉成可採取的行動，讓讀者不必先讀完整篇簡報，也能掌握現在應優先處理什麼。這通常也是整篇簡報最先被閱讀與引用的區塊。',
            list: [
                'Treat power procurement as a roadmap dependency: interconnect visibility + PPAs + site readiness become first-order constraints.',
                'Shift from "maximum compute" to "effective compute": power-aware placement and time-shifting convert scarcity into reliability advantage.',
                'Cooling and power delivery are now product variables (liquid cooling, higher-voltage distribution, serviceability workflows).',
            ],
        },
    },
    {
        id: 'body',
        en: {
            tag: 'Narrative body', job: 'The takeaways say what to do; the body earns the right to say it — the reasoning a skeptical reader will actually check.',
            list: [
                'The market is entering an energy-first phase: capital can be raised and GPUs can be sourced, but megawatts cannot be conjured on demand. Permitting, substation upgrades, and queue positions now determine where capacity concentrates.',
                'Build a power stack the way teams once built a silicon stack: (1) a site pipeline with queue intelligence, (2) contracting playbooks (PPA / tolling / behind-the-meter), (3) workload governance that optimizes marginal $/token under power constraints.',
            ],
        },
        zh: {
            tag: '敘事本文', job: 'Takeaways 說該做什麼；本文則賺得說出這句話的資格——這是一個懷疑的讀者真正會去查核的推理。',
            list: [
                'The market is entering an energy-first phase: capital can be raised and GPUs can be sourced, but megawatts cannot be conjured on demand. Permitting, substation upgrades, and queue positions now determine where capacity concentrates.',
                'Build a power stack the way teams once built a silicon stack: (1) a site pipeline with queue intelligence, (2) contracting playbooks (PPA / tolling / behind-the-meter), (3) workload governance that optimizes marginal $/token under power constraints.',
            ],
        },
    },
    {
        id: 'signals',
        en: {
            tag: 'SIGNALS TO WATCH', job: 'Turns the brief from a snapshot into a standing alert — four named things to watch, so the reader knows when this thesis gets tested.',
            list: ['Grid — Interconnect queues lengthen; projects with firm capacity move first.', 'Hardware — OEM roadmaps accelerate liquid-cooled racks; serviceability becomes a differentiator.', 'Real estate — Campus-style "power parks" bundle land + substations + permits.', 'Ops — Power-aware scheduling becomes standard for training and inference peaks.'],
        },
        zh: {
            tag: 'SIGNALS TO WATCH', job: '把簡報從一張快照變成一個持續的警戒——四個具名的觀察對象，讓讀者知道這個論點何時會被驗證。',
            list: ['Grid — 併網排隊變長；具備確定容量的專案先行。', 'Hardware — OEM 路線圖加速液冷機櫃；可維修性成為差異化。', 'Real estate — 「電力園區」式開發把土地、變電站與許可綁在一起。', 'Ops — 電力感知排程成為訓練與推論尖峰的標準做法。'],
        },
    },
    {
        id: 'sources',
        en: { tag: 'SOURCES (PUBLIC) — IEA · Electricity 2024, LBNL · Data Center Energy Research', job: 'Named public sources, not "industry reports say" — the citation a skeptical reader needs to check the claim themselves.' },
        zh: { tag: 'SOURCES (PUBLIC) — IEA · Electricity 2024, LBNL · Data Center Energy Research', job: '具名的公開來源，不是「業界報告指出」——讓懷疑的讀者能自行查核主張的引用。' },
    },
];

const COPY = {
    en: {
        title: 'Anatomy of a strategic brief',
        lead: 'Using the /insights strategic brief “Power is becoming the binding constraint for AI scale-out” as an example, this module breaks down how industry signals, contextual research, and judgment are organized into actionable conclusions. It is not a single-content showcase, but the writing structure shared by all five strategic briefs.',
        sectionTask: 'SECTION TASK',
        soWhat: 'A good strategic brief does more than organize insight: it makes a trade-off for the reader about what matters most now, why it matters, and what to do next.',
    },
    zh: {
        title: '一篇策略簡報的解剖',
        lead: '以下一篇實際發布於 /insights 的策略簡報〈Power is becoming the binding constraint for AI scale-out〉為例，逐段拆解它如何把產業訊號、脈絡研究與判斷整理成可行動的判斷。這不只是單篇內容展示，而是五篇策略簡報共同採用的寫作結構。',
        sectionTask: '這一段的任務',
        soWhat: '好的策略簡報不只是整理洞察，而是先替讀者完成一次取捨：現在最重要的是什麼、為什麼，以及下一步該做什麼。',
    },
};

export default function M04_BriefAnatomy() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [active, setActive] = useState('takeaways');
    const seg = SEGMENTS.find(s => s.id === active);
    const segLang = seg[lang] ?? seg.en;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="isp-m4">
                <div className="isp-m4-doc">
                    {SEGMENTS.map(s => {
                        const sl = s[lang] ?? s.en;
                        return (
                            <button
                                key={s.id}
                                className={`isp-m4-seg isp-m4-seg--${s.id}${active === s.id ? ' is-on' : ''}`}
                                aria-pressed={active === s.id}
                                onClick={() => setActive(s.id)}
                                onKeyDown={onActivate(() => setActive(s.id))}>
                                {sl.list ? (
                                    <>
                                        <span className="isp-m4-seg-kicker">{sl.tag}</span>
                                        <ul className="isp-m4-seg-list">
                                            {sl.list.slice(0, s.id === 'body' ? 1 : 2).map((li, i) => <li key={i}>{li}</li>)}
                                            {sl.list.length > (s.id === 'body' ? 1 : 2) && <li className="isp-m4-more">…</li>}
                                        </ul>
                                    </>
                                ) : <span>{sl.tag}</span>}
                            </button>
                        );
                    })}
                </div>
                <div className="isp-m4-annotation" aria-live="polite">
                    <span className="isp-tag isp-tag--amber">{t.sectionTask}</span>
                    <p>{segLang.job}</p>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m4-style', `
.isp-m4 { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; align-items: start; }
.isp-m4-doc { display: grid; gap: 6px; padding: 16px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); }
.isp-m4-seg { display: block; width: 100%; padding: 9px 12px; border: 1px solid transparent; border-left: 2px solid transparent; border-radius: var(--isp-r-sm); transition: border-color 140ms var(--isp-ease), background 140ms var(--isp-ease); font-size: 13px; color: var(--isp-text-2); line-height: 1.5; }
.isp-m4-seg:hover { background: var(--isp-bg-3); }
.isp-m4-seg.is-on { border-color: var(--isp-teal); border-left-color: var(--isp-teal); background: var(--isp-teal-dim); color: var(--isp-text-1); }
.isp-m4-seg--headline { font-family: var(--isp-font-display); font-size: 17px; color: var(--isp-text-1); }
.isp-m4-seg--label { font-family: var(--isp-font-data); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--isp-text-3); }
.isp-m4-seg-kicker { display: block; font-family: var(--isp-font-data); font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--isp-teal); margin-bottom: 5px; }
.isp-m4-seg-list { margin: 0; padding-left: 16px; }
.isp-m4-seg-list li { margin-bottom: 2px; }
.isp-m4-more { color: var(--isp-text-3); list-style: none; margin-left: -16px; }
.isp-m4-annotation { position: sticky; top: 12px; padding: 16px 18px; background: var(--isp-bg-2); border: 1px solid var(--isp-amber); border-radius: var(--isp-r-md); }
.isp-m4-annotation p { margin: 10px 0 0; font-size: 14px; line-height: 1.65; color: var(--isp-text-1); }
@media (max-width: 900px) { .isp-m4 { grid-template-columns: 1fr; } .isp-m4-annotation { position: static; } }
`);
