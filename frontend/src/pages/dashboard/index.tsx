import React, { useEffect, useState } from "react";
import { me } from "@/api/auth";
import { getSingleVisaData } from "@/api/visaData";
import { useAtom } from "jotai";
import { meDataAtom } from "@/store/meDataAtom";
import { TfiControlForward } from "react-icons/tfi";
import Link from "next/link";
import { RiSlowDownFill } from "react-icons/ri";
import AfterLoginLayout, { ProgressBar } from "@/components/afterLoginLayout/AfterLoginLayout";
import Loader from "@/components/loaders/loader";
import Stepper from "@/components/Stepper";
import { useAuth } from "@/context/auth-context";
import TravelPlan from "@/components/TravelPlan";
import { visaDataAtom } from "@/store/visaDataAtom";
import AddFamilyMemberModal from "@/components/modal/add-family-member-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import { getLinkedFamilyMembers } from "@/api/familyMember";
import { getApplicationStatusDetails } from "@/api/applicationStatus";
  



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
    applicationStatus?: {
      riskAssessment: string;
      profileCompletion: string;
      payment: string;
      documentUpload: string;
    };
    visaData?:{
      _id:string
    }
  }
  
  interface DashboardProps {
    user:any;
    isLoading:boolean;
  }

  const Dashboard: React.FC = () => {
    const [visaData, setVisaData] = useState(""); // restore visaData local state
    const [primaryApplicant, setPrimaryApplicant] = useState<any>(null);
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
    const [sharedState, setSharedState] = useAtom(visaDataAtom);
    const { user, isLoading } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<any>(null);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0); // Track active tab
    const userId = user?.user?._id;
    const userDetails = user?.user;
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    // Add this state to track progress
    const [currentStep, setCurrentStep] = useState(1);
  
    // Function to determine if a step is active
    const isStepActive = (step: number) => {
      return currentStep >= step;
    };
  
   
  
    useEffect(() => {
      const fetchApplicationStatus = async () => {
        if (!userDetails?.applicationId) {
          setLoading(false);
          return;
        }
        try {
          setLoading(true);
          const response = await getApplicationStatusDetails(
            userDetails.applicationId
          );
          console.log(';; application status', response?.data)
          if (response?.data) {
            setApplicationStatus(response.data?.applicationStatus);
  
            // Update currentStep based on application status
            if (response.data.profileCompletion === "completed") {
                setCurrentStep(2)
            }
            if (response.data.payment === "completed") {
                setCurrentStep(3)
            }
  
            if(response.data.visaApproved === true){
               setCurrentStep(4)
            }
  
          }
        } catch (error) {
          console.error("Error fetching application status:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (user) {
        fetchApplicationStatus();
      }
    }, [userDetails?.applicationId, user]);
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedMemberId(null);
    };
  
    const fetchPrimaryApplicantData = async () => {
      // created a new method to get data
      try {
        setLoading(true);
        if (!user?.user?.visaDataId) {
          setLoading(false);
          return;
        }
        const resultVisaData = await getSingleVisaData(user.user.visaDataId);
        if (resultVisaData?.data) {
          setVisaData(resultVisaData.data);
          setPrimaryApplicant({ ...user.user, visaDataId: resultVisaData.data }); // update primary applicant info with data from getSingleVisaData
        }
      } catch (err) {
        console.error("Error during primary applicant data fetching", err);
      }
    };
  
    const fetchFamilyMembers = async () => {
      if (!userId) {
        console.error("User ID is not defined");
        return;
      }
  
      try {
        setLoading(true);
        const response = await getDashboard();
        if (response?.data) {
          setFamilyMembers(response?.data?.familyMembers || []); // Set empty array if undefined
        }
      } catch (err) {
        console.error("Error during family members fetching", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      const storedTab = localStorage.getItem("activeTab");
      if (storedTab) {
        setActiveTab(parseInt(storedTab, 10));
      }
    }, []);
  
    useEffect(() => {
      if (user) {
        Promise.all([fetchPrimaryApplicantData(), fetchFamilyMembers()]).finally(
          () => {
            setLoading(false);
          }
        );
      }
    }, [user]);
  
    const handleTabChange = (index: number) => {
      setActiveTab(index);
      localStorage.setItem("activeTab", String(index));
    };
  
    const handleAddFamilyMember = async () => {
      try {
        const response = await getDashboard();
        if (response.data) {
          toast.success(response.data.message);
          Promise.all([fetchPrimaryApplicantData(), fetchFamilyMembers()]).finally(
            () => {
              closeModal();
            }
          );
          localStorage.setItem("activeTab", "1");
          setActiveTab(1);
        }
      } catch (err: any) {
        console.log("error adding family members", err);
        toast.error(err?.response?.data?.message);
      }
    };
  
    const hasValidVisaData = () => {
      return visaData && Object.keys(visaData).length > 0;
    };
  
    if (loading || isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Loader text="Loading..." />
        </div>
      );
    }

    console.log(';; application log', applicationStatus?.profileCompletion )
  
    return (
      <div className="max-w-5xl mx-auto p-6">
        <ProgressBar />
        {hasValidVisaData() ? (
          <>
            {applicationStatus?.profileCompletion == "pending" && (
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
            )}
          </>
        ) : (
          <TravelPlan />
        )}
        {applicationStatus && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-Indigo mb-4">
              Application Status
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse border border-gray-200 shadow-sm  sm:hidden">
                <thead className="bg-gradient-to-r  text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Field
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  {Object.entries(applicationStatus || {})
                    .filter(
                      ([key]) =>
                        !["_id", "__v", "createdAt", "updatedAt", "userId", "applicationId"].includes(key)
                    )
                    .sort(([keyA], [keyB]) => {
                      const order = [
                        "riskAssessment",
                        "profileCompletion",
                        "payment",
                        "documentUpload",
                        "visaApplied",
                        "visaApproved",
                      ];
                      return order.indexOf(keyA) - order.indexOf(keyB);
                    })
                    .map(([key, value]) => {
                      let displayValue = value;
                      if (typeof value === "boolean") {
                        displayValue = value ? "Yes" : "No";
                      }
                      const title = key.replace(/([A-Z])/g, " $1").trim();
                      const capitalizedTitle =
                        title.charAt(0).toUpperCase() + title.slice(1);
                      const capitalizedDisplayValue =
                        typeof displayValue === "string"
                          ? displayValue.charAt(0).toUpperCase() +
                            displayValue.slice(1)
                          : displayValue;
                      return (
                        <tr key={key} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                            {capitalizedTitle}
                          </td>
                          <td
                            className={` ${
                              displayValue === "pending"
                                ? "text-yellow-500"
                                : displayValue === "completed"
                                ? "text-green-600"
                                : ""
                            } px-4 py-3 text-sm text-gray-600`}
                          >
                            {capitalizedDisplayValue}
                          </td>
                        </tr>
                      );
                    })}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                      Relationship
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {userDetails?.isPrimaryApplicant
                        ? "Primary Applicant"
                        : "Family Member"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="min-w-full bg-white border-collapse border border-gray-200 shadow-sm hidden sm:table">
                <thead className="bg-gradient-to-r  text-gray-600">
                  <tr>
                    {Object.entries(applicationStatus || {})
                      .filter(
                        ([key]) =>
                          !["_id", "__v", "createdAt", "updatedAt", "userId", "applicationId"].includes(
                            key
                          )
                      )
                      .sort(([keyA], [keyB]) => {
                        const order = [
                          "riskAssessment",
                          "profileCompletion",
                          "payment",
                          "documentUpload",
                          "assignedCaseManager",
                          "visaApplied",
                          "visaApproved",
                        ];
                        return order.indexOf(keyA) - order.indexOf(keyB);
                      })
                      .map(([key]) => {
                        const title = key.replace(/([A-Z])/g, " $1").trim();
                        const capitalizedTitle =
                          title.charAt(0).toUpperCase() + title.slice(1);
                        return (
                          <th
                            key={key}
                            className="px-4 py-3 text-left text-sm font-medium"
                          >
                            {capitalizedTitle}
                          </th>
                        );
                      })}
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Relationship
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  <tr className="hover:bg-gray-50">
                    {Object.entries(applicationStatus || {})
                      .filter(
                        ([key]) =>
                          !["_id", "__v", "createdAt", "updatedAt", "userId", "applicationId"].includes(
                            key
                          )
                      )
                      .sort(([keyA], [keyB]) => {
                        const order = [
                          "riskAssessment",
                          "profileCompletion",
                          "payment",
                          "documentUpload",
                          "assignedCaseManager",
                          "visaApplied",
                          "visaApproved",
                        ];
                        return order.indexOf(keyA) - order.indexOf(keyB);
                      })
                      .map(([, value]) => {
                        let displayValue = value;
                        if (typeof value === "boolean") {
                          displayValue = value ? "Yes" : "No";
                        }
                        const capitalizedDisplayValue =
                          typeof displayValue === "string"
                            ? displayValue.charAt(0).toUpperCase() +
                              displayValue.slice(1)
                            : displayValue;
                        return (
                          <td
                            key={value}
                            className={` ${
                              displayValue === "pending"
                                ? "text-yellow-500"
                                : displayValue === "completed"
                                ? "text-green-600"
                                : ""
                            } px-4 py-3 text-sm text-gray-600`}
                          >
                            {capitalizedDisplayValue}
                          </td>
                        );
                      })}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {userDetails?.isPrimaryApplicant
                        ? "Primary Applicant"
                        : "Family Member"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
       
      </div>
    );
  };
  
  export default AfterLoginLayout(Dashboard);