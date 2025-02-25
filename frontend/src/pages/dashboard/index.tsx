import React, { useEffect, useState } from "react";
import { me } from "@/api/auth";
import { getSingleVisaData } from "@/api/visaData";
import { useAtom } from "jotai";
import { meDataAtom } from "@/store/meDataAtom";
import { TfiControlForward } from "react-icons/tfi";
import Link from "next/link";
import { RiSlowDownFill } from "react-icons/ri";
import AfterLoginLayout, {
  ProgressBar,
} from "@/components/afterLoginLayout/AfterLoginLayout";
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
  name: string;
  email: string;
  visaDataId: {};
  applicationId: {
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
  visaData?: {
    _id: string;
  };
}

interface DashboardProps {
  user: any;
  isLoading: boolean;
}

const Dashboard: React.FC = () => {
  const [visaData, setVisaData] = useState("");
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

  type riskValueEnum = "LOW" | "MEDIUM" | "HIGH";
  const [riskValue, setRiskValue] = useState<riskValueEnum>("LOW");

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Add this state to track progress
  const [currentStep, setCurrentStep] = useState(1);

  // Function to determine if a step is active
  const isStepActive = (step: number) => {
    return currentStep >= step;
  };
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 640);
      };

      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

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
        console.log(";; application status", response?.data);

        if (response?.data) {
          setApplicationStatus(response.data);

          // Update currentStep based on application status
          if (response.data.payment === "completed") {
            setCurrentStep(2);
          }

          if (response.data.visaStatus === true) {
            setCurrentStep(4);
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
      if (resultVisaData?.data?.deniedVisaToAnyCountry === true) {
        setRiskValue("HIGH");
      } else if (
        resultVisaData?.data?.areYouApplyingFromPassportCountry === "true" &&
        resultVisaData?.data?.haveSpouseOrProperty === "true" &&
        resultVisaData?.data?.travelledInternationallyAndReturnedHome ===
        "true" &&
        resultVisaData?.data?.deniedVisaToAnyCountry === false
      ) {
        setRiskValue("LOW");
      } else if (
        resultVisaData?.data?.deniedVisaToAnyCountry === false &&
        (resultVisaData?.data?.areYouApplyingFromPassportCountry === "false" ||
          resultVisaData?.data?.haveSpouseOrProperty === "true" ||
          resultVisaData?.data?.travelledInternationallyAndReturnedHome ===
          "true")
      ) {
        setRiskValue("MEDIUM");
      }
    } catch (err) {
      console.error("Error during primary applicant data fetching", err);
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
      Promise.all([
        fetchPrimaryApplicantData(),
        // fetchFamilyMembers()
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  const hasValidVisaData = () => {
    return visaData && Object.keys(visaData).length > 0;
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="text-Indigo" text="Loading..." />
      </div>
    );
  }


  return (
    <div className="p-4 md:p-6">
      {hasValidVisaData() ? (
        <>
          {applicationStatus?.applicationStatus?.profileCompletion ==
            "pending" && (
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-Indigo mb-2 md:mb-4">
                  Travel Visa Denial Risk
                </h2>
                <div className="flex items-center justify-center gap-2 mb-2 md:mb-4">
                  <RiSlowDownFill className="text-green-500 text-lg md:text-2xl" />
                  <span className="text-base md:text-xl font-medium text-gray-900">
                    {riskValue}
                  </span>
                </div>
                <p className="text-sm md:text-lg text-gray-600 italic mb-4 md:mb-6">
                  But our service gets your risk even lower
                </p>
                <Link
                  href="/dashboard/profile"
                  className="inline-flex items-center tracking-widest px-4 py-2 md:px-6 md:py-3 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
                >
                  Complete Profile and Payment
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 ml-2"
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

          {applicationStatus?.applicationStatus && (
           <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mt-4 md:mt-8">
           <h2 className="text-xl md:text-2xl font-bold text-Indigo mb-2 md:mb-4">
             Application Status
           </h2>
           <div className="flex flex-col">
             {Object.entries(applicationStatus?.applicationStatus || {})
               .filter(
                 ([key]) =>
                   ![
                     "_id",
                     "__v",
                     "createdAt",
                     "updatedAt",
                     "status",
                     "reviewSubmit",
                     "userId",
                     "applicationId",
                   ].includes(key)
               )
               .sort(([keyA], [keyB]) => {
                 const order = [
                   "riskAssessment",
                   "profileCompletion",
                   "payment",
                   "documentUpload",
                   "assignedCaseManager",
                   "visaApplied",
                   "visaStatus",
                 ];
                 return order.indexOf(keyA) - order.indexOf(keyB);
               })
               .map(([key, value]) => {
                 const title = key.replace(/([A-Z])/g, " $1").trim();
                 const capitalizedTitle =
                   title.charAt(0).toUpperCase() + title.slice(1);
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
                   <div
                     key={key}
                     className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'}  items-start border-b py-2`}  /* Added border and padding */
                   >
                     <div
                       className={`px-2 py-2 md:px-4 md:py-3 text-xs md:text-base font-medium ${isSmallScreen ? 'text-Indigo' : 'text-gray-600'} w-1/2 md:w-1/3`}
                     >
                       {capitalizedTitle}
                     </div>
                     <div
                       className={`px-2 py-2 md:px-4 md:py-3 text-xs md:text-base text-gray-600 w-1/2 md:w-2/3 ${
                         displayValue === "pending"
                           ? "text-yellow-500"
                           : displayValue === "completed" ||
                             displayValue === "Yes" ||
                             displayValue == "approved"
                           ? "text-lime-500"
                           : ""
                       }`}
                     >
                       {capitalizedDisplayValue}
                     </div>
                   </div>
                 );
               })}
           </div>
         </div>
          )}
        </>
      ) : (
        <TravelPlan />
      )}
    </div>
  );
};

export default AfterLoginLayout(Dashboard);