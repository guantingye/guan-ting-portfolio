import React, { useEffect } from 'react';
import { useLang } from '../app/providers/LanguageProvider.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { PROJECTS, PROJECT_THEMES } from '../data/projects.js';
import Icon from '../components/ui/Icon.jsx';
import StorytellingCaseStudy from '../components/case-studies/StorytellingCaseStudy.jsx';
import ProjectExtraSection from '../components/case-studies/ProjectExtraSection.jsx';

export default function ProjectPage({ slug, navigate }) {
    const { t, lang } = useLang();
    useReveal([slug, lang]);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        const progress = document.getElementById('progress');
        if (progress) progress.style.width = '0%';
    }, [slug]);
    const idx = PROJECTS.findIndex(p => p.slug === slug);
    const p = PROJECTS[idx];
    if (!p || p.comingSoon)
        return React.createElement('div', { className: 'proj-page page-enter', 'data-theme': PROJECT_THEMES[slug] || 'data' },
            React.createElement('div', { className: 'container', style: { paddingTop: 160, paddingBottom: 80 } },
                React.createElement('a', { href: '#/', className: 'proj-back', onClick: e => { e.preventDefault(); navigate('#/'); } }, t('projBack')),
                React.createElement('p', { className: 'proj-category' }, t('comingSoon')),
                React.createElement('h1', { className: 'proj-title' }, t('comingSoon')),
                React.createElement('p', { className: 'proj-hook' }, t('csDesc'))));
    const prevP = idx > 0 && !PROJECTS[idx - 1].comingSoon ? PROJECTS[idx - 1] : null;
    const nextP = idx < PROJECTS.length - 1 && !PROJECTS[idx + 1].comingSoon ? PROJECTS[idx + 1] : null;
    const L = n => lang === 'zh' ? p['zh' + n.charAt(0).toUpperCase() + n.slice(1)] ?? p[n] : p[n];
    const title = L('title');
    const hook = L('hook');
    const overview = L('overview');
    const outcomes = lang === 'zh' ? p.zhOutcomes : p.outcomes;
    const role = lang === 'zh' ? p.zhRole : p.role;
    const status = lang === 'zh' ? p.zhStatus : p.status;
    const impact = lang === 'zh' ? p.zhImpact : p.impact;
    const category = lang === 'zh' ? p.zhCategory : p.category;
    useEffect(() => {
        document.title = `${title} · GT.YE`;
        return () => { document.title = 'Guan-Ting Ye · Neural Signal OS'; };
    }, [title]);
    return React.createElement('div', { className: 'proj-page page-enter', 'data-theme': PROJECT_THEMES[slug] || 'data' },
        React.createElement('div', { className: 'proj-hero' },
            React.createElement('div', { className: 'container' },
                React.createElement('a', { href: '#/', className: 'proj-back', onClick: e => { e.preventDefault(); navigate('#/'); } }, t('projBack')),
                React.createElement('p', { className: 'proj-category reveal' }, category),
                React.createElement('h1', { className: 'proj-title reveal reveal-delay-1' }, title),
                React.createElement('p', { className: 'proj-hook reveal reveal-delay-2' }, hook),
                React.createElement('div', { className: 'proj-stack reveal reveal-delay-2' },
                    p.stack.map(s => React.createElement('span', { className: 'stack-tag', key: s }, s))),
                React.createElement('div', { className: 'proj-meta reveal reveal-delay-3' },
                    React.createElement('div', { className: 'proj-meta-item' },
                        React.createElement('div', { className: 'proj-meta-key' }, t('projRole')),
                        React.createElement('div', { className: 'proj-meta-val' }, role)),
                    React.createElement('div', { className: 'proj-meta-item' },
                        React.createElement('div', { className: 'proj-meta-key' }, t('projTimeline')),
                        React.createElement('div', { className: 'proj-meta-val' }, p.timeline)),
                    React.createElement('div', { className: 'proj-meta-item' },
                        React.createElement('div', { className: 'proj-meta-key' }, t('projStatus')),
                        React.createElement('div', { className: 'proj-meta-val' }, status)),
                    React.createElement('div', { className: 'proj-meta-item' },
                        React.createElement('div', { className: 'proj-meta-key' }, t('projImpact')),
                        React.createElement('div', { className: 'proj-meta-val' }, impact))))),
        React.createElement('div', { className: 'proj-body' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement('div', { className: 'proj-section-title' }, t('projOverview')),
                    overview.split('\n\n').map((para, i) => React.createElement('p', { className: 'proj-body-text', key: i }, para))),
                React.createElement(StorytellingCaseStudy, { project: p, lang }),
                React.createElement(ProjectExtraSection, { slug, lang }),
                React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement('div', { className: 'proj-section-title' }, t('projOutcomes')),
                    React.createElement('ol', { className: 'proj-outcomes' },
                        outcomes.map((o, i) => React.createElement('li', { key: i },
                            React.createElement('span', { className: 'outcome-num' }, String(i + 1).padStart(2, '0')),
                            React.createElement('span', null, o))))),
                React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement('div', { className: 'proj-section-title' }, t('projTech')),
                    React.createElement('div', { className: 'proj-tech-grid' },
                        p.tech.map(item => React.createElement('div', { className: 'tech-item', key: item.label },
                            React.createElement('div', { className: 'tech-item-label' }, item.label),
                            React.createElement('div', { className: 'tech-item-val' }, item.val))))),
                p.awards && p.awards.length > 0 && React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement('div', { className: 'proj-section-title' }, t('projAwards')),
                    p.awards.map((a, i) => React.createElement('div', { className: 'proj-award', key: i },
                        React.createElement('span', { className: 'award-badge-icon' }, React.createElement(Icon, { name: a.iconKey || 'award' })),
                        React.createElement('div', { className: 'award-badge-text' },
                            React.createElement('div', { className: 'award-badge-title' }, a.title),
                            a.desc)))),
                React.createElement('div', { className: 'proj-nav' },
                    prevP ? React.createElement('a', {
                        href: `#/project/${prevP.slug}`,
                        className: 'proj-nav-link',
                        onClick: e => { e.preventDefault(); navigate(`#/project/${prevP.slug}`); },
                    },
                        React.createElement('span', { className: 'proj-nav-dir' }, t('prevProj')),
                        React.createElement('span', { className: 'proj-nav-name' }, lang === 'zh' ? prevP.zhTitle : prevP.title))
                        : React.createElement('span', null),
                    nextP ? React.createElement('a', {
                        href: `#/project/${nextP.slug}`,
                        className: 'proj-nav-link',
                        style: { textAlign: 'right' },
                        onClick: e => { e.preventDefault(); navigate(`#/project/${nextP.slug}`); },
                    },
                        React.createElement('span', { className: 'proj-nav-dir' }, t('nextProj')),
                        React.createElement('span', { className: 'proj-nav-name' }, lang === 'zh' ? nextP.zhTitle : nextP.title))
                        : React.createElement('span', null)))));
}
