import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Compnents/LandingPage.jsx";
// Import your other pages
import SignUpPage from "./Compnents/Auth/SignUpPage.jsx";
import Nav from "./Compnents/Home/Nav.jsx";
import Footer from "./Compnents/Home/Footer.jsx";
import LoginPage from "./Compnents/Auth/LoginPage.jsx";

// import Login from "./Compnents";
// import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        
        {/* Define routes for each page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/*
        <Route path="/signup" element={<Signup />} /> */}
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;