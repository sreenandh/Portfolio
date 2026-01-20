import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    as?: 'button' | 'a' | 'div';
    href?: string;
    target?: string;
    rel?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = '',
    strength = 0.4,
    as = 'button',
    href,
    target,
    rel,
    onClick,
    type = 'button',
    disabled = false,
}) => {
    const ref = useRef<HTMLElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || disabled) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * strength);
        y.set(distanceY * strength);
    };

    const handleMouseEnter = () => {
        if (!disabled) setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        x.set(0);
        y.set(0);
    };

    const Component = motion[as] as any;

    const props: any = {
        ref,
        onMouseMove: handleMouseMove,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: { x: springX, y: springY },
        className: `inline-block cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`,
        onClick: disabled ? undefined : onClick,
        whileTap: disabled ? undefined : { scale: 0.95 },
    };

    if (as === 'a') {
        props.href = href;
        props.target = target;
        props.rel = rel;
    }

    if (as === 'button') {
        props.type = type;
        props.disabled = disabled;
    }

    return (
        <Component {...props}>
            <motion.span
                className="relative inline-flex"
                animate={{
                    scale: isHovering && !disabled ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.span>
        </Component>
    );
};

export default MagneticButton;
