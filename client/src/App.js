import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Compnents/LandingPage.jsx";
import Dashboard from "./Compnents/Dashboard/Dashboard.jsx"; // Import your other pages
import AboutUs from "./Compnents/AboutUs.jsx";
import QuizAnalytics from "./Compnents/Dashboard/QuizAnalytics.jsx";

// import Login from "./Compnents";
// import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/quiz-analysis"element={<QuizAnalytics/>}/>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
