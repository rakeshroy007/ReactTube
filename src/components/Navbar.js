import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import Avatar from 'react-avatar';
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux"
import { setCategory, toggleSidebar } from '../utils/appSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState("")

  const searchVideo = () => {
    dispatch(setCategory(input))
    setInput("")
  }

  const toogleHandler = () => {
    dispatch(toggleSidebar())
  }


  return (
    <div className='flex top-0 fixed justify-center items-center w-[100%] z-10 bg-white  shadow-lg' >
      <div className='w-[98%] py-1 pl-3 pb-1 flex justify-between ' >
        <div className='flex items-center space-x-2'>
          <GiHamburgerMenu onClick={toogleHandler} size={'25px'} className='cursor-pointer mr-2' />
          <img className='px-3' width={"115px"} src="https://logos-world.net/wp-content/uploads/2020/06/YouTube-Logo.png" alt="yt_logo" />
        </div>

        <div className='flex my-2 w-[40%] items-center' >
          <div className='w-[100%] py-2 px-4 border border-gray-400 rounded-l-full'>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" className=' w-full outline-none' placeholder="Search..." />
          </div>
          <button
            onClick={searchVideo}
            className="py-2 px-4 border border-gray-400 rounded-r-full transition-transform duration-300 hover:shadow-xl hover:scale-105"
          >
            <CiSearch size="24px" />
          </button>

        </div>

        <div className='flex w-[10%] items-center justify-between'>
          < IoIosNotificationsOutline size={'25px'} className='cursor-pointer' />
          < CiVideoOn size={'24px'} className='cursor-pointer' />
          <Avatar src='https://st2.depositphotos.com/2703645/7303/v/450/depositphotos_73039841-stock-illustration-male-avatar-icon.jpg' size={45} round={true} className='cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
