import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Zap, Clock, BarChart } from "lucide-react";
import FeatureCard from "./FeatureCard"


const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-16"
        >
          Platform <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Features</span>
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { icon: Brain, title: "AI-Powered Generation", description: "Leverage advanced AI to create diverse and engaging quizzes tailored to your content." },
            { icon: Zap, title: "Instant Results", description: "Generate quizzes in seconds, saving you hours of manual work and preparation time." },
            { icon: Clock, title: "Time-Saving", description: "Focus on teaching while our AI handles quiz creation, grading, and performance tracking." },
            { icon: BarChart, title: "Insightful Analytics", description: "Gain valuable insights into student performance with detailed analytics and reports." }
          ].map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;