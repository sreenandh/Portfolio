import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Server, Database, Wrench } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
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
      color: 'from-purple-500 to-violet-500'
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
    <section id="skills" className="py-20 relative">
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
                Skills & Technologies
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Skill Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} text-white`}>
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-6 text-center text-white">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + skillIndex * 0.1,
                      }}
                      className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm border border-slate-600 hover:border-blue-400/50 hover:text-blue-300 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Skills */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-semibold mb-8 text-white">
              Other Skills & Concepts
            </h3>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {otherSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-gray-300 rounded-lg text-sm border border-slate-600 hover:border-purple-400/50 hover:text-purple-300 transition-all duration-300 cursor-default shadow-lg"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;