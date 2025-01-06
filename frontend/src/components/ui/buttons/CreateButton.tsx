import React from "react";

const CreateButton = ({  text, onClick, disabled, className}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-fit whitespace-nowrap gap-3 cursor-pointer text-FloralWhite font-semibold shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] px-7 py-2 rounded-2xl border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900 ${className}`}
    >
      {/* <Icon size={18} /> */}
      <span className="text-[14.5px] font-normal text-FloralWhite uppercase tracking-wider">
        {text}
      </span>
    </button>
  );
};

export default CreateButton;
