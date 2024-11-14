import React from "react";

const Test3 = () => {
  return (
    <div>
      <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <ul className="space-y-2">
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">John Doe</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">johndoe@example.com</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Phone:</span>
            <span className="text-gray-900">+1 234 567 890</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Address:</span>
            <span className="text-gray-900">123 Main St, Anytown</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Test3;
