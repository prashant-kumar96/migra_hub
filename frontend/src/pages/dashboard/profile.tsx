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
  const [text, setText] = useState("");
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
  const [linkedMembers, setLinkedMembers] = useState<any>({ familyMembers: [] }); // Initialize as an object with a familyMembers array.
  const [isOpen, setIsOpen] = useState(false);
  const [member, setMember] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // Separate API calls into individual functions
  const fetchApplicationStatus = async () => {
    try {
      if (userDetails?.applicationId) { // Check for applicationId
        const response = await getApplicationStatusDetails(
          userDetails.applicationId
        );
        if (response?.data) {
          setApplicationStatus(response.data?.applicationStatus);
        }
      }
    } catch (error) {
      console.error("Error fetching application status:", error);
    }
  };

  const fetchLinkedMembers = async () => {
    try {
      if (userDetails?._id) {
          const response = await getLinkedFamilyMembers(userDetails._id);
        if (response?.data) {
          // Ensure the response is what we expect
          setLinkedMembers(response.data);
        }
      }

    } catch (error) {
      console.error("Error fetching linked members:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
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
  }, [user]);

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
    setSelectedCitizenshipCountry(null); // Reset to null, not an empty object.
    setIsEditMode(false);
    setMember({});
    setIsOpen(true);
  };

  const onSelectCitizenShipCountry = (code) => {
    setError((prev) => ({ ...prev, citizenshipCountryError: "" }));
    setCitizenshipCountry(code);
  };

  const [deleteLoader, setDeleteLoader] = useState(false);
  const handleEdit = (tempMember: any) => { // Added type
    setSelectedCitizenshipCountry(tempMember.citizenshipCountry);
    setIsEditMode(true);
    setMember(tempMember);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {  // Added type
    try {
      setDeleteLoader(true);
      const deleteResult = await deleteFamilyMember(id);
      if (deleteResult.status === 200) {
        alert(deleteResult?.data?.message);
        fetchLinkedMembers(); // No need to await here
      } else {
        alert("Error deleting family member.");
      }
    } catch (err) {
      console.error("Error deleting family member:", err); // More specific error message.
      alert("Error deleting family member."); // Show error to the user.

    } finally {
      setDeleteLoader(false);
    }
  };

  const [selectedCitizenshipCountry, setSelectedCitizenshipCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);


    const renderLinkedMembers = () => {
    if (!linkedMembers?.familyMembers?.length) return null;

    return (
      <div className="mb-4 md:mb-8 overflow-x-auto"> {/* Reduced margin */}
        <h2 className="text-lg md:text-2xl text-gray-600 mb-2 md:mb-4">
          Family Members
        </h2>
       <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4"> {/* Responsive grid */}
                <div className="font-medium text-gray-500 uppercase tracking-wider text-xs md:text-sm">Name</div>
                <div className="font-medium text-gray-500 uppercase tracking-wider text-xs md:text-sm">Email</div>
                <div className="font-medium text-gray-500 uppercase tracking-wider text-xs md:text-sm">Relationship</div>
                <div className="font-medium text-gray-500 uppercase tracking-wider text-xs md:text-sm">Profile</div>
                <div className="font-medium text-gray-500 uppercase tracking-wider text-xs md:text-sm">Visa</div>
                <div className="font-medium text-gray-500 uppercase tracking-wider text-xs md:text-sm">Edit</div>
                <div className="font-medium text-gray-500 uppercase tracking-wider text-xs md:text-sm">Delete</div>

                {linkedMembers.familyMembers.map((member: any) => (  // Added type
                    <React.Fragment key={member._id}>
                        <div className="py-2 text-sm text-gray-900">{member.name}</div>
                        <div className="py-2 text-sm text-gray-500">{member.email}</div>
                        <div className="py-2 text-sm text-gray-500">{member.relationship}</div>
                        <div className="py-2">
                            <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.applicationStatus.profileCompletion === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                            >
                                {member.applicationStatus.profileCompletion}
                            </span>
                        </div>
                        <div className="py-2">
                            <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.applicationStatus.visaStatus === "pending"
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
                        </div>
                        <div className="py-2 text-sm text-gray-900">
                            <FaEdit
                                className="cursor-pointer"
                                onClick={() => {
                                    handleEdit(member);
                                }}
                            />
                        </div>
                        <div className="py-2 text-sm text-gray-900 flex items-center">
                            <MdDelete
                                className="cursor-pointer"
                                onClick={() => {
                                    handleDelete(member._id);
                                }}
                            />
                            {deleteLoader && <ButtonLoader />}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>

      </div>
    );
  };


  if (isLoading || loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="text-Indigo" text="Loading..." />
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
    <div className="p-4 md:p-6"> {/* Reduced padding for smaller screens */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8"> {/* Responsive layout */}
        <h1 className="text-2xl md:text-4xl text-gray-600 mb-2 md:mb-0">
          Personal Information
        </h1>
        {/* Conditionally render the button */}
        {applicationStatus?.profileCompletion === "completed" ? (
          <button
            onClick={handleModal}
            className="bg-Indigo text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-indigo-900 transition-colors text-sm md:text-base"
          >
            Add Family Member
          </button>
        ) : null}
      </div>

    {  linkedMembers?.familyMembers?.length && <div className="border shadow-xl my-2 md:my-5 rounded p-2 md:p-4">
        {renderLinkedMembers()}
      </div>
}

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
        setText={setText}
        text={text}
      />
    </div>
  );
};
export default AfterLoginLayout(ProfilePage);