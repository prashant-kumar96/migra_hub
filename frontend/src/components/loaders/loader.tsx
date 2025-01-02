import React from "react";

const Loader = ({text}) => {
  return (
    <div className="flex justify-center items-center h-full w-full ">

      <div
        className="w-10 h-10 border-4 border-t-Indigo border-gray-200 rounded-full animate-spin"
      ></div>

    </div>
  );
};

export default Loader;