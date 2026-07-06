import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function MotionSection({ children, className, id, ...props }) {
    const reduceMotion = useReducedMotion();

    return React.createElement(motion.section, {
        className,
        id,
        initial: reduceMotion ? false : { opacity: 0, y: 44, scale: 0.985 },
        whileInView: reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.18, margin: '0px 0px -72px 0px' },
        transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] },
        ...props,
    }, children);
}
