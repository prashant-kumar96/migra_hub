import React from "react";

const UserDetails = ({ data }) => {
  const { user, personalData, document } = data;
  
  console.log("UserDetails data", data);
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  return (
    <div className="">
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
            <strong className="font-medium">Denied Visa In Last 90 Days:</strong>{" "}
            {user?.visaDataId?.deniedVisaToAnyCountry ? "Yes" : "No"}
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
            {JSON.stringify(user?.visaDataId.whereWillYouApplyForYourVisa)}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doc?.passportImages?.map((data, idx) => (
                  <img
                    key={idx}
                    className="w-full h-auto rounded-md shadow-md"
                    src={`${backendUrl}${data?.path}`}
                    alt={`Passport image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Proof of Funds Images */}
            <div>
              <p className="font-medium text-gray-700 mb-2">
                Proof of Funds Images:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doc?.proofOfFundsImages?.map((data, idx) => (
                  <img
                    key={idx}
                    className="w-full h-auto rounded-md shadow-md"
                    src={`${backendUrl}${data?.path}`}
                    alt={`Proof of Funds image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Proof of Ties Images */}
            <div>
              <p className="font-medium text-gray-700 mb-2">
                Proof of Ties Images:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doc?.proofOfTiesImages?.map((data, idx) => (
                  <img
                    key={idx}
                    className="w-full h-auto rounded-md shadow-md"
                    src={`${backendUrl}${data?.path}`}
                    alt={`Proof of Ties image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Additional Documents */}
            <div>
              <p className="font-medium text-gray-700 mb-2">
                Additional Documents:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doc?.additionalDocuments?.map((data, idx) => (
                  <img
                    key={idx}
                    className="w-full h-auto rounded-md shadow-md"
                    src={`${backendUrl}${data?.path}`}
                    alt={`Additional Document image ${idx + 1}`}
                  />
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
