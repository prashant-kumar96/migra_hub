import VisaRequirements from "@/components/countries/visaRequirements";
import React from "react";

const DrinksSection = () => {
  const data = [
    {
      title: "Wines",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bg: "bg-gray-50",
      span: "col-span-2 sm:col-span-1 md:col-span-2 row-span-12",
      rounded: "rounded-l-3xl",
    },
    {
      // title: "Gin",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-boats-parked-near-coal-harbour-vancouver_181624-42637.jpg?t=st=1731407632~exp=1731411232~hmac=f7f05211c1b134867cde8e5a990e41833397c02ea23b884f6cf1bc970b58f2c3&w=1060",
      bg: "bg-stone-50",
      span: "col-span-2 sm:col-span-1 md:col-span-2 row-span-6",
      
    },
    {
      // title: "Whiskey",
      image:
        "https://img.freepik.com/free-photo/ottawa-parliament-hill-building_649448-3712.jpg?t=st=1731407748~exp=1731411348~hmac=85a680ebcca1c81d857c842cfafd4e0e12bc18406433c579a2ba1d32a074bd3e&w=360",
      bg: "bg-stone-50",
      span: "col-span-1 row-span-12",
      rounded: "rounded-r-3xl",
    },
    {
      // title: "Vodka",
      image:
        "https://img.freepik.com/free-photo/toronto-skyline-from-park_649448-3488.jpg?t=st=1731407672~exp=1731411272~hmac=5951f24cec46f2701409d781707480abcfba41c5847094e5a38c1c49329aecdf&w=1060",
      bg: "bg-stone-50",
      span: "col-span-1 row-span-6",
    },
    {
      // title: "Brandy",
      image:
        "https://img.freepik.com/free-photo/vancouver-harbor-view-with-urban-apartment-buildings-bay-boat-canada_649448-2638.jpg?t=st=1731407847~exp=1731411447~hmac=938d15ed25792c046aa7a41884efed7d787d328e6693fdbc478777c3022ba7c1&w=1380",
      bg: "bg-sky-50",
      span: "col-span-2 sm:col-span-1 md:col-span-1 row-span-6",
    },
  ];

  return (
    <section >
      <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-1.5 h-full">
          {data.map((item, index) => (
            <div
              key={index}
              className={`${item.span} ${item.bg} h-full md:h-full flex flex-col`}
            >
              <a
                href="#"
                className={`group relative flex flex-col overflow-hidden ${item.rounded} shadow shadow-2xl px-4 pb-4 pt-40 flex-grow`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-3xl font-extrabold tracking-wide text-white absolute left-0 bottom-0 p-4 xs:text-xl md:text-3xl">
                  {item.title}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
      <VisaRequirements/>
    </section>
  );
};

export default DrinksSection;
