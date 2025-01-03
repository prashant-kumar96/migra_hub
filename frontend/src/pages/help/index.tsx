import Footer from "@/components/Footer";
import Header2 from "@/components/Header";
import { useRouter } from "next/router";
import React from "react";
import { FaBook, FaSyncAlt, FaLightbulb } from "react-icons/fa";

const articlesData = [
    {
        id: 1,
        title: "How to use Atlas",
        description: "How-to guides so you can get started with Atlas",
        author: "By Mark and 2 others",
        articlesCount: "30 articles",
        route: "how-to-use-Atlas",
        icon: <FaBook className="text-yellow-500 text-lg" />,
    },
    {
        id: 2,
        title: "The Loop",
        description:
            "The Loop is a framework for healthy and effective communication across teams.",
        author: "By Mark",
        articlesCount: "5 articles",
        route: "the-loop",
        icon: <FaSyncAlt className="text-blue-500 text-lg" />,
    },
    {
        id: 3,
        title: "best travelling itenrary",
        description:
            "Get ideas, tips, and best practices for using Atlas, and understand how we work with other Atlassian tools.",
        author: "By Sherif and 1 other",
        articlesCount: "9 articles",
        route: "best-travelling-itenrary",
        icon: <FaLightbulb className="text-yellow-300 text-lg" />,
    },
];

const MigraHubArticles = () => {
    const router = useRouter();
    const handleNavigation = (route) => {
        if (route) {
            router.push(`/help/${route}`);
        }
    };
    console.log("route", handleNavigation)
    return (
        <>
        <Header2/>
            <div className=" text-Indigo py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">Advice and answers from the Atlas Team</h1>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Search for articles..."
                                className="w-full max-w-lg px-4 py-2 rounded-full text-white bg-Indigo"
                            />
                        </div>
                    </div>

                    <div className="bg-white text-black rounded-lg shadow-md p-6 space-y-4">
                        {articlesData.map((article) => (
                            <div
                                key={article.id}
                                className="flex items-center p-4 border rounded-lg shadow-sm"
                                onClick={() => handleNavigation(article?.route)}
                            >
                                <div className="mr-4">{article.icon}</div>
                                <div>
                                    <h2 className="text-lg font-semibold capitalize">{article.title}</h2>
                                    <p className="text-sm text-gray-600">{article.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {article.author} • {article.articlesCount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
};

export default MigraHubArticles;
