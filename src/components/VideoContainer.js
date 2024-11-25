import React, { useEffect } from 'react'
import axios from 'axios'
import { API_KEY, YOUTUBE_VIDEO_API } from '../constant/youtube'  
import VideoCart from './VideoCart'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setHomeVideo, setIsLoading, resetVideos } from '../utils/appSlice'


const VideoContainer = () => {
  const dispatch = useDispatch()   
  const {video, category, open} = useSelector((store) => store.app)      

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
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${category}&type=video&key=${API_KEY}`)
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
    <div className={`mt-5 grid grid-cols-3 gap-3 mb-20 ${ open ? 'w-[80%]' : 'w-[84%]' }`} >
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
