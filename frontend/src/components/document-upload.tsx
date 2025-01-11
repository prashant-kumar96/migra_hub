import { getApplicationStatusDetails, updateDocumentUploadStatus } from "@/api/applicationStatus";
import { checkifPaymentIsDone, me } from "@/api/auth";
import { getAdditionalDocuments, getSinglePassportData, getSingleProofOfFundsData, getSingleProofOfTiesData, getUploadedDocumentsData } from "@/api/document";
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { DocumentUploader } from "./uploader/document-uploader";


interface Member {
  //

}


const DocumentUpload = ({ userId, applicationId }: { userId: string; applicationId: string }) => {
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, DocumentUploadData | null>>({}); // Cache by memberId
  const [linkedMembers, setLinkedMembers] = useState<Member[]>([]);
  const [primaryApplicantDetails, setPrimaryApplicantDetails] = useState<PrimaryApplicant | null>(null);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const { user } = useAuth();
  const [showUploadComponents, setShowUploadComponents] = useState(true);
  const [isUploadingAll, setIsUploadingAll] = useState(false);

  const [passportFiles, setPassportFiles] = useState<File[]>([]);
  const [proofOfFundsFiles, setProofOfFundsFiles] = useState<File[]>([]);
  const [proofOfTiesFiles, setProofOfTiesFiles] = useState<File[]>([]);
  const [additionalDocFiles, setAdditionalDocFiles] = useState<File[]>([]);
  const [passportUploadStatus, setPassportUploadStatus] = useState<{ [key: string]: string }>({});
  const [proofOfFundsUploadStatus, setProofOfFundsUploadStatus] = useState<{ [key: string]: string }>({});
  const [proofOfTiesUploadStatus, setProofOfTiesUploadStatus] = useState<{ [key: string]: string }>({});
  const [additionalDocUploadStatus, setAdditionalDocUploadStatus] = useState<{ [key: string]: string }>({});
  const primaryUserId = useMemo(() => user?.user?._id, [user]);

  useEffect(() => {
      const fetchPrimaryApplicantDetails = async () => {
          try {
              const response = await getApplicationStatusDetails(applicationId);
              if (response?.data) {
                  setPrimaryApplicantDetails(response.data);
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
      fetchPrimaryApplicantDetails();
  }, [userId, applicationId]);

  const options = countryList().getData();

  const getCountryLabel = (code: string | null | undefined): string | undefined => {
      if (!code) {
          return undefined;
      }
      const country = options.find(option => option.value === code);
      return country ? country.label : undefined;
  };

  const destinationCountry = getCountryLabel(primaryApplicantDetails?.destinationCountry);
  const primaryApplicantCitizenship = getCountryLabel(primaryApplicantDetails?.citizenshipCountry?.value);


   const fetchUploadedDocuments = useCallback(async (memberId: string) => {

      try {
          const response = await getUploadedDocumentsData(memberId);
          if (response?.data?.result) {
                setUploadedDocuments((prev)=> ({...prev, [memberId]: response.data.result}));
              setShowUploadComponents(false);
          }
          else {
              setUploadedDocuments((prev) => ({ ...prev, [memberId]: null }))
              setShowUploadComponents(true);
          }
      } catch (error) {
          console.log("Error fetching files:", error);
         setUploadedDocuments((prev) => ({ ...prev, [memberId]: null }));
          setShowUploadComponents(true);
      }
  }, []);

  console.log(';; uploaded documents',uploadedDocuments);

  
   const handleFileUpload = async (userId: string, uploadUrl: string, files: File[], setUploadStatuses: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>) => {

      setIsUploadingAll(true)
      const newUploadStatuses = {};

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
  const handleUploadAll = async (memberId: string) => {
      setIsUploadingAll(true);
      try {
          const uploadPromises = [
              handleFileUpload(memberId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadPassportImages`, passportFiles, setPassportUploadStatus),
              handleFileUpload(memberId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadproofOfFundsImages`, proofOfFundsFiles, setProofOfFundsUploadStatus),
              handleFileUpload(memberId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadProofOfTiesImages`, proofOfTiesFiles, setProofOfTiesUploadStatus),
              handleFileUpload(memberId, `${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadAdditionalDocuments`, additionalDocFiles, setAdditionalDocUploadStatus),
          ];

          // Wait for all uploads to complete
          await Promise.all(uploadPromises);

          // If all promises resolve without errors, then call the update function and fetch the document data
          fetchUploadedDocuments(memberId);
          await updateDocumentUploadStatus(applicationId);


      } catch (error) {
          console.error("Error during document uploads:", error);

      } finally {
          setIsUploadingAll(false)
      }
  };
  const toggleExpand = async (memberId: string) => {
    
        // If data is already cached, update the expanded state only
         if (uploadedDocuments[memberId]) {
          setExpandedMember(expandedMember === memberId ? null : memberId);
           return;
       }
       
       // If data is not cached, then set the expanded state and fetch the document data
      setExpandedMember(expandedMember === memberId ? null : memberId);
         
       if (expandedMember !== memberId)
           await fetchUploadedDocuments(memberId);
   
  };

  const renderDocumentStatus = (status: { [key: string]: string }) => {
      if (!status) return 'Not Added';
      const allSuccess = Object.values(status).every(s => s === 'success')
      if (allSuccess) return 'Added'
      return 'Not Added'
  };

  const combinedMembers = useMemo(() => {
      return primaryApplicantDetails ? [
          {
              // _id: 'primary',
              _id: primaryApplicantDetails?.applicationStatus?._id,
              applicationId: primaryApplicantDetails.applicationStatus?.applicationId,
              passportNumber: primaryApplicantDetails.passport_number,
              name: primaryApplicantDetails.name,
              citizenshipCountry: primaryApplicantDetails.citizenshipCountry,
             relationship: 'Primary',
              destinationCountry: primaryApplicantDetails.destinationCountry
          },
          ...(linkedMembers || [])
      ] : linkedMembers;
  }, [primaryApplicantDetails, linkedMembers]);

  
  return (
      <div className="p-6 text-gray-600 w-full mx-auto">
          <h2 className="text-2xl font-bold mb-4">Application Details</h2>
          <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                  <tr>
                      <th className="py-2 px-4 border-b">Application ID</th>
                      <th className="py-2 px-4 border-b">Passport Number</th>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Citizenship</th>
                       <th className="py-2 px-4 border-b">Destination</th>
                      <th className="py-2 px-4 border-b">Relationship</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                       <th className="py-2 px-4 border-b">Document Status</th>
                  </tr>
              </thead>
              <tbody>
                  {combinedMembers?.map((member) => (
                      <React.Fragment key={member._id}>
                          <tr>
                              <td className="py-2 px-4 border-b">{member.applicationId}</td>
                              <td className="py-2 px-4 border-b">{member.passportNumber || member?.passport_number}</td>
                              <td className="py-2 px-4 border-b">{member.name}</td>
                               <td className="py-2 px-4 border-b">{member.citizenshipCountry?.label}</td>
                                <td className="py-2 px-4 border-b">{destinationCountry}</td>
                              <td className="py-2 px-4 border-b">{member.relationship}</td>
                              <td className="py-2 px-4 border-b">
                                  <button
                                      onClick={() => toggleExpand(member._id ==='primary' ? primaryUserId : member._id)}
                                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                                  >
                                      {expandedMember === (member._id ==='primary' ? primaryUserId : member._id) ? 'Collapse' : 'Expand'}
                                  </button>
                              </td>
                               <td className="py-2 px-4 border-b">{renderDocumentStatus(passportUploadStatus)}</td>
                          </tr>
                          {expandedMember === (member._id ==='primary' ? primaryUserId : member._id) && (
                              <tr>
                                  <td colSpan={9} className="p-4 bg-gray-100">
                                      <div className="p-6 text-gray-600  ">
                                          <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>

                                          {showUploadComponents && (
                                              <>
                                                   <DocumentUploader
                                                      userId={member.relationship === 'Primary' ? primaryUserId : member._id}
                                                      onUploadSuccess={()=>fetchUploadedDocuments(member.relationship === 'Primary' ? primaryUserId : member._id)}
                                                      setFiles={setPassportFiles}
                                                      files={passportFiles}
                                                      uploadStatuses={passportUploadStatus}
                                                      setUploadStatuses={setPassportUploadStatus}
                                                      title='Passport'
                                                     uploadedDocuments={uploadedDocuments[member.relationship === 'Primary' ? primaryUserId : member._id]?.passportImages}
                                                      uploadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadPassportImages`}

                                                  />
                                                  <DocumentUploader
                                                      userId={member.relationship === 'Primary' ? primaryUserId : member._id}
                                                     onUploadSuccess={()=>fetchUploadedDocuments(member.relationship === 'Primary' ? primaryUserId : member._id)}
                                                      setFiles={setProofOfFundsFiles}
                                                      files={proofOfFundsFiles}
                                                      uploadStatuses={proofOfFundsUploadStatus}
                                                       setUploadStatuses={setProofOfFundsUploadStatus}
                                                      title='Proof of Funds'
                                                      uploadedDocuments={uploadedDocuments[member.relationship === 'Primary' ? primaryUserId : member._id]?.proofOfFundsImages}
                                                      uploadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadproofOfFundsImages`}

                                                  />
                                                  <DocumentUploader
                                                      userId={member.relationship === 'Primary' ? primaryUserId : member._id}
                                                      onUploadSuccess={()=>fetchUploadedDocuments(member.relationship === 'Primary' ? primaryUserId : member._id)}
                                                      setFiles={setProofOfTiesFiles}
                                                      files={proofOfTiesFiles}
                                                      uploadStatuses={proofOfTiesUploadStatus}
                                                       setUploadStatuses={setProofOfTiesUploadStatus}
                                                      title='Proof of Ties'
                                                       uploadedDocuments={uploadedDocuments[member.relationship === 'Primary' ? primaryUserId : member._id]?.proofOfTiesImages}
                                                       uploadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadProofOfTiesImages`}

                                                  />
                                                  <DocumentUploader
                                                      userId={member.relationship === 'Primary' ? primaryUserId : member._id}
                                                      onUploadSuccess={()=>fetchUploadedDocuments(member.relationship === 'Primary' ? primaryUserId : member._id)}
                                                      setFiles={setAdditionalDocFiles}
                                                      files={additionalDocFiles}
                                                      uploadStatuses={additionalDocUploadStatus}
                                                     setUploadStatuses={setAdditionalDocUploadStatus}
                                                      title='Additional Documents'
                                                      uploadedDocuments={uploadedDocuments[member.relationship === 'Primary' ? primaryUserId : member._id]?.additionalDocuments}
                                                     uploadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}document/uploadAdditionalDocuments`}
                                                  />
                                              </>
                                          )}
                                          {showUploadComponents && (
                                              <button
                                                  onClick={() => handleUploadAll(member.relationship === 'Primary' ? primaryUserId : member._id)}
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