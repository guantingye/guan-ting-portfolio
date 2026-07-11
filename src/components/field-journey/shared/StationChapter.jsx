import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterFrame, { injectStyles, useI18n, WashiTag, stagger, riseItem } from './fjKit.jsx';

// Shared layout for the three station chapters: intro (via ChapterFrame lead),
// signature-artifact spotlight, duty cards, tags, field note. Each station file
// stays a thin wrapper that owns only its interactive spotlight — so reordering
// stations in fjContent.js is a data change, not a layout change.
export default function StationChapter({ chapter, station, spotlight, spotlightTitle, spotlightCaption }) {
    const { lang } = useI18n();
    const reduced = useReducedMotion();
    return (
        <ChapterFrame chapter={chapter} station={station} lead={station.intro[lang]} note={station.fieldNote[lang]}>
            {spotlight && (
                <div className="fj-spot">
                    <div className="fj-spot-head">
                        <span className="fj-eyebrow">{lang === 'zh' ? '招牌一件' : 'Signature piece'}</span>
                        {spotlightTitle && <h4 className="fj-spot-title">{spotlightTitle}</h4>}
                    </div>
                    {spotlight}
                    {spotlightCaption && <p className="fj-spot-cap">{spotlightCaption}</p>}
                </div>
            )}
            <motion.div
                className="fj-duty-grid"
                variants={stagger()}
                initial={reduced ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                {station.duties.map((d, i) => (
                    <motion.div key={d.key} className="fj-card fj-duty" variants={riseItem}>
                        <span className="fj-duty-num">{String(i + 1).padStart(2, '0')}</span>
                        <h4 className="fj-duty-title">{d.title[lang]}</h4>
                        <p className="fj-duty-body">{d.body[lang]}</p>
                    </motion.div>
                ))}
            </motion.div>
            <div className="fj-station-tags">
                {station.tags.map((tag, i) => <WashiTag key={i}>{tag[lang]}</WashiTag>)}
            </div>
        </ChapterFrame>
    );
}

injectStyles('fj-station-styles', `
/* spotlight */
.fj-spot { margin-bottom: 30px; }
.fj-spot-head { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
.fj-spot-title { margin: 0; font-family: var(--fj-font-display); font-size: 21px; font-weight: 500; color: var(--fj-ink); }
.fj-spot-cap { margin: 12px 0 0; font-size: 12.5px; line-height: 1.6; color: var(--fj-ink-3); max-width: 620px; }

/* duty cards */
.fj-duty-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
.fj-duty { position: relative; padding: 18px 18px 16px; }
.fj-duty-num { position: absolute; top: 14px; right: 16px; font-family: var(--fj-font-data); font-size: 11px; color: var(--fj-accent-ink); opacity: 0.75; }
.fj-duty-title { margin: 0 26px 8px 0; font-family: var(--fj-font-display); font-size: 16.5px; font-weight: 500; line-height: 1.4; color: var(--fj-ink); }
.fj-duty-body { margin: 0; font-size: 13.5px; line-height: 1.62; color: var(--fj-ink-2); }
html.lang-zh .fj-duty-body { line-height: 1.85; }

.fj-station-tags { display: flex; gap: 9px; flex-wrap: wrap; margin-top: 22px; }
`);
