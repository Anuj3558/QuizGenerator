import React from 'react';

const GradientBorderButton = ({ children, onClick, className = '' }) => {
  return (
    <div className="relative inline-block">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-rotate"></div>
      <button
        onClick={onClick}
        className={`relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600 ${className}`}
      >
        <span className="flex items-center space-x-5">
          <span className="pr-6 text-gray-100">{children}</span>
        </span>
        <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">
          See more &rarr;
        </span>
      </button>
    </div>
  );
};

export default GradientBorderButton;