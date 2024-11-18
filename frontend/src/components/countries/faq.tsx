import React, { useState } from "react";
import { RiInformationFill } from "react-icons/ri";
import { TfiTarget } from "react-icons/tfi";
import { GiProcessor, GiTakeMyMoney, GiEntryDoor } from "react-icons/gi";
import { PiFootprintsFill } from "react-icons/pi";
import { TbHomeShare } from "react-icons/tb";
import { SiGitextensions } from "react-icons/si";

const FAQ = () => {
  // Data array for buttons
  const buttons = [
    {
      id: 1,
      title: "general information",
      Icon: RiInformationFill,
      extraClasses: "rounded",
      content: "Here is the general information about the topic...",
      questions: [
        { q: "What is general information?", a: "General information provides an overview of the topic." },
        { q: "Why is this important?", a: "It helps users get started." },
      ],
    },
    {
      id: 2,
      title: "eligibility & requirements",
      Icon: TfiTarget,
      extraClasses: "rounded",
      content: "Eligibility criteria and requirements details.",
      questions: [
        { q: "Who is eligible?", a: "Those who meet the criteria specified in the guidelines." },
        { q: "What documents are needed?", a: "Identity proof, address proof, etc." },
      ],
    },
    {
      id: 3,
      title: "application process",
      Icon: GiProcessor,
      extraClasses: "rounded",
      content: "Step-by-step application process explained.",
      questions: [
        { q: "How to apply?", a: "Follow the steps outlined in the application guide." },
        { q: "What is the timeline?", a: "Usually takes 2-3 weeks for processing." },
      ],
    },
    {
      id: 4,
      title: "status tracking",
      Icon: PiFootprintsFill,
      extraClasses: "rounded",
      content: "Track the status of your application here.",
      questions: [
        { q: "How to track my status?", a: "Use the online tracker available on the portal." },
        { q: "What if there's a delay?", a: "Contact support for further assistance." },
      ],
    },
    {
      id: 5,
      title: "refunds",
      Icon: GiTakeMyMoney,
      extraClasses: "rounded",
      content: "Refund policy and how to request refunds.",
      questions: [
        { q: "Am I eligible for a refund?", a: "Eligibility depends on the policy terms." },
        { q: "How long does it take?", a: "Refunds are processed within 7-10 business days." },
      ],
    },
    {
      id: 6,
      title: "rejections & reapplications",
      Icon: TbHomeShare,
      extraClasses: "rounded",
      content: "Details about rejections and the reapplication process.",
      questions: [
        { q: "Why was my application rejected?", a: "Check the rejection reason in the email notification." },
        { q: "Can I reapply?", a: "Yes, after addressing the rejection reasons." },
      ],
    },
    {
      id: 7,
      title: "entry & exit regulations",
      Icon: GiEntryDoor,
      extraClasses: "rounded",
      content: "Learn about entry and exit regulations.",
      questions: [
        { q: "What are the entry regulations?", a: "Specific rules for entering the country/region." },
        { q: "What about exit rules?", a: "Exit procedures vary depending on the location." },
      ],
    },
    {
        id: 8,
        title: "visa extension & overstays",
        Icon: SiGitextensions ,
        extraClasses: "rounded",
        content: "Learn about entry and exit regulations.",
        questions: [
          { q: "What are the entry regulations?", a: "Specific rules for entering the country/region." },
          { q: "What about exit rules?", a: "Exit procedures vary depending on the location." },
        ],
      },
  ];

  const [activeButton, setActiveButton] = useState(1);
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const activeContent = buttons.find((btn) => btn.id === activeButton);

  return (
    <div className="flex flex-col items-center mx-auto mt-6">
      {/* Buttons */}
      <div className="grid grid-cols-4  gap-4 justify-start mb-4">
        {buttons.map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => setActiveButton(button.id)}
            className={`inline-flex items-center px-4 py-2 text-lg text-center  font-medium text-Indigo bg-transparent border border-Indigo ${button.extraClasses} hover:text-FloralWhite hover:bg-Indigo focus:z-10 focus:ring-2 focus:ring-Indigo focus:bg-Indigo focus:text-FloralWhite focus:border-FloralWhite ${
              activeButton === button.id ? "font-bold" : ""
            }`}
          >
            <button.Icon className="w-6 h-6 me-2" />
            <span className="whitespace-nowrap text-md capitalize tracking-wider">
              {button.title}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 border border-LightGray bg-white rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl text-Indigo capitalize font-bold mb-4">
          {activeContent.title}
        </h2>
        <p className="text-Gray text-md mb-6">{activeContent.content}</p>

        {/* Accordion */}
        <div id="accordion-collapse" data-accordion="collapse">
          {activeContent.questions.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left text-lg text-Indigo font-medium"
                onClick={() => toggleQuestion(index)}
              >
                {item.q}
              </button>
              {openQuestions[index] && (
                <p className="pl-4 text-Gray text-md">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
