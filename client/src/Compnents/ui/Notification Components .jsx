'use client'

import React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

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

// Success Notification
export const SuccessNotification = ({ message, position }) => (
  <NotificationBase
    icon={CheckCircle}
    message={message}
    bgColor="bg-gradient-to-r from-green-400 via-green-500 to-green-600"
    textColor="text-white"
    position={position}
  />
)

// Warning Notification
export const WarningNotification = ({ message, position }) => (
  <NotificationBase
    icon={AlertTriangle}
    message={message}
    bgColor="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
    textColor="text-white"
    position={position}
  />
)

// Error Notification
export const ErrorNotification = ({ message, position }) => (
  <NotificationBase
    icon={XCircle}
    message={message}
    bgColor="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
    textColor="text-white"
    position={position}
  />
)

// Example usage
export default function Component() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="space-y-4">
        <SuccessNotification message="Operation successful!" position="top-right" />
        <WarningNotification message="Warning: Low disk space" position="top-left" />
        <ErrorNotification message="Error: Failed to save changes" position="bottom-right" />
        <SuccessNotification message="File uploaded successfully" position="bottom-center" />
      </div>
    </div>
  )
}
