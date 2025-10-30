import React from 'react';
import { ExternalLink, Github, Zap } from 'lucide-react';

const Projects = () => {
  const projects = [
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

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 opacity-50"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Crafting innovative digital experiences that drive real-world impact
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      <Zap size={16} className="fill-current" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Image Section */}
                <div className="relative overflow-hidden h-56 bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-500"></div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/20 hover:border-blue-400/40 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-slate-700/50">
                    {project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-xl transition-all duration-300 group/btn border border-slate-700 hover:border-slate-600"
                      >
                        <Github size={18} className="group-hover/btn:rotate-12 transition-transform" />
                        <span className="font-medium">Code</span>
                      </a>
                    )}
                    {project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 group/btn shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                      >
                        <ExternalLink size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span className="font-medium">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/0 via-purple-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section> 
  );
};

export default Projects;