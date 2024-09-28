import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [WarningMsg, setwarninigsg] = useState("");
  const [errMsg, seterrMsg] = useState("");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme,setTheme,successMsg, setSuccessMsg,WarningMsg, setwarninigsg,errMsg, seterrMsg
      }}>
      {children}
    </ThemeContext.Provider>
  );
};