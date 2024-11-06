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
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-base font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, validation)}
        className={`w-full px-3 py-2 border shadow-md border-gray-200 rounded-lg text-gray-800 ${
          toUpperCase ? "uppercase" : ""
        }`}
        placeholder={placeholder}
      />
      {errors && (
        <p className="text-red-500 text-xs font-bold mt-1">{errors.message}</p>
      )}
    </div>
  );
};

export default Input;
