import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterFrame, { injectStyles, useI18n, DrawnPath, WashiTag, stagger, riseItem, accentVars } from './shared/fjKit.jsx';
import { CHAPTERS, STATIONS } from './data/fjContent.js';

const COPY = {
    en: {
        lead: 'Three institutions, one continuous route: a hospital floor, a small welfare association, a ministry-level center. Tap a station to jump to its chapter.',
        go: 'Read this station →',
    },
    zh: {
        lead: '三個機構，一條連續的路：醫院第一線、小小的社福協會、部級中心。點任何一站，直接跳到那一章。',
        go: '讀這一站 →',
    },
};

const chapter = CHAPTERS.find(c => c.key === 'C02');

// Hand-drawn landmark glyphs, one per station `landmark` key.
function Landmark({ kind }) {
    const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
    return (
        <svg viewBox="0 0 36 36" width="42" height="42" aria-hidden="true" focusable="false">
            {kind === 'hospital' && (
                <g {...common}>
                    <rect x="5" y="11" width="26" height="20" rx="2" />
                    <path d="M18 16v8M14 20h8" />
                    <path d="M12 11V7h12v4" />
                </g>
            )}
            {kind === 'house' && (
                <g {...common}>
                    <path d="M4 18 L18 5 L32 18" />
                    <path d="M8 17v14h20V17" />
                    <path d="M18 27c-3-2.4-4.6-4.4-3.4-6 1-1.4 2.7-1 3.4.2.7-1.2 2.4-1.6 3.4-.2 1.2 1.6-.4 3.6-3.4 6z" />
                </g>
            )}
            {kind === 'civic' && (
                <g {...common}>
                    <path d="M4 13 L18 5 L32 13" />
                    <path d="M8 16v12M14.5 16v12M21.5 16v12M28 16v12" />
                    <path d="M5 31h26" />
                </g>
            )}
        </svg>
    );
}

export default function C02_StationMap() {
    const { lang } = useI18n();
    const reduced = useReducedMotion();
    const c = COPY[lang] ?? COPY.en;
    const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <ChapterFrame chapter={chapter} lead={c.lead}>
            <div className="fj-map">
                <div className="fj-map-route" aria-hidden="true">
                    <svg viewBox="0 0 900 90" preserveAspectRatio="none" focusable="false">
                        <DrawnPath
                            d="M20 64 C 90 24, 130 78, 150 54 C 240 20, 320 84, 450 48 C 560 16, 640 86, 750 50 C 800 34, 850 62, 884 44"
                            stroke="var(--fj-ink-3)" strokeWidth="2" duration={1.8}
                            vectorEffect="non-scaling-stroke"
                        />
                        {[[150, 54], [450, 48], [750, 50]].map(([x, y], i) => (
                            <circle key={i} cx={x} cy={y} r="6" fill={STATIONS[i].accent} stroke="var(--fj-paper-0)" strokeWidth="2.5" />
                        ))}
                    </svg>
                </div>
                <motion.div
                    className="fj-map-stops"
                    variants={stagger(0.15)}
                    initial={reduced ? false : 'hidden'}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {STATIONS.map((s, i) => (
                        <motion.button
                            key={s.id}
                            className="fj-card fj-map-stop"
                            style={accentVars(s)}
                            variants={riseItem}
                            onClick={() => go(s.chapterId)}
                        >
                            <span className="fj-map-glyph"><Landmark kind={s.landmark} /></span>
                            <span className="fj-eyebrow">STATION {String(i + 1).padStart(2, '0')}</span>
                            <span className="fj-map-name">{s.name[lang]}</span>
                            <span className="fj-map-chips">
                                <WashiTag>{s.sector[lang]}</WashiTag>
                                <WashiTag>{s.size[lang]}</WashiTag>
                            </span>
                            <span className="fj-map-go">{c.go}</span>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </ChapterFrame>
    );
}

injectStyles('fj-c02-styles', `
.fj-map-route { margin: 0 6px -6px; }
.fj-map-route svg { display: block; width: 100%; height: 74px; }
.fj-map-stops { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.fj-map-stop { display: flex; flex-direction: column; align-items: flex-start; gap: 9px; padding: 22px 22px 18px; transition: transform 200ms var(--fj-ease), box-shadow 200ms var(--fj-ease), border-color 200ms var(--fj-ease); }
.fj-map-stop:hover { transform: translateY(-3px) rotate(-0.3deg); border-color: var(--fj-accent); box-shadow: 3px 5px 0 var(--fj-accent-soft); }
.fj-map-glyph { color: var(--fj-accent-ink); }
.fj-map-name { font-family: var(--fj-font-display); font-size: 19px; font-weight: 500; line-height: 1.35; color: var(--fj-ink); }
.fj-map-chips { display: flex; gap: 7px; flex-wrap: wrap; }
.fj-map-go { margin-top: 6px; font-family: var(--fj-font-data); font-size: 11.5px; letter-spacing: 0.05em; color: var(--fj-accent-ink); }
@media (max-width: 767px) {
  .fj-map-route { display: none; }
  .fj-map-stops { grid-template-columns: 1fr; gap: 14px; }
}
`);
