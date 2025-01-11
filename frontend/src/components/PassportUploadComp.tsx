import React, { useState, useEffect } from "react";
import Image from "next/image";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import { getSinglePassportData } from "@/api/document";
import { useAuth } from "@/context/auth-context";
import UploadModal from "./modal/upload-modal";
import useDocumentUpload from "@/utils/documentUpload";
// import CrossIcon from "@/utils/elements/icons/cross-icon";

interface PassportUploadCompProps {
  userId: string;
  onUploadSuccess?: () => void;
}

const PassportUploadComp: React.FC<PassportUploadCompProps> = ({ userId, onUploadSuccess , setFiles, files, uploadStatuses, setUploadStatuses}) => {
  const [isModalOpen, setModalOpen] = useState(false);
    const [loadedFiles, setLoadedFiles] = useState<File[]>([]);
  const [isPassportPreviouslyUploaded, setPassportPreviouslyUploaded] =
    useState(false);

  const [medata] = useAtom(meDataAtom);

 const {  handleRemoveFile } = useDocumentUpload()
  const fetchUploadedPassport = async () => {
    try {
      console.log("fetchUploadedPassport");
      const response = await getSinglePassportData(userId);
      if (response) {
        console.log(";; response fetchUploadedPassport", response);
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
  }, [userId]);
    const handleFilesLoaded = (loadedFiles: File[]) => {
      setFiles(loadedFiles);
      setLoadedFiles(loadedFiles)

    };
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
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gray-100 border text-black hover:text-white hover:bg-blue-600 my-2  py-2 px-4 rounded"
          >
            Click to Upload passport
          </button>
            {files.map((file, index) => (
                <div key={index} className="mb-4  relative flex justify-between gap-4 items-center">
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
        modalTitle="Upload Passport Images"
        onFilesLoaded={handleFilesLoaded}
          setLoadedFiles={setLoadedFiles}
            handleRemoveFile={handleRemoveFile}
         uploadStatuses={uploadStatuses}
         setUploadStatuses={setUploadStatuses}
      />
    </div>
  );
};

export default PassportUploadComp;