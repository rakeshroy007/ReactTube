import React, { useEffect } from 'react'
import axios from 'axios'
import { API_KEY, YOUTUBE_VIDEO_API, FETCH_BY_CATEGORY_API } from '../constant/youtube'  
import VideoCart from './VideoCart'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setHomeVideo, setIsLoading, resetVideos } from '../utils/appSlice'



const VideoContainer = () => {
  const dispatch = useDispatch()   
  const { video, category } = useSelector((store) => store.app)      

  const fetchingYoutubeVideo = async() => {
    try {
      const res = await axios.get(`${YOUTUBE_VIDEO_API}`)
      dispatch(setHomeVideo(res?.data?.items))

    } catch (error) {
      console.log("Error 2 is: ", error)
    }
  }

  const fetchVideoByCategory = async () => {
    try {
        const res = await axios.get(FETCH_BY_CATEGORY_API + `&q=${category}&type=video&key=${API_KEY}`)
        dispatch(setHomeVideo(res?.data?.items))
    } catch (error) {
        console.log("Error 6 is :", error)
    }
  }

  useEffect(() => {

    dispatch(resetVideos());       // Reset video data whenever the category changes

    setTimeout(() => {
      if (category === "All") {
        fetchingYoutubeVideo()
      } else {
        fetchVideoByCategory()
      }
      dispatch(setIsLoading(false));
    }, 2000);

    return () => clearTimeout(2000); // Cleanup timeout on component unmount

    // eslint-disable-next-line 
  },[category])

  return (
    <div className={`mt-4 grid grid-cols-3 gap-3 mb-20 mx-3 w-[98%]`} >
      {video.length === 0 ? (      // Check if video data is still loading
      Array.from({ length: 6 }).map((_, index) => (     // Render 6 skeleton cards
        <div key={index}>
          <VideoCart isLoading={true} /> {/* Skeleton card */}
        </div>
      ))
    ) : (
      video.map((item, index) => (
        <Link
          to={`/watch?v=${typeof item.id === "object" ? item.id.videoId : item.id}`}
          key={index}
        >
          <VideoCart item={item} isLoading={false} /> {/* Actual content */}
        </Link>
      ))
    )}
    </div>
  )
}

export default VideoContainer
