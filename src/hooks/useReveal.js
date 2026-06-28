import { useEffect } from 'react';

export function useReveal(deps = []) {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal,.timeline-item');
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, deps);
}
