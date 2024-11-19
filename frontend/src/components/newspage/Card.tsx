import React from "react";

const Card = ({ news }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={news.image}
        alt="News"
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-bold">{news.heading}</h3>
    </div>
  );
};

export default Card;
