import React, { useEffect, useState } from "react";
import AfterLoginLayout from "../components/afterLoginLayout/AfterLoginLayout";

import NATag from "@/components/ui/tags/NATag";
import Role from "@/components/ui/tags/Role";
import Table from "@/components/ui/Table";
import { getAllUsers } from "@/api/auth";
import { useRouter } from "next/router";

const UsersList = () => {
  const [usersData, setUsersData] = useState();
  const headers = ["Name", "Email", "Role", "Payment", "View"];
  const router = useRouter();
  const handleView = (userId) => {
    router.push(`/user/${userId}`);
  };

  const getAllUsersfunction = async () => {
    try {
      const result = await getAllUsers();
      console.log("result getAllUsers", result);
      const formattedData =
        result?.data?.user?.map((user) => ({
          ...user,
          name: user.name ? (
            user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
          ) : (
            <NATag />
          ),
          view: (
            <button
              className="cursor-pointer"
              onClick={() => handleView(user._id)}
            >
              View
            </button>
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
    getAllUsersfunction();
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
