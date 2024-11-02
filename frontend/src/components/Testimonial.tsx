import React from "react";

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Maria Smantha",
      position: "Web Developer",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
      image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg",
    },
    {
      name: "Lisa Cudrow",
      position: "Graphic Designer",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
      image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).jpg",
    },
    {
      name: "Maria Smantha",
      position: "Web Developer",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
      image: "https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg",
    },

    // Add additional testimonials here
  ];
  return (
    <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
      <h3 className="mb-6 text-4xl mt-2 tracking-wide font-greycliff text-CGBlue font-medium capitalize ">
        See what are customers are saying
      </h3>
      <p className="mb-6 pb-2 tracking-wider text-Gray font-greycliff md:mb-12 md:pb-0">
        Their experiences reflect our commitment to excellence and thrilled to
        see how our efforts have positively impacted our clients. Read on to see
        real stories and experiences that showcase why our customers keep coming
        back.
      </p>

      <div className="grid gap-6 text-center grid-cols-3 md:grid-cols-3 lg:gap-12">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="mb-12 md:mb-0">
            <div className="mb-6 flex justify-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-32 rounded-full shadow-lg shadow-black/30"
              />
            </div>
            <h5 className="text-[17px] font-medium text-CGBlue tracking-wider">
              {testimonial.name}
            </h5>
            <h6 className="mb-4 text-[13px] tracking-tight  font-normal text-greycliff text-[#82C1CF]">
              {testimonial.position}
            </h6>
            <p className="mb-4 text-Gray text-justify text-[15px]">
              <span className="inline-block pe-2 text-LightGray">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  className="w-5"
                >
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                </svg>
              </span>
              {testimonial.feedback}
            </p>
            <ul className="mb-0 flex items-center justify-center">
              {[...Array(5)].map((_, starIndex) => (
                <li key={starIndex}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
