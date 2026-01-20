import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltStrength?: number;
    glareEnabled?: boolean;
    scale?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = '',
    tiltStrength = 15,
    glareEnabled = true,
    scale = 1.02,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltStrength, -tiltStrength]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltStrength, tiltStrength]), {
        stiffness: 300,
        damping: 30,
    });

    const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / rect.width;
        const y = (e.clientY - centerY) / rect.height;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            animate={{
                scale: isHovering ? scale : 1,
            }}
            transition={{ scale: { duration: 0.3 } }}
            className={`relative ${className}`}
        >
            {children}

            {/* Glare effect */}
            {glareEnabled && (
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
                    style={{
                        opacity: isHovering ? 1 : 0,
                    }}
                >
                    <motion.div
                        className="absolute w-[200%] h-[200%] bg-gradient-radial from-white/20 via-white/5 to-transparent"
                        style={{
                            left: glareX,
                            top: glareY,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </motion.div>
            )}

            {/* Spotlight effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
                style={{
                    opacity: isHovering ? 0.15 : 0,
                    background: `radial-gradient(circle at ${useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']).get()} ${useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']).get()}, rgba(59, 130, 246, 0.3), transparent 50%)`,
                }}
            />
        </motion.div>
    );
};

export default TiltCard;
