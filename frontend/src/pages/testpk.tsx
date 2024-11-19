import React from "react";

const newsData = [
  {
    section: "2024 Elections",
    headline: "Ted Cruz rebrands for a tight race in Texas",
    description:
      "The polarizing conservative has been softening his edges ahead of another closer-than-expected reelection campaign.",
    author: "Daniela Silva",
    image: "path/to/main-image.jpg", // Replace with the actual image path
  },
  {
    section: "Sponsored Content",
    headline:
      "Too many Americans lack the tools to build a healthy financial future",
    description: "",
    author: "",
  },
  {
    section: "Florida",
    headline: "DeSantis on Helene recovery: 'We have what we need right now'",
    author: "Arik Slaktishin",
  },
  {
    section: "2024 | Rules of Law",
    headline: "The Coming Trump Revenge Tour",
    author: "Ankush Khardori",
  },
  {
    section: "Exclusive | California",
    headline:
      "New poll shows where Californians stand on drug penalties and rent control",
    description:
      "California remains overwhelmingly Democratic, but have conflicting views on criminal justice issues.",
    author: "Dustin Gardiner",
  },
  // Add more news items here as necessary
];

const NewsPage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>Top News</h1>
      </header>

      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        {/* Left Column */}
        <div style={{ flex: 2 }}>
          {newsData.map((news, index) => (
            <article key={index} style={{ marginBottom: "20px" }}>
              <h2>{news.section}</h2>
              <h3>{news.headline}</h3>
              {news.description && <p>{news.description}</p>}
              {news.author && (
                <p style={{ fontStyle: "italic" }}>By {news.author}</p>
              )}
            </article>
          ))}
        </div>

        {/* Right Column */}
        <aside style={{ flex: 1 }}>
          <h2>More Top News</h2>
          {newsData.map((news, index) => (
            <p key={index}>{news.headline}</p>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default NewsPage;
