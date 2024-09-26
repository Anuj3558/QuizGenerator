import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from "./ui/Card"
import { Star } from "lucide-react"

function Testimonials() {
    const controls = useAnimation()
    const [ref, inView] = useInView()
  
    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])
  
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
    ]
  
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
          What Our Users <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Star className="text-yellow-400 mr-1" />
                    <Star className="text-yellow-400 mr-1" />
                    <Star className="text-yellow-400 mr-1" />
                    <Star className="text-yellow-400 mr-1" />
                    <Star className="text-yellow-400" />
                  </div>
                  <p className="text-gray-300 mb-4">{testimonial.content}</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    )
}

export default Testimonials;
