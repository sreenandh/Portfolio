import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, Award, ExternalLink, Trophy, Sparkles } from 'lucide-react';

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
      description: 'Comprehensive study of computer science fundamentals, software engineering, data structures, algorithms, and modern web technologies.',
      grade: 'CGPA: 8.5/10'
    }
  ];

  const certifications = [
    {
      title: 'MERN/MEAN Full Stack',
      issuer: 'NACTET',
      date: '2025',
      description: 'Full-stack web development using MongoDB, Express.js, React, Angular, and Node.js',
      link: 'https://drive.google.com/file/d/1K7hpvv6wZv_aafWgsDdzEbP3hT0z-q2E/view?usp=sharing',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Python Programming',
      issuer: 'IIT BombayX',
      date: '2024',
      description: 'Advanced Python programming concepts and applications',
      link: 'https://drive.google.com/file/d/1WxotEbrsBoZgl5PK9QrvoKFkzRAmgLPF/view?usp=sharing',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: '2024',
      description: 'Modern responsive web design principles and CSS frameworks',
      link: 'https://freecodecamp.org/certification/fcc29105209-d2d7-4e83-81f6-67d991f8559b/responsive-web-design',
      color: 'from-sky-500 to-blue-600'
    },
    {
      title: 'Introduction to Generative AI',
      issuer: 'Google Cloud',
      date: '2024',
      description: 'Fundamentals of generative AI and its applications',
      link: 'https://www.coursera.org/account/accomplishments/verify/G1TQCIX84D2S',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Introduction to Large Language Models',
      issuer: 'Google Cloud',
      date: '2024',
      description: 'Understanding large language models and their capabilities',
      link: 'https://www.coursera.org/account/accomplishments/verify/KU5RYTM6K46K',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      title: 'Introduction to Responsible AI',
      issuer: 'Google Cloud',
      date: '2024',
      description: 'Principles and practices for responsible AI development',
      link: 'https://www.coursera.org/account/accomplishments/records/1CG942UKYNI1',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const achievements = [
    {
      title: 'Deloitte Australia Technology Job Simulation on Forage',
      date: 'July 2025',
      description: 'Completed a job simulation involving development and coding; Wrote a proposal for creating a dashboard',
      link: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_iA97vD8azeYJBWQpJ_1752005609422_completion_certificate.pdf',
      icon: Trophy
    },
    {
      title: 'Research Paper Presentation',
      date: '2024',
      description: 'Presented research paper at NCIPETC-24 National Conference on Emerging Computing Trends',
      link: '',
      icon: Sparkles
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="education" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-3 rounded-2xl backdrop-blur-sm border border-blue-500/20">
                <GraduationCap className="w-8 h-8 text-blue-400" />
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">
                Education & Achievements
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              A journey of continuous learning and professional growth
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "6rem" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mt-4"
            />
          </motion.div>

          <div className="space-y-12 lg:space-y-16">
            {/* Education Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Education</h3>
              </div>

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/50 group-hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 mb-6">
                      <div className="flex-1">
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                          {edu.degree}
                        </h4>
                        <p className="text-blue-400 font-semibold text-base sm:text-lg mb-2">{edu.institution}</p>
                        {edu.grade && (
                          <div className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-1.5 rounded-full border border-green-500/30 mb-3">
                            <span className="text-green-300 font-medium text-sm">{edu.grade}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 lg:items-end">
                        <div className="flex items-center gap-2 text-gray-300 bg-slate-700/50 px-4 py-2 rounded-full">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 bg-slate-700/50 px-4 py-2 rounded-full">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">{edu.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certifications Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Certifications</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-300`} />
                    <div className="relative h-full bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50 group-hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-cyan-400 transition-all pb-1">
                            {cert.link ? (
                              <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:gap-3 transition-all"
                              >
                                <span>{cert.title}</span>
                                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                              </a>
                            ) : (
                              cert.title
                            )}
                          </h4>
                          <p className="text-blue-400 font-semibold text-sm mb-3">{cert.issuer}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">{cert.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <span className="text-gray-500 text-xs sm:text-sm font-medium">{cert.date}</span>
                        <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
                          <Award className="w-3 h-3" />
                          <span className="text-xs font-semibold">Certified</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Achievements</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-300" />
                      <div className="relative h-full bg-slate-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50 group-hover:border-yellow-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">
                              {achievement.link ? (
                                <a
                                  href={achievement.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 hover:gap-3 hover:text-yellow-400 transition-all"
                                >
                                  <span>{achievement.title}</span>
                                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                </a>
                              ) : (
                                achievement.title
                              )}
                            </h4>
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                          <span className="text-gray-500 text-xs sm:text-sm font-medium">{achievement.date}</span>
                          <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-500/20">
                            <Trophy className="w-3 h-3" />
                            <span className="text-xs font-semibold">Achievement</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;