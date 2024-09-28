import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, User, Mail, Lock } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { ThemeContext } from '../../Context/ThemeContext';
import { auth, googleProvider } from '../../Firebase/firebaseconfig.js'; // Import firebase config
import { signInWithPopup } from "firebase/auth"; // Import signInWithPopup
import  Cookie  from 'js-cookie';
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

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setSuccessMsg, setWarningMsg, setErrMsg, setTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const URL = process.env.REACT_APP_BACKEND_URL;

    try {
      const response = await axios.post(`${URL}/auth/register`, {
        userName: name,
        userEmail: email,
        userPass: password,
      });
      const id = response.data.token;
      Cookie.set("_id",id);
      setSuccessMsg("Registration successful!");
      setTheme("success");
      setTimeout(() => {
        navigate('/complete-profile'); 
      }, 2000);
      
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);

      if (error.response?.status === 409) {
        setErrorMessage('User already exists. Please log in.');
        setWarningMsg('User already exists. Please log in.');
        setTheme("warning");
        navigate('/login'); 
      } else {
        setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
        setErrMsg('Registration failed. Please try again.');
        setTheme("error");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Extract user data
      const userData = {
        userName: user.displayName,
        userEmail: user.email,
        userProfilePic: user.photoURL,
        uid: user.uid,
      };

      // Send user data to your backend
      const URL = process.env.REACT_APP_BACKEND_URL;
      const res = await axios.post(`${URL}/auth/signup-with-google`, userData);
       const id = res.data.token;
       Cookie.set("_id",id);
      setSuccessMsg("Registration successful!");
      setTheme("success");
      setTimeout(() => {
        navigate('/complete-profile');
      }, 2000);
      
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
                Join AIQuizGen
              </span>
            </h2>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                icon={User}
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit">
                Sign Up <ChevronRight className="inline-block ml-2" size={18} />
              </Button>
            </form>
            <div className="mt-6">
              <Button onClick={handleGoogleSignUp} className="bg-gray-700 hover:bg-gray-600">
                <FaGoogle className="inline-block mr-2" size={18} />
                Sign up with Google
              </Button>
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-blue-400 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
