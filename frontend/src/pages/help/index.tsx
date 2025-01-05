import Navbar from "@/components/countries/navbar";
import Footer from "@/components/Footer";
import Header2 from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaBook, FaSyncAlt, FaLightbulb } from "react-icons/fa";
import { HelpData } from "@/utils/HelpData";
const articlesData = [
    {
        id: 1,
        title: "How to use Migrahub",
        description: "How-to guides so you can get started with Migrahub",
        author: "By Mark and 2 others",
        articlesCount: "30 articles",
        route: "how-to-use-Migrahub",
        icon: <FaBook className="text-yellow-500 text-lg" />,
    },
    {
        id: 2,
        title: "The bookings",
        description:
            "The Loop is a framework for healthy and effective communication across teams.",
        author: "By Mark",
        articlesCount: "5 articles",
        route: "the-bookings",
        icon: <FaSyncAlt className="text-blue-500 text-lg" />,
    },
    {
        id: 3,
        title: "best travelling itenrary",
        description:
            "Get ideas, tips, and best practices for using Migrahub, and understand how we work with other Migrahubsian tools.",
        author: "By Sherif and 1 other",
        articlesCount: "9 articles",
        route: "best-travelling-itenrary",
        icon: <FaLightbulb className="text-yellow-300" size={20}/>,
    },
];

const MigraHubArticles = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const SearchedData = HelpData.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const router = useRouter();
    const handleNavigation = (route) => {
        if (route) {
            router.push(`/help/${route}`);
        }
    };
    console.log("route", handleNavigation)
    return (
        <>
            <Navbar />
            <div className=" text-Indigo py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-greycliff tracking-tighter font-bold">Do you have any Questions ?</h1>
                        <span className="mt-1 text-sm opacity-75 tracking-wide">We have answers (well, most of the times!)</span><br />
                        <span className="text-justify text-Indigo font-greycliff tracking-wide ">Below you’ll find answers to the most common questions you may have on MigraHub.<br />
                            If you still can’t find the answer you’re looking for,
                            just <Link href="/conatct" className="hover:text-Blue"></Link>Contact us!</span>
                        {/* <div className="flex justify-center ">
                                <Image src="/imgs/faq.png" width={200} height={150} alt="picture of the faq cartoon"/>
                            </div> */}
                        <div className="mt-4 flex justify-center  ">
                            <div className="relative w-full max-w-5xl flex justify-between items-center">
                                <input
                                    type="text"
                                    placeholder="Search for articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 placeholder:italic tracking-wide rounded-full bg-[#CDE6EC] text-FloralWhite bg-gradient-to-r from-[#333366] to-[#2C415A] shadow-xl pr-10" // Add padding to the right for the icon
                                />
                                <div className="absolute inset-y-0 right-4 flex items-center">
                                    <svg
                                        className="w-5 h-5 text-FloralWhite"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="text-Indigo space-y-10">
                        {SearchedData.length > 0 ? SearchedData.map((category, index) => (
                            <div
                                key={index}
                                className="flex items-center p-6 border-2 rounded-xl shadow-md shadow-LightGray"
                                onClick={() => handleNavigation(category?.title.toLowerCase().replace(/\s+/g, "-"))}
                            >
                                {/* <div className="mr-4">{category.icon}</div> */}
                                <div>
                                    <h2 className="text-xl  font-greycliff tracking-tighter font-bold capitalize">{category.title}?</h2>
                                    <div className="flex inline-flex justify-start item-center">
                                    <p className="text-base font-greycliff  text-gray-600">{category.questions.length}</p>
                                    <p className="text-xs  font-greycliff  tracking-wider text-gray-400 mt-1">
                                    {" "}{category.questions.length > 1 ? " questions" : "question"}
                                    </p>
                                    </div>
                                   
                                </div>
                            </div>
                        )) : <div className="flex justify-center ">
                            <Image src="/imgs/faq.png" width={400} height={150} alt="picture of the faq cartoon" />
                            {/* <span>Find related to visa's processing and other stuff....</span> */}
                        </div>}
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default MigraHubArticles;
