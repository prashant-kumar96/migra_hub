import axiosInstance from "@/utils/axios";

export const assignCaseManagerToUser = async (data) => {
  console.log("daaatat assignCaseManagerToUser", data);
  const result = await axiosInstance.patch(
    `/caseManager/assignCaseManagerToUser`,
    data
  );
  return result;
};

export const getAssignedUsersToCaseManager = async (data) => {
  console.log("daaatat assignCaseManagerToUser", data);
  const result = await axiosInstance.get(
    `/caseManager/getAssignedUsersToCaseManager?caseManagerId=${data}`
  );
  return result;
};
