import { motion } from 'framer-motion';
import { Button } from "./ui/Button"; // Assuming you have a Button component

const CallToAction = () => {
    return (
        <section className="bg-gradient-to-r from-blue-800 to-purple-950 py-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-20 blur-md"></div>
            <div className="relative z-10">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl lg:text-5xl font-bold mb-6"
                >
                    Start Enhancing Learning Today!
                </motion.h2>
                <p className="text-lg mb-8">
                    Join our platform and unlock the power of AI for your teaching and learning experience.
                </p>
                <div className="flex justify-center space-x-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="bg-white text-blue-600 hover:bg-blue-100 transition duration-300 px-6 py-3 rounded-full">
                            Sign Up
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="bg-white text-blue-600 hover:bg-blue-100 transition duration-300 px-6 py-3 rounded-full">
                            Watch a Demo
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button className="bg-white text-blue-600 hover:bg-blue-100 transition duration-300 px-6 py-3 rounded-full">
                            Contact Us
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
