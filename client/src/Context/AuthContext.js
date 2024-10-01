import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);


  
  const logout = () => {
    setUser(null);
    setTeacher(null); // Clear teacher data on logout
    Cookie.remove("_id");
  };

  const checkAuth = async () => {
    const token = Cookie.get("_id");
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/check`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data); // Ensure user data has userType
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    }
    setLoading(false);
  };



  useEffect(() => {
    checkAuth();
  }, []);

 

  return (
    <AuthContext.Provider value={{ user, teacher, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
