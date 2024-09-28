import React, { createContext, useState } from "react";


export const UserContext = createContext();


const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState('NA');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        isLoggedIn,
        setIsLoggedIn,
        name,
        setName,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
