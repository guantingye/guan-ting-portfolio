import React from 'react';
import { useLang } from '../app/providers/LanguageProvider.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { PROJECTS } from '../data/projects.js';
import HomeHero from '../components/home/HomeHero.jsx';
import ProjectCard from '../components/home/ProjectCard.jsx';
import SkillsSection from '../components/home/SkillsSection.jsx';
import AwardsSection from '../components/home/AwardsSection.jsx';
import MotionSection from '../components/home/MotionSection.jsx';

export default function HomePage({ navigate }) {
    const { t, lang } = useLang();
    useReveal([lang]);
    const timeline = [
        { meta: t('ch0Meta'), head: t('ch0Head'), body: t('ch0Body'), type: 'research',
          chips: ['NCCU / M.S. Psych', 'TMBIC', 'fMRI / EEG', 'OHBM 2025', 'TSCN 2025', 'I-9-9 Berlin'] },
        { meta: t('ch1Meta'), head: t('ch1Head'), body: t('ch1Body'), type: 'research',
          chips: ['MoHW Mental Health', 'Children & Family Welfare', 'Mennonite Hospital', 'UX Research', 'Data Analysis'] },
        { meta: t('ch2Meta'), head: t('ch2Head'), body: t('ch2Body'), type: 'product',
          chips: ['LLM', 'UX Research', 'Risk Detection', 'FastAPI', 'Silver Medal 2025'] },
        { meta: t('ch3Meta'), head: t('ch3Head'), body: t('ch3Body'), type: 'industry',
          chips: ['ETL Pipelines', 'Market Analysis', 'Web Crawling', 'Full-Stack Dev', 'Star Program 2025'] },
        { meta: t('ch4Meta'), head: t('ch4Head'), body: t('ch4Body'), type: 'future',
          chips: ['AI Products', 'Research × PM', 'Open to Opportunities'] },
    ];
    return React.createElement('div', { className: 'page-enter' },
        React.createElement(HomeHero, { lang }),
        React.createElement(MotionSection, { className: 'story', id: 'story' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-label reveal' }, t('storyLabel')),
                React.createElement('h2', { className: 'section-title reveal reveal-delay-1' },
                    t('storyTitle1'), React.createElement('br', null),
                    React.createElement('em', null, t('storyTitleEm')), t('storyTitle2')),
                React.createElement('div', { className: 'timeline' },
                    timeline.map((item, i) => React.createElement('div', { className: 'timeline-item', key: i, 'data-type': item.type },
                        React.createElement('div', { className: 'timeline-dot' }),
                        React.createElement('div', { className: 'timeline-meta' }, item.meta),
                        React.createElement('h3', { className: 'timeline-head' }, item.head),
                        React.createElement('p', { className: 'timeline-body' }, item.body),
                        React.createElement('div', { className: 'chips' }, item.chips.map(c => React.createElement('span', { className: 'chip', key: c }, c)))))))),
        React.createElement(MotionSection, { className: 'work', id: 'work' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-label reveal' }, t('workLabel')),
                React.createElement('h2', { className: 'section-title reveal reveal-delay-1' },
                    t('workTitle1'), ' ', React.createElement('em', null, t('workTitleEm')), t('workTitle2')),
                React.createElement('div', { className: 'work-grid' },
                    PROJECTS.map((p, i) => React.createElement(ProjectCard, { key: p.slug, project: p, index: i, navigate, lang }))))),
        React.createElement(SkillsSection, { navigate }),
        React.createElement(AwardsSection, null),
        React.createElement(MotionSection, { className: 'contact-section', id: 'contact' },
            React.createElement('div', { className: 'contact-ghost', 'aria-hidden': 'true' }, 'SIGNAL'),
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'section-label reveal' }, t('contactLabel')),
                React.createElement('div', { className: 'contact-grid' },
                    React.createElement('div', null,
                        React.createElement('h2', { className: 'contact-title reveal' },
                            t('contactTitle1'), ' ', React.createElement('em', null, t('contactTitleEm')), t('contactTitle2')),
                        React.createElement('p', { className: 'contact-note reveal reveal-delay-1' }, t('contactNote'))),
                    React.createElement('div', { className: 'contact-links reveal reveal-delay-2' },
                        React.createElement('a', { href: 'mailto:1126guanting@gmail.com', className: 'contact-link' },
                            React.createElement('div', null,
                                React.createElement('div', { className: 'contact-link-label' }, t('contactEmail')),
                                React.createElement('div', { className: 'contact-link-val' }, '1126guanting@gmail.com')),
                            React.createElement('span', { className: 'contact-link-arrow' }, '→')),
                        React.createElement('a', { href: 'tel:+886927012867', className: 'contact-link' },
                            React.createElement('div', null,
                                React.createElement('div', { className: 'contact-link-label' }, t('contactPhone')),
                                React.createElement('div', { className: 'contact-link-val' }, '+886 927 012 867')),
                            React.createElement('span', { className: 'contact-link-arrow' }, '→')),
                        React.createElement('div', { className: 'contact-link', style: { cursor: 'default' } },
                            React.createElement('div', null,
                                React.createElement('div', { className: 'contact-link-label' }, t('contactLang')),
                                React.createElement('div', { className: 'contact-link-val' }, 'Mandarin (Native) · English (Professional)')),
                            React.createElement('span', { className: 'contact-link-arrow', style: { color: 'var(--amber)' } }, '✦')))))));
}
