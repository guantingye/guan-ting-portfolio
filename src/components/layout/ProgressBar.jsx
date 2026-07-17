import React, { useRef } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';

export default function ProgressBar({ theme = 'default', isProject = false, label = 'Reading progress' }) {
    const progressRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.22 });
    const displayedProgress = prefersReducedMotion ? scrollYProgress : smoothProgress;

    useMotionValueEvent(displayedProgress, 'change', latest => {
        progressRef.current?.setAttribute('aria-valuenow', String(Math.round(latest * 100)));
    });

    return React.createElement('div', {
        ref: progressRef,
        id: 'progress',
        className: `reading-progress ${isProject ? 'is-project' : 'is-home'}`,
        'data-theme': theme,
        role: 'progressbar',
        'aria-label': label,
        'aria-valuenow': '0',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
    },
        React.createElement('div', { className: 'reading-progress__track', 'aria-hidden': 'true' },
            React.createElement(motion.span, {
                className: 'reading-progress__fill',
                style: { scaleX: displayedProgress },
            }),
            React.createElement(motion.span, {
                className: 'reading-progress__signal',
                style: { scaleX: displayedProgress },
            })));
}
