import React from "react";

const VisaRejectionReasons = () => {
  const reasons = [
    {
      title: "Expired Passport",
      description:
        "Applying with a passport that has expired or expires within 6 months",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-Gray"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5M16.5 12A4.5 4.5 0 1 1 12 7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Insufficient Funds",
      description:
        "Failing to demonstrate enough financial resources to support your stay.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-Gray"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Criminal Record",
      description:
        "Having a criminal history that disqualifies you from obtaining a visa.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-Gray"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h3m-1.5 12V9m4.5 8.25H7.5M12 2.25a9.75 9.75 0 1 1 0 19.5 9.75 9.75 0 0 1 0-19.5Z"
          />
        </svg>
      ),
    },
    {
      title: "Previous Visa Violations",
      description:
        "Having overstayed or violated the terms of a previous visa.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-Gray"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 3h.008M9.6 2.399A8.993 8.993 0 0 1 21 12a8.993 8.993 0 0 1-8.4 9.601M6.996 21.048A9 9 0 0 1 12 2.4m0 17.598a9 9 0 0 1-5.004-1.35M21 12a8.993 8.993 0 0 0-8.4-9.601"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Australia Visa Rejection Reasons</h2>
      <p className="text-lg text-Gray mb-6">
        Factors that can get your visa rejected
      </p>
      <div className="space-y-6">
        {reasons.map((reason, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div>{reason.icon}</div>
            <div>
              <h3 className="font-semibold text-lg text-DarkGray">
                {reason.title}
              </h3>
              <p className="text-sm text-Gray">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisaRejectionReasons;
