"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import Components
import Nav from "./Home/Nav";
import Hero from "./Home/HeroSection";
import Features from "./Home/Features";
import Testimonials from "./Home/Testimonials";
import Footer from "./Home/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Main container with components */}
      <div className="container mx-auto px-4 py-16 relative">
        <Nav />
        <Hero />
        <Features />
        <Testimonials />
        <Footer />
      </div>

      {/* Floating Motion Elements */}
      <motion.div
        className="fixed top-20 left-10 w-20 h-20 bg-blue-500 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
