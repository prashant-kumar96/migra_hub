import React, { useRef } from "react";
import moment from "moment";

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
  mini?: any; // Consider renaming to minDateString or similar
  min?: string;
  max?: string;
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
  const inputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    if (inputRef.current && type === "date") {
      inputRef.current.click();
      if (
        typeof window !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        inputRef.current.focus();
        //For mobile iOS Safari
        inputRef.current.dispatchEvent(
          new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      }
    }
  };


  // Calculate the maximum date (20 years from now)
  const maxDate = moment().add(20, "years").format("YYYY-MM-DD");


  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-base font-sans font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        {...(register ? register(id, validation) : {})}
        className={`w-full px-3 py-2 border shadow-lg rounded-lg text-gray-800 placeholder:italic placeholder:text-sm ${
          readOnly
            ? "bg-gray-200 opacity-50 cursor-not-allowed"
            : "border-gray-200"
        } ${errors ? "border-red-500" : ""}`}
        placeholder={placeholder}
        min={min || minDate}
        max={max || maxDate} // Use max prop if provided, otherwise use calculated maxDate
        autoComplete="off"
        onChange={onChange}
        readOnly={readOnly}
        onClick={type === "date" ? openDatePicker : undefined}
      />
      {errors && (
        <p className="text-red-500 text-sm font-sans tracking-wide font-normal mt-1">
          *{errors.message}
        </p>
      )}
    </div>
  );
};

export default Input;


// Example usage (within your form):
// <Input
//   label="DOB"
//   type="date"
//   id="dob"
//   register={register}
//   minDate={moment().subtract(100, "years").format("YYYY-MM-DD")} // Example minDate
//   // max={moment().add(20, 'years').format('YYYY-MM-DD')} // No need if you use maxDate calculated inside the component
//   validation={{
//     required: "DOB is required",
//     validate: (value) => {