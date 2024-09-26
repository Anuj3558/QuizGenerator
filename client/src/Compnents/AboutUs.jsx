import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  ClipboardList,
  BarChart,
  Brain,
  Rocket,
  FileUp,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative p-6 bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden transition-all duration-300 group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
    <div className="relative z-10">
      <Icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-white transition-colors duration-300" />
      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
        {description}
      </p>
    </div>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
  </motion.div>
);

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          About AI Quiz Generator
        </h1>
        <p className="text-2xl mb-12 text-center text-gray-300">
          Revolutionizing education with AI-powered quizzes, assessments, and
          content generation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={Brain}
            title="AI-Powered Quiz Generation"
            description="Our advanced AI algorithms create unique, challenging quizzes tailored to your curriculum and learning objectives."
          />
          <FeatureCard
            icon={Users}
            title="Virtual Classrooms"
            description="Students can easily join online classrooms, collaborate with peers, and participate in interactive learning experiences."
          />
          <FeatureCard
            icon={ClipboardList}
            title="Customizable Assessments"
            description="Teachers can create and customize tests using AI assistance, ensuring comprehensive coverage of course material."
          />
          <FeatureCard
            icon={BarChart}
            title="Detailed Analytics"
            description="Get in-depth insights into student performance with our comprehensive assessment and scoring tools."
          />
          <FeatureCard
            icon={Lightbulb}
            title="Adaptive Learning"
            description="Our AI adapts to each student's performance, providing personalized learning paths and recommendations."
          />
          <FeatureCard
            icon={Rocket}
            title="Continuous Improvement"
            description="We constantly update our AI models and features to provide the best learning experience possible."
          />
          <FeatureCard
            icon={FileUp}
            title="Syllabus-Based Content Generation"
            description="Teachers can upload a syllabus PDF, and our AI will automatically generate questions, answers, and study notes."
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            How It Works
          </h2>
          <ol className="list-decimal list-inside text-left max-w-3xl mx-auto space-y-4 text-gray-300">
            <li>Teachers create a virtual classroom and invite students.</li>
            <li>
              Teachers can upload a syllabus PDF or input curriculum details.
            </li>
            <li>
              AI analyzes the syllabus and generates quizzes, questions,
              answers, and study notes.
            </li>
            <li>
              Students join the classroom and access AI-generated content and
              quizzes.
            </li>
            <li>
              The system automatically grades the quizzes and provides instant
              feedback.
            </li>
            <li>
              Teachers review the results and get insights into student
              performance.
            </li>
            <li>
              Based on the results, the AI suggests areas for improvement and
              additional resources.
            </li>
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mb-16"
        >
         
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block"
          >
            <input
              type="file"
              accept=".pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            Ready to Transform Your Teaching?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Sign Up as a Teacher
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
            >
              Join as a Student
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
