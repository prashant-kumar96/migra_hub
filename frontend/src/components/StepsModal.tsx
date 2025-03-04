import React, { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import ProgressBar from "./ProgressBar";
import { PiHeadsetFill } from "react-icons/pi";
import { ModalData } from "@/utils/modalData";
import Radio from "@/utils/Radio";
import Checkbox from "@/utils/Checkbox";
import { FaGoogle } from "react-icons/fa";
import GoogleProvider from "next-auth/providers/google";
import { useSession, signIn, signOut } from "next-auth/react";
import GoogleLoginButton from "./loginButton";
import { useRouter } from "next/router";
import countryList from "react-select-country-list";
import { visaDataAtom } from "@/store/visaDataAtom";
import { useAtom } from "jotai";
import { useAuth } from "@/context/auth-context";
import Loader from "./loaders/loader";
import { RiErrorWarningLine } from "react-icons/ri";
import Decreased from "./ui/Text/Decreased";
import Increased from "./ui/Text/Increased";
import { createVisaData } from "@/api/visaData";
import Login from "@/pages/login";
import SignUpModal from "./modal/signup-modal";

interface Props {
  setShouldStartjourneyShow: React.Dispatch<React.SetStateAction<boolean>>;
  citizenshipCountry: string;
  setCitizenshipCountry: React.Dispatch<React.SetStateAction<string>>;
  onSelectCitizenShipCountry: (code: string) => void;
  countryCodes: string[];
  destinationCountry: string;
}


const StepsModal: React.FC<Props> = ({
  citizenshipCountry,
  setShouldStartjourneyShow,
  onModalClose,
  countryCodes,
  destinationCountry,
}) => {


  const handleCloseModal = () => {
    // onModalClose();
    setShouldStartjourneyShow(false);
  };

  console.log(';; destination country',destinationCountry)
  console.log(';; citizenship country',citizenshipCountry)

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    disableScroll(); // Disable scrolling when modal opens
    return () => {
      enableScroll(); // Enable scrolling when modal closes
    };
  }, []);

  const router = useRouter();
  const [sharedState, setSharedState] = useAtom(visaDataAtom);
  const [error, showError] = useState("");
  const [redirection, setRedirection] = useState(false);
  const { user } = useAuth();
  const path = router.asPath;

  const userId = user?.user?._id;
  const [passportCountry, setPassportCountry] =
    useState<object>(citizenshipCountry);

  const [progressBarpercentage, setProgressBarPercentage] = useState(0);

  const [step, setStep] = useState(0);
  const [showRiskDecreased, setShowRiskDecreased] = useState(
    citizenshipCountry == "IN" ? true : false
  );

  console.log("step", step);
  const selectedCitizenshipcountry = countryList()
    .getData()
    .find((country) => country.value === citizenshipCountry?.value);


    const [data, setData] = useState({
      citizenshipCountry,
      destinationCountry,
      passportCountry,
      areYouApplyingFromPassportCountry: undefined,  // Initialize as undefined
      whereWillYouApplyForYourVisa: undefined,
      haveSpouseOrProperty: undefined, // Initialize as undefined
      travelledInternationallyAndReturnedHome: undefined, // Initialize as undefined
      deniedVisaToAnyCountry: undefined, // Initialize as undefined
    });

    console.log(';; state data',data)


  const saveVisaData = async (data: any) => {
    // Add userId to the data object
    const visaDataWithUserId = { ...data, userId };
    try {
      const response = await createVisaData(visaDataWithUserId);

      if (response.status === 200) {
        setRedirection(true);
        handleCloseModal();
      } else {
        console.error(
          "Error saving data:",
          response.data?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error saving data:", error.message || error);
    } finally {
      // Ensure modal closes after the API call, whether it succeeds or fails
      handleCloseModal();
    }
  };


  const getCountryNameByCode = (code) => {
    if (!code) return null; // Handle cases where code is not provided

    const countries = countryList().getData();
    const country = countries.find((c) => c.value === code);

    return country ? country.label : null; // Return country name or null if not found
  };

  const handleNextButtonClick = () => {
    // Input validation for each step:
    if (step === 0 && !data.passportCountry) {
        showError("Please select your passport country.");
        return;
    }
    if (step === 1) {
      if (data.areYouApplyingFromPassportCountry === undefined) {
        showError(
          "Please answer whether you are applying from your passport country."
        );
        return;
      } else if (
        data.areYouApplyingFromPassportCountry === false &&  // Corrected condition
        !data.whereWillYouApplyForYourVisa?.value
      ) {
        showError("Please select where you will apply for your visa.");
        return;
      }
    }
    if (step === 2 && data.haveSpouseOrProperty === undefined) {
      showError(
        "Please answer whether you have a spouse or property in your home country."
      );
      return;
    }
    if (
      step === 3 &&
      data.travelledInternationallyAndReturnedHome === undefined
    ) {
      showError(
        "Please answer whether you have traveled internationally and returned home."
      );
      return;
    }
    if (step === 4 && data.deniedVisaToAnyCountry === undefined) {
      showError(
        "Please answer whether you have been denied a visa to any country."
      );
      return;
    }

    // If validation passes, proceed with existing logic:
    showError(""); // Clear any previous error *before* potentially changing the step

    if (step >= 0 && step < 4) { // Include step 0, and still go up to (but not including) 4
      setProgressBarPercentage((prevPercentage) => {
          const newPercentage = prevPercentage + 20;
          return Math.min(newPercentage, 100); // Ensure it doesn't go above 100
        });
      setStep((prev) => prev + 1);
    } else if (step === 4) {
        // step is 4, going to 5.
        setProgressBarPercentage(100); // jump to 100%.
        setStep(5); // set step to 5.
        setSharedState(data);
        localStorage.setItem("assessmentData", JSON.stringify(data));
        (userId || path !== "/") && saveVisaData(data);
    } else if(step ===5){
        setSharedState(data);
        localStorage.setItem("assessmentData", JSON.stringify(data));
        (userId || path !== "/") && saveVisaData(data);
    }
  };

  console.log('>>where will you apply for visa', data.whereWillYouApplyForYourVisa);

  const handleBackButtonClick = () => {
    if (step > 0 && step <= 5) {
      setStep((prev) => prev - 1);
    }
    if (step > 1 && step <= 5)
      setProgressBarPercentage(progressBarpercentage - 20);
  };

    const handleSelectPassportCountry = (code) => {
      const tempCountry: any = countryList()
        .getData()
        .find((country) => country.value === code || country.label === code);
      setPassportCountry(tempCountry);
      setData({ ...data, passportCountry: tempCountry?.value }); //update the data state
      if (code === "IN" || code === "India") {
        setShowRiskDecreased(true);
      } else {
        setShowRiskDecreased(false);
      }
    };

  useEffect(() => {
    handleSelectPassportCountry(citizenshipCountry);
  }, [countryCodes]);

  const handleYes = (name: string) => {
    setData({
      ...data,
      [name]: true,
    });
  };


  const handleNo = (name: string) => {
    console.log("name is ", name);
    setData({
      ...data,
      [name]: false,
    });
  };

    const handleSelectVisaApplyCountry = (code) => {
      const tempCountry: any = countryList()
        .getData()
        .find((country) => country.value === code || country.label === code);

      setData({ ...data, whereWillYouApplyForYourVisa: tempCountry });

    };


  const showFullCountryName = (code: string) => {
    let country: any = countryList()
      .getData()
      .find((country) => country.value == code);
    return country.label;
  };

  const selectedDestinationcountry = countryList()
  .getData()
  .find((country) => country.value === destinationCountry);

  return (
    <div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className=" flex backdrop-blur-md bg-[#8A775C]/40 overflow-auto fixed top-0 right-0 left-0 z-50 justify-center items-center  w-screen  md:inset-0 h-screen"
      >
        <div className="relative p-4 w-full max-w-[700px] max-h-[900px]">
          {redirection ? (
            <div className="h-screen flex justify-center ">
              <Loader text="" />
            </div>
          ) : (
            <div className="relative bg-FloralWhite rounded-lg shadow max-h-[700px] overflow-auto">
              <div
                className={`flex justify-between items-center p-4 border-b rounded-t ${
                  step == 5 ? "p-0 md:p-0 md:px-5 md:p-0" : "md:p-5"
                }`}
              >
                {/* Left Section: Risk Assessment */}
                <span className="font-medium tracking-wide whitesapce-nowrap text-[19px] text-Indigo">
                  Risk Assessment
                </span>

                {/* Right Section: Close Button */}
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                  data-modal-hide="default-modal"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3 hover:text-Indigo"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div
                className={`m-2 p-4 md:m-5  space-y-2 rounded text-gray-900 ${
                  step === 5 ? "m-0 p-0 md:m-5 md:p-0" : "md:p-5"
                }`}
              >
                <ProgressBar progressBarpercentage={progressBarpercentage} />
                <h2
                  className={`leading-relaxed text-center font-medium text-Indigo text-2xl   ${
                    step === 5 ? "py-0.5" : "py-6"
                  }
                  }`}
                >
                  {ModalData[step].question}
                  {(step === 1 || step === 2) && (
                    <> {getCountryNameByCode(citizenshipCountry)} </>
                  )}
                  ?
                </h2>
                {step === 0 && (
                  <>
                    <div className="">
                      <div className="flex p-1.5 bg-indigo-50 w-fit m-auto items-center gap-2 text-gray-900 mb-4 rounded text-base">
                        <RiErrorWarningLine className="text-lg" />
                        <p className="text-xs tracking-wide font-semibold  text-Indigo mt-1 uppercase  ">
                          Multiple passports
                        </p>
                      </div>
                      {error && (
                        <div className="px-6">
                          {" "}
                          <p className="text-sm text-red-500">{error}</p>
                        </div>
                      )}

                      <ReactFlagsSelect
                        selected={passportCountry?.value || ""}
                        onSelect={handleSelectPassportCountry}
                        className="w-full px-3 border shadow-md border-gray-200 rounded-lg text-gray-800 dark:bg-white"
                        countries={countryCodes}
                        searchable

                      />
                    </div>

                    <div className="bg-[#F6EFE6]">
                      {showRiskDecreased && (
                        <div className="p-4 md:p-5 space-y-4">

                          <Decreased />
                          <p className="text-sm">
                            {" "}
                            {ModalData[step].firstLine}
                          </p>
                          <p className="text-sm">
                            {ModalData[step].secondLine}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <div>
                      <div className="ml-1  bg-transparent">
                        <Radio
                          text="Yes"
                          textColor="white"
                          onChange={() =>
                            handleYes("areYouApplyingFromPassportCountry")
                          }
                          name="areYouApplyingFromPassportCountry"
                          checked={data.areYouApplyingFromPassportCountry === true} // Explicitly check for true
                        />
                      </div>

                      {data.areYouApplyingFromPassportCountry === true && ( // Show only when explicitly true
                        <div className="p-4 md:p-5 rounded-b-xl bg-[#F6EFE6]">

                          <Decreased />
                          <p className="text-sm text-justify tracking-wide leading-5">
                            {" "}
                            {ModalData[step].firstLine}
                          </p>

                          <p className="text-sm text-justify tracking-wide mt-1 leading-5">
                            {/* {ModalData[step].secondLine} */}
                            <p>
                              We will show you the earliest time you should plan
                              to travel, based on{" "}
                              {selectedDestinationcountry?.label} visa
                              appointment wait time data for{" "}
                              {selectedCitizenshipcountry?.label} , to help
                              prevent you from missing your trip
                            </p>
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className=" ml-1 bg-transparent">
                        <Radio
                          text="No"
                          textColor="white"
                          onChange={() =>
                            handleNo("areYouApplyingFromPassportCountry")
                          }
                          name="areYouApplyingFromPassportCountry"
                          checked={data.areYouApplyingFromPassportCountry === false} // Explicitly check for false
                        />
                      </div>
                      {data.areYouApplyingFromPassportCountry === false && ( 
                       <>   
                       <Increased/>
                       <p className="text-sm text-justify  p-2  px-4 tracking-wide leading-5">
                         {" "}
                         {ModalData[step].firstLineForNo}
                         {ModalData[step].secondLineForNo}
                       </p>
                        {/* // Show only when explicitly false */}
                        <div className="bg-[#F6EFE6] rounded-xl p-4 mt-6">
                          
                          <h2 className="leading-relaxed text-center font-medium text-Indigo text-2xl ">
                            {ModalData[step].questionForNo} ?
                          </h2>
                          

                          <ReactFlagsSelect
                            selected={data.whereWillYouApplyForYourVisa?.value || ""}
                            onSelect={handleSelectVisaApplyCountry}
                            className="w-full px-3 mt-6 border shadow-md bg-white   border-gray-200 rounded-lg text-Indigo "
                            countries={countryCodes?.filter(
                              (c) => c !== citizenshipCountry
                            )}
                            searchable
                          />
                        </div>
                        </>
                      )}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div>
                      <div className="ml-1 bg-transparent ">
                        <Radio
                          text="Yes"
                          textColor="white"
                          onChange={() => handleYes("haveSpouseOrProperty")}
                          name="haveSpouseOrProperty"
                          checked={data.haveSpouseOrProperty === true} // Explicitly check for true
                        />
                      </div>
                      {data.haveSpouseOrProperty === true && ( // Show only when explicitly true
                        <div className="p-4 md:p-5 rounded-b-xl bg-[#F6EFE6]">
                          <Decreased />
                          <p className="text-sm tracking-wide leading-5 text-Indigo text-justify">
                            {" "}
                            {ModalData[step].lineForYes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="No"
                          textColor="white"
                          onChange={() => handleNo("haveSpouseOrProperty")}
                          name="haveSpouseOrProperty"
                          checked={data.haveSpouseOrProperty === false} // Explicitly check for false
                        />
                      </div>
                      {data.haveSpouseOrProperty === false && ( // Show only when explicitly false
                        <>
                          <div className="p-4 md:p-5 rounded-b-xl bg-[#F6EFE6]">
                            <Increased />
                            <p className="text-sm tracking-wide leading-5 text-Indigo text-justify">
                              {ModalData[step].firstlineForNo}
                            </p>
                            <p className="text-sm tracking-wide leading-5 text-Indigo text-justify">
                              {ModalData[step].secondlineForNo}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div>
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="Yes"
                          textColor="white"
                          onChange={() =>
                            handleYes("travelledInternationallyAndReturnedHome")
                          }
                          name="travelledInternationallyAndReturnedHome"
                          checked={data.travelledInternationallyAndReturnedHome === true} // Explicitly check for true
                        />
                      </div>
                      {data.travelledInternationallyAndReturnedHome === true && ( // Show only when explicitly true
                        <div className="p-4 md:p-5 space-y-2 rounded-b-xl bg-[#F6EFE6]">
                          <Decreased />
                          <p className="text-sm text-justify text-Indigo  tracking-wide leading-5">
                            {" "}
                            {ModalData[step].lineForYes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="No"
                          textColor="white"
                          onChange={() =>
                            handleNo("travelledInternationallyAndReturnedHome")
                          }
                          className="rounded-t-xl"
                          name="travelledInternationallyAndReturnedHome"
                          checked={data.travelledInternationallyAndReturnedHome === false}  // Explicitly check for false
                        />
                      </div>
                      {data.travelledInternationallyAndReturnedHome === false && (  // Show only when explicitly false
                        <>
                          <div className="p-4 md:p-5 space-y-2 bg-[#F6EFE6] rounded-b-xl text-sm tracking-wide leading-5 text-Indigo text-justify">
                            <Increased />
                            <p className="text-sm text-justify text-Indigo  tracking-wide leading-5">
                              {ModalData[step].firstlineForNo}
                            </p>
                            <p className="text-sm text-justify text-Indigo  tracking-wide leading-5">
                              {ModalData[step].secondlineForNo}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div>
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="Yes"
                          textColor="white"
                          onChange={() => handleYes("deniedVisaToAnyCountry")}
                          name="deniedVisaToAnyCountry"
                          checked={data.deniedVisaToAnyCountry === true} // Explicitly check for true
                        />
                      </div>
                      {data.deniedVisaToAnyCountry === true && ( // Show only when explicitly true
                        <>
                          <div className="p-4 md:p-5 bg-[#F6EFE6] rounded-b-xl">
                            <Increased />
                            <p className="text-[14.5px] text-Indigo text-justify tracking-wide leading-5">
                              {" "}
                              {ModalData[step].firstlineForYes}
                            </p>
                            <p className="text-[14.5px] text-Indigo text-justify tracking-wide leading-5">
                              {ModalData[step].secondlineForYes}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    <div>
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="No"
                          textColor="white"
                          onChange={() => handleNo("deniedVisaToAnyCountry")}
                          name="deniedVisaToAnyCountry"
                          checked={data.deniedVisaToAnyCountry === false} // Explicitly check for false
                        />
                      </div>
                      {data.deniedVisaToAnyCountry === false && ( // Show only when explicitly false
                        <>
                          <div className="p-4 md:p-5 bg-[#F6EFE6] rounded-b-xl">
                            <Decreased />
                            <p className="text-sm text-Indigo text-justify tracking-wide">
                              {ModalData[step].lineForNo}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

                {step === 5 && <SignUpModal />}
              </div>

              <div className="flex p-1.5 bg-indigo-50 w-fit m-auto items-center gap-2 text-gray-900 mb-4 rounded text-base">
                <PiHeadsetFill className="text-xl" />
                <p className="text-xs tracking-wide font-semibold uppercase  ">
                  Contact Us
                </p>
              </div>
              {error && (
                <div className="px-6">
                  {" "}
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <div
                className={`flex items-center  ${
                  step === 5 ? "md:p-1 md:px-5" : "p-4 md:p-5"
                }
                border-t border-gray-200 rounded-b`}
              >
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="shadow-blue-gray-500/40 bg-transparent  border border-Indigo  font-medium rounded-lg text-base text-Indigo px-5 py-2.5 text-center  w-1/2"
                  onClick={handleBackButtonClick}
                >
                  Back
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-base font-medium text-FloralWhite tracking-wide focus:outline-none shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 w-1/2"
                  onClick={handleNextButtonClick}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepsModal;