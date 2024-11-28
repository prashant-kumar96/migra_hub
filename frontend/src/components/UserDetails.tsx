import React from "react";

const UserDetails = ({ data }) => {
  const { user, personalData, document } = data;

  console.log("UserDetails data", data);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    <div>
      <section className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Information
        </h2>
        <div className="space-y-2">
          <p>
            <strong className="font-medium">Name:</strong> {user?.name}
          </p>
          <p>
            <strong className="font-medium">Email:</strong> {user?.email}
          </p>
          <p>
            <strong className="font-medium">Role:</strong> {user?.role}
          </p>
          <p>
            <strong className="font-medium">Stripe Payment Done:</strong>{" "}
            {user?.isStripePaymentDone ? "Yes" : "No"}
          </p>
          <p>
            <strong className="font-medium">Stripe Payment Session ID:</strong>{" "}
            {user?.stripePaymentSessionId}
          </p>
          <p>
            <strong className="font-medium">Assigned Case Manager ID:</strong>{" "}
            {user?.assignedCaseManagerId}
          </p>
          <p>
            <strong className="font-medium">Created At:</strong>{" "}
            {new Date(user?.createdAt)?.toLocaleString()}
          </p>
        </div>
      </section>

      {/* Visa Data */}
      <section className="p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visa Data</h2>
        <div className="space-y-2">
          <p>
            <strong className="font-medium">
              Applying from Passport Country:
            </strong>{" "}
            {user?.visaDataId.areYouApplyingFromPassportCountry}
          </p>
          <p>
            <strong className="font-medium">Citizenship Country:</strong>{" "}
            {JSON.stringify(user?.visaDataId?.citizenshipCountry?.label)}
          </p>
          <p>
            <strong className="font-medium">Denied Visa to US:</strong>{" "}
            {user?.visaDataId?.deniedVisaToUs ? "Yes" : "No"}
          </p>
          <p>
            <strong className="font-medium">Destination Country:</strong>{" "}
            {JSON.stringify(user?.visaDataId?.destinationCountry?.label)}
          </p>
          <p>
            <strong className="font-medium">Have Spouse or Property:</strong>{" "}
            {user?.visaDataId?.haveSpouseOrProperty}
          </p>
          <p>
            <strong className="font-medium">Passport Country:</strong>{" "}
            {JSON.stringify(user?.visaDataId?.passportCountry.label)}
          </p>
          <p>
            <strong className="font-medium">Travelled Internationally:</strong>{" "}
            {user?.visaDataId?.travelledInternationallyAndReturnedHome}
          </p>
          <p>
            <strong className="font-medium">
              Where Will You Apply for Your Visa:
            </strong>{" "}
            {JSON.stringify(
              user?.visaDataId.whereWillYouApplyForYourVisa.label
            )}
          </p>
        </div>
      </section>

      {/* Personal Data */}
      <section className="p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Personal Data
        </h2>
        {personalData?.map((personal, index) => (
          <div key={index} className="space-y-4">
            <p>
              <strong className="font-medium">First Name:</strong>{" "}
              {personal?.first_name}
            </p>
            <p>
              <strong className="font-medium">Last Name:</strong>{" "}
              {personal?.last_name}
            </p>
            <p>
              <strong className="font-medium">Email:</strong> {personal?.email}
            </p>
            <p>
              <strong className="font-medium">Phone Number:</strong>{" "}
              {personal?.phoneNumber}
            </p>
            <p>
              <strong className="font-medium">Address:</strong>{" "}
              {personal?.addressLine}
            </p>
            <p>
              <strong className="font-medium">Marital Status:</strong>{" "}
              {personal?.marital_status}
            </p>
            <p>
              <strong className="font-medium">Gender:</strong>{" "}
              {personal?.gender}
            </p>
            <p>
              <strong className="font-medium">Passport Number:</strong>{" "}
              {personal?.passport_number}
            </p>
            <p>
              <strong className="font-medium">Passport Expiry:</strong>{" "}
              {new Date(personal?.passport_expiry).toLocaleDateString()}
            </p>
            <p>
              <strong className="font-medium">Zip Code:</strong>{" "}
              {personal?.zipCode}
            </p>
            <p>
              <strong className="font-medium">Terms Accepted:</strong>{" "}
              {personal?.terms ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </section>

      {/* Document Data */}
      <section className="p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Document Data
        </h2>
        {document?.map((doc, index) => (
          <div key={index} className="space-y-6">
            {/* Passport Images */}
            <div>
              <p className="font-medium text-gray-700 mb-2">Passport Images:</p>
              <div className="">
                {doc?.passportImages?.map((doc, idx) => (
                  <div className="w-full h-screen">
                    {doc.mimetype === "application/pdf" ? (
                      <object
                        data={`${backendUrl}${doc?.path}`}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                      >
                        <p>
                          Alternative text - include a link{" "}
                          <a href={`${backendUrl}${doc?.path}`}>to the PDF!</a>
                        </p>
                      </object>
                    ) : (
                      <img
                        key={idx}
                        className="w-full h-auto rounded-md shadow-md pt-10"
                        src={`${backendUrl}${doc?.path}`}
                        alt={`Passport image ${idx + 1}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Proof of Funds Images */}
            <div className="w-full h-full border-t-2 pt-6 border-gray-900">
              <p className="font-medium text-gray-700 mb-2">
                Proof of Funds Images:
              </p>

              {doc?.proofOfFundsImages?.map((doc, idx) => (
                <div className="w-full h-screen">
                  {doc.mimetype === "application/pdf" ? (
                    <object
                      data={`${backendUrl}${doc?.path}`}
                      type="application/pdf"
                      width="100%"
                      height="100%"
                    >
                      <p>
                        Alternative text - include a link{" "}
                        <a href={`${backendUrl}${doc?.path}`}>to the PDF!</a>
                      </p>
                    </object>
                  ) : (
                    <img
                      key={idx}
                      className="w-full h-auto rounded-md shadow-md pt-10"
                      src={`${backendUrl}${doc?.path}`}
                      alt={`Passport image ${idx + 1}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Proof of Ties Images */}
            <div>
              <p className="font-medium text-gray-700 mb-2 border-t-2 pt-6 border-gray-900">
                Proof of Ties Images:
              </p>
              <div className="h-full w-full">
                {doc?.proofOfTiesImages?.map((doc, idx) => (
                  <div className="w-full h-screen mt-4">
                    {doc.mimetype === "application/pdf" ? (
                      <object
                        data={`${backendUrl}${doc?.path}`}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                      >
                        <p>
                          Alternative text - include a link{" "}
                          <a href={`${backendUrl}${doc?.path}`}>to the PDF!</a>
                        </p>
                      </object>
                    ) : (
                      <img
                        key={idx}
                        className="w-full h-auto rounded-md shadow-md pt-10"
                        src={`${backendUrl}${doc?.path}`}
                        alt={`Passport image ${idx + 1}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Documents */}
            <div>
              <p className="font-medium text-gray-700 mb-2 border-t-2 pt-6 border-gray-900">
                Additional Documents:
              </p>
              <div className="">
                {doc?.additionalDocuments?.map((doc, idx) => (
                  <div className="w-full h-screen">
                    {doc.mimetype === "application/pdf" ? (
                      <object
                        data={`${backendUrl}${doc?.path}`}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                      >
                        <p>
                          Alternative text - include a link{" "}
                          <a href={`${backendUrl}${doc?.path}`}>to the PDF!</a>
                        </p>
                      </object>
                    ) : (
                      <img
                        key={idx}
                        className="w-full h-auto rounded-md shadow-md pt-10"
                        src={`${backendUrl}${doc?.path}`}
                        alt={`Passport image ${idx + 1}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserDetails;
