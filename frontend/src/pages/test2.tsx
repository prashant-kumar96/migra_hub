import React from "react";
import { FaBook, FaSyncAlt, FaLightbulb } from "react-icons/fa";

const articlesData = [
  {
    id: 1,
    title: "How to use Atlas",
    description: "How-to guides so you can get started with Atlas",
    author: "By Mark and 2 others",
    articlesCount: "30 articles",
    icon: <FaBook className="text-yellow-500 text-lg" />,
  },
  {
    id: 2,
    title: "The Loop",
    description:
      "The Loop is a framework for healthy and effective communication across teams.",
    author: "By Mark",
    articlesCount: "5 articles",
    icon: <FaSyncAlt className="text-blue-500 text-lg" />,
  },
  {
    id: 3,
    title: "Best practices, inspiration, and ideas",
    description:
      "Get ideas, tips, and best practices for using Atlas, and understand how we work with other Atlassian tools.",
    author: "By Sherif and 1 other",
    articlesCount: "9 articles",
    icon: <FaLightbulb className="text-yellow-300 text-lg" />,
  },
];

const AtlasArticles = () => {
  return (
    <div className="bg-blue-500 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Advice and answers from the Atlas Team</h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search for articles..."
              className="w-full max-w-lg px-4 py-2 rounded-full text-black"
            />
          </div>
        </div>

        <div className="bg-white text-black rounded-lg shadow-md p-6 space-y-4">
          {articlesData.map((article) => (
            <div
              key={article.id}
              className="flex items-center p-4 border rounded-lg shadow-sm"
            >
              <div className="mr-4">{article.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-sm text-gray-600">{article.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {article.author} • {article.articlesCount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AtlasArticles;
