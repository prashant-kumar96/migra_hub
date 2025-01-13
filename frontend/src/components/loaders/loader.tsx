import React from "react";

const Loader = ({text,size=10}) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full ">

      <div
        className={`w-${size} h-${size} border-4 border-t-Indigo border-gray-200 rounded-full animate-spin`}
      ></div>
      <p className="text-gray-500">{text}</p>

    </div>
  );
};

export default Loader;