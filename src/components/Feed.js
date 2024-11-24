import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const Feed = () => {
  return (
    <div className="flex flex-col h-full ">
    {/* Button list is fixed at the top */}
      <div className="flex-shrink-0 mb-2 pb-3 ">
        <ButtonList />
      </div>
      {/* Video container takes up the remaining space */}
      <div className="flex-1 overflow-y-auto ">
        <VideoContainer />
      </div>
  </div>
  )
}

export default Feed
