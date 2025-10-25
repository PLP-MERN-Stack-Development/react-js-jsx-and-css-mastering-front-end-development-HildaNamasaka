// src/components/Card.jsx
export default function Card({ 
  title, 
  children, 
  className = '',
  titleClassName = '' 
}) {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-lg shadow-md hover:shadow-xl 
      transition-shadow duration-300 
      p-6 
      ${className}
    `}>
      {title && (
        <h3 className={`
          text-xl font-bold mb-4 
          text-gray-900 dark:text-white
          ${titleClassName}
        `}>
          {title}
        </h3>
      )}
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}