import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Zap, Clock, BarChart } from "lucide-react";



const FeatureCard = ({ icon: Icon, title, description }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragElastic={0.1}
      whileTap={{ cursor: "grabbing" }}
      whileHover="hover"
      className="relative h-full cursor-grab"
    >
      <motion.div 
        variants={{
          hover: {
            scale: 1.05,
            boxShadow: "0 0 30px rgba(0, 100, 255, 0.3)"
          }
        }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-6 h-full border border-blue-500 shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
      >
        <div className="flex items-center space-x-4 mb-4">
          <Icon className="h-10 w-10 text-blue-400" />
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            {title}
          </h3>
        </div>
        <p className="text-gray-300">{description}</p>
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;