import React, { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Sparkles,
  Code2,
  Rocket,
  Terminal,
  Layers,
  FileDown,
  Zap,
} from "lucide-react";
import MagneticButton from "./MagneticButton";
import TextReveal from "./TextReveal";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  const roles = [
    "Full Stack Developer",
    "Building Web Applications",
    "Eager Learner",
    "Problem Solver",
  ];

  // Typewriter effect
  useEffect(() => {
    const currentText = roles[currentRole];

    if (isTyping) {
      if (displayedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentRole, roles]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Floating icons with improved physics
  const floatingVariants = {
    animate: (custom: number) => ({
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 360],
      transition: {
        y: { duration: 4 + custom, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 5 + custom, repeat: Infinity, ease: "easeInOut", delay: custom * 0.5 },
        rotate: { duration: 25 + custom * 5, repeat: Infinity, ease: "linear" },
      },
    }),
  };

  // Enhanced particle effect
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 5,
    })), []
  );

  // Social links data
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/sreenandh",
      label: "GitHub",
      color: "from-gray-400 to-gray-600",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sreenandh-m/",
      label: "LinkedIn",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Mail,
      href: "mailto:sreenandhnandhu123@gmail.com",
      label: "Email",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Phone,
      href: "tel:+917012434020",
      label: "Phone",
      color: "from-cyan-400 to-cyan-600",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs with enhanced animations */}
        <motion.div
          animate={{
            x: [0, 150, -100, 50, 0],
            y: [0, -100, 80, -50, 0],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 100, -50, 0],
            y: [0, 120, -80, 50, 0],
            scale: [1, 0.8, 1.4, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-[700px] h-[700px] bg-gradient-to-l from-purple-500/20 via-blue-500/15 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 120, -80, 40, 0],
            y: [0, -70, 100, -40, 0],
            scale: [1, 1.2, 0.85, 1.15, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />

        {/* Animated particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.3))`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}

        {/* Floating tech icons with improved physics */}
        <motion.div
          custom={0}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          className="absolute top-1/4 left-[5%] text-blue-400/15 hidden lg:block"
        >
          <Code2 size={90} strokeWidth={1.2} />
        </motion.div>
        <motion.div
          custom={1}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
          className="absolute top-1/3 right-[8%] text-purple-400/15 hidden lg:block"
        >
          <Rocket size={110} strokeWidth={1.2} />
        </motion.div>
        <motion.div
          custom={2}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * 1.2,
            y: mousePosition.y * 1.2,
          }}
          className="absolute bottom-1/4 right-1/4 text-cyan-400/15 hidden md:block"
        >
          <Sparkles size={70} strokeWidth={1.2} />
        </motion.div>
        <motion.div
          custom={3}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * -1,
            y: mousePosition.y * -1,
          }}
          className="absolute bottom-1/3 left-[15%] text-cyan-400/15 hidden lg:block"
        >
          <Terminal size={80} strokeWidth={1.2} />
        </motion.div>
        <motion.div
          custom={4}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * 1.8,
            y: mousePosition.y * 1.8,
          }}
          className="absolute top-[60%] right-[15%] text-indigo-400/15 hidden md:block"
        >
          <Layers size={75} strokeWidth={1.2} />
        </motion.div>
        <motion.div
          custom={5}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * -2,
            y: mousePosition.y * 1.5,
          }}
          className="absolute top-[20%] right-[25%] text-pink-400/10 hidden lg:block"
        >
          <Zap size={65} strokeWidth={1.2} />
        </motion.div>
      </div>

      {/* Main content with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative pt-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Greeting badge with pulse effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2.5 mb-8 backdrop-blur-sm pulse-glow"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-blue-300 text-sm font-medium tracking-wide">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Name with staggered letter animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 relative px-4"
          >
            <TextReveal
              text="Sreenandh M"
              className="text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] text-glow"
              delay={0.5}
            />

            {/* Animated underline with gradient */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto mt-6 rounded-full origin-center"
              style={{ width: "60%" }}
            />
          </motion.h1>

          {/* Typewriter effect for roles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 font-light h-12 sm:h-14 flex items-center justify-center px-4"
          >
            <span className="inline-flex items-center">
              <span className="text-gradient-animate font-medium">
                {displayedText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[3px] h-8 sm:h-10 bg-blue-400 ml-1"
              />
            </span>
          </motion.div>

          {/* Description with fade in */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Entry-level developer building full-stack web applications with
            React, Node.js, and modern tools. Focused on writing clean code,
            learning best practices, and shipping reliable solutions.
          </motion.p>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 mb-12 px-4"
          >
            <MagneticButton
              as="a"
              href="mailto:sreenandhnandhu123@gmail.com"
              className="group relative flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Mail size={20} className="relative z-10 text-white" />
              <span className="relative z-10 font-medium text-white">Get In Touch</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="https://github.com/sreenandh"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center space-x-2 border-2 border-gray-600 hover:border-blue-400 bg-slate-900/50 backdrop-blur-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <Github
                size={20}
                className="group-hover:rotate-12 transition-transform duration-300 text-white"
              />
              <span className="font-medium text-white">View Work</span>
              <ExternalLink
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-white"
              />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/resume.pdf"
              className="group flex items-center justify-center space-x-2 border-2 border-gray-600 hover:border-green-400 bg-slate-900/50 backdrop-blur-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              <FileDown
                size={20}
                className="group-hover:translate-y-1 transition-transform duration-300 text-white"
              />
              <span className="font-medium text-white">Download CV</span>
            </MagneticButton>
          </motion.div>

          {/* Social Links with enhanced hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex justify-center space-x-4 sm:space-x-6 px-4"
          >
            {socialLinks.map((social, index) => (
              <MagneticButton
                key={social.label}
                as="a"
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                strength={0.5}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.2 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:${social.color} hover:border-transparent transition-all duration-300 group relative overflow-hidden`}
                  aria-label={social.label}
                >
                  <social.icon size={20} className="relative z-10" />
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300`}
                  />
                </motion.div>
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
          aria-label="Scroll to about section"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Scroll Down
            </span>
            <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-blue-400 rounded-full flex justify-center pt-2 transition-colors duration-300 relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-2 bg-gray-400 group-hover:bg-blue-400 rounded-full transition-colors duration-300"
              />
            </div>
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
