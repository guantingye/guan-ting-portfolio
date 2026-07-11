import React from 'react';
import { injectStyles, useI18n, Rise, DrawnPath } from './shared/fjKit.jsx';
import { CHAPTERS } from './data/fjContent.js';

// C01 — the dark→light threshold. Pure transition scene: three framing lines
// and one drawn path that walks the eye down into the paper zone. Lives in the
// dark head, so it styles itself light-on-dusk instead of using ChapterFrame.
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
                    <svg viewBox="0 0 300 330" focusable="false">
                        {/* console glyph, where the portfolio lives now */}
                        <g stroke="rgba(240,239,249,0.4)" strokeWidth="2" fill="none" strokeLinecap="round">
                            <rect x="96" y="18" width="108" height="70" rx="8" />
                            <path d="M134 100h32M150 88v12" />
                        </g>
                        <g stroke="#E0956A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
                            <path d="M110 40h44M110 54h64M110 68h32" />
                        </g>
                        {/* the walk down into the field */}
                        <DrawnPath
                            d="M150 112 C 110 160, 196 190, 150 236 C 112 274, 168 300, 150 330"
                            stroke="#E0956A" strokeWidth="2.5" duration={1.7}
                        />
                        <g fill="#E0956A" opacity="0.85">
                            <circle cx="128" cy="168" r="3" />
                            <circle cx="172" cy="212" r="3" />
                            <circle cx="132" cy="278" r="3" />
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    );
}

injectStyles('fj-c01-styles', `
.fj-c01 { margin-top: clamp(28px, 4vw, 46px); }
.fj-c01-grid { display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 36px; align-items: end; }
.fj-c01-copy p { margin: 0 0 14px; max-width: 560px; font-family: var(--fj-font-display); font-size: clamp(17px, 2vw, 21px); line-height: 1.6; color: rgba(240,239,249,0.78); }
html.lang-zh .fj-c01-copy p { line-height: 1.85; }
.fj-c01-cta { color: #E0956A !important; font-size: clamp(15px, 1.6vw, 17px) !important; font-style: italic; }
html.lang-zh .fj-c01-cta { font-style: normal; }
.fj-c01-scene svg { display: block; width: 100%; height: auto; }
@media (max-width: 767px) {
  .fj-c01-grid { grid-template-columns: 1fr; gap: 10px; }
  .fj-c01-scene { max-width: 170px; margin: 0 auto; }
}
`);
