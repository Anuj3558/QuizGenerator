import { useEffect } from 'react'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { Brain, Zap, Clock, BarChart } from "lucide-react"
import FeatureCard from './FeatureCard'
function Features() {
    const controls = useAnimation()
    const [ref, inView] = useInView()
  
    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])
  
    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 }
        }}
        transition={{ duration: 0.5 }}
        className="mb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Platform <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Brain className="h-12 w-12 text-blue-400" />}
            title="AI-Powered Generation"
            description="Leverage advanced AI to create diverse and engaging quizzes tailored to your content."
          />
          <FeatureCard
            icon={<Zap className="h-12 w-12 text-purple-400" />}
            title="Instant Results"
            description="Generate quizzes in seconds, saving you hours of manual work and preparation time."
          />
          <FeatureCard
            icon={<Clock className="h-12 w-12 text-green-400" />}
            title="Time-Saving"
            description="Focus on teaching while our AI handles quiz creation, grading, and performance tracking."
          />
          <FeatureCard
            icon={<BarChart className="h-12 w-12 text-yellow-400" />}
            title="Insightful Analytics"
            description="Gain valuable insights into student performance with detailed analytics and reports."
          />
        </div>
      </motion.section>
    )
  }
export default  Features