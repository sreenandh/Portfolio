import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, Award, ExternalLink, Trophy } from 'lucide-react';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science and Engineering',
      institution: 'Vimal Jyothi Engineering College',
      location: 'Kerala, India',
      period: '2020 – 2024',
      description: 'Comprehensive study of computer science fundamentals, software engineering, data structures, algorithms, and modern web technologies.'
    }
  ];

  const certifications = [
    {
      title: 'MERN/MEAN Full Stack',
      issuer: 'NACTET',
      date: '2025',
      description: 'Full-stack web development using MongoDB, Express.js, React, Angular, and Node.js'
    },
    {
      title: 'Python Programming',
      issuer: 'IIT BombayX',
      date: '2024',
      description: 'Advanced Python programming concepts and applications'
    },
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: '2024',
      description: 'Modern responsive web design principles and CSS frameworks'
    }
  ];

  const achievements = [
    {
      title: 'Deloitte Australia Technology Job Simulation on Forage',
      date: 'July 2025',
      description: 'Completed a job simulation involving development and coding; Wrote a proposal for creating a dashboard'
    },
    {
      title: 'Research Paper Presentation',
      date: '2024',
      description: 'Presented research paper at NCIPETC-24 National Conference on Emerging Computing Trends'
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
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Education & Achievements
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {/* Education */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 text-blue-400 mr-3" />
                Education
              </h3>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-blue-400 font-medium">{edu.institution}</p>
                    </div>
                    <div className="flex flex-col md:items-end mt-2 md:mt-0">
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Calendar size={16} />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">{edu.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Award className="w-6 h-6 text-blue-400 mr-3" />
                Certifications
              </h3>
              <div className="grid gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {cert.title}
                        </h4>
                        <p className="text-blue-400 font-medium mb-2">{cert.issuer}</p>
                        <p className="text-gray-300 text-sm">{cert.description}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <span className="text-gray-400 text-sm">{cert.date}</span>
                        <div className="flex items-center space-x-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
                          <Award size={14} />
                          <span>Certified</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Trophy className="w-6 h-6 text-blue-400 mr-3" />
                Achievements
              </h3>
              <div className="grid gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <span className="text-gray-400 text-sm">{achievement.date}</span>
                        <div className="flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                          <Trophy size={14} />
                          <span>Achievement</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;