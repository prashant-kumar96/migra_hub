import React from 'react'
// import { LuNotebookText } from "react-icons/lu";
import { ImList2 } from "react-icons/im";
import { MdOutlineFamilyRestroom } from "react-icons/md";
const HelpData = [
    {
        // icon: <LuNotebookText/>,
        title: "How to Use MigraHub",
        questions: [
            {
                q: "How do I create an account on Migrahub?",
                a: `To create an account on Migrahub, follow these steps:
          - Visit the Migrahub homepage.
          - Click on the "Sign Up" button at the top right corner.
          - Fill in your details, including your name, email, and password.
          - Verify your email by clicking on the confirmation link sent to your inbox.
          - Log in using your credentials to access your dashboard.`,
            },
            {
                q: "How can I check my visa application status?",
                a: `Migrahub allows you to track your visa application status in real-time. Here's how:
          - Log in to your Migrahub account.
          - Navigate to the "Visa Tracker" section in your dashboard.
          - Enter your application reference number.
          - The system will display the current status and provide updates on any pending actions.`,
            },
            {
                q: "Can I upload documents directly to Migrahub?",
                a: `Yes, Migrahub supports secure document uploads for your visa application. To upload documents:
          - Log in and go to the "My Documents" section.
          - Click on the "Upload Document" button.
          - Select the required document type and upload the file from your device.
          - Ensure your documents meet the format and size requirements specified.`,
            },
            {
                q: "What should I do if I encounter an issue with my application?",
                a: `If you face any issues with your visa application, Migrahub provides support:
          - Visit the "Support" section in your dashboard.
          - Describe your issue in detail or use the pre-filled categories.
          - A Migrahub representative will review your case and respond within 24-48 hours.`,
            },
            {
                q: "How do I pay the visa application fees on Migrahub?",
                a: `Migrahub provides a secure payment gateway for application fees. To pay:
          - Navigate to the "Payment" section in your dashboard.
          - Select your visa application and click "Pay Now."
          - Choose your preferred payment method (credit/debit card, PayPal, etc.).
          - Complete the payment process and download your receipt for future reference.`,
            },
        ],
    },
    {
        // icon: <ImList2/>,
        title: "Itinerary Plans for Canada and USA",
        questions: [
            {
                q: "What is an itinerary plan, and why do I need it for a visitor visa?",
                a: `An itinerary plan is a detailed outline of your travel schedule, including destinations, accommodations, and activities.
            - It helps visa officers understand your travel purpose and intentions.
            - For Canada and the USA, it demonstrates that you have a well-thought-out plan for your visit, increasing your visa approval chances.`,
            },
            {
                q: "How can I create an itinerary plan using Migrahub?",
                a: `Migrahub simplifies the process of creating a professional itinerary plan:
            - Log in to your account and select the "Itinerary Planner" tool.
            - Fill in details like travel dates, destinations, and accommodations.
            - Add activities and important locations for each day of your trip.
            - Save or download the finalized itinerary to include in your visa application.`,
            },
            {
                q: "What details should I include in my itinerary plan for Canada and the USA?",
                a: `Your itinerary plan should include:
            - Travel Dates: Entry and exit dates for each country.
            - Accommodations: Hotel or Airbnb bookings with addresses.
            - Destinations: Cities and landmarks you plan to visit.
            - Activities: Daily schedules, including sightseeing, business meetings, or family visits.
            - Transportation: Flight details and local transport arrangements.`,
            },
        ],
    },
    {
        // icon:<MdOutlineFamilyRestroom />,
        title: "What if I want to take my family along with me",
        questions: [
            {
                q: "Can I include my family members in the same visa application?",
                a: "No, each family member needs to apply for their own visitor visa. However, you can submit the applications together as a group. Migrahub allows you to link multiple applications and ensures that all required documents are prepared for each family member.",
            },
            {
                q: "What are the additional requirements for taking my family along?",
                a: `You need to provide:
          - Proof of family relationships (e.g., marriage or birth certificates).
          - Financial evidence showing you can support the entire family during the trip.
          - A shared travel itinerary for the group. Migrahub’s "Family Visa Support" feature simplifies document preparation and ensures accuracy.`,
            },
            {
                q: "How can Migrahub help with family visa applications?",
                a: `Migrahub provides:
          - A streamlined process to manage multiple applications in one place.
          - Custom checklists for each family member’s visa requirements.
          - Assistance in creating a detailed family itinerary.
          - Document storage and tracking for the entire group.`,
            },
            {
                q: "Do family members need separate financial proof?",
                a: "Typically, one family member can provide consolidated financial proof, such as bank statements and sponsorship letters, covering the entire family. Migrahub helps you generate combined financial documents to satisfy visa requirements.",
            },
            {
                q: "Can Migrahub assist with group itinerary planning?",
                a: `Yes, Migrahub offers tools to plan a group itinerary, including:
          - Coordinated flight and accommodation bookings.
          - A detailed schedule for family activities.
          - Pre-filled forms for visa officers to review your family travel plans efficiently.`,
            },
        ],
    },


];
export {HelpData};