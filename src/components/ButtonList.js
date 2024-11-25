import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive, setCategory } from '../utils/appSlice';

const buttonList = ["All", "Javascript", "Python", "Live", "Mixes", "Game", "Movie", "News", "Songs", "Trending", "Indian pop music", "Coding", "film", "Music", "Recently uploaded", "Watched", "New to you"];

const ButtonList = () => {
  const dispatch = useDispatch();
  const { active, open } = useSelector((store) => store.app)
  const scrollContainerRef = useRef(null); // Ref for the scroll container

  const videoByTag = (tag) => {
    if (active !== tag) {
      dispatch(setCategory(tag)); // Update category in Redux store
      dispatch(setActive(tag)); // Update active state in Redux store
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' }); // Scroll left by 200px
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' }); // Scroll right by 200px
  };

  return (
    <div className="flex w-[98%] mx-auto mt-1 ">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className=" left-0 mt-9 mr-2  transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
      >
        ◀
      </button>

      {/* Scrollable Button List */}  {/* This 'no-scrollbar' is defined in 'index.css' */}
      <div
        ref={scrollContainerRef}
        className={`flex  ${ open ? 'w-[74%]' : 'w-[80%]' } items-center overflow-x-scroll no-scrollbar bg-white shadow-lg shadow-gray-400/50 rounded-2xl p-1`}
      >   
        {buttonList.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => videoByTag(item)}
              className={`${
                active === item ? 'bg-slate-900 text-white' : 'bg-gray-200'
              } font-medium px-4 py-1 mx-1 rounded-lg`}
            >
              <span className="whitespace-nowrap">{item}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className=" right-0 mt-9 ml-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
      >
        ▶
      </button>
    </div>
  );
};

export default ButtonList;
