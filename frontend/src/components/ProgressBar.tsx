import React from 'react'

interface props {
  progressBarpercentage: number
}
const ProgressBar: React.FC<props> = ({ progressBarpercentage }) => {
  return (
    <>
      {/* <div className="flex justify-between mb-1">

  </div> */}
      <div className="mb-1 flex justify-between items-center">
        <h3 className="text-base  italic opacity-75 text-Indigo">Risk Quiz</h3>
        <span className=" rounded-full overflow-hidden text-base text-Indigo ">{progressBarpercentage}%</span>
      </div>
      <div className="w-full  border border-Indigo bg-FloralWhite rounded-full h-4 shadow-md shadow-Indigo overflow-hidden">
        <div className="flex flex-col justify-center shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] h-4 rounded-l-full text-xs text-FloralWhite text-center whitespace-nowrap transition duration-500" style={{ width: progressBarpercentage + "%" }}>{progressBarpercentage}%</div>
      </div>
    </>
  )
}

export default ProgressBar
