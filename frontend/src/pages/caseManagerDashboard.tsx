import React, { useEffect, useState } from "react";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import { me } from "@/api/auth";
import { getAssignedUsersToCaseManager } from "@/api/caseManager";
import { useRouter } from "next/router";

const CaseManagerDashboard = () => {
//  getting user id
const router = useRouter();

  const [usersData, setUsersData] = useState([]);
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
    setUsersData(result?.data?.users);
  };
  useEffect(() => {
    getAssignedUsersToCaseManagerfunction();
  }, []);

  const handleView = (userId) => {
    router.push(`/user/${userId}`);
    // router.push({
    //   pathname: "/user",
    //   state: { userId },
    // });
  };
  return (
    <div>
      {" "}
      <table className="min-w-full divide-y divide-gray-200">
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
              Is Payment Done
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              View Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usersData?.map((user, index) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">User</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {user?.isStripePaymentDone ? "Yes" : "No"}
                </span>
              </td>

              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleView(user?._id)}
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
