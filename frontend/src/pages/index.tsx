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
    
        <Features />
        <WhyTrustMigraHub />
        
        <Reviews />
        <div className="mt-4">
          <Footer />
        </div>
      
      </>
    </div>
  )
}

export default BeforeLoginLayout(LandingPage)
