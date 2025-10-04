import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Zap } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 flex flex-col"
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                      <Zap size={14} />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    {project.github !== '#' && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                      >
                        <Github size={18} />
                        <span>Code</span>
                      </motion.a>
                    )}
                    {project.live !== '#' && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;