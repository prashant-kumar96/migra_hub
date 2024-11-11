import { countriesData } from "@/utils/flagsComponent";
import Image from "next/image";
import React, { useState } from "react";
import StepsModal from "./StepsModal";
import { FaPlaneDeparture } from "react-icons/fa6";

const FlagsComponent = () => {
  const [showStepsModal, setShouldShowStepsModal] = useState(false);

  const handleReadMore = () => {
    setShouldShowStepsModal(true);
  };
  return (
    <>
      <div className="bg-FloralWhite">
        <p className="text-4xl mt-8  font-semibold tracking-wider capitalize text-Indigo mb-8 font-greycliff text-center  ">
          {" "}
          Traverse Dream Destination
          {/* Traverse To Your Dream Destination */}
        </p>
       
        <div className="flex  flex-wrap gap-6 sm:justify-center md:justify-center ">
          {countriesData.map((country, index) => (
            <div
              key={index}
              className="relative flex w-[350px] flex-col rounded-xl bg-white bg-clip-border text-DarkGray shadow-xl p-2"
            >
              <div className="relative">
                <Image
                  className="rounded-t-xl"
                  src={`/assets/countryImgs/${country.name}.png`}
                  alt={country.name}
                  width={750}
                  height={300}
                />
              </div>
              <div className="p-4">
                <a href="#">
                  <h5 className="text-2xl font-medium tracking-wider text-Indigo">
                    {country.name}
                  </h5>
                </a>

                <div className="relative group">
                  <button
                    onClick={handleReadMore}
                    className="inline-flex items-center text-sm font-medium text-center text- rounded-lg"
                  >
                    <span>
                      <FaPlaneDeparture />
                    </span>
                    <span className="ml-2 text-[17px] tracking-wider text-Gray hover:text-Blue">
                      apply visa
                    </span>
                  </button>

                  {/* Tooltip */}
                  <span className="absolute bottom-full w-fit left-1/2 transform -translate-x-1/2 mb-2 hidden px-2 py-1 text-[12px] text-white bg-DarkGray tracking-wide font-sans rounded-lg group-hover:block">
                    Apply visa for {country.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {showStepsModal && (
            <StepsModal setShouldStartjourneyShow={setShouldShowStepsModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default FlagsComponent;
