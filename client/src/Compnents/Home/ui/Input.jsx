export function Input({ className, ...props }) {
    return (
      <input
        className={`border border-gray-700 rounded py-2 px-4 bg-gray-800 text-white focus:outline-none focus:border-blue-500 ${className}`}
        {...props}
      />
    );
  }

  