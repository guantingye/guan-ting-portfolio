import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView } from '../../evidence-lab/shared/labKit.jsx';
import { BADGES, STATIONS, SHELL } from '../data/fjContent.js';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView };

// ---- station accent plumbing ----------------------------------------------
// One stylesheet serves all three stations: chapters stamp these vars on their
// root and every chip/rule/mark below reads them.
export const accentVars = station => station ? {
    '--fj-accent': station.accent,
    '--fj-accent-ink': station.accentInk,
    '--fj-accent-soft': station.accentSoft,
} : undefined;

// ---- motion helpers ---------------------------------------------------------
export const FJ_EASE = [0.22, 1, 0.36, 1];

// Scroll-reveal wrapper (motion whileInView, reduced-motion gated the same way
// as src/components/home/MotionSection.jsx).
export function Rise({ children, delay = 0, y = 24, className, ...rest }) {
    const reduced = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduced ? false : { opacity: 0, y }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: '0px 0px -48px 0px' }}
            transition={{ duration: 0.7, delay, ease: FJ_EASE }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

// Variants for staggered card grids. Parent: initial={reduced ? false : 'hidden'}
// whileInView="show" viewport={{ once: true, amount: 0.15 }}.
export const stagger = (delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren } },
});
export const riseItem = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: FJ_EASE } },
};

// Self-drawing SVG path. Solid strokes only — motion drives pathLength through
// stroke-dasharray, so a custom dash pattern would be overwritten.
export function DrawnPath({ d, stroke = 'var(--fj-accent-ink, #33291D)', strokeWidth = 2, duration = 1.2, delay = 0, ...rest }) {
    const reduced = useReducedMotion();
    return (
        <motion.path
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={reduced ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration, delay, ease: 'easeInOut' }}
            {...rest}
        />
    );
}

export function onActivate(fn) {
    return e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); } };
}

// ---- authenticity stamp (paper dialect: tilted rubber stamp) ---------------
export function AuthStamp({ tier }) {
    const { lang } = useI18n();
    const b = BADGES[tier];
    return (
        <span className={`fj-stamp fj-stamp--${tier}`} title={b[lang] ?? b.en}>
            {b.term}
            <span className="fj-sr-only"> — {b[lang] ?? b.en}</span>
        </span>
    );
}

// ---- washi-tape tag ---------------------------------------------------------
export function WashiTag({ children }) {
    return <span className="fj-tag">{children}</span>;
}

// ---- paper card -------------------------------------------------------------
export function PaperCard({ children, className = '', ...rest }) {
    return <div className={`fj-card ${className}`} {...rest}>{children}</div>;
}

// ---- torn paper edge --------------------------------------------------------
// Deterministic irregular edge from two mixed sines — no assets, no randomness.
const TORN_PTS = Array.from({ length: 49 }, (_, i) => {
    const x = ((1440 / 48) * i).toFixed(1);
    const y = (19 + 9 * Math.sin(i * 1.7) + 5 * Math.sin(i * 3.13 + 1.2)).toFixed(1);
    return `L${x},${y}`;
}).join(' ');
const TORN_PATH = `M0,42 ${TORN_PTS} L1440,42 Z`;

export function TornEdge({ flip = false }) {
    return (
        <div className={`fj-torn${flip ? ' fj-torn--flip' : ''}`} aria-hidden="true">
            <svg viewBox="0 0 1440 42" preserveAspectRatio="none" focusable="false">
                <path d={TORN_PATH} fill="var(--fj-paper-0)" />
            </svg>
        </div>
    );
}

// ---- photo / artifact slot ---------------------------------------------------
// `photo.src` resolves from public/field-journey/. A supplied `onOpen` turns a
// real image into an accessible thumbnail button; null sources retain the
// awaiting-scan fallback for future evidence.
export function PhotoSlot({ photo, onOpen }) {
    const { lang } = useI18n();
    const station = STATIONS.find(s => s.id === photo.station);
    const src = photo.src ? `${import.meta.env.BASE_URL}field-journey/${photo.src}` : null;
    const pendingLabel = lang === 'zh' ? '照片整理中' : 'Scan on its way';
    const openLabel = lang === 'zh' ? '放大查看' : 'Enlarge';
    const title = photo.title[lang] ?? photo.title.en;
    const photoStyle = { ...accentVars(station), '--fj-photo-ratio': photo.aspectRatio ?? '4 / 3' };
    const openPhoto = () => onOpen?.({ ...photo, src });
    return (
        <figure className={`fj-photo${photo.layout ? ` fj-photo--${photo.layout}` : ''}`} style={photoStyle}>
            <span className="fj-photo-tape" aria-hidden="true" />
            <div className="fj-photo-frame">
                {src ? (
                    <button className="fj-photo-button" type="button" onClick={openPhoto} aria-label={`${openLabel}: ${title}`}>
                        <img src={src} alt={title} loading="lazy" decoding="async" />
                    </button>
                ) : (
                    <div className="fj-photo-empty" role="img" aria-label={`${title}: ${pendingLabel}`}>
                        <svg viewBox="0 0 44 36" width="44" height="36" fill="none" stroke="currentColor"
                            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="2" y="8" width="40" height="26" rx="4" />
                            <path d="M14 8l3-5h10l3 5" />
                            <circle cx="22" cy="21" r="7" />
                        </svg>
                        <span>{pendingLabel}</span>
                    </div>
                )}
            </div>
            <figcaption className="fj-photo-cap">
                <strong>{title}</strong>
                <span>{photo.note[lang] ?? photo.note.en}</span>
                {station && <span className="fj-photo-station">{station.short[lang]}</span>}
            </figcaption>
        </figure>
    );
}

// ---- chapter frame (storybook dialect — no file-cabinet dispatch header) ----
export default function ChapterFrame({ chapter, station, title, lead, note, children }) {
    const { lang } = useI18n();
    const shell = SHELL[lang] ?? SHELL.en;
    const sIdx = station ? STATIONS.findIndex(s => s.id === station.id) : -1;
    const eyebrow = station
        ? `${shell.stationWord} ${String(sIdx + 1).padStart(2, '0')}`
        : `${shell.chapterLabel} ${chapter.num}`;
    return (
        <section className="fj fj-chapter" id={chapter.id} aria-labelledby={`${chapter.id}-t`} style={accentVars(station)}>
            <div className="fj-ch-eyebrow">
                <span className="fj-eyebrow">
                    {eyebrow}
                    {station && <span className="fj-ch-org">· {station.name[lang]}</span>}
                </span>
                <AuthStamp tier={chapter.badge} />
            </div>
            <h3 className="fj-display fj-ch-title" id={`${chapter.id}-t`}>{title ?? chapter.title[lang]}</h3>
            {lead && <p className="fj-ch-lead">{lead}</p>}
            {station && (
                <div className="fj-ch-meta">
                    <WashiTag>{station.role[lang]}</WashiTag>
                    <WashiTag>{station.sector[lang]}</WashiTag>
                    <WashiTag>{station.size[lang]}</WashiTag>
                </div>
            )}
            <div className="fj-ch-body">{children}</div>
            {note && (
                <aside className="fj-note">
                    <span className="fj-note-label">{shell.noteLabel}</span>
                    <p className="fj-note-text">{note}</p>
                </aside>
            )}
        </section>
    );
}

// ---- shared tokens + primitives ---------------------------------------------
// Style-tag id carries the -styles suffix so it can never collide with a
// section id (documented gotcha: strategy-platform/AUDIT.md).
const GRAIN = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">'
    + '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>'
    + '<feColorMatrix type="saturate" values="0"/></filter>'
    + '<rect width="180" height="180" filter="url(#n)" opacity="0.05"/></svg>');

injectStyles('fj-shared-styles', `
.fj {
  --fj-paper-0: #F6EFE0;
  --fj-paper-1: #FBF6EA;
  --fj-paper-2: #EDE3CC;
  --fj-line: rgba(59,50,38,0.16);
  --fj-line-soft: rgba(59,50,38,0.09);
  --fj-ink: #33291D;
  --fj-ink-2: #5C5240;
  --fj-ink-3: #8A7E68;
  --fj-dusk: #141122;
  --fj-accent: #B08D57;
  --fj-accent-ink: #6E5426;
  --fj-accent-soft: rgba(176,141,87,0.16);
  --fj-font-display: 'Fraunces', 'Noto Serif TC', Georgia, serif;
  --fj-font-body: 'Plus Jakarta Sans', 'Noto Sans TC', sans-serif;
  --fj-font-data: 'JetBrains Mono', monospace;
  --fj-r-sm: 6px;
  --fj-r-md: 10px;
  --fj-r-lg: 16px;
  --fj-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --fj-shadow: 2px 3px 0 rgba(59,50,38,0.08);
  font-family: var(--fj-font-body);
  color: var(--fj-ink-2);
  font-size: 16px;
  line-height: 1.68;
}
.fj *, .fj *::before, .fj *::after { box-sizing: border-box; }
:where(.fj button) { font: inherit; color: inherit; background: none; border: none; padding: 0; margin: 0; text-align: inherit; cursor: pointer; }
.fj :is(button, a, input, [tabindex="0"], [role="button"]):focus-visible {
  outline: 2px solid var(--fj-accent-ink); outline-offset: 3px; border-radius: 3px;
}
.fj-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
html.lang-zh .fj { line-height: 1.95; letter-spacing: 0.01em; }

.fj-eyebrow { font-family: var(--fj-font-data); font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--fj-accent-ink); }
.fj-display { font-family: var(--fj-font-display); font-weight: 500; color: var(--fj-ink); letter-spacing: -0.008em; line-height: 1.18; margin: 0; }
html.lang-zh .fj-display { letter-spacing: 0.02em; line-height: 1.36; }

/* ---- torn paper edge ---- */
.fj-torn { display: block; line-height: 0; margin-bottom: -1px; }
.fj-torn svg { display: block; width: 100%; height: clamp(20px, 3vw, 36px); }
.fj-torn--flip { margin-bottom: 0; margin-top: -1px; transform: scaleY(-1); }

/* ---- chapter frame ---- */
.fj-chapter { margin: 0 0 clamp(56px, 8vw, 88px); }
.fj-ch-eyebrow { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.fj-ch-org { text-transform: none; letter-spacing: 0.04em; margin-left: 8px; color: var(--fj-ink-3); }
.fj-ch-title { font-size: clamp(27px, 3.4vw, 40px); }
.fj-ch-lead { margin: 14px 0 0; max-width: 640px; font-size: 16.5px; color: var(--fj-ink-2); }
.fj-ch-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
.fj-ch-body { margin-top: 26px; }

/* field-note strip */
.fj-note { display: flex; align-items: baseline; gap: 14px; margin-top: 30px; padding: 14px 18px; background: var(--fj-paper-2); border-left: 3px solid var(--fj-accent); border-radius: 0 var(--fj-r-sm) var(--fj-r-sm) 0; }
.fj-note-label { flex: 0 0 auto; font-family: var(--fj-font-data); font-size: 10.5px; font-weight: 500; letter-spacing: 0.14em; color: var(--fj-accent-ink); }
.fj-note-text { margin: 0; font-family: var(--fj-font-display); font-style: italic; font-size: 16.5px; line-height: 1.6; color: var(--fj-ink); }
html.lang-zh .fj-note-text { font-style: normal; }

/* ---- authenticity stamp ---- */
.fj-stamp { display: inline-flex; align-items: center; font-family: var(--fj-font-data); font-size: 10px; font-weight: 600; letter-spacing: 0.14em; padding: 3px 9px; border: 1.4px dashed currentColor; border-radius: 4px; transform: rotate(-1.6deg); white-space: nowrap; cursor: help; background: rgba(255,255,255,0.35); }
.fj-stamp--real { color: #4F5D2D; }
.fj-stamp--reconstructed { color: #9C4A1B; }
.fj-stamp--illustrative { color: var(--fj-ink-3); }

/* ---- washi tag ---- */
.fj-tag { display: inline-flex; align-items: center; font-family: var(--fj-font-data); font-size: 10.5px; letter-spacing: 0.05em; color: var(--fj-accent-ink); background: var(--fj-accent-soft); padding: 3px 10px; border-radius: 2px; transform: rotate(-0.6deg); box-shadow: var(--fj-shadow); }
.fj-tag:nth-child(2n) { transform: rotate(0.7deg); }

/* ---- paper card ---- */
.fj-card { background: var(--fj-paper-1); border: 1px solid var(--fj-line); border-radius: var(--fj-r-md); box-shadow: var(--fj-shadow); padding: 18px 20px; }

/* ---- photo slot ---- */
.fj-photo { position: relative; margin: 0; background: var(--fj-paper-1); border: 1px solid var(--fj-line); border-radius: 3px; box-shadow: var(--fj-shadow); padding: 10px 10px 12px; transform: rotate(-0.5deg); }
.fj-photo:nth-child(2n) { transform: rotate(0.6deg); }
.fj-photo:nth-child(3n) { transform: rotate(-0.9deg); }
.fj-photo-tape { position: absolute; top: -9px; left: 50%; width: 74px; height: 20px; transform: translateX(-50%) rotate(-2deg); background: var(--fj-accent-soft); border-left: 1px dashed rgba(59,50,38,0.14); border-right: 1px dashed rgba(59,50,38,0.14); opacity: 0.9; }
.fj-photo-frame { background: var(--fj-paper-2); border: 1px solid var(--fj-line-soft); aspect-ratio: var(--fj-photo-ratio); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.fj-photo-button { width: 100%; height: 100%; display: block; overflow: hidden; cursor: zoom-in !important; }
.fj-photo-button img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 220ms var(--fj-ease); }
.fj-photo-button:hover img { transform: scale(1.025); }
.fj-photo-button:active img { transform: scale(0.99); }
.fj-photo-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--fj-ink-3); font-family: var(--fj-font-data); font-size: 11px; letter-spacing: 0.08em; padding: 12px; text-align: center; border: 1.4px dashed var(--fj-line); border-radius: var(--fj-r-sm); margin: 12px; width: calc(100% - 24px); height: calc(100% - 24px); justify-content: center; }
.fj-photo-cap { display: flex; flex-direction: column; gap: 2px; padding: 10px 4px 0; }
.fj-photo-cap strong { font-family: var(--fj-font-display); font-weight: 500; font-size: 14.5px; color: var(--fj-ink); }
.fj-photo-cap span { font-size: 12px; color: var(--fj-ink-3); line-height: 1.5; }
.fj-photo-station { font-family: var(--fj-font-data); font-size: 10px !important; letter-spacing: 0.1em; color: var(--fj-accent-ink) !important; margin-top: 4px; }

@media (max-width: 767px) {
  .fj-ch-eyebrow { flex-direction: column; align-items: flex-start; gap: 8px; }
}
@media (prefers-reduced-motion: reduce) {
  .fj *, .fj *::before, .fj *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
}
`);

// Paper background + grain live on the zone-level classes (used by the entry).
injectStyles('fj-paper-styles', `
.fj-paper { position: relative; background: var(--fj-paper-0, #F6EFE0); }
.fj-paper::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: url("${GRAIN}"), repeating-linear-gradient(0deg, rgba(59,50,38,0.012) 0 1px, transparent 1px 7px); }
.fj-paper > * { position: relative; z-index: 1; }
`);
