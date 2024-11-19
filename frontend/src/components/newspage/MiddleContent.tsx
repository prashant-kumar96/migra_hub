import React from "react";

const MiddleContent = ({ selectedNews }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{selectedNews.heading}</h1>
      <p className="text-gray-700 mb-4">{selectedNews.description}</p>
      <img
        src={selectedNews.image}
        alt="News"
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-600">{selectedNews.details}</p>
    </div>
  );
};

export default MiddleContent;
    