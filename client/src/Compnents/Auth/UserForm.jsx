import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Select from "react-select";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#1a202c",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#2d3748",
    borderRadius: "1rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  formContent: {
    padding: "2rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2rem",
    background: "linear-gradient(to right, #60a5fa, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#e2e8f0",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#4a5568",
    border: "1px solid #60a5fa",
    borderRadius: "0.5rem",
    color: "white",
    fontSize: "1rem",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#4299e1",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "1rem",
  },
  achievementContainer: {
    marginBottom: "1rem",
  },
  achievementInput: {
    width: "calc(100% - 50px)",
    marginRight: "0.5rem",
  },
  removeButton: {
    padding: "0.5rem 0.75rem",
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  addButton: {
    padding: "0.5rem 0.75rem",
    backgroundColor: "#48bb78",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "0.5rem",
  },
};

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#4a5568",
    borderColor: "#60a5fa",
    borderRadius: "0.5rem",
    padding: "0.25rem",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#60a5fa",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#4a5568",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#2b6cb0"
      : state.isFocused
      ? "#4a5568"
      : "#4a5568",
    color: "white",
    "&:active": {
      backgroundColor: "#2b6cb0",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#2b6cb0",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    "&:hover": {
      backgroundColor: "#c53030",
      color: "white",
    },
  }),
};

const UserForm = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    grade: "",
    school: "",
    achievements: [""],
    courses: [],
    subjects: [],
    qualification: "",
    experience: "",
    currentSchool: "",
  });

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      // Redirect to user type selection page
      window.location.href = "/select-user-type";
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      achievements: newAchievements,
    }));
  };

  const handleAddAchievement = () => {
    setFormData((prevData) => ({
      ...prevData,
      achievements: [...prevData.achievements, ""],
    }));
  };

  const handleRemoveAchievement = (index) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      achievements: newAchievements,
    }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    // After submission, redirect to a success page
    window.location.href = "/dashboard";
  };

  const courseOptions = [
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "art", label: "Art" },
  ];

  const subjectOptions = [
    { value: "math", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
    { value: "art", label: "Art" },
    { value: "music", label: "Music" },
    { value: "physical_education", label: "Physical Education" },
  ];

  const renderStudentForm = () => (
    <>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="grade">
          Grade
        </label>
        <input
          style={styles.input}
          type="text"
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          placeholder="Enter your grade"
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="school">
          School
        </label>
        <input
          style={styles.input}
          type="text"
          id="school"
          name="school"
          value={formData.school}
          onChange={handleInputChange}
          placeholder="Enter your school name"
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Achievements</label>
        {formData.achievements.map((achievement, index) => (
          <div key={index} style={styles.achievementContainer}>
            <input
              style={{ ...styles.input, ...styles.achievementInput }}
              type="text"
              value={achievement}
              onChange={(e) => handleAchievementChange(index, e.target.value)}
              placeholder={`Achievement ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveAchievement(index)}
              style={styles.removeButton}
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddAchievement}
          style={styles.addButton}
        >
          Add Achievement
        </button>
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="courses">
          Enrolled Courses
        </label>
        <Select
          isMulti
          name="courses"
          options={courseOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleMultiSelectChange("courses", selectedOptions)
          }
          styles={customSelectStyles}
        />
      </div>
    </>
  );

  const renderTeacherForm = () => (
    <>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="subjects">
          Subjects
        </label>
        <Select
          isMulti
          name="subjects"
          options={subjectOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleMultiSelectChange("subjects", selectedOptions)
          }
          styles={customSelectStyles}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="qualification">
          Qualification
        </label>
        <input
          style={styles.input}
          type="text"
          id="qualification"
          name="qualification"
          value={formData.qualification}
          onChange={handleInputChange}
          placeholder="Enter your qualification"
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="experience">
          Years of Experience
        </label>
        <input
          style={styles.input}
          type="number"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Enter years of experience"
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="currentSchool">
          Current School
        </label>
        <input
          style={styles.input}
          type="text"
          id="currentSchool"
          name="currentSchool"
          value={formData.currentSchool}
          onChange={handleInputChange}
          placeholder="Enter your current school"
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Achievements</label>
        {formData.achievements.map((achievement, index) => (
          <div key={index} style={styles.achievementContainer}>
            <input
              style={{ ...styles.input, ...styles.achievementInput }}
              type="text"
              value={achievement}
              onChange={(e) => handleAchievementChange(index, e.target.value)}
              placeholder={`Achievement ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveAchievement(index)}
              style={styles.removeButton}
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddAchievement}
          style={styles.addButton}
        >
          Add Achievement
        </button>
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label} htmlFor="courses">
          Courses
        </label>
        <Select
          isMulti
          name="courses"
          options={courseOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) =>
            handleMultiSelectChange("courses", selectedOptions)
          }
          styles={customSelectStyles}
        />
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.form}
      >
        <div style={styles.formContent}>
          <h2 style={styles.title}>
            {userType === "student" ? "Student" : "Teacher"} Registration
          </h2>
          <form onSubmit={handleSubmit}>
            {userType === "student" ? renderStudentForm() : renderTeacherForm()}
            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserForm;
