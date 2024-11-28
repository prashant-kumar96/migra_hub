import React, { useState, useEffect } from "react";
import Image from "next/image";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import {
  getSinglePassportData,
  getSingleProofOfFundsData,
} from "@/api/document";
import CrossIcon from "@/utils/crossIcon";
import ButtonLoader from "./loaders/buttonLoader";
import DocModal from "./DocModal";

const UploadModal = ({ isOpen, onClose, setText }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [medata] = useAtom(meDataAtom);
  const [loading, setLoading] = useState(false);
  console.log("selectedFiles", selectedFiles);
  // Fetch uploaded files when modal opens

  console.log("uploaded Image", uploadedImages);
  // Handle file selection and preview generation
  const handleFileChange = (e) => {
    console.log("helloworld ", event.target.files);
    const files = Array.from(event.target.files);
    setUploadedImages([...uploadedImages, ...files]);
  };

  // Upload selected files to the backend
  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    uploadedImages.forEach((file) => {
      formData.append("images", file);
    });

    console.log("hello", medata?._id);
    // return;
    formData.append("userId", medata?._id);
    try {
      const response = await fetch(
        "http://localhost:5000/api/document/uploadproofOfFundsImages",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Images uploaded successfully!");
        setSelectedFiles([]);
        setLoading(false);
        setText("Uploaded");
        onClose();
        // fetchUploadedFiles();
      } else {
        setLoading(false);
        console.log("Failed", response);
        alert("Failed to upload images.");
      }
    } catch (error) {
      setLoading(false);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-gray-700">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-700">
          Upload Proof of Funds Images
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
        <div className="overflow-auto max-h-96">
          {uploadedImages.map((image, index) => (
            <div key={index} className="mb-4 border relative">
              <div
                className="absolute right-0 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                <CrossIcon />
              </div>
              {image.type === "application/pdf" ? (
                <p className="p-2">{image.name}</p>
              ) : (
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`upload-${index}`}
                  width={300}
                  height={300}
                />
              )}
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
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center flex gap-2 items-center"
            >
              Upload
              {loading && <ButtonLoader />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProofOfFundsComp = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [
    isProofOfFundsCompPreviouslyUploaded,
    setProofOfFundsCompPreviouslyUploaded,
  ] = useState(false);
  const [isdocModalOpen, setisDocModalOpen] = useState(false);
  const [docData, setDocData] = useState();
  const [text, setText] = useState("");

  const [medata] = useAtom(meDataAtom);
  const fetchUploadedProofOfFunds = async () => {
    try {
      console.log("fetchUploadedProofOfFunds");
      const response = await getSingleProofOfFundsData(medata?._id);
      if (response) {
        console.log("response getSingleProofOfFundsData", response);
        // const data = await response.json();
        if (response.data?.status === true) {
          setProofOfFundsCompPreviouslyUploaded(true);
          setDocData(response?.data?.result?.proofOfFundsImages);
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
    fetchUploadedProofOfFunds();
    setText("");
  }, [text]);
  return (
    <div className="p-6">
      {isProofOfFundsCompPreviouslyUploaded ? (
        <div className="flex items-center justify-center p-4 bg-green-100 border border-green-300 rounded-md shadow-md w-fit">
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
            Proof of Funds already uploaded
          </span>
          <p
            className="ps-4 text-gray-900 cursor-pointer"
            onClick={() => setisDocModalOpen(true)}
          >
            View
          </p>
        </div>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Upload
        </button>
      )}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        setText={setText}
      />
      {isdocModalOpen && (
        <DocModal docData={docData} setisDocModalOpen={setisDocModalOpen} />
      )}
    </div>
  );
};

export default ProofOfFundsComp;
