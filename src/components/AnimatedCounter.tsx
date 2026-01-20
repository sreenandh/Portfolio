import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    target: number;
    duration?: number;
    delay?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    target,
    duration = 2,
    delay = 0,
    suffix = '',
    prefix = '',
    className = '',
}) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hasAnimated, setHasAnimated] = useState(false);

    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 20,
        duration: duration * 1000,
    });

    const displayValue = useTransform(springValue, (latest) =>
        Math.round(latest)
    );

    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        const unsubscribe = displayValue.on('change', (latest) => {
            setCurrentValue(latest);
        });
        return unsubscribe;
    }, [displayValue]);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            const timeout = setTimeout(() => {
                springValue.set(target);
                setHasAnimated(true);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, hasAnimated, target, delay, springValue]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay }}
        >
            {prefix}{currentValue}{suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
