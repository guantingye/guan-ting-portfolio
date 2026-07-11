import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterFrame, { injectStyles, useI18n, Tag, stagger, riseItem } from './shared/blKit.jsx';
import { CHAPTERS, OHBM } from './data/blContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C07');
const TEAL = { accent: '#1F9E89', accentInk: '#146A5C', accentSoft: 'rgba(31,158,137,0.12)' };
const BASE = `${import.meta.env.BASE_URL}brain-and-learning/`;

const COPY = {
    en: { eyebrowSuffix: `${OHBM.location.en} · ${OHBM.dateRange}` },
    zh: { eyebrowSuffix: `${OHBM.location.zh} · ${OHBM.dateRange}` },
};

export default function C07_OHBM() {
    const { lang } = useI18n();
    const reduced = useReducedMotion();
    const c = COPY[lang] ?? COPY.en;
    return (
        <ChapterFrame chapter={chapter} accent={TEAL} eyebrowSuffix={c.eyebrowSuffix} title={OHBM.name[lang]}>
            <img className="bl-logo-banner" src={BASE + OHBM.logo} alt="OHBM 2025 Brisbane" loading="lazy" decoding="async" />
            <div className="bl-side-layout">
                <div>
                    <blockquote className="bl-poster-title">“{OHBM.posterTitle}”</blockquote>
                    <div className="bl-award">
                        <span className="bl-award-badge">{OHBM.acceptedDate[lang]}</span>
                        <div className="bl-award-tags">
                            {OHBM.tags.map((t, i) => <Tag key={i}>{t[lang]}</Tag>)}
                        </div>
                    </div>
                    <motion.ul
                        className="bl-points"
                        variants={stagger(0.05)}
                        initial={reduced ? false : 'hidden'}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {OHBM.points.map((p, i) => (
                            <motion.li key={i} variants={riseItem}>{p[lang]}</motion.li>
                        ))}
                    </motion.ul>
                    <p className="bl-authors-line">{OHBM.authors} — {OHBM.affiliation[lang]}</p>
                </div>
                <figure className="bl-side-photo">
                    <img src={BASE + OHBM.image} alt={OHBM.imageCaption[lang]} loading="lazy" decoding="async" />
                    <figcaption>{OHBM.imageCaption[lang]}</figcaption>
                </figure>
            </div>
        </ChapterFrame>
    );
}

injectStyles('bl-c07-styles', `
.bl-poster-title { margin: 4px 0 18px; padding: 0 0 0 18px; border-left: 3px solid var(--bl-accent); font-family: var(--bl-font-display); font-style: italic; font-size: 17px; line-height: 1.55; color: var(--bl-ink); max-width: 700px; }
html.lang-zh .bl-poster-title { font-style: normal; }
.bl-authors-line { margin: 18px 0 0; padding-top: 14px; border-top: 1px dashed var(--bl-line); font-family: var(--bl-font-data); font-size: 11.5px; color: var(--bl-ink-3); }
`);
