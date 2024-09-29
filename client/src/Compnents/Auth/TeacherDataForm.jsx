'use client';

import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { ThemeContext } from '../../Context/ThemeContext';
 // Import your notification component

const TeacherDataForm = () => {
  const [step, setStep] = useState(1);
  const {
    theme,
    setTheme,
    successMsg,
    setSuccessMsg,
    warningMsg,
    setWarningMsg,
    errMsg,
    setErrMsg,
  } = useContext(ThemeContext);

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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (index, field, value) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const handleCourseInputChange = (index, field, value) => {
    setFormData((prev) => {
      const newCourses = [...prev.courses];
      newCourses[index] = { ...newCourses[index], [field]: value };
      return { ...prev, courses: newCourses };
    });
  };

  const handleStatsInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      teachingStats: { ...prev.teachingStats, [field]: value },
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayField = (field, index) => {
    setFormData((prev) => {
      const newArray = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: newArray };
    });
  };

  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [...prev.courses, { title: '', students: 0 }],
    }));
  };

  const removeCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookie.get('_id');
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
      );
      console.log('Profile submitted:', response.data);
      setSuccessMsg('Registration successful!');
      setTheme('success');
    } catch (err) {
      console.error('Error submitting profile:', err);
      setErrMsg('There was an error submitting your profile. Please try again.');
      setTheme('error');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              {formData.subject.map((subject, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => handleArrayInputChange(index, 'subject', e.target.value)}
                    placeholder="Subject"
                    className="flex-grow bg-gray-800 text-white rounded-md p-2"
                  />
                  {index === formData.subject.length - 1 ? (
                    <button onClick={() => addArrayField('subject')} className="p-2 bg-blue-500 rounded-md">
                      <Plus size={20} />
                    </button>
                  ) : (
                    <button onClick={() => removeArrayField('subject', index)} className="p-2 bg-red-500 rounded-md">
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
                className="w-full bg-gray-800 text-white rounded-md p-2"
              />
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Years of Experience"
                className="w-full bg-gray-800 text-white rounded-md p-2"
              />
              <input
                type="text"
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleInputChange}
                placeholder="Current School"
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
                    onChange={(e) => handleArrayInputChange(index, 'achievements', e.target.value)}
                    placeholder="Achievement"
                    className="flex-grow bg-gray-800 text-white rounded-md p-2"
                  />
                  {index === formData.achievements.length - 1 ? (
                    <button onClick={() => addArrayField('achievements')} className="p-2 bg-blue-500 rounded-md">
                      <Plus size={20} />
                    </button>
                  ) : (
                    <button onClick={() => removeArrayField('achievements', index)} className="p-2 bg-red-500 rounded-md">
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
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            <div className="space-y-4">
              {formData.courses.map((course, index) => (
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
                      type="number"
                      value={course.students}
                      onChange={(e) => handleCourseInputChange(index, 'students', parseInt(e.target.value))}
                      placeholder="Number of Students"
                      className="flex-grow bg-gray-800 text-white rounded-md p-2"
                    />
                    {index === formData.courses.length - 1 ? (
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
            <h2 className="text-2xl font-bold mb-4">Teaching Stats</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Student Satisfaction (0-100)</label>
                <input
                  type="number"
                  value={formData.teachingStats.studentSatisfaction}
                  onChange={(e) => handleStatsInputChange('studentSatisfaction', parseInt(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full bg-gray-800 text-white rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Course Completion Rate (0-100)</label>
                <input
                  type="number"
                  value={formData.teachingStats.courseCompletionRate}
                  onChange={(e) => handleStatsInputChange('courseCompletionRate', parseInt(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full bg-gray-800 text-white rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Average Quiz Score (0-100)</label>
                <input
                  type="number"
                  value={formData.teachingStats.averageQuizScore}
                  onChange={(e) => handleStatsInputChange('averageQuizScore', parseInt(e.target.value))}
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
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Teacher Profile Setup
        </h1>
        
        {/* Notification Component for Success and Error Messages */}
 

        <form  className="space-y-6">
          {renderStep()}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-700 rounded-md flex items-center"
              >
                <ChevronLeft size={20} className="mr-2" /> Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-600 rounded-md flex items-center ml-auto"
              >
                Next <ChevronRight size={20} className="ml-2" />
              </button>
            ) : (
              <button
              onClick={handleSubmit}
                type="submit"
                className="px-4 py-2 bg-green-600 rounded-md flex items-center ml-auto"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TeacherDataForm;
