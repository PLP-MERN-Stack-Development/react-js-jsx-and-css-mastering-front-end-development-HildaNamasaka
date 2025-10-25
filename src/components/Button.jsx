// src/components/Button.jsx
export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  className = '' 
}) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-500 dark:hover:bg-gray-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium 
        transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:shadow-lg transform hover:-translate-y-0.5
        ${variants[variant]} 
        ${className}
      `}
    >
      {children}
    </button>
  );
}