import { useRouter } from "next/router";
import React from 'react'


const ArticlePage = () => {
  const router = useRouter();
  const { article } = router.query; // Extract the dynamic article parameter

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">
        {article && article.replace(/-/g, " ")} {/* Replace dashes with spaces */}
      </h1>
      <p className="text-center text-gray-600 mt-4">
        This is the detailed page for the article: <b>{article}</b>.
      </p>
      <button
        onClick={() => router.push("/help")} // Navigate back to the list
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Articles
      </button>
    </div>
  );
};

export default ArticlePage;
