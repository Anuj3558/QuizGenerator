'use client';

import React, { useContext, useState } from 'react';
import axios from 'axios'; // Import axios
import Cookies from 'js-cookie'; // Import js-cookie
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react';
import { ThemeContext } from '../../Context/ThemeContext';

export default function StudentDataForm() {
  const [step, setStep] = useState(1);
  const { theme, setTheme, successMsg, setSuccessMsg, warningMsg, setWarningMsg, errMsg, setErrMsg } = useContext(ThemeContext);
  
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (index, value) => {
    setFormData((prev) => {
      const newAchievements = [...prev.achievements];
      newAchievements[index] = value;
      return { ...prev, achievements: newAchievements };
    });
  };

  const handleCourseInputChange = (index, field, value) => {
    setFormData((prev) => {
      const newCourses = [...prev.enrolledCourses];
      newCourses[index] = { ...newCourses[index], [field]: value };
      return { ...prev, enrolledCourses: newCourses };
    });
  };

  const handleStatsInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      learningStats: { ...prev.learningStats, [field]: value },
    }));
  };

  const addArrayField = () => {
    setFormData((prev) => ({ ...prev, achievements: [...prev.achievements, ''] }));
  };

  const removeArrayField = (index) => {
    setFormData((prev) => {
      const newAchievements = prev.achievements.filter((_, i) => i !== index);
      return { ...prev, achievements: newAchievements };
    });
  };

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, { title: '', grade: '' }],
    }));
  };

  const removeCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('_id'); // Retrieve the _id cookie for the authorization token

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/submit-student-data`, // Replace with your API endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        }
      );
      if (response) {
        setSuccessMsg('Profile completed');
        setTheme('success');
      }

      console.log('Form submitted:', response.data); // Log the response from the API
    } catch (error) {
      setErrMsg('Server Error please try again');
      setTheme('error');
      console.error('Error submitting form:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                placeholder="Grade"
                className="w-full bg-gray-800 text-white rounded-md p-2"
              />
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                placeholder="School"
                className="w-full bg-gray-800 text-white rounded-md p-2"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <div className="space-y-4">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleArrayInputChange(index, e.target.value)}
                    placeholder="Achievement"
                    className="flex-grow bg-gray-800 text-white rounded-md p-2"
                  />
                  {index === formData.achievements.length - 1 ? (
                    <button onClick={addArrayField} className="p-2 bg-blue-500 rounded-md">
                      <Plus size={20} />
                    </button>
                  ) : (
                    <button onClick={() => removeArrayField(index)} className="p-2 bg-red-500 rounded-md">
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
            <div className="space-y-4">
              {formData.enrolledCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    value={course.title}
                    onChange={(e) => handleCourseInputChange(index, 'title', e.target.value)}
                    placeholder="Course Title"
                    className="w-full bg-gray-800 text-white rounded-md p-2"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={course.grade}
                      onChange={(e) => handleCourseInputChange(index, 'grade', e.target.value)}
                      placeholder="Grade"
                      className="flex-grow bg-gray-800 text-white rounded-md p-2"
                    />
                    {index === formData.enrolledCourses.length - 1 ? (
                      <button onClick={addCourse} className="p-2 bg-blue-500 rounded-md">
                        <Plus size={20} />
                      </button>
                    ) : (
                      <button onClick={() => removeCourse(index)} className="p-2 bg-red-500 rounded-md">
                        <Minus size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Learning Stats</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">GPA (0-4)</label>
                <input
                  type="number"
                  value={formData.learningStats.gpa}
                  onChange={(e) => handleStatsInputChange('gpa', parseFloat(e.target.value))}
                  min="0"
                  max="4"
                  step="0.1"
                  className="w-full bg-gray-800 text-white rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Attendance Rate (0-100)</label>
                <input
                  type="number"
                  value={formData.learningStats.attendanceRate}
                  onChange={(e) => handleStatsInputChange('attendanceRate', parseInt(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full bg-gray-800 text-white rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Homework Completion Rate (0-100)</label>
                <input
                  type="number"
                  value={formData.learningStats.homeworkCompletion}
                  onChange={(e) => handleStatsInputChange('homeworkCompletion', parseInt(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full bg-gray-800 text-white rounded-md p-2"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Student Data Form
        </h1>
        <form  className="space-y-4">
          {renderStep()}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <ChevronLeft className="mr-2" />
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                Next
                <ChevronRight className="ml-2" />
              </button>
            ) : (
              <button onClick={handleSubmit} type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                Submit
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
