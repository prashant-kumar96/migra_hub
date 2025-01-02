import React, { useEffect, useState } from "react";
import { me } from "@/api/auth";
import { getSingleVisaData } from "@/api/visaData";
import { useAtom } from "jotai";
import { meDataAtom } from "@/store/meDataAtom";
import { TfiControlForward } from "react-icons/tfi";
import Link from "next/link";
import { RiSlowDownFill } from "react-icons/ri";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import Loader from "@/components/loaders/loader";
import Stepper from "@/components/Stepper";
import { useAuth } from "@/context/auth-context";
import TravelPlan from "@/components/TravelPlan";
import { visaDataAtom } from "@/store/visaDataAtom";
import AddFamilyMemberModal from "@/components/modal/add-family-member-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";

interface FamilyMember {
  _id: string;
  name:string;
  email: string;
  visaDataId: {};
  applicationStatusId: {
      riskAssessment: string;
      profileCompletion: string;
      payment: string;
      documentUpload: string;
  };
}

const Dashboard = () => {
  const [visaData, setVisaData] = useState(""); // restore visaData local state
  const [primaryApplicant, setPrimaryApplicant] = useState<any>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [sharedState, setSharedState] = useAtom(visaDataAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string| null>(null);


  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
      setSelectedMemberId(null)
  };

  const fetchPrimaryApplicantData = async () => { // created a new method to get data
      try {
          setLoading(true);

          if (!user?.user?.visaDataId) {
              setLoading(false);
              return;
          }

          const resultVisaData = await getSingleVisaData(user.user.visaDataId);
           if (resultVisaData?.data) {
            setVisaData(resultVisaData.data);
              setPrimaryApplicant({...user.user, visaDataId: resultVisaData.data}); // update primary applicant info with data from getSingleVisaData
          }
      } catch(err) {
          console.error("Error during primary applicant data fetching", err);
      }
  };

  const fetchFamilyMembers = async () => {
      try {
          setLoading(true);
          if (!user?.user?.id) {
              setLoading(false);
              return;
          }
          const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
              {
                  headers: {
                      Authorization: `Bearer ${user.token}`,
                  },
              }
          );
          console.log("family members response", response.data)

          if(response.data){
              setFamilyMembers(response?.data?.familyMembers);
          }


      } catch(err) {
          console.error("Error during family members fetching", err);
      }
  };


  useEffect(() => {
      Promise.all([fetchPrimaryApplicantData(), fetchFamilyMembers()]).finally(()=> {
          setLoading(false)
      })
  }, [user]);


  const handleAddFamilyMember = async (familyMemberData:any) => {
      try {

          const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/add-family-member`,
              familyMemberData,
              {
                  headers: {
                      Authorization: `Bearer ${user.token}`,
                  },
              }
          );
          if(response.data){
            toast.success(response.data.message)
              Promise.all([fetchPrimaryApplicantData(), fetchFamilyMembers()]).finally(()=> {
               closeModal()
              })
          }

      } catch(err:any){
          console.log("error adding family members", err)
        toast.error(err?.response?.data?.message)
      }
  }


  const hasValidVisaData = () => {
    return  visaData && Object.keys(visaData).length > 0;
     };


  if (loading || isLoading) {
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
                      Primary Applicant
                  </Tab>
                  <Tab className="py-2 px-4 text-gray-700 cursor-pointer border-b-2 border-transparent hover:border-Indigo focus:outline-none">
                      Family Members
                  </Tab>
              </TabList>

              <TabPanel>
                  {hasValidVisaData() ? (
                      <>
                          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                              <h2 className="text-2xl font-bold text-Indigo mb-6 text-center">
                                  Risk Assessment Details
                              </h2>
                              <div className="grid md:grid-cols-2 gap-6">
                                  { primaryApplicant && Object.keys(primaryApplicant?.visaDataId || {}).length > 0 && Object.entries(primaryApplicant.visaDataId)?.map(([key, value]) => {
                                          if (key === 'createdAt' || key === 'updatedAt' || key === '__v' || key === '_id') {
                                              return null; // Skip these fields
                                          }


                                          let displayValue = value;
                                            if (typeof value === 'object' && value !== null && 'label' in value) {
                                            displayValue = value.label;
                                        }else if(typeof value === 'boolean'){
                                             displayValue = value ? "Yes" : "No"
                                        }


                                          const title = key.replace(/([A-Z])/g, ' $1').trim();

                                          return (
                                              <div key={key} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                                  <h3 className="text-sm font-semibold text-gray-600 mb-2">{title}</h3>
                                                  <p className="text-lg text-Indigo font-medium">{displayValue}</p>
                                              </div>
                                          )
                                  })}
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
                                  href="/dashboard/profile"
                                  className="inline-flex items-center tracking-widest px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
                              >
                                  Complete Profile
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
                      </>
                  ) : (
                      <TravelPlan />
                  )}
              </TabPanel>

              <TabPanel>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                          <h2 className="text-2xl font-bold text-Indigo">
                              Family Members
                          </h2>
                          <button
                              onClick={openModal}
                              className="bg-Indigo text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                          >
                              Add Family Member
                          </button>

                      </div>
                      {familyMembers.length > 0 ? (
                          <ul className="space-y-4">
                              {familyMembers.map((member) => (
                                  <li key={member._id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                      <div className="flex justify-between items-center">
                                          <div>
                                              <h3 className="text-lg font-semibold text-Indigo mb-1">{member.name}</h3>
                                              <p className='text-sm text-gray-600'>Email: {member.email}</p>
                                          </div>
                                          <div className='flex items-center gap-4'>
                                              {member?.applicationStatusId && (
                                                  <>
                                                      <div className='flex items-center gap-1'>
                                                          <p className='text-sm'>Risk : </p>
                                                          <p className={`text-sm  ${member.applicationStatusId?.riskAssessment === 'completed' ? 'text-green-500' : 'text-yellow-500' } font-semibold`}>{member.applicationStatusId?.riskAssessment}</p>
                                                      </div>
                                                      <div className='flex items-center gap-1'>
                                                          <p className='text-sm'>Profile :</p>
                                                          <p className={`text-sm ${member.applicationStatusId?.profileCompletion === 'completed' ? 'text-green-500' : 'text-yellow-500' } font-semibold`}>{member.applicationStatusId?.profileCompletion}</p>
                                                      </div>
                                                      <div className='flex items-center gap-1'>
                                                          <p className='text-sm'>Payment :</p>
                                                          <p className={`text-sm ${member.applicationStatusId?.payment === 'completed' ? 'text-green-500' : 'text-yellow-500' } font-semibold`}>{member.applicationStatusId?.payment}</p>
                                                      </div>
                                                      <div className='flex items-center gap-1'>
                                                          <p className='text-sm'>Document : </p>
                                                          <p className={`text-sm ${member.applicationStatusId?.documentUpload === 'completed' ? 'text-green-500' : 'text-yellow-500' } font-semibold`}>{member.applicationStatusId?.documentUpload}</p>
                                                      </div>
                                                  </>
                                              )}
                                               <Link
                                                  href={`/dashboard/profile?userId=${member._id}`}
                                                  className="inline-flex items-center tracking-widest px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
                                              >
                                                  View / Edit
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
                                      </div>
                                  </li>
                              ))}
                          </ul>
                      ) : (
                          <p className="text-gray-600 text-center italic">
                              No family members added yet.
                          </p>
                      )}
                  </div>
              </TabPanel>

          </Tabs>
          <AddFamilyMemberModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddFamilyMember}/>
      </div>
  );
};

export default AfterLoginLayout(Dashboard);