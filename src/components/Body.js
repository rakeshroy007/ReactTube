import React from 'react'
import Sidebar from './Sidebar';

import { Outlet } from 'react-router-dom';

const Body = () => {
  return (
      <div className="flex mt-20 h-screen w-[97%] ">
          <Sidebar />
          {/* Video container that adjusts width dynamically */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Outlet />
          </div>
      </div>     
)
}

export default Body
