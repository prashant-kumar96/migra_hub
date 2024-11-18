import React from "react";
import { countriesData } from "@/utils/CountriesData";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const CountriesGrid = () => {
  const router = useRouter();
  const { country } = router.query;

  // Find the selected country based on the query parameter
  const selectedCountry = countriesData.find(
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );

  return (
    <section>
      {selectedCountry ? (
        <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
          {/* Swiper carousel for smaller screens */}
          <div className="block md:hidden">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {selectedCountry.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`relative overflow-hidden shadow shadow-2xl h-64 flex items-center justify-center rounded-3xl `}
                  >
                    <img
                      src={image}
                      alt={`${selectedCountry.name} - ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 rounded-3xl transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-transaprent"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Grid layout for larger screens */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-1.5 h-full">
            {selectedCountry.images.map((image, index) => {
              const layoutClasses = [
                "col-span-2 sm:col-span-1 md:col-span-2 row-span-12 ",
                "col-span-2 sm:col-span-1 md:col-span-2 row-span-6",
                "col-span-1 row-span-12",
                "col-span-1 row-span-6",
                "col-span-2 sm:col-span-1 md:col-span-1 row-span-6",
              ];
              const bgClasses = [
                "bg-transparent",
                "bg-transparent",
                "bg-transparent",
                "bg-transparent",
                "bg-transparent",
              ];

              return (
                <div
                  key={index}
                  className={`${layoutClasses[index % layoutClasses.length]} 
                  ${
                    bgClasses[index % bgClasses.length]
                  } 
                  h-full md:h-full flex flex-col`}
                >
                  <div
                    className={`group relative flex flex-col overflow-hidden shadow shadow-2xl px-4 pb-4 pt-40 flex-grow`}
                  >
                    <img
                      src={image}
                      alt={`${selectedCountry.name} - ${index + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out ${index === 0 ? "rounded-l-3xl" : ""} ${index === 2 ? "rounded-r-3xl" : ""}`}
                    />
                    <div className="absolute inset-0 bg-transparent"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-center text-xl font-bold">
          No country found! Please select a valid country.
        </p>
      )}
    </section>
  );
};

export default CountriesGrid;
