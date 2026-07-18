import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';
import { PROJECTS } from '../../data/projects.js';
import MotionSection from './MotionSection.jsx';

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;
const simpleIcon = (slug, tint) => `https://cdn.simpleicons.org/${slug}/${tint}`;

// Six capability layers, ordered base -> top (index 0 = L1 foundation, index 5 = L6 apex).
const LAYERS = [
    {
        id: 'research', num: 'L1', code: 'RESEARCH', short: 'Research', zhShort: '研究', sig: 'SYS.RES-01',
        title: 'Research Systems', zhTitle: '研究系統',
        body: 'Frame research questions, synthesize evidence, and turn academic logic into decision-ready briefs.',
        zhBody: '釐清研究問題、整合證據，將學術邏輯轉化為可決策的分析材料。',
        tools: ['Matlab', 'EEG', 'fMRI', 'APA'],
    },
    {
        id: 'ux', num: 'L2', code: 'PRODUCT · UX', short: 'Product · UX', zhShort: '設計', sig: 'SYS.UXD-02',
        title: 'Product and UX Design', zhTitle: '產品與 UX 設計',
        body: 'Map user needs, shape flows, and translate complex behavior into clear product interactions.',
        zhBody: '梳理使用者需求與流程，把複雜行為轉譯為清楚、可落地的產品互動。',
        tools: ['Figma', 'Photoshop', 'Illustrator', 'Prototyping'],
    },
    {
        id: 'frontend', num: 'L3', code: 'FRONTEND', short: 'Frontend', zhShort: '前端', sig: 'SYS.FED-03',
        title: 'Frontend Engineering', zhTitle: '前端工程',
        body: 'Build responsive React interfaces with durable component structure and polished interaction details.',
        zhBody: '以 React 建置響應式介面，兼顧元件結構、互動細節與交付品質。',
        tools: ['React', 'Vite', 'HTML', 'CSS'],
    },
    {
        id: 'data', num: 'L4', code: 'DATA SCIENCE', short: 'Data', zhShort: '資料', sig: 'SYS.DAT-04',
        title: 'Data Science', zhTitle: '資料科學',
        body: 'Analyze behavioral and market data with Python, R, statistics, and machine-learning workflows.',
        zhBody: '使用 Python、R、統計與機器學習流程，分析行為資料與市場訊號。',
        tools: ['Python', 'R', 'Pandas', 'Sklearn'],
    },
    {
        id: 'backend', num: 'L5', code: 'BACKEND', short: 'Backend', zhShort: '後端', sig: 'SYS.BCK-05',
        title: 'Backend and Data Architecture', zhTitle: '後端與資料架構',
        body: 'Design SQL schemas, ETL routines, and data quality checks for reliable product intelligence.',
        zhBody: '設計 SQL schema、ETL 流程與資料品質檢查，支撐可信任的產品情報。',
        tools: ['PostgreSQL', 'FastAPI', 'ETL', 'SQL'],
    },
    {
        id: 'ai', num: 'L6', code: 'AI STRATEGY', short: 'AI Strategy', zhShort: 'AI', sig: 'SYS.AIS-06',
        title: 'AI Product Strategy', zhTitle: 'AI 產品策略',
        body: 'Connect LLM workflows, prompt systems, and governance logic into usable AI-native tools.',
        zhBody: '整合 LLM 流程、提示系統與治理邏輯，打造可被使用的 AI 原生工具。',
        tools: ['LLM', 'OpenAI API', 'Prompt Flow', 'Governance'],
    },
];

const LEVELS = {
    excellent: { label: 'Excellent', zh: '精通', ticks: 3 },
    advanced: { label: 'Advanced', zh: '進階', ticks: 2 },
    strong: { label: 'Strong', zh: '熟練', ticks: 1 },
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
const SIGNAL_COUNT = SKILLS.length;
const PROJECT_COUNT = new Set(SKILLS.flatMap(s => s.evidence)).size;
const isNarrow = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;

export default function SkillsSection({ navigate }) {
    const { t, lang } = useLang();
    const PA = lang === 'zh';
    const [animated, setAnimated] = useState(false);
    const [active, setActive] = useState(null); // null = overview; index = inspecting (both viewports start in overview)
    const [hot, setHot] = useState(null);
    const [closing, setClosing] = useState(false); // playing the dissipation effect before the drawer collapses
    const sceneRef = useRef(null);
    const closeTimer = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { setAnimated(true); io.disconnect(); }
        }, { threshold: 0.2 });
        if (sceneRef.current) io.observe(sceneRef.current);
        return () => io.disconnect();
    }, []);
    useEffect(() => () => clearTimeout(closeTimer.current), []);

    const inspecting = active != null;
    const select = (i) => { clearTimeout(closeTimer.current); setClosing(false); setActive(i); };
    const cycle = (dir) => { setClosing(false); setActive(a => ((a == null ? 0 : a) + dir + LAYERS.length) % LAYERS.length); };
    // dissolve the panel like a dying signal, then collapse the drawer
    const beginClose = () => {
        const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isNarrow() || reduce) { setActive(null); return; }
        setClosing(true);
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => { setActive(null); setClosing(false); }, 480);
    };

    // Esc collapses the drawer back to overview (desktop).
    useEffect(() => {
        if (active == null) return;
        const onKey = e => { if (e.key === 'Escape' && !isNarrow()) beginClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active]);

    const toolMark = (tool) => tool.mark || tool.label.replace(/[^a-z0-9]/gi, '').slice(0, 3).toUpperCase();

    const levelBadge = (lv) => React.createElement('span', { className: `fst-level is-${lv}` },
        React.createElement('span', { className: 'fst-level-ticks', 'aria-hidden': 'true' },
            ...[0, 1, 2].map(n => React.createElement('span', { key: n, className: `fst-level-tick${n < LEVELS[lv].ticks ? ' on' : ''}` }))
        ),
        PA ? LEVELS[lv].zh : LEVELS[lv].label
    );

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

    // ── 3D exploded plane: slab (thickness) + face; deforms when a layer is inspected ──
    const plane = (layer, i) => {
        let state = '';
        if (active != null) {
            if (i === active) state = ' is-active';
            else if (i > active) state = ' is-raised';
            else state = ' is-lower';
        } else if (layer.id === hot) {
            state = ' is-hot';
        }
        return React.createElement('button', {
            key: layer.id, type: 'button',
            className: `fst-layer${state}`,
            style: { '--zi': animated ? i : 0, transitionDelay: `${i * 0.05}s` },
            'aria-pressed': i === active,
            'aria-expanded': i === active,
            'aria-label': `${layer.num} ${PA ? layer.zhTitle : layer.title}`,
            onClick: () => select(i),
            onMouseEnter: () => setHot(layer.id),
            onMouseLeave: () => setHot(null),
            onFocus: () => setHot(layer.id),
            onBlur: () => setHot(null),
        },
            React.createElement('span', { className: 'fst-layer-slab', 'aria-hidden': 'true' }),
            React.createElement('span', { className: 'fst-layer-face', 'aria-hidden': 'true' },
                React.createElement('span', { className: 'fst-layer-corners' }),
                React.createElement('span', { className: 'fst-layer-num' }, layer.num),
                React.createElement('span', { className: 'fst-layer-code' }, layer.code),
                React.createElement('span', { className: 'fst-layer-scan' }),
                React.createElement('span', { className: 'fst-layer-sig' }, layer.sig)
            )
        );
    };

    // ── persistent horizontal layer index with altitude glyph + sliding indicator ──
    const indexBtn = (layer, i) => React.createElement('button', {
        key: layer.id, type: 'button',
        className: `fst-idx-btn${i === active ? ' is-active' : ''}${layer.id === hot ? ' is-hot' : ''}`,
        'aria-pressed': i === active,
        onClick: () => select(i),
        onMouseEnter: () => setHot(layer.id),
        onMouseLeave: () => setHot(null),
    },
        React.createElement('div', { className: 'fst-idx-top' },
            React.createElement('span', { className: 'fst-idx-num' }, layer.num),
            React.createElement('span', { className: 'fst-idx-alt', 'aria-hidden': 'true' },
                ...LAYERS.map((_, b) => React.createElement('span', {
                    key: b, className: `fst-idx-alt-bar${b === (LAYERS.length - 1 - i) ? ' on' : ''}`,
                }))
            )
        ),
        React.createElement('span', { className: 'fst-idx-name' }, PA ? layer.zhShort : layer.short)
    );

    // ── overview side panels: left MANIFEST (interactive), right TELEMETRY (ambient) ──
    const manifestRow = (layer, i) => React.createElement('button', {
        key: layer.id, type: 'button',
        className: `fst-manifest-row${i === active ? ' is-active' : ''}${layer.id === hot ? ' is-hot' : ''}`,
        onClick: () => select(i),
        onMouseEnter: () => setHot(layer.id),
        onMouseLeave: () => setHot(null),
        'aria-label': `${layer.num} ${PA ? layer.zhTitle : layer.title}`,
    },
        React.createElement('span', { className: 'fst-manifest-leader', 'aria-hidden': 'true' }),
        React.createElement('span', { className: 'fst-manifest-sig' }, layer.sig),
        React.createElement('span', { className: 'fst-manifest-name' }, PA ? layer.zhShort : layer.short)
    );
    const teleStat = (k, v) => React.createElement('div', { className: 'fst-tele-stat', key: k },
        React.createElement('span', { className: 'fst-tele-num' }, v),
        React.createElement('span', { className: 'fst-tele-cap' }, k)
    );
    const flankLeft = React.createElement('aside', {
        className: 'fst-flank is-left',
        'aria-hidden': inspecting ? 'true' : undefined,
    },
        React.createElement('div', { className: 'fst-flank-head' }, React.createElement('span', null, '//'), 'MANIFEST'),
        ...LAYERS.map((l, i) => ({ l, i })).reverse().map(({ l, i }) => manifestRow(l, i))
    );
    const flankRight = React.createElement('aside', { className: 'fst-flank is-right', 'aria-hidden': 'true' },
        React.createElement('div', { className: 'fst-flank-head' }, React.createElement('span', null, '//'), 'TELEMETRY'),
        React.createElement('div', { className: 'fst-tele' },
            teleStat('LAYERS', '06'),
            teleStat('SIGNALS', String(SIGNAL_COUNT).padStart(2, '0')),
            teleStat('PROJECTS', String(PROJECT_COUNT).padStart(2, '0'))
        ),
        React.createElement('div', { className: 'fst-tele-status' },
            React.createElement('div', { className: 'fst-tele-line' },
                React.createElement('span', { className: 'fst-tele-k' }, 'MODE'),
                React.createElement('span', { className: 'fst-tele-v' }, 'EXPLODED')
            ),
            React.createElement('div', { className: 'fst-tele-line' },
                React.createElement('span', { className: 'fst-tele-k' }, 'SCAN'),
                React.createElement('span', { className: 'fst-tele-v is-live' },
                    React.createElement('span', { className: 'fst-tele-dot' }), 'PASSIVE')
            ),
            React.createElement('div', { className: 'fst-eq' },
                ...[0, 1, 2, 3, 4].map(n => React.createElement('span', { key: n, className: 'fst-eq-bar', style: { '--n': n } }))
            )
        )
    );

    // ── HUD inspector for one layer (merges the skill ledger for that layer) ──
    const buildInspector = (idx) => {
        const layer = LAYERS[idx];
        const skills = SKILLS.filter(s => s.layer === layer.id);
        const links = new Set();
        skills.forEach(s => s.evidence.forEach(e => links.add(e)));
        const linkCount = links.size;

        const specCell = (label, value, cls) => React.createElement('div', { className: `fst-spec-cell${cls ? ' ' + cls : ''}` },
            React.createElement('span', { className: 'fst-spec-k' }, label),
            React.createElement('span', { className: 'fst-spec-v' }, value)
        );

        const bodyRows = [
            React.createElement('h3', { className: 'fst-insp-title', key: 'title' }, PA ? layer.zhTitle : layer.title),
            React.createElement('p', { className: 'fst-insp-desc', key: 'desc' }, PA ? layer.zhBody : layer.body),
            React.createElement('div', { className: 'fst-insp-section', key: 'sec-tools' },
                React.createElement('span', { className: 'fst-insp-section-slash' }, '//'),
                React.createElement('span', null, PA ? '工具鏈' : 'Tooling'),
                React.createElement('span', { className: 'fst-insp-section-rule' })
            ),
            React.createElement('div', { className: 'fst-insp-tools', key: 'tools' },
                ...layer.tools.map(tp => React.createElement('span', { className: 'fst-chip', key: tp }, tp))
            ),
            React.createElement('div', { className: 'fst-insp-section', key: 'sec-sig' },
                React.createElement('span', { className: 'fst-insp-section-slash' }, '//'),
                React.createElement('span', null, PA ? '技能訊號' : 'Skill signals'),
                React.createElement('span', { className: 'fst-insp-section-rule' }),
                React.createElement('span', { className: 'fst-insp-section-count' }, String(skills.length).padStart(2, '0'))
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

        return React.createElement('div', { className: `fst-inspector${closing ? ' is-closing' : ''}` },
            React.createElement('span', { className: 'fst-hud-bracket tl', 'aria-hidden': 'true' }),
            React.createElement('span', { className: 'fst-hud-bracket tr', 'aria-hidden': 'true' }),
            React.createElement('span', { className: 'fst-hud-bracket bl', 'aria-hidden': 'true' }),
            React.createElement('span', { className: 'fst-hud-bracket br', 'aria-hidden': 'true' }),
            React.createElement('span', { className: 'fst-insp-sweep', 'aria-hidden': 'true' }),
            React.createElement('div', { className: 'fst-insp-head' },
                React.createElement('div', { className: 'fst-insp-topline' },
                    React.createElement('div', { className: 'fst-insp-sysid' },
                        React.createElement('span', { className: 'fst-insp-diamond', 'aria-hidden': 'true' }, '◇'),
                        'CAPABILITY.SYS',
                        React.createElement('span', { className: 'fst-insp-caret', 'aria-hidden': 'true' }, '▍')
                    ),
                    React.createElement('div', { className: 'fst-insp-mini', 'aria-hidden': 'true' },
                        ...LAYERS.map((l, i) => ({ l, i })).reverse().map(({ l, i }) =>
                            React.createElement('span', { key: l.id, className: `fst-mini-bar${i === idx ? ' is-on' : ''}` }))
                    ),
                    React.createElement('button', {
                        type: 'button', className: 'fst-insp-close',
                        'aria-label': PA ? '收合面板' : 'Collapse panel',
                        onClick: beginClose,
                    }, '×')
                ),
                React.createElement('div', { className: 'fst-spec' },
                    specCell(PA ? '識別碼' : 'ID', layer.sig),
                    specCell(PA ? '層深' : 'DEPTH', `${String(idx + 1).padStart(2, '0')}/06`),
                    specCell(PA ? '連結' : 'LINKS', String(linkCount).padStart(2, '0')),
                    React.createElement('div', { className: 'fst-spec-cell is-status' },
                        React.createElement('span', { className: 'fst-spec-k' }, PA ? '狀態' : 'STATUS'),
                        React.createElement('span', { className: 'fst-spec-v' },
                            React.createElement('span', { className: 'fst-spec-dot', 'aria-hidden': 'true' }),
                            PA ? '檢視中' : 'ACTIVE'
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'fst-insp-body', key: idx },
                ...bodyRows.map((el, i) => React.cloneElement(el, { style: { ...(el.props.style || {}), '--i': i } }))
            ),
            React.createElement('div', { className: 'fst-insp-foot' },
                React.createElement('button', { type: 'button', className: 'fst-insp-nav', onClick: () => cycle(-1) },
                    React.createElement('span', { 'aria-hidden': 'true' }, '←'), PA ? '上一層' : 'Prev'),
                React.createElement('span', { className: 'fst-insp-pos' }, layer.sig),
                React.createElement('button', { type: 'button', className: 'fst-insp-nav', onClick: () => cycle(1) },
                    PA ? '下一層' : 'Next', React.createElement('span', { 'aria-hidden': 'true' }, '→'))
            )
        );
    };

    return React.createElement(MotionSection, { className: 'skills-ng', id: 'skills' },
        React.createElement('div', { className: 'fst-bg', 'aria-hidden': 'true' },
            React.createElement('div', { className: 'fst-bg-grid' }),
            React.createElement('span', { className: 'fst-bg-orb orb-a' }),
            React.createElement('span', { className: 'fst-bg-orb orb-b' })
        ),
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
                    flankLeft,
                    React.createElement('div', { className: `fst-scene${animated ? ' is-live' : ''}${inspecting ? ' is-aside' : ''}`, ref: sceneRef },
                        React.createElement('div', { className: 'fst-stack' }, ...LAYERS.map(plane))
                    ),
                    flankRight
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
                React.createElement('div', {
                    className: `fst-index${inspecting ? ' has-active' : ''}`,
                    role: 'group', 'aria-label': PA ? '能力層索引' : 'Capability layer index',
                    style: { '--pos': active == null ? 0 : active },
                },
                    React.createElement('span', { className: 'fst-index-slider', 'aria-hidden': 'true' }),
                    ...LAYERS.map(indexBtn)
                )
            )
        )
    );
}
