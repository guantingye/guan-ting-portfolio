import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterFrame, { injectStyles, useI18n, Tag, stagger, riseItem } from './shared/blKit.jsx';
import { CHAPTERS, RESPONSIBILITIES } from './data/blContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C02');

const COPY = {
    en: {
        lead: 'Research Assistant, Taiwan Mind and Brain Imaging Center — three responsibility clusters, and the same discipline running through every one of them: measure carefully, analyze honestly, and say what you found.',
        note: 'Across two years the role scaled with the study — from running a single MRI session to building the pipeline a whole finding stood on.',
    },
    zh: {
        lead: '台灣心智科學腦造影中心研究助理——三個職責叢集，貫穿其中的是同一套紀律：仔細量測、誠實分析，然後把發現說出來。',
        note: '兩年下來，這個角色隨著研究一起長大——從執行單一場 MRI 收案，到搭建起支撐一項發現的整條產線。',
    },
};

export default function C02_LabAndRole() {
    const { lang } = useI18n();
    const reduced = useReducedMotion();
    const c = COPY[lang] ?? COPY.en;
    return (
        <ChapterFrame chapter={chapter} lead={c.lead} note={c.note}>
            <motion.div
                className="bl-resp-grid"
                variants={stagger(0.08)}
                initial={reduced ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                {RESPONSIBILITIES.map(r => (
                    <motion.div key={r.key} className="bl-card bl-resp" variants={riseItem}>
                        <div className="bl-resp-head">
                            <span className="bl-eyebrow">{r.num}</span>
                            <h4 className="bl-resp-title">{r.title[lang]}</h4>
                        </div>
                        <p className="bl-resp-intro">{r.intro[lang]}</p>
                        <ul className="bl-resp-duties">
                            {r.duties.map(d => (
                                <li key={d.key}>
                                    <strong>{d.title[lang]}</strong>
                                    <span>{d.body[lang]}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bl-resp-tags">
                            {r.tags.map((t, i) => <Tag key={i}>{t[lang]}</Tag>)}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </ChapterFrame>
    );
}

injectStyles('bl-c02-styles', `
.bl-resp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.bl-resp { display: flex; flex-direction: column; gap: 12px; }
.bl-resp-head { display: flex; align-items: baseline; gap: 10px; }
.bl-resp-title { margin: 0; font-family: var(--bl-font-display); font-size: 17.5px; font-weight: 500; line-height: 1.35; color: var(--bl-ink); }
.bl-resp-intro { margin: 0; font-size: 13px; line-height: 1.6; color: var(--bl-ink-3); }
html.lang-zh .bl-resp-intro { line-height: 1.85; }
.bl-resp-duties { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; border-top: 1px solid var(--bl-line-soft); padding-top: 12px; }
.bl-resp-duties li { display: flex; flex-direction: column; gap: 2px; }
.bl-resp-duties strong { font-size: 13.5px; font-weight: 600; color: var(--bl-ink-2); }
.bl-resp-duties span { font-size: 12.5px; line-height: 1.6; color: var(--bl-ink-3); }
html.lang-zh .bl-resp-duties span { line-height: 1.8; }
.bl-resp-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; }
@media (max-width: 900px) {
  .bl-resp-grid { grid-template-columns: 1fr; }
}
`);
