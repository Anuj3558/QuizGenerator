'use client'

import React, { useContext, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import { Plus, Minus, ChevronRight } from 'lucide-react'
import { ThemeContext } from '../../Context/ThemeContext'
import { useNavigate } from 'react-router-dom'

export default function StudentDataForm() {
  const { theme, setTheme, successMsg, setSuccessMsg, warningMsg, setWarningMsg, errMsg, setErrMsg } = useContext(ThemeContext)
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    grade: '',
    school: '',
    achievements: [''],
    enrolledCourses: [{ title: '', grade: '' }],
    learningStats: {
      gpa: 0,
      attendanceRate: 0,
      homeworkCompletion: 0,
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (index, value) => {
    setFormData((prev) => {
      const newAchievements = [...prev.achievements]
      newAchievements[index] = value
      return { ...prev, achievements: newAchievements }
    })
  }

  const handleCourseInputChange = (index, field, value) => {
    setFormData((prev) => {
      const newCourses = [...prev.enrolledCourses]
      newCourses[index] = { ...newCourses[index], [field]: value }
      return { ...prev, enrolledCourses: newCourses }
    })
  }

  const handleStatsInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      learningStats: { ...prev.learningStats, [field]: value },
    }))
  }

  const addArrayField = () => {
    setFormData((prev) => ({ ...prev, achievements: [...prev.achievements, ''] }))
  }

  const removeArrayField = (index) => {
    setFormData((prev) => {
      const newAchievements = prev.achievements.filter((_, i) => i !== index)
      return { ...prev, achievements: newAchievements }
    })
  }

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, { title: '', grade: '' }],
    }))
  }

  const removeCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = Cookies.get('_id')

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/submit-student-data`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response) {
        setSuccessMsg('Profile completed')
        setTheme('success')
        Navigate("/dashboard")
        window.location.reload()
      }

      console.log('Form submitted:', response.data)
    } catch (error) {
      setErrMsg('Server Error please try again')
      setTheme('error')
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 backdrop-filter backdrop-blur-lg bg-opacity-80"
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Student Data Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Basic Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                placeholder="Grade"
                className="w-full bg-gray-100 text-gray-800 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                placeholder="School"
                className="w-full bg-gray-100 text-gray-800 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Achievements</h2>
            <div className="space-y-4">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleArrayInputChange(index, e.target.value)}
                    placeholder="Achievement"
                    className="flex-grow bg-gray-100 text-gray-800 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  />
                  {index === formData.achievements.length - 1 ? (
                    <motion.button
                      type="button"
                      onClick={addArrayField}
                      className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={20} />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={() => removeArrayField(index)}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Minus size={20} />
                    </motion.button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Enrolled Courses</h2>
            <div className="space-y-4">
              {formData.enrolledCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) => handleCourseInputChange(index, 'title', e.target.value)}
                    placeholder="Course Title"
                    className="w-full bg-gray-100 text-gray-800 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={course.grade}
                      onChange={(e) => handleCourseInputChange(index, 'grade', e.target.value)}
                      placeholder="Grade"
                      className="flex-grow bg-gray-100 text-gray-800 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    />
                    {index === formData.enrolledCourses.length - 1 ? (
                      <motion.button
                        type="button"
                        onClick={addCourse}
                        className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={() => removeCourse(index)}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Minus size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Submit</span>
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

