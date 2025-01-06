import Navbar from "@/components/countries/navbar";
import FAQ from "@/components/Help/FAQ";
import { useRouter } from "next/router";
import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import { HelpData } from "@/utils/HelpData";

const Breadcrumb = ({ article }) => {
  const breadcrumbData = [
    {
      id: 1,
      label: <TiHomeOutline size={20} />,
      href: "/",
      isCurrent: false,
    },
    {
      id: 2,
      label: "FAQ",
      href: "/help",
      isCurrent: false,
    },
    {
      id: 3,
      label: article && article.replace(/-/g, " "),
      href: null,
      isCurrent: true,
    },
  ];
 
  return (
    <ol className="flex items-center whitespace-nowrap my-4">
      {breadcrumbData.map((item, index) => (
        <li key={item.id} className="inline-flex items-center">
          {item.href ? (
            <a
              href={item.href}
              className={`flex items-center text-sm ${item.isCurrent
                  ? "font-semibold text-Indigo"
                  : "text-Indigo capitalize font-greyclif tracking-wide hover:text-Blue focus:outline-none focus:text-blue-600"
                }`}
            >
              {item.label}
              {index < breadcrumbData.length - 1 && (
                <svg
                  className="shrink-0 mx-2 size-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              )}
            </a>
          ) : (
            <span
              className="text-sm font-semibold text-Indigo capitalize opacity-75 font-greycliff truncate "
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
};

const ArticlePage = () => {
  const router = useRouter();
  const { article } = router.query; // Extract the dynamic article parameter

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb article={article} />
        <h1 className="text-3xl font-bold text-center">
          {article && article.replace(/-/g, " ")} {/* Replace dashes with spaces */}
        </h1>
        <FAQ />
        {/* <p className="text-center text-gray-600 mt-4">
          This is the detailed page for the article: <b>{article}</b>.
        </p> */}
        <button
          onClick={() => router.push("/help")} // Navigate back to the list
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Articles
        </button>
      </div>
    </>
  );
};

export default ArticlePage;

export async function getStaticProps({ params }) {
  const title = params?.article?.replace(/-/g, " ");
  const selectedSection = HelpData.find(
    (section) => section.title.toLowerCase() === title.toLowerCase()
  );

  if (!selectedSection) {
    return { notFound: true }; // Return 404 if not found
  }

  return {
    props: {
      article: selectedSection.title,
      questions: selectedSection.questions,
    },
  };
}

export async function getStaticPaths() {
  const paths = HelpData.map((section) => ({
    params: { article: section.title.toLowerCase().replace(/ /g, "-") },
  }));

  return {
    paths,
    fallback: false, // Return 404 if no match found
  };
}