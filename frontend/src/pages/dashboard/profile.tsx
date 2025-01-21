import AfterLoginLayout, {
  ProgressBar,
} from "@/components/afterLoginLayout/AfterLoginLayout";
import React, { useEffect, useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";
import "react-country-state-city/dist/react-country-state-city.css";
import PersonalInfo from "@/components/PersonalInfo";
import { useAuth } from "@/context/auth-context";
import { getApplicationStatusDetails } from "@/api/applicationStatus";
import AddFamilyMemberModal from "@/components/modal/add-family-member-modal";
import { useAsync } from "react-use";
import { deleteFamilyMember, getLinkedFamilyMembers } from "@/api/familyMember";
import { useRouter } from "next/router";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from "@/components/loaders/loader";
import ButtonLoader from "@/components/loaders/buttonLoader";

const ProfilePage = () => {
  const [citizenshipCountry, setCitizenshipCountry] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const countryCodes = countryList()
    .getData()
    .map((country) => country.value);
  const [citizenshipCountryCodes, setCitizenshipCountryCodes] =
    useState(countryCodes);
  const userDetails = user?.user;
  const [loading, setLoading] = useState<boolean>(true);
  const [applicationStatus, setApplicationStatus] = useState<any>(null);
  const [linkedMembers, setLinkedMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [member, setMember] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // Separate API calls into individual functions
  const fetchApplicationStatus = async () => {
    try {
      const response = await getApplicationStatusDetails(
        userDetails?.applicationId
      );
      if (response?.data) {
        setApplicationStatus(response.data?.applicationStatus);
      }
    } catch (error) {
      console.error("Error fetching application status:", error);
    }
  };

  const fetchLinkedMembers = async () => {
    try {
      const response = await getLinkedFamilyMembers(userDetails?._id);
      if (response?.data) {
        setLinkedMembers(response?.data);
      }
    } catch (error) {
      console.error("Error fetching linked members:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!userDetails?.applicationId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await Promise.all([fetchApplicationStatus(), fetchLinkedMembers()]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchInitialData();
    }
  }, [userDetails?.applicationId, user]);

  // Refresh linked members when modal closes
  useEffect(() => {
    if (!isOpen && userDetails?._id) {
      fetchLinkedMembers();
    }
  }, [isOpen, userDetails?._id]);

  const [error, setError] = useState({
    citizenshipCountryError: "",
    destinationCountryError: "",
  });

  function onSubmit() {
    // Handle submit logic
  }

  function onClose() {
    setIsOpen(false);
  }

  const handleModal = () => {
    console.log("handleModal is run");
    // const emptyObj = {};

    setSelectedCitizenshipCountry({});
    setIsEditMode(false);
    setMember({});
    setIsOpen(true);
  };

  const onSelectCitizenShipCountry = (code) => {
    setError((prev) => ({ ...prev, citizenshipCountryError: "" }));
    setCitizenshipCountry(code);
  };

  const [deleteLoader, setDeleteLoader] = useState(false);
  const handleEdit = (tempMember) => {
    console.log("tempMember", tempMember);
    setSelectedCitizenshipCountry(tempMember.citizenshipCountry);
    setIsEditMode(true);
    setMember(tempMember);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoader(true);
      console.log("handleDelete", id);

      const deleteResult = await deleteFamilyMember(id);
      console.log("deleteResult", deleteResult);
      if (deleteResult.status === 200) {
        alert(deleteResult?.data?.message);
        console.log("deleteResult", deleteResult);
        fetchLinkedMembers();
      } else {
        alert("error");
      }
    } catch (err) {
      console.log("error");
    } finally {
      setDeleteLoader(false);
    }
  };

  const [selectedCitizenshipCountry, setSelectedCitizenshipCountry] = useState<{
    value: string;
    label: string;
  } | null>();

  const renderLinkedMembers = () => {
    if (!linkedMembers?.familyMembers?.length) return null;

    return (
      <div className="mb-8 overflow-x-auto">
        <h2 className="text-2xl text-gray-600 mb-4">Family Members</h2>
        <table className="min-w-full bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Relationship
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visa Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {linkedMembers?.familyMembers.map((member) => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.relationship}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${
                                      member.applicationStatus
                                        .profileCompletion === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                  >
                    {member.applicationStatus.profileCompletion}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${
                                      member.applicationStatus.visaStatus ===
                                      "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : member.applicationStatus.visaStatus
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                  >
                    {member.applicationStatus.visaStatus === "pending"
                      ? "Pending"
                      : member.applicationStatus.visaStatus
                      ? "Approved"
                      : "Not Applied"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <FaEdit
                    className="cursor-pointer"
                    onClick={() => {
                      handleEdit(member);
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  ">
                  <p className="flex gap-2">
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => {
                        handleDelete(member._id);
                      }}
                    />
                    {deleteLoader && <ButtonLoader />}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user?.user?._id) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Unable to load profile data. Please try again later.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-5/6">
      {/* <ProgressBar /> */}
      <div className="px-24 py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-gray-600">Personal Information</h1>
          {applicationStatus?.profileCompletion === "completed" && (
            <button
              onClick={handleModal}
              className="bg-Indigo text-white px-4 py-2 rounded hover:bg-indigo-900 transition-colors"
            >
              Add Family Member
            </button>
          )}
        </div>

        <div className="border shadow-xl my-5 rounded p-4">
          {" "}
          {renderLinkedMembers()}
        </div>

        <AddFamilyMemberModal
          onSubmit={onSubmit}
          isOpen={isOpen}
          member={member}
          onClose={onClose}
          isEditMode={isEditMode}
          selectedCitizenshipCountry={selectedCitizenshipCountry}
          setSelectedCitizenshipCountry={setSelectedCitizenshipCountry}
        />

        <PersonalInfo
          visaDataId={user.user.visaDataId}
          userEmail={user.user.email}
          userName={user.user.name}
          userId={user.user._id}
        />
      </div>
    </div>
  );
};
export default AfterLoginLayout(ProfilePage);
