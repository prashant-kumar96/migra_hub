// import React from 'react'
// import { IoCheckmarkCircleSharp } from "react-icons/io5";
// function Increased() {
//     return (
//         <div className='inline-flex items-center justify-start '>
//             <IoCheckmarkCircleSharp className='text-lime-700' size={20} /> 
//             <span className='text-[14px] ml-1 text-Indigo uppercase font-semibold '>risk decreased</span>
//         </div>
//     )
// }

// export default Increased
import React from 'react'
import { PiSealWarningDuotone } from "react-icons/pi";
function Increased() {
  return (
    <div className='inline-flex items-center justify-start '>
      <PiSealWarningDuotone color='red' size={20}/> 
      <span className='text-[14px] ml-1 text-Indigo uppercase font-semibold '>risk increased</span>
    </div>
  )
}

export default Increased
