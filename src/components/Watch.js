import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { API_KEY } from '../constant/youtube'
import Avatar from 'react-avatar'
import { BiLike, BiDislike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { BsDownload } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import LiveChat from './LiveChat'
import { useDispatch } from 'react-redux'
import { setMessage } from '../utils/chatSlice'
import VideoDescription from './VideoDescription'
import { formatNumber } from '../utils/formatNumber';
import { timeAgo } from '../utils/timeAgo'



const Watch = () => {
    const [singleVideo, setSingleVideo] = useState(null)
    const [searchParams] = useSearchParams()
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    const videoId = searchParams.get('v')

    const getSingleVideo = async () => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&regionCode=IN&key=${API_KEY}`)
            setSingleVideo(res?.data?.items[0])

        } catch (error) {
            console.log("Error 1 is : ", error)
        }
    }
    useEffect(() => {
        getSingleVideo()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                // Step 1: Fetch video details using videoId to get channelId
                const videoResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`);
                const channelId = videoResponse.data.items[0].snippet.channelId;

                // Step 2: Use channelId to fetch subscriber count
                const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`);
                const subs = channelResponse.data.items[0].statistics.subscriberCount;
                setSubscriberCount(formatNumber(subs)); // Format subscriber count
            } catch (error) {
                console.error('Error fetching video/channel details:', error);
            }
        };

        fetchVideoDetails();
    }, [videoId]);


    // Helper function to format numbers in YouTube-style (1K, 1M, etc.)
    const formatLikes = (likes) => {
        if (likes >= 1_000_000) return (likes / 1_000_000).toFixed(1) + 'M';
        if (likes >= 1_000) return (likes / 1_000).toFixed(1) + 'K';
        return likes;
    };

    const sendMessage = () => {
        dispatch(setMessage({
            name: "Me",
            message: input
        }))
        setInput("")
    }


    return (
        <div className='flex ml-[3%] w-[90%] mb-[7%] '>
            <div className='flex w-full'>
                <div>
                    {/* This 'iframe' is from official youtube -> share -> Embed */}
                    <iframe
                        width="770"
                        height="400"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}        // Disable suggession off usign '&rel=0'...
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen >
                    </iframe>
                    <h1 className='font-semibold mt-2 text-lg max-w-[770px]'>{singleVideo?.snippet?.title}</h1>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex items-center w-[30%]'>
                            <div className='flex'>
                                <Avatar src={singleVideo?.snippet?.thumbnails?.high?.url} size={35} style={{ objectFit: 'cover', width: '55px', height: '55px' }} round={true} className='cursor-pointer mt-1 mr-2 ml-1' />
                                <div className={`flex flex-col mt-1 mr-4 ${singleVideo?.snippet?.channelTitle?.length > 18 ? 'ml-3' : ''}`}>
                                    <h1 className={`font-medium text-lg w-full  ${singleVideo?.snippet?.channelTitle?.length > 18 ? 'block' : 'truncate'}`}>
                                        {singleVideo?.snippet?.channelTitle}
                                    </h1>
                                    <div className='flex items-center'>
                                        <div className='text-sm text-gray-600 text-sm ' >{subscriberCount} </div>
                                        <div className='text-sm text-gray-600 text-sm '> &nbsp;&nbsp;subscribers</div>
                                    </div>
                                </div>
                            </div>
                            <button className='px-5 py-2 font-medium bg-black text-white rounded-full ml-3 
                                        transition-all duration-100 hover:bg-white hover:text-black hover:border-2 hover:border-black hover:shadow-lg'>
                                Subscribe
                            </button>
                        </div>
                        <div className='flex'>
                            <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full mr-2'>
                                {singleVideo?.statistics?.likeCount ? (
                                    <>
                                        <BiLike size={"21px"} className="mr-4 transition-all duration-300 hover:scale-110 " />
                                        <span>{formatLikes(singleVideo.statistics.likeCount)}</span>
                                    </>
                                ) : (
                                    <>
                                        <BiLike size={"21px"} className="mr-4 transition-all duration-300 hover:scale-110" />
                                        <span className="font-medium">Hidden</span>
                                    </>
                                )}
                                {/* Divider between Like and Dislike */}
                                <span className="px-2 text-gray-500">|</span>

                                < BiDislike size={"21px"} className='transition-all duration-300 hover:scale-110' />
                            </div>
                            <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full mr-2 '>
                                < PiShareFatLight size={"21px"} className='mr-2 transition-all duration-300 hover:scale-110' />
                                <span className='text-base'>Share</span>
                            </div>
                            <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full  '>
                                < BsDownload size={"21px"} className='mr-2 transition-all duration-300 hover:scale-110' />
                                <span>Download</span>
                            </div>
                        </div>
                    </div>

                    <VideoDescription
                        views={formatNumber(singleVideo?.statistics?.viewCount)}
                        uploadTime={timeAgo(singleVideo?.snippet?.publishedAt)}
                        description={singleVideo?.snippet?.description}
                        hashtags={formatLikes(singleVideo?.snippet?.tags)}
                        comments={formatNumber(singleVideo?.statistics?.commentCount)}
                    />
                </div>

                <div className='w-[100%] border border-gray-300 ml-10 rounded-lg h-fit p-4'>
                    <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm">
                        <h1 className="text-lg font-semibold text-gray-800 tracking-wide">Top Chat</h1>
                        <BsThreeDotsVertical className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                    </div>
                    <div className='overflow-y-auto h-[28rem] flex flex-col-reverse'>
                        <LiveChat />
                    </div>
                    <div className='flex items-center justify-between border-t p-2'>
                        <div className='flex items-center w-[90%] mt-2'>
                            <div>
                                <Avatar src='https://st2.depositphotos.com/2703645/7303/v/450/depositphotos_73039841-stock-illustration-male-avatar-icon.jpg' size={35} round={true} className='cursor-pointer' />
                            </div>
                            <input value={input} onChange={(e) => setInput(e.target.value)} className='border-b border-gray-300 outline-none ml-2' type="text" placeholder='Send message...' />
                            <div className='bg-gray-200 cursor-pointer p-2 rounded-xl ml-5 
                                            transition-all duration-300 
                                            hover:scale-105 hover:shadow-lg hover:bg-gray-300'>
                                < BsSend onClick={sendMessage} className='cursor-pointer ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watch
