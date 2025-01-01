import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { meDataAtom } from "@/store/meDataAtom";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth-context";
import { getPersonalData } from "@/api/personalData";
import { getSingleVisaData } from "@/api/visaData";
import { getAdditionalDocuments, getSinglePassportData, getSingleProofOfFundsData, getSingleProofOfTiesData } from "@/api/document";


interface VisaStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisaStatusModal: React.FC<VisaStatusModalProps> = ({
    isOpen,
    onClose,
  }) => {
    const { user } = useAuth();
    const [personalDataStatus, setPersonalDataStatus] = useState(false);
    const [visaDataStatus, setVisaDataStatus] = useState(false);
    const [documentDataStatus, setDocumentDataStatus] = useState(false);
    const [sharedMedata] = useAtom(meDataAtom);
    const router = useRouter();
    const [familyMembers, setFamilyMembers] = useState<any[]>([]);
    const [paymentStatus, setPaymentStatus] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        if (!user?.user?._id) return;
  
        try {
          const personalData = await getPersonalData(user?.user?._id);
          setPersonalDataStatus(personalData?.status === 200);
  
          const visaData = await getSingleVisaData(user?.user?.visaDataId);
          setVisaDataStatus(visaData?.status === 200);
  
          // Check if any document data exists
          const passportData = await getSinglePassportData({
            userId: user?.user?._id,
          });
          const proofOfFundsData = await getSingleProofOfFundsData({
            userId: user?.user?._id,
          });
          const proofOfTiesData = await getSingleProofOfTiesData({
            userId: user?.user?._id,
          });
          const additionalDocuments = await getAdditionalDocuments({
            userId: user?.user?._id,
          });
  
          setDocumentDataStatus(
            passportData?.status === 200 ||
              proofOfFundsData?.status === 200 ||
              proofOfTiesData?.status === 200 ||
              additionalDocuments?.status === 200
          );
          setPaymentStatus(user?.user?.isStripePaymentDone);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [user?.user?._id, user?.user?.visaDataId, user?.user?.isStripePaymentDone]);
  
    const handleAddFamilyMember = () => {
      setFamilyMembers((prev) => [...prev, {}]);
    };
  
    const handleFamilyMemberChange = (index: number, field: string, value: any) => {
      setFamilyMembers((prev) => {
        const updatedMembers = [...prev];
        updatedMembers[index] = { ...updatedMembers[index], [field]: value };
        return updatedMembers;
      });
    };
  
    const handleRemoveFamilyMember = (index: number) => {
      setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
    };
  
    const handleApplyForFamilyMember = async (member: any) => {
      // Implement logic to create a new application for the family member
      // This might involve creating new visaData, personalData, and document entries
      console.log("Applying for family member:", member);
      router.push("/riskassessment");
    };
  
    return (
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Visa Application Status
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700">
                        Application Stages:
                      </h4>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              visaDataStatus ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></span>
                          Risk Assessment
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              personalDataStatus ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></span>
                          Profile Completion
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              paymentStatus ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></span>
                          Payment
                        </li>
                        <li className="flex items-center">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              documentDataStatus ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></span>
                          Uploading Documents
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">
                        Apply for Family Members:
                      </h4>
                      {familyMembers.map((member, index) => (
                        <div
                          key={index}
                          className="border p-4 rounded-md mt-2 relative"
                        >
                          <button
                            onClick={() => handleRemoveFamilyMember(index)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                          >
                            X
                          </button>
                          <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Name:
                            </label>
                            <input
                              type="text"
                              value={member.name || ""}
                              onChange={(e) =>
                                handleFamilyMemberChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Email:
                            </label>
                            <input
                              type="email"
                              value={member.email || ""}
                              onChange={(e) =>
                                handleFamilyMemberChange(
                                  index,
                                  "email",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <button
                            onClick={() => handleApplyForFamilyMember(member)}
                            className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Apply
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddFamilyMember}
                        className="mt-4 inline-flex items-center rounded-md border border-transparent bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Add Family Member
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };
  
  export default VisaStatusModal;