import React, { useRef, useState, useEffect } from "react";

interface Props {
  text: string;
  onChange: (value: boolean | undefined) => void;
  name: string;
  checked?: boolean;  // Optional and can be undefined
  textColor?: string;
  className?: string;
}

const ToggleButton: React.FC<Props> = ({ text, onChange, name, checked, textColor, className }) => {
  const [isActive, setIsActive] = useState<boolean | undefined>(checked); // Use local state
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Update local state when checked prop changes (for external control)
  useEffect(() => {
    setIsActive(checked);
  }, [checked]);

  const handleClick = () => {
    let newValue: boolean | undefined;

    if (isActive === undefined || isActive === false) {
      newValue = true;
    } else {
      newValue = undefined; // Toggle to undefined (no selection)
    }
      setIsActive(newValue);
      onChange(newValue);
    
  };


  return (
    <div className={`flex items-center bg-white p-4 rounded-xl ${className || ""}`}>
      <button
        ref={buttonRef}
        type="button" // Explicitly set type to "button"
        onClick={handleClick}
        className={`
          shrink-0 w-5 h-5 mt-0.5 border-2 border-gray-200 rounded-full
          text-Indigo focus:ring-Indigo disabled:opacity-50 disabled:pointer-events-none
          ${isActive === true ? 'bg-indigo-600 border-indigo-600' : 'bg-white'}
        `}
        aria-pressed={isActive === true ? "true" : "false"} // For accessibility
      >
          {isActive === true && (
              <span className="block w-2 h-2 rounded-full bg-white mx-auto"></span> // Inner dot for active state
          )}
      </button>
      <label
        // htmlFor removed - no longer needed
        className={`text-sm ms-2 font-semibold tracking-wide ${textColor || "text-Indigo"}`}
      >
        {text}
      </label>
    </div>
  );
};

export default ToggleButton;