import React from "react";

interface Props {
  label: string;
  type?: string;
  register: any;
  validation: any;
  placeholder?: string;
  errors: any;
  id: string;
  toUpperCase?: boolean;
  minDate?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  mini?: any;
  min?: string; // New min prop
  max?: string; // New max prop
}

const Input: React.FC<Props> = ({
  label,
  type = "text",
  register,
  validation,
  placeholder,
  errors,
  id,
  toUpperCase,
  minDate,
  onChange,
  readOnly = false,
  min,
  max,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-base font-sans font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, validation)}
        className={`w-full px-3 py-2 border shadow-lg rounded-lg text-gray-800 placeholder:italic placeholder:text-sm ${
          readOnly ? "bg-gray-200 opacity-50 cursor-not-allowed" : "border-gray-200"
        }`}
        placeholder={placeholder}
        mini={min}
        max={max} // Apply the max prop here
        min={minDate} // minDate will still apply
        autoComplete="off"
        onChange={onChange}
        readOnly={readOnly}
        defaultValue={minDate}
      />
      {errors && (
        <p className="text-red-500 text-sm font-sans tracking-wide font-normal mt-1">*{errors.message}</p>
      )}
    </div>
  );
};

export default Input;
