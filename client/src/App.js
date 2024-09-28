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
import { ErrorNotification, SuccessNotification, WarningNotification } from "./Compnents/ui/Notification Components .jsx";
import { ThemeContext } from "./Context/ThemeContext.jsx";
import { useContext } from "react";

// import Login from "./Compnents";
// import Signup from "./Signup";

function App() {
  const {  theme,setTheme} =useContext(ThemeContext);
  return (
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
   
      </Routes>
      {theme == "Warningtr" &&<WarningNotification message="Operation successful!" position="top-right" />}
     {theme == "Successtr" &&<SuccessNotification message="Operation successful!" position="top-right" />}
       {theme == "Errorbr"&&  <ErrorNotification message="Error: Failed to save changes" position="bottom-right" /> }
    
      <Footer />
    </BrowserRouter>
  );
}

export default App;