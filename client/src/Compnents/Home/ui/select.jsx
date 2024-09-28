// src/components/ui/Select.jsx
import React from "react";

// Main Select Component
const Select = React.forwardRef(({ label, options, ...props }, ref) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        {...props}
        className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

// Additional Components (Optional)
const SelectContent = () => {
  // Your SelectContent logic here
  return null; // Replace with actual content
};

const SelectItem = () => {
  // Your SelectItem logic here
  return null; // Replace with actual item
};

const SelectTrigger = () => {
  // Your SelectTrigger logic here
  return null; // Replace with actual trigger
};

const SelectValue = () => {
  // Your SelectValue logic here
  return null; // Replace with actual value
};

// Exporting all components
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
