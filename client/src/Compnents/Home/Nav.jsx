import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react"; // Menu icon for mobile

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex p-7 justify-between items-center backdrop-blur fixed w-full z-10"
    >
      {/* Logo */}
     <Link to="/"> <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        AIQuizGen
      </div></Link>

      {/* Hamburger icon for mobile */}
      <div className="lg:hidden">
        <Menu onClick={toggleMenu} className="text-gray-300 cursor-pointer" />
      </div>

      {/* Conditional Navigation Links (Desktop View) */}
      <div className={`space-x-4 ${isMenuOpen ? "block" : "hidden"} lg:flex`}>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Dashboard
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
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
