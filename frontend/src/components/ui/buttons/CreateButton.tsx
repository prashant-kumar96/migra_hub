import Loader from "@/components/loaders/loader";
import React from "react";
// const Loader = () => {
//   return (
//     <div className="flex items-center justify-center space-x-2 animate-pulse">
//       <div className="w-2 h-2 bg-white rounded-full"></div>
//       <div className="w-2 h-2 bg-white rounded-full"></div>
//       <div className="w-2 h-2 bg-white rounded-full"></div>
//     </div>
//   );
// };

 
const CreateButton = ({ text, onClick, disabled, loading, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative flex items-center justify-center w-full px-6 py-3
        text-sm font-medium text-white
        bg-indigo-600 hover:bg-indigo-700
        rounded-md shadow-sm
        transition-all duration-200 ease-in-out
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? (
        <Loader className='h-full ' text='' size={6} />
      ) : (
        <span className="flex items-center space-x-2">
          {text}
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      )}
    </button>
  );
};

export default CreateButton;