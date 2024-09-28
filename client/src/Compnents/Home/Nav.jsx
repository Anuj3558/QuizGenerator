import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button"; // Adjust the path if necessary
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = ({ isLoggedIn=true, handleLogout, handleLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 mt-3 rounded-3xl justify-center transition-all duration-300 ${
        isScrolled ? "bg-blur backdrop-blur-md shadow-lg" : "bg-inherit"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                AIQuizGen
              </span>
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            {isLoggedIn ? (
              <>
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
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="w-full text-left text-gray-300 hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Nav;
