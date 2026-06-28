import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';
import { DOMAIN, TECH, CERTS } from '../../data/skills.js';

export default function SkillsSection() {
    const { t } = useLang();
    const [animated, setAnimated] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { setAnimated(true); io.disconnect(); }
        }, { threshold: 0.2 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    return React.createElement('section', { className: 'skills-v5', id: 'skills' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-label reveal' }, t('skillsLabel')),
            React.createElement('h2', { className: 'section-title reveal reveal-delay-1' },
                t('skillsTitle1'), ' ', React.createElement('em', null, t('skillsTitleEm')), t('skillsTitle2')),
            React.createElement('div', { className: 'skills-v5-grid reveal', ref },
                React.createElement('div', { className: 'skill-panel panel-domain' },
                    React.createElement('div', { className: 'skill-panel-title' },
                        React.createElement('span', { className: 'skill-panel-title-dot' }),
                        t('skillDomain')),
                    React.createElement('div', null,
                        ...DOMAIN.map(d => React.createElement('div', { className: 'domain-item', key: d.name },
                            React.createElement('span', { className: 'domain-name' }, d.name),
                            React.createElement('div', { className: 'domain-dots' },
                                ...[1,2,3,4,5].map(i => React.createElement('span', { className: `domain-dot${i <= d.level ? ' filled' : ''}`, key: i }))))))),
                React.createElement('div', { className: 'skill-panel panel-tech' },
                    React.createElement('div', { className: 'skill-panel-title' },
                        React.createElement('span', { className: 'skill-panel-title-dot' }),
                        t('skillTech')),
                    React.createElement('div', null,
                        ...TECH.map(s => React.createElement('div', { className: 'bar-item', key: s.name },
                            React.createElement('div', { className: 'bar-header' },
                                React.createElement('span', { className: 'bar-name' }, s.name),
                                React.createElement('span', { className: 'bar-pct' }, `${s.pct}%`)),
                            React.createElement('div', { className: 'bar-track' },
                                React.createElement('div', { className: 'bar-fill', style: { width: animated ? `${s.pct}%` : '0%' } })))))),
                React.createElement('div', { className: 'skill-panel panel-certs' },
                    React.createElement('div', { className: 'skill-panel-title' },
                        React.createElement('span', { className: 'skill-panel-title-dot' }),
                        t('certTitle')),
                    React.createElement('div', null,
                        ...CERTS.map(c => React.createElement('div', { className: 'cert-item', key: c.name },
                            React.createElement('div', { className: 'cert-logo', style: { color: c.color, background: c.bg } }, c.logo),
                            React.createElement('div', { className: 'cert-info' },
                                React.createElement('div', { className: 'cert-name' }, c.name),
                                React.createElement('div', { className: 'cert-issuer' }, c.issuer)))))))));
}
