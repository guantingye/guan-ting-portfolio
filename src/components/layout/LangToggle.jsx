import React from 'react';
import { useLang } from '../../app/providers/LanguageProvider.jsx';

export default function LangToggle() {
    const { lang, setLang } = useLang();
    return React.createElement('div', { className: 'lang-toggle' },
        React.createElement('div', { className: 'lang-pill', style: { transform: lang === 'zh' ? 'translateX(100%)' : 'translateX(0)' } }),
        React.createElement('button', { className: `lang-btn${lang === 'en' ? ' active' : ''}`, onClick: () => setLang('en') }, 'EN'),
        React.createElement('button', { className: `lang-btn${lang === 'zh' ? ' active' : ''}`, onClick: () => setLang('zh') }, 'ZH')
    );
}
