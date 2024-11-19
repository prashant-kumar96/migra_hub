import React, { useEffect, useState } from "react";
import AfterLoginLayout from "../components/AfterLoginLayout";
import CreateCaseManager from "@/components/CreateCaseManager";
import { getCaseManagers } from "@/api/auth";
import CaseManagerTable from "@/components/CaseManagerTable";

const CaseManagerPage = () => {
  const [caseManagersList, setCaseManagersList] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCaseManagersFunction = async () => {
    // Fetch case managers data from the API here
    const result = await getCaseManagers();
    console.log("result getCaseManagers", result?.data?.user);
    setCaseManagersList(result?.data?.user);
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
      <CaseManagerTable data={caseManagersList} />
    </div>
  );
};

export default AfterLoginLayout(CaseManagerPage);
