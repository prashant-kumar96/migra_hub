import SearchForm from "@/components/adminDashboard/serach";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import React, { useState } from "react";

const counterData = [
  {
    id: 1,
    title: "Users",
    message: "Number of users",
    count: 0,
  },
  {
    id: 2,
    title: "Case Managers",
    message: "Number of case managers",
    count: 0,
  },
  {
    id: 3,
    title: "Pending Applications",
    message: "Number of pending applications",
    count: 0,
  },
  {
    id: 4,
    title: "Filed Applications",
    message: "Number of processed applications",
    count: 0,
  },
];

const CounterCard = ({ id, title, message, count, incrementCount }) => {
  return (
    <>
      <div className="flex w-full sm:w-[45%] md:w-[22%] h-[85px] overflow-hidden bg-white shadow-lg rounded-xl relative mt-4">
        {" "}
        {/* Reduced mt-8 to mt-4 */}
        {/* SVG Bar */}
        <svg xmlns="http://www.w3.org/2000/svg" height="96" width="16">
          <defs>
            <linearGradient
              id={`gradient-${id}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#333366", stopOpacity: 4 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#2C415A", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path
            strokeLinecap="round"
            strokeWidth="2"
            stroke={`url(#gradient-${id})`}
            fill={`url(#gradient-${id})`}
            d="M 8 0 
             Q 4 4.8, 8 9.6 
             T 8 19.2 
             Q 4 24, 8 28.8 
             T 8 38.4 
             Q 4 43.2, 8 48 
             T 8 57.6 
             Q 4 62.4, 8 67.2 
             T 8 76.8 
             Q 4 81.6, 8 86.4 
             T 8 96 
             L 0 96 
             L 0 0 
             Z"
          ></path>
        </svg>
        {/* Text Content */}
        <div className="mx-2.5 overflow-hidden w-full">
          <p className="mt-1.5 text-xl font-bold text-[#333366] leading-8 mr-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </p>
          <p className="overflow-hidden italic leading-5 break-all text-sm tracking-wide text-LightGray max-h-10">
            {message}
          </p>
        </div>
        {/* Count Button */}
        <button
          className="w-16 cursor-pointer focus:outline-none"
          onClick={() => incrementCount(id)}
        >
          <span className="w-7 h-7 flex items-center justify-center text-Indigo text-lg font-bold">
            {count}
          </span>
        </button>
      </div>
    </>
  );
};

const CounterCards = () => {
  const [count, setCount] = useState(counterData);

  const incrementCount = (id) => {
    setCount((prevErrors) =>
      prevErrors.map((error) =>
        error.id === id ? { ...error, count: error.count + 1 } : error
      )
    );
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {" "}
        {/* Reduced gap-2 to gap-1 */}
        {count.map((error) => (
          <CounterCard
            key={error.id}
            id={error.id}
            title={error.title}
            message={error.message}
            count={error.count}
            incrementCount={incrementCount}
          />
        ))}
      </div>
    </>
  );
};

export default AfterLoginLayout(CounterCards);
