import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
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
} from "lucide-react";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "Full Stack Developer",
    "Building Web Applications",
    "Eager Learner",
    "Problem Solver",
  ];

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

  // Role rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Floating icons animation variants
  const floatingVariants = {
    animate: (custom: number) => ({
      y: [-15, 15, -15],
      rotate: [0, 360],
      transition: {
        y: { duration: 3 + custom, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 20 + custom * 5, repeat: Infinity, ease: "linear" },
      },
    }),
  };

  // Particle effect
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
  }));

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
        {/* Gradient orbs with enhanced blur */}
        <motion.div
          animate={{
            x: [0, 150, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-l from-slate-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl"
        />

        {/* Animated particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating tech icons with enhanced animations */}
        <motion.div
          custom={0}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          className="absolute top-1/4 left-[5%] text-blue-400/10 hidden lg:block"
        >
          <Code2 size={80} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          custom={1}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5,
          }}
          className="absolute top-1/3 right-[8%] text-purple-400/10 hidden lg:block"
        >
          <Rocket size={100} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          custom={2}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * 1.2,
            y: mousePosition.y * 1.2,
          }}
          className="absolute bottom-1/4 right-1/4 text-cyan-400/10 hidden md:block"
        >
          <Sparkles size={60} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          custom={3}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * -1,
            y: mousePosition.y * -1,
          }}
          className="absolute bottom-1/3 left-[15%] text-cyan-400/10 hidden lg:block"
        >
          <Terminal size={70} strokeWidth={1.5} />
        </motion.div>
        <motion.div
          custom={4}
          variants={floatingVariants}
          animate="animate"
          style={{
            x: mousePosition.x * 1.8,
            y: mousePosition.y * 1.8,
          }}
          className="absolute top-[60%] right-[15%] text-indigo-400/10 hidden md:block"
        >
          <Layers size={65} strokeWidth={1.5} />
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
          {/* Greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2.5 mb-8 backdrop-blur-sm"
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

          {/* Name with gradient animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 relative px-4"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]"
              style={{
                backgroundSize: "200% auto",
              }}
            >
              Sreenandh M
            </motion.span>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full origin-center"
              style={{ width: "60%" }}
            />
          </motion.h1>

          {/* Rotating roles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 font-light h-12 sm:h-14 flex items-center justify-center px-4"
          >
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
            >
              {roles[currentRole]}
            </motion.span>
          </motion.div>

          {/* Description */}
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

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 mb-12 px-4"
          >
            <motion.a
              href="mailto:sreenandhnandhu123@gmail.com"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Mail size={20} className="relative z-10" />
              <span className="relative z-10 font-medium">Get In Touch</span>
            </motion.a>

            <motion.a
              href="https://github.com/sreenandh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center space-x-2 border-2 border-gray-600 hover:border-blue-400 bg-slate-900/50 backdrop-blur-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <Github
                size={20}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="font-medium">View Work</span>
              <ExternalLink
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download="Sreenandh_M_Resume.pdf"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center space-x-2 border-2 border-gray-600 hover:border-green-400 bg-slate-900/50 backdrop-blur-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              <FileDown
                size={20}
                className="group-hover:translate-y-1 transition-transform duration-300"
              />
              <span className="font-medium">Download CV</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex justify-center space-x-4 sm:space-x-6 px-4"
          >
            {[
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
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:${social.color} hover:border-transparent transition-all duration-300 group relative`}
                aria-label={social.label}
              >
                <social.icon size={20} />
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}
                />
              </motion.a>
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
