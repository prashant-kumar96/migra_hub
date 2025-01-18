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
import Link
 from "next/link";
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
  setCitizenshipCountry,
  // handleModalClose,
  onSelectCitizenShipCountry,
  onModalClose,
  countryCodes,
  destinationCountry,
}) => {
  console.log(":: props", citizenshipCountry, destinationCountry);
  const handleCloseModal = () => {
    onModalClose();
    setShouldStartjourneyShow(false);
  };
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
  console.log("citizenshipCountry@@", citizenshipCountry);
  console.log("destinationCountry@@", destinationCountry);
  const { user } = useAuth();
  console.log(";; user", user);
  const path = router.asPath;

  const userId = user?.user?._id;
  const [passportCountry, setPassportCountry] =
    useState<string>(citizenshipCountry);

  const [progressBarpercentage, setProgressBarPercentage] = useState(0);

  const [step, setStep] = useState(0);
  const [showRiskDecreased, setShowRiskDecreased] = useState(
    citizenshipCountry == "IN" ? true : false
  );

  const selectedCitizenshipcountry = countryList()
    .getData()
    .find((country) => country.value === citizenshipCountry);

  console.log(";; default citizenshipCountry", selectedCitizenshipcountry);

  const [data, setData] = useState({
    citizenshipCountry,
    destinationCountry,
    passportCountry,
    areYouApplyingFromPassportCountry: false,
    whereWillYouApplyForYourVisa: selectedCitizenshipcountry,
    haveSpouseOrProperty: false,
    travelledInternationallyAndReturnedHome: false,
    deniedVisaToAnyCountry: false,
  });

  const saveVisaData = async (data: any) => {
    // Add userId to the data object
    const visaDataWithUserId = { ...data, userId };
    console.log(";; visa data", visaDataWithUserId);
    try {
      // return ''
      const response = await createVisaData(visaDataWithUserId);

      if (response.status === 200) {
        console.log("Data saved successfully");
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

      // onModalClose()
    }
  };

  console.log("visa data", data);

  console.log("step", step);

  const getCountryNameByCode = (code) => {
    if (!code) return null; // Handle cases where code is not provided

    const countries = countryList().getData();
    const country = countries.find((c) => c.value === code);

    return country ? country.label : null; // Return country name or null if not found
  };

  const handleNextButtonClick = () => {
    // console.log("current step", step);
    // alert(step);

    if (step > 0 && step < 5)
      setProgressBarPercentage(progressBarpercentage + 20);
    if (step === 1) {
      if (data?.areYouApplyingFromPassportCountry === true) {
        showError("");
      } else {
        if (!data.whereWillYouApplyForYourVisa) {
          showError("Please select where you will apply for your visa");
          return;
        } else {
          showError("");
        }
      }
    }

    if (step === 4) {
      setSharedState(data);
      localStorage.setItem("assessmentData", JSON.stringify(data));
      // setRedirection(true);
      (userId || path !== "/") && saveVisaData(data);

      // Add a small delay to allow the loader to render
      // setTimeout(() => {
      //   if (!user) {
      //     router.push("/login");
      //   }
      // }, 500);
    }

    if (step === 5) {
      setSharedState(data);
      localStorage.setItem("assessmentData", JSON.stringify(data));
      // setRedirection(true);
      (userId || path !== "/") && saveVisaData(data);

      // Add a small delay to allow the loader to render
      // setTimeout(() => {
      //   if (!user) {
      //     router.push("/login");
      //   }
      // }, 500);
    } else if (progressBarpercentage !== 100) {
      // setProgressBarPercentage((prev) => prev + 10);
      setStep((prev) => prev + 1);
    }
  };

  console.log("progressBarpercentage", progressBarpercentage);

  const handleBackButtonClick = () => {
    // if (progressBarpercentage > 10) {
    //   setProgressBarPercentage((prev) => prev - 10);
    //   setStep((prev) => prev - 1);
    // }
    // setProgressBarPercentage(progressBarpercentage - 20);
  };

  const handleSelectPassportCountry = (code) => {
    console.log(";; code selected", code);
    // onSelectCitizenShipCountry(code);
    const tempCountry: any = countryList()
      .getData()
      .find((country) => country.value === code || country.label === code);
    setPassportCountry(tempCountry);
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
    if (progressBarpercentage >= 25)
      setProgressBarPercentage(progressBarpercentage - 25);
  };

  console.log("data", data);

  const handleNo = (name: string) => {
    setData({
      ...data,
      [name]: false,
    });
    setProgressBarPercentage(progressBarpercentage + 25);
  };

  const handleSelectFromWhichCountry = (code = citizenshipCountry) => {
    console.log(";; code", code);
    console.log(";; citizenshipCountry", citizenshipCountry);
    const tempCountry: any = countryList()
      .getData()
      .find((country) => country.value === code);
    setData({
      ...data,
      whereWillYouApplyForYourVisa: tempCountry.label,
    });
    console.log(";; temp country", tempCountry);
  };

  console.log(";; citizenshipCountry", citizenshipCountry);

  const showFullCountryName = (code: string) => {
    let country: any = countryList()
      .getData()
      .find((country) => country.value == code);
    return country.label;
  };

  return (
    <div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="justify-center flex backdrop-blur-md bg-[#8A775C]/40 overflow-auto fixed top-0 right-0 left-0 z-50 justify-center items-center  w-screen  md:inset-0 h-screen"
      >
        <div className="relative p-2 w-full max-w-[700px] max-h-[900px]">
          {redirection ?

            <div className='h-screen flex justify-center '><Loader text="Processing...." /></div>
            :
            <div className="relative bg-FloralWhite rounded-lg shadow ">
              <div className="flex justify-between items-center p-4 md:p-5 border-b rounded-t">
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

              <div className="m-2 p-4 md:m-5 md:p-5 space-y-2 rounded text-gray-900 ">
                <ProgressBar progressBarpercentage={progressBarpercentage} />
                <h2 className="leading-relaxed text-center font-medium text-Indigo text-2xl py-6">
                  {ModalData[step].question}
                  {(step === 1 || step === 2) && (
                    <>&nbsp;{getCountryNameByCode(citizenshipCountry)} </>
                  )}
                  ?
                </h2>
                {step === 0 && (
                  <>
                    <div className="">
                      {/* <div className="flex p-1.5 bg-indigo-50 w-fit m-auto items-center gap-2 text-gray-900 mb-4 rounded text-base">
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
                      )} */}

                      <ReactFlagsSelect
                        selected={passportCountry?.value || ""}
                        onSelect={handleSelectPassportCountry}
                        className="w-full px-3 border shadow-md border-gray-200 rounded-lg text-gray-800 dark:bg-white"
                        countries={countryCodes}
                        searchable
                        /*showSelectedLabel={showSelectedLabel}
                      selectedSize={selectedSize}
                      showOptionLabel={showOptionLabel}
                      optionsSize={optionsSize}
                      placeholder={placeholder}
                      searchable={searchable}
                      searchPlaceholder={searchPlaceholder}
                      alignOptionsToRight={alignOptionsToRight}
                      fullWidth={fullWidth}
                      disabled={disabled} */
                      />
                    </div>

                    <div className="bg-[#F6EFE6]">
                      {showRiskDecreased && (
                        <div className="p-4 md:p-5 space-y-4">
                          {/* <Checkbox
                            text="Risk Decreased"
                            textColor="white"
                            checked={showRiskDecreased}
                          /> */}
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
                    <div
                      className={`${
                        data.areYouApplyingFromPassportCountry
                          ? "border-2 border-lime-600 rounded-xl"
                          : ""
                      } ? `}
                    >
                      {/* <span className="">?</span> */}
                      <div className="ml-1  bg-transparent">
                        <Radio
                          text="Yes"
                          textColor="white"
                          onChange={() =>
                            handleYes("areYouApplyingFromPassportCountry")
                          }
                          name="areYouApplyingFromPassportCountry"
                          checked={data.areYouApplyingFromPassportCountry}
                        />
                      </div>
                      {data.areYouApplyingFromPassportCountry && (
                        <div className="p-4 md:p-5 rounded-b-xl bg-[#F6EFE6]">
                          {/* <Checkbox
                            text="Risk Decreased"
                            textColor="white"
                            checked={data.areYouApplyingFromIndia}
                          /> */}
                          <Decreased />
                          <p className="text-sm text-justify tracking-wide leading-5">
                            {" "}
                            {ModalData[step].firstLine}
                          </p>

                          <p className="text-sm text-justify tracking-wide mt-1 leading-5">
                            {ModalData[step].secondLine}
                          </p>
                        </div>
                      )}
                    </div>

                    <div
                      className={`${
                        !data.areYouApplyingFromPassportCountry ? "" : ""
                      } `}
                    >
                      <div className=" ml-1 bg-transparent">
                        <Radio
                          text="No"
                          textColor="white"
                          onChange={() =>
                            handleNo("areYouApplyingFromPassportCountry")
                          }
                          name="areYouApplyingFromPassportCountry"
                          checked={!data.areYouApplyingFromPassportCountry}
                        />
                      </div>
                      {!data.areYouApplyingFromPassportCountry && (
                        <div className="bg-[#F6EFE6] rounded-xl p-4 mt-6">
                          <h2 className="leading-relaxed text-center font-medium text-Indigo text-2xl ">
                            {ModalData[step].questionForNo} ?
                          </h2>

                          <ReactFlagsSelect
                            selected={passportCountry?.value || ""}
                            onSelect={handleSelectPassportCountry}
                            // className="w-full px-3 border shadow-md border-gray-200 rounded-lg text-gray-800 dark:bg-white"
                            // countries={countryCodes}

                            // selected={data.whereWillYouApplyForYourVisa.value}
                            // onSelect={handleSelectFromWhichCountry}
                            className="w-full px-3 mt-6 border shadow-md bg-white   border-gray-200 rounded-lg text-Indigo "
                            countries={countryCodes?.filter(
                              (c) => c !== citizenshipCountry
                            )}
                            searchable
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div
                      className={`${
                        data.haveSpouseOrProperty
                          ? "border-2 border-lime-600 rounded-xl"
                          : ""
                      } `}
                    >
                      <div className="ml-1 bg-transparent ">
                        <Radio
                          text="Yes"
                          textColor="white"
                          onChange={() => handleYes("haveSpouseOrProperty")}
                          name="haveSpouseOrProperty"
                          checked={data.haveSpouseOrProperty}
                        />
                      </div>
                      {data.haveSpouseOrProperty && (
                        <div className="p-4 md:p-5 rounded-b-xl bg-[#F6EFE6]">
                          {/* <Checkbox
                            text="Risk Decreased"
                            textColor="white"
                            checked={data.haveSpouseOrProperty}
                          /> */}
                          <Decreased />
                          <p className="text-sm tracking-wide leading-5 text-Indigo text-justify">
                            {" "}
                            {ModalData[step].lineForYes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div
                      className={`${
                        !data.haveSpouseOrProperty
                          ? "border-2 border-red-500 rounded-xl  rounded-xl"
                          : ""
                      } `}
                    >
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="No"
                          textColor="white"
                          onChange={() => handleNo("haveSpouseOrProperty")}
                          name="haveSpouseOrProperty"
                          checked={!data.haveSpouseOrProperty}
                        />
                      </div>
                      {!data.haveSpouseOrProperty && (
                        <>
                          <div className="p-4 md:p-5 rounded-b-xl bg-[#F6EFE6]">
                            {/* <Checkbox
                              text="Risk Increased"
                              textColor="white"
                              checked={!data.haveSpouseOrProperty}
                            /> */}
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
                    <div
                      className={`${
                        data.travelledInternationallyAndReturnedHome
                          ? "border-2 border-lime-600 rounded-xl "
                          : ""
                      } `}
                    >
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="Yes"
                          textColor="white"
                          onChange={() =>
                            handleYes("travelledInternationallyAndReturnedHome")
                          }
                          name="travelledInternationallyAndReturnedHome"
                          checked={data.travelledInternationallyAndReturnedHome}
                        />
                      </div>
                      {data.travelledInternationallyAndReturnedHome && (
                        <div className="p-4 md:p-5 space-y-2 rounded-b-xl bg-[#F6EFE6]">
                          {/* <Checkbox
                            text="Risk Decreased"
                            textColor="white"
                            checked={data.travelledInternationallyAndReturnedHome}
                          /> */}
                          <Decreased />
                          <p className="text-sm text-justify text-Indigo  tracking-wide leading-5">
                            {" "}
                            {ModalData[step].lineForYes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div
                      className={`${
                        !data.travelledInternationallyAndReturnedHome
                          ? "border-2 border-red-500 rounded-xl "
                          : ""
                      } `}
                    >
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="No"
                          textColor="white"
                          onChange={() =>
                            handleNo("travelledInternationallyAndReturnedHome")
                          }
                          className="rounded-t-xl"
                          name="travelledInternationallyAndReturnedHome"
                          checked={
                            !data.travelledInternationallyAndReturnedHome
                          }
                        />
                      </div>
                      {!data.travelledInternationallyAndReturnedHome && (
                        <>
                          <div className="p-4 md:p-5 space-y-2 bg-[#F6EFE6] rounded-b-xl text-sm tracking-wide leading-5 text-Indigo text-justify">
                            {/* <Checkbox
                          text="Risk Increased"
                          textColor="white"
                          checked={
                            !data.travelledInternationallyAndReturnedHome
                          }
                        /> */}
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
                    <div
                      className={`${
                        data.deniedVisaToAnyCountry
                          ? "border-2 border-red-500 rounded-xl "
                          : ""
                      } `}
                    >
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="Yes"
                          textColor="white"
                          onChange={() => handleYes("deniedVisaToAnyCountry")}
                          name="deniedVisaToAnyCountry"
                          checked={data.deniedVisaToAnyCountry}
                        />
                      </div>
                      {data.deniedVisaToAnyCountry && (
                        <>
                          <div className="p-4 md:p-5 bg-[#F6EFE6] rounded-b-xl">
                            <Increased />

                            {/* <Checkbox
                            text="Risk Decreased"
                            textColor="white"
                            checked={data.deniedVisaToAnyCountry}
                          /> */}
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

                    <div
                      className={`${
                        !data.deniedVisaToAnyCountry
                          ? "border-2 border-lime-700 rounded-xl "
                          : ""
                      } `}
                    >
                      <div className="ml-1 bg-transparent">
                        <Radio
                          text="No"
                          textColor="white"
                          onChange={() => handleNo("deniedVisaToAnyCountry")}
                          name="deniedVisaToAnyCountry"
                          checked={!data.deniedVisaToAnyCountry}
                        />
                      </div>
                      {!data.deniedVisaToAnyCountry && (
                        <>
                          <div className="p-4 md:p-5 bg-[#F6EFE6] rounded-b-xl">
                            {/* <Checkbox
                              text="Risk Increased"
                              textColor="white"
                              checked={!data.deniedVisaToAnyCountry}
                            /> */}
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

              {/* {step === 5 && (
              <div className=" bg-gray-100 flex items-center justify-center  bg-white rounded-lg shadow dark:bg-gray-700 mb-2">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                  <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">
                    Sign Up
                  </h1>

                 
                    <GoogleLoginButton />

                  <button
                    onClick={() => {}}
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md mb-4"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.917c-1.505 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.621h-3.12V24h6.116C23.405 24 24 23.405 24 22.676V1.326C24 .595 23.405 0 22.675 0z" />
                    </svg>
                    Sign Up with Facebook
                  </button>

                  <form onSubmit={handleEmailSignup}>
                    <div className="mb-4">
                      <label className="block text-gray-700">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Your first name"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Your email"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Your password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 rounded-md"
                    >
                      Sign Up with Email
                    </button>
                  </form>
                </div>
              </div>
            )} */}

              <div className="flex p-1.5 bg-indigo-50 w-fit m-auto items-center gap-2 text-gray-900 mb-4 rounded text-base">
                <PiHeadsetFill className="text-xl" />
                <Link href="/contact" className="text-xs tracking-wide font-semibold uppercase  ">Contact Us</Link>
              </div>
              {error && (
                <div className="px-6">
                  {" "}
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
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
