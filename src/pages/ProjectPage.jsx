import React, { useEffect } from 'react';
import { useLang } from '../app/providers/LanguageProvider.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { PROJECTS, PROJECT_THEMES } from '../data/projects.js';
import Icon from '../components/ui/Icon.jsx';
import StorytellingCaseStudy from '../components/case-studies/StorytellingCaseStudy.jsx';
import ProjectExtraSection from '../components/case-studies/ProjectExtraSection.jsx';
import DesignSystemSpecimen from '../components/launch-os/DesignSystemSpecimen.jsx';
import VerificationLayer from '../components/verification/VerificationLayer.jsx';
import ProductShowcase from '../components/product-showcase/ProductShowcase.jsx';
import NewsIntelEvidence from '../components/newsintel/NewsIntelEvidence.jsx';
import PsyMatchEvidence from '../components/psymatch/PsyMatchEvidence.jsx';
import deeptechHeroImage from '../../assets/deeptech-research-studio.png';

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
    const isDeeptech = slug === 'deeptech-database';
    const splitMetaValue = value => isDeeptech && typeof value === 'string' && value.includes('·')
        ? value.split('·').map(part => React.createElement('span', { className: 'proj-meta-line', key: part.trim() }, part.trim()))
        : value;
    const deeptechProof = lang === 'zh'
        ? [
            ['產品問題', '讓爬蟲產生的新創紀錄能被分析師信任。'],
            ['研究訊號', '來源可信度、taxonomy、審核狀態與 provenance 直接進入介面。'],
            ['交付表面', '資料庫、地圖、brief card 與 agent handoff 保持同一資料脈絡。'],
        ]
        : [
            ['Product question', 'Make scraped startup records trustworthy enough for analyst handoff.'],
            ['Research signal', 'Source credibility, taxonomy, review state, and provenance are visible in the UI.'],
            ['Handoff surface', 'Database, map, brief card, and agent workflows share the same data trail.'],
        ];
    const heroMain = React.createElement('div', { className: 'proj-hero-copy' },
        React.createElement('a', { href: '#/', className: 'proj-back', onClick: e => { e.preventDefault(); navigate('#/'); } }, t('projBack')),
        React.createElement('p', { className: 'proj-category reveal' }, category),
        React.createElement('h1', { className: 'proj-title reveal reveal-delay-1' }, title),
        React.createElement('p', { className: 'proj-hook reveal reveal-delay-2' }, hook),
        React.createElement('div', { className: 'proj-stack reveal reveal-delay-2' },
            p.stack.map(s => React.createElement('span', { className: 'stack-tag', key: s }, s))),
        React.createElement('div', { className: 'proj-meta reveal reveal-delay-3' },
            React.createElement('div', { className: 'proj-meta-item' },
                React.createElement('div', { className: 'proj-meta-key' }, t('projRole')),
                React.createElement('div', { className: 'proj-meta-val' }, splitMetaValue(role))),
            React.createElement('div', { className: 'proj-meta-item' },
                React.createElement('div', { className: 'proj-meta-key' }, t('projTimeline')),
                React.createElement('div', { className: 'proj-meta-val' }, splitMetaValue(p.timeline))),
            React.createElement('div', { className: 'proj-meta-item' },
                React.createElement('div', { className: 'proj-meta-key' }, t('projStatus')),
                React.createElement('div', { className: 'proj-meta-val' }, splitMetaValue(status))),
            React.createElement('div', { className: 'proj-meta-item' },
                React.createElement('div', { className: 'proj-meta-key' }, t('projImpact')),
                React.createElement('div', { className: 'proj-meta-val' }, splitMetaValue(impact)))));
    useEffect(() => {
        document.title = `${title} · GT.YE`;
        return () => { document.title = 'Guan-Ting Ye · Neural Signal OS'; };
    }, [title]);
    return React.createElement('div', { className: 'proj-page page-enter', 'data-theme': PROJECT_THEMES[slug] || 'data' },
        React.createElement('div', { className: `proj-hero${isDeeptech ? ' proj-hero--deeptech' : ''}` },
            React.createElement('div', { className: 'container' },
                isDeeptech
                    ? React.createElement('div', { className: 'proj-hero-layout' },
                        heroMain,
                        React.createElement('aside', { className: 'proj-hero-dossier reveal reveal-delay-2', 'aria-label': lang === 'zh' ? '專案證據摘要' : 'Project evidence summary' },
                            React.createElement('figure', { className: 'proj-hero-dossier-media' },
                                React.createElement('img', {
                                    src: deeptechHeroImage,
                                    alt: lang === 'zh' ? '台灣新創情報研究系統的研究工作室重構圖' : 'Research studio reconstruction for the Taiwan startup intelligence data room',
                                    loading: 'eager',
                                    decoding: 'async',
                                })),
                            React.createElement('div', { className: 'proj-hero-dossier-copy' },
                                React.createElement('span', null, lang === 'zh' ? '招聘方快速掃描' : 'Recruiter scan'),
                                React.createElement('h2', null, lang === 'zh' ? '可被審核的資料產品，而不是爬蟲展示。' : 'A reviewable data product, not a crawler showcase.'),
                                React.createElement('p', null, lang === 'zh'
                                    ? '案例把來源選擇、資料品質、taxonomy 與交付介面連成一條可檢視的產品邏輯。'
                                    : 'The case connects source selection, data quality, taxonomy, and handoff UX into one inspectable product logic.'),
                                React.createElement('div', { className: 'proj-hero-proof-grid' },
                                    deeptechProof.map(([label, text]) => React.createElement('article', { key: label },
                                        React.createElement('span', null, label),
                                        React.createElement('strong', null, text)))))))
                    : heroMain)),
        React.createElement('div', { className: 'proj-body' },
            React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement('div', { className: 'proj-section-title' }, t('projOverview')),
                    overview.split('\n\n').map((para, i) => React.createElement('p', { className: 'proj-body-text', key: i }, para))),
                slug === 'startup-intelligence-platform' && React.createElement(ProductShowcase, null),
                React.createElement(StorytellingCaseStudy, { project: p, lang }),
                React.createElement(ProjectExtraSection, { slug, lang }),
                React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement('div', { className: 'proj-section-title' }, t('projOutcomes')),
                    React.createElement('ol', { className: 'proj-outcomes' },
                        outcomes.map((o, i) => {
                            const anchor = p.outcomeModules && p.outcomeModules[i];
                            return React.createElement('li', { key: i },
                                React.createElement('span', { className: 'outcome-num' }, String(i + 1).padStart(2, '0')),
                                React.createElement('span', null, o,
                                    anchor && React.createElement('button', {
                                        className: 'outcome-module-link',
                                        onClick: () => document.getElementById(anchor.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                                    }, ` → ${lang === 'zh' ? '見' : 'see'} Module ${anchor.num}`)));
                        }))),
                React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement('div', { className: 'proj-section-title' }, t('projTech')),
                    React.createElement('div', { className: 'proj-tech-grid' },
                        p.tech.map(item => React.createElement('div', { className: 'tech-item', key: item.label },
                            React.createElement('div', { className: 'tech-item-label' }, item.label),
                            React.createElement('div', { className: 'tech-item-val' }, item.val))))),
                slug === 'ai-product-launch-os' && React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement(DesignSystemSpecimen, null)),
                p.awards && p.awards.length > 0 && React.createElement('div', { className: 'proj-section reveal' },
                    React.createElement('div', { className: 'proj-section-title' }, t('projAwards')),
                    p.awards.map((a, i) => React.createElement('div', { className: 'proj-award', key: i },
                        React.createElement('span', { className: 'award-badge-icon' }, React.createElement(Icon, { name: a.iconKey || 'award' })),
                        React.createElement('div', { className: 'award-badge-text' },
                            React.createElement('div', { className: 'award-badge-title' }, a.title),
                            a.desc)))),
                slug === 'startup-intelligence-platform' && React.createElement(VerificationLayer, null),
                slug === 'ai-news-intelligence' && React.createElement(NewsIntelEvidence, null),
                slug === 'psymatch' && React.createElement(PsyMatchEvidence, null),
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
