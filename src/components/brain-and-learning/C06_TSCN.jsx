import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterFrame, { injectStyles, useI18n, Tag, stagger, riseItem } from './shared/blKit.jsx';
import { CHAPTERS, TSCN } from './data/blContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C06');
const GOLD = { accent: '#C9A227', accentInk: '#8C6D12', accentSoft: 'rgba(201,162,39,0.12)' };
const BASE = `${import.meta.env.BASE_URL}brain-and-learning/`;

const COPY = {
    en: { eyebrowSuffix: TSCN.dateRange, bridgeLabel: 'Where this leads' },
    zh: { eyebrowSuffix: TSCN.dateRange, bridgeLabel: '這份紀錄延伸向哪裡' },
};

export default function C06_TSCN() {
    const { lang } = useI18n();
    const reduced = useReducedMotion();
    const c = COPY[lang] ?? COPY.en;
    return (
        <ChapterFrame chapter={chapter} accent={GOLD} eyebrowSuffix={c.eyebrowSuffix} title={TSCN.name[lang]}>
            <div className="bl-side-layout">
                <div className="bl-c06-main">
                    <div className="bl-award">
                        <span className="bl-award-badge">{TSCN.award[lang]}</span>
                        <div className="bl-award-tags">
                            {TSCN.tags.map((t, i) => <Tag key={i}>{t[lang]}</Tag>)}
                        </div>
                    </div>
                    <motion.ul
                        className="bl-points"
                        variants={stagger(0.05)}
                        initial={reduced ? false : 'hidden'}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {TSCN.points.map((p, i) => (
                            <motion.li key={i} variants={riseItem}>{p[lang]}</motion.li>
                        ))}
                    </motion.ul>
                    <p className="bl-bridge-line"><strong>{c.bridgeLabel}: </strong>{TSCN.bridge[lang]}</p>
                </div>
                <figure className="bl-side-photo">
                    <img src={BASE + TSCN.image} alt={TSCN.imageCaption[lang]} loading="lazy" decoding="async" />
                    <figcaption>{TSCN.imageCaption[lang]}</figcaption>
                </figure>
            </div>
        </ChapterFrame>
    );
}

injectStyles('bl-c06-styles', `
.bl-award { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 14px 18px; background: var(--bl-accent-soft); border: 1px solid var(--bl-accent); border-radius: var(--bl-r-md); margin-bottom: 20px; }
.bl-award-badge { font-family: var(--bl-font-display); font-weight: 500; font-size: 16px; color: var(--bl-accent-ink); }
.bl-award-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.bl-points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.bl-points li { position: relative; padding-left: 18px; font-size: 13.5px; line-height: 1.65; color: var(--bl-ink-2); }
html.lang-zh .bl-points li { line-height: 1.85; }
.bl-points li::before { content: ''; position: absolute; left: 0; top: 0.65em; width: 6px; height: 6px; border-radius: 50%; background: var(--bl-accent); }
.bl-bridge-line { margin: 20px 0 0; padding-top: 16px; border-top: 1px dashed var(--bl-line); font-size: 13px; line-height: 1.65; color: var(--bl-ink-3); }
.bl-bridge-line strong { color: var(--bl-ink-2); font-family: var(--bl-font-data); font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; }
`);
