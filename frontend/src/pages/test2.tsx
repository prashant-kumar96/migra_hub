import React from "react";

const Card = () => {
  // Data array for the cards
  const cardData = [
    { date: "Today", month: "October 22", title: "Card 1", description: "This is the first card." },
    { date: "Tomorrow", month: "October 23", title: "Card 2", description: "This is the second card." },
    { date: "Yesterday", month: "October 21", title: "Card 3", description: "This is the third card." },
    { date: "Friday", month: "October 20", title: "Card 4", description: "This is the fourth card." },
    { date: "Saturday", month: "October 19", title: "Card 5", description: "This is the fifth card." },
    { date: "Sunday", month: "October 18", title: "Card 6", description: "This is the sixth card." },
  ];

  return (
    <div className="m-10 items-center flex flex-col md:flex-row md:flex-wrap justify-center gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="w-64 mb-10 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center p-6"
        >
          <div className="text-md font-bold flex flex-col text-gray-900">
            <span className="uppercase">{card.date}</span>
            <span className="font-normal text-gray-700 text-sm">{card.month}</span>
          </div>
          <div className="w-32 h-32 flex items-center justify-center">
            <svg
              width="95"
              height="72"
              viewBox="0 0 95 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="47.5" cy="36" r="35" fill="#F8C442" />
            </svg>
          </div>
          <h2 className="mt-4 font-bold text-gray-900">{card.title}</h2>
          <p className="text-sm text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
