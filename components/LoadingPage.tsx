import React from 'react'
import { LoadingBars } from './ui/LoadingIcons'

const LoadingPage = () => {
  // return
  return (
    <div className="absolute h-full w-full flex flex-col items-center justify-center gap-3 bg-white">
      <LoadingBars width={100} height={100} />
    </div>
  )
}

export default LoadingPage
