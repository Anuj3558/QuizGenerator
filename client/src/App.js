import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Compnents/LandingPage.jsx";

import Dashboard from "./Compnents/Dashboard/Dashboard.jsx"; // Import your other pages
import AboutUs from "./Compnents/AboutUs.jsx";
import QuizAnalytics from "./Compnents/Dashboard/QuizAnalytics.jsx";

// Import your other pages
import SignUpPage from "./Compnents/Auth/SignUpPage.jsx";
import Nav from "./Compnents/Home/Nav.jsx";
import Footer from "./Compnents/Home/Footer.jsx";
import LoginPage from "./Compnents/Auth/LoginPage.jsx";
import {
  ErrorNotification,
  SuccessNotification,
  WarningNotification,
} from "./Compnents/ui/Notification Components .jsx";
import { ThemeContext } from "./Context/ThemeContext.jsx";
import { useContext } from "react";
import UserProvider from "./Context/UserContext.js";
import SelectUserType from "./Compnents/Auth/SelectUserType.jsx";
import UserForm from "./Compnents/Auth/UserForm.jsx";

// import Login from "./Compnents";

function App() {
  const {
    theme,
    setTheme,
    successMsg,
    setSuccessMsg,
    WarningMsg,
    setwarninigsg,
    errMsg,
    seterrMsg,
  } = useContext(ThemeContext);
  return (
    <UserProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Define routes for each page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/quiz-analysis" element={<QuizAnalytics />} />
          <Route path="/userType" element={<SelectUserType />} />
          <Route path="/form" element={<UserForm />} />
        </Routes>
        {theme === "Warningtr" && (
          <WarningNotification message={WarningMsg} position="top-right" />
        )}
        {theme === "Successtr" && (
          <SuccessNotification
            message="Operation successful!"
            position="top-right"
          />
        )}
        {theme === "Errorbr" && (
          <ErrorNotification
            message="Error: Failed to save changes"
            position="bottom-right"
          />
        )}

        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
