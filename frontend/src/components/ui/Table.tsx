import React from "react";
import NATag from "./tags/NATag";

const Table = ({ headers, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <NATag />
      </div>
    );
  }

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
                    <a
                      href="#"
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
