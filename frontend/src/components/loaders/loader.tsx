import React from "react";

const Loader = ({text}) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative">
        <div 
          className="w-16 h-16 rounded-full border-4 border-indigo-100
          border-t-indigo-800 border-r-indigo-800 
          animate-spin [animation-duration:1.5s]"
        ></div>
        <span className="text-gray-700 text-lg">{text}</span>
      </div>
    </div>
  );
};

export default Loader;