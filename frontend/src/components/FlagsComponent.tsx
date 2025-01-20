import { countriesData } from "@/utils/CountriesData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import StepsModal from "./StepsModal";
import { FaPlaneDeparture } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";


const FlagsComponent = () => {
  const [showStepsModal, setShouldShowStepsModal] = useState(false);
  const [destinationCountry, setDestinationCountry] = useState([])
  const handleReadMore = () => {
    setShouldShowStepsModal(true);
  };

  useEffect(() => {
    filteredCountries()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4, // Adjusted slidesToShow for better visibility in row
    slidesToScroll: 1,
    draggable: true,
    responsive: [
      { breakpoint: 1090, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const router = useRouter();
  const handleCountryClick = (countryName, id) => {
    const formattedName = countryName.toLowerCase();
    router.push(`/countries/${formattedName}?id=${id}`);
  };

  function formatCountryName(countryName) {
    return countryName.replace(/-/g, " ");
  }

  console.log(':: countriesData', countriesData)

  const filteredCountries = () => {
    const filtered = countriesData.filter(
      (c) => c.name === "Canada" || c.name === "United-States" // Corrected "United-States"
    );
    setDestinationCountry(filtered); // Update the state
  };


  return (
    <>
      <div className="overflow-hidden">
        <h1 className="text-4xl mt-8 font-bold tracking-tight capitalize text-Indigo font-greycliff text-center">
          Travel to Your Dream Destination
        </h1>

        {/* Slider Container */}
        {/* <Slider {...settings} className="custom-slider"> */}
        <div className="flex flex-col sm:flex-row items-center justify-center">
          {destinationCountry?.map((country) => (
            // Wrapper div for spacing
            <div key={country.id} className="p-8 flex">
              <div
                onClick={() => handleCountryClick(country.name, country.id)}
                className="relative flex flex-col rounded-2xl bg-white bg-clip-border text-DarkGray shadow-lg shadow-Indigo/50 p-2.5">
                <div className="relative">
                  <Image
                    className="rounded-t-2xl"
                    src={`/assets/countryImgs/${country.name.replace(" ", "_")}.png`}
                    alt={country.name}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="p-4">
                  <button >
                    <h5 className="text-2xl font-medium  text-Indigo font-cedarville capitalize whitespace-nowrap">
                      {formatCountryName(country.name)}
                    </h5>
                  </button>

                  <div className="relative group">
                    <button
                      className="inline-flex items-center text-sm font-medium text-center rounded-lg"
                    >
                      <span>
                        <FaPlaneDeparture />
                      </span>
                      <span className="ml-2 text-[17px] tracking-wider text-Gray hover:text-Blue">
                        Apply Visa
                      </span>
                    </button>

                    {/* Tooltip */}
                    <span className="absolute bottom-full w-fit left-1/2 transform -translate-x-1/2 mb-2 hidden px-3 py-2 text-[13px] text-FloralWhite bg-Indigo tracking-wider whitespace-nowrap font-sans rounded-lg group-hover:block">
                      Apply visa for {country.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* </Slider> */}

        {showStepsModal && (
          <StepsModal setShouldStartjourneyShow={setShouldShowStepsModal} />
        )}
      </div>
    </>
  );
};

export default FlagsComponent;