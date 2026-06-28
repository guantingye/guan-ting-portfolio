import React, { useRef, useCallback } from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';

export default function ProjectCard({ project: p, index, navigate, lang }) {
    const { t } = useLang();
    const ref = useRef(null);
    const onMove = useCallback(e => {
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        ref.current.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }, []);
    if (p.comingSoon)
        return React.createElement('div', { ref, className: `project-card coming-soon reveal reveal-delay-${(index % 4) + 1}` },
            React.createElement('div', { className: 'card-num' }, p.num),
            React.createElement('div', { className: 'card-label' }, lang === 'zh' ? p.zhCategory : p.category),
            React.createElement('h3', { className: 'card-title' }, lang === 'zh' ? p.zhTitle : p.title),
            React.createElement('p', { className: 'card-desc', style: { color: 'var(--gray-dim)' } }, t('csDesc')));
    const isFeatured = index === 0;
    return React.createElement('a', {
        ref, href: `#/project/${p.slug}`,
        className: `project-card${isFeatured ? ' featured' : ''} reveal reveal-delay-${(index % 4) + 1}`,
        onMouseMove: onMove,
        onClick: e => { e.preventDefault(); navigate(`#/project/${p.slug}`); },
        'aria-label': `View ${lang === 'zh' ? p.zhTitle : p.title} project`,
    },
        isFeatured
            ? React.createElement('div', { className: 'featured-inner' },
                React.createElement('div', null,
                    React.createElement('div', { className: 'card-num' }, p.num),
                    React.createElement('div', { className: 'card-label' }, lang === 'zh' ? p.zhCategory : p.category),
                    React.createElement('h3', { className: 'card-title' }, lang === 'zh' ? p.zhTitle : p.title),
                    React.createElement('p', { className: 'card-desc' }, lang === 'zh' ? p.zhHook : p.hook),
                    React.createElement('div', { className: 'card-stack' }, p.stack.slice(0, 5).map(s => React.createElement('span', { className: 'stack-tag', key: s }, s)))),
                React.createElement('div', null,
                    React.createElement('div', { className: 'card-label', style: { marginBottom: 16 } }, t('projOutcomes')),
                    React.createElement('ul', { className: 'card-outcomes' }, (lang === 'zh' ? p.zhOutcomes : p.outcomes).slice(0, 3).map((o, i) => React.createElement('li', { key: i }, o)))))
            : React.createElement(React.Fragment, null,
                React.createElement('div', { className: 'card-num' }, p.num),
                React.createElement('div', { className: 'card-label' }, lang === 'zh' ? p.zhCategory : p.category),
                React.createElement('h3', { className: 'card-title' }, lang === 'zh' ? p.zhTitle : p.title),
                React.createElement('p', { className: 'card-desc' }, lang === 'zh' ? p.zhHook : p.hook),
                React.createElement('div', { className: 'card-stack' }, p.stack.slice(0, 4).map(s => React.createElement('span', { className: 'stack-tag', key: s }, s)))),
        React.createElement('div', { className: 'card-arrow' }, '↗'));
}
