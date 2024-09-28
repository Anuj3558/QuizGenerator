'use client'

import React, { useEffect, useContext } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { ThemeContext } from "../../Context/ThemeContext"

// Base Notification Component
const NotificationBase = ({ icon: Icon, message, bgColor, textColor, position }) => {
  const positionClasses = {
    'top-left': 'top-24 left-4',
    'top-right': 'top-24 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  }

  const animationVariants = {
    initial: { opacity: 0, y: position.includes('bottom') ? 20 : -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: position.includes('bottom') ? 20 : -20 },
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants}
      transition={{ duration: 0.5 }}
      className={`fixed flex items-center space-x-4 p-4 rounded-lg shadow-lg ${positionClasses[position]} ${bgColor} ${textColor} backdrop-blur-md bg-opacity-80 border border-opacity-20 z-50`}
    >
      <Icon size={24} className="text-current" />
      <span className="text-lg font-semibold">{message}</span>
    </motion.div>
  )
}

// Success Notification with auto-dismiss
export const SuccessNotification = ({ message, position }) => {
  const { setTheme, setSuccessMsg } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme('');
      setSuccessMsg('');
    }, 5000); // Dismiss after 5 seconds
    return () => clearTimeout(timer);
  }, [setTheme, setSuccessMsg]);

  return (
    <NotificationBase
      icon={CheckCircle}
      message={message}
      bgColor="bg-gradient-to-r from-green-400 via-green-500 to-green-600"
      textColor="text-white"
      position={position}
    />
  );
}

// Warning Notification with auto-dismiss
export const WarningNotification = ({ message, position }) => {
  const { setTheme, setWarningMsg } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme('');
      setWarningMsg('');
    }, 5000); // Dismiss after 5 seconds
    return () => clearTimeout(timer);
  }, [setTheme, setWarningMsg]);

  return (
    <NotificationBase
      icon={AlertTriangle}
      message={message}
      bgColor="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
      textColor="text-white"
      position={position}
    />
  );
}

// Error Notification with auto-dismiss
export const ErrorNotification = ({ message, position }) => {
  const { setTheme, setErrMsg } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme('');
      setErrMsg('');
    }, 5000); // Dismiss after 5 seconds
    return () => clearTimeout(timer);
  }, [setTheme, setErrMsg]);

  return (
    <NotificationBase
      icon={XCircle}
      message={message}
      bgColor="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
      textColor="text-white"
      position={position}
    />
  );
}
