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
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    profilePicUrl: "", // Set default or leave empty
    userPhone: "",
  });

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
      setTeacher(response.data);
      console.log("teacher data", teacher);
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
  }, []);

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
