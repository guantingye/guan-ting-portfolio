import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';

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

const SLIDERS_LEFT = [
    { name: 'Research framing / paper writing', zhName: '研究架構／報告與論文撰寫', level: 'excellent' },
    { name: 'Experimental design / Matlab', zhName: '實驗設計／Matlab 腳本', level: 'excellent' },
    { name: 'Python / R / SPSS / JASP', zhName: 'Python／R／SPSS／JASP', level: 'advanced' },
    { name: 'Machine learning / data analysis', zhName: '機器學習／資料分析', level: 'advanced' },
];

const SLIDERS_RIGHT = [
    { name: 'Figma / Photoshop / Illustrator', zhName: 'Figma／Photoshop／Illustrator', level: 'advanced' },
    { name: 'HTML / CSS / React / Vite', zhName: 'HTML／CSS／React／Vite', level: 'advanced' },
    { name: 'SQL / PostgreSQL / MySQL', zhName: 'SQL／PostgreSQL／MySQL', level: 'strong' },
    { name: 'LLM APIs / prompt systems', zhName: 'LLM API／提示系統設計', level: 'strong' },
];

const CARD_LOGOS = [
    { src: devicon('html5/html5-original.svg'), label: 'HTML' },
    { src: devicon('css3/css3-original.svg'), label: 'CSS' },
    { src: devicon('mysql/mysql-original.svg'), label: 'MySQL' },
    { src: simpleIcon('pandas', 'a78bfa'), label: 'Pandas' },
];

const DOMAIN_LANES = [
    { key: 'research', code: '01', name: 'Research Methods', zhName: '研究方法' },
    { key: 'product', code: '02', name: 'Product Craft', zhName: '產品與設計' },
    { key: 'data', code: '03', name: 'Data Intelligence', zhName: '資料智能' },
    { key: 'systems', code: '04', name: 'Systems Strategy', zhName: '系統策略' },
];

const DOMAIN_NG = [
    { lane: 'research', name: 'Cognitive Neuroscience', zhName: '認知神經科學', tag: 'Core', zhTag: '核心', proof: 'fMRI, EEG, behavioral evidence', zhProof: 'fMRI、EEG、行為證據' },
    { lane: 'research', name: 'Research Writing', zhName: '研究報告與論文撰寫', tag: 'Core', zhTag: '核心', proof: 'reports, abstracts, manuscripts', zhProof: '報告、摘要、學術論文' },
    { lane: 'research', name: 'Experimental Design', zhName: '實驗設計', tag: 'Core', zhTag: '核心', proof: 'RCT, Matlab, task logic', zhProof: 'RCT、Matlab、作業邏輯' },
    { lane: 'product', name: 'UX Research', zhName: '用戶體驗研究', tag: 'Core', zhTag: '核心', proof: 'interviews, surveys, usability evidence', zhProof: '訪談、問卷、可用性證據' },
    { lane: 'product', name: 'Visual Editing', zhName: '視覺編修', tag: 'Advanced', zhTag: '進階', proof: 'Figma, Photoshop, Illustrator', zhProof: 'Figma、Photoshop、Illustrator' },
    { lane: 'product', name: 'Frontend Design', zhName: '前端介面設計', tag: 'Advanced', zhTag: '進階', proof: 'HTML, CSS, React, Vite', zhProof: 'HTML、CSS、React、Vite' },
    { lane: 'data', name: 'Machine Learning', zhName: '機器學習', tag: 'Advanced', zhTag: '進階', proof: 'classification, regression, clustering', zhProof: '分類、迴歸、分群' },
    { lane: 'data', name: 'Statistical Modeling', zhName: '統計建模', tag: 'Advanced', zhTag: '進階', proof: 'ANOVA, regression, interactions', zhProof: 'ANOVA、迴歸、交互作用' },
    { lane: 'data', name: 'Data Storytelling', zhName: '資料敘事', tag: 'Strong', zhTag: '熟練', proof: 'charts, insight framing, strategy notes', zhProof: '圖表、洞察整理、策略摘要' },
    { lane: 'systems', name: 'Database Management', zhName: '資料庫管理', tag: 'Strong', zhTag: '熟練', proof: 'SQL, PostgreSQL, MySQL', zhProof: 'SQL、PostgreSQL、MySQL' },
    { lane: 'systems', name: 'AI Product Design', zhName: 'AI 產品設計', tag: 'Advanced', zhTag: '進階', proof: 'LLM flows, prompt systems, prototypes', zhProof: 'LLM 流程、提示系統、原型' },
    { lane: 'systems', name: 'Ecosystem Mapping', zhName: '生態系統分析', tag: 'Strong', zhTag: '熟練', proof: 'market signals, startup landscape', zhProof: '市場訊號、新創版圖' },
];

const CAPABILITY_GROUPS = [
    {
        title: 'Research framing',
        zhTitle: '研究架構與論文撰寫',
        body: 'From question framing and literature synthesis to reports, abstracts, and academic manuscripts.',
        zhBody: '從研究問題、文獻整合到報告、摘要與學術論文，能把研究邏輯整理成可執行流程。',
        tools: ['Literature review', 'Survey design', 'APA writing', 'Grant proposal'],
    },
    {
        title: 'Visual and content design',
        zhTitle: '美編與內容設計',
        body: 'Figma flows, Photoshop editing, Illustrator graphics, slide decks, and social-ready materials.',
        zhBody: '涵蓋 Figma 流程、Photoshop 修圖、Illustrator 圖像、簡報與社群素材製作。',
        tools: ['Figma', 'Photoshop', 'Illustrator', 'Canva'],
    },
    {
        title: 'Frontend product build',
        zhTitle: '前端產品實作',
        body: 'HTML, CSS, JavaScript, React, and Vite for portfolio-grade interfaces and product prototypes.',
        zhBody: '使用 HTML、CSS、JavaScript、React 與 Vite，建置作品集等級介面與產品原型。',
        tools: ['HTML', 'CSS', 'React', 'Vite'],
    },
    {
        title: 'Data, ML, and experiments',
        zhTitle: '資料分析、機器學習與實驗',
        body: 'Analysis plans, Matlab tasks, statistical testing, regression, classification, and visualization.',
        zhBody: '能處理分析計畫、Matlab 實驗任務、統計檢定、迴歸、分類與資料視覺化。',
        tools: ['Matlab', 'Python', 'R', 'SPSS', 'ANOVA'],
    },
    {
        title: 'Database and data ops',
        zhTitle: '資料庫與資料工程',
        body: 'SQL schemas, PostgreSQL and MySQL workflows, ETL cleanup, web data collection, and QA checks.',
        zhBody: '熟悉 SQL schema、PostgreSQL 與 MySQL 流程、ETL 清理、網路資料蒐集與品質檢查。',
        tools: ['SQL', 'PostgreSQL', 'MySQL', 'ETL'],
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

    const slider = (s, i) => {
        const level = LEVELS[s.level] || LEVELS.applied;
        const delay = `${Math.min(i * 0.04, 0.18)}s`;
        return React.createElement('div', { className: 'fs-slider', key: s.name },
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
        )
    );
    };

    return React.createElement('section', { className: 'skills-ng', id: 'skills' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'fs-head' },
                React.createElement('div', null,
                    React.createElement('div', { className: 'section-label reveal' }, t('skillsLabel')),
                    React.createElement('h2', { className: 'section-title reveal reveal-delay-1' },
                        t('skillsTitle1'), ' ', React.createElement('em', null, t('skillsTitleEm')), t('skillsTitle2'))
                ),
                React.createElement('p', { className: 'fs-blurb reveal reveal-delay-2' },
                    PA
                        ? '認知神經科學研究、AI 產品設計與全端資料工程，共同支撐本站每一個案例。'
                        : 'Cognitive neuroscience, AI product design, and full-stack data engineering working as one portfolio system.'
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
                        React.createElement('h3', null, PA ? group.zhTitle : group.title),
                        React.createElement('p', null, PA ? group.zhBody : group.body),
                        React.createElement('div', { className: 'fs-capability-tools' },
                            ...group.tools.map(tool => React.createElement('span', { key: tool }, tool))
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'fs-grid reveal reveal-delay-3', ref },
                React.createElement('div', { className: 'fs-col' },
                    ...SLIDERS_LEFT.map(slider)
                ),
                React.createElement('div', { className: 'fs-col' },
                    ...SLIDERS_RIGHT.map((s, i) => slider(s, i + SLIDERS_LEFT.length)),
                    React.createElement('div', { className: 'fs-card' },
                        slider({ name: 'Backend and data infrastructure', zhName: '後端與資料架構', level: 'strong' }, SLIDERS_LEFT.length + SLIDERS_RIGHT.length),
                        React.createElement('div', { className: 'fs-card-logos' },
                            ...CARD_LOGOS.map(l =>
                                React.createElement('div', { className: 'fs-card-logo', key: l.label },
                                    React.createElement('img', { src: l.src, alt: `${l.label} logo`, loading: 'lazy' }),
                                    React.createElement('span', null, l.label)
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement('hr', { className: 'skills-ng-sep' }),
            React.createElement('section', { className: 'domain-ng-panel', 'aria-labelledby': 'domain-ng-title' },
                React.createElement('div', { className: 'domain-ng-topline' },
                    React.createElement('div', null,
                        React.createElement('div', { className: 'domain-ng-header', id: 'domain-ng-title' },
                            PA ? `領域專長 / ${DOMAIN_NG.length} 個能力面` : `Domain Expertise / ${DOMAIN_NG.length} Areas`
                        ),
                        React.createElement('p', { className: 'domain-ng-note' },
                            PA
                                ? '以研究、產品、資料與系統四個軸線整理跨域技能累積，強調可驗證的專業場景。'
                                : 'A four-lane competency atlas across research, product, data, and systems.'
                        )
                    ),
                    React.createElement('div', { className: 'domain-ng-count', 'aria-hidden': 'true' },
                        React.createElement('strong', null, DOMAIN_NG.length),
                        React.createElement('span', null, PA ? '能力面' : 'areas')
                    )
                ),
                React.createElement('div', { className: 'domain-ng-grid' },
                    ...DOMAIN_LANES.map(lane => {
                        const laneItems = DOMAIN_NG.filter(d => d.lane === lane.key);
                        return React.createElement('section', { className: 'domain-ng-lane', key: lane.key },
                            React.createElement('div', { className: 'domain-ng-lane-head' },
                                React.createElement('span', { className: 'domain-ng-lane-kicker' }, lane.code),
                                React.createElement('h3', null, PA ? lane.zhName : lane.name),
                                React.createElement('span', { className: 'domain-ng-lane-count' },
                                    PA ? `${laneItems.length} 項能力` : `${laneItems.length} capabilities`
                                )
                            ),
                            ...laneItems.map((d, index) =>
                                React.createElement('article', { className: `domain-ng-chip is-${d.tag.toLowerCase()}`, key: d.name },
                                    React.createElement('div', { className: 'domain-ng-chip-top' },
                                        React.createElement('span', { className: 'domain-ng-index' }, `${lane.code}.${String(index + 1).padStart(2, '0')}`),
                                        React.createElement('span', { className: 'domain-ng-tag' }, PA ? d.zhTag : d.tag)
                                    ),
                                    React.createElement('h4', { className: 'domain-ng-name' }, PA ? d.zhName : d.name),
                                    React.createElement('p', { className: 'domain-ng-proof' }, PA ? d.zhProof : d.proof)
                                )
                            )
                        );
                    })
                )
            )
        )
    );
}
