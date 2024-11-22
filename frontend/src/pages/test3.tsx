import React from 'react';
import { FaUserTie } from "react-icons/fa6";
const GithubButton = () => {
  return (
    <button className="flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900">
      <FaUserTie size={20}/>
      <span className='text-lg font-thin uppercase tracking-wide'>Create Case Manager</span>
    </button>
  );
};

export default GithubButton;
