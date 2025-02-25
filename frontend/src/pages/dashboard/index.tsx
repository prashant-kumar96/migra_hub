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

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedMemberId(null);
  // };

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

  console.log("visadata", visaData);

  // console.log(';; application log', applicationStatus?.profileCompletion )
  // return  ''
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* <ProgressBar /> */}
      {hasValidVisaData() ? (
        <>
          {applicationStatus?.applicationStatus?.profileCompletion ==
            "pending" && (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-Indigo mb-4">
                  Travel Visa Denial Risk
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <RiSlowDownFill className="text-green-500" size={24} />
                  <span className="text-xl font-medium text-gray-900">
                    {riskValue}
                  </span>
                </div>
                <p className="text-lg text-gray-600 italic mb-6">
                  But our service gets your risk even lower
                </p>
                <Link
                  href="/dashboard/profile"
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
            )}

          {applicationStatus?.applicationStatus && (
            <div className="bg-white rounded-lg shadow-lg  p-6 mt-8">
              <h2 className="text-2xl font-bold text-Indigo mb-4">
                Application Status
              </h2>
              <div className=" ">
                <table className="max-w-6xl w-full bg-white border-collapse border border-gray-200 shadow-sm  sm:hidden">
                  <thead className="bg-gray-50 text-gray-600">
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
                    {Object.entries(applicationStatus?.applicationStatus || {})
                      .filter(
                        ([key]) =>
                          ![
                            "_id",
                            "__v",
                            "createdAt",
                            "updatedAt",
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
                          "visaApplied",
                          "visaStatus",
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
                              className={` ${displayValue === "pending"
                                  ? "text-yellow-500"
                                  : displayValue === "completed" ||
                                    displayValue === "Yes" ||
                                    displayValue == "approved"
                                    ? "text-green-600"
                                    : ""
                                } px-4 py-3 text-sm text-gray-600`}
                            >
                              {capitalizedDisplayValue}
                            </td>
                          </tr>
                        );
                      })}
                    {/* <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                      Relationship
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {userDetails?.isPrimaryApplicant
                        ? "Primary Applicant"
                        : "Family Member"}
                    </td>
                  </tr> */}
                  </tbody>
                </table>
                <div className="relative overflow-auto shadow-md sm:rounded-lg w-full max-w-6xl  ">

                  <table className="text-left rtl:text-right ">
                    <thead className="bg-gray-100  text-gray-600">
                      <tr>
                        {Object.entries(
                          applicationStatus?.applicationStatus || {}
                        )
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
                          .map(([key]) => {
                            const title = key.replace(/([A-Z])/g, " $1").trim();
                            const capitalizedTitle =
                              title.charAt(0).toUpperCase() + title.slice(1);
                            return (
                              <th
                                key={key}
                                className="px-4 py-3  text-base text-Indigo  whitespace-nowrap font-medium"
                              >
                                {capitalizedTitle}
                              </th>
                            );
                          })}
                        {/* <th className="px-4 py-3 text-left text-sm font-medium">
                      Relationship
                    </th> */}
                      </tr>
                    </thead>
                    <tbody className="divide-x divide-gray-200 text-gray-800">
                      <tr className="hover:bg-gray-50">
                        {Object.entries(
                          applicationStatus?.applicationStatus || {}
                        )
                          .filter(
                            ([key]) =>
                              ![
                                "_id",
                                "__v",
                                "createdAt",
                                "updatedAt",
                                "userId",
                                "status",
                                "reviewSubmit",
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
                                className={` ${displayValue === "pending"
                                    ? "text-yellow-500"
                                    : displayValue === "completed" ||
                                      displayValue === "Yes" ||
                                      displayValue == "approved"
                                      ? "text-lime-500"
                                      : ""
                                  } px-4 py-3 text-base text-gray-600`}
                              >
                                {capitalizedDisplayValue}
                              </td>
                            );
                          })}
                        {/* <td className="px-4 py-3 text-sm text-gray-600">
                      {userDetails?.isPrimaryApplicant
                        ? "Primary Applicant"
                        : "Family Member"}
                    </td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
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
