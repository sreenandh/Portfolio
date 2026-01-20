import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  isCurrentRole?: boolean;
}

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences: ExperienceItem[] = [
    {
      title: 'Software Developer',
      company: 'Cybmirror Innovations LLP',
      location: 'Kochi, Kerala',
      period: 'September 2025 – Present',
      isCurrentRole: true,
      description: [
        'Develop and maintain web applications with focus on clean, scalable, and efficient code',
        'Work on API integration, database management, and front-end responsiveness',
        'Participate in debugging, testing, and deployment of applications to ensure high performance',
        'Collaborate with cross-functional teams to design and implement software features'
      ],
      technologies: ['Full Stack Development', 'Web Applications', 'API Integration', 'Database Management']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Nubolerta Technology Solutions Private Limited',
      location: 'Remote',
      period: 'May 2025 – June 2025',
      description: [
        'Contributed to CloudBank, a cloud-native core banking platform serving rural banks',
        'Developed full-stack features using Angular, Node.js, Express, and MySQL',
        'Designed RESTful APIs with error handling, input validation, and JWT authentication',
        'Participated in code reviews and implemented secure coding practices'
      ],
      technologies: ['Angular', 'Node.js', 'Express', 'MySQL', 'RESTful APIs', 'JWT Authentication']
    },
    {
      title: 'MERN Stack Developer Intern',
      company: 'Luminar Technolab',
      location: 'Kochi, Kerala',
      period: 'July 2024 – January 2025',
      description: [
        'Built full-stack web applications using MongoDB, Express.js, React, and Node.js stack',
        'Developed RESTful API endpoints and implemented responsive design across all devices',
        'Collaborated with development team on debugging and version control using Git/GitHub'
      ],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'Git', 'REST APIs']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative">
            {/* Timeline line - hidden on mobile */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400 hidden sm:block"></div>

            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${index}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  {/* Timeline dot - hidden on mobile */}
                  <div className="absolute left-2 sm:left-6 w-4 h-4 bg-blue-400 rounded-full border-4 border-slate-900 hidden sm:block group-hover:bg-purple-400 transition-colors duration-300">
                    {exp.isCurrentRole && (
                      <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                    )}
                  </div>

                  <div className="sm:ml-16 md:ml-20 bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-blue-500/20 hover:border-blue-400/40 hover:bg-slate-800/70 transition-all duration-300">
                    <div className="flex flex-col gap-4 mb-4 sm:mb-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                          <h3 className="text-lg sm:text-xl font-semibold text-white">
                            {exp.title}
                          </h3>
                          {exp.isCurrentRole && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-blue-400 font-medium text-base sm:text-lg">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div className="flex items-center space-x-1.5 text-gray-400">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-gray-400">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div className="mb-4 sm:mb-6">
                      <ul className="space-y-2 sm:space-y-3">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-300 text-sm sm:text-base flex items-start leading-relaxed">
                            <span className="text-blue-400 mr-2 sm:mr-3 mt-1.5 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
                        Technologies & Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {exp.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.05 }}
                            className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-200 cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">
                Ready to Work Together?
              </h3>
              <p className="text-gray-300 mb-6">
                I'm always interested in new opportunities and exciting projects.
                Let's discuss how we can create something amazing together.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Get in Touch</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;