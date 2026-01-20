// Shared animation variants and utilities for consistent animations across the site

import { Variants, Transition } from 'framer-motion';

// ========================
// EASING FUNCTIONS
// ========================
export const easings = {
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    spring: { type: 'spring', stiffness: 100, damping: 15 },
    springBouncy: { type: 'spring', stiffness: 400, damping: 25 },
    springSmooth: { type: 'spring', stiffness: 80, damping: 20 },
} as const;

// ========================
// FADE VARIANTS
// ========================
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easings.easeOutExpo }
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easings.easeOutExpo }
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: easings.easeOutExpo }
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: easings.easeOutExpo }
    },
};

// ========================
// SCALE VARIANTS
// ========================
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: easings.easeOutExpo }
    },
};

export const popIn: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: easings.springBouncy
    },
};

// ========================
// STAGGER VARIANTS
// ========================
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: easings.easeOutExpo }
    },
};

// ========================
// 3D VARIANTS
// ========================
export const tilt3D: Variants = {
    hidden: { opacity: 0, rotateX: -15, y: 50 },
    visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transition: { duration: 0.8, ease: easings.easeOutExpo }
    },
};

export const flipIn: Variants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: {
        opacity: 1,
        rotateY: 0,
        transition: { duration: 0.6, ease: easings.easeOutExpo }
    },
};

// ========================
// TEXT REVEAL VARIANTS
// ========================
export const textRevealContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        },
    },
};

export const textRevealChar: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -90,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.5,
            ease: easings.easeOutExpo
        }
    },
};

// ========================
// HOVER PRESETS
// ========================
export const hoverLift = {
    whileHover: { y: -8, transition: { duration: 0.3 } },
    whileTap: { scale: 0.98 },
};

export const hoverScale = {
    whileHover: { scale: 1.05, transition: { duration: 0.3 } },
    whileTap: { scale: 0.95 },
};

export const hoverGlow = {
    whileHover: {
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
        transition: { duration: 0.3 }
    },
};

// ========================
// MAGNETIC EFFECT HELPER
// ========================
export const calculateMagneticPosition = (
    mouseX: number,
    mouseY: number,
    elementRect: DOMRect,
    strength: number = 0.3
) => {
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;

    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;

    return {
        x: distanceX * strength,
        y: distanceY * strength,
    };
};

// ========================
// SCROLL TRIGGER HELPERS
// ========================
export const scrollTriggerOptions = {
    once: { triggerOnce: true, threshold: 0.1 },
    repeat: { triggerOnce: false, threshold: 0.1 },
    early: { triggerOnce: true, threshold: 0.05 },
    late: { triggerOnce: true, threshold: 0.3 },
};

// ========================
// TRANSITION PRESETS
// ========================
export const transitions: Record<string, Transition> = {
    fast: { duration: 0.2 },
    normal: { duration: 0.4 },
    slow: { duration: 0.8 },
    springy: { type: 'spring', stiffness: 300, damping: 20 },
    smooth: { duration: 0.6, ease: easings.easeOutExpo },
};
