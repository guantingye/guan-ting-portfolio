import React from 'react';
import ChapterFrame, { injectStyles, useI18n, Figure } from './shared/blKit.jsx';
import { CHAPTERS, FUNCTIONAL_CONNECTIVITY } from './data/blContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C04');
const BASE = `${import.meta.env.BASE_URL}brain-and-learning/`;

const COPY = {
    en: { figTitle: 'Network-wise functional connectivity', findingLabel: 'What it showed' },
    zh: { figTitle: '網絡層級功能性連結分析', findingLabel: '研究發現' },
};

export default function C04_Connectivity() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const fc = FUNCTIONAL_CONNECTIVITY;
    return (
        <ChapterFrame chapter={chapter} lead={fc.lead[lang]}>
            <Figure num={3} title={c.figTitle} caption={fc.procedureCaption[lang]}>
                <div className="bl-fig-duo">
                    <div>
                        <img src={BASE + fc.procedureImage} alt={c.figTitle} loading="lazy" decoding="async" />
                    </div>
                    <div>
                        <img src={BASE + fc.labImage} alt={fc.labCaption[lang]} loading="lazy" decoding="async" />
                        <span className="bl-fig-sub">{fc.labCaption[lang]}</span>
                    </div>
                </div>
            </Figure>
            <div className="bl-cx-finding">
                <span className="bl-eyebrow">{c.findingLabel}</span>
                <p>{fc.finding[lang]}</p>
            </div>
        </ChapterFrame>
    );
}

injectStyles('bl-c04-styles', `
.bl-cx-finding { margin-top: 22px; max-width: 700px; }
.bl-cx-finding p { margin: 8px 0 0; font-size: 14px; line-height: 1.7; color: var(--bl-ink-2); }
html.lang-zh .bl-cx-finding p { line-height: 1.9; }
`);
