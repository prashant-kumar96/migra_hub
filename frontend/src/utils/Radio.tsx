import React from "react";

interface Props {
  text: string;
  onChange: any;
  name: string;
  checked: boolean;
  textColor?: string;
  className?: string; // Optional className prop
}

const Radio: React.FC<Props> = ({ text, onChange, name, checked, textColor, className }) => {
  return (
    <div className={`flex items-center bg-white p-4 rounded-xl ${className || ""}`}>
      <input
        checked={checked}
        id="default-radio-1"
        type="radio"
        value=""
        name={name}
        className="shrink-0 w-5 h-5 mt-0.5 border-gray-200 rounded-full text-Indigo focus:ring-Indigo disabled:opacity-50 disabled:pointer-events-none"
        onChange={onChange}
      />
      <label
        htmlFor="default-radio-1"
        className={`text-sm ms-2 font-semibold tracking-wide ${textColor || "text-Indigo"}`}
      >
        {text}
      </label>
    </div>
  );
};

export default Radio;
