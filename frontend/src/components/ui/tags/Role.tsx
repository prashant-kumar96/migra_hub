import React from "react";

const Role = ({ text}) => {
  return (
    <button
      type="button"
      className={`px-3 py-1 rounded-lg font-medium bg-indigo-100 text-indigo-600`}
      disabled
    >
      {text}
    </button>
  );
};

export default Role;
