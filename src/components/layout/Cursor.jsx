import { useEffect } from 'react';

export default function Cursor() {
    useEffect(() => {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (!dot || !ring || prefersReducedMotion || isTouchDevice) return undefined;
        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my, rafId;
        const LERP = 0.14;
        const interactiveSelector = 'a,button,.project-card';
        const onMove = event => {
            mx = event.clientX; my = event.clientY;
            dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
        };
        const onPointerOver = event => {
            if (event.target.closest(interactiveSelector)) document.body.classList.add('cursor-hover');
        };
        const onPointerOut = event => {
            if (event.target.closest(interactiveSelector)) document.body.classList.remove('cursor-hover');
        };
        const loop = () => {
            rx += (mx - rx) * LERP; ry += (my - ry) * LERP;
            ring.style.transform = `translate(${Math.round(rx - 18)}px, ${Math.round(ry - 18)}px)`;
            rafId = requestAnimationFrame(loop);
        };
        loop();
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerover', onPointerOver);
        document.addEventListener('pointerout', onPointerOut);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerover', onPointerOver);
            document.removeEventListener('pointerout', onPointerOut);
        };
    }, []);
    return null;
}
