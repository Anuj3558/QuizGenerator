import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeroIMG } from '../../assets';

const Hero = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center justify-center min-h-screen0 p-4"
    >
      <div className="text-center mb-12 max-w-4xl">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800"
        >
          AI-Powered{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Quiz Generation
          </span>
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-gray-600 mb-8"
        >
          Create engaging quizzes in seconds with our advanced AI technology. Perfect for educators and trainers.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative inline-block"
        >
          <Link to="/signup">
            <button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-600 rounded-full hover:from-blue-500 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative mb-12"
      >
        <div className="absolute "></div>
        
        <motion.img
          src={HeroIMG}
          alt="AI Quiz Generation"
          className="relative z-10 rounded-lg"
          width={400}
          height={400}
          animate={{
            y: [0, -10, 0],
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"
      />
    </motion.main>
  );
};

export default Hero;

