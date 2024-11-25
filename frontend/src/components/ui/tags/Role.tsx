import React from "react";

const Role = ({ text, bgClass, textColor}) => {
  return (
    <button
      type="button"
      className={`px-2 tracking-wider whitespace-nowrap py-1 rounded-xl font-medium ${bgClass} ${textColor}`}
      disabled
    >
      {text}
    </button>
  );
};

export default Role;
