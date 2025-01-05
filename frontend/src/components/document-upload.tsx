import { me } from "@/api/auth";
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



const DocumentUpload = ({userId}) => {
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
    const [uploadedDocuments, setUploadedDocuments] = useState<any>(null);
  const [showUploadComponents, setShowUploadComponents] = useState(true);

  console.log(";; user id", typeof userId);

  const fetchUploadedDocuments = async () => {
    try {
      console.log("fetchUploadedDocuments");
      console.log(";; user id", typeof userId);
      const response = await getSinglePassportData( userId );
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
  }, [ userId]);

  console.log(";; uploaded documents", uploadedDocuments);

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
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${doc.path}`}
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
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${doc.path}`}
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
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${doc.path}`}
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
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${doc.path}`}
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
          <PassportUploadComp userId={userId}  />
          <ProofOfFundsComp userId={userId} />
          <ProofOfTiesComp userId={userId} />
          <AdditionalDocuments userId={userId} />
        </>
      )}
    </div>
  );
};

export default AfterLoginLayout(DocumentUpload);