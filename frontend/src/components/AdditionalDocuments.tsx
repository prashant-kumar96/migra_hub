import React, { useState, useEffect } from "react";
import Image from "next/image";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import {
  getAdditionalDocuments,
  getSingleProofOfTiesData,
} from "@/api/document";
import CrossIcon from "@/utils/crossIcon";

const UploadModal = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [medata] = useAtom(meDataAtom);

  console.log("selectedFiles", selectedFiles);
  // Fetch uploaded files when modal opens

  // Handle file selection and preview generation
  const handleFileChange = (e) => {
    const files = Array.from(event.target.files);
    setUploadedImages([...uploadedImages, ...files]);
  };

  // Upload selected files to the backend
  const handleUpload = async () => {
    const formData = new FormData();
    uploadedImages.forEach((file) => {
      formData.append("images", file);
    });

    console.log("hello", medata?._id);
    // return;
    formData.append("userId", medata?._id);
    try {
      const response = await fetch(
        "http://localhost:5000/api/document/uploadAdditionalDocuments",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Images uploaded successfully!");
        setSelectedFiles([]);
        onClose();
        // fetchUploadedFiles();
      } else {
        console.log("response", response);
        alert("Failed to upload images.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("An error occurred while uploading.");
    }
  };

  // Fetch previously uploaded files

  if (!isOpen) return null;

  const handleRemoveImage = (index) => {
    console.log("imageIndex", index);
    setUploadedImages((prev) => prev.filter((element, i) => index !== i));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-700">
          Upload Additional Documents
        </h2>

        {/* File Input */}
        <input
          type="file"
          multiple
          accept="image/jpeg,image/gif,image/png,application/pdf"
          onChange={handleFileChange}
          className="mb-4 dark:text-gray-700"
        />

        {/* Preview Selected Files */}
        <div className="max-h-96 overflow-auto">
          {uploadedImages.map((image, index) => (
            <div key={index} className="mb-4 border relative">
              <div
                className="absolute right-0 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                <CrossIcon />
              </div>
              <Image
                src={URL.createObjectURL(image)}
                alt={`upload-${index}`}
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>

        {/* Uploaded Files */}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
          >
            Close
          </button>
          {uploadedImages.length > 0 && (
            <button
              onClick={handleUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AdditionalDocuments = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [
    areAdditionalDocumentsPreviouslyUploaded,
    setAreAdditionalDocumentsPreviouslyUploaded,
  ] = useState(false);

  const [medata] = useAtom(meDataAtom);
  const fetchUploadedProofOfTies = async () => {
    try {
      console.log("fetchUploadedProofOfFunds");
      const response = await getAdditionalDocuments(medata?._id);
      if (response) {
        console.log("response getAdditionalDocuments", response);
        // const data = await response.json();
        if (response.status === 200) {
          setAreAdditionalDocumentsPreviouslyUploaded(true);
        }
        // setUploadedFiles(data);
      } else {
        console.error("Failed to fetch uploaded files.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchUploadedProofOfTies();
  });
  return (
    <div className="p-6">
      {areAdditionalDocumentsPreviouslyUploaded ? (
        <div className="flex items-center justify-center p-4 bg-green-100 border border-green-300 rounded-md shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2l4-4m-6 4V6m8 10H6"
            />
          </svg>
          <span className="text-green-800 font-medium">
            Additional Documents already uploaded
          </span>
        </div>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Upload Additional Documents
        </button>
      )}
      <UploadModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AdditionalDocuments;
