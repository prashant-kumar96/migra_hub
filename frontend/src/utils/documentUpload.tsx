// hooks/useDocumentUpload.ts
import { useState } from 'react';

interface UseDocumentUploadProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  uploadOnLoad?: boolean;
}

const useDocumentUpload = ({ onSuccess, onError , uploadOnLoad = false }: UseDocumentUploadProps = {}) => {
  const [loadedFiles, setLoadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatuses, setUploadStatuses] = useState<{ [key: string]: string }>({});
 const [isUploadingAll, setIsUploadingAll] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    setLoadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

    const uploadAllFiles = async (userId: string, uploadUrl: string, files: File[]) => {
       setIsUploadingAll(true)
        setUploading(true);
        const newUploadStatuses = { ...uploadStatuses };

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileId = file.name + Date.now(); // create unique id for each file
            newUploadStatuses[fileId] = 'uploading';
            setUploadStatuses(newUploadStatuses);

            const formData = new FormData();
            formData.append('images', file);
            formData.append('userId', userId);

            try {
                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    newUploadStatuses[fileId] = 'success';
                    setUploadStatuses(newUploadStatuses);
                } else {
                    newUploadStatuses[fileId] = 'error';
                    setUploadStatuses(newUploadStatuses);
                    onError?.(response);
                }
            } catch (error) {
                newUploadStatuses[fileId] = 'error';
                setUploadStatuses(newUploadStatuses);
                onError?.(error);
            }
        }
          setUploading(false)
         setIsUploadingAll(false)

        if(files.length > 0) {
              setLoadedFiles([]);
                setUploadStatuses({});
            onSuccess?.();
        }


    };


    const uploadFiles = async (userId: string, uploadUrl: string) => {
       return uploadAllFiles(userId, uploadUrl, loadedFiles)
    }


  const handleRemoveFile = (index: number) => {
    setLoadedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  return {
    loadedFiles,
    uploading,
    uploadStatuses,
    handleFileChange,
      uploadFiles,
      uploadAllFiles,
    handleRemoveFile,
       setLoadedFiles,
       setUploadStatuses,
        isUploadingAll,
       setIsUploadingAll
  };
};

export default useDocumentUpload;