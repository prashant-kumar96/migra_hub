import React from "react";
import { countriesData } from "@/utils/CountriesData";
import { useRouter } from "next/router";

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
        <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-1.5 h-full">
            {selectedCountry.images.map((image, index) => (
              <div
                key={index}
                className={`col-span-1 sm:col-span-1 md:col-span-2 row-span-12 bg-stone-50 flex flex-col`}
              >
                <div
                
                  className="group relative flex flex-col overflow-hidden shadow shadow-2xl px-4 pb-4 pt-40 flex-grow"
                >
                  <img
                    src={image}
                    alt={selectedCountry.name}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                </div>
              </div>
            ))}
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
