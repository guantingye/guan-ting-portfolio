import React, { useState, useEffect, useRef } from 'react';
import { FiBarChart2, FiBookOpen, FiCode, FiCpu, FiDatabase, FiLayers } from 'react-icons/fi';
import { useLang } from '../../app/providers/LanguageProvider.jsx';
import MotionSection from './MotionSection.jsx';

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;
const simpleIcon = (slug, tint) => `https://cdn.simpleicons.org/${slug}/${tint}`;

const BADGES = [
    { src: devicon('figma/figma-original.svg'), cap: 'Figma', zhCap: 'Figma', mark: 'Fg' },
    { src: devicon('photoshop/photoshop-plain.svg'), cap: 'Photoshop', zhCap: 'Photoshop', mark: 'Ps' },
    { src: devicon('illustrator/illustrator-plain.svg'), cap: 'Illustrator', zhCap: 'Illustrator', mark: 'Ai' },
    { src: devicon('react/react-original.svg'), cap: 'React UI', zhCap: 'React 介面', mark: 'Re' },
    { src: devicon('vitejs/vitejs-original.svg'), cap: 'Vite Build', zhCap: 'Vite 建置', mark: 'Vi' },
    { src: devicon('python/python-original.svg'), cap: 'AI / Data', zhCap: 'AI／資料', mark: 'Py' },
    { src: devicon('matlab/matlab-original.svg'), cap: 'Matlab Lab', zhCap: 'Matlab 實驗', mark: 'Ml' },
    { src: devicon('postgresql/postgresql-original.svg'), cap: 'SQL Systems', zhCap: 'SQL 系統', mark: 'SQL' },
];

const CAPABILITY_GROUPS = [
    {
        icon: FiBookOpen,
        title: 'Research Systems',
        zhTitle: '研究系統',
        body: 'Frame research questions, synthesize evidence, and turn academic logic into decision-ready briefs.',
        zhBody: '釐清研究問題、整合證據，將學術邏輯轉化為可決策的分析材料。',
    },
    {
        icon: FiLayers,
        title: 'Product and UX Design',
        zhTitle: '產品與 UX 設計',
        body: 'Map user needs, shape flows, and translate complex behavior into clear product interactions.',
        zhBody: '梳理使用者需求與流程，把複雜行為轉譯為清楚、可落地的產品互動。',
    },
    {
        icon: FiCode,
        title: 'Frontend Engineering',
        zhTitle: '前端工程',
        body: 'Build responsive React interfaces with durable component structure and polished interaction details.',
        zhBody: '以 React 建置響應式介面，兼顧元件結構、互動細節與交付品質。',
    },
    {
        icon: FiBarChart2,
        title: 'Data Science',
        zhTitle: '資料科學',
        body: 'Analyze behavioral and market data with Python, R, statistics, and machine-learning workflows.',
        zhBody: '使用 Python、R、統計與機器學習流程，分析行為資料與市場訊號。',
    },
    {
        icon: FiDatabase,
        title: 'Backend and Data Architecture',
        zhTitle: '後端與資料架構',
        body: 'Design SQL schemas, ETL routines, and data quality checks for reliable product intelligence.',
        zhBody: '設計 SQL schema、ETL 流程與資料品質檢查，支撐可信任的產品情報。',
    },
    {
        icon: FiCpu,
        title: 'AI Product Strategy',
        zhTitle: 'AI 產品策略',
        body: 'Connect LLM workflows, prompt systems, and governance logic into usable AI-native tools.',
        zhBody: '整合 LLM 流程、提示系統與治理邏輯，打造可被使用的 AI 原生工具。',
    },
];

const SKILL_GROUPS = [
    {
        name: 'Research framing / paper writing',
        zhName: '研究架構／報告與論文撰寫',
        level: 'excellent',
        tools: [{ mark: 'RQ', label: 'Research Q' }, { mark: 'LR', label: 'Lit Review' }, { mark: 'APA', label: 'APA' }, { mark: 'GP', label: 'Grant Plan' }],
    },
    {
        name: 'Experimental design / Matlab',
        zhName: '實驗設計／Matlab 腳本',
        level: 'excellent',
        tools: [{ src: devicon('matlab/matlab-original.svg'), label: 'Matlab' }, { mark: 'RCT', label: 'RCT' }, { mark: 'EEG', label: 'EEG' }, { mark: 'fMRI', label: 'fMRI' }],
    },
    {
        name: 'Python / R / SPSS / JASP',
        zhName: 'Python／R／SPSS／JASP',
        level: 'advanced',
        tools: [{ src: devicon('python/python-original.svg'), label: 'Python' }, { src: devicon('r/r-original.svg'), label: 'R' }, { mark: 'SP', label: 'SPSS' }, { mark: 'JA', label: 'JASP' }],
    },
    {
        name: 'Machine learning / data analysis',
        zhName: '機器學習／資料分析',
        level: 'advanced',
        tools: [{ src: simpleIcon('pandas', 'a78bfa'), label: 'Pandas' }, { src: simpleIcon('scikitlearn', 'a78bfa'), label: 'Sklearn' }, { mark: 'ML', label: 'ML' }, { mark: 'AN', label: 'ANOVA' }],
    },
    {
        name: 'Figma / Photoshop / Illustrator',
        zhName: 'Figma／Photoshop／Illustrator',
        level: 'advanced',
        tools: [{ src: devicon('figma/figma-original.svg'), label: 'Figma' }, { src: devicon('photoshop/photoshop-plain.svg'), label: 'Ps' }, { src: devicon('illustrator/illustrator-plain.svg'), label: 'Ai' }, { mark: 'CV', label: 'Canva' }],
    },
    {
        name: 'HTML / CSS / React / Vite',
        zhName: 'HTML／CSS／React／Vite',
        level: 'advanced',
        tools: [{ src: devicon('html5/html5-original.svg'), label: 'HTML' }, { src: devicon('css3/css3-original.svg'), label: 'CSS' }, { src: devicon('react/react-original.svg'), label: 'React' }, { src: devicon('vitejs/vitejs-original.svg'), label: 'Vite' }],
    },
    {
        name: 'SQL / PostgreSQL / MySQL',
        zhName: 'SQL／PostgreSQL／MySQL',
        level: 'strong',
        tools: [{ mark: 'SQL', label: 'SQL' }, { src: devicon('postgresql/postgresql-original.svg'), label: 'PostgreSQL' }, { src: devicon('mysql/mysql-original.svg'), label: 'MySQL' }, { mark: 'QA', label: 'Data QA' }],
    },
    {
        name: 'LLM APIs / prompt systems',
        zhName: 'LLM API／提示系統設計',
        level: 'strong',
        tools: [{ mark: 'OA', label: 'OpenAI' }, { mark: 'API', label: 'API' }, { mark: 'LLM', label: 'LLM' }, { mark: 'PF', label: 'Prompt Flow' }],
    },
    {
        name: 'Backend and data infrastructure',
        zhName: '後端與資料基礎建設',
        level: 'strong',
        tools: [{ src: devicon('fastapi/fastapi-original.svg'), label: 'FastAPI' }, { src: devicon('python/python-original.svg'), label: 'Python' }, { src: devicon('postgresql/postgresql-original.svg'), label: 'PostgreSQL' }, { mark: 'ETL', label: 'ETL' }],
    },
];

const LEVELS = {
    excellent: { label: 'Excellent', zhLabel: '精通', width: '94%' },
    advanced: { label: 'Advanced', zhLabel: '進階', width: '84%' },
    strong: { label: 'Strong', zhLabel: '熟練', width: '74%' },
    applied: { label: 'Applied', zhLabel: '實戰', width: '66%' },
};

export default function SkillsSection() {
    const { t, lang } = useLang();
    const PA = lang === 'zh';
    const [animated, setAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { setAnimated(true); io.disconnect(); }
        }, { threshold: 0.15 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    const toolMark = (tool) => tool.mark || tool.label.replace(/[^a-z0-9]/gi, '').slice(0, 3).toUpperCase();

    const toolBadge = (tool) => React.createElement('div', { className: 'fs-skill-logo', key: tool.label },
        React.createElement('span', { className: 'fs-skill-logo-icon', 'aria-hidden': 'true' },
            React.createElement('span', { className: 'fs-skill-logo-mark' }, toolMark(tool)),
            tool.src && React.createElement('img', {
                src: tool.src,
                alt: '',
                loading: 'lazy',
                onError: (e) => { e.currentTarget.style.display = 'none'; },
            })
        ),
        React.createElement('span', null, tool.label)
    );

    const skillRow = (s, i) => {
        const level = LEVELS[s.level] || LEVELS.applied;
        const delay = `${Math.min(i * 0.04, 0.18)}s`;
        const rowClass = i === SKILL_GROUPS.length - 1 ? 'fs-skill-row is-wide' : 'fs-skill-row';
        return React.createElement('article', { className: rowClass, key: s.name },
            React.createElement('div', { className: 'fs-slider-head' },
                React.createElement('span', { className: 'fs-slider-name' }, PA ? s.zhName : s.name),
                React.createElement('span', { className: `fs-slider-level is-${s.level}` }, PA ? level.zhLabel : level.label)
            ),
            React.createElement('div', { className: 'fs-slider-track' },
                React.createElement('div', { className: 'fs-slider-fill', style: {
                    width: animated ? level.width : '0%', transitionDelay: delay,
                }}),
                React.createElement('span', { className: 'fs-slider-knob', style: {
                    left: animated ? level.width : '0%', transitionDelay: delay,
                }})
            ),
            React.createElement('div', { className: 'fs-skill-tools' },
                ...s.tools.map(toolBadge)
            )
        );
    };

    return React.createElement(MotionSection, { className: 'skills-ng', id: 'skills' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'fs-head' },
                React.createElement('div', null,
                    React.createElement('div', { className: 'section-label reveal' }, t('skillsLabel')),
                    React.createElement('h2', { className: 'section-title reveal reveal-delay-1' },
                        t('skillsTitle1'), ' ', React.createElement('em', null, t('skillsTitleEm')), t('skillsTitle2'))
                ),
                React.createElement('p', { className: 'fs-blurb reveal reveal-delay-2' },
                    PA
                        ? '以研究理解問題，用設計建立體驗，再透過原型、資料與測試推進產品'
                        : 'Understand problems through research, shape experiences through design, and advance product decisions through prototyping, data, and testing.'
                )
            ),
            React.createElement('div', { className: 'fs-ovals reveal reveal-delay-2' },
                ...BADGES.map(b =>
                    React.createElement('div', { className: 'fs-oval', key: b.cap },
                        React.createElement('div', { className: 'fs-oval-media' },
                            React.createElement('span', { className: 'fs-oval-mark', 'aria-hidden': 'true' }, b.mark),
                            React.createElement('img', { src: b.src, alt: `${PA ? b.zhCap : b.cap} logo`, loading: 'lazy' })
                        ),
                        React.createElement('span', { className: 'fs-oval-cap' }, PA ? b.zhCap : b.cap)
                    )
                )
            ),
            React.createElement('div', { className: 'fs-capability-grid reveal reveal-delay-3' },
                ...CAPABILITY_GROUPS.map(group =>
                    React.createElement('article', { className: 'fs-capability-card', key: group.title },
                        React.createElement('div', { className: 'fs-capability-icon', 'aria-hidden': 'true' },
                            React.createElement(group.icon)
                        ),
                        React.createElement('h3', null, PA ? group.zhTitle : group.title),
                        React.createElement('p', null, PA ? group.zhBody : group.body)
                    )
                )
            ),
            React.createElement('div', { className: 'fs-skill-panel reveal reveal-delay-3', ref },
                React.createElement('div', { className: 'fs-skill-grid' },
                    ...SKILL_GROUPS.map(skillRow)
                )
            )
        )
    );
}
