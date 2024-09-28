import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// Base Notification Component
const NotificationBase = ({ icon: Icon, message, bgColor, textColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5 }}
    className={`flex items-center space-x-4 p-4 rounded-lg shadow-lg absolute md:top-[-7vh] md:left-[-30vw] ${bgColor} ${textColor} backdrop-blur-md bg-opacity-80 border border-opacity-20`}
  >
    <Icon size={24} className="text-current" />
    <span className="text-lg font-semibold">{message}</span>
  </motion.div>
);

// Success Notification
export const SuccessNotification = ({ message }) => (
  <NotificationBase
    icon={CheckCircle}
    message={message}
    bgColor="bg-gradient-to-r from-green-400 absolute  via-green-500 to-green-600"
    textColor="text-white"
  />
);

// Warning Notification
export const WarningNotification = ({ message }) => (
  <NotificationBase
    icon={AlertTriangle}
    message={message}
    bgColor="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
    textColor="text-white"
  />
);

// Error Notification
export const ErrorNotification = ({ message }) => (
  <NotificationBase
    icon={XCircle}
    message={message}
    bgColor="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
    textColor="text-white"
  />
);
