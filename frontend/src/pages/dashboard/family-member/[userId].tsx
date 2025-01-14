import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getSingleVisaData } from "@/api/visaData";
import { getPersonalData } from "@/api/personalData";
import { getUploadedDocumentsData } from "@/api/document";
import { getFamilyMemberApplicationDetails } from "@/api/familyMember"; // Updated import
 import Link from "next/link";
import { RiSlowDownFill } from "react-icons/ri";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import Loader from "@/components/loaders/loader";
import PersonalInfo from "@/components/PersonalInfo";
import DocumentUpload from "@/components/document-upload";

const FamilyMemberDetails = () => {
    const router = useRouter();
    const { userId, visaDataId,name,email } = router.query; // Use the actual query params
    const [loading, setLoading] = useState(true);
     const [familyMember, setFamilyMember] = useState<any>(null);
     const [visaData, setVisaData] = useState<any>(null);
     const [personalData, setPersonalData] = useState<any>(null);
    const [documents, setDocuments] = useState<any>(null);
    
    console.log(';; member id',router.query)

    useEffect(() => {
    const fetchFamilyMemberDetails = async () => {
        try {
              setLoading(true);
          if (!userId) {
              setLoading(false);
            return;
            }

           const familyMemberResponse = await getFamilyMemberApplicationDetails(userId);
              console.log("familyMemberResponse::", familyMemberResponse.data)
               if(familyMemberResponse.data){
                   setFamilyMember(familyMemberResponse.data.familyMember)
               }

             if(familyMemberResponse?.data?.familyMember?.visaDataId?._id){
                const resultVisaData = await getSingleVisaData(familyMemberResponse?.data?.familyMember?.visaDataId?._id);
                  console.log("resultVisaData::", resultVisaData)
                   if(resultVisaData?.data){
                    setVisaData(resultVisaData);
                }

             }

             if(userId) {
                   const personalDataResult = await getPersonalData(userId);
                     if(personalDataResult){
                         setPersonalData(personalDataResult)
                      }

                }

               if(userId) {
                const documentData = await getUploadedDocumentsData(userId);
                if(documentData?.status) {
                    setDocuments(documentData?.data)
                }else{
                    setDocuments([])
                }
             }

         } catch(err){
             console.log("error fetching application details:", err)
         } finally {
            setLoading(false);
         }
    }
      fetchFamilyMemberDetails();
   }, [userId]);


   const visaAssessmentDetails =
   visaData && Object.keys(visaData).length > 0
       ? Object.entries(visaData).reduce((acc, [key, value]) => {
             if (key === 'createdAt' || key === 'updatedAt' || key === '__v' || key === '_id') {
                 return acc; // Skip these fields
             }
             if(typeof value === 'object' && value !== null){
                 Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                     let displayValue = nestedValue;
                       if (typeof nestedValue === 'object' && nestedValue !== null && 'label' in nestedValue) {
                           displayValue = nestedValue.label;
                       }else if(typeof nestedValue === 'boolean'){
                           displayValue = nestedValue ? "Yes" : "No"
                       }
                       const title = nestedKey.replace(/([A-Z])/g, ' $1').trim();
                       acc.push({ title, value:displayValue });
                 })
             } else {
                 let displayValue = value;
                 if(typeof value === 'boolean'){
                     displayValue = value ? "Yes" : "No"
                 }
                 const title = key.replace(/([A-Z])/g, ' $1').trim();
                 acc.push({ title, value:displayValue });
             }

           return acc
       },[] )
       : [];


console.log(';; visa assessment details',visaAssessmentDetails)



    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader text='Loading..' />
            </div>
        );
    }



    return (
        <div className="max-w-5xl mx-auto p-6">
            <Tabs>
                <TabList className="flex mb-6 border-b border-gray-200">
                    <Tab className="py-2 text-gray-700 px-4 cursor-pointer border-b-2 border-transparent hover:border-Indigo focus:outline-none">
                       Risk Assessment
                    </Tab>
                     <Tab className="py-2 text-gray-700 px-4 cursor-pointer border-b-2 border-transparent hover:border-Indigo focus:outline-none">
                        Profile
                    </Tab>
                    {/* <Tab className="py-2 px-4 text-gray-700 cursor-pointer border-b-2 border-transparent hover:border-Indigo focus:outline-none">
                        Payment
                    </Tab> */}
                      <Tab className="py-2 px-4 text-gray-700 cursor-pointer border-b-2 border-transparent hover:border-Indigo focus:outline-none">
                        Documents
                    </Tab>
                </TabList>
                 <TabPanel>
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-bold text-Indigo mb-6 text-center">
                                Risk Assessment Details
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {visaAssessmentDetails?.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-4 rounded-md border border-gray-200"
                                    >
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2">
                                            {detail.title}
                                        </h3>
                                        <p className="text-lg text-gray-500 font-medium">
                                            {detail.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                         </div>
                      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <h2 className="text-2xl font-bold text-Indigo mb-4">
                            Travel Visa Denial Risk
                           </h2>
                            <div className="flex items-center justify-center gap-2 mb-4">
                              <RiSlowDownFill className="text-green-500" size={24} />
                              <span className="text-xl font-medium">Low</span>
                             </div>
                          <p className="text-lg text-gray-600 italic mb-6">
                             But our service gets your risk even lower
                         </p>
                           <Link
                                href={`/dashboard/profile?userId=${userId}`}
                                className="inline-flex items-center tracking-widest px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
                           >
                                Complete Profile and Payment
                              <svg
                                    className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                 >
                                  <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                       strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                   />
                                </svg>
                           </Link>
                        </div>

                    </TabPanel>
                <TabPanel>
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-bold text-Indigo mb-6 text-center">
                                Profile Details
                            </h2>
                            <PersonalInfo visaDataId={visaDataId} 
                                          userEmail={email} 
                                          userName={name} 
                                          userId = {userId} />

                            {/* <div className="grid md:grid-cols-2 gap-6">
                               {personalData &&  Object.keys(personalData || {}).length > 0 && Object.entries(personalData)?.map(([key, value]) => {
                                  if (key === 'createdAt' || key === 'updatedAt' || key === '__v' || key === '_id' || key === 'userId') {
                                        return null; // Skip these fields
                                  }
                                 let displayValue = value;
                                    if (typeof value === 'object' && value !== null && 'label' in value) {
                                        displayValue = value.label;
                                      }else if(typeof value === 'boolean'){
                                          displayValue = value ? "Yes" : "No"
                                      } else if (value instanceof Date) {
                                          displayValue = value.toLocaleDateString()
                                      }
                                 const title = key.replace(/([A-Z])/g, ' $1').trim();

                                  return (
                                    <div
                                      key={key}
                                      className="bg-gray-50 p-4 rounded-md border border-gray-200"
                                    >
                                        <h3 className="text-sm font-semibold text-gray-600 mb-2">{title}</h3>
                                        <p className="text-lg text-Indigo font-medium">{displayValue}</p>
                                    </div>
                                  );
                                })}
                            </div> */}
                        </div>

                 <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                      <h2 className="text-2xl font-bold text-Indigo mb-4">
                         Complete Your Profile
                      </h2>

                      <p className="text-lg text-gray-600 italic mb-6">
                           Complete the profile to continue
                       </p>
                        <Link
                            href={`/dashboard/profile?userId=${userId}`}
                            className="inline-flex items-center tracking-widest px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
                       >
                         Complete Profile and Payment
                        <svg
                                 className="w-4 h-4 ml-2"
                                  fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                             >
                              <path
                                     strokeLinecap="round"
                                    strokeLinejoin="round"
                                   strokeWidth={2}
                                     d="M9 5l7 7-7 7"
                                   />
                            </svg>
                      </Link>
                  </div>
                </TabPanel>
                {/* <TabPanel>
                     <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
                            <h2 className="text-2xl font-bold text-Indigo mb-6 text-center">
                                Payment Status
                            </h2>
                            {
                              familyMember?.applicationStatusId?.payment === 'completed' ? (
                                  <div className="flex items-center justify-center gap-2 mb-4">
                                      <span className="text-xl font-medium text-green-600">Payment Completed</span>
                                   </div>
                                ) : (
                                   <div className="flex items-center justify-center gap-2 mb-4">
                                     <span className="text-xl font-medium text-red-600">Payment Pending</span>
                                    </div>
                                )
                           }
                             <p className="text-lg text-gray-600 italic mb-6">
                                 Please complete payment to continue
                             </p>
                            <Link
                                 href={`/dashboard/payment?userId=${userId}`}
                                className="inline-flex items-center tracking-widest px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
                           >
                            Complete Payment
                              <svg
                                  className="w-4 h-4 ml-2"
                                  fill="none"
                                   stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                 <path
                                         strokeLinecap="round"
                                       strokeLinejoin="round"
                                      strokeWidth={2}
                                     d="M9 5l7 7-7 7"
                                 />
                            </svg>
                             </Link>
                          </div>
                </TabPanel> */}

                <TabPanel>
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-Indigo mb-6 text-center">
                            Uploaded Documents
                        </h2>
                        <DocumentUpload userId={userId} />
                       {/* {documents && Object.keys(documents).length > 0 ? (
                             Object.entries(documents)?.map(([key, value]) => {
                                if (key === 'createdAt' || key === 'updatedAt' || key === '__v' || key === '_id' ||  value === null) {
                                    return null
                                }
                                const title = key.replace(/([A-Z])/g, ' $1').trim();

                               return (
                                  <div key={key}>
                                     <h3 className="text-sm font-semibold text-gray-600 mb-2 capitalize">
                                         {title}
                                    </h3>
                                    {Array.isArray(value) && value.length > 0 ?
                                          <ul className='list-disc pl-4'>
                                            {value.map((image, index) => (
                                                <li key={index}>
                                                    <a href={image} target='_blank' className='text-Indigo underline'>{image}</a>
                                                </li>
                                                ))}
                                          </ul>
                                          :   <p className="text-lg text-gray-600 italic mb-6">
                                               No document Uploaded Yet
                                          </p>
                                    }
                                  </div>
                                  )
                             } )
                         ) : (
                         <p className="text-lg text-gray-600 italic mb-6">
                                 No document Uploaded Yet
                             </p>
                             )} */}
                    </div>
                     <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                         <h2 className="text-2xl font-bold text-Indigo mb-4">
                            Upload Documents
                         </h2>

                         <p className="text-lg text-gray-600 italic mb-6">
                              Please upload all the document to continue
                        </p>
                        <Link
                             href={`/dashboard/documents?userId=${userId}`}
                                className="inline-flex items-center tracking-widest px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
                        >
                             Upload Documents
                            <svg
                                className="w-4 h-4 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                             >
                               <path
                                   strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                     d="M9 5l7 7-7 7"
                                  />
                             </svg>
                        </Link>
                     </div>
                </TabPanel>

            </Tabs>
        </div>
    );
};

export default AfterLoginLayout(FamilyMemberDetails);