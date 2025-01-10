import { getApplicationStatusDetails, updateDocumentUploadStatus } from "@/api/applicationStatus";
import { checkifPaymentIsDone, me } from "@/api/auth";
import { getAdditionalDocuments, getSinglePassportData, getSingleProofOfFundsData, getSingleProofOfTiesData } from "@/api/document";
import { getLinkedFamilyMembers } from "@/api/familyMember";
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




const DocumentUpload = ({ userId,applicationId }) => {
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [uploadedDocuments, setUploadedDocuments] = useState<any>(null);
const [linkedMembers, setLinkedMembers] = useState<Member[]>([]);
const [primaryApplicantDetails, setPrimaryApplicantDetails] = useState<any>();
const [expandedMember, setExpandedMember] = useState<string | null>(null);

  const [showUploadComponents, setShowUploadComponents] = useState(true);
  const [isUploadingAll, setIsUploadingAll] = useState(false);


  const [passportFiles, setPassportFiles] = useState<File[]>([]);
  const [proofOfFundsFiles, setProofOfFundsFiles] = useState<File[]>([]);
  const [proofOfTiesFiles, setProofOfTiesFiles] = useState<File[]>([]);
  const [additionalDocFiles, setAdditionalDocFiles] = useState<File[]>([]);
  const [passportUploadStatus, setPassportUploadStatus] = useState<{ [key: string]: string }>({})
  const [proofOfFundsUploadStatus, setProofOfFundsUploadStatus] = useState<{ [key: string]: string }>({})
  const [proofOfTiesUploadStatus, setProofOfTiesUploadStatus] = useState<{ [key: string]: string }>({})
  const [additionalDocUploadStatus, setAdditionalDocUploadStatus] = useState<{ [key: string]: string }>({})
  
useEffect(() => {
 const fetchPrimaryApplicantDetails = async () => {
    try {
      const response = await getApplicationStatusDetails(applicationId  );
      if (response?.data?.applicationStatus) {
        setPrimaryApplicantDetails(response.data.applicationStatus);
      
      }
    } catch (error) {
      console.error('Error fetching primary applicant details:', error);
    }
  };
    const fetchLinkedMembers = async () => {
      try {
        const response = await getLinkedFamilyMembers(userId);
        if (response?.data?.familyMembers) {
          setLinkedMembers(response.data.familyMembers);
         
        }
      } catch (error) {
        console.error('Error fetching linked members:', error);
      }
    };

    fetchLinkedMembers();
    fetchPrimaryApplicantDetails()
}, [userId, applicationId]);


console.log(';; primary appliant details', primaryApplicantDetails)
console.log(';; linked members',linkedMembers)

const fetchUploadedDocuments = async (id:string) => {
    try {
        const data = await checkifPaymentIsDone(id);

        const response = await getSinglePassportData(id);

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
          fetchUploadedDocuments(userId);
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

  const handleUploadAll = async (memberId:string) => {

      await handleFileUpload(memberId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadPassportImages`, passportFiles, setPassportUploadStatus);
      await handleFileUpload(memberId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadproofOfFundsImages`, proofOfFundsFiles, setProofOfFundsUploadStatus);
      await handleFileUpload(memberId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadProofOfTiesImages`, proofOfTiesFiles, setProofOfTiesUploadStatus);
      await handleFileUpload(memberId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadAdditionalDocuments`, additionalDocFiles, setAdditionalDocUploadStatus);


      fetchUploadedDocuments(memberId);
      await updateDocumentUploadStatus(applicationId)

  };


const toggleExpand = (memberId: string) => {
  setExpandedMember(expandedMember === memberId ? null : memberId);
    if(expandedMember !== memberId)
     fetchUploadedDocuments(memberId)
};

  const renderDocumentStatus = (status: { [key: string]: string }) => {
      if (!status) return 'Not Added';
    const allSuccess = Object.values(status).every(s => s === 'success')
    if(allSuccess) return 'Added'
    return  'Not Added'
  };

return (
  <div className="p-6 text-gray-600 w-full  mx-auto">
    <h2 className="text-2xl font-bold mb-4">Linked Members</h2>
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-2 px-4 border-b">Application ID</th>
          <th className="py-2 px-4 border-b">Passport Number</th>
          <th className="py-2 px-4 border-b">First Name</th>
          <th className="py-2 px-4 border-b">Last Name</th>
          <th className="py-2 px-4 border-b">Citizenship</th>
          <th className="py-2 px-4 border-b">Destination</th>
          <th className="py-2 px-4 border-b">Relationship</th>
          <th className="py-2 px-4 border-b">Actions</th>
          <th className="py-2 px-4 border-b">Document Status</th>
        </tr>
      </thead>
      <tbody>
        {linkedMembers?.map((member) => (
          <React.Fragment key={member.id}>
            <tr>
              <td className="py-2 px-4 border-b">{member.applicationId}</td>
              <td className="py-2 px-4 border-b">{member.passportNumber}</td>
              <td className="py-2 px-4 border-b">{member.firstName}</td>
              <td className="py-2 px-4 border-b">{member.lastName}</td>
              <td className="py-2 px-4 border-b">{member.citizenship}</td>
              <td className="py-2 px-4 border-b">{member.destination}</td>
              <td className="py-2 px-4 border-b">{member.relationship}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => toggleExpand(member.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                >
                  {expandedMember === member.id ? 'Collapse' : 'Expand'}
                </button>
              </td>
                <td className="py-2 px-4 border-b">{renderDocumentStatus(passportUploadStatus)}</td>
            </tr>
            {expandedMember === member.id && (
              <tr>
                <td colSpan={9} className="p-4 bg-gray-100">
                   <div className="p-6 text-gray-600  ">
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
                                   userId={member.id}
                                   onUploadSuccess={()=>fetchUploadedDocuments(member.id)}
                                   setFiles={setPassportFiles}
                                   files={passportFiles}
                                   uploadStatuses={passportUploadStatus}
                                    setUploadStatuses={setPassportUploadStatus}
                               />
                               <ProofOfFundsComp
                                   userId={member.id}
                                    onUploadSuccess={()=>fetchUploadedDocuments(member.id)}
                                   setFiles={setProofOfFundsFiles}
                                   files={proofOfFundsFiles}
                                   uploadStatuses={proofOfFundsUploadStatus}
                                     setUploadStatuses={setProofOfFundsUploadStatus}
                               />
                               <ProofOfTiesComp
                                   userId={member.id}
                                    onUploadSuccess={()=>fetchUploadedDocuments(member.id)}
                                   setFiles={setProofOfTiesFiles}
                                   files={proofOfTiesFiles}
                                     uploadStatuses={proofOfTiesUploadStatus}
                                      setUploadStatuses={setProofOfTiesUploadStatus}
                               />
                               <AdditionalDocuments
                                   userId={member.id}
                                   onUploadSuccess={()=>fetchUploadedDocuments(member.id)}
                                   setFiles={setAdditionalDocFiles}
                                   files={additionalDocFiles}
                                   uploadStatuses={additionalDocUploadStatus}
                                    setUploadStatuses={setAdditionalDocUploadStatus}
                               />
                           </>
                       )}
                       {showUploadComponents && (
                           <button
                               onClick={()=>handleUploadAll(member.id)}
                               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                 disabled={isUploadingAll}
                           >
                               {isUploadingAll ? "Uploading All" : "Upload All"}
                           </button>
                       )}
                   </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default DocumentUpload;