import React from 'react';
import { injectStyles, useI18n, Rise, DrawnPath } from './shared/fjKit.jsx';
import { CHAPTERS, STATIONS } from './data/fjContent.js';

// C01 — the dark→light threshold. Its three-panel field atlas condenses the
// journey before the route continues into the paper zone below.
const COPY = {
    en: {
        lines: [
            'Every console in this portfolio learned its manners somewhere.',
            'Before the dashboards: hallways, case files, picture cards, and folding chairs.',
        ],
        cta: 'Scroll down — the paper begins where the field did.',
    },
    zh: {
        lines: [
            '這本作品集裡的每一座主控台，都是在某個地方學會規矩的。',
            '在儀表板之前，是走廊、個案紀錄、圖卡，和一張張折疊椅。',
        ],
        cta: '往下捲——紙張開始的地方，就是田野開始的地方。',
    },
};

const chapter = CHAPTERS.find(c => c.key === 'C01');
const [LIMING_ACCENT, FAMILY_ACCENT, CENTER_ACCENT] = STATIONS.map(station => station.accent);

export default function C01_Threshold() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <section className="fj fj-c01" id={chapter.id} aria-label={chapter.title[lang]}>
            <div className="fj-c01-grid">
                <div className="fj-c01-copy">
                    {c.lines.map((l, i) => (
                        <Rise key={i} delay={i * 0.14}><p>{l}</p></Rise>
                    ))}
                    <Rise delay={0.3}><p className="fj-c01-cta">{c.cta} ↓</p></Rise>
                </div>
                <div className="fj-c01-scene" aria-hidden="true">
                    <svg viewBox="0 0 320 340" focusable="false">
                        <defs>
                            <linearGradient id="fj-c01-route-gradient" x1="78" y1="108" x2="258" y2="320" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor={LIMING_ACCENT} />
                                <stop offset="0.48" stopColor={FAMILY_ACCENT} />
                                <stop offset="1" stopColor={CENTER_ACCENT} />
                            </linearGradient>
                            <linearGradient id="fj-c01-paper-light" x1="58" y1="68" x2="260" y2="276" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#F0EFF9" stopOpacity="0.11" />
                                <stop offset="1" stopColor="#F0EFF9" stopOpacity="0.025" />
                            </linearGradient>
                        </defs>

                        <g className="fj-c01-contours" fill="none" stroke="rgba(240,239,249,0.1)" strokeWidth="1">
                            <path d="M25 241C45 214 79 209 101 221C126 235 145 225 164 207C185 188 218 181 251 195C276 206 289 230 295 254" />
                            <path d="M16 264C43 237 77 234 101 247C127 261 151 250 172 230C197 207 229 205 258 219C282 230 296 248 304 275" />
                            <path d="M34 291C67 266 96 270 120 282C144 294 168 285 188 267C211 247 241 246 266 260C285 271 297 285 303 306" />
                        </g>

                        <g className="fj-c01-atlas" strokeLinejoin="round">
                            <path d="M52 91L123 70L192 86L268 57L268 239L194 269L123 249L52 277Z" fill="url(#fj-c01-paper-light)" stroke="rgba(240,239,249,0.3)" strokeWidth="1.3" />
                            <path d="M52 91L123 70V249L52 277Z" fill={LIMING_ACCENT} fillOpacity="0.075" />
                            <path d="M123 70L192 86L194 269L123 249Z" fill={FAMILY_ACCENT} fillOpacity="0.07" />
                            <path d="M192 86L268 57V239L194 269Z" fill={CENTER_ACCENT} fillOpacity="0.075" />
                            <path d="M123 70V249M192 86L194 269" fill="none" stroke="rgba(240,239,249,0.2)" strokeWidth="1" strokeDasharray="4 7" />

                            <path d="M63 88L91 80" stroke={LIMING_ACCENT} strokeWidth="3" strokeLinecap="round" />
                            <path d="M135 73L161 79" stroke={FAMILY_ACCENT} strokeWidth="3" strokeLinecap="round" />
                            <path d="M208 80L238 68" stroke={CENTER_ACCENT} strokeWidth="3" strokeLinecap="round" />

                            <g className="fj-c01-signal" transform="rotate(-8 89 222)" fill="none" stroke={LIMING_ACCENT} strokeWidth="1.4">
                                <rect x="70" y="207" width="13" height="13" rx="3" />
                                <rect x="88" y="207" width="13" height="13" rx="3" />
                                <rect x="70" y="225" width="13" height="13" rx="3" />
                                <rect x="88" y="225" width="13" height="13" rx="3" />
                            </g>

                            <g className="fj-c01-signal" fill="none" stroke={FAMILY_ACCENT} strokeLinecap="round">
                                <path d="M137 117V129M143 112V134M149 120V126M155 108V138M161 115V131M167 119V127M173 113V133" strokeWidth="2" />
                                <path d="M137 224H177M137 233H166M137 242H173" strokeWidth="1.2" opacity="0.7" />
                            </g>

                            <g className="fj-c01-signal" fill="none" stroke={CENTER_ACCENT} strokeWidth="1.4">
                                <path d="M218 112L245 101L250 130L224 142L218 112ZM218 112L250 130M245 101L224 142" opacity="0.72" />
                                <circle cx="218" cy="112" r="4" fill="#141122" />
                                <circle cx="245" cy="101" r="4" fill="#141122" />
                                <circle cx="250" cy="130" r="4" fill="#141122" />
                                <circle cx="224" cy="142" r="4" fill="#141122" />
                            </g>

                            <path d="M244 249L268 239L244 230Z" fill={CENTER_ACCENT} fillOpacity="0.12" stroke="rgba(240,239,249,0.18)" strokeWidth="0.8" />
                        </g>

                        <DrawnPath
                            d="M78 110C94 123 89 151 107 169C126 187 138 158 158 165C182 173 178 205 202 211C225 216 230 188 248 180C248 210 239 231 249 252C261 276 251 302 258 340"
                            stroke="url(#fj-c01-route-gradient)" strokeWidth="2.8" duration={1.8}
                        />

                        <g className="fj-c01-stops">
                            <g transform="translate(107 169)">
                                <circle r="8" fill="#141122" stroke={LIMING_ACCENT} strokeWidth="2" />
                                <circle r="2.5" fill={LIMING_ACCENT} />
                            </g>
                            <g transform="translate(158 165)">
                                <circle r="8" fill="#141122" stroke={FAMILY_ACCENT} strokeWidth="2" />
                                <circle r="2.5" fill={FAMILY_ACCENT} />
                            </g>
                            <g transform="translate(248 180)">
                                <circle r="8" fill="#141122" stroke={CENTER_ACCENT} strokeWidth="2" />
                                <circle r="2.5" fill={CENTER_ACCENT} />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    );
}

injectStyles('fj-c01-styles', `
.fj-c01 { margin-top: clamp(28px, 4vw, 46px); }
.fj-c01-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(250px, 290px); gap: clamp(32px, 5vw, 64px); align-items: center; }
.fj-c01-copy p { margin: 0 0 14px; max-width: 560px; font-family: var(--fj-font-display); font-size: clamp(17px, 2vw, 21px); line-height: 1.6; color: rgba(240,239,249,0.78); }
html.lang-zh .fj-c01-copy p { line-height: 1.85; }
.fj-c01-cta { color: #E0956A !important; font-size: clamp(15px, 1.6vw, 17px) !important; font-style: italic; }
html.lang-zh .fj-c01-cta { font-style: normal; }
.fj-c01-scene { width: 100%; justify-self: end; }
.fj-c01-scene svg { display: block; width: 100%; height: auto; overflow: visible; }
.fj-c01-signal { opacity: 0.78; }
.fj-c01-stops { filter: drop-shadow(0 2px 0 rgba(20,17,34,0.3)); }
@media (max-width: 767px) {
  .fj-c01-grid { grid-template-columns: 1fr; gap: 10px; }
  .fj-c01-scene { max-width: 220px; margin: 0 auto; justify-self: center; }
}
`);
