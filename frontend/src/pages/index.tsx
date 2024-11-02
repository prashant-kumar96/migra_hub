import Banner from "@/components/TravelPlan";
import BeforeLoginLayout from "@/components/BeforeLoginLayout";
import FlagsComponent from "@/components/FlagsComponent";
import React from "react";
import Features from "@/components/features";
import WhyTrustMigraHub from "@/components/WhyMigrahub";
import CustomerReviews from "@/components/Testimonial";

import Footer from "@/components/Footer";
import Reviews from "@/components/Review";

const LandingPage = () => {
  return (
    <div>
      <Banner />
      <FlagsComponent />
      <>
        {/* <div
          // href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full mt-6"
        > */}
        {/* <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src="/assets/passport.png"
            alt=""
          /> */}
        <Features />
        <WhyTrustMigraHub />
        {/* <CustomerReviews/> */}
        <Reviews />
        <div className="mt-4">
          <Footer />
        </div>
        {/* <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div> */}
        {/* </div> */}
      </>
    </div>
  )
}

export default BeforeLoginLayout(LandingPage)
