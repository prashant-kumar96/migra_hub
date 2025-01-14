import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AfterLoginLayout from '@/components/afterLoginLayout/AfterLoginLayout';
import { getApplicationDetails } from '@/api/applicationStatus';
import Image from 'next/image';
import { saveAs } from 'file-saver';
import Loader from '@/components/loaders/loader';

interface Document {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

interface Documents {
    additionalDocuments?: Document[];
    passportImages?: Document[];
    proofOfFundsImages?: Document[];
    proofOfTiesImages?: Document[];
}


interface ApplicationData {
    primaryApplicant?: {
        documents?: Documents;
        personalData: any;
        visaDataId: any;
        email: string
    };
    familyMembers?: any[]
}

function ApplicationDetails() {
    const { query } = useRouter();
    const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
    const [loading, setLoading] = useState(true);
    console.log(';; query id', query)
    useEffect(() => {
        const fetchApplicationDetails = async () => {
            if (!query?.id && !query?.applicationId) return;
            try {
                const response = await getApplicationDetails(query?.id || query?.applicationId);
                setApplicationData(response.data);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicationDetails();
    }, [query?.id]);

    if (loading) return <div><Loader text='' /></div>;

    const { primaryApplicant, familyMembers } = applicationData || {};

    const handleDownload = async (path: string, originalname: string) => {
      try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
            const blob = await response.blob();
            saveAs(blob, originalname);

      } catch(error){
        console.error('error downloading file', error);
      }
   };
  const renderDocuments = (documents: Documents | undefined, title: string) => {
        if (!documents) {
            return <p className="text-gray-600">No {title} documents uploaded.</p>;
        }

        const allDocuments = Object.values(documents).filter(Boolean).flat();
      if(allDocuments.length ===0) {
           return <p className="text-gray-600">No {title} documents uploaded.</p>;
      }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allDocuments.map((doc: any, index: number) => (
                    <div key={`${title}-${index}`} className="border rounded-md p-2 relative">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${doc.path}`}
                            alt={`${title}-${index}`}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                        <p className="text-sm mt-2 text-gray-600">{doc.originalname}</p>
                       <button
                             onClick={() => handleDownload(doc.path, doc.originalname)}
                               className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md text-xs"
                         >
                           Download
                         </button>
                    </div>
                ))}
            </div>
        );
    };



    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Primary Applicant Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 ">Primary Applicant Details</h2>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                            <div className="space-y-3 ">
                                <p><span className="font-medium text-gray-700">Name:</span> <span className="text-gray-500 text-sm"> {primaryApplicant?.personalData?.first_name} {primaryApplicant?.personalData?.last_name}</span></p>
                                <p><span className="font-medium text-gray-700">Email:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.email}</span></p>
                                <p><span className="font-medium text-gray-700">Phone:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.phoneNumber || 'Not Provided'}</span></p>
                                <p><span className="font-medium text-gray-700">Gender:</span><span className="text-gray-500 text-sm"> {primaryApplicant?.personalData?.gender}</span></p>
                                <p><span className="font-medium text-gray-700">Marital Status:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.marital_status}</span></p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Documents</h3>
                            <div className="space-y-3 ">
                                <p><span className="font-medium text-gray-700">Passport Number:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.passport_number}</span></p>
                                <p><span className="font-medium text-gray-700">Passport Expiry:</span> <span className="text-gray-500 text-sm">{new Date(primaryApplicant?.personalData?.passport_expiry).toLocaleDateString()}</span></p>
                                <p><span className="font-medium text-gray-700">Citizenship:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.citizenshipCountry?.label}</span></p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                            <div className="space-y-3 ">
                                <p><span className="font-medium text-gray-700">Address:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.addressLine}</span></p>
                                <p><span className="font-medium text-gray-700">City:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.addressData?.city}</span></p>
                                <p><span className="font-medium text-gray-700">State:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.addressData?.state}</span></p>
                                <p><span className="font-medium text-gray-700">Country:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.addressData?.country}</span></p>
                                <p><span className="font-medium text-gray-700">Zip Code:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.personalData?.zipCode}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Visa Details</h3>
                            <div className="space-y-3 ">
                                <p><span className="font-medium text-gray-700">Destination Country:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.visaDataId?.destinationCountry}</span></p>
                                <p><span className="font-medium text-gray-700">Applying From:</span> <span className="text-gray-500 text-sm">{primaryApplicant?.visaDataId?.whereWillYouApplyForYourVisa?.label}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Documents</h3>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-500 text-sm mb-2">Passport Images</h4>
                            {renderDocuments(primaryApplicant?.documents?.passportImages, 'Passport')}
                        </div>
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-500 text-sm mb-2">Proof Of Funds Images</h4>
                            {renderDocuments(primaryApplicant?.documents?.proofOfFundsImages, 'Proof of Funds')}
                        </div>
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-500 text-sm mb-2">Proof Of Ties Images</h4>
                            {renderDocuments(primaryApplicant?.documents?.proofOfTiesImages, 'Proof of Ties')}
                        </div>
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-500 text-sm mb-2">Additional Documents</h4>
                            {renderDocuments(primaryApplicant?.documents?.additionalDocuments, 'Additional Documents')}
                        </div>
                    </div>

                </div>
            </div>

            {/* Linked Members Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 ">Linked Family Members ({familyMembers?.length || 0})</h2>
                <div className="space-y-4">
                    {familyMembers?.map((member: any, index: number) => (
                        <div key={member._id} className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Member {index + 1} - {member.relationship.charAt(0).toUpperCase() + member.relationship.slice(1)}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3 ">
                                    <p><span className="font-medium text-gray-700">Name:</span> <span className="text-gray-500 text-sm">{member.name}</span></p>
                                    <p><span className="font-medium text-gray-700">Email:</span> <span className="text-gray-500 text-sm">{member.email}</span></p>
                                    <p><span className="font-medium text-gray-700">Phone:</span> <span className="text-gray-500 text-sm">{member.personalData?.phoneNumber || 'Not provided'}</span></p>
                                    <p><span className="font-medium text-gray-700">Passport Number:</span> <span className="text-gray-500 text-sm">{member.personalData?.passport_number}</span></p>
                                    <p><span className="font-medium text-gray-700">Passport Expiry:</span> <span className="text-gray-500 text-sm">{new Date(member.personalData?.passport_expiry).toLocaleDateString()}</span></p>
                                    <p><span className="font-medium text-gray-700">Citizenship:</span> <span className="text-gray-500 text-sm">{member.personalData?.citizenshipCountry?.label}</span></p>
                                </div>
                                <div className="space-y-3 ">
                                    <p><span className="font-medium text-gray-700">Document Status:</span> <span className="text-gray-500 text-sm">{member.documents ? 'Uploaded' : 'Pending'}</span></p>
                                    <p><span className="font-medium text-gray-700">Visa Previously Denied:</span> <span className="text-gray-500 text-sm">{member.visaDataId?.deniedVisaToAnyCountry ? 'Yes' : 'No'}</span></p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Documents</h3>

                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold text-gray-500 text-sm mb-2">Passport Images</h4>
                                    {renderDocuments(member?.documents?.passportImages, 'Passport')}
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold text-gray-500 text-sm mb-2">Proof Of Funds Images</h4>
                                    {renderDocuments(member?.documents?.proofOfFundsImages, 'Proof of Funds')}
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold text-gray-500 text-sm mb-2">Proof Of Ties Images</h4>
                                    {renderDocuments(member?.documents?.proofOfTiesImages, 'Proof of Ties')}
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold text-gray-500 text-sm mb-2">Additional Documents</h4>
                                    {renderDocuments(member?.documents?.additionalDocuments, 'Additional Documents')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AfterLoginLayout(ApplicationDetails);