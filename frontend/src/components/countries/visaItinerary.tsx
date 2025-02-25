import React from 'react';
import { MdDescription } from 'react-icons/md';
import { countriesData } from "@/utils/CountriesData";
import { useRouter } from 'next/router';

function VisaItinerary() {
    const itineraryData = [
        {
            id: 1,
            heading: "Essential for Approval",
            description: "Demonstrates your visit's purpose and ensures plans are legitimate and well-organized."
        },
        {
            id: 2,
            heading: "Shows Financial Readiness",
            description: "Demonstrates your visit's purpose and ensures plans are legitimate and well-organized."
        },
        {
            id: 3,
            heading: "Proves Ties to Home",
            description: "Demonstrates your visit's purpose and ensures plans are legitimate and well-organized."
        },
        {
            id: 4,
            heading: "Ensures Consistency",
            description: "Aligns details across your application, avoiding discrepancies."
        },
        {
            id: 5,
            heading: "Supports Security Checks",
            description: "Highlights safe and appropriate travel plans."
        },
        {
            id: 6,
            heading: "Simplifies Review",
            description: "Organizes required documents, making the application easier to process."
        },
        {
            id: 7,
            heading: "Builds Credibility",
            description: "Positions you as a responsible and prepared traveler."
        },
    ];
    const router = useRouter();
    const { country } = router.query;
    const selectedCountry = countriesData.find(
        (item) => item.name.toLowerCase() === country?.toLowerCase()
    );
    return (
        <>
            <section className="py-8 px-6 mx-auto max-w-screen-xl">
                <h2 className="text-3xl text-Indigo font-bold mb-1 capitalize">
                    {selectedCountry
                        ? `${selectedCountry.name.replace(/-/g, " ")} Visa Itinerary Plans`
                        : "Visa Itinerary Plans"}
                </h2>
                <div className="border-b-2 border-CGBlue w-24 mb-6"></div>
                <div className="mb-4 text-[17px] text-gray-700">
                    MigraHub helps you create a professional, visa-compliant travel itinerary tailored to your application.
                    We ensure it aligns with your travel purpose, meets all requirements, and strengthens your case.
                    Let us handle the details, so you can focus on your trip.
                </div>
                <div className="mb-6 text-[19px] font-semibold text-gray-900">
                    Why you need a Travel Itinerary?
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itineraryData.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 border border-gray-200 rounded-lg  shadow-md shadow-Indigo  hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center mb-2">
                                {/* <MdDescription className="text-Indigo text-[17px] mr-2" /> */}
                                <h3 className="text-lg font-semibold  text-gray-800">{item.heading}</h3>
                            </div>
                            <p className="text-gray-500">{item.description}</p>
                        </div>
                    ))}
                </div>
                <h2 className="text-3xl text-Indigo font-bold mb-1 mt-8 capitalize">
                    {selectedCountry
                        ? `${selectedCountry.name.replace(/-/g, " ")} Visa Insurance`
                        : "Visa Insurance"}
                </h2>
                <div className="border-b-2 border-CGBlue w-24 mb-4"></div>
                <div className="mb-6 text-[19px] font-semibold text-gray-900">
                    Don't let unexpected medical emergencies derail your {selectedCountry?.name} trip.
                </div>
                <div className="text-[17px] text-gray-700 text-justify">
                    Visitor visa insurance provides essential coverage for unforeseen medical expenses,
                    ensuring peace of mind during your travels.
                </div>
            </section>
        </>
    );
}

export default VisaItinerary;
