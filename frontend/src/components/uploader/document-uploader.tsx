import Image from "next/image";
import UploadModal from "../modal/upload-modal";
import useDocumentUpload from "@/utils/documentUpload";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { meDataAtom } from "@/store/meDataAtom";


interface DocumentUploaderProps {
    userId: string;
    onUploadSuccess: () => void;
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    files: File[];
    uploadStatuses: { [key: string]: string };
    setUploadStatuses: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    title: string;
    uploadedDocuments?: { path: string; originalname: string }[];
    uploadUrl: string;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
    userId,
    onUploadSuccess,
    allDocumentsUploaded,
    setFiles,
    files,
    uploadStatuses,
    setUploadStatuses,
    title,
    uploadedDocuments,
    uploadUrl,
}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loadedFiles, setLoadedFiles] = useState<File[]>([]);
    const [medata] = useAtom(meDataAtom);
    const { handleRemoveFile } = useDocumentUpload();
    const isPreviouslyUploaded = !!(uploadedDocuments && uploadedDocuments.length > 0);


    const handleFilesLoaded = (loadedFiles: File[]) => {
        setFiles(loadedFiles);
        setLoadedFiles(loadedFiles);
    };

    return (
        <div className="p-2 border rounded-md">
            <div className="flex items-center mb-2">
                <span className="text-md font-semibold mr-2">{title}:</span>
            </div>
            <div className="flex  overflow-x-auto gap-2">
                 {isPreviouslyUploaded && (
                     <div className="flex items-center bg-green-50 border border-green-200 rounded-md shadow-sm p-2">
                         <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-600 mr-1"
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
                         <span className="text-green-700 font-medium">
                            Uploaded
                         </span>
                        <div className="flex overflow-x-auto gap-2 ml-2">
                            {uploadedDocuments?.map((doc, index) => (
                                <div key={index} className="border rounded-md p-1 flex flex-col items-center justify-center w-20 h-20">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                                        alt={`${title}-${index}`}
                                        width={50}
                                        height={50}
                                        className="object-contain"
                                    />
                                    <p className="text-xs mt-1 truncate w-full text-center">{doc.originalname}</p>
                                </div>
                            ))}
                         </div>
                     </div>
                 )}

               {!isPreviouslyUploaded && (
                 <div className="">
                   <button
                     onClick={() => setModalOpen(true)}
                      className="bg-gray-100 border text-gray-700  hover:bg-blue-100 my-1 py-1 px-2 rounded text-sm"
                     >
                    Click to Upload
                  </button>
                    <div className="flex overflow-x-auto gap-2">
                     {files.map((file, index) => (
                        <div key={index} className="border rounded-md p-1 relative flex flex-col items-center justify-center w-20 h-20">
                           <Image
                                src={URL.createObjectURL(file)}
                                 alt={`upload-${index}`}
                                width={50}
                                height={50}
                                className="object-contain"
                             />
                            <div className="flex items-center justify-center w-full text-xs">
                            {uploadStatuses[file.name + Date.now()] === 'uploading' && (
                                <span className="text-blue-500">Uploading</span>
                              )}
                            {uploadStatuses[file.name + Date.now()] === 'success' && (
                                 <span className="text-green-500">Success</span>
                              )}
                            {uploadStatuses[file.name + Date.now()] === 'error' && (
                                 <span className="text-red-500">Error</span>
                             )}
                            <div
                                 className="absolute top-1 right-1 cursor-pointer"
                                onClick={() => handleRemoveFile(index)}
                                >
                           </div>
                           </div>
                        </div>
                    ))}
                  </div>
                 </div>
                )}
            </div>
           <UploadModal
               isOpen={isModalOpen}
               onClose={() => setModalOpen(false)}
              modalTitle={`Upload ${title} Images`}
               onFilesLoaded={handleFilesLoaded}
               setLoadedFiles={setLoadedFiles}
                handleRemoveFile={handleRemoveFile}
               uploadStatuses={uploadStatuses}
               setUploadStatuses={setUploadStatuses}
              uploadUrl={uploadUrl}
            />
        </div>
    );
};