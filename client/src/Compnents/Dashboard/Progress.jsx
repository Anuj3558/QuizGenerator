import React from "react";

const Progress = ({ value, className = "" }) => {
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;
