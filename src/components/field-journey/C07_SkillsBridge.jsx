import React from 'react';
import ChapterFrame, { injectStyles, useI18n, Rise, DrawnPath, accentVars } from './shared/fjKit.jsx';
import { CHAPTERS, STATIONS, SKILL_BRIDGES } from './data/fjContent.js';
import { PROJECTS } from '../../data/projects.js';

const chapter = CHAPTERS.find(c => c.key === 'C07');

const COPY = {
    en: {
        lead: 'Nothing here was called UX at the time — it was called the job. Five lines carried over; each one points at the projects where it lives now.',
        close: 'The field gave the discipline. The tools came later — projects 01–09 are what this job looks like once it got them.',
    },
    zh: {
        lead: '這些在當年都不叫 UX，只叫「份內的事」。有五條線被帶走了；每一條，都指向它現在住的專案。',
        close: '田野給了紀律，工具是後來的事。專案 01–09，就是這份工作拿到工具之後的樣子。',
    },
};

// Which station's accent colors each bridge row (its origin in the journey).
const BRIDGE_ORIGIN = { data: 'st2', forms: 'st3', aac: 'st1', content: 'st2', ops: 'st3' };

export default function C07_SkillsBridge() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <ChapterFrame chapter={chapter} lead={c.lead}>
            <div className="fj-bridges">
                {SKILL_BRIDGES.map((b, i) => {
                    const origin = STATIONS.find(s => s.id === BRIDGE_ORIGIN[b.key]);
                    return (
                        <Rise key={b.key} delay={i * 0.06}>
                            <div className="fj-bridge" style={accentVars(origin)}>
                                <div className="fj-bridge-from">
                                    <h4 className="fj-bridge-skill">{b.from[lang]}</h4>
                                    <p className="fj-bridge-note">{b.note[lang]}</p>
                                </div>
                                <div className="fj-bridge-link" aria-hidden="true">
                                    <svg viewBox="0 0 90 24" preserveAspectRatio="none" focusable="false">
                                        <DrawnPath
                                            d="M4 14 C 26 6, 40 20, 60 11 C 70 7, 78 11, 86 10"
                                            stroke="var(--fj-accent-ink)" strokeWidth="1.8"
                                            duration={0.9} delay={0.15}
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        <path d="M79 5 L87 10 L79 15" fill="none" stroke="var(--fj-accent-ink)"
                                            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="fj-bridge-to">
                                    {b.links.map(l => {
                                        const proj = PROJECTS.find(p => p.slug === l.slug);
                                        if (!proj) return null;
                                        return (
                                            <a key={l.slug} className="fj-bridge-proj" href={`#/project/${l.slug}`}>
                                                <span className="fj-bridge-num">{l.num}</span>
                                                <span className="fj-bridge-title">{lang === 'zh' ? proj.zhTitle : proj.title}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </Rise>
                    );
                })}
            </div>
            <Rise delay={0.1}>
                <p className="fj-close">{c.close}</p>
            </Rise>
        </ChapterFrame>
    );
}

injectStyles('fj-c07-styles', `
.fj-bridges { display: flex; flex-direction: column; gap: 14px; }
.fj-bridge { display: grid; grid-template-columns: minmax(0, 5fr) 90px minmax(0, 4fr); gap: 16px; align-items: center; background: var(--fj-paper-1); border: 1px solid var(--fj-line); border-radius: var(--fj-r-md); box-shadow: var(--fj-shadow); padding: 16px 20px; }
.fj-bridge-skill { margin: 0 0 5px; font-family: var(--fj-font-display); font-size: 17px; font-weight: 500; color: var(--fj-ink); }
.fj-bridge-note { margin: 0; font-size: 13px; line-height: 1.6; color: var(--fj-ink-2); }
html.lang-zh .fj-bridge-note { line-height: 1.8; }
.fj-bridge-link svg { display: block; width: 100%; height: 24px; }
.fj-bridge-to { display: flex; flex-direction: column; gap: 7px; align-items: flex-start; }
.fj-bridge-proj { display: inline-flex; align-items: baseline; gap: 8px; text-decoration: none; font-size: 13.5px; color: var(--fj-ink); border: 1px solid var(--fj-line); border-radius: 999px; padding: 5px 14px; background: var(--fj-paper-0); transition: border-color 160ms var(--fj-ease), background 160ms var(--fj-ease), transform 160ms var(--fj-ease); }
.fj-bridge-proj:hover { border-color: var(--fj-accent-ink); background: var(--fj-accent-soft); transform: translateX(2px); }
.fj-bridge-num { font-family: var(--fj-font-data); font-size: 10.5px; color: var(--fj-accent-ink); }
.fj-bridge-title { font-weight: 600; }

.fj-close { margin: 34px auto 0; max-width: 640px; text-align: center; font-family: var(--fj-font-display); font-style: italic; font-size: clamp(18px, 2.2vw, 23px); line-height: 1.6; color: var(--fj-ink); }
html.lang-zh .fj-close { font-style: normal; line-height: 1.9; }

@media (max-width: 860px) {
  .fj-bridge { grid-template-columns: 1fr; gap: 10px; }
  .fj-bridge-link { display: none; }
  .fj-bridge-to { flex-direction: row; flex-wrap: wrap; }
}
`);
