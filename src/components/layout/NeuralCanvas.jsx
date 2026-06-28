import React, { useRef, useEffect } from 'react';

const NeuralCanvas = React.memo(function NeuralCanvas() {
    const rafRef = useRef(null);
    useEffect(() => {
        const canvas = document.getElementById('neural-canvas');
        const ctx = canvas?.getContext('2d');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSmallOrTouch = window.innerWidth < 960 || window.matchMedia('(pointer: coarse)').matches;
        if (!canvas || !ctx || prefersReducedMotion || isSmallOrTouch) {
            if (canvas) canvas.style.display = 'none';
            return undefined;
        }
        let width = 0, height = 0, nodes = [], resizeRaf = null, isRunning = true;
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const CONNECTION_DISTANCE = 112;
        const SPEED = 0.22;
        const getNodeCount = () => Math.max(26, Math.min(42, Math.round((window.innerWidth * window.innerHeight) / 52000)));
        const createNodes = () => {
            const count = getNodeCount();
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width, y: Math.random() * height,
                vx: (Math.random() - 0.5) * SPEED, vy: (Math.random() - 0.5) * SPEED,
                r: Math.random() * 1.3 + 0.5,
            }));
        };
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = window.innerWidth; height = window.innerHeight;
            canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            createNodes();
        };
        const requestResize = () => {
            if (resizeRaf) return;
            resizeRaf = requestAnimationFrame(() => { resizeRaf = null; resize(); });
        };
        const onPointerMove = event => { mouse.x = event.clientX; mouse.y = event.clientY; };
        const draw = () => {
            if (!isRunning) return;
            ctx.clearRect(0, 0, width, height);
            for (const node of nodes) {
                node.x += node.vx; node.y += node.vy;
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
                const dx = mouse.x - node.x, dy = mouse.y - node.y, d = Math.hypot(dx, dy);
                if (d < 90) { node.x += dx * 0.003; node.y += dy * 0.003; }
            }
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                    const d = Math.hypot(dx, dy);
                    if (d < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0,229,192,${(1 - d / CONNECTION_DISTANCE) * 0.14})`;
                        ctx.lineWidth = 0.75;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
                ctx.beginPath();
                ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,229,192,0.44)';
                ctx.fill();
            }
            rafRef.current = requestAnimationFrame(draw);
        };
        const onVisibilityChange = () => {
            isRunning = !document.hidden;
            if (isRunning && !rafRef.current) draw();
            if (!isRunning) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
        };
        resize(); draw();
        window.addEventListener('resize', requestResize, { passive: true });
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('visibilitychange', onVisibilityChange);
        return () => {
            isRunning = false;
            cancelAnimationFrame(rafRef.current);
            cancelAnimationFrame(resizeRaf);
            window.removeEventListener('resize', requestResize);
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, []);
    return null;
});

export default NeuralCanvas;
