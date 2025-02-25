// components/AfterLoginLayout.tsx
import React, { useEffect, useState, ComponentType, memo } from "react";
import { me } from "@/api/auth";
import Header2 from "../Header";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Stepper from "../Stepper";
import Dashboard from "@/pages/dashboard";
import { useAuth } from "@/context/auth-context";
import { getApplicationStatusDetails } from "@/api/applicationStatus";

export const ProgressBar = ({ className }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1); // set initial value to 1

  const [applicationStatus, setApplicationStatus] = useState<any>(null);
  const { user } = useAuth();
  const currentStatus = user?.user?.status;
  const applicationId = user?.user?.applicationId;

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      if (!applicationId) return;

      try {
        const response = await getApplicationStatusDetails(applicationId);
        setApplicationStatus(response?.data?.applicationStatus);
      } catch (error) {
        console.error("Error fetching application status:", error);
        setApplicationStatus(null);
      }
    };

    fetchApplicationStatus();
  }, [applicationId]);

  useEffect(() => {
    if (!applicationStatus) return;

    const steps = [];
    let current = 1;

    if (applicationStatus?.profileCompletion == "completed") {
      steps.push(1);
      current = 1;
    }

    if (
      applicationStatus?.status == "In Review" ||
      applicationStatus?.status == "in review"
    ) {
      steps.push(1, 2);
      current = 2;
    }

    if (applicationStatus?.visaApplied) {
      steps.push(1, 2, 3);
      current = 3;
    }

    if (
      applicationStatus?.visaApproved == "completed" ||
      applicationStatus?.visaApproved == "approved"
    ) {
      steps.push(1, 2, 3, 4);
      current = 4;
    }

    setCompletedSteps(steps);
    setCurrentStep(current);
  }, [applicationStatus]);

  const isStepActive = (step: number) => {
    return currentStep === step;
  };

  const isStepCompleted = (step: number) => {
    return completedSteps.includes(step);
  };

  // Calculate the width of the progress line based on completed steps
  const getProgressWidth = () => {
    const lastCompletedStep = Math.max(...completedSteps, 0);
    // Ensure the progress doesn't exceed 100%
    const progress = Math.min((lastCompletedStep / 3) * 100, 100);

    return `${progress}%`;
  };

  const getStepStatus = (step: number) => {
    if (isStepCompleted(step)) {
      return "bg-lime-500 text-white";
    }
    if (isStepActive(step)) {
      return "shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] text-FloralWhite font-bold";
    }
    return "bg-gray-200 text-gray-600";
  };

  return (
    <div
      className={`w-full px-4 sm:px-0 sm:max-w-6xl mx-auto sticky top-0 bg-white z-10 ${className}`}
    >
      <div className="relative">
        {/* Base Progress Line */}
        <div className="h-1 bg-gray-200 absolute w-full top-1/2 -translate-y-1/2 " />

        {/* Active Progress Line */}
        <div
          className="h-1 absolute top-1/2 -translate-y-1/2  transition-all duration-300"
          style={{
            width: getProgressWidth(),
            background: "linear-gradient(to right, #bef264, #22c55e)",
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {/* Complete Profile */}
          <div className="flex flex-col items-center w-1/4">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center relative ${getStepStatus(
                1
              )}`}
            >
              {isStepCompleted(1) ? (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-xs sm:text-base">1</span>
              )}
              {isStepCompleted(1) && (
                <div className="absolute -bottom-1 sm:-bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-lime-300 rounded-full"></div>
                </div>
              )}
            </div>
            <span
              className={`mt-1 sm:mt-7 text-xs sm:text-base text-center ${
                isStepCompleted(1)
                  ? "text-gray-600 font-bold"
                  : isStepActive(1)
                  ? "text-Indigo font-bold"
                  : "text-gray-600"
              }`}
            >
              Complete Profile
            </span>
          </div>

          {/* Review & Submit */}
          <div className="flex flex-col items-center w-1/4">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center relative ${getStepStatus(
                2
              )}`}
            >
              {isStepCompleted(2) ? (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-xs sm:text-base">2</span>
              )}
              {isStepCompleted(2) && (
                <div className="absolute -bottom-1 sm:-bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-lime-400 rounded-full"></div>
                </div>
              )}
            </div>
            <span
              className={`mt-1 sm:mt-7 text-xs sm:text-base text-center ${
                isStepCompleted(2)
                  ? "text-gray-600 font-bold"
                  : isStepActive(2)
                  ? "text-Indigo font-bold"
                  : "text-gray-600"
              }`}
            >
              Review & Submit
            </span>
          </div>

          {/* Visa Applied */}
          <div className="flex flex-col items-center w-1/4">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center relative ${getStepStatus(
                3
              )}`}
            >
              {isStepCompleted(3) ? (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-xs sm:text-base">3</span>
              )}
              {isStepCompleted(3) && (
                <div className="absolute -bottom-1 sm:-bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-lime-500 rounded-full"></div>
                </div>
              )}
            </div>
            <span
              className={`mt-1 sm:mt-7 text-xs sm:text-base text-center ${
                isStepCompleted(3)
                  ? "text-gray-600 font-bold"
                  : isStepActive(3)
                  ? "text-Indigo font-bold"
                  : "text-gray-600"
              }`}
            >
              Visa Applied
            </span>
          </div>

          {/* Completed */}
          <div className="flex flex-col items-center w-1/4">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center relative ${getStepStatus(
                4
              )}`}
            >
              {isStepCompleted(4) ? (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="text-xs sm:text-base">4</span>
              )}
              {isStepCompleted(4) && (
                <div className="absolute -bottom-1 sm:-bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
            <span
              className={`mt-1 sm:mt-7 text-xs sm:text-base text-center ${
                isStepCompleted(4)
                  ? "text-gray-600 font-bold"
                  : isStepActive(4)
                  ? "text-Indigo font-bold"
                  : "text-gray-600"
              }`}
            >
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WithAuthProps {
  user?: any;
  isLoading?: boolean;
}

// Memoize the Sidebar component
const MemoizedSidebar = memo(Sidebar);

const AfterLoginLayout = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const [role, setRole] = useState<string | undefined>();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const { user: data, isLoading: authLoading } = useAuth(); // Get isLoading from useAuth

    const meData = async () => {
      try {
        if (localStorage.getItem("token")) {
          const medata = await me();
          if (!medata || !medata.status) {
            console.warn("User not authorized, or user data not found.");
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
            return;
          }
          setRole(data?.user?.role); // Consider if you really need role in this component.
          setUser(data?.user);
          setIsAuthenticated(true);
        } else {
          console.warn("User token not found.");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error while fetching user data", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      meData();
        // Removed role from dependencies.  This is VERY important.
    }, []);


    if (loading || authLoading) { // Check authLoading as well
      return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (isAuthenticated === false) {
      router.push("/login");
      return null;
    }

    return (
      <div className="flex h-screen">
        {/* Use MemoizedSidebar instead of Sidebar */}
        <MemoizedSidebar />
        <div className="flex-1 lg:ml-12">
          {/* Sticky Progress Bar */}
          <div className="sticky top-10 z-10 bg-white">
            <ProgressBar className="py-4" />
          </div>
          <main className="w-full max-w-7xl mx-auto min-h-screen p-4">
            <div className="w-full lg:max-w-6xl mx-auto">
              <WrappedComponent {...props} user={user} isLoading={loading} />
            </div>
          </main>
        </div>
      </div>
    );
  };
};

export default AfterLoginLayout;