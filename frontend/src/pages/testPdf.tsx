import PDFViewer from "@/components/PDFViewer";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TestPdf = () => {
  const [url, setUrl] = useState("");
  const getPdfUrl = async () => {
    // Fetch the PDF URL from the backend API
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}get-pdf-url`
    );
    // const data = await response.json();
    console.log("test pdf data", response);
    setUrl(response?.data?.url);
  };

  useEffect(() => {
    getPdfUrl();
  });
  console.log("url", url);
  return (
    <>
      <div>TestPdf</div>
      <PDFViewer url={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`} />
    </>
  );
};

export default TestPdf;
