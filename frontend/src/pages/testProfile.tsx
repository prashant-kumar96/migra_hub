import React from "react";

const TestProfile = () => {
  return (
    <div>
      <section className="py-10 my-auto dark:bg-gray-900 text-gray-800">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <div className="">
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                Profile
              </h1>
              <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
                Create Profile
              </h2>
              <form>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full  mb-4 lg:mt-6">
                    <label htmlFor="" className="mb-2 dark:text-gray-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="w-full  lg:mt-6">
                    <label htmlFor="" className=" dark:text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full ">
                  <div className="w-full  mb-4 lg:mt-6">
                    <label htmlFor="" className=" dark:text-gray-300">
                      Passport Number
                    </label>
                    <input
                      type="text"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="w-full  mb-4 lg:mt-6">
                    <label htmlFor="" className=" dark:text-gray-300">
                      Postal/Zip Code
                    </label>
                    <input
                      type="number"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Zip Code"
                    />
                  </div>
                </div>

                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full ">
                  <div className="w-full mt-6">
                    <h3 className="dark:text-gray-300 mb-2">First Language</h3>
                    <select className="w-full text-grey border-2 rounded-lg  pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                      <option disabled value="">
                        Select Language
                      </option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>

                  <div className="w-full  mb-4 mt-6">
                    <label htmlFor="" className="mb-2 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="text"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="First Name"
                    />
                  </div>
                </div>

                <div className="w-full  mb-4 mt-6">
                  <label htmlFor="" className="mb-2 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    type="text"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="First Name"
                  />
                </div>

                <div className="w-full  mb-4 lg:mt-6">
                  <label htmlFor="" className=" dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Zip Code"
                  />
                </div>

                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full">
                    <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                    <input
                      type="date"
                      className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="dark:text-gray-300 mb-2">
                      Passport Expiry Date
                    </h3>
                    <input
                      type="date"
                      className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                </div>
                <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                  <button type="submit" className="w-full p-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestProfile;
