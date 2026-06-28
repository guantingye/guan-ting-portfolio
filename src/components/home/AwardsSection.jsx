import React from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';
import { AWARDS_DATA } from '../../data/awards.js';
import Icon from '../ui/Icon.jsx';

export default function AwardsSection() {
    const { t } = useLang();
    return React.createElement('section', { className: 'awards-section', id: 'awards', 'aria-label': 'Awards and Recognition' },
        React.createElement('div', { className: 'awards-grain', 'aria-hidden': 'true' }),
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'section-label reveal' }, t('awardsLabel')),
            React.createElement('h2', { className: 'section-title reveal reveal-delay-1' },
                t('awardsTitle1'), ' ',
                React.createElement('em', null, t('awardsTitleEm'))),
            React.createElement('div', { className: 'awards-grid' },
                AWARDS_DATA.map((a, i) => React.createElement('div', {
                    key: i,
                    className: `award-card reveal reveal-delay-${i + 1}`,
                    role: 'article',
                    'aria-label': t(a.titleKey),
                },
                    React.createElement('div', { className: 'award-card-top' },
                        React.createElement('span', { className: 'award-icon' }, React.createElement(Icon, { name: a.iconKey })),
                        React.createElement('span', { className: 'award-year' }, a.year)),
                    React.createElement('div', { className: 'award-period' }, a.period),
                    React.createElement('div', { className: 'award-title-text' }, t(a.titleKey)),
                    React.createElement('div', { className: 'award-inst' }, t(a.instKey)),
                    React.createElement('div', { className: 'award-desc' }, t(a.descKey)),
                    a.link && React.createElement('a', { className: 'award-link', href: a.link, target: '_blank', rel: 'noopener noreferrer' },
                        'VIEW SOURCE ', React.createElement('span', null, '→')),
                    React.createElement('div', { className: 'award-tags' },
                        a.tags.map(tag => React.createElement('span', { key: tag, className: 'award-tag' }, tag))))))));
}
