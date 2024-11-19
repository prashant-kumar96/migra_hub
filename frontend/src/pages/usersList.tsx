import React, { useEffect, useState } from "react";
import AfterLoginLayout from "../components/AfterLoginLayout";
import { getAllUsersWhoHaveDonePayment } from "@/api/auth";

const UsersList = () => {
  const [usersData, setUsersData] = useState();

  const getAllUsersWhoHaveDonePaymentFunction = async () => {
    const result = await getAllUsersWhoHaveDonePayment();
    console.log("result getAllUsersWhoHaveDonePaymentFunction", result);
    setUsersData(result?.data?.user);
  };

  console.log("usersData", usersData);

  useEffect(() => {
    getAllUsersWhoHaveDonePaymentFunction();
  }, []);

  return (
    <div>
      User List
      <div>
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
                IsPaymentDone
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th> */}
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
                {/* <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                  Edit
                </button>
                <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                  Delete
                </button>
              </td> */}
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
