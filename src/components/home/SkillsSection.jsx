import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';
import { PROJECTS } from '../../data/projects.js';
import MotionSection from './MotionSection.jsx';

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;
const simpleIcon = (slug, tint) => `https://cdn.simpleicons.org/${slug}/${tint}`;

// Six capability layers, ordered base -> top (index 0 = L1 foundation, index 5 = L6 apex).
const LAYERS = [
    {
        id: 'research', num: 'L1', code: 'RESEARCH', short: 'Research', zhShort: '研究',
        title: 'Research Systems', zhTitle: '研究系統',
        body: 'Frame research questions, synthesize evidence, and turn academic logic into decision-ready briefs.',
        zhBody: '釐清研究問題、整合證據，將學術邏輯轉化為可決策的分析材料。',
        tools: ['Matlab', 'EEG', 'fMRI', 'APA'],
    },
    {
        id: 'ux', num: 'L2', code: 'PRODUCT · UX', short: 'Product · UX', zhShort: '設計',
        title: 'Product and UX Design', zhTitle: '產品與 UX 設計',
        body: 'Map user needs, shape flows, and translate complex behavior into clear product interactions.',
        zhBody: '梳理使用者需求與流程，把複雜行為轉譯為清楚、可落地的產品互動。',
        tools: ['Figma', 'Photoshop', 'Illustrator', 'Prototyping'],
    },
    {
        id: 'frontend', num: 'L3', code: 'FRONTEND', short: 'Frontend', zhShort: '前端',
        title: 'Frontend Engineering', zhTitle: '前端工程',
        body: 'Build responsive React interfaces with durable component structure and polished interaction details.',
        zhBody: '以 React 建置響應式介面，兼顧元件結構、互動細節與交付品質。',
        tools: ['React', 'Vite', 'HTML', 'CSS'],
    },
    {
        id: 'data', num: 'L4', code: 'DATA SCIENCE', short: 'Data', zhShort: '資料',
        title: 'Data Science', zhTitle: '資料科學',
        body: 'Analyze behavioral and market data with Python, R, statistics, and machine-learning workflows.',
        zhBody: '使用 Python、R、統計與機器學習流程，分析行為資料與市場訊號。',
        tools: ['Python', 'R', 'Pandas', 'Sklearn'],
    },
    {
        id: 'backend', num: 'L5', code: 'BACKEND', short: 'Backend', zhShort: '後端',
        title: 'Backend and Data Architecture', zhTitle: '後端與資料架構',
        body: 'Design SQL schemas, ETL routines, and data quality checks for reliable product intelligence.',
        zhBody: '設計 SQL schema、ETL 流程與資料品質檢查，支撐可信任的產品情報。',
        tools: ['PostgreSQL', 'FastAPI', 'ETL', 'SQL'],
    },
    {
        id: 'ai', num: 'L6', code: 'AI STRATEGY', short: 'AI Strategy', zhShort: 'AI',
        title: 'AI Product Strategy', zhTitle: 'AI 產品策略',
        body: 'Connect LLM workflows, prompt systems, and governance logic into usable AI-native tools.',
        zhBody: '整合 LLM 流程、提示系統與治理邏輯，打造可被使用的 AI 原生工具。',
        tools: ['LLM', 'OpenAI API', 'Prompt Flow', 'Governance'],
    },
];

const LEVELS = {
    excellent: { label: 'Excellent', zh: '精通' },
    advanced: { label: 'Advanced', zh: '進階' },
    strong: { label: 'Strong', zh: '熟練' },
};

// Nine skill signals. Each carries a proficiency level, the layer it belongs to,
// and the projects that stand as evidence for it (slugs into PROJECTS).
const SKILLS = [
    {
        name: 'Research framing / paper writing', zhName: '研究架構／報告與論文撰寫',
        level: 'excellent', layer: 'research', evidence: ['brain-and-learning', 'field-journey'],
        tools: [{ mark: 'RQ', label: 'Research Q' }, { mark: 'LR', label: 'Lit Review' }, { mark: 'APA', label: 'APA' }, { mark: 'GP', label: 'Grant Plan' }],
    },
    {
        name: 'Experimental design / Matlab', zhName: '實驗設計／Matlab 腳本',
        level: 'excellent', layer: 'research', evidence: ['brain-and-learning', 'psymatch'],
        tools: [{ src: devicon('matlab/matlab-original.svg'), label: 'Matlab' }, { mark: 'RCT', label: 'RCT' }, { mark: 'EEG', label: 'EEG' }, { mark: 'fMRI', label: 'fMRI' }],
    },
    {
        name: 'Python / R / SPSS / JASP', zhName: 'Python／R／SPSS／JASP',
        level: 'advanced', layer: 'data', evidence: ['brain-and-learning', 'ai-news-intelligence'],
        tools: [{ src: devicon('python/python-original.svg'), label: 'Python' }, { src: devicon('r/r-original.svg'), label: 'R' }, { mark: 'SP', label: 'SPSS' }, { mark: 'JA', label: 'JASP' }],
    },
    {
        name: 'Machine learning / data analysis', zhName: '機器學習／資料分析',
        level: 'advanced', layer: 'data', evidence: ['deepscout', 'ai-news-intelligence'],
        tools: [{ src: simpleIcon('pandas', 'a78bfa'), label: 'Pandas' }, { src: simpleIcon('scikitlearn', 'a78bfa'), label: 'Sklearn' }, { mark: 'ML', label: 'ML' }, { mark: 'AN', label: 'ANOVA' }],
    },
    {
        name: 'Figma / Photoshop / Illustrator', zhName: 'Figma／Photoshop／Illustrator',
        level: 'advanced', layer: 'ux', evidence: ['emobot-plus', 'ux-hmi-interaction-lab'],
        tools: [{ src: devicon('figma/figma-original.svg'), label: 'Figma' }, { src: devicon('photoshop/photoshop-plain.svg'), label: 'Ps' }, { src: devicon('illustrator/illustrator-plain.svg'), label: 'Ai' }, { mark: 'CV', label: 'Canva' }],
    },
    {
        name: 'HTML / CSS / React / Vite', zhName: 'HTML／CSS／React／Vite',
        level: 'advanced', layer: 'frontend', evidence: ['ux-hmi-interaction-lab', 'industry-strategy-platform'],
        tools: [{ src: devicon('html5/html5-original.svg'), label: 'HTML' }, { src: devicon('css3/css3-original.svg'), label: 'CSS' }, { src: devicon('react/react-original.svg'), label: 'React' }, { src: devicon('vitejs/vitejs-original.svg'), label: 'Vite' }],
    },
    {
        name: 'SQL / PostgreSQL / MySQL', zhName: 'SQL／PostgreSQL／MySQL',
        level: 'strong', layer: 'backend', evidence: ['deeptech-database', 'startup-intelligence-platform'],
        tools: [{ mark: 'SQL', label: 'SQL' }, { src: devicon('postgresql/postgresql-original.svg'), label: 'PostgreSQL' }, { src: devicon('mysql/mysql-original.svg'), label: 'MySQL' }, { mark: 'QA', label: 'Data QA' }],
    },
    {
        name: 'LLM APIs / prompt systems', zhName: 'LLM API／提示系統設計',
        level: 'strong', layer: 'ai', evidence: ['ai-news-intelligence', 'deepscout', 'emobot-plus'],
        tools: [{ mark: 'OA', label: 'OpenAI' }, { mark: 'API', label: 'API' }, { mark: 'LLM', label: 'LLM' }, { mark: 'PF', label: 'Prompt Flow' }],
    },
    {
        name: 'Backend and data infrastructure', zhName: '後端與資料基礎建設',
        level: 'strong', layer: 'backend', evidence: ['ai-news-intelligence', 'deeptech-database'],
        tools: [{ src: devicon('fastapi/fastapi-original.svg'), label: 'FastAPI' }, { src: devicon('python/python-original.svg'), label: 'Python' }, { src: devicon('postgresql/postgresql-original.svg'), label: 'PostgreSQL' }, { mark: 'ETL', label: 'ETL' }],
    },
];

const PROJ_BY_SLUG = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));
const isNarrow = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;

export default function SkillsSection({ navigate }) {
    const { t, lang } = useLang();
    const PA = lang === 'zh';
    const [animated, setAnimated] = useState(false);
    const [active, setActive] = useState(() => (isNarrow() ? 0 : null)); // null = overview; index = inspecting
    const [hot, setHot] = useState(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { setAnimated(true); io.disconnect(); }
        }, { threshold: 0.2 });
        if (sceneRef.current) io.observe(sceneRef.current);
        return () => io.disconnect();
    }, []);

    // Esc collapses the drawer back to overview (desktop).
    useEffect(() => {
        if (active == null) return;
        const onKey = e => { if (e.key === 'Escape' && !isNarrow()) setActive(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active]);

    const inspecting = active != null;
    const cycle = (dir) => setActive(a => ((a == null ? 0 : a) + dir + LAYERS.length) % LAYERS.length);

    const toolMark = (tool) => tool.mark || tool.label.replace(/[^a-z0-9]/gi, '').slice(0, 3).toUpperCase();

    const levelBadge = (lv) => React.createElement('span', { className: `fst-level is-${lv}` }, PA ? LEVELS[lv].zh : LEVELS[lv].label);

    const evidence = (slugs) => React.createElement('div', { className: 'fst-evidence' },
        React.createElement('span', { className: 'fst-evidence-label' }, PA ? '證據' : 'Evidence'),
        ...slugs.map(slug => {
            const p = PROJ_BY_SLUG[slug];
            if (!p) return null;
            return React.createElement('a', {
                key: slug,
                className: 'fst-evidence-link',
                href: `#/project/${slug}`,
                onClick: e => { e.preventDefault(); if (navigate) navigate(`#/project/${slug}`); },
            },
                React.createElement('span', { className: 'fst-evidence-num' }, p.num),
                React.createElement('span', { className: 'fst-evidence-name' }, PA ? p.zhTitle : p.title),
                React.createElement('span', { className: 'fst-evidence-arrow', 'aria-hidden': 'true' }, '↗')
            );
        })
    );

    const sigTool = (tool) => React.createElement('span', { className: 'fst-sig-tool', key: tool.label },
        React.createElement('span', { className: 'fst-sig-tool-icon', 'aria-hidden': 'true' },
            React.createElement('span', { className: 'fst-sig-tool-mark' }, toolMark(tool)),
            tool.src && React.createElement('img', {
                src: tool.src, alt: '', loading: 'lazy',
                onError: (e) => { e.currentTarget.style.display = 'none'; },
            })
        ),
        React.createElement('span', null, tool.label)
    );

    // ── 3D exploded plane (label = L# + code only; tool marks removed for clarity) ──
    const plane = (layer, i) => React.createElement('button', {
        key: layer.id, type: 'button',
        className: `fst-layer${i === active ? ' is-active' : ''}${layer.id === hot ? ' is-hot' : ''}`,
        style: { '--z': animated ? `${i * 54}px` : '0px', transitionDelay: `${i * 0.06}s` },
        'aria-pressed': i === active,
        'aria-expanded': i === active,
        'aria-label': `${layer.num} ${PA ? layer.zhTitle : layer.title}`,
        onClick: () => setActive(i),
        onMouseEnter: () => setHot(layer.id),
        onMouseLeave: () => setHot(null),
        onFocus: () => setHot(layer.id),
        onBlur: () => setHot(null),
    },
        React.createElement('span', { className: 'fst-layer-face', 'aria-hidden': 'true' },
            React.createElement('span', { className: 'fst-layer-num' }, layer.num),
            React.createElement('span', { className: 'fst-layer-code' }, layer.code),
            React.createElement('span', { className: 'fst-layer-scan' })
        )
    );

    // ── persistent horizontal layer index (works in both states) ──
    const indexBtn = (layer, i) => React.createElement('button', {
        key: layer.id, type: 'button',
        className: `fst-idx-btn${i === active ? ' is-active' : ''}${layer.id === hot ? ' is-hot' : ''}`,
        'aria-pressed': i === active,
        onClick: () => setActive(i),
        onMouseEnter: () => setHot(layer.id),
        onMouseLeave: () => setHot(null),
    },
        React.createElement('span', { className: 'fst-idx-num' }, layer.num),
        React.createElement('span', { className: 'fst-idx-name' }, PA ? layer.zhShort : layer.short)
    );

    // ── HUD inspector for one layer (merges the skill ledger for that layer) ──
    const buildInspector = (idx) => {
        const layer = LAYERS[idx];
        const skills = SKILLS.filter(s => s.layer === layer.id);

        const bodyRows = [
            React.createElement('h3', { className: 'fst-insp-title', key: 'title' }, PA ? layer.zhTitle : layer.title),
            React.createElement('p', { className: 'fst-insp-desc', key: 'desc' }, PA ? layer.zhBody : layer.body),
            React.createElement('div', { className: 'fst-insp-section', key: 'sec-tools' },
                React.createElement('span', { className: 'fst-insp-section-line' }),
                React.createElement('span', null, PA ? '工具鏈' : 'Tooling')
            ),
            React.createElement('div', { className: 'fst-insp-tools', key: 'tools' },
                ...layer.tools.map(tp => React.createElement('span', { className: 'fst-chip', key: tp }, tp))
            ),
            React.createElement('div', { className: 'fst-insp-section', key: 'sec-sig' },
                React.createElement('span', { className: 'fst-insp-section-line' }),
                React.createElement('span', null, PA ? '技能訊號' : 'Skill signals'),
                React.createElement('span', { className: 'fst-insp-section-count' }, `${String(skills.length).padStart(2, '0')}`)
            ),
            ...skills.map((s, k) => React.createElement('div', { className: 'fst-sig', key: `sig-${k}` },
                React.createElement('div', { className: 'fst-sig-head' },
                    React.createElement('span', { className: 'fst-sig-name' }, PA ? s.zhName : s.name),
                    levelBadge(s.level)
                ),
                React.createElement('div', { className: 'fst-sig-tools' }, ...s.tools.map(sigTool)),
                evidence(s.evidence)
            )),
        ];

        return React.createElement('div', { className: 'fst-inspector' },
            React.createElement('span', { className: 'fst-hud-bracket tl', 'aria-hidden': 'true' }),
            React.createElement('span', { className: 'fst-hud-bracket tr', 'aria-hidden': 'true' }),
            React.createElement('span', { className: 'fst-hud-bracket bl', 'aria-hidden': 'true' }),
            React.createElement('span', { className: 'fst-hud-bracket br', 'aria-hidden': 'true' }),
            React.createElement('div', { className: 'fst-insp-head' },
                React.createElement('div', { className: 'fst-insp-sysid' },
                    React.createElement('span', { className: 'fst-insp-diamond', 'aria-hidden': 'true' }, '◇'),
                    'CAPABILITY.SYS',
                    React.createElement('span', { className: 'fst-insp-code' }, `${String(idx + 1).padStart(2, '0')} / 06`)
                ),
                React.createElement('div', { className: 'fst-insp-mini', 'aria-hidden': 'true' },
                    ...LAYERS.map((l, i) => ({ l, i })).reverse().map(({ l, i }) =>
                        React.createElement('span', { key: l.id, className: `fst-mini-bar${i === idx ? ' is-on' : ''}` }))
                ),
                React.createElement('button', {
                    type: 'button', className: 'fst-insp-close',
                    'aria-label': PA ? '收合面板' : 'Collapse panel',
                    onClick: () => setActive(null),
                }, '×')
            ),
            React.createElement('div', { className: 'fst-insp-body', key: idx },
                ...bodyRows.map((el, i) => React.cloneElement(el, { style: { ...(el.props.style || {}), '--i': i } }))
            ),
            React.createElement('div', { className: 'fst-insp-foot' },
                React.createElement('button', { type: 'button', className: 'fst-insp-nav', onClick: () => cycle(-1) },
                    React.createElement('span', { 'aria-hidden': 'true' }, '←'), PA ? '上一層' : 'Prev'),
                React.createElement('span', { className: 'fst-insp-pos' }, `${layer.num} · ${PA ? layer.zhShort : layer.short}`),
                React.createElement('button', { type: 'button', className: 'fst-insp-nav', onClick: () => cycle(1) },
                    PA ? '下一層' : 'Next', React.createElement('span', { 'aria-hidden': 'true' }, '→'))
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
            React.createElement('div', { className: `fst-theatre${inspecting ? ' is-inspecting' : ''}` },
                React.createElement('div', { className: 'fst-stage' },
                    React.createElement('div', { className: `fst-scene${animated ? ' is-live' : ''}${inspecting ? ' is-aside' : ''}`, ref: sceneRef },
                        React.createElement('div', { className: 'fst-stack' }, ...LAYERS.map(plane))
                    )
                ),
                React.createElement('div', { className: `fst-inspector-wrap${inspecting ? ' is-open' : ''}`, 'aria-hidden': inspecting ? undefined : 'true' },
                    inspecting ? buildInspector(active) : null
                )
            ),
            React.createElement('div', { className: 'fst-console reveal reveal-delay-3' },
                React.createElement('div', { className: 'fst-idx-hint' },
                    React.createElement('span', { className: 'fst-idx-hint-dot', 'aria-hidden': 'true' }),
                    inspecting
                        ? (PA ? `檢視中 — 共 6 層能力堆疊` : `Inspecting — 6-layer capability stack`)
                        : (PA ? `立體剖面 — 點擊任一層開始檢視` : `Exploded view — select a layer to inspect`)
                ),
                React.createElement('div', { className: 'fst-index', role: 'group', 'aria-label': PA ? '能力層索引' : 'Capability layer index' },
                    ...LAYERS.map(indexBtn)
                )
            )
        )
    );
}
