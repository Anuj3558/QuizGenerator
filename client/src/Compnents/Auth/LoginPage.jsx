import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Lock } from 'lucide-react';
import { FaGoogle } from "react-icons/fa";
import axios from 'axios';
import { ThemeContext } from '../../Context/ThemeContext';
import { auth, googleProvider } from '../../Firebase/firebaseconfig'; // Ensure you have your Firebase config set up
import Cookies from "js-cookie"; // Use js-cookie for cookie management
import { signInWithPopup } from "firebase/auth"; // Import signInWithPopup from Firebase

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
    <input
      {...props}
      className="w-full bg-gray-900 border border-blue-500 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
    />
  </div>
);

const Button = ({ children, className, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setSuccessMsg, setErrMsg, setTheme } = useContext(ThemeContext);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        userEmail: email,
        userPass: password,
      });
      const id = response.data.token;
      Cookies.set("_id",id);  
      setSuccessMsg("Login successful!");
      setTheme("success");
      localStorage.setItem('token', response.data.token);
      window.location.reload();
      navigate("/")

    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
      setErrMsg('Login failed. Please try again.');
      setTheme("error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // Correctly use signInWithPopup
      const user = result.user;

      // Extract user data
      const userData = {
        userName: user.displayName,
        userEmail: user.email,
        userProfilePic: user.photoURL,
        uid: user.uid,
      };

      // Send user data to your backend
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup-with-google`, userData);
      const id = res.data.token;
      Cookies.set("_id", id); // Set the cookie

      setSuccessMsg("Goggle signup success!");
      setTheme("success");
      window.location.reload();
      Navigate("/")

    } catch (error) {
      console.error('Error during Google sign-in:', error.message);
      setErrorMessage('Google sign-in failed. Please try again.');
      setErrMsg('Google sign-in failed. Please try again.');
      setTheme("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-center mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Welcome Back
              </span>
            </h2>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                icon={Mail}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                icon={Lock}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button type="submit">
                Log In <ChevronRight className="inline-block ml-2" size={18} />
              </Button>
            </form>
            <div className="mt-6">
              <Button onClick={handleGoogleLogin} className="bg-gray-700 hover:bg-gray-600">
                <FaGoogle className="inline-block mr-2" size={18} />
                Log in with Google
              </Button>
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-400 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
