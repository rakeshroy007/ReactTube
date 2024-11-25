import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { API_KEY } from '../constant/youtube';
import { formatNumber } from '../utils/formatNumber';
import { timeAgo } from '../utils/timeAgo';
require('../constant/images/03.jpg')



const VideoCart = ({ item, isLoading }) => {
  const [ytIcon, setYtIcon] = useState("")

  const getYoutubeChannelName = async () => {
    try {
      const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=${API_KEY}`)
      setYtIcon(
        res.data.items[0].snippet.thumbnails.high?.url || 
        // res.data.items[0].snippet.thumbnails.medium?.url || 
        // res.data.items[0].snippet.thumbnails.default?.url || 
        require('../constant/images/03.jpg')

      );
    } catch (error) {
      console.log("Error 2 is : ", error)
    }
  }

  useEffect(() => {

    getYoutubeChannelName()
      
    // eslint-disable-next-line
  }, [])



  return isLoading ? (
    <div className="w-94 cursor-pointer mb-2 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg shadow-lg"></div>
      <div className="flex mt-2 mx-1">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="ml-2">
          <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-32 mb-1"></div>
          <div className="h-3 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-94 cursor-pointer mb-2 bg-gray-100 border-1 rounded-2xl transition-transform duration-300 hover:shadow-2xl hover:scale-95">
      <img
        className="w-full rounded-lg shadow-lg object-cover"
        src={item?.snippet?.thumbnails?.standard?.url || item?.snippet?.thumbnails?.medium?.url}
        alt="YouTube Video Thumbnail"
      />
      <div>
        <div className="flex mt-2 mx-1 pb-4  ">
          <Avatar
            src={ytIcon}
            size={50}
            round={true}
            className="cursor-pointer"
            style={{ objectFit: "cover", width: "80px", height: "80px" }}
          />
          <div className="ml-2">
            <h1 className="font-bold">
              {item?.snippet?.title?.length > 65
                ? item?.snippet?.title?.substring(0, 70) + "..."
                : item?.snippet?.title
              }
            </h1>
            <p className="text-sm text-gray-600">{item?.snippet?.channelTitle}</p>
            <span className="text-sm text-gray-500">
              {item?.statistics?.viewCount
                ? `${formatNumber(item?.statistics?.viewCount)} views •`
                : ""}{" "}
              {item?.snippet?.publishedAt ? timeAgo(item?.snippet?.publishedAt) : "NO"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCart
