// Update the Checkbox component to include an onChange handler
import React from "react";

interface props {
  text: string;
  textColor: string;
  checked: boolean;
  onChange?: (checked: boolean) => void; // Add optional onChange handler
}

const Checkbox: React.FC<props> = ({ text, textColor, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        checked={checked}
        id="checked-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
      />
      <label
        htmlFor="checked-checkbox"
        className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-${textColor}`}
      >
        {text}
      </label>
    </div>
  );
};

export default Checkbox;