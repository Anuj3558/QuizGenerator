'use client'

import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { ThemeContext } from '../../Context/ThemeContext'
import { useNavigate } from 'react-router-dom'

const TeacherDataForm = () => {
  const {
    theme,
    setTheme,
    successMsg,
    setSuccessMsg,
    warningMsg,
    setWarningMsg,
    errMsg,
    setErrMsg,
  } = useContext(ThemeContext)
 const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: [''],
    qualification: '',
    experience: 0,
    currentSchool: '',
    achievements: [''],
    courses: [{ title: '', students: 0 }],
    teachingStats: {
      studentSatisfaction: 0,
      courseCompletionRate: 0,
      averageQuizScore: 0,
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (index, field, value) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const handleCourseInputChange = (index, field, value) => {
    setFormData((prev) => {
      const newCourses = [...prev.courses]
      newCourses[index] = { ...newCourses[index], [field]: value }
      return { ...prev, courses: newCourses }
    })
  }

  const handleStatsInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      teachingStats: { ...prev.teachingStats, [field]: value },
    }))
  }

  const addArrayField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  const removeArrayField = (field, index) => {
    setFormData((prev) => {
      const newArray = prev[field].filter((_, i) => i !== index)
      return { ...prev, [field]: newArray }
    })
  }

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [...prev.courses, { title: '', students: 0 }],
    }))
  }

  const removeCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = Cookie.get('_id')
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/submit-student-data`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      Navigate("/dashboard");
      console.log('Profile submitted:', response.data)
      setSuccessMsg('Registration successful!')
      setTheme('success')
      
    } catch (err) {
      console.error('Error submitting profile:', err)
      setErrMsg('There was an error submitting your profile. Please try again.')
      setTheme('error')
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
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Teacher Profile Setup
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              {formData.subject.map((subject, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => handleArrayInputChange(index, 'subject', e.target.value)}
                    placeholder="Subject"
                    className="flex-grow bg-gray-700 text-white rounded-md p-2"
                  />
                  {index === formData.subject.length - 1 ? (
                    <button type="button" onClick={() => addArrayField('subject')} className="p-2 bg-blue-500 rounded-md">
                      <Plus size={20} />
                    </button>
                  ) : (
                    <button type="button" onClick={() => removeArrayField('subject', index)} className="p-2 bg-red-500 rounded-md">
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                placeholder="Qualification"
                className="w-full bg-gray-700 text-white rounded-md p-2"
              />
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Years of Experience"
                className="w-full bg-gray-700 text-white rounded-md p-2"
              />
              <input
                type="text"
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleInputChange}
                placeholder="Current School"
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
                    onChange={(e) => handleArrayInputChange(index, 'achievements', e.target.value)}
                    placeholder="Achievement"
                    className="flex-grow bg-gray-700 text-white rounded-md p-2"
                  />
                  {index === formData.achievements.length - 1 ? (
                    <button type="button" onClick={() => addArrayField('achievements')} className="p-2 bg-blue-500 rounded-md">
                      <Plus size={20} />
                    </button>
                  ) : (
                    <button type="button" onClick={() => removeArrayField('achievements', index)} className="p-2 bg-red-500 rounded-md">
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            <div className="space-y-4">
              {formData.courses.map((course, index) => (
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
                      type="number"
                      value={course.students}
                      onChange={(e) => handleCourseInputChange(index, 'students', parseInt(e.target.value))}
                      placeholder="Number of Students"
                      className="flex-grow bg-gray-700 text-white rounded-md p-2"
                    />
                    {index === formData.courses.length - 1 ? (
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
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 rounded-md flex items-center"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default TeacherDataForm