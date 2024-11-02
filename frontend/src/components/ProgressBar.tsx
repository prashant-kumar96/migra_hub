import React from 'react'

interface props {
  progressBarpercentage:number
}
const ProgressBar:React.FC<props> = ({progressBarpercentage}) => {
  return (
    <>
    <div className="flex justify-between mb-1">

  </div>
  <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-900">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: progressBarpercentage+"%"}}></div>
  </div>
  </>
  )
}

export default ProgressBar
