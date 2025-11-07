import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Update scroll percentage in real-time
  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollPercentage(percentage);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', updateScrollPercentage);
    // Initial calculation
    updateScrollPercentage();
    
    return () => window.removeEventListener('scroll', updateScrollPercentage);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 text-white group-hover:animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
      </motion.button>

      {/* Scroll Percentage Indicator - Fixed and Enhanced */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, type: 'spring' }}
          className="fixed bottom-28 right-8 z-50 bg-slate-800/90 backdrop-blur-md border-2 border-blue-500/40 rounded-2xl px-5 py-3 shadow-xl shadow-blue-500/20"
        >
          <motion.div 
            className="flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-base font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {scrollPercentage}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgress;
