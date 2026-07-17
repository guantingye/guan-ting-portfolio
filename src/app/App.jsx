import React from 'react';
import { LangProvider, useLang } from './providers/LanguageProvider.jsx';
import { useRoute } from '../hooks/useRoute.js';
import NeuralCanvas from '../components/layout/NeuralCanvas.jsx';
import Cursor from '../components/layout/Cursor.jsx';
import ProgressBar from '../components/layout/ProgressBar.jsx';
import Nav from '../components/layout/Nav.jsx';
import Footer from '../components/layout/Footer.jsx';
import HomePage from '../pages/HomePage.jsx';
import ProjectPage from '../pages/ProjectPage.jsx';
import { PROJECT_THEMES } from '../data/projects.js';

function AppRoutes() {
    const { slug, navigate } = useRoute();
    const { lang } = useLang();
    return React.createElement(React.Fragment, null,
        React.createElement(NeuralCanvas, null),
        React.createElement(Cursor, null),
        React.createElement(ProgressBar, {
            key: slug || 'home-progress',
            theme: slug ? PROJECT_THEMES[slug] || 'data' : 'default',
            isProject: Boolean(slug),
            label: lang === 'zh'
                ? (slug ? '專案閱讀進度' : '頁面閱讀進度')
                : (slug ? 'Project reading progress' : 'Page reading progress'),
        }),
        React.createElement(Nav, { navigate }),
        slug
            ? React.createElement(ProjectPage, { key: slug, slug, navigate })
            : React.createElement(HomePage, { key: 'home', navigate }),
        React.createElement(Footer, { navigate }));
}

export default function App() {
    return React.createElement(LangProvider, null,
        React.createElement(AppRoutes, null));
}
