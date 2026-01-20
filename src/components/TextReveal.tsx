import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
    text,
    className = '',
    delay = 0,
    staggerDelay = 0.03,
}) => {
    const words = text.split(' ');

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -90,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        },
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`inline-block ${className}`}
            style={{ perspective: '1000px' }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.25em]">
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            variants={charVariants}
                            className="inline-block origin-bottom"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.span>
    );
};

export default TextReveal;
