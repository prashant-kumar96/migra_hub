import React from "react";

const Button = ({ Icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-3 cursor-pointer text-FloralWhite font-semibold shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900`}
    >
      <Icon size={18} />
      <span className="text-[15px] font-thin text-FloralWhite uppercase tracking-wide">
        {text}
      </span>
    </button>
  );
};

export default Button;
