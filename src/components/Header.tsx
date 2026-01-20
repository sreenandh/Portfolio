import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Home, User, Briefcase, FolderOpen, GraduationCap, Mail, Zap } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Enhanced scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Auto-highlight current section
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollPosition;
          const sectionHeight = rect.height;

          if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems: NavItem[] = [
    { href: '#home', label: 'Home', icon: <Home size={18} /> },
    { href: '#about', label: 'About', icon: <User size={18} /> },
    { href: '#skills', label: 'Skills', icon: <Zap size={18} /> },
    { href: '#experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { href: '#projects', label: 'Projects', icon: <FolderOpen size={18} /> },
    { href: '#education', label: 'Education', icon: <GraduationCap size={18} /> },
    { href: '#contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setIsMenuOpen(false);
    setActiveSection(targetId);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-blue-500/30 shadow-2xl'
          : 'bg-transparent'
          }`}
      >
        <nav className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
                >
                  <Code2 className="w-5 h-5 text-white" />
                </motion.div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 blur-lg opacity-20"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white">
                  Sreenandh M
                </span>
                <p className="text-xs text-gray-400 -mt-1">Full Stack Developer</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-xl transition-all duration-300 font-medium text-sm flex items-center space-x-2 group overflow-hidden ${isActive
                      ? 'text-white bg-blue-500/20 border border-blue-400/30'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                  >
                    <span className={`transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
                      }`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>

                    {/* Animated underline on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-white hover:bg-slate-700/50 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl border-l border-blue-500/20 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-lg font-bold text-white">Sreenandh M</span>
                      <p className="text-xs text-gray-400 -mt-1">Full Stack Developer</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 py-6">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <motion.button
                        key={item.href}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full flex items-center space-x-4 px-6 py-4 text-left transition-all duration-200 ${isActive
                          ? 'text-white bg-blue-500/10 border-r-2 border-blue-400'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                          }`}
                      >
                        <span className={`${isActive ? 'text-blue-400' : 'text-gray-400'
                          }`}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="p-6 border-t border-slate-700/50">
                  <div className="text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Sreenandh M</p>
                    <p className="text-xs mt-1">Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;