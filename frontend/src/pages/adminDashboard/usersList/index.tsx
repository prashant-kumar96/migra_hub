import React, { useEffect, useState } from "react";
import { getAllUsersWhoHaveDonePayment, getCaseManagers } from "@/api/auth";
import NATag from "@/components/ui/tags/NATag";
import Role from  "@/components/ui/tags/Role";
import Table from "@/components/ui/Table";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import { assignCaseManagerToUser } from "@/api/caseManager";
import { toast } from "react-toastify";


const UsersList = () => {
  const [usersData, setUsersData] = useState([]);
  const [caseManagersList, setCaseManagersList] = useState([]);
  const headers = ["Name", "Email", "Role", "Payment", "Assigned Case Manager"];

  const getCaseManagersFunction = async () => {
      try {
          const result = await getCaseManagers();
          console.log("result getCaseManagers", result?.data?.user);
          setCaseManagersList(result?.data?.user || []);
      } catch (error) {
          console.error("Error fetching case managers:", error);
          setCaseManagersList([]);
      }
  };

  const getAllUsersWhoHaveDonePaymentFunction = async () => {
      try {
          const result = await getAllUsersWhoHaveDonePayment();
          console.log("result getAllUsersWhoHaveDonePaymentFunction", result);
          const formattedData =
              result?.data?.user?.filter((usr) => usr?.isPrimaryApplicant)
                  .map((user) => ({
                      ...user,
                      name: user.name ? (
                          user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
                      ) : (
                          <NATag />
                      ),
                      email: user.email ? (
                          user.email
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
                      payment: user.payment ? "Yes" : "No",
                      assignedCaseManager: user.assignedCaseManagerId
                          ? user.assignedCaseManagerId.name
                          : null, // Get Assigned CM name
                  })) || [];

          setUsersData(formattedData);
      } catch (error) {
          console.error("Error fetching users:", error);
          setUsersData([]);
      }
  };


  useEffect(() => {
      getCaseManagersFunction();
      getAllUsersWhoHaveDonePaymentFunction();
  }, []);

  const handleAssignCaseManager = async (userId: string, applicationId: string, caseManagerId: string) => {
      try {
          const data = {
              applicationId: applicationId,
              userId: userId,
              caseManagerId: caseManagerId,
          };
          const result = await assignCaseManagerToUser(data);
          console.log("result assignCaseManagerToUser", result);
          if (result?.data?.message) {
              toast.success("Case Manager was assigned successfully");
               getAllUsersWhoHaveDonePaymentFunction();
          }
        
      } catch (error: any) {
          console.error("Error assigning case manager:", error);
        toast.error(error?.response?.data?.message)
      }
  };


  return (
      <div>
          <span className="text-Indigo ml-6">User List</span>
          <div className="relative overflow-auto ">
              <Table
                  data={usersData}
                  headers={headers}
                  caseManagers={caseManagersList}
                  onAssignCaseManager={handleAssignCaseManager}
              />
          </div>
      </div>
  );
};

export default AfterLoginLayout(UsersList);