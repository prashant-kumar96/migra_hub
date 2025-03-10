import React from "react";

interface Props {
  text: string;
  onChange: (checked: boolean) => void;
  name: string;
  checked: boolean;
  textColor?: string;
  className?: string;
}

const Radio: React.FC<Props> = ({ text, onChange, name, checked, textColor, className }) => {
  return (
    <div className={`flex items-center bg-white p-4 rounded-xl ${className || ""}`}>
      <input
        checked={checked == undefined ? false : checked}
        id={`custom-checkbox-${name}`}
        type="checkbox" // Changed from radio to checkbox
        name={name}
        className="shrink-0 w-5 h-5 mt-0.5 border-gray-200 rounded-md text-Indigo focus:ring-Indigo disabled:opacity-50 disabled:pointer-events-none"
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        htmlFor={`custom-checkbox-${name}`}
        className={`text-sm ms-2 font-semibold tracking-wide ${textColor || "text-Indigo"}`}
      >
        {text}
      </label>
    </div>
  );
};

export default Radio;
