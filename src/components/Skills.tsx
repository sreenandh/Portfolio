import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Server, Database, Wrench, Zap, Brain, Sparkles } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const SkillIcon = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const [isTriggered, setIsTriggered] = useState(false);

  return (
    <motion.div
      className="flex items-center justify-center mb-4 relative z-10 cursor-pointer"
      whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
      animate={isTriggered ? { scale: [1, 1.15, 1], rotate: [0, -10, 10, 0] } : {}}
      transition={{ duration: 0.5 }}
      onClick={() => setIsTriggered(true)}
      onAnimationComplete={() => setIsTriggered(false)}
    >
      <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white shadow-lg shadow-blue-500/20`}>
        {children}
      </div>
    </motion.div>
  );
};

const StatIcon = ({ children }: { children: React.ReactNode }) => {
  const [isTriggered, setIsTriggered] = useState(false);

  return (
    <motion.div
      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-3 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-300 cursor-pointer"
      whileHover={{ rotate: 360, scale: 1.1 }}
      animate={isTriggered ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.6 }}
      onClick={() => setIsTriggered(true)}
      onAnimationComplete={() => setIsTriggered(false)}
    >
      {children}
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: <Code className="w-6 h-6" />,
      skills: ['JavaScript', 'Python', 'TypeScript', 'C/C++', 'SQL', 'HTML/CSS'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Frameworks & Libraries',
      icon: <Server className="w-6 h-6" />,
      skills: ['React', 'Node.js', 'Express.js', 'Bootstrap', 'Next.js', 'Angular'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Databases & Cloud',
      icon: <Database className="w-6 h-6" />,
      skills: ['MongoDB', 'MySQL', 'AWS (S3, EC2)', 'Firebase'],
      color: 'from-cyan-500 to-teal-500'
    },
    {
      title: 'Tools & Technologies',
      icon: <Wrench className="w-6 h-6" />,
      skills: ['Git/GitHub', 'VS Code', 'Postman', 'Jira', 'n8n', 'Docker'],
      color: 'from-orange-500 to-red-500'
    },
  ];

  const otherSkills = [
    'Data Structures and Algorithms',
    'OOP',
    'RESTful APIs',
    'JWT Authentication',
    'Responsive Design',
    'Agile/Scrum',
    'Code Review',
    'ES6',
    'NPM',
    'JSON',
    'Prompt Engineering',
    'Work Flow',
    'Generative AI',
    'System Design'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: -15, z: -100 },
    visible: {
      opacity: 1,
      rotateY: 0,
      z: 0,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 80
      }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1, 1.4, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-full px-6 py-2 mb-6 pulse-glow"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Technical Expertise</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-animate">
                Skills & Technologies
              </span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-400 mx-auto rounded-full"
            />
          </motion.div>

          {/* Main Skill Categories with 3D effect */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-300`} />

                {/* Icon with enhanced animation - Responsive */}
                <SkillIcon color={category.color}>
                  {category.icon}
                </SkillIcon>

                <h3 className="text-xl font-semibold mb-6 text-center text-white relative z-10">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2 justify-center relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.15 + skillIndex * 0.08,
                        type: 'spring',
                        stiffness: 200
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: [-2, 2, -2, 0],
                        boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                      }}
                      className="px-3 py-1.5 bg-slate-700/50 text-gray-300 rounded-lg text-sm border border-slate-600 hover:border-blue-400/60 hover:text-blue-300 hover:bg-slate-700 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Skills with enhanced wave animation */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center space-x-2 mb-8"
            >
              <Brain className="w-5 h-5 text-cyan-400" />
              <h3 className="text-2xl font-semibold text-white">
                Other Skills & Concepts
              </h3>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
              {otherSkills.map((skill, index) => {
                const row = Math.floor(index / 5);
                const col = index % 5;

                return (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 20, rotate: -5 }}
                    animate={inView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 20, rotate: -5 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + (row * 0.1) + (col * 0.05),
                      type: 'spring',
                      stiffness: 150
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -8,
                      rotate: [0, -3, 3, 0],
                      boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                    }}
                    className="group relative px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 text-gray-300 rounded-xl text-sm border border-slate-600 hover:border-cyan-400/60 hover:text-cyan-300 transition-all duration-300 cursor-default shadow-lg hover:shadow-cyan-500/25 overflow-hidden"
                  >
                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">{skill}</span>
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Skill Stats with AnimatedCounter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20 backdrop-blur-sm glass-morphism"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Languages', count: 6, icon: Code },
                { label: 'Frameworks', count: 6, icon: Zap },
                { label: 'Tools', count: 6, icon: Wrench },
                { label: 'Total Skills', count: 30, icon: Sparkles },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: 1.4 + index * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  className="text-center group cursor-default"
                >
                  <StatIcon>
                    <stat.icon className="w-6 h-6 text-white" />
                  </StatIcon>
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedCounter
                      target={stat.count}
                      duration={2}
                      delay={1.5 + index * 0.2}
                      suffix="+"
                    />
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;