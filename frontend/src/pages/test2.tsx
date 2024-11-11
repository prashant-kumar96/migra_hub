import React, { useState } from "react";

const testimonialList = [
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "— David H.",
      review: "Trusted and Thorough Service!",
      content:
        "I’m grateful to Migrahub for making my migration dreams come true. Their attention to detail and prompt communication made me feel confident every step of the way. I’ll always recommend them to friends and family!",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "— Sara K.",
      review: "Effortless Experience with Experts!",
      content:
        "Applying for a visa felt overwhelming, but Migrahub handled it all with ease and professionalism. They knew exactly what was needed and helped me get approved without any hassle. Highly recommended!",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "— Anna R",
      review: "Smooth and Stress-Free!",
      content:
        "Migrahub made the entire visa process a breeze! From the initial consultation to receiving my visa, their team guided me every step of the way. I’m now working my dream job overseas, thanks to Migrahub!",
    },
  ],
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "— Samuel L.",
      review: "Professional and Reliable Service!",
      content:
        "I was nervous about applying for my student visa, but Migrahub’s knowledgeable consultants put me at ease. They handled all the paperwork and kept me updated throughout the process. I couldn't have done it without them!",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "— Priya M",
      review: "Highly Recommend for Visa Success!",
      content:
        "Migrahub is truly the best in the business. They understood my situation and tailored a solution that worked for me. The visa process was quick and easy, and I’m now happily settled in Canada!",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "— James T.",
      review: "Exceptional Guidance and Support!",
      content:
        "Migrahub’s team went above and beyond to ensure my visa application was flawless. They were available for every question and detail, and I received my visa sooner than expected. Thank you, Migrahub!",
    },
  ],
];

function ShapeOne() {
  return (
    <svg
      className="absolute bottom-0 left-0 -z-[1]"
      width="404"
      height="572"
      viewBox="0 0 404 572"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="118"
        cy="286"
        r="265.5"
        stroke="#4175DF"
        strokeOpacity="0.2"
        strokeWidth="41"
      />
    </svg>
  );
}

function ShapeTwo() {
  return (
    <svg
      className="absolute top-0 right-0 -z-[1]"
      width="269"
      height="479"
      viewBox="0 0 269 479"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="239.5"
        cy="239.5"
        r="239.5"
        fill="#4175DF"
        fillOpacity="0.25"
      />
    </svg>
  );
}

const Testimonial23 = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  return (
    <section className="ezy__testimonial23 light py-14 md:py-24 bg-FloralWhite  text-zinc-900 relative z-[1]">
      <ShapeOne />
      <ShapeTwo />

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 gap-6 items-center justify-between mb-6 md:mb-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <h2 className="text-[38px] tracking-wide font-bold font-greycliff text-Indigo leading-normal">
              See what our customers are saying .
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-[1.7] opacity-80 text-justify font-greycliff">
              These testimonials highlight Migrahub’s expertise, reliability,
              and customer satisfaction in the visa process. Each story reflects
              the company’s commitment to providing a smooth, stress-free
              experience, personalized guidance, and efficient service that
              leads to successful outcomes. 
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-3 gap-6">
            {testimonialList[index].map((testimonial, i) => (
              <div className="col-span-3 lg:col-span-1" key={i}>
                <div className="bg-white shadow-2xl h-full p-4 rounded-xl  xl:p-10">
                  <div className="flex items-center mb-6">
                    <div className="mr-3">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="max-w-full h-auto ring-Indigo ring-2 p-1 rounded-full border"
                        width="72"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl text-Indigo tracking-wider font-medium">
                        {testimonial.name}
                      </h4>
                      <p className="text-base italic font-greycliff text-LightGray tracking-wider mb-2">{testimonial.review}</p>
                    </div>
                  </div>
                  <p className="opacity-75 font-greycliff text-justify mb-2">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 m-0 mt-12">
            {testimonialList.map((item, i) => (
              <button
                className={`w-2 h-2 rounded-full ${
                  index === i
                    ? "scale-125 bg-blue-600"
                    : " bg-gray-400 dark:bg-slate-800"
                } `}
                key={i}
                onClick={() => handleSelect(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial23;
