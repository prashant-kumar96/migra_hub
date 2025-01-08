import React, { useEffect, useState } from "react";
import AfterLoginLayout from "../components/afterLoginLayout/AfterLoginLayout";
import { getAllUsersWhoHaveDonePayment } from "@/api/auth";
import NATag from "@/components/ui/tags/NATag";
import Role from  "@/components/ui/tags/Role";
import Table from "@/components/ui/Table";


const UsersList = () => {
  const [usersData, setUsersData] = useState();
  const headers = ["Name", "Email", "Role", "Payment"];

  const getAllUsersWhoHaveDonePaymentFunction = async () => {
    try {
      const result = await getAllUsersWhoHaveDonePayment();
      console.log("result getAllUsersWhoHaveDonePaymentFunction", result);
      const formattedData =
        result?.data?.user?.filter((usr)=>usr?.isPrimaryApplicant).map((user) => ({
          ...user,
          name: user.name ? (
            user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
          ) : (
            <NATag />
          ),
          role: user.role ? (
            <Role
              text={user.role.replace(/[^a-zA-Z0-9 ]/g, " ").toLowerCase()}
              bgClass="bg-lime-100"
              textColor="text-green-600"
            />
          ) : (
            <NATag />
          ),
        })) || [];
      setUsersData(formattedData);
    } catch (error) {
      console.error("Error fetching case managers:", error);
      setUsersData([]);
    }
  };


  useEffect(() => {
    getAllUsersWhoHaveDonePaymentFunction();
  }, []);


  return (
    <div>
      <span className="text-Indigo ml-6">User List</span>
      <div className="relative overflow-auto ">
        <Table data={usersData} headers={headers} />
      </div>
    </div>
  );

};

export default AfterLoginLayout(UsersList);
