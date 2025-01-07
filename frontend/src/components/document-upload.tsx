import { updateDocumentUploadStatus } from "@/api/applicationStatus";
import { checkifPaymentIsDone, me } from "@/api/auth";
import { getAdditionalDocuments, getSinglePassportData, getSingleProofOfFundsData, getSingleProofOfTiesData } from "@/api/document";
import AdditionalDocuments from "@/components/AdditionalDocuments";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import PassportUploadComp from "@/components/PassportUploadComp";
import ProofOfFundsComp from "@/components/ProofOfFundsComp";
import ProofOfTiesComp from "@/components/ProofOfTies";
import { useAuth } from "@/context/auth-context";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";




const DocumentUpload = ({ userId,applicationStatusId }) => {
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [uploadedDocuments, setUploadedDocuments] = useState<any>(null);
  const [showUploadComponents, setShowUploadComponents] = useState(true);
  const [isUploadingAll , setIsUploadingAll] = useState(false)


  const [passportFiles, setPassportFiles] = useState<File[]>([]);
  const [proofOfFundsFiles, setProofOfFundsFiles] = useState<File[]>([]);
  const [proofOfTiesFiles, setProofOfTiesFiles] = useState<File[]>([]);
  const [additionalDocFiles, setAdditionalDocFiles] = useState<File[]>([]);
  const [passportUploadStatus, setPassportUploadStatus] = useState<{ [key: string]: string }>({})
  const [proofOfFundsUploadStatus, setProofOfFundsUploadStatus] = useState<{ [key: string]: string }>({})
  const [proofOfTiesUploadStatus, setProofOfTiesUploadStatus] = useState<{ [key: string]: string }>({})
    const [additionalDocUploadStatus, setAdditionalDocUploadStatus] = useState<{ [key: string]: string }>({})

  console.log(";; user id", typeof userId);

  const fetchUploadedDocuments = async () => {
    try {
      const data = await checkifPaymentIsDone(userId);

      console.log("fetchUploadedDocuments");
      console.log(";; user id", typeof userId);
      const response = await getSinglePassportData(userId);
      console.log(";; response", response?.data);

      if (response?.data?.status && response?.data?.result) {
        setUploadedDocuments({
          passportImages: response?.data?.result?.passportImages || [],
          proofOfFundsImages: response?.data?.result?.proofOfFundsImages || [],
          proofOfTiesImages: response?.data?.result?.proofOfTiesImages || [],
          additionalDocuments:
            response?.data?.result?.additionalDocuments || [],
        });
        setShowUploadComponents(false);
      } else {
        setShowUploadComponents(true);
      }
    } catch (error) {
      console.log("Error fetching files:", error);
      setShowUploadComponents(true);
    }
  };


  useEffect(() => {
    if (userId) {
      fetchUploadedDocuments();
    }
  }, [userId]);

    const handleFileUpload = async (userId:string, uploadUrl:string, files:File[], setUploadStatuses : React.Dispatch<React.SetStateAction<{ [key: string]: string }>>) => {

        setIsUploadingAll(true)
        const newUploadStatuses = { };

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileId = file.name + Date.now();
            newUploadStatuses[fileId] = 'uploading';
            setUploadStatuses(newUploadStatuses)


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
                    setUploadStatuses(newUploadStatuses)
                } else {
                  newUploadStatuses[fileId] = 'error';
                    setUploadStatuses(newUploadStatuses)
                }
            } catch (error) {
                newUploadStatuses[fileId] = 'error';
                setUploadStatuses(newUploadStatuses)
            }
        }
        setIsUploadingAll(false)
    }

  const handleUploadAll = async () => {
    await handleFileUpload(userId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadPassportImages`, passportFiles, setPassportUploadStatus);
    await handleFileUpload(userId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadproofOfFundsImages`, proofOfFundsFiles, setProofOfFundsUploadStatus);
    await handleFileUpload(userId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadProofOfTiesImages`, proofOfTiesFiles, setProofOfTiesUploadStatus);
    await handleFileUpload(userId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadAdditionalDocuments`, additionalDocFiles, setAdditionalDocUploadStatus);

      fetchUploadedDocuments();
      await updateDocumentUploadStatus(applicationStatusId)
  };

  return (
    <div className="p-6 text-gray-600">
      <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>
      {uploadedDocuments && (
        <div className="grid grid-cols-2 mx-auto">
          {/* Passport Images */}
          {uploadedDocuments?.passportImages?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Passport Images</h3>
              <div className="flex flex-wrap gap-4">
                {uploadedDocuments.passportImages.map((doc, index) => (
                  <div key={index} className=" border-2 rounded-md p-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                      alt={`passport-${index}`}
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                    <p className="text-sm mt-2">{doc.originalname}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proof of Funds Images */}
          {uploadedDocuments?.proofOfFundsImages?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Proof of Funds Images
              </h3>
              <div className="flex flex-wrap gap-4">
                {uploadedDocuments.proofOfFundsImages.map((doc, index) => (
                  <div key={index} className="border rounded-md p-2">
                    <Image
                       src={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                      alt={`proof-of-funds-${index}`}
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                    <p className="text-sm mt-2">{doc.originalname}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proof of Ties Images */}
          {uploadedDocuments?.proofOfTiesImages?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Proof of Ties Images
              </h3>
              <div className="flex flex-wrap gap-4">
                {uploadedDocuments.proofOfTiesImages.map((doc, index) => (
                  <div key={index} className="border rounded-md p-2">
                    <Image
                       src={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                      alt={`proof-of-ties-${index}`}
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                    <p className="text-sm mt-2">{doc.originalname}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Documents */}
          {uploadedDocuments?.additionalDocuments?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Additional Documents
              </h3>
              <div className="flex flex-wrap gap-4">
                {uploadedDocuments.additionalDocuments.map((doc, index) => (
                  <div key={index} className="border rounded-md p-2">
                    <Image
                       src={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                      alt={`additional-doc-${index}`}
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                    <p className="text-sm mt-2">{doc.originalname}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {showUploadComponents && (
        <>
          <PassportUploadComp
            userId={userId}
            onUploadSuccess={fetchUploadedDocuments}
            setFiles={setPassportFiles}
            files={passportFiles}
            uploadStatuses={passportUploadStatus}
             setUploadStatuses={setPassportUploadStatus}
          />
          <ProofOfFundsComp
            userId={userId}
            onUploadSuccess={fetchUploadedDocuments}
            setFiles={setProofOfFundsFiles}
            files={proofOfFundsFiles}
             uploadStatuses={proofOfFundsUploadStatus}
             setUploadStatuses={setProofOfFundsUploadStatus}
          />
          <ProofOfTiesComp
            userId={userId}
            onUploadSuccess={fetchUploadedDocuments}
            setFiles={setProofOfTiesFiles}
            files={proofOfTiesFiles}
              uploadStatuses={proofOfTiesUploadStatus}
                setUploadStatuses={setProofOfTiesUploadStatus}
          />
          <AdditionalDocuments
            userId={userId}
            onUploadSuccess={fetchUploadedDocuments}
            setFiles={setAdditionalDocFiles}
            files={additionalDocFiles}
             uploadStatuses={additionalDocUploadStatus}
             setUploadStatuses={setAdditionalDocUploadStatus}
          />
        </>
      )}
        {showUploadComponents && (
              <button
                  onClick={handleUploadAll}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                   disabled={isUploadingAll}
              >
                {isUploadingAll ? "Uploading All" : "Upload All"}
              </button>
          )}
    </div>
  );
};

export default AfterLoginLayout(DocumentUpload);