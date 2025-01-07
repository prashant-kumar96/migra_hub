import React, { useState, useEffect } from "react";
import Image from "next/image";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import {
  getAdditionalDocuments,
  getSingleProofOfTiesData,
} from "@/api/document";
import CrossIcon from "@/utils/crossIcon";
import { useAuth } from "@/context/auth-context";
import UploadModal from "./modal/upload-modal";
import useDocumentUpload from "@/utils/documentUpload";

interface AdditionalDocumentsProps {
  userId: string;
   onUploadSuccess?: () => void;
}

const AdditionalDocuments: React.FC<AdditionalDocumentsProps> = ({ userId, onUploadSuccess, setFiles, files, uploadStatuses, setUploadStatuses }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadedFiles, setLoadedFiles] = useState<File[]>([]);
  const [
    areAdditionalDocumentsPreviouslyUploaded,
    setAreAdditionalDocumentsPreviouslyUploaded,
  ] = useState(false);

  const [medata] = useAtom(meDataAtom);
 const { handleRemoveFile } = useDocumentUpload()
  const fetchUploadedProofOfTies = async () => {
    try {
      console.log("fetchUploadedProofOfFunds");
      const response = await getAdditionalDocuments(userId);
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
  },[userId]);
    const handleFilesLoaded = (loadedFiles: File[]) => {
        setFiles(loadedFiles);
        setLoadedFiles(loadedFiles)
    };
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
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gray-100 border text-black hover:text-white hover:bg-blue-600 my-2  py-2 px-4 rounded"

            >
              Upload Additional Documents
            </button>
              {files.map((file, index) => (
                  <div key={index} className="mb-4 border relative flex justify-between gap-4 items-center">
                      <div className='w-fit'>
                          <Image
                              src={URL.createObjectURL(file)}
                              alt={`upload-${index}`}
                              width={400}
                              height={400}
                          />
                      </div>
                      <div className='flex items-center justify-between gap-4'>
                            {uploadStatuses[file.name + Date.now()] === "uploading" &&
                            <span>Uploading</span>}
                            {uploadStatuses[file.name + Date.now()] === "success" &&
                            <span>Success</span>}
                            {uploadStatuses[file.name + Date.now()] === "error" &&
                            <span>Error</span>}
                          <div
                              className="absolute right-0 cursor-pointer "
                              onClick={() => handleRemoveFile(index)}
                          >

                          </div>
                      </div>
                  </div>
              ))}
          </div>
      )}
        <UploadModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          modalTitle="Upload Additional Documents"
            onFilesLoaded={handleFilesLoaded}
            loadedFiles={loadedFiles}
             setLoadedFiles={setLoadedFiles}
             uploadStatuses={uploadStatuses}
           handleRemoveFile={handleRemoveFile}
            setUploadStatuses={setUploadStatuses}
      />
    </div>
  );
};

export default AdditionalDocuments;