'use client'

import React, { useContext, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
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
      }

      console.log('Form submitted:', response.data)
    } catch (error) {
      setErrMsg('Server Error please try again')
      setTheme('error')
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="min-h-screen pt-40 bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Student Data Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                placeholder="Grade"
                className="w-full bg-gray-700 text-white rounded-md p-2"
              />
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                placeholder="School"
                className="w-full bg-gray-700 text-white rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <div className="space-y-4">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleArrayInputChange(index, e.target.value)}
                    placeholder="Achievement"
                    className="flex-grow bg-gray-700 text-white rounded-md p-2"
                  />
                  {index === formData.achievements.length - 1 ? (
                    <button type="button" onClick={addArrayField} className="p-2 bg-blue-500 rounded-md">
                      <Plus size={20} />
                    </button>
                  ) : (
                    <button type="button" onClick={() => removeArrayField(index)} className="p-2 bg-red-500 rounded-md">
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
            <div className="space-y-4">
              {formData.enrolledCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) => handleCourseInputChange(index, 'title', e.target.value)}
                    placeholder="Course Title"
                    className="w-full bg-gray-700 text-white rounded-md p-2"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={course.grade}
                      onChange={(e) => handleCourseInputChange(index, 'grade', e.target.value)}
                      placeholder="Grade"
                      className="flex-grow bg-gray-700 text-white rounded-md p-2"
                    />
                    {index === formData.enrolledCourses.length - 1 ? (
                      <button type="button" onClick={addCourse} className="p-2 bg-blue-500 rounded-md">
                        <Plus size={20} />
                      </button>
                    ) : (
                      <button type="button" onClick={() => removeCourse(index)} className="p-2 bg-red-500 rounded-md">
                        <Minus size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}