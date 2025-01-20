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
        className={`w-full px-3 py-2 border shadow-lg border-gray-200 rounded-lg text-gray-800 placeholder:italic placeholder:text-sm  ${
          toUpperCase ? "" : ""
        }`}
        placeholder={placeholder}
        min={minDate}
        autocomplete="off"
      />
      {errors && (
        <p className="text-red-500 text-sm font-sans tracking-wide font-normal mt-1">{errors.message}</p>
      )}
    </div>
  );
};

export default Input;
