import React from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';
import { scrollTo } from '../../utils/scrollTo.js';

export default function Footer({ navigate }) {
    const { t } = useLang();
    return React.createElement('footer', null,
        React.createElement('span', null,
            t('footerCopy'), ' · ',
            React.createElement('span', { style: { color: 'var(--teal)' } }, t('footerTag'))),
        React.createElement('div', { className: 'footer-links' },
            React.createElement('a', { href: '#work', onClick: e => { e.preventDefault(); navigate('#/'); scrollTo('work'); } }, t('navWork')),
            React.createElement('a', { href: 'mailto:1126guanting@gmail.com' }, 'Email'),
            React.createElement('a', { href: '#awards', onClick: e => { e.preventDefault(); navigate('#/'); scrollTo('awards'); } }, t('navAwards'))));
}
