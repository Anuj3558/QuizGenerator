import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";

function Nav() {
  // State to manage whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Function to simulate login/logout (this can later be replaced with actual logic)
  const handleLogout = () => {
    setIsLoggedIn(false); // Simulate user logging out
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate user logging in
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-16"
    >
      {/* Logo */}
      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        AIQuizGen
      </div>

      {/* Conditional Navigation Links */}
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            {/* Render when the user is logged in */}
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white"
              >
                About Us
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* Render when the user is not logged in */}
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}

export default Nav;
