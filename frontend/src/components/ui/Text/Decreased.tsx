import React from 'react'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
function Decreased() {
    return (
        <div className='inline-flex items-center justify-start '>
            <IoCheckmarkCircleSharp className='text-lime-700' size={20} /> 
            <span className='text-[14px] ml-1 text-Indigo uppercase font-semibold '>risk decreased</span>
        </div>
    )
}

export default Decreased