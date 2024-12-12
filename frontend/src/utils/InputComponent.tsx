import React from "react";
interface props {
  label: string;
  type?: string;
  register: any;
  validation: any;
  placeholder?: string;
  errors: any;
  id: string;
  toUpperCase?: boolean;
  minDate?: any;
}
const Input: React.FC<props> = ({
  label,
  type = "text",
  register,
  validation,
  placeholder,
  errors,
  id,
  toUpperCase,
  minDate,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, validation)}
        className={`mt-2 p-3 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 ${
          toUpperCase ? "uppercase" : ""
        }`}
        placeholder={placeholder}
        min={minDate}
        autocomplete="off"
      />
      {errors && (
        <p className="text-red-500 text-xs font-bold mt-1">{errors.message}</p>
      )}
    </div>
  );
};

export default Input;
