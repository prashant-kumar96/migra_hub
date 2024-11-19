import React from "react";

const LeftMenu = ({ newsList, setSelectedNews }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">News Headlines</h2>
      <ul>
        {newsList.map((news) => (
          <li
            key={news.id}
            className="cursor-pointer mb-2 p-2 pl-8 py-4 bg-white hover:bg-gray-300 rounded font-bold"
            onClick={() => setSelectedNews(news)}
          >
            {news.heading}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftMenu;
