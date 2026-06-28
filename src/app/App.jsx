import React from 'react';
import { LangProvider } from './providers/LanguageProvider.jsx';
import { useRoute } from '../hooks/useRoute.js';
import NeuralCanvas from '../components/layout/NeuralCanvas.jsx';
import Cursor from '../components/layout/Cursor.jsx';
import ProgressBar from '../components/layout/ProgressBar.jsx';
import Nav from '../components/layout/Nav.jsx';
import Footer from '../components/layout/Footer.jsx';
import HomePage from '../pages/HomePage.jsx';
import ProjectPage from '../pages/ProjectPage.jsx';

function AppRoutes() {
    const { slug, navigate } = useRoute();
    return React.createElement(React.Fragment, null,
        React.createElement(NeuralCanvas, null),
        React.createElement(Cursor, null),
        React.createElement(ProgressBar, null),
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
