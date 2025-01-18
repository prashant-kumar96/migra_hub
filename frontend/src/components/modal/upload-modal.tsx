// components/UploadModal.tsx

import React from 'react';
import Image from 'next/image';
import useDocumentUpload from '@/utils/documentUpload';
import CrossIcon from '@/utils/crossIcon';
 
interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
   onFilesLoaded: (files: File[]) => void; // Pass loaded files
    loadedFiles: File[];
    setLoadedFiles:  React.Dispatch<React.SetStateAction<File[]>> ;
    handleRemoveFile: (index: number) => void;
    uploadStatuses : { [key: string]: string }
    setUploadStatuses:  React.Dispatch<React.SetStateAction<{ [key: string]: string }>> ;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  modalTitle,
   onFilesLoaded,
   loadedFiles,
   setLoadedFiles,
   handleRemoveFile,
    uploadStatuses,
    setUploadStatuses,
}) => {
    const handleFileChangeForModal = (e: React.ChangeEvent<HTMLInputElement>) => {
           if (!e.target.files) return;
        const files = Array.from(e.target.files) as File[];
        setLoadedFiles((prevFiles) => [...prevFiles, ...files]);
          onFilesLoaded(files);
          onClose()
        }

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-700">{modalTitle}</h2>

        {/* File Input */}
        <input
          type="file"
          multiple
          accept="image/jpeg,image/gif,image/png,application/pdf"
          onChange={handleFileChangeForModal}
          className="mb-4 dark:text-gray-700"
        />

        {/* Preview Selected Files */}
        <div className="">
          {loadedFiles?.length > 0 &&   loadedFiles?.map((file, index) => (
             <div key={index} className="mb-4 border relative flex justify-between gap-4 items-center">
                <div className='w-fit'>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`upload-${index}`}
                    width={150}
                    height={150}
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
                    <CrossIcon />
                  </div>
                </div>
             </div>
            ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
};

export default UploadModal;