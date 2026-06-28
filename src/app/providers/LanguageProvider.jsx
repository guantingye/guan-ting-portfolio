import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { TRANSLATIONS } from '../../data/translations.js';

const T = TRANSLATIONS;

export const LangCtx = createContext({ lang: 'en', t: k => k, setLang: () => {} });

export const useLang = () => useContext(LangCtx);

export function LangProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        try { return localStorage.getItem('portfolio-lang') || 'en'; } catch { return 'en'; }
    });
    const setLang = useCallback(l => {
        setLangState(l);
        document.getElementById('html-root').className = l === 'zh' ? 'lang-zh' : '';
        try { localStorage.setItem('portfolio-lang', l); } catch {}
    }, []);
    useEffect(() => {
        document.getElementById('html-root').className = lang === 'zh' ? 'lang-zh' : '';
    }, [lang]);
    const t = useCallback(k => T[lang][k] ?? T.en[k] ?? k, [lang]);
    return React.createElement(LangCtx.Provider, { value: { lang, t, setLang } }, children);
}
