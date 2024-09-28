import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, User, Send } from "lucide-react";

const TestimonialCard = ({ name, role, content }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotateY: 5 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-6 border border-blue-500 shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
  >
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="text-yellow-400 mr-1 h-5 w-5" />
      ))}
    </div>
    <p className="text-gray-300 mb-4">{content}</p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center mr-3">
        <User className="text-white h-6 w-6" />
      </div>
      <div>
        <div className="font-semibold text-white">{name}</div>
        <div className="text-sm text-gray-400">{role}</div>
      </div>
    </div>
  </motion.div>
);

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', { name, role, review });
    // Here you would typically send this data to your backend
    setName('');
    setRole('');
    setReview('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-12 bg-gray-800 bg-opacity-50 md:w-[50%] mt-56 backdrop-filter backdrop-blur-lg rounded-2xl p-6 border border-purple-500 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Share Your Experience
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-700 bg-opacity-50 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2"
          required
        />
        <input
          type="text"
          placeholder="Your Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-700 bg-opacity-50 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2"
          required
        />
        <textarea
          placeholder="Your Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full bg-gray-700 bg-opacity-50 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 h-32"
          required
        ></textarea>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 flex items-center justify-center"
        >
          <Send className="mr-2 h-5 w-5" /> Submit Review
        </motion.button>
      </div>
    </motion.form>
  );
};

const Testimonials = () => {
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "High School Teacher",
      content: "AIQuizGen has revolutionized my quiz creation process. It's like having a personal assistant that understands exactly what I need!",
    },
    {
      name: "Dr. Michael Lee",
      role: "University Professor",
      content: "The AI-generated questions are impressively relevant and challenging. It's saved me countless hours in exam preparation.",
    },
    {
      name: "Emily Chen",
      role: "Corporate Trainer",
      content: "The analytics provided by AIQuizGen have given me invaluable insights into my trainees' progress. Highly recommended!",
    },
  ];

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
    <section className="py-20  overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-16"
        >
          What Our Users <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Say</span>
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
        <ReviewForm />
      </div>
    </section>
  );
};

export default Testimonials;