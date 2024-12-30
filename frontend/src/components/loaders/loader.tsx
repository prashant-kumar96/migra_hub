import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div
        className="loader border-4 border-t-4 border-blue-800 border-opacity-50 rounded-full w-16 h-16 animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
