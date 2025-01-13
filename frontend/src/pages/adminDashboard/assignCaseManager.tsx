import React, { useEffect, useState } from "react";
import AfterLoginLayout from "../../components/afterLoginLayout/AfterLoginLayout";
import { getAllUsersWhoHaveDonePayment, getCaseManagers } from "@/api/auth";
import { assignCaseManagerToUser } from "@/api/caseManager";
import { useAuth } from "@/context/auth-context";

const UsersList = () => {
  const [usersData, setUsersData] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [caseManagersList, setCaseManagersList] = useState();
  const {user} = useAuth()
  
  const getAllUsersWhoHaveDonePaymentFunction = async () => {
    const result = await getAllUsersWhoHaveDonePayment();
    console.log("result getAllUsersWhoHaveDonePaymentFunction", result);
    setUsersData(result?.data?.user);
  };

  console.log("usersData", usersData);

  const getCaseManagersFunction = async () => {
    // Fetch case managers data from the API here
    const result = await getCaseManagers();
    console.log("result getCaseManagers", result?.data?.user);
    setCaseManagersList(result?.data?.user);
  };


  useEffect(() => {
    getCaseManagersFunction();
    getAllUsersWhoHaveDonePaymentFunction();
  }, []);

  const handleSelectChange = async (event, userId, applicationId) => {
    const value = event.target.value; // Get the selected value
    setSelectedOption(value); // Update state (optional)
    console.log("handleSelectChange value", value); // Log the selected value
    const data = {
      applicationId: applicationId,
      userId: userId,
      caseManagerId: value,
    };

    console.log("data handleSelectChange", data);
    const result = await assignCaseManagerToUser(data);
    console.log("result assignCaseManagerToUser", result);
    if (result) {
      alert("Case Manager was assigned successfully");
    }
    getAllUsersWhoHaveDonePaymentFunction();
  };

  // Fetch case managers data on component mount
  return (
    <div>
      User List
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
                Is Payment Done
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assign Case Manager
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersData?.map((user, index) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">User</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {user.isStripePaymentDone ? "Yes" : "No"}
                  </span>
                </td>
                {user.assignedCaseManagerId ? (
                  <td className="px-6 py-4 whitespace-nowrap">
                    Assigned to: {user.assignedCaseManagerId?.name}
                  </td>
                ) : (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={selectedOption}
                      onChange={(e) => handleSelectChange(e, user._id, user?.applicationId)}
                      className="border-2 p-2"
                    >
                      {caseManagersList?.map((manager, index) => (
                        <option value={manager._id}>{manager.name}</option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
            ))}
            <tr>
              {/* <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                  Edit
                </button>
                <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                  Delete
                </button>
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AfterLoginLayout(UsersList);
