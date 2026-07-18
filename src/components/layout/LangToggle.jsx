import React from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';

export default function LangToggle() {
    const { lang, setLang } = useLang();
    return React.createElement('div', { className: 'lang-toggle', role: 'group', 'aria-label': lang === 'zh' ? '語言選擇' : 'Language' },
        React.createElement('div', { className: 'lang-pill', style: { transform: lang === 'zh' ? 'translateX(100%)' : 'translateX(0)' } }),
        React.createElement('button', {
            type: 'button',
            className: `lang-btn${lang === 'en' ? ' active' : ''}`,
            onClick: () => setLang('en'),
            'aria-pressed': lang === 'en',
            'aria-label': 'English',
        }, 'EN'),
        React.createElement('button', {
            type: 'button',
            className: `lang-btn${lang === 'zh' ? ' active' : ''}`,
            onClick: () => setLang('zh'),
            'aria-pressed': lang === 'zh',
            'aria-label': '繁體中文',
        }, 'ZH')
    );
}
