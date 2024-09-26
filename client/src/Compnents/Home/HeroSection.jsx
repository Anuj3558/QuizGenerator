import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "./ui/Button";
import { HeroIMG } from '../../assets';
import GradientBorderButton from './ui/GradientBorderButton';


function Hero() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center mb-24"
        >
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                >
                    AI-Powered <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Quiz Generation</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl text-gray-400 mb-8"
                >
                    Create engaging quizzes in seconds with our advanced AI technology. Perfect for educators and trainers.
                </motion.p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="relative inline-block"
                >
                    {/* Gradient border wrapper */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent bg-clip-padding animate-gradient-border" />
                    <Link to="/signup" className="relative z-10">
                       <GradientBorderButton children={"Get Started"}/>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative mb-12"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full filter blur-3xl opacity-30"></div>
                
                {/* Add swing animation here */}
                <motion.img
                    src={HeroIMG}
                    alt="AI Quiz Generation"
                    className="relative z-10"
                    width={400}
                    height={400}
                    animate={{
                        y: [0, -10, 0], // Move up and down
                    }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        repeat: Infinity, // Repeat infinitely
                        repeatType: "loop", // Loop the animation
                    }}
                />
            </motion.div>
        </motion.main>
    );
}

export default Hero;
