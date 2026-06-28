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
    return React.createElement('div', { className: 'story-case reveal' },
        React.createElement('div', { className: 'story-case-hero' },
            React.createElement('div', { className: 'story-case-copy' },
                React.createElement('div', { className: 'story-case-kicker' }, PA ? '章節式案例' : 'CINEMATIC CASE STUDY'),
                React.createElement('h2', { className: 'story-case-title' }, PA ? '用章節式敘事呈現產品思考' : 'A chapter-led product story'),
                React.createElement('p', { className: 'story-case-lead' }, PA ? '此區塊用更像高階作品集 case study 的節奏，呈現問題、決策、互動、佐證與視覺證據。' : 'This section uses a richer case-study rhythm: problem framing, decision logic, interaction evidence, and visual proof points.')),
            React.createElement('div', { className: 'story-case-media' },
                React.createElement('img', { src: p.caseHeroImage, alt: `${projectTitle} case study cover`, loading: 'lazy', decoding: 'async' }),
                React.createElement('div', { className: 'story-case-media-glass' },
                    React.createElement('span', null, PA ? '案例封面' : 'CASE COVER'),
                    React.createElement('strong', null, projectTitle),
                    React.createElement('small', null, PA ? '產品產出 / 證照 / 原型佐證' : 'Product artifacts / credentials / prototype evidence')))),
        deck && React.createElement('div', { className: 'story-case-live' },
            React.createElement('div', { className: 'story-case-cockpit' },
                React.createElement('div', { className: 'story-case-live-top' },
                    React.createElement('span', null, PA ? deck.zhEyebrow || deck.eyebrow : deck.eyebrow),
                    React.createElement('div', { className: 'story-case-live-dots', 'aria-hidden': 'true' },
                        React.createElement('i', null), React.createElement('i', null), React.createElement('i', null))),
                React.createElement('h3', null, PA ? deck.zhTitle || deck.title : deck.title),
                React.createElement('p', null, PA ? deck.zhBody || deck.body : deck.body),
                React.createElement('div', { className: 'story-case-kpi-row' },
                    (deck.kpis || []).map(kpi => React.createElement('div', { className: 'story-case-kpi', key: kpi.label },
                        React.createElement('strong', null, kpi.value),
                        React.createElement('span', null, PA ? kpi.zhLabel || kpi.label : kpi.label)))),
                React.createElement('div', { className: 'story-case-signal-cloud' },
                    deckSignals.map(signal => React.createElement('span', { key: signal }, signal)))),
            React.createElement('div', { className: 'story-case-moment-grid' },
                (p.storyMoments || []).map(moment => React.createElement('article', { className: 'story-case-moment', key: moment.title },
                    React.createElement('div', { className: 'story-case-moment-icon' }, React.createElement(Icon, { name: moment.iconKey || 'zap' })),
                    React.createElement('h4', null, PA ? moment.zhTitle || moment.title : moment.title),
                    React.createElement('p', null, PA ? moment.zhBody || moment.body : moment.body))))),
        p.caseGallery && p.caseGallery.length > 0 && React.createElement('div', { className: 'story-case-gallery', 'aria-label': PA ? '案例圖片集' : 'Case image gallery' },
            p.caseGallery.map((img, i) => React.createElement('figure', { className: `story-case-gallery-card${i === 0 ? ' featured' : ''}`, key: img.src },
                React.createElement('img', { src: img.src, alt: `${PA ? img.zhTitle || img.title : img.title} preview`, loading: 'lazy', decoding: 'async' }),
                React.createElement('figcaption', null,
                    React.createElement('span', { className: 'story-case-gallery-index' }, String(i + 1).padStart(2, '0')),
                    React.createElement('strong', null, PA ? img.zhTitle || img.title : img.title),
                    React.createElement('span', null, PA ? img.zhNote || img.note : img.note))))),
        React.createElement('div', { className: 'story-case-chapters' },
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
            quote && React.createElement('blockquote', { className: 'story-case-quote' }, quote)),
        React.createElement('div', { className: 'story-case-section' },
            React.createElement('div', { className: 'story-case-section-title' }, PA ? '佐證圖片與文件預留區' : 'Evidence Slots'),
            React.createElement('div', { className: 'story-case-evidence-grid' },
                (p.evidenceSlots || []).map(slot => React.createElement('div', { className: 'story-case-evidence', key: slot.title },
                    slot.image
                        ? React.createElement('div', { className: 'story-case-evidence-visual' },
                            React.createElement('img', { src: slot.image, alt: `${PA ? slot.zhTitle || slot.title : slot.title} concept visual`, loading: 'lazy', decoding: 'async' }),
                            React.createElement(Icon, { name: slot.iconKey || 'check' }))
                        : React.createElement('div', { className: 'story-case-evidence-icon' }, React.createElement(Icon, { name: slot.iconKey || 'check' })),
                    React.createElement('div', { className: 'story-case-evidence-title' }, PA ? slot.zhTitle || slot.title : slot.title),
                    React.createElement('p', null, PA ? slot.zhDesc || slot.desc : slot.desc),
                    React.createElement('span', { className: 'story-case-replace-note' }, PA ? '概念示意，可替換真實素材' : 'Concept visual, replaceable'))))),
        React.createElement('div', { className: 'story-case-section' },
            React.createElement('div', { className: 'story-case-section-title' }, PA ? '證照佐證' : 'Credential Evidence'),
            React.createElement('div', { className: 'story-case-credential-grid' },
                (p.credentials || []).map(cred => React.createElement('div', { className: 'story-case-credential', key: cred.name },
                    React.createElement('div', { className: 'story-case-credential-icon' }, React.createElement(Icon, { name: cred.iconKey || 'award' })),
                    React.createElement('div', { className: 'story-case-credential-name' }, cred.name),
                    React.createElement('div', { className: 'story-case-credential-issuer' }, cred.issuer),
                    React.createElement('p', null, cred.relevance))))));
}
