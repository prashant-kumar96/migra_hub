import React, { useState } from "react";
import { GiEgyptianProfile } from "react-icons/gi";
import { VscPreview } from "react-icons/vsc";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { BsBalloonHeartFill } from "react-icons/bs";

const Stepper = () => {
  // Array of step objects with href, completion status, and larger icon sizes
  const steps = [
    {
      id: 1,
      title: "Step 1",
      description: "Complete Process",
      icon: <GiEgyptianProfile size={30} />,
      href: "/step-1",
      isCompleted: true,
    },
    {
      id: 2,
      title: "Step 2",
      description: "Review and Process",
      icon: <VscPreview size={30} />,
      href: "/step-2",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Step 3",
      description: "Visa Applied",
      icon: <MdOutlineAirplaneTicket size={30} />,
      href: "/step-3",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Step 4",
      description: "Completed",
      icon: <BsBalloonHeartFill size={30} />,
      href: "/step-4",
      isCompleted: false,
    },
  ];

  // State to manage current step index
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle step click
  const handleStepClick = (step) => {
    if (step.isCompleted || step.id === currentStep) {
      setCurrentStep(step.id);
      window.location.href = step.href;
    } else {
      alert("Complete the previous steps first!");
    }
  };

  return (
    <div className="w-full px-24 py-4">
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
        <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-900 transition-all duration-500"></div>

        {/* Map through steps array */}
        {steps.map((step, index) => (
          <div
            key={step.id}
            onClick={() => handleStepClick(step)}
            className={`relative z-10 grid w-12 h-12 font-bold text-white transition-all duration-300 rounded-full place-items-center cursor-pointer ${
              step.isCompleted || step.id === currentStep
                ? "bg-gray-900"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {step.icon}
            <div className="absolute -bottom-[4.5rem] w-max text-center">
              <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-gray-700">
                {step.title}
              </h6>
              <p className="block font-sans text-base font-normal leading-relaxed text-gray-700">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-32">
        <button
          onClick={() =>
            setCurrentStep((prev) => Math.max(prev - 1, 1))
          }
          className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-85 active:opacity-85 disabled:opacity-50"
          type="button"
          disabled={currentStep === 1}
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (steps[currentStep - 1].isCompleted) {
              setCurrentStep((prev) => Math.min(prev + 1, steps.length));
            } else {
              alert("Complete the current step to proceed!");
            }
          }}
          className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-85 active:opacity-85 disabled:opacity-50"
          type="button"
          disabled={currentStep === steps.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
