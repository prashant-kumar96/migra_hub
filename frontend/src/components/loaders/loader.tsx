import React from "react";

const Loader = ({text}) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full ">

      <div
        className="w-10 h-10 border-4 border-t-Indigo border-gray-200 rounded-full animate-spin"
      ></div>
      <p className="text-gray-500">{text}</p>

    </div>
  );
};

export default Loader;