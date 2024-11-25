import React, { useEffect, useState } from "react";
import AfterLoginLayout from "../components/afterLoginLayout/AfterLoginLayout";
import CreateCaseManager from "@/components/CreateCaseManager";
import { getCaseManagers } from "@/api/auth";
import Table from "@/components/ui/Table";
import NATag from "@/components/ui/tags/NATag";
import Role from "@/components/ui/tags/Role";

const CaseManagerPage = () => {
  const [caseManagersList, setCaseManagersList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headers = ["Name", "Email", "Role"];

  const getCaseManagersFunction = async () => {
    try {
      const result = await getCaseManagers();
      console.log("result getCaseManagers", result?.data?.user);

      const formattedData =
        result?.data?.user?.map((user) => ({
          ...user,
          name: user.name ? (
            user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
          ) : (
            <NATag />
          ),
          role: user.role ? (
            <Role
              text={user.role.replace(/[^a-zA-Z0-9 ]/g, " ").toLowerCase()}
              bgClass="bg-indigo-100"
              textColor="text-indigo-600"
            />
          ) : (
            <NATag />
          ),
        })) || [];

      setCaseManagersList(formattedData);
    } catch (error) {
      console.error("Error fetching case managers:", error);
      setCaseManagersList([]);
    }
  };

  // Fetch case managers data on component mount
  useEffect(() => {
    getCaseManagersFunction();
  }, [isModalOpen]);

  return (
    <div>
      <CreateCaseManager
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <div className="relative overflow-auto ">
        <Table data={caseManagersList} headers={headers} />
      </div>
    </div>
  );
};

export default AfterLoginLayout(CaseManagerPage);
