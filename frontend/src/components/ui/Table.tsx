import React, { useState } from "react";
import NATag from "./tags/NATag";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth-context";
import { sendStatusUpdateEmail } from "@/api/applicationStatus";
import { toast } from "react-toastify";
import Loader from "../loaders/loader";
interface TableProps {
    headers: string[];
    data: any[];
    showActions?: boolean;
    showViewButton?: boolean;
    showStatus?: boolean;
    onStatusChange?: (row: any, newStatus: string) => void;
}


const Table: React.FC<TableProps> = ({ headers, data, showActions = true, showViewButton = true, showStatus = true, onStatusChange }) => {
    const router = useRouter();
    const [statusValues, setStatusValues] = useState<{ [key: string]: string }>({});
    const [loadingRowId, setLoadingRowId] = useState<string | null>(null); // Track loading per row
    const { user } = useAuth();


    const userId = user?.user?._id;

    if (!data || data.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                <NATag />
            </div>
        );
    }

    const handleView = (row: any) => {
        const applicationId = row?.applicationId;
        if (applicationId)
            router.push(`/adminDashboard/usersList/application-details?id=${applicationId}`);
    };

    const handleStatusChange = async (row: any, newStatus: string) => {
        setLoadingRowId(row._id); // Set loading for this row
        try {
             setStatusValues((prev) => ({ ...prev, [row._id]: newStatus }));
            const response = await sendStatusUpdateEmail({ userId: row._id, status: newStatus , applicationId:row?.applicationId});
            console.log(';; reponse', response?.data?.message);
            if (response?.data?.message) {
              // Only show success toast if not loading
                if(loadingRowId !== row._id){
                  toast.success('Status Updated Succesfully');
                }
                if (onStatusChange) {
                  onStatusChange(row, newStatus);
                }
            }
        } catch (err: any) {
            console.log("error sending status mail", err);
            toast.error(err?.response?.data?.message);
        } finally {
            setLoadingRowId(null); // Clear loading for this row
        }
    };
    const statusOptions = ['Visa Processing', 'Visa Applied', 'Visa Approved', 'Visa Rejected'];

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mx-4">
            <table className="w-full text-left rtl:text-right text-DarkGray">
                <thead className="font-semibold font-greycliff text-FloralWhite uppercase bg-gradient-to-r from-[#333366] to-[#2C415A]">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-4 py-2">
                                <span className="text-[19px]">{header}</span>
                            </th>
                        ))}
                        {showStatus && (
                            <th className="px-4 py-2">
                                <span className="text-[19px]">Status</span>
                            </th>
                        )}
                        {showActions && (
                            <th className="px-4 py-2">
                                <span className="text-[19px]">Actions</span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="odd:bg-white even:bg-gray-100 border-b hover:bg-gray-200 transition-colors duration-200"
                        >
                            {headers.map((header, colIndex) => (
                                <td key={colIndex} className="px-3 py-1">
                                    {header === "Action" ? (

                                        <a href="#"
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </a>
                                    ) : row[header.toLowerCase()] ? (
                                        row[header.toLowerCase()]
                                    ) : (
                                        <NATag />
                                    )}
                                </td>
                            ))}
                            {showStatus && (
                                <td className="px-3 py-1 relative">
                                    <select
                                        value={statusValues[row._id] || row.status?.toLowerCase() || 'visa processing'}
                                        onChange={(e) => handleStatusChange(row, e.target.value)}
                                        className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-200"
                                        disabled={loadingRowId === row._id}
                                    >
                                        {statusOptions.map((option) => (
                                            <option key={option} value={option.toLowerCase()}>{option}</option>
                                        ))}
                                    </select>
                                      {loadingRowId === row._id && (
                                          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-md">
                                              <Loader   size={5} />
                                          </div>
                                        )}

                                </td>
                            )}
                            {showActions && (
                                <td className="px-3 py-1">
                                    <div className="flex gap-2">
                                        {showViewButton && (
                                            <button
                                                onClick={() => handleView(row)}
                                                className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center gap-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                                View
                                            </button>
                                        )}
                                         {/* Keeping the Edit Button */}
                                    {headers.includes("Action") && (
                                        <button
                                             className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center gap-1"
                                        >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                 fill="none"
                                                 viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                              />
                                            </svg>
                                            Edit
                                        </button>
                                    )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;