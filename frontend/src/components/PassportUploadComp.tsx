import React, { useState, useEffect } from "react";
import Image from "next/image";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import { getSinglePassportData } from "@/api/document";
import { useAuth } from "@/context/auth-context";
// import CrossIcon from "@/utils/elements/icons/cross-icon";

const UploadModal = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [medata] = useAtom(meDataAtom);

  const {user} = useAuth()
  const userId = user?.user?._id

  // console.log("medata@@@@", medata);
  const [uploadedImages, setUploadedImages] = useState([]);
  console.log("selectedFiles", selectedFiles);
  // Fetch uploaded files when modal opens

  // Handle file selection and preview generation
  const handleFileChange = (e) => {
    const files = Array.from(event.target.files);
    setUploadedImages([...uploadedImages, ...files]);
  };

  // Upload selected files to the backend
  const handleUpload = async () => {
    console.log("handleUpload is run");
    const formData = new FormData();
    uploadedImages.forEach((file) => {
      formData.append("images", file);
    });

     // return;
    formData.append("userId", userId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/document/uploadPassportImages`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Images uploaded successfully!");
        setSelectedFiles([]);
        setPreviewImages([]);
        onClose();
        // fetchUploadedFiles();
      } else {
        console.log(response);
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
      <div className="bg-white p-6 rounded-md w-96 w-fit">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-700">
          Upload Passport Images
        </h2>

        {/* File Input */}
        <input
          type="file"
          multiple
          accept="image/jpeg,image/gif,image/png,application/pdf"
          onChange={handleFileChange}
          className="mb-4 dark:text-gray-700 "
        />

        {/* Preview Selected Files */}
        <div className="">
          {uploadedImages.map((image, index) => (
            <div key={index} className="mb-4 border relative">
              <div
                className="absolute right-0 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                {/* <CrossIcon /> */}
              </div>
              <Image
                className="m-auto"
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

const PassportUploadComp = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {user} = useAuth();
  const userId = user?.user?._id

  const [isPassportPreviouslyUploaded, setPassportPreviouslyUploaded] =
    useState(false);

  const [medata] = useAtom(meDataAtom);
   
 
  const fetchUploadedPassport = async () => {
    try {
      console.log("fetchUploadedPassport");
      const response = await getSinglePassportData(userId);
      if (response) {
        console.log("response fetchUploadedPassport", response);
        // const data = await response.json();
        if (response.status === 200) {
          setPassportPreviouslyUploaded(true);
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
    fetchUploadedPassport();
  });
  return (
    <div className="p-6">
      {isPassportPreviouslyUploaded ? (
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
            Passport already uploaded
          </span>
        </div>
      ) : (
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Upload passport
        </button>
      )}
      <UploadModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PassportUploadComp;
