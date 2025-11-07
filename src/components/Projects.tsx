import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Zap, ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  featured: boolean;
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const projects: Project[] = [
    {
      title: 'Harbourway Shipping',
      description: 'Enterprise-grade international shipping platform with AI-powered warehouse management system. Features global network spanning 120+ countries, real-time cargo tracking, DGFT licensing integration, and intelligent demand prediction algorithms.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80',
      technologies: ['Next.js', 'React', 'AI/ML', 'Node.js', 'MongoDB', 'Real-time Tracking'],
      github: '#',
      live: 'https://harbourwayshipping.com',
      featured: true
    },
    {
      title: 'Param Yogi School of Yoga',
      description: 'Production-grade educational website built with Next.js 13+ featuring automated content workflow, role-based admin dashboard, and real-time database synchronization. Reduced storage overhead by 40% with Supabase integration.',
      image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80',
      technologies: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'JWT', 'reCAPTCHA'],
      github: '#',
      live: 'https://paramyogi.com',
      featured: true
    },
    {
      title: 'FitPilotAI',
      description: 'An AI-powered fitness application that provides personalized workout plans and nutrition guidance. Features real-time progress tracking and adaptive recommendations using Gemini LLM.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
      technologies: ['React', 'Next.js', 'Clerk', 'Vapi', 'Convex', 'Gemini AI'],
      github: 'https://github.com/sreenandh/FitPilotAI',
      live: '#',
      featured: true
    },
    {
      title: 'NestFind Real Estate',
      description: 'A comprehensive real estate platform for property listings, searches, and management. Includes advanced filtering, real-time chat with Socket.IO, interactive maps, and agent communication.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Express.js', 'JWT'],
      github: 'https://github.com/sreenandh/NestFind-Real-Estate-Web-App',
      live: '#',
      featured: true
    },
    {
      title: 'Employee Document Manager',
      description: 'A secure document management system for organizations to handle employee records, with role-based access control, AWS S3 integration, and automated backup system.',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'AWS S3', 'JWT'],
      github: 'https://github.com/sreenandh/Employee-docs_manage',
      live: '#',
      featured: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 80
      },
    },
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-full px-6 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Portfolio Showcase</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
              Crafting innovative digital experiences that drive real-world impact
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"
            />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={projectVariants}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-slate-800/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: index * 0.2 + 0.5, type: 'spring', stiffness: 200 }}
                    className="absolute top-6 right-6 z-20"
                  >
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      <Zap size={16} className="fill-current" />
                      <span>Featured</span>
                    </div>
                  </motion.div>
                )}

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />

                {/* Image Section with parallax */}
                <div className="relative overflow-hidden h-64 bg-slate-900">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-20"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 relative">
                  <motion.h3
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300"
                  >
                    {project.title}
                  </motion.h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Technologies with stagger animation */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ 
                          delay: index * 0.2 + techIndex * 0.05,
                          type: 'spring',
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -2, 2, 0],
                          transition: { duration: 0.3 }
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/20 hover:border-blue-400/40 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Buttons with enhanced hover */}
                  <div className="flex gap-4 pt-4 border-t border-slate-700/50">
                    {project.github !== '#' && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, x: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 group/btn relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover/btn:from-blue-500/10 group-hover/btn:to-purple-500/10 transition-all duration-300"
                        />
                        <Github size={18} className="group-hover/btn:rotate-12 transition-transform relative z-10" />
                        <span className="font-medium relative z-10">Code</span>
                      </motion.a>
                    )}
                    {project.live !== '#' && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, x: 3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 group/btn relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-all duration-300"
                        />
                        <ExternalLink size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform relative z-10" />
                        <span className="font-medium relative z-10">Live Demo</span>
                        <ArrowRight size={16} className="opacity-0 group-hover/btn:opacity-100 -ml-2 group-hover/btn:ml-0 transition-all duration-300 relative z-10" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Decorative corner with animated shine */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent rounded-bl-full"
                />
              </motion.div>
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
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 px-8 py-4 rounded-xl border-2 border-slate-600 hover:border-blue-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold text-white">View All Projects on GitHub</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;