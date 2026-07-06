import React from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';
import { AWARDS_DATA } from '../../data/awards.js';
import MotionSection from './MotionSection.jsx';

function getAwardLogoClassName(award) {
    return [
        'award-logo-mark',
        award.logoTone && `is-${award.logoTone}`,
        award.logoShape && `is-${award.logoShape}`,
    ].filter(Boolean).join(' ');
}

function AwardLogoMark({ award }) {
    return React.createElement('span', {
        className: getAwardLogoClassName(award),
        'aria-hidden': 'true',
    },
        award.logoText && React.createElement('span', { className: 'award-logo-textmark' }, award.logoText),
        award.logoUrl && React.createElement('img', {
            src: award.logoUrl,
            alt: '',
            loading: 'lazy',
            decoding: 'async',
            referrerPolicy: 'no-referrer',
            onError: event => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.parentElement?.classList.add('is-fallback');
            },
        }),
        award.logoFallback && React.createElement('span', { className: 'award-logo-fallback' }, award.logoFallback));
}

function AwardWallItem({ award, index, t }) {
    const content = React.createElement(React.Fragment, null,
        React.createElement(AwardLogoMark, { award }),
        React.createElement('span', { className: 'award-logo-title' }, t(award.titleKey)),
        React.createElement('span', { className: 'award-logo-meta' }, `${award.year} / ${t(award.instKey)}`));

    if (!award.link) {
        return React.createElement('article', {
            className: `award-logo-item reveal reveal-delay-${index + 1}`,
            'aria-label': t(award.titleKey),
        }, content);
    }

    return React.createElement('a', {
        className: `award-logo-item reveal reveal-delay-${index + 1}`,
        href: award.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${t(award.titleKey)} ${t('awardsSource')}`,
    }, content);
}

export default function AwardsSection() {
    const { t } = useLang();

    return React.createElement(MotionSection, { className: 'awards-section', id: 'awards', 'aria-label': 'Awards and Recognition' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'awards-header' },
                React.createElement('div', { className: 'section-label reveal' }, t('awardsLabel')),
                React.createElement('h2', { className: 'section-title reveal reveal-delay-1' },
                    t('awardsTitle1'), ' ',
                    React.createElement('em', null, t('awardsTitleEm')))),
            React.createElement('div', { className: 'awards-wall' },
                React.createElement('div', { className: 'awards-starfield', 'aria-hidden': 'true' }),
                React.createElement('div', { className: 'awards-logo-grid' },
                    AWARDS_DATA.map((award, index) => React.createElement(AwardWallItem, {
                        award,
                        index,
                        key: award.titleKey,
                        t,
                    }))))));
}
