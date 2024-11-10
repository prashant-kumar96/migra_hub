import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TravelSection = () => {
  const settings = {
    slidesToShow: 1,
    dots: false,
    slidesToScroll: 1,
    autoplay: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const travelData = [
    {
      id: "01",
      bgColor: "bg-blue-400",
      title: "Find trips that fit a flexible lifestyle",
      description:
        "Stacks is a production-ready library of stackable content blocks built in React Native",
    },
    {
      id: "02",
      bgColor: "bg-indigo-400",
      title: "Travel with more confidence",
      description:
        "Stacks is a production-ready library of stackable content blocks built in React Native",
    },
    {
      id: "03",
      bgColor: "bg-green-400",
      title: "See what's really included",
      description:
        "Stacks is a production-ready library of stackable content blocks built in React Native",
    },
    {
      id: "04",
      bgColor: "bg-rose-400",
      title: "See what's really included",
      description:
        "Stacks is a production-ready library of stackable content blocks built in React Native",
    },
  ];
  return (
    <section className="min-h-screen max-w-[75rem] mx-auto py-24 px-10">
      <h1 className="text-4xl md:text-5xl font-semibold text-center">
        Air, sleep, dream
      </h1>
      <p className="text-lg md:text-2xl text-gray-600 text-center mt-4">
        Find trips that fit a flexible lifestyle
      </p>

      <div className="mt-20 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-7 flex flex-col items-start justify-center gap-y-10 lg:max-w-[25rem] mx-5 mt-10 lg:mx-0 lg:mt-0">
          {travelData.map((item, index) => (
            <div key={index}>
              <span
                className={`${item.bgColor} inline-block text-white rounded-full px-3.5 py-0.5 text-sm tracking-wide`}
              >
                {item.id}
              </span>
              <h2 className="text-2xl font-semibold my-4">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
          <a
            href="#"
            className="inline-block bg-blue-600 rounded-full text-white py-3 px-6 tracking-wide hover:shadow-lg"
          >
            Start your search
          </a>
        </div>
        <div className="relative col-span-12 order-first lg:order-last lg:col-span-5 rounded-3xl">
          <Slider {...settings} className="img-carousel custom-slick">
            <div>
              <img
                src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                className="w-full object-cover rounded-3xl max-h-[20vh] min-h-[10.625rem] lg:max-h-[80vh] lg:min-h-[43.125rem]"
                alt="Travel destination"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=383&q=80"
                className="w-full object-cover rounded-3xl max-h-[20vh] min-h-[10.625rem] lg:max-h-[80vh] lg:min-h-[43.125rem]"
                alt="Travel destination"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                className="w-full object-cover rounded-3xl max-h-[20vh] min-h-[10.625rem] lg:max-h-[80vh] lg:min-h-[43.125rem]"
                alt="Travel destination"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80"
                className="w-full object-cover rounded-3xl max-h-[20vh] min-h-[10.625rem] lg:max-h-[80vh] lg:min-h-[43.125rem]"
                alt="Travel destination"
              />
            </div>
          </Slider>

          <div className="hidden lg:flex z-10 absolute top-72 -left-16 bg-white rounded-full items-center py-3 pl-3 pr-16 shadow-xl">
            <img
              src="https://randomuser.me/api/portraits/men/22.jpg"
              alt="Antone Heller"
              className="mr-3.5 w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="capitalize">Antone Heller</h3>
              <span className="text-xs font-semibold mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-1 w-3.5 h-3.5 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                4.8
              </span>
            </div>
          </div>

        
          <style jsx>{`
            .slick-slider {
              @apply mb-0;
            }
            .slick-slide {
              @apply m-[3.5px];
            }
            .slick-prev {
              @apply left-[75%] top-[38px] z-10;
            }
            .slick-next {
              @apply right-[7%] top-[38px] z-10;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
