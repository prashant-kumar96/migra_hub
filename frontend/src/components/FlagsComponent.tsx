import { countriesData } from "@/utils/CountriesData";
import Image from "next/image";
import React, { useState } from "react";
import StepsModal from "./StepsModal";
import { FaPlaneDeparture } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useRouter} from "next/router";

const FlagsComponent = () => {
  const [showStepsModal, setShouldShowStepsModal] = useState(false);

  const handleReadMore = () => {
    setShouldShowStepsModal(true);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: true,
    responsive: [
      { breakpoint: 1090, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const router = useRouter();
  const handleCountryClick = (countryName,id) => {
    const formattedName = countryName.toLowerCase();
    router.push(`/countries/${formattedName}?id=${id}`);
  };

  function formatCountryName(countryName) {
    return countryName.replace(/-/g, " "); 
  }
  return (
    <>
      <div className="">
        <p className="text-4xl mt-8 font-semibold tracking-wider capitalize text-Indigo font-greycliff text-center">
          Traverse Dream Destination
        </p>

        {/* Slider Container */}
        <Slider {...settings} className="custom-slider">
          {countriesData.map((country, index) => (
            // Wrapper div for spacing
            <div key={index} className="px-2 py-12">
              <div className="relative flex flex-col rounded-xl gap-x-8 bg-white bg-clip-border text-DarkGray shadow-xl p-2">
                <div className="relative">
                  <Image
                    className="rounded-t-xl"
                    src={`/assets/countryImgs/${country.name}.png`}
                    // src={`/assets/countryImgs/${country.name}.${country.imageType === 'jpeg' ? 'jpeg' : 'png'}`} 
                    alt={country.name}
                    width={750}
                    height={300}
                  />
                </div>
                <div className="p-4">
                  <button   onClick={() => handleCountryClick(country.name, country.id)}>
                    <h5 className="text-2xl font-medium tracking-wider text-Indigo capitalize whitespace-nowrap">
                    {formatCountryName(country.name)}
                    </h5>
                  </button>

                  <div className="relative group">
                    <button
                      // onClick={handleReadMore}
                      className="inline-flex items-center text-sm font-medium text-center rounded-lg"
                    >
                      <span>
                        <FaPlaneDeparture />
                      </span>
                      <span className="ml-2 text-[17px] tracking-wider text-Gray hover:text-Blue">
                        apply visa
                      </span>
                    </button>

                    {/* Tooltip */}
                    <span className="absolute bottom-full w-fit left-1/2 transform -translate-x-1/2 mb-2 hidden px-3 py-2 text-[13px] text-FloralWhite bg-DarkGray tracking-wider whitespace-nowrap font-sans rounded-lg group-hover:block">
                      Apply visa for {country.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {showStepsModal && (
          <StepsModal setShouldStartjourneyShow={setShouldShowStepsModal} />
        )}
      </div>
    </>
  );
};

export default FlagsComponent;
