import { useState, useEffect } from 'react';

export function useRoute() {
    const [hash, setHash] = useState(window.location.hash || '#/');
    useEffect(() => {
        const fn = () => setHash(window.location.hash || '#/');
        window.addEventListener('hashchange', fn);
        return () => window.removeEventListener('hashchange', fn);
    }, []);
    const path = hash.replace('#', '') || '/';
    const parts = path.split('/').filter(Boolean);
    const isProject = parts[0] === 'project' && parts[1];
    return {
        path,
        slug: isProject ? parts[1] : null,
        navigate: h => {
            window.location.hash = h;
            requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
        },
    };
}
