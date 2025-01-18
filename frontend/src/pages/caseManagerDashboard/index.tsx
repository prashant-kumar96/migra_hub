import React, { useEffect, useState } from "react";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import { me } from "@/api/auth";
import { getAssignedUsersToCaseManager } from "@/api/caseManager";
import { useRouter } from "next/router";
import { sendStatusUpdateEmail } from "@/api/applicationStatus";
import Loader from "@/components/loaders/loader";

export const statuses = [
  { value: "N/A", label: "N/A" },
  { value: "In Review", label: "In Review" },
  { value: "Visa Applied", label: "Visa Applied" },
  { value: "Visa Approved", label: "Visa Approved" },
  { value: "Visa Rejected", label: "Visa Rejected" },
];


const CaseManagerDashboard = () => {
  const router = useRouter();
  const [usersData, setUsersData] = useState([]);
  const [loadingStatusUpdate, setLoadingStatusUpdate] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState(null);


  const getAssignedUsersToCaseManagerfunction = async () => {
    const medata = await me();
    console.log(
      "medata getAssignedUsersToCaseManagerfunction",
      medata?.data?.user?._id
    );
    const result = await getAssignedUsersToCaseManager(medata?.data?.user?._id);
    console.log(
      "getAssignedUsersToCaseManagerfunction result",
      result?.data?.users
    );
      const usersWithStatus = result?.data?.users.map(user => ({
      ...user,
      status: user.status || "N/A"
    }));
    setUsersData(usersWithStatus);
  };

  console.log(';; user data',usersData)
  useEffect(() => {
    getAssignedUsersToCaseManagerfunction();
  }, []);

  const handleView = (userId, applicationId) => {
    router.push(`/caseManagerDashboard/user/${userId}?id=${applicationId}`);
  };


  const handleStatusChange = async (event, userId, applicationId) => {
      const newStatus = event.target.value;
    setUpdatingUserId(userId);
      // Find the user that is being updated
      const updatedUsersData = usersData.map(user => {
          if (user._id === userId) {
            return {...user, status: newStatus};
          }
         return user
        });
    setUsersData(updatedUsersData);
    setLoadingStatusUpdate(true)
    try {
      const response = await sendStatusUpdateEmail({ userId: userId, status: newStatus , applicationId:applicationId });
      console.log("Status update email sent successfully", response);
    } catch (error) {
      console.error("Error updating status:", error);
         // Revert the status if there was an error
         const revertedUsersData = usersData.map(user => {
          if (user._id === userId) {
            return {...user, status: usersData.find(user=> user._id === userId).status};
          }
         return user
        });
      setUsersData(revertedUsersData);
    } finally {
        setUpdatingUserId(null)
      setLoadingStatusUpdate(false);
    }

  };


  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 text-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Is Payment Done
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usersData?.map((user, index) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">User</td>
              <td className="px-6 py-4 whitespace-nowrap relative">
                <select
                  className="border rounded p-2"
                  value={user.status}
                  onChange={(e) => handleStatusChange(e, user._id, user?.applicationId)}
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label || user?.status}
                    </option>
                  ))}
                </select>
                {loadingStatusUpdate && updatingUserId===user._id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                    <Loader size={5} text=''/>
                  </div>
                )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {user?.isStripePaymentDone ? "Yes" : "No"}
                  </span>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => handleView(user?._id, user?.applicationId)}
                >
                  View
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AfterLoginLayout(CaseManagerDashboard);