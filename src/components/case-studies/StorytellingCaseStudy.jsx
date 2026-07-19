import React, { useState } from 'react';
import Icon from '../ui/Icon.jsx';

export default function StorytellingCaseStudy({ project: p, lang }) {
    const PA = lang === 'zh';
    const chapters = p.storyChapters || [];
    const [active, setActive] = useState(0);
    if (!chapters.length) return null;
    const current = chapters[Math.min(active, chapters.length - 1)];
    const projectTitle = PA ? p.zhTitle : p.title;
    const chapterLabel = PA ? current.zhLabel || current.label : current.label;
    const chapterTitle = PA ? current.zhTitle || current.title : current.title;
    const chapterBody = PA ? current.zhBody || current.body : current.body;
    const chapterArtifact = PA ? current.zhArtifact || current.artifact : current.artifact;
    const quote = PA ? p.zhPullQuote || p.pullQuote : p.pullQuote;
    const deck = p.caseDeck;
    const deckSignals = deck ? (PA ? deck.zhSignals || deck.signals : deck.signals) : [];
    const intro = p.storyIntro || {};
    // Compact is the house style; `storyLayout: 'full'` opts a project back into the chapter deck.
    const compact = p.storyLayout !== 'full';
    const deckKpis = deck ? deck.kpis || [] : [];
    const introKicker = (PA ? intro.zhKicker || intro.kicker : intro.kicker) || (PA ? '章節式案例' : 'CINEMATIC CASE STUDY');
    const introTitle = (PA ? intro.zhTitle || intro.title : intro.title) || (PA ? '用章節式敘事呈現產品思考' : 'A chapter-led product story');
    const introLead = (PA ? intro.zhLead || intro.lead : intro.lead) || (PA ? '沿著產品決策的順序，說明如何從問題定義、訊號整理、產品原型、互動設計到上市驗證，建立一套可被討論與執行的 AI 產品流程' : 'This section uses a richer case-study rhythm: problem framing, decision logic, interaction evidence, and visual proof points.');
    return React.createElement('div', { className: `story-case reveal${compact ? ' story-case-compact' : ''}`, 'data-motif': intro.motif || undefined },
        React.createElement('div', { className: 'story-case-hero' },
            React.createElement('div', { className: 'story-case-copy' },
                React.createElement('div', { className: 'story-case-kicker' }, introKicker),
                React.createElement('h2', { className: 'story-case-title' }, introTitle),
                React.createElement('p', { className: 'story-case-lead' }, introLead)),
            React.createElement('div', { className: 'story-case-media' },
                React.createElement('img', { src: p.caseHeroImage, alt: `${projectTitle} case study cover`, loading: 'lazy', decoding: 'async' }),
                React.createElement('div', { className: 'story-case-media-glass' },
                    React.createElement('span', null, PA ? '案例封面' : 'CASE COVER'),
                    React.createElement('strong', null, projectTitle),
                    React.createElement('small', null, PA ? '產品產出 / 原型佐證' : 'Product artifacts / prototype evidence')))),
        deck && React.createElement('div', { className: 'story-case-live' },
            React.createElement('div', { className: 'story-case-cockpit' },
                React.createElement('div', { className: 'story-case-live-top' },
                    React.createElement('span', null, PA ? deck.zhEyebrow || deck.eyebrow : deck.eyebrow),
                    React.createElement('div', { className: 'story-case-live-dots', 'aria-hidden': 'true' },
                        React.createElement('i', null), React.createElement('i', null), React.createElement('i', null))),
                React.createElement('h3', null, PA ? deck.zhTitle || deck.title : deck.title),
                React.createElement('p', null, PA ? deck.zhBody || deck.body : deck.body),
                React.createElement('div', { className: compact ? 'story-case-kpi-line' : 'story-case-kpi-row' },
                    deckKpis.map(kpi => React.createElement('div', { className: 'story-case-kpi', key: kpi.label },
                        React.createElement('strong', null, kpi.value),
                        React.createElement('span', null, PA ? kpi.zhLabel || kpi.label : kpi.label)))),
                React.createElement('div', { className: 'story-case-signal-cloud' },
                    deckSignals.map(signal => React.createElement('span', { key: signal }, signal)))),
            React.createElement('div', { className: 'story-case-moment-grid' },
                (p.storyMoments || []).map((moment, mi) => React.createElement('article', { className: 'story-case-moment', key: moment.title },
                    React.createElement('div', { className: 'story-case-moment-rail' },
                        React.createElement('span', { className: 'story-case-moment-num' }, String(mi + 1).padStart(2, '0')),
                        React.createElement('div', { className: 'story-case-moment-icon' }, React.createElement(Icon, { name: moment.iconKey || 'zap' }))),
                    React.createElement('div', { className: 'story-case-moment-text' },
                        React.createElement('h4', null, PA ? moment.zhTitle || moment.title : moment.title),
                        React.createElement('p', null, PA ? moment.zhBody || moment.body : moment.body)))))),
        p.caseGallery && p.caseGallery.length > 0 && React.createElement('div', { className: 'story-case-gallery', 'aria-label': PA ? '案例圖片集' : 'Case image gallery' },
            p.caseGallery.map((img, i) => React.createElement('figure', { className: `story-case-gallery-card${i === 0 ? ' featured' : ''}`, key: img.src },
                React.createElement('img', { src: img.src, alt: `${PA ? img.zhTitle || img.title : img.title} preview`, loading: 'lazy', decoding: 'async' }),
                React.createElement('figcaption', null,
                    React.createElement('span', { className: 'story-case-gallery-index' }, String(i + 1).padStart(2, '0')),
                    React.createElement('strong', null, PA ? img.zhTitle || img.title : img.title),
                    React.createElement('span', null, PA ? img.zhNote || img.note : img.note))))),
        compact && quote && React.createElement('blockquote', { className: 'story-case-quote story-case-quote-strip' }, quote),
        !compact && React.createElement('div', { className: 'story-case-chapters' },
            React.createElement('div', { className: 'story-case-rail', role: 'tablist', 'aria-label': PA ? '案例章節' : 'Case chapters' },
                chapters.map((chapter, i) => React.createElement('button', {
                    type: 'button',
                    className: `story-case-tab${i === active ? ' active' : ''}`,
                    key: chapter.label,
                    onClick: () => setActive(i),
                    role: 'tab',
                    'aria-selected': i === active,
                },
                    React.createElement('span', { className: 'story-case-tab-num' }, String(i + 1).padStart(2, '0')),
                    React.createElement('span', { className: 'story-case-tab-icon' }, React.createElement(Icon, { name: chapter.iconKey || 'layers' })),
                    React.createElement('span', null, PA ? chapter.zhLabel || chapter.label : chapter.label)))),
            React.createElement('article', { className: 'story-case-panel' },
                React.createElement('div', { className: 'story-case-panel-label' }, chapterLabel),
                React.createElement('h3', null, chapterTitle),
                React.createElement('p', null, chapterBody),
                chapterArtifact && React.createElement('div', { className: 'story-case-artifact' },
                    React.createElement(Icon, { name: current.iconKey || 'layers' }),
                    React.createElement('span', null, PA ? '可交付產出' : 'Artifact'),
                    React.createElement('strong', null, chapterArtifact))),
            quote && React.createElement('blockquote', { className: 'story-case-quote' }, quote)));
}
