import React, { useState, useEffect } from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';
import LangToggle from './LangToggle.jsx';
import { scrollTo } from '../../utils/scrollTo.js';

export default function Nav({ navigate }) {
    const { t } = useLang();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            const sections = ['story', 'work', 'skills', 'awards', 'contact'];
            const active = sections.find(id => {
                const el = document.getElementById(id);
                if (!el) return false;
                const { top, bottom } = el.getBoundingClientRect();
                return top <= 100 && bottom > 100;
            });
            setActiveSection(active || '');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const go = (id) => { setMenuOpen(false); navigate('#/'); scrollTo(id); };
    const navLink = (id, label) => React.createElement('a', {
        href: `#${id}`,
        onClick: e => { e.preventDefault(); go(id); },
        style: activeSection === id ? { color: 'var(--teal)' } : undefined,
    }, label);
    return React.createElement(React.Fragment, null,
        React.createElement('nav', { className: scrolled ? 'scrolled' : '' },
            React.createElement('a', { href: '#/', className: 'nav-brand', onClick: e => { e.preventDefault(); navigate('#/'); } },
                React.createElement('span', { className: 'nav-brand-dot' }), 'GT.YE'),
            React.createElement('div', { className: 'nav-right' },
                React.createElement('ul', { className: 'nav-links' },
                    React.createElement('li', null, navLink('story', t('navStory'))),
                    React.createElement('li', null, navLink('work', t('navWork'))),
                    React.createElement('li', null, navLink('skills', t('navSkills'))),
                    React.createElement('li', null, navLink('awards', t('navAwards'))),
                    React.createElement('li', null, navLink('contact', t('navContact')))),
                React.createElement('a', { href: 'assets/Ye_Guan%20Ting,%20CV.pdf', download: true, className: 'nav-resume', title: 'Download Resume PDF' }, '↓ CV'),
                React.createElement(LangToggle, null),
                React.createElement('button', { className: `hamburger${menuOpen ? ' open' : ''}`, onClick: () => setMenuOpen(!menuOpen), 'aria-label': 'Menu' },
                    React.createElement('span', null), React.createElement('span', null), React.createElement('span', null)))),
        React.createElement('div', { className: `mobile-menu${menuOpen ? ' open' : ''}` },
            React.createElement('a', { href: '#story', onClick: e => { e.preventDefault(); go('story'); } }, t('navStory')),
            React.createElement('a', { href: '#work', onClick: e => { e.preventDefault(); go('work'); } }, t('navWork')),
            React.createElement('a', { href: '#skills', onClick: e => { e.preventDefault(); go('skills'); } }, t('navSkills')),
            React.createElement('a', { href: '#awards', onClick: e => { e.preventDefault(); go('awards'); } }, t('navAwards')),
            React.createElement('a', { href: '#contact', onClick: e => { e.preventDefault(); go('contact'); } }, t('navContact')),
            React.createElement('a', { href: 'assets/Ye_Guan%20Ting,%20CV.pdf', download: true }, 'CV'),
            React.createElement('div', { className: 'mobile-menu-lang' }, React.createElement(LangToggle, null))));
}
