import { me } from "@/api/auth";
import AdditionalDocuments from "@/components/AdditionalDocuments";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import PassportUploadComp from "@/components/PassportUploadComp";
import ProofOfFundsComp from "@/components/ProofOfFundsComp";
import ProofOfTiesComp from "@/components/ProofOfTies";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const DocumentUpload = () => {
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);

  const getmedata = async () => {
    const result = await me();
    setSharedMedata(result?.data?.user);
  };

  useEffect(() => {
    getmedata();
  }, []);

  return (
    <div className="text-gray-700 p-5">
      <div className="relative overflow-x-auto text-gray-700">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">
                Heading
              </th>
              <th scope="col" className="px-6 py-3">
                Button
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Upload Passport
              </th>
              <td className="px-6 py-4">
                <PassportUploadComp />
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Upload Proof Of Funds
              </th>
              <td className="px-6 py-4">
                {" "}
                <ProofOfFundsComp />
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Upload Proof Of Ties to Home Country
              </th>
              <td className="px-6 py-4">
                {" "}
                <ProofOfTiesComp />
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Upload Additional Documents
              </th>
              <td className="px-6 py-4">
                <AdditionalDocuments />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AfterLoginLayout(DocumentUpload);
