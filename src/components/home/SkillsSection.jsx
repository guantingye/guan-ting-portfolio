import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';

const icon = (slug, tint) => `https://cdn.simpleicons.org/${slug}/${tint}`;

const BADGES = [
    { slug: 'python', tint: 'a78bfa', cap: 'AI / Data',   zhCap: 'AI／資料' },
    { slug: 'r',      tint: '38bdf8', cap: 'Statistics',  zhCap: '統計分析' },
    { slug: 'react',  tint: '00e5c0', cap: 'Frontend',    zhCap: '前端開發' },
    { slug: 'claude', tint: 'ffb347', cap: 'LLM APIs',    zhCap: 'LLM 應用' },
];

const SLIDERS_LEFT = [
    { name: 'Python (Data / AI)',        pct: 90 },
    { name: 'R · SPSS · JASP',           pct: 88 },
    { name: 'EEG / fMRI Analysis',       pct: 80 },
];

const SLIDERS_RIGHT = [
    { name: 'LLM APIs · Prompt Eng.',    pct: 82 },
];

const CARD_LOGOS = [
    { slug: 'fastapi',    tint: '00e5c0', label: 'FastAPI' },
    { slug: 'postgresql', tint: '38bdf8', label: 'PostgreSQL' },
    { slug: 'pandas',     tint: 'a78bfa', label: 'Pandas' },
];

const DOMAIN_NG = [
    { name: 'Cognitive Neuroscience',  zhName: '認知神經科學',  level: 5 },
    { name: 'AI Product Design',       zhName: 'AI 產品設計',   level: 4 },
    { name: 'UX Research',             zhName: '用戶體驗研究',  level: 4 },
    { name: 'Deep Tech Strategy',      zhName: '深科技策略',    level: 4 },
    { name: 'Psychometrics',           zhName: '心理計量學',    level: 5 },
    { name: 'Ecosystem Mapping',       zhName: '生態系統分析',  level: 4 },
    { name: 'Digital Mental Health',   zhName: '數位心理健康',  level: 3 },
    { name: 'Data Storytelling',       zhName: '資料敘事',      level: 4 },
];

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

    const slider = (s, i) => React.createElement('div', { className: 'fs-slider', key: s.name },
        React.createElement('div', { className: 'fs-slider-head' },
            React.createElement('span', { className: 'fs-slider-name' }, s.name),
            React.createElement('span', { className: 'fs-slider-pct' }, `${s.pct}%`)
        ),
        React.createElement('div', { className: 'fs-slider-track' },
            React.createElement('div', { className: 'fs-slider-fill', style: {
                width: animated ? `${s.pct}%` : '0%', transitionDelay: `${i * 0.09}s`,
            }}),
            React.createElement('span', { className: 'fs-slider-knob', style: {
                left: animated ? `${s.pct}%` : '0%', transitionDelay: `${i * 0.09}s`,
            }})
        )
    );

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
                        ? '認知神經科學研究 × AI 產品設計 × 全端資料工程——支撐本站每一個案例的混合技能組合。'
                        : 'Cognitive neuroscience research × AI product design × full-stack data engineering — the hybrid toolkit behind every case study on this site.'
                )
            ),
            React.createElement('div', { className: 'fs-ovals reveal reveal-delay-2' },
                ...BADGES.map(b =>
                    React.createElement('div', { className: 'fs-oval', key: b.slug },
                        React.createElement('img', { src: icon(b.slug, b.tint), alt: `${b.cap} logo`, loading: 'lazy' }),
                        React.createElement('span', { className: 'fs-oval-cap' }, PA ? b.zhCap : b.cap)
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
                        slider({ name: PA ? '後端與資料架構' : 'Backend & Data Infra', pct: 75 }, SLIDERS_LEFT.length + SLIDERS_RIGHT.length),
                        React.createElement('div', { className: 'fs-card-logos' },
                            ...CARD_LOGOS.map(l =>
                                React.createElement('div', { className: 'fs-card-logo', key: l.slug },
                                    React.createElement('img', { src: icon(l.slug, l.tint), alt: `${l.label} logo`, loading: 'lazy' }),
                                    React.createElement('span', null, l.label)
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement('hr', { className: 'skills-ng-sep' }),
            React.createElement('div', { className: 'domain-ng-header' },
                PA ? `領域專長 · ${DOMAIN_NG.length} 領域` : `Domain Expertise · ${DOMAIN_NG.length} Areas`
            ),
            React.createElement('div', { className: 'domain-ng-grid' },
                ...DOMAIN_NG.map(d =>
                    React.createElement('div', { className: 'domain-ng-chip', key: d.name },
                        React.createElement('span', { className: 'domain-ng-name' }, PA ? d.zhName : d.name),
                        React.createElement('div', { className: 'domain-ng-dots' },
                            ...[1,2,3,4,5].map(i =>
                                React.createElement('span', { className: `domain-ng-dot${i <= d.level ? ' on' : ''}`, key: i })
                            )
                        )
                    )
                )
            )
        )
    );
}
