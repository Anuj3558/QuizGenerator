import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import Cookie from "js-cookie";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { user } = useAuth();

  const [teacher, setTeacher] = useState(null);
  const [userType, setUserType] = useState("NA");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [classroom, setClassroom] = useState({
    classroomName: "",
    teacherName: "",
    code: "",
    content: {
      videos: [],
      notes: [],
      announcements: [],
      syllabus: [],
    },
    students: [],
  });
  

  //teacher states
  const [subject, setSubject] = useState([]);
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState(0);
  const [currentSchool, setCurrentSchool] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [courses, setCourses] = useState([]);

  const teacherInfo = async () => {
    const token = Cookie.get("_id");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/teacher-data`,
        {
          userId: user.uid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const teacherData = response?.data?.teacher;
      if (teacherData) {
        setTeacher(teacherData); // Set the teacher state
        setSubject(teacherData.subject);
        setQualification(teacherData.qualification);
        setExperience(teacherData.experience);
        setCurrentSchool(teacherData.currentSchool);
        setAchievements(teacherData.achievements);
        setCourses(teacherData.courses);
      }
    } catch (error) {
      console.error("Unable to fetch teacher data:", error);
    }
  };

  const studentInfo = async () => {
    try {
      // Add your student data fetching logic here
    } catch (error) {
      console.error("Unable to fetch student data:", error);
    }
  };
  useEffect(() => {
    teacherInfo();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
        fullName,
        setFullName,
        profilePicUrl,
        setProfilePicUrl,
        classroom,
        setClassroom,
        uid,
        setUid,
        teacher,
        setTeacher,
        phone,
        setPhone,
        location,
        setLocation,
        subject,
        setSubject,
        qualification,
        setQualification,
        experience,
        setExperience,
        currentSchool,
        setCurrentSchool,
        achievements,
        setAchievements,
        courses,
        setCourses,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
