import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Zap, ArrowRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  featured: boolean;
}

// TiltCard component integrated directly for better performance
const ProjectCard: React.FC<{ project: Project; index: number; inView: boolean }> = ({
  project,
  index,
  inView
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

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

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Calculate spotlight position
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: -15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
      }}
      style={{
        rotateX: isHovering ? rotateX : 0,
        rotateY: isHovering ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative bg-slate-800/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-30"
        style={{
          opacity: isHovering ? 0.15 : 0,
          background: `radial-gradient(circle at ${spotlightX.get()} ${spotlightY.get()}, rgba(59, 130, 246, 0.4), transparent 40%)`,
        }}
      />

      {/* Featured Badge */}
      {project.featured && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{
            delay: index * 0.15 + 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute top-6 right-6 z-20"
        >
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
            <Zap size={16} className="fill-current" />
            <span>Featured</span>
          </div>
        </motion.div>
      )}

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-cyan-500/0 transition-all duration-500 pointer-events-none"
        animate={{
          background: isHovering
            ? 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))'
            : 'linear-gradient(to bottom right, rgba(59, 130, 246, 0), rgba(6, 182, 212, 0), rgba(6, 182, 212, 0))'
        }}
      />

      {/* Image Section with enhanced parallax */}
      <div className="relative overflow-hidden h-64 bg-slate-900">
        <motion.div
          animate={{
            scale: isHovering ? 1.1 : 1,
            y: isHovering ? -10 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mix-blend-overlay z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-20" />
      </div>

      {/* Content Section */}
      <div className="p-8 relative">
        <motion.h3
          animate={{ x: isHovering ? 8 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 pb-1"
        >
          {project.title}
        </motion.h3>

        <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
          {project.description}
        </p>

        {/* Technologies with enhanced animation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{
                delay: index * 0.15 + techIndex * 0.05,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.15,
                rotate: [-2, 2, -2, 0],
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              }}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/20 hover:border-blue-400/60 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons with shimmer */}
        <div className="flex gap-4 pt-4 border-t border-slate-700/50">
          {project.github !== "#" && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 group/btn relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <Github size={18} className="group-hover/btn:rotate-12 transition-transform relative z-10" />
              <span className="font-medium relative z-10">Code</span>
            </motion.a>
          )}
          {project.live !== "#" && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 group/btn relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
              <ExternalLink size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform relative z-10" />
              <span className="font-medium relative z-10">Live Demo</span>
              <ArrowRight size={16} className="opacity-0 group-hover/btn:opacity-100 -ml-2 group-hover/btn:ml-0 transition-all duration-300 relative z-10" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Decorative corner glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-transparent rounded-bl-full blur-2xl pointer-events-none"
      />
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const projects: Project[] = [
    {
      title: "Industrial Motor CRM & Quotation System",
      description:
        "A comprehensive CRM for an industrial motor company with multi-brand quotation workflows, dynamic PDF generation with brand theming, and multi-currency support. Reduced quotation time from 15+ minutes to under 3 minutes.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MySQL",
        "JWT",
      ],
      github: "#",
      live: "#",
      featured: true,
    },
    {
      title: "Employee Management System API",
      description:
        "A scalable RESTful API with 40+ endpoints for attendance tracking, task management, and leave workflows. Features JWT auth, OTP password recovery, and automated email notifications via SMTP.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
      technologies: [
        "Node.js",
        "Express.js",
        "MySQL",
        "Prisma ORM",
        "JWT",
      ],
      github: "#",
      live: "#",
      featured: true,
    },
    {
      title: "Harbourway Shipping",
      description:
        "Built full-stack corporate shipping website with admin CMS and performance-optimized responsive design. Developed dashboard for dynamic content management (galleries, testimonials), implemented automated inquiry handling and email notifications via Node.js, Supabase, and Nodemailer.",
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "Supabase",
        "Nodemailer",
        "Tailwind CSS",
      ],
      github: "#",
      live: "https://harbourwayshipping.com",
      featured: true,
    },
    {
      title: "Param Yogi School of Yoga",
      description:
        "Built production-grade school website with admin dashboard and automated email notifications via Nodemailer. Implemented contact form workflows, secure authentication, and media management using Node.js and Supabase.",
      image:
        "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80",
      technologies: [
        "Next.js",
        "React",
        "Supabase",
        "Node.js",
        "Nodemailer",
        "Tailwind CSS",
      ],
      github: "#",
      live: "https://paramyogi.com",
      featured: true,
    },
    {
      title: "FitPilotAI",
      description:
        "An AI-powered fitness application that provides personalized workout plans and nutrition guidance. Features real-time progress tracking and adaptive recommendations using Gemini LLM.",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
      technologies: [
        "React",
        "Next.js",
        "Clerk",
        "Vapi",
        "Convex",
        "Gemini AI",
      ],
      github: "https://github.com/sreenandh/FitPilotAI",
      live: "#",
      featured: true,
    },
    {
      title: "NestFind Real Estate",
      description:
        "A comprehensive real estate platform for property listings, searches, and management. Includes advanced filtering, real-time chat with Socket.IO, interactive maps, and agent communication.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Socket.IO",
        "Express.js",
        "JWT",
      ],
      github: "https://github.com/sreenandh/NestFind-Real-Estate-Web-App",
      live: "#",
      featured: true,
    },
    {
      title: "Employee Document Manager",
      description:
        "A secure document management system for organizations to handle employee records, with role-based access control, AWS S3 integration, and automated backup system.",
      image:
        "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "AWS S3",
        "JWT",
      ],
      github: "https://github.com/sreenandh/Employee-docs_manage",
      live: "#",
      featured: false,
    },
    {
      title: "Job Apply AI Assistant",
      description:
        "Built a no-code AI workflow using Opal that automates job application personalization. Generates role-specific resume bullet points, personalized cover letters, and smart answers for application questions. Reduced application time from 10+ minutes to under 60 seconds with automated autofill sheet generation for LinkedIn and ATS forms.",
      image: "/job-apply-ai.png",
      technologies: [
        "Opal",
        "AI Automation",
        "No-Code",
        "Workflow Design",
        "LLM Integration",
      ],
      github: "#",
      live: "https://opal.google/?flow=drive:/1TOdBCVCVsDtLKkObWlL0kNiur1-DPWFm&shared&mode=app",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 120, 0],
          x: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, -120, 0],
          x: [0, -50, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6 pulse-glow"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">
                Portfolio Showcase
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-animate">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
              Crafting innovative digital experiences that drive real-world
              impact
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-cyan-500 mx-auto rounded-full"
            />
          </motion.div>

          {/* Projects Grid with TiltCards */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                inView={inView}
              />
            ))}
          </div>

          {/* View More CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/sreenandh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 px-8 py-4 rounded-xl border-2 border-slate-600 hover:border-blue-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="font-semibold text-white relative z-10">
                View All Projects on GitHub
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
