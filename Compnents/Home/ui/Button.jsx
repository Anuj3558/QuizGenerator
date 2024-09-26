export function Button({ variant = "default", className, children, ...props }) {
    const baseStyles = "py-2 px-4 rounded transition duration-300";
    const variantStyles = {
      default: "bg-gray-800 text-white hover:bg-gray-700",
      ghost: "bg-transparent text-gray-300 hover:bg-gray-700",
    };
  
    return (
      <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  