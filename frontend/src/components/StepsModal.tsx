import React, { useState } from "react";
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
  onSelectCitizenShipCountry,
  countryCodes,
  destinationCountry,
}) => {
  const handleCloseModal = () => {
    setShouldStartjourneyShow(false);
  };
  const router = useRouter();

  console.log("citizenshipCountry@@", citizenshipCountry);
  console.log("destinationCountry@@", destinationCountry);
  const [passportCountry, setPassportCountry] =
    useState<string>(citizenshipCountry);
  const [progressBarpercentage, setProgressBarPercentage] = useState(10);

  const [step, setStep] = useState(0);
  const [showRiskDecreased, setShowRiskDecreased] = useState(
    citizenshipCountry == "IN" ? true : false
  );

  const [data, setData] = useState({
    citizenshipCountry,
    destinationCountry,
    passportCountry,
    areYouApplyingFromPassportCountry: false,
    whereWillYouApplyForYourVisa: "",
    haveSpouseOrProperty: false,
    travelledInternationallyAndReturnedHome: false,
    deniedVisaToUs: false,
  });

  console.log("step", step);

  const handleNextButtonClick = () => {
    if (step === 4) {
      // router.push("/loginpage");
      router.push({
        pathname: "/loginpage",
        query: data,
      });
    } else if (progressBarpercentage != 100) {
      setProgressBarPercentage((prev) => prev + 10);
      setStep((prev) => prev + 1);
    }
  };

  console.log("progressBarpercentage", progressBarpercentage);
  const handleBackButtonClick = () => {
    if (progressBarpercentage > 10) {
      setProgressBarPercentage((prev) => prev - 10);
      setStep((prev) => prev - 1);
    }
  };

  const handleSelectPassportCountry = (code: string) => {
    // onSelectCitizenShipCountry(code);
    const tempCountry: any = countryList()
      .getData()
      .find((country) => country.value === code);
    setPassportCountry(tempCountry);
    if (code === "IN") {
      setShowRiskDecreased(true);
    } else {
      setShowRiskDecreased(false);
    }
  };

  const handleYes = (name: string) => {
    setData({
      ...data,
      [name]: true,
    });
  };

  console.log("data", data);

  const handleNo = (name: string) => {
    setData({
      ...data,
      [name]: false,
    });
  };

  const handleSelectFromWhichCountry = (code: string) => {
    const tempCountry: any = countryList()
      .getData()
      .find((country) => country.value === code);
    setData({
      ...data,
      whereWillYouApplyForYourVisa: tempCountry,
    });
  };

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
        className="    justify-center flex bg-[#80808085] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="m-4 p-4 md:m-5 md:p-5 space-y-4 bg-white rounded text-gray-900">
              <ProgressBar progressBarpercentage={progressBarpercentage} />
              <h2 className="leading-relaxed text-gray-900 dark:text-gray-900 text-4xl text-center py-8">
                {ModalData[step].question}{" "}
                {(step === 1 || step === 2) && citizenshipCountry.label}
              </h2>
            </div>
            {step === 0 && (
              <>
                <div className="p-4 md:p-5 space-y-4">
                  <ReactFlagsSelect
                    selected={passportCountry.value}
                    onSelect={handleSelectPassportCountry}
                    className="w-full px-3 border shadow-md border-gray-200 rounded-lg text-gray-800"
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

                {/* <div className="bg-gray-600 m-4">
                  {showRiskDecreased && (
                    <div className="p-4 md:p-5 space-y-4">
                      <Checkbox
                        text="Risk Decreased"
                        textColor="white"
                        checked={showRiskDecreased}
                      />
                      <p className="text-sm"> {ModalData[step].firstLine}</p>
                      <p className="text-sm">{ModalData[step].secondLine}</p>
                    </div>
                  )}
                </div> */}
              </>
            )}

            {step === 1 && (
              <>
                <div
                  className={`m-4 ${
                    data.areYouApplyingFromPassportCountry
                      ? "border-2 border-red-400"
                      : ""
                  }`}
                >
                  <div className="p-2 px-5 space-y-4 border-b-2 py-4 bg-red-100">
                    <Radio
                      text="Yes"
                      onChange={() =>
                        handleYes("areYouApplyingFromPassportCountry")
                      }
                      name="areYouApplyingFromPassportCountry"
                      checked={data.areYouApplyingFromPassportCountry}
                    />
                  </div>
                  {/* {data.areYouApplyingFromIndia && (
                    <div className="p-4 md:p-5 space-y-4 bg-gray-600">
                      <Checkbox
                        text="Risk Decreased"
                        textColor="white"
                        checked={data.areYouApplyingFromIndia}
                      />
                      <p className="text-sm"> {ModalData[step].firstLine}</p>

                      <p className="text-sm">{ModalData[step].secondLine}</p>
                    </div>
                  )} */}
                </div>

                <div
                  className={`${
                    !data.areYouApplyingFromPassportCountry
                      ? "border-2 border-red-400"
                      : ""
                  } m-4`}
                >
                  <div className="p-2 px-5 space-y-4 border-b-2 py-4 bg-red-100">
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
                    <>
                      <h2 className="leading-relaxed text-gray-900 dark:text-gray-900 text-4xl text-center py-8 bg-white mb-4">
                        {ModalData[step].questionForNo}
                      </h2>

                      <ReactFlagsSelect
                        selected={data.whereWillYouApplyForYourVisa.value}
                        onSelect={handleSelectFromWhichCountry}
                        className="w-full px-3 border shadow-md border-gray-200 rounded-lg text-gray-800"
                        countries={countryCodes?.filter(
                          (c) => c !== citizenshipCountry
                        )}
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
                      {/* <div className="p-4 md:p-5 space-y-4 bg-gray-600">
                        <Checkbox
                          text="Risk Increased"
                          textColor="white"
                          checked={!data.areYouApplyingFromIndia}
                        />
                        <p className="text-sm">
                          {" "}
                          {ModalData[step].firstLineForNo}
                        </p>

                        <p className="text-sm">
                          {ModalData[step].secondLineForNo}
                        </p>
                      </div> */}
                    </>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div
                  className={`${
                    data.haveSpouseOrProperty ? "border-2 border-red-400" : ""
                  } m-4`}
                >
                  <div className="p-2 px-5 space-y-4 border-b-2 py-4 bg-red-100">
                    <Radio
                      text="Yes"
                      textColor="white"
                      onChange={() => handleYes("haveSpouseOrProperty")}
                      name="haveSpouseOrProperty"
                      checked={data.haveSpouseOrProperty}
                    />
                  </div>
                  {/* {data.haveSpouseOrProperty && (
                    <div className="p-4 md:p-5 space-y-4 bg-gray-600">
                      <Checkbox
                        text="Risk Decreased"
                        textColor="white"
                        checked={data.haveSpouseOrProperty}
                      />
                      <p className="text-sm"> {ModalData[step].lineForYes}</p>
                    </div>
                  )} */}
                </div>

                <div
                  className={`${
                    !data.haveSpouseOrProperty ? "border-2 border-red-400" : ""
                  } m-4`}
                >
                  <div className="p-2 px-5 space-y-4 border-b-2 py-4 bg-red-100">
                    <Radio
                      text="No"
                      textColor="white"
                      onChange={() => handleNo("haveSpouseOrProperty")}
                      name="haveSpouseOrProperty"
                      checked={!data.haveSpouseOrProperty}
                    />
                  </div>
                  {/* {!data.haveSpouseOrProperty && (
                    <>
                      <div className="p-4 md:p-5 space-y-4 bg-gray-600">
                        <Checkbox
                          text="Risk Increased"
                          textColor="white"
                          checked={!data.haveSpouseOrProperty}
                        />

                        <p className="text-sm">
                          {ModalData[step].firstlineForNo}
                        </p>
                        <p className="text-sm">
                          {ModalData[step].secondlineForNo}
                        </p>
                      </div>
                    </>
                  )} */}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div
                  className={`${
                    data.travelledInternationallyAndReturnedHome
                      ? "border-2 border-red-400"
                      : ""
                  } m-4`}
                >
                  <div className="p-2 px-5 space-y-4 border-b-2 py-4 bg-red-100">
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
                  {/* {data.travelledInternationallyAndReturnedHome && (
                    <div className="p-4 md:p-5 space-y-4 bg-gray-600">
                      <Checkbox
                        text="Risk Decreased"
                        textColor="white"
                        checked={data.travelledInternationallyAndReturnedHome}
                      />
                      <p className="text-sm"> {ModalData[step].lineForYes}</p>
                    </div>
                  )} */}
                </div>

                <div
                  className={`${
                    !data.travelledInternationallyAndReturnedHome
                      ? "border-2 border-red-400"
                      : ""
                  } m-4`}
                >
                  <div className="p-2 px-5 space-y-4 border-b-2 py-4 bg-red-100">
                    <Radio
                      text="No"
                      textColor="white"
                      onChange={() =>
                        handleNo("travelledInternationallyAndReturnedHome")
                      }
                      name="travelledInternationallyAndReturnedHome"
                      checked={!data.travelledInternationallyAndReturnedHome}
                    />
                  </div>
                  {/* {!data.travelledInternationallyAndReturnedHome && (
                    <>
                      <div className="p-4 md:p-5 space-y-4 bg-gray-600">
                        <Checkbox
                          text="Risk Increased"
                          textColor="white"
                          checked={
                            !data.travelledInternationallyAndReturnedHome
                          }
                        />

                        <p className="text-sm">
                          {ModalData[step].firstlineForNo}
                        </p>
                        <p className="text-sm">
                          {ModalData[step].secondlineForNo}
                        </p>
                      </div>
                    </>
                  )} */}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div
                  className={`${
                    data.deniedVisaToUs ? "border-2 border-red-400" : ""
                  } m-4`}
                >
                  <div className="p-2 px-5 space-y-4 border-b-2 py-4 bg-red-100">
                    <Radio
                      text="Yes"
                      textColor="white"
                      onChange={() => handleYes("deniedVisaToUs")}
                      name="deniedVisaToUs"
                      checked={data.deniedVisaToUs}
                    />
                  </div>
                  {/* {data.deniedVisaToUs && (
                    <div className="p-4 md:p-5 space-y-4 bg-gray-600">
                      <Checkbox
                        text="Risk Decreased"
                        textColor="white"
                        checked={data.deniedVisaToUs}
                      />
                      <p className="text-sm">
                        {" "}
                        {ModalData[step].firstlineForYes}
                      </p>
                      <p className="text-sm">
                        {ModalData[step].secondlineForYes}
                      </p>
                    </div>
                  )} */}
                </div>

                <div
                  className={`${
                    !data.deniedVisaToUs ? "border-2 border-red-400" : ""
                  } m-4`}
                >
                  <div className="p-2 px-5 space-y-4 border-b-2 py-4 bg-red-100">
                    <Radio
                      text="No"
                      textColor="white"
                      onChange={() => handleNo("deniedVisaToUs")}
                      name="deniedVisaToUs"
                      checked={!data.deniedVisaToUs}
                    />
                  </div>
                  {/* {!data.deniedVisaToUs && (
                    <>
                      <div className="p-4 md:p-5 space-y-4 bg-gray-600">
                        <Checkbox
                          text="Risk Increased"
                          textColor="white"
                          checked={!data.deniedVisaToUs}
                        />

                        <p className="text-sm">{ModalData[step].lineForNo}</p>
                      </div>
                    </>
                  )} */}
                </div>
              </>
            )}

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

            <div className="flex p-2 bg-white w-fit m-auto items-center gap-2 text-gray-900 mb-4 rounded text-base">
              <PiHeadsetFill className="text-xl" />
              <p className="text-sm">Contact Us</p>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/2"
                onClick={handleBackButtonClick}
              >
                Back
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-1/2"
                onClick={handleNextButtonClick}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsModal;
