import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarImage, AvatarFallback } from "../Home/ui/avatar";
import { Button } from "../Home/ui/Button.jsx";
import Badge from "../Dashboard/Badge.jsx";
import Progress from "../Dashboard/Progress.jsx";
import Cookie from "js-cookie";
import {
  Award,
  Book,
  Briefcase,
  Mail,
  MapPin,
  Phone,
  Star,
  GraduationCap,
} from "lucide-react";
import { UserContext } from "../../Context/UserContext.js";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext.js";

const ProfilePage = ({ userType = "student" }) => {
  const token = Cookie.get("_id");
  const { user } = useAuth();
  const isTeacher = userType === "Teacher";
  const { email, setEmail } = useContext(UserContext);
  const { fullName, setFullName } = useContext(UserContext);
  const { profilePicUrl, setProfilePicUrl } = useContext(UserContext);
  const { phone, setPhone } = useContext(UserContext);
  const { location, setLocation } = useContext(UserContext);
  const { subject, setSubject } = useContext(UserContext);
  const { qualification, setQualification } = useContext(UserContext);
  const { experience, setExperience } = useContext(UserContext);
  const { currentSchool, setCurrentSchool } = useContext(UserContext);
  const { achievements, setAchievements } = useContext(UserContext);
  const { courses, setCourses } = useContext(UserContext);
  // console.log(
  //   "States",
  //   subject,
  //   qualification,
  //   experience,
  //   currentSchool,
  //   achievements,
  //   courses
  // );
  // State for profile editing
  console.log("location", location);
  const [isEditing, setIsEditing] = useState(false);

  const [newAchievement, setNewAchievement] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseGrade, setNewCourseGrade] = useState("");

  const badges = isTeacher
    ? ["Mathematics", "Physics", "Computer Science"]
    : ["High School", "Grade 11", "Honor Roll"];
  const stats = isTeacher
    ? [
        { label: "Student Satisfaction", value: 95 },
        { label: "Course Completion Rate", value: 98 },
        { label: "Average Quiz Score", value: 88 },
      ]
    : [
        { label: "Overall GPA", value: 3.8, max: 4.0 },
        { label: "Attendance Rate", value: 98 },
        { label: "Homework Completion", value: 92 },
      ];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/save-changes-teacher`,
        {
          userId: user.uid,
          subject,
          qualification,
          experience,
          currentSchool,
          achievements,
          courses,
          phone,
          fullName,
          location,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      console.log("profile updated successfully");
    } catch (error) {
      console.log("Error occured during profile update");
    }

    // You can add functionality here to save changes to a database or API
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement("");
    }
  };

  const handleCourseChange = (index, value) => {
    const newCourses = [...courses];
    newCourses[index].title = value;
    setCourses(newCourses);
  };

  const handleAddCourse = () => {
    if (newCourseTitle.trim()) {
      const courseData = { title: newCourseTitle, grade: newCourseGrade };
      setCourses([...courses, courseData]);
      setNewCourseTitle("");
      setNewCourseGrade("");
    }
  };

  const handleStudentChange = (index, value) => {
    const newCourses = [...courses];
    newCourses[index].students = value;
    setCourses(newCourses);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl backdrop-filter backdrop-blur-lg border border-gray-700">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-purple-500">
            <AvatarImage src={profilePicUrl} alt="Profile" />
            <AvatarFallback className="bg-purple-500 text-2xl font-bold">
              {isTeacher ? "JD" : "JS"}
            </AvatarFallback>
          </Avatar>
          {/* <Badge className="absolute bottom-0 right-0 bg-green-500">
            Online
          </Badge> */}
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {isEditing ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-2"
                />
              ) : (
                fullName
              )}
            </h2>
            <p className="text-gray-400 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {isEditing ? (
                <input
                  type="email"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-2"
                />
              ) : (
                location
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {subject.map((sub, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-500 hover:bg-blue-600"
              >
                {sub}
              </Badge>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-2"
                />
              ) : (
                email
              )}
            </p>
            <p className="text-gray-300 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-2"
                />
              ) : (
                phone
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            {isTeacher ? "Achievements" : "Academic Achievements"}
          </h3>
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-purple-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) =>
                      handleAchievementChange(index, e.target.value)
                    }
                    className="bg-gray-700 border border-gray-600 rounded px-2 flex-1"
                  />
                ) : (
                  achievement
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="New Achievement"
                className="bg-gray-700 border border-gray-600 rounded px-2 flex-1"
              />
              <Button onClick={handleAddAchievement} className="ml-2">
                Add
              </Button>
            </div>
          )}
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Book className="w-5 h-5 mr-2 text-blue-500" />
            {isTeacher ? "Current Courses" : "Enrolled Courses"}
          </h3>
          <ul className="space-y-2">
            {courses.map((course, index) => (
              <li key={index} className="flex items-center">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={course.title}
                      onChange={(e) =>
                        handleCourseChange(index, e.target.value)
                      }
                      className="bg-gray-700 border border-gray-600 rounded px-2 flex-1"
                    />
                    {isTeacher && (
                      <input
                        type="number"
                        value={course.students}
                        onChange={(e) =>
                          handleStudentChange(index, e.target.value)
                        }
                        className="bg-gray-700 border border-gray-600 rounded px-2 ml-2 flex-1"
                        placeholder="Number of students"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {course.title}
                    {isTeacher ? (
                      <Badge className="ml-2">{course.students} students</Badge>
                    ) : (
                      <Badge className="ml-2">{course.grade}</Badge>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                placeholder="New Course Title"
                className="bg-gray-700 border border-gray-600 rounded px-2 flex-1"
              />
              {isTeacher && (
                <input
                  type="number"
                  value={newCourseGrade}
                  onChange={(e) => setNewCourseGrade(e.target.value)}
                  placeholder="Grade"
                  className="bg-gray-700 border border-gray-600 rounded px-2 flex-1 ml-2"
                />
              )}
              <Button onClick={handleAddCourse} className="ml-2">
                Add
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {isEditing ? (
          <Button
            onClick={handleSaveClick}
            className="bg-green-500 hover:bg-green-600"
          >
            Save Changes
          </Button>
        ) : (
          <Button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  userType: PropTypes.oneOf(["Student", "Teacher", "NA"]),
};

export default ProfilePage;
