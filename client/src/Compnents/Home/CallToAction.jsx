import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "./ui/Button" // Assuming you have a Button component

const CallToAction = () => {
    return (
        <section className="bg-gradient-to-r py-16 text-gray-800 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white from-blue-200 to-indigo-300 opacity-30 blur-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl sm:text-4xl pb-3 lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                    Start Enhancing Learning Today!
                </motion.h2>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg mb-8 text-gray-600"
                >
                    Join our platform and unlock the power of AI for your teaching and learning experience.
                </motion.p>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition duration-300 px-6 py-3 rounded-full shadow-lg hover:shadow-xl">
                            Sign Up
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 transition duration-300 px-6 py-3 rounded-full shadow-lg hover:shadow-xl border border-blue-200">
                            Watch a Demo
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 transition duration-300 px-6 py-3 rounded-full shadow-lg hover:shadow-xl border border-blue-200">
                            Contact Us
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
           
        
           
        </section>
    )
}

export default CallToAction

