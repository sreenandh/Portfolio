import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, MapPin, Award, GraduationCap, Code } from 'lucide-react';
import { getCurrentExperience } from '../utils/experienceCalculator';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Dynamic experience calculation
  const [experience, setExperience] = useState('');

  useEffect(() => {
    // Calculate experience immediately when component mounts
    setExperience(getCurrentExperience());
    
    // Update experience every hour to catch month changes
    const intervalId = setInterval(() => {
      setExperience(getCurrentExperience());
    }, 3600000); // 1 hour in milliseconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
    <section id="about" className="py-20 relative">
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
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Profile Photo */}
            <motion.div variants={itemVariants} className="lg:col-span-1 flex justify-center">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-80 h-80 rounded-2xl overflow-hidden border-4 border-blue-500/30 shadow-2xl"
                >
                  <img
                    src="https://res.cloudinary.com/drvhrv1zx/image/upload/v1756414247/de47b1ba-6d85-443e-8295-9096ca4f4162_2_hjm9yj.jpg"
                    alt="Sreenandh M - Full Stack Developer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                </motion.div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-slate-900">
                  <Code className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-semibold">Who I Am</h3>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Hi, I'm <span className="text-blue-400 font-semibold">Sreenandh M</span>, a passionate Full Stack Developer 
                    with expertise in modern web technologies. I recently graduated with a B.Tech in Computer Science and Engineering 
                    from Vimal Jyothi Engineering College, and I'm excited to build scalable applications that solve real-world problems.
                  </p>
                  <p>
                    With hands-on experience in the MERN stack and cloud technologies, I've contributed to projects ranging from 
                    cloud-native banking platforms to AI-powered fitness applications. I love learning new technologies and 
                    taking on challenging projects that push the boundaries of what's possible.
                  </p>
                  <p>
                    I'm passionate about creating exceptional user experiences and writing clean, maintainable code. 
                    Currently based in Kerala, India, and open to exciting opportunities worldwide.
                  </p>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 text-center"
                >
                  <MapPin className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-white font-medium">Kannur, Kerala</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 text-center"
                >
                  <Award className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 mb-1">Experience</p>
                  <p className="text-white font-medium">
                    {experience || 'Calculating...'}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 text-center"
                >
                  <GraduationCap className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 mb-1">Education</p>
                  <p className="text-white font-medium">B.Tech CSE</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 text-center"
                >
                  <Code className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 mb-1">Focus</p>
                  <p className="text-white font-medium">Full Stack</p>
                </motion.div>
              </div>

              {/* Fun Stats */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 backdrop-blur-sm border border-blue-500/20">
                <h4 className="text-xl font-semibold mb-6 text-center text-white">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Projects Completed</span>
                    <span className="text-blue-400 font-medium">10+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Technologies</span>
                    <span className="text-blue-400 font-medium">15+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Lines of Code</span>
                    <span className="text-blue-400 font-medium">10K+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Coffee Consumed</span>
                    <span className="text-blue-400 font-medium">∞</span>
                  </div>
                </div>
              </div>

              {/* Achievements Highlights */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 backdrop-blur-sm border border-purple-500/20">
                <h4 className="text-xl font-semibold mb-4 text-center text-white">Recent Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Contributed to CloudBank platform</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Deloitte Job Simulation completed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Research paper at NCIPETC-24</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Multiple certifications earned</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;