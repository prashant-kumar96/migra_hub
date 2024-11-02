import React from "react";

const reviews = [
  {
    name: "Daniella Doe",
    role: "Mobile dev",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum."
  },
  {
    name: "Jane Doe",
    role: "Marketing",
    img: "https://randomuser.me/api/portraits/women/14.jpg",
    review: "Lorem ipsum dolor laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum."
  },
  {
    name: "Yanick Doe",
    role: "Developer",
    img: "https://randomuser.me/api/portraits/women/18.jpg",
    review: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum."
  },
  {
    name: "Jane Doe",
    role: "Mobile dev",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    review: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum."
  },
  {
    name: "Andy Doe",
    role: "Manager",
    img: "https://randomuser.me/api/portraits/women/62.jpg",
    review: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum."
  },
  {
    name: "Yanndy Doe",
    role: "Mobile dev",
    img: "https://randomuser.me/api/portraits/women/19.jpg",
    review: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum."
  },
];

const Reviews = () => {
  return (
    <div className="text-gray-600 dark:text-gray-300 pt-10" id="reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-10 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-medium tracking-wider capitalize text-CGBlue  md:text-3xl">
          See what are customers are saying
          </h2>
        </div>

        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="aspect-auto p-6 rounded-3xl bg-white shadow-2xl shadow-gray-600/10"
            >
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full ring ring-2 ring-CGBlue p-1"
                  src={review.img}
                  alt="user avatar"
                  width="200"
                  height="200"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-CGBlue">
                    {review.name}
                  </h6>
                  <p className="text-sm text-LightGray">
                    {review.role}
                  </p>
                </div>
              </div>
              <p className="mt-8 text-justify text-Gray">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
