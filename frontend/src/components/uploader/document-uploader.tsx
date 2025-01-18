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
    const isPreviouslyUploaded = !!(uploadedDocuments && uploadedDocuments.length > 0)

    console.log(';;; uploaded docs any', uploadedDocuments )
    console.log(';;; is previously uploade',isPreviouslyUploaded)

    const handleFilesLoaded = (loadedFiles: File[]) => {
        setFiles(loadedFiles);
        setLoadedFiles(loadedFiles);
    };
    console.log(';;; uplaoded documents in uploader', uploadedDocuments);
    
    return (
        <div className="p-6">
            {isPreviouslyUploaded ? (
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
                        {`${title} already uploaded`}
                    </span>
                    <div className="flex flex-wrap gap-4">
                        {uploadedDocuments?.map((doc, index) => (
                            <div key={index} className="border rounded-md p-2">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                                    alt={`${title}-${index}`}
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                />
                                <p className="text-sm mt-2">{doc.originalname}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-gray-100 border text-black hover:text-white hover:bg-blue-600 my-2  py-2 px-4 rounded"
                    >
                        Click to Upload {title}
                    </button>
                    {files.map((file, index) => (
                        <div key={index} className="mb-4  relative flex justify-between gap-4 items-center">
                            <div className="w-fit">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`upload-${index}`}
                                    width={400}
                                    height={400}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                {uploadStatuses[file.name + Date.now()] === 'uploading' && (
                                    <span>Uploading</span>
                                )}
                                {uploadStatuses[file.name + Date.now()] === 'success' && (
                                    <span>Success</span>
                                )}
                                {uploadStatuses[file.name + Date.now()] === 'error' && (
                                    <span>Error</span>
                                )}
                                <div
                                    className="absolute right-0 cursor-pointer"
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