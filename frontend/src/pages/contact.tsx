import Footer from "@/components/Footer";
import Header2 from "@/components/Header2";
import React from "react";
import { FaBuilding } from "react-icons/fa";

const Contact = () => {
  const offices = [
    {
      city: "Mumbai",
      address:
        "264, Vaswani Chambers Dr Annie Besant Rd, Worli Village, Mumbai, Maharashtra, 400030",
    },
    {
      city: "Delhi",
      address: "32, Sector 32, Gurgaon - 122003",
    },
    {
      city: "New York",
      address: "447 Broadway STE 851, New York, NY, 10013",
    },
  ];

  return (
    <>
    <Header2/>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mx-auto px-6 py-10 max-w-7xl">
        {/* Left Section */}
        <div className="flex-1 mt-6">
          <h2 className="text-2xl font-bold text-Indigo mb-4">
            Get in touch
          </h2>
          <p className="text-DarkGray text-lg tracking-wider font-greycliff leading-relaxed mb-6 text-justify">
            Thank you for your interest in reaching out to us! We value your
            feedback, inquiries, and suggestions. To ensure we can assist you
            effectively, please find the appropriate contact information and
            guidelines below:
          </p>
          {offices.map((office, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {office.city}
              </h3>
              <div className="flex items-start">
                <FaBuilding className="w-6 h-6 text-gray-700 mt-1 mr-2" />
                <p className="text-DarkGray text-lg">{office.address}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex-1 ml-12 mt-6">
          <h2 className="text-2xl font-bold text-Indigo  mb-4">
            Have a question?
          </h2>
          <p className="text-DarkGray text-lg">
            You can message us on:{" "}
            <a
              href="mailto:support@migrahub.com"
              className="text-blue-600 text-lg  underline hover:text-blue-800"
            >
              support@migrahub.com
            </a>
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
