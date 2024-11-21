import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="loader border-t-2 rounded-full border-Indigo bg-indigo-100 animate-spin
        aspect-square w-10 text-yellow-700"
      ></div>
    </div>
  );
};

export default Loader;
