import React from "react";
import { MdOutlineManageHistory } from "react-icons/md";

const features = [
  {
    title: "Risk Assessment",
    description:
      "Answer a few simple questions and our team will asses your risk of travel visa denial. This will help us create a tailored plan for your specific situation, so you can file the strongest application possible.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="absolute left-1 top-1 h-6 w-6 text-Indigo"
      >
        <path d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z"></path>
        <path d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z"></path>
        <path d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z"></path>
      </svg>
    ),
  },
  {
    title: "Onboarding",
    description:
      "Onboard to MigraHub, we will assign case manager who will help you through out the visa process and beyond.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="absolute left-1 top-1 h-6 w-6 text-Indigo"
      >
        <path
          fillRule="evenodd"
          d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    title: "Application Process",
    description:
      "While you relax, Our team of experts will strengthen your application and file it.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="absolute left-1 top-1 h-6 w-6 text-Indigo"
      >
        <path
          fillRule="evenodd"
          d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z"
          clipRule="evenodd"
        ></path>
        <path d="M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z"></path>
      </svg>
    ),
  },
  {
    title: "Real time updates",
    description: "Get realtime status updates as we will keep you informed.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="absolute left-1 top-1 h-6 w-6 text-Indigo"
      >
        <path
          fillRule="evenodd"
          d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z"
          clipRule="evenodd"
        ></path>
        <path d="M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z"></path>
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="overflow-hidden py-8 sm:py-16">
      <div className=" max-w-7xl mx-auto px-6 lg:px-8">
        {/* <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block p-2 mb-4 text-xs  font-semibold tracking-wider bg-indigo-200 text-Indigo tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Procedural Steps
            </p>
          </div>
          <h2 className="max-w-lg mb-6 text-5xl font-semibold tracking-wider  text-Indigo sm:text-3xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-10 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-24 lg:-mt-6 sm:block"
              >
                <defs>
                  <pattern
                    id="pattern-circle"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect fill="url(#pattern-circle)" width="52" height="28" />
              </svg>
              <span className="relative">The</span>
            </span>{" "}
            Streamlined Approach to your Visa Journey
          </h2>
          <p className="text-base text-gray-700 md:text-lg ">
            With Migrahub’s knowledgeable team and client-centered approach,
            applicants can confidently navigate complex visa procedures and
            achieve their goals with ease.
          </p>
        </div> */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-normal tracking-wider leading-7 text-indigo-300">
                Process faster
              </h2>
              <p className="mt-2 text-2xl font-bold tracking-tight text-DarkGray sm:text-3xl">
                An Eastiest Way to Travel Abroad
              </p>
              {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                We've built an API that allows you to scale your podcast
                production workflow.
              </p> */}
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-DarkGray text-justify lg:max-w-none">
                {features.map((feature, index) => (
                  <div key={index} className="relative pl-9">
                    <dt className="inline font-semibold text-DarkGray text-base ">
                      {feature.icon} {" "}
                      {feature.title}
                    </dt>
                    <dd className="inline"> {feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-full tracking-wider bg-transparent text-Indigo border border-Indigo px-3.5 py-2.5 text-base font-semibold hover:text-white shadow-sm hover:bg-Indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Processing
              </a>
              <a
                href="#"
                className="text-base tracking-wide font-normal leading-6 text-LightGray hover:text-Indigo"
              >
                Schedule a call <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <img
            // src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfDB8fHwxNjkxODE2NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080"
            // src="https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/blt864986663773d3e0/665435935939380b65262cb8/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0"
            src="https://thumbs.dreamstime.com/b/happy-young-latin-business-man-using-digital-tablet-looking-away-office-smiling-busy-employee-standing-work-male-285560506.jpg"
            alt="Product screenshot"
            className="w-[450px] max-w-none  sm:w-[450px]  md:-ml-4 lg:-ml-0"
            // width="2432"
            // height="1442"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
