import React from "react";
import Card from "./Card";

const RightMenu = ({ newsList, setSelectedNews }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Related News</h2>
      <div className="grid grid-cols-1 gap-4">
        {newsList.map((news) => (
          <div onClick={() => setSelectedNews(news)} className="cursor-pointer">
            <Card key={news.id} news={news} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightMenu;
