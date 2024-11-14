import React, { useState } from "react";
import axios from "axios";

const DocumentUploadComp = () => {
    
  const [documents, setDocuments] = useState({
    passport: null,
    visaApplication: null,
    photograph: null,
    financialProof: null,
    itinerary: null,
    invitationLetter: null,
    employmentProof: null,
  });

  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [name]: files[0],
    }));
  };

  // Handle form submission
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(documents).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-documents",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Documents uploaded successfully!");
      setDocuments({
        passport: null,
        visaApplication: null,
        photograph: null,
        financialProof: null,
        itinerary: null,
        invitationLetter: null,
        employmentProof: null,
      });
    } catch (error) {
      setMessage("Failed to upload documents. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Upload Visa Documents</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        <form onSubmit={handleUpload} className="space-y-4">
          {/* Individual file inputs for each document */}
          <div>
            <label className="block mb-1 font-semibold">Passport</label>
            <input
              type="file"
              name="passport"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* <div>
            <label className="block mb-1 font-semibold">
              Visa Application Form
            </label>
            <input
              type="file"
              name="visaApplication"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div> */}
          <div>
            <label className="block mb-1 font-semibold">Photograph</label>
            <input
              type="file"
              name="photograph"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Proof of Financial Support
            </label>
            <input
              type="file"
              name="financialProof"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* <div>
            <label className="block mb-1 font-semibold">Travel Itinerary</label>
            <input
              type="file"
              name="itinerary"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div> */}
          {/* <div>
            <label className="block mb-1 font-semibold">
              Invitation Letter
            </label>
            <input
              type="file"
              name="invitationLetter"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div> */}
          <div>
            <label className="block mb-1 font-semibold">
              Proof of Employment/Enrollment
            </label>
            <input
              type="file"
              name="employmentProof"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Upload Documents
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadComp;
