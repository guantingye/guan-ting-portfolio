import React, { useEffect, useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { injectStyles, usePrefersReducedMotion, useViewport } from '../../launch-os/shared/ModuleFrame.jsx';
import { useI18n } from '../../launch-os/shared/useI18n.js';
import { useInView } from '../../evidence-lab/shared/labKit.jsx';
import { BADGES, SHELL } from '../data/blContent.js';

export { injectStyles, usePrefersReducedMotion, useViewport, useI18n, useInView };

// ---- accent-color plumbing ---------------------------------------------------
// ChapterFrame stamps these vars on its root when a chapter passes an `accent`
// (e.g. the TSCN gold, the OHBM teal) so its badges/notes pick up the color.
export const accentVars = net => net ? {
    '--bl-accent': net.accent,
    '--bl-accent-ink': net.accentInk,
    '--bl-accent-soft': net.accentSoft,
} : undefined;

// ---- motion helpers ---------------------------------------------------------
export const BL_EASE = [0.22, 1, 0.36, 1];

// Scroll-reveal wrapper — same reduced-motion gating as home/MotionSection.jsx.
export function Rise({ children, delay = 0, y = 18, className, ...rest }) {
    const reduced = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduced ? false : { opacity: 0, y }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: '0px 0px -48px 0px' }}
            transition={{ duration: 0.6, delay, ease: BL_EASE }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

export const stagger = (delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren } },
});
export const riseItem = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: BL_EASE } },
};

// Self-drawing SVG path — pathLength driven by motion, solid strokes only.
export function DrawnPath({ d, stroke = 'var(--bl-accent-ink, #1B1D24)', strokeWidth = 2, duration = 1.2, delay = 0, ...rest }) {
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

// Count-up readout for connectivity/engagement figures. Reduced motion (or no
// IntersectionObserver) jumps straight to the final value.
export function CountUp({ value, decimals = 2, prefix = '', suffix = '', duration = 1.1, className }) {
    const reduced = useReducedMotion();
    const [ref, inView] = useInView({ once: true, amount: 0.6 });
    const [display, setDisplay] = useState(reduced ? value : 0);

    useEffect(() => {
        if (reduced) { setDisplay(value); return; }
        if (!inView) return;
        let raf;
        const start = performance.now();
        const tick = now => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => raf && cancelAnimationFrame(raf);
    }, [inView, reduced, value, duration]);

    return <span ref={ref} className={className}>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

// ---- peer-review stamp -------------------------------------------------------
export function AuthStamp({ tier }) {
    const { lang } = useI18n();
    const b = BADGES[tier] ?? BADGES.real;
    return (
        <span className={`bl-stamp bl-stamp--${tier}`} title={b[lang] ?? b.en}>
            {b.term}
            <span className="bl-sr-only"> — {b[lang] ?? b.en}</span>
        </span>
    );
}

// ---- flat tag chip -----------------------------------------------------------
export function Tag({ children }) {
    return <span className="bl-tag">{children}</span>;
}

// ---- figure wrapper (Figure N. caption, journal-plate convention) ------------
export function Figure({ num, title, caption, children, className = '' }) {
    const { lang } = useI18n();
    const t = SHELL[lang] ?? SHELL.en;
    return (
        <figure className={`bl-figure ${className}`}>
            <div className="bl-figure-body">{children}</div>
            {(title || caption) && (
                <figcaption className="bl-figure-cap">
                    <strong>{t.figureLabel} {num}.</strong> {title && <span className="bl-figure-title">{title}</span>}
                    {caption && <span className="bl-figure-note"> {caption}</span>}
                </figcaption>
            )}
        </figure>
    );
}

// ---- signal edge (this layer's answer to field-journey's torn-paper edge) ---
// A deterministic EEG/fMRI-style trace: a calm sine baseline carrying one
// asymmetric hemodynamic-response bump and two sharp spike bursts (raised-
// cosine envelopes gating a local sine — smooth in, smooth out, no seams).
// The paper fill rises to meet the trace from below, mirroring TornEdge's
// jagged-silhouette technique but themed to the layer's own subject matter.
const SIG_W = 1440, SIG_H = 64, SIG_BASE = 36, SIG_N = 160;
function sigEnvelope(x, cx, halfWidth) {
    const t = (x - cx) / halfWidth;
    return Math.abs(t) > 1 ? 0 : Math.cos(t * Math.PI / 2) ** 2;
}
function sigY(x) {
    let y = SIG_BASE + 2.4 * Math.sin(x * 0.014) + 1.1 * Math.sin(x * 0.037 + 0.6);
    y += sigEnvelope(x, 260, 60) * 15 * Math.sin((x - 260) * 0.55);   // spike burst 1
    y += sigEnvelope(x, 980, 50) * 11 * Math.sin((x - 980) * 0.62);   // spike burst 2
    const cx = 650, hw = x < cx ? 90 : 170;                            // hemodynamic bump: fast rise, slow decay
    y -= sigEnvelope(x, cx, hw) * 13;
    return y;
}
const SIG_LINE_TO = Array.from({ length: SIG_N + 1 }, (_, i) => {
    const x = (SIG_W / SIG_N) * i;
    return `${x.toFixed(1)},${sigY(x).toFixed(2)}`;
}).join(' L');
const SIGNAL_WAVE_D = `M${SIG_LINE_TO}`;
const SIGNAL_FILL_D = `M0,${SIG_H} L${SIG_LINE_TO} L${SIG_W},${SIG_H} Z`;

export function SignalEdge({ flip = false }) {
    const gradId = `bl-signal-grad-${useId()}`;
    return (
        <div className={`bl-signal${flip ? ' bl-signal--flip' : ''}`} aria-hidden="true">
            <svg viewBox={`0 0 ${SIG_W} ${SIG_H}`} preserveAspectRatio="none" focusable="false">
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="var(--bl-fpn)" />
                        <stop offset="1" stopColor="var(--bl-sn)" />
                    </linearGradient>
                </defs>
                <path d={SIGNAL_FILL_D} fill="var(--bl-paper-0)" />
                <DrawnPath d={SIGNAL_WAVE_D} stroke="var(--bl-fpn)" strokeWidth={7} duration={1.6} opacity={0.22} vectorEffect="non-scaling-stroke" />
                <DrawnPath d={SIGNAL_WAVE_D} stroke={`url(#${gradId})`} strokeWidth={2.2} duration={1.6} delay={0.06} vectorEffect="non-scaling-stroke" />
            </svg>
        </div>
    );
}

// ---- photographic plate (figure-N.., not washi-taped album) -----------------
export function Plate({ photo, num }) {
    const { lang } = useI18n();
    const src = photo.src ? `${import.meta.env.BASE_URL}brain-and-learning/${photo.src}` : null;
    const pendingLabel = lang === 'zh' ? '掃描檔整理中' : 'Scan on its way';
    return (
        <figure className="bl-plate">
            <div className="bl-plate-frame">
                {src ? (
                    <img src={src} alt={photo.title[lang]} loading="lazy" decoding="async" />
                ) : (
                    <div className="bl-plate-empty" role="img" aria-label={`${photo.title[lang]} — ${pendingLabel}`}>
                        <svg viewBox="0 0 44 36" width="40" height="32" fill="none" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="2" y="8" width="40" height="26" rx="3" />
                            <path d="M14 8l3-5h10l3 5" />
                            <circle cx="22" cy="21" r="6.5" />
                        </svg>
                        <span>{pendingLabel}</span>
                    </div>
                )}
            </div>
            <figcaption className="bl-plate-cap">
                <strong>{lang === 'zh' ? '圖版' : 'Plate'} {num}.</strong> {photo.title[lang]}
                <span className="bl-plate-note">{photo.note[lang]}</span>
            </figcaption>
        </figure>
    );
}

// ---- chapter frame (journal-article dialect) ---------------------------------
export default function ChapterFrame({ chapter, accent, eyebrowSuffix, title, lead, note, noteLabel, children }) {
    const { lang } = useI18n();
    const shell = SHELL[lang] ?? SHELL.en;
    return (
        <section className="bl bl-chapter" id={chapter.id} aria-labelledby={`${chapter.id}-t`} style={accentVars(accent)}>
            <div className="bl-ch-eyebrow">
                <span className="bl-eyebrow">
                    {shell.chapterLabel} {chapter.num}
                    {eyebrowSuffix && <span className="bl-ch-suffix"> · {eyebrowSuffix}</span>}
                </span>
                <AuthStamp tier={chapter.badge} />
            </div>
            <h3 className="bl-display bl-ch-title" id={`${chapter.id}-t`}>{title ?? chapter.title[lang]}</h3>
            {lead && <p className="bl-ch-lead">{lead}</p>}
            <div className="bl-ch-body">{children}</div>
            {note && (
                <aside className="bl-note">
                    <span className="bl-note-label">{noteLabel ?? shell.noteLabel}</span>
                    <p className="bl-note-text">{note}</p>
                </aside>
            )}
        </section>
    );
}

// ---- shared tokens + primitives ---------------------------------------------
// Style-tag id carries the -styles suffix so it can never collide with a
// section id (documented gotcha: field-journey/AUDIT.md, strategy-platform/AUDIT.md).
injectStyles('bl-shared-styles', `
.bl {
  --bl-paper-0: #F7F6F1;
  --bl-paper-1: #FCFBF7;
  --bl-paper-2: #ECEAE1;
  --bl-line: rgba(27,29,36,0.14);
  --bl-line-soft: rgba(27,29,36,0.08);
  --bl-ink: #1B1D24;
  --bl-ink-2: #3B3F4C;
  --bl-ink-3: #767B89;
  --bl-dusk: #101018;
  --bl-accent: #5B6CF0;
  --bl-accent-ink: #3541B8;
  --bl-accent-soft: rgba(91,108,240,0.12);
  --bl-fpn: #5B6CF0;
  --bl-fpn-ink: #3541B8;
  --bl-sn: #E5734E;
  --bl-sn-ink: #B84D2A;
  --bl-font-display: 'Fraunces', 'Noto Serif TC', Georgia, serif;
  --bl-font-body: 'Plus Jakarta Sans', 'Noto Sans TC', sans-serif;
  --bl-font-data: 'JetBrains Mono', monospace;
  --bl-r-sm: 3px;
  --bl-r-md: 6px;
  --bl-r-lg: 10px;
  --bl-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--bl-font-body);
  color: var(--bl-ink-2);
  font-size: 15.5px;
  line-height: 1.68;
}
.bl *, .bl *::before, .bl *::after { box-sizing: border-box; }
:where(.bl button) { font: inherit; color: inherit; background: none; border: none; padding: 0; margin: 0; text-align: inherit; cursor: pointer; }
.bl :is(button, a, input, [tabindex="0"], [role="button"]):focus-visible {
  outline: 2px solid var(--bl-accent-ink); outline-offset: 3px; border-radius: 2px;
}
.bl-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
html.lang-zh .bl { line-height: 1.92; letter-spacing: 0.01em; }

.bl-eyebrow { font-family: var(--bl-font-data); font-size: 10.5px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--bl-accent-ink); }
.bl-display { font-family: var(--bl-font-display); font-weight: 500; color: var(--bl-ink); letter-spacing: -0.008em; line-height: 1.16; margin: 0; }
html.lang-zh .bl-display { letter-spacing: 0.015em; line-height: 1.34; }

/* ---- signal edge (journal-paper's answer to a torn-paper edge) ---- */
.bl-signal { position: relative; display: block; line-height: 0; margin-bottom: -1px; background: #0E0F1E; }
.bl-signal svg { display: block; width: 100%; height: clamp(28px, 4vw, 46px); }
.bl-signal--flip { margin-bottom: 0; margin-top: -1px; transform: scaleY(-1); background: #070710; }

/* ---- chapter frame ---- */
.bl-chapter { margin: 0 0 clamp(52px, 7vw, 80px); padding-top: clamp(28px, 4vw, 44px); border-top: 1px solid var(--bl-line); }
.bl-ch-eyebrow { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
.bl-ch-suffix { text-transform: none; letter-spacing: 0.04em; color: var(--bl-ink-3); }
.bl-ch-title { font-size: clamp(25px, 3.1vw, 36px); }
.bl-ch-lead { margin: 12px 0 0; max-width: 660px; font-size: 15.5px; line-height: 1.7; color: var(--bl-ink-2); }
.bl-ch-body { margin-top: 24px; }

/* research-note callout (Box-style sidebar) */
.bl-note { display: flex; align-items: baseline; gap: 14px; margin-top: 28px; padding: 14px 18px; background: var(--bl-paper-2); border-left: 3px solid var(--bl-accent); border-radius: 0 var(--bl-r-sm) var(--bl-r-sm) 0; }
.bl-note-label { flex: 0 0 auto; font-family: var(--bl-font-data); font-size: 10px; font-weight: 600; letter-spacing: 0.14em; color: var(--bl-accent-ink); text-transform: uppercase; }
.bl-note-text { margin: 0; font-family: var(--bl-font-display); font-style: italic; font-size: 15.5px; line-height: 1.6; color: var(--bl-ink); }
html.lang-zh .bl-note-text { font-style: normal; }

/* ---- peer-review stamp ---- */
.bl-stamp { display: inline-flex; align-items: center; font-family: var(--bl-font-data); font-size: 9.5px; font-weight: 600; letter-spacing: 0.13em; padding: 3px 8px; border: 1px solid currentColor; border-radius: 3px; white-space: nowrap; cursor: help; }
.bl-stamp--real { color: #3D5A3A; background: rgba(61,90,58,0.06); }
.bl-stamp--illustrative { color: #9C6B12; background: rgba(156,107,18,0.07); border-style: dashed; }

/* ---- flat tag chip ---- */
.bl-tag { display: inline-flex; align-items: center; font-family: var(--bl-font-data); font-size: 10px; letter-spacing: 0.05em; color: var(--bl-accent-ink); background: var(--bl-accent-soft); padding: 3px 10px; border-radius: 3px; }

/* ---- hairline card ---- */
.bl-card { background: var(--bl-paper-1); border: 1px solid var(--bl-line); border-radius: var(--bl-r-md); padding: 18px 20px; }

/* ---- pipeline pills (shared by Methods + ML Classification chapters) ---- */
.bl-pipe-row { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0; align-items: center; }
.bl-pipe-step { display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--bl-ink-2); background: var(--bl-paper-2); border: 1px solid var(--bl-line); border-radius: 999px; padding: 5px 12px 5px 6px; }
.bl-pipe-step::after { content: '→'; margin-left: 7px; margin-right: -5px; color: var(--bl-ink-3); }
.bl-pipe-step:last-child::after { content: none; }
.bl-pipe-step.is-final { background: var(--bl-accent-soft); border-color: var(--bl-accent); color: var(--bl-accent-ink); font-weight: 600; }
.bl-pipe-num { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; background: var(--bl-paper-1); border: 1.2px solid var(--bl-line); font-family: var(--bl-font-data); font-size: 9.5px; color: var(--bl-accent-ink); }

/* ---- figure ---- */
.bl-figure { margin: 20px 0 0; }
.bl-figure-body { background: var(--bl-paper-1); border: 1px solid var(--bl-line); border-radius: var(--bl-r-lg); padding: clamp(16px, 3vw, 26px); }
.bl-figure-body img { display: block; width: 100%; height: auto; border-radius: 3px; }
.bl-figure-body figure { margin: 0; }
.bl-fig-duo { display: grid; grid-template-columns: 1.3fr 1fr; gap: clamp(14px, 2.4vw, 22px); align-items: stretch; }
.bl-fig-duo > div { display: flex; flex-direction: column; }
.bl-fig-duo img { flex: 1; object-fit: contain; background: #fff; }
.bl-fig-sub { display: block; margin: 8px 2px 0; font-size: 11.5px; line-height: 1.55; color: var(--bl-ink-3); }
@media (max-width: 720px) {
  .bl-fig-duo { grid-template-columns: 1fr; }
}
.bl-figure-cap { margin: 12px 2px 0; font-size: 12.5px; line-height: 1.65; color: var(--bl-ink-3); max-width: 680px; }
.bl-figure-cap strong { font-family: var(--bl-font-data); font-size: 11px; letter-spacing: 0.06em; color: var(--bl-ink-2); }
.bl-figure-title { font-weight: 600; color: var(--bl-ink-2); }

/* ---- side-photo layout (real conference/award photos alongside prose) ---- */
.bl-side-layout { display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 26px; align-items: start; }
.bl-side-photo { margin: 4px 0 0; }
.bl-side-photo img { width: 100%; height: auto; display: block; border-radius: var(--bl-r-md); border: 1px solid var(--bl-line); }
.bl-side-photo figcaption { margin-top: 8px; font-size: 11.5px; line-height: 1.5; color: var(--bl-ink-3); }
.bl-logo-banner { display: block; height: 40px; width: auto; margin: 2px 0 18px; }
@media (max-width: 760px) {
  .bl-side-layout { grid-template-columns: 1fr; }
  .bl-side-photo { max-width: 320px; }
}

/* ---- photographic plate ---- */
.bl-plate { margin: 0; background: var(--bl-paper-1); border: 1px solid var(--bl-line); border-radius: var(--bl-r-md); overflow: hidden; }
.bl-plate-frame { background: var(--bl-paper-2); border-bottom: 1px solid var(--bl-line); aspect-ratio: 4 / 3; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.bl-plate-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bl-plate-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--bl-ink-3); font-family: var(--bl-font-data); font-size: 10.5px; letter-spacing: 0.07em; padding: 12px; text-align: center; }
.bl-plate-cap { display: flex; flex-direction: column; gap: 2px; padding: 11px 13px 13px; font-size: 12.5px; color: var(--bl-ink-2); }
.bl-plate-cap strong { font-family: var(--bl-font-data); font-size: 10.5px; letter-spacing: 0.06em; color: var(--bl-accent-ink); text-transform: uppercase; }
.bl-plate-note { color: var(--bl-ink-3); font-size: 12px; margin-top: 2px; }

@media (max-width: 767px) {
  .bl-ch-eyebrow { flex-direction: column; align-items: flex-start; gap: 8px; }
}
@media (prefers-reduced-motion: reduce) {
  .bl *, .bl *::before, .bl *::after { animation: none !important; transition-duration: 120ms !important; transition-property: opacity, background-color, border-color, color !important; }
}
`);
