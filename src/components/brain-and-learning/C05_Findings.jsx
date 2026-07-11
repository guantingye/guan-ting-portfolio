import React from 'react';
import ChapterFrame, { injectStyles, useI18n, Figure } from './shared/blKit.jsx';
import { CHAPTERS, ML_CLASSIFICATION } from './data/blContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C05');
const BASE = `${import.meta.env.BASE_URL}brain-and-learning/`;

const COPY = {
    en: { figTitle: 'The classification pipeline', stepsLabel: 'Pipeline', findingLabel: 'Why it matters' },
    zh: { figTitle: '分類流程', stepsLabel: '流程', findingLabel: '為什麼重要' },
};

export default function C05_Findings() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const ml = ML_CLASSIFICATION;
    return (
        <ChapterFrame chapter={chapter} lead={ml.lead[lang]}>
            <Figure num={4} title={c.figTitle} caption={ml.procedureCaption[lang]}>
                <img src={BASE + ml.procedureImage} alt={c.figTitle} loading="lazy" decoding="async" />
            </Figure>

            <div className="bl-ml-steps">
                <span className="bl-eyebrow">{c.stepsLabel}</span>
                <ol className="bl-pipe-row">
                    {ml.steps.map((s, i) => (
                        <li key={i} className={`bl-pipe-step${i === ml.steps.length - 1 ? ' is-final' : ''}`}>
                            <span className="bl-pipe-num" aria-hidden="true">{i + 1}</span>
                            <span>{s[lang]}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="bl-ml-finding">
                <span className="bl-eyebrow">{c.findingLabel}</span>
                <p>{ml.finding[lang]}</p>
            </div>
        </ChapterFrame>
    );
}

injectStyles('bl-c05-styles', `
.bl-ml-steps { margin-top: 20px; }
.bl-ml-finding { margin-top: 20px; max-width: 700px; }
.bl-ml-finding p { margin: 8px 0 0; font-size: 14px; line-height: 1.7; color: var(--bl-ink-2); }
html.lang-zh .bl-ml-finding p { line-height: 1.9; }
`);
