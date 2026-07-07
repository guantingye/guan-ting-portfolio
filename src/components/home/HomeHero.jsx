import React, { useEffect, useRef } from 'react';
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from 'motion/react';
import { scrollTo } from '../../utils/scrollTo.js';

const HERO_COPY = {
    zh: {
        kicker: 'SIGNAL PORTFOLIO / GUAN-TING YE',
        headline: ['從人類訊號-', '到可驗證的-', 'AI 產品系統'],
        subtitle: '橫跨心理學、UIUX 研究、AI 原型與前後端實作，將模糊的行為資料、研究洞察與系統邏輯，轉化為能被理解、驗證與落地的真實產品。',
        primaryCta: '探索作品',
        secondaryCta: '閱讀故事',
        imageAlt: '葉冠廷的插畫式個人肖像',
    },
    en: {
        kicker: 'SIGNAL PORTFOLIO / GUAN-TING YE',
        headline: ['From human signals', 'to validated', 'AI product systems'],
        subtitle: 'Blending psychology, UX research, AI prototyping, and full-stack development, I translate ambiguous behavioral data, research insights, and system logic into real, testable, and production-minded product experiences.',
        primaryCta: 'Explore Work',
        secondaryCta: 'Read Narrative',
        imageAlt: 'Illustrated portrait of Guan-Ting Ye',
    },
};

const PROCESS_STEPS = [
    'RESEARCH INPUT',
    'SYSTEM MODELING',
    'INTERACTION PROTOTYPE',
    'PRODUCT EVIDENCE',
];

const ease = [0.16, 1, 0.3, 1];

const contentVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.82,
        },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.74, ease },
    },
};

const lineReveal = {
    hidden: { opacity: 0, y: '112%' },
    visible: {
        opacity: 1,
        y: '0%',
        transition: { duration: 0.92, ease },
    },
};

const portraitReveal = {
    hidden: {
        opacity: 0,
        y: 24,
        clipPath: 'inset(18% 16% 18% 16% round 28px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0% round 28px)',
        transition: { duration: 1.05, delay: 0.52, ease },
    },
};

function getNodeCount(width) {
    if (width < 520) return 24;
    if (width < 960) return 42;
    return 64;
}

function createNodes(width, height, count) {
    return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.4 + 0.6,
        phase: Math.random() * Math.PI * 2,
    }));
}

function NeuralSignalField({ reducedMotion }) {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return undefined;

        let width = 0;
        let height = 0;
        let nodes = [];
        let resizeFrame = null;
        let isInView = true;
        let isDocumentVisible = !document.hidden;
        let isRunning = !reducedMotion;
        const pointer = { x: 0, y: 0 };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = Math.max(1, rect.width);
            height = Math.max(1, rect.height);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            pointer.x = width * 0.64;
            pointer.y = height * 0.42;
            nodes = createNodes(width, height, getNodeCount(width));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            const threshold = width < 520 ? 96 : width < 960 ? 122 : 146;

            for (const node of nodes) {
                if (!reducedMotion) {
                    node.phase += 0.012;
                    node.x += node.vx + Math.cos(node.phase) * 0.025;
                    node.y += node.vy + Math.sin(node.phase) * 0.025;
                    if (node.x < -20) node.x = width + 20;
                    if (node.x > width + 20) node.x = -20;
                    if (node.y < -20) node.y = height + 20;
                    if (node.y > height + 20) node.y = -20;
                }
            }

            nodes.forEach((node, index) => {
                let connections = 0;
                for (let nextIndex = index + 1; nextIndex < nodes.length; nextIndex += 1) {
                    const other = nodes[nextIndex];
                    const distance = Math.hypot(node.x - other.x, node.y - other.y);
                    if (distance > threshold || connections >= 3) continue;
                    const alpha = (1 - distance / threshold) * 0.16;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(47, 238, 211, ${alpha})`;
                    ctx.lineWidth = 0.75;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                    connections += 1;
                }

                const pointerDistance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
                const lift = pointerDistance < 130 ? 0.35 : 0;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + lift, 0, Math.PI * 2);
                ctx.fillStyle = pointerDistance < 130
                    ? 'rgba(143, 248, 234, 0.54)'
                    : 'rgba(47, 238, 211, 0.36)';
                ctx.fill();
            });
        };

        const tick = () => {
            if (!isRunning || !isInView || !isDocumentVisible) return;
            draw();
            frameRef.current = requestAnimationFrame(tick);
        };

        const syncAnimationState = () => {
            const canRun = isRunning && isInView && isDocumentVisible;
            if (canRun && !frameRef.current) tick();
            if (!canRun && frameRef.current) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
        };

        const requestResize = () => {
            if (resizeFrame) return;
            resizeFrame = requestAnimationFrame(() => {
                resizeFrame = null;
                resize();
                if (reducedMotion) draw();
            });
        };

        const handlePointerMove = event => {
            const rect = canvas.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
        };

        const handleVisibility = () => {
            isDocumentVisible = !document.hidden;
            syncAnimationState();
        };

        const observer = new IntersectionObserver(entries => {
            isInView = entries[0]?.isIntersecting ?? true;
            syncAnimationState();
        }, { threshold: 0.02 });

        resize();
        draw();
        if (!reducedMotion) tick();

        observer.observe(canvas);
        window.addEventListener('resize', requestResize, { passive: true });
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            isRunning = false;
            observer.disconnect();
            cancelAnimationFrame(frameRef.current);
            cancelAnimationFrame(resizeFrame);
            window.removeEventListener('resize', requestResize);
            window.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [reducedMotion]);

    return <canvas ref={canvasRef} className="signal-hero__field" aria-hidden="true" />;
}

function MagneticSignalButton({ children, target, variant }) {
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.55 });
    const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.55 });

    const handlePointerMove = event => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.22);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    const handleClick = event => {
        event.preventDefault();
        scrollTo(target, 0);
    };

    return (
        <motion.a
            href={`#${target}`}
            className={`signal-button signal-button--${variant}`}
            onClick={handleClick}
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
            style={reduce ? undefined : { x: springX, y: springY }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
        >
            <span className="signal-button__node" aria-hidden="true" />
            <span className="signal-button__label">{children}</span>
            <span className="signal-button__marker" aria-hidden="true" />
        </motion.a>
    );
}

function SignalPortraitStage({ imageAlt, reducedMotion }) {
    return (
        <motion.div
            className="signal-portrait-stage"
            variants={reducedMotion ? undefined : portraitReveal}
        >
            <div className="signal-portrait-stage__frame">
                <img
                    className="signal-portrait-stage__image"
                    src="assets/cv_visual.webp"
                    alt={imageAlt}
                    width="780"
                    height="1020"
                    decoding="async"
                    fetchPriority="high"
                />
                <div className="signal-portrait-stage__scan" aria-hidden="true" />
                <div className="signal-portrait-stage__mesh" aria-hidden="true" />
                <div className="signal-portrait-stage__edge" aria-hidden="true" />
            </div>
        </motion.div>
    );
}

function SignalProcessRail({ reducedMotion }) {
    return (
        <motion.div
            className="signal-process"
            variants={reducedMotion ? undefined : fadeUp}
            aria-label="Research input to product evidence process"
        >
            <span className="signal-process__line" aria-hidden="true" />
            <ol className="signal-process__steps">
                {PROCESS_STEPS.map(step => (
                    <li className="signal-process__step" key={step}>
                        <span className="signal-process__node" aria-hidden="true" />
                        <span>{step}</span>
                    </li>
                ))}
            </ol>
        </motion.div>
    );
}

export default function HomeHero({ lang }) {
    const reducedMotion = useReducedMotion();
    const copy = HERO_COPY[lang] ?? HERO_COPY.en;
    const titleMotionProps = reducedMotion
        ? { initial: false, animate: false }
        : { initial: 'hidden', animate: 'visible', variants: contentVariants };

    const setPointerVars = event => {
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        event.currentTarget.style.setProperty('--px', x.toFixed(3));
        event.currentTarget.style.setProperty('--py', y.toFixed(3));
    };

    const resetPointerVars = event => {
        event.currentTarget.style.setProperty('--px', '0');
        event.currentTarget.style.setProperty('--py', '0');
    };

    return (
        <section
            className="signal-hero"
            id="top"
            aria-labelledby="hero-title"
            onPointerMove={setPointerVars}
            onPointerLeave={resetPointerVars}
        >
            <NeuralSignalField reducedMotion={Boolean(reducedMotion)} />
            <div className="signal-hero__noise" aria-hidden="true" />
            <motion.div
                className="signal-hero__boot"
                initial={reducedMotion ? false : { opacity: 0, x: -18 }}
                animate={reducedMotion ? false : { opacity: [0, 1, 0.72], x: 0 }}
                transition={{ duration: 0.54, ease }}
                aria-hidden="true"
            >
                <span>SIGNAL ACQUIRING</span>
                <i />
            </motion.div>
            <div className="signal-hero__inner">
                <motion.div className="signal-hero__content" {...titleMotionProps}>
                    <motion.p className="signal-hero__kicker" variants={reducedMotion ? undefined : fadeUp}>
                        {copy.kicker}
                    </motion.p>
                    <h1 className="signal-hero__title" id="hero-title" data-lang={lang}>
                        {copy.headline.map((line, index) => (
                            <span className="signal-hero__title-mask" key={line}>
                                <motion.span
                                    className={`signal-hero__title-line${index === copy.headline.length - 1 ? ' is-accent' : ''}`}
                                    variants={reducedMotion ? undefined : lineReveal}
                                >
                                    {line}
                                </motion.span>
                            </span>
                        ))}
                    </h1>
                    <motion.p className="signal-hero__subtitle" variants={reducedMotion ? undefined : fadeUp}>
                        {copy.subtitle}
                    </motion.p>
                    <motion.div className="signal-hero__actions" variants={reducedMotion ? undefined : fadeUp}>
                        <MagneticSignalButton target="work" variant="primary">
                            {copy.primaryCta}
                        </MagneticSignalButton>
                        <MagneticSignalButton target="story" variant="secondary">
                            {copy.secondaryCta}
                        </MagneticSignalButton>
                    </motion.div>
                    <SignalProcessRail reducedMotion={Boolean(reducedMotion)} />
                </motion.div>
                <SignalPortraitStage imageAlt={copy.imageAlt} reducedMotion={Boolean(reducedMotion)} />
            </div>
        </section>
    );
}
