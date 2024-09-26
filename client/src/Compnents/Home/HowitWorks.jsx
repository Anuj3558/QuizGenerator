import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Users, FileText, Brain, BookOpen, CheckCircle, BarChart2 } from 'lucide-react';

const steps = [
  { icon: Users, text: "Teachers create a virtual classroom and invite students." },
  { icon: FileText, text: "Teachers upload a syllabus PDF or input curriculum details." },
  { icon: Brain, text: "AI generates quizzes and study materials." },
  { icon: BookOpen, text: "Students access the content and quizzes." },
  { icon: CheckCircle, text: "Automatic grading and instant feedback." },
  { icon: BarChart2, text: "Teachers review results and get improvement suggestions." }
];

const AnimatedText = ({ text }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const HowItWorksSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} className="text-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-extrabold text-center mb-12"
        >
          <AnimatedText text="How It Works" />
        </motion.h2>
        <div className="relative">
          <motion.div
            variants={itemVariants}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-purple-500"
            style={{ height: '100%' }}
          />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            >
              <motion.div
                variants={itemVariants}
                className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}
              >
                <p className="text-lg">
                  <AnimatedText text={step.text} />
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full z-10"
              >
                <step.icon className="w-6 h-6 text-white" />
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute w-full h-full bg-purple-500 rounded-full"
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'text-right pr-8'}`}
              >
                <span className="text-xl font-semibold">
                  <AnimatedText text={`Step ${index + 1}`} />
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorksSection;