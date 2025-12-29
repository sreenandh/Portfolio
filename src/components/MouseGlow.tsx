import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseGlow: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the glow
    const springConfig = { damping: 25, stiffness: 150 };
    const glowX = useSpring(mouseX, springConfig);
    const glowY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only enable on desktop
        if (window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mouseX, mouseY, isVisible]);

    // Don't render on mobile/touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            {/* Primary glow - follows cursor */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 400,
                    height: 400,
                    x: glowX,
                    y: glowY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(56, 189, 248, 0.02) 40%, transparent 70%)',
                }}
            />

            {/* Secondary subtle ring */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 600,
                    height: 600,
                    x: glowX,
                    y: glowY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 60%)',
                }}
            />
        </motion.div>
    );
};

export default MouseGlow;
