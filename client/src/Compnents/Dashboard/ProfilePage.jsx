import React from "react";
import PropTypes from "prop-types"; // Add PropTypes
import { Avatar, AvatarImage, AvatarFallback } from "../Home/ui/avatar";
import { Button } from "../Home/ui/Button.jsx";
import Badge from "../Dashboard/Badge.jsx";
import Progress from "../Dashboard/Progress.jsx";
import {
  Award,
  Book,
  Briefcase,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  GraduationCap,
} from "lucide-react";

const ProfilePage = ({ userType = "student" }) => {
  const isTeacher = userType === "teacher";

  const userName = isTeacher ? "John Doe" : "Jane Smith";
  const userLocation = "New York, USA";
  const userEmail = isTeacher
    ? "john.doe@example.com"
    : "jane.smith@example.com";
  const userPhone = "+1 (555) 123-4567";
  const userRole = isTeacher
    ? "Senior Teacher at XYZ High School"
    : "Student at XYZ High School";

  const badges = isTeacher
    ? ["Mathematics", "Physics", "Computer Science"]
    : ["High School", "Grade 11", "Honor Roll"];

  const achievements = isTeacher
    ? [
        "Teacher of the Year 2023",
        "Best Research Paper Award",
        "100% Student Satisfaction",
      ]
    : ["Honor Roll Student", "Science Fair Winner", "Perfect Attendance"];

  const courses = isTeacher
    ? [
        { title: "Advanced Calculus", students: 25 },
        { title: "Quantum Physics", students: 18 },
        { title: "Data Structures", students: 30 },
      ]
    : [
        { title: "Advanced Mathematics", grade: "A+" },
        { title: "Physics 101", grade: "A" },
        { title: "Computer Science Basics", grade: "A-" },
      ];

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

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl backdrop-filter backdrop-blur-lg border border-gray-700">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-purple-500">
            <AvatarImage src="/profile-avatar.jpg" alt="Profile" />
            <AvatarFallback className="bg-purple-500 text-2xl font-bold">
              {isTeacher ? "JD" : "JS"}
            </AvatarFallback>
          </Avatar>
          <Badge className="absolute bottom-0 right-0 bg-green-500">
            Online
          </Badge>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {userName}
            </h2>
            <p className="text-gray-400 flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> {userLocation}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-500 hover:bg-blue-600"
              >
                {badge}
              </Badge>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 flex items-center">
              {isTeacher ? (
                <>
                  <Briefcase className="w-4 h-4 mr-2" /> {userRole}
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4 mr-2" /> {userRole}
                </>
              )}
            </p>
            <p className="text-gray-300 flex items-center">
              <Mail className="w-4 h-4 mr-2" /> {userEmail}
            </p>
            <p className="text-gray-300 flex items-center">
              <Phone className="w-4 h-4 mr-2" /> {userPhone}
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
                <Award className="w-4 h-4 mr-2 text-purple-500" /> {achievement}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Book className="w-5 h-5 mr-2 text-blue-500" />
            {isTeacher ? "Current Courses" : "Enrolled Courses"}
          </h3>
          <ul className="space-y-2">
            {courses.map((course, index) => (
              <li key={index}>
                {course.title}
                <Badge className="ml-2">
                  {isTeacher ? `${course.students} students` : course.grade}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          {isTeacher ? "Teaching Stats" : "Learning Stats"}
        </h3>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{stat.label}</span>
                <span>
                  {stat.max ? `${stat.value}/${stat.max}` : `${stat.value}%`}
                </span>
              </div>
              <Progress
                value={stat.max ? (stat.value / stat.max) * 100 : stat.value}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          <MessageSquare className="w-4 h-4 mr-2" />
          {isTeacher ? "Contact John" : "Contact Jane"}
        </Button>
      </div>
    </div>
  );
};

// Add PropTypes for validation
ProfilePage.propTypes = {
  userType: PropTypes.oneOf(["student", "teacher"]),
};

export default ProfilePage;
