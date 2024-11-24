import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { FaGithubAlt } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActive, setCategory } from '../utils/appSlice';


const sidebarItem = [
  {
    icons: <IoHomeOutline size={"24px"} className="mx-3" />,
    title: "Home",
    path: "/", // Define the path for navigation
    activeName: "All", // Active state value for Home
  },
  {
    icons: <SiYoutubeshorts size={"24px"} className="mx-3" />,
    title: "Shorts",
    path: "/",
    activeName: "Shorts", // Active state value for Shorts
  },
  {
    icons: <FaGithubAlt size={"24px"} className="mx-3" />,
    title: "Github",
    path: "https://github.com/rakeshroy007", // Your GitHub profile URL
    activeName: null, // No active state needed for Github
  },
]


const Sidebar = () => {
  const open = useSelector((store) => store.app.open)
  const active = useSelector((store) => store.app.active);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleNavigation = (path, activeName) => {
    if (path.startsWith("http")) {
      // Open external links like GitHub in a new tab
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      // Default behavior for navigation
      navigate(path);
      dispatch(setActive(activeName));
      dispatch(setCategory(activeName));
    }
  };

  return (
    <div className={` relative left-0 ${open ? "w-[17%]" : "w-[9%]"} px-3 h-full bg-gray-100 transition-all duration-300 cursor-pointer fixed rounded-2xl `}>
        {
            sidebarItem.map((item, index) => {
                return (
                    <div
                      key={index}
                      className={`flex ${open ? "flex-row" : "flex-col"} items-center my-3 py-3  ${
                        active === item.activeName ? "bg-blue-500 text-white" : "bg-gray-200"
                      }  rounded-xl text-center`}
                      onClick={() => handleNavigation(item.path, item.activeName)}   // Navigate to the corresponding path
                    >
                      <div className="flex justify-center items-center">
                        {item.icons}
                      </div>
                      <p className={` ${open ? "m-3" : "text-center"}`}>
                        {item.title}
                      </p>
                    </div>
                  );
                  
            })
        }
    </div>
  )
}

export default Sidebar
