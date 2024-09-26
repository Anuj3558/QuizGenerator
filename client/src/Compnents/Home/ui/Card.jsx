export function Card({ className, children }) {
    return (
      <div className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardHeader({ children }) {
    return <div className="bg-gray-900 p-4">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h3 className="text-xl font-bold">{children}</h3>;
  }
  