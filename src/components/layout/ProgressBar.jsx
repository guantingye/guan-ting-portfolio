import { useEffect } from 'react';

export default function ProgressBar() {
    useEffect(() => {
        const bar = document.getElementById('progress');
        if (!bar) return undefined;
        let ticking = false;
        const update = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? (document.documentElement.scrollTop / maxScroll) * 100 : 0;
            bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return null;
}
