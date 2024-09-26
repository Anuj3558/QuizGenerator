"use client"



import { motion } from 'framer-motion'

import Nav from './Home/Nav'
import Hero from './Home/HeroSection'
import Features from './Home/Features'
import Testimonials from './Home/Testimonials'
import Footer from './Home/Footer'
import HowItWorksSection from './Home/HowitWorks'
import CallToAction from './Home/CallToAction'

export default function LandingPage() {
  return (
    <div className="min-h-screen poppins-regular pt-7 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
       
        <Hero />
        <Features />
        <HowItWorksSection />
        <CallToAction />
        <Testimonials />
       
      </div>

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
  )
}







