import React from "react";
interface props {
  text: string;
  onChange: any;
  name: string;
  checked: boolean;
  textColor?: string
}
const Radio: React.FC<props> = ({ text, onChange, name, checked,textColor  }) => {
  return (
    <div className="flex items-center">
      <input
        checked={checked}
        id="default-radio-1"
        type="radio"
        value=""
        name={name}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={onChange}
      />
      <label
        htmlFor="default-radio-1"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-800"
      >
        {text}
      </label>
    </div>
  );
};

export default Radio;
