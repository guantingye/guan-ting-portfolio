import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/psyKit.jsx';
import { MODULES, LIVE_URL, EMOBOT_SLUG } from './data/psyContent.js';

const MOD = MODULES.find(m => m.key === 'M17');

const COPY = {
    en: {
        title: 'System relationship map & live demo',
        lead: 'Where PsyMatch sits on the care continuum, and how to try the real thing.',
        soWhat: 'PsyMatch is one measured layer of a care continuum — and it runs.',
        nodes: [
            { id: 'emobot', label: 'Emobot+', sub: 'AI companion · daily support & safety', tone: 'iris', link: true },
            { id: 'psymatch', label: 'PsyMatch', sub: 'measure needs · match & book', tone: 'teal', self: true },
            { id: 'care', label: 'Licensed psychologist', sub: 'assessment · therapy · risk', tone: 'amber' },
        ],
        edgeA: 'step up when needed',
        edgeB: 'book',
        mapCaption: 'PsyMatch measures and matches; the human clinician provides care; Emobot+ is the AI end of the same continuum.',
        bridgeEyebrow: 'LIVE SYSTEM',
        bridgeTitle: 'Take the assessment yourself',
        bridgePrompt: 'The playground in Fig. 4 is the same math that will score you.',
        open: 'Open PsyMatch ↗',
        printNote: 'Direct link:',
        emobotLink: 'See project 01 →',
    },
    zh: {
        title: '系統關係圖與線上示範',
        lead: 'PsyMatch 在照護連續帶上的位置，以及如何試用真正的系統。',
        soWhat: 'PsyMatch 是照護連續帶中一個被量測的層——而且它正在運作。',
        nodes: [
            { id: 'emobot', label: 'Emobot+', sub: 'AI 陪伴 · 日常支持與安全', tone: 'iris', link: true },
            { id: 'psymatch', label: 'PsyMatch', sub: '量測需求 · 媒合與預約', tone: 'teal', self: true },
            { id: 'care', label: '合格心理師', sub: '衡鑑 · 治療 · 風險', tone: 'amber' },
        ],
        edgeA: '需要時往上轉介',
        edgeB: '預約',
        mapCaption: 'PsyMatch 量測並媒合；真人臨床工作者提供照護；Emobot+ 是同一條連續帶的 AI 端。',
        bridgeEyebrow: '線上系統',
        bridgeTitle: '親自做一次評估',
        bridgePrompt: 'Fig. 4 的互動台，正是將為你評分的同一套運算。',
        open: '開啟 PsyMatch ↗',
        printNote: '直接連結：',
        emobotLink: '見專案 01 →',
    },
};

const TONE = { iris: 'var(--pm-iris)', teal: 'var(--pm-teal)', amber: 'var(--pm-amber)' };

export default function M17_SystemMap() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <figure style={{ margin: 0 }}>
                <div className="pm-map3" role="img" aria-label={c.mapCaption}>
                    {c.nodes.map((n, i) => (
                        <React.Fragment key={n.id}>
                            <div className={`pm-node${n.self ? ' is-self' : ''}`} style={{ '--pm-node': TONE[n.tone] }}>
                                <strong>{n.label}</strong>
                                <span>{n.sub}</span>
                                {n.link && <a href={`#/project/${EMOBOT_SLUG}`} className="pm-node-link">{c.emobotLink}</a>}
                            </div>
                            {i < c.nodes.length - 1 && (
                                <div className="pm-edge" aria-hidden="true">
                                    <span className="pm-edge-label">{i === 0 ? c.edgeA : c.edgeB}</span>
                                    <span className="pm-edge-line" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <Caption kind="Fig." n={8}>{c.mapCaption}</Caption>
            </figure>

            <div className="pm-bridge">
                <div className="pm-bridge-copy">
                    <span className="pm-eyebrow" style={{ color: 'var(--pm-teal)' }}>{c.bridgeEyebrow}</span>
                    <h4>{c.bridgeTitle}</h4>
                    <p>{c.bridgePrompt}</p>
                    <p className="pm-bridge-url">{c.printNote} <span className="pm-mono">{LIVE_URL}</span></p>
                </div>
                <a className="pm-bridge-btn" href={LIVE_URL} target="_blank" rel="noopener noreferrer">{c.open}</a>
            </div>
        </SectionModule>
    );
}

injectStyles('pm-m17', `
.pm-map3 { display: flex; align-items: stretch; gap: 0; flex-wrap: wrap; }
.pm-node { flex: 1; min-width: 160px; padding: 18px 16px; border: 1px solid var(--pm-line-1); border-top: 2px solid var(--pm-node); border-radius: var(--pm-r-md); background: var(--pm-bg-2); }
.pm-node.is-self { background: var(--pm-teal-dim); }
.pm-node strong { display: block; font-family: var(--pm-font-display); font-size: 18px; color: var(--pm-text-1); }
.pm-node span { display: block; font-size: 12.5px; color: var(--pm-text-3); margin-top: 4px; line-height: 1.45; }
.pm-node-link { display: inline-block; margin-top: 8px; font-family: var(--pm-font-data); font-size: 11px; color: var(--pm-iris); text-decoration: none; }
.pm-node-link:hover { text-decoration: underline; }
.pm-edge { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; padding: 0 14px; }
.pm-edge-label { font-family: var(--pm-font-data); font-size: 9.5px; letter-spacing: 0.06em; color: var(--pm-text-3); white-space: nowrap; }
.pm-edge-line { width: 34px; height: 2px; background: var(--pm-line-2); position: relative; }
.pm-edge-line::after { content: ''; position: absolute; right: -1px; top: -3px; border-left: 6px solid var(--pm-line-2); border-top: 4px solid transparent; border-bottom: 4px solid transparent; }
.pm-bridge { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-top: 24px; padding: 22px 24px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-lg); background: linear-gradient(180deg, rgba(53,194,176,0.05), transparent 60%), var(--pm-bg-1); }
.pm-bridge-copy h4 { margin: 8px 0 6px; font-family: var(--pm-font-display); font-size: 22px; font-weight: 500; color: var(--pm-text-1); }
.pm-bridge-copy p { margin: 0; font-size: 14px; color: var(--pm-text-2); }
.pm-bridge-url { margin-top: 10px !important; font-family: var(--pm-font-data); font-size: 12px; color: var(--pm-text-3); }
.pm-bridge-url .pm-mono { color: var(--pm-teal); word-break: break-all; }
.pm-bridge-btn { flex: 0 0 auto; display: inline-flex; align-items: center; font-family: var(--pm-font-body); font-size: 14px; font-weight: 600; color: var(--pm-bg-0); background: var(--pm-teal); border-radius: var(--pm-r-sm); padding: 12px 20px; text-decoration: none; transition: transform 140ms var(--pm-ease); }
.pm-bridge-btn:hover { transform: translateY(-2px); }
@media (max-width: 767px) {
  .pm-map3 { flex-direction: column; }
  .pm-edge { flex-direction: row; padding: 8px 0; }
  .pm-edge-line { width: 2px; height: 20px; }
  .pm-edge-line::after { right: -3px; top: auto; bottom: -1px; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 6px solid var(--pm-line-2); border-bottom: none; }
}
`);
