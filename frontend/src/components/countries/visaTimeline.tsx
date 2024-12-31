import React, { useState, useEffect } from "react";
import { countriesData } from "@/utils/CountriesData";
import { useRouter } from "next/router";
const VisaTimeline = () => {
  const [activeStep, setActiveStep] = useState(0); // Track the active step
  const timelineData = [
    {
      title: "Step - 01",
      action: "Apply on MigraHub",
      description:
        "Submit your documents on MigraHub — only pay government fee.",
      iconColor: "fill-emerald-500",
    },
    {
      title: "Step - 02",
      action: "Your documents are verified",
      description:
        "MigraHub verifies your documents and submits to Immigration",
      iconColor: "fill-slate-300",
    },
    {
      title: "Step - 03",
      action: "Your visa gets processed",
      description:
        "We work with Immigration to ensure you get your visa on time.",
      iconColor: "fill-slate-300",
      subSteps: [
        "Application has been sent to the immigration supervisor",
        "Application has been sent to internal intelligence",
      ],
    },
    {
      title: "Step - 04",
      action: "Get your visa",
      iconColor: "fill-red-500",
      subSteps: [
        "Your visa is approved on time",
        "Your visa is approved even one second after the promised time",
        "Your visa is rejected",
      ],
      tags: ["pay on time fee", "on time fee waived", "visa fee refunded"],
    },
  ];

  const router = useRouter();
  const { country } = router.query;
  const selectedCountry = countriesData.find(
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );

  useEffect(() => {
    const handleScroll = () => {
      const timelineSections = document.querySelectorAll(".timeline-step");
      let stepIndex = -1;

      timelineSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          stepIndex = index;
        }
      });

      if (stepIndex !== -1 && stepIndex !== activeStep) {
        setActiveStep(stepIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeStep]);

  return (
    <section className="py-3 px-2 mx-auto max-w-screen-xl sm:py-6 lg:px-6 ">
      {/* <div className="py-10 mx-auto max-w-screen-xl"> */}
        <div className="flex flex-col justify-start divide-y divide-red-200 [&>*]:py-12 md:[&>*]:py-12">
          <div className="w-full max-w-3xl">
            <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent md:after:block sm:before:block before:hidden">
              <h2 className="text-3xl text-Indigo font-bold mb-1 capitalize">
                {selectedCountry
                  ? `How ${selectedCountry.name.replace(
                      /-/g,
                      " "
                    )} Visa process works`
                  : "how Visa process works"}
              </h2>
              <div className="border-b-2 border-CGBlue w-24 mb-6 "></div>
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-step relative ${
                    activeStep >= index ? "opacity-100" : "opacity-50"
                  }`}
                  style={{
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4 mb-3">
                    <div className="flex items-center space-x-4 md:space-x-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow">
                        <svg
                          className={item.iconColor}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                        >
                          <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="tracking-wide mt-2 md:mt-0">
                      <span className="block text-[19px] text-indigo-200 font-bold tracking-wide">
                        {item.title}
                      </span>
                      <span className="text-xl font-bold text-DarkGray tracking-wide font-greycliff">
                        {item.action}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 tracking-wider text-lg bg-white border border-gray-200 rounded-3xl text-Gray shadow ml-0 md:ml-14">
                    {item.description}
                    {item.subSteps && item.tags && (
                      <div className="mt-4 space-y-4">
                        {item.subSteps.map((subStep, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
                          >
                            <p className="text-md text-Gray flex-wrap">
                              {subStep}
                            </p>
                            <span
                              className={`text-sm font-medium px-4 py-1 rounded ${
                                subIndex === 0
                                  ? "bg-lime-100 text-lime-600"
                                  : subIndex === 1
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              <span className="whitespace-nowrap">{item.tags[subIndex]}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
};

export default VisaTimeline;
