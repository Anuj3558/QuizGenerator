import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        successMsg,
        setSuccessMsg,
        warningMsg,
        setWarningMsg,
        errMsg,
        setErrMsg,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
