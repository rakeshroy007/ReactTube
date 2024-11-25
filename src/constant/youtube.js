export const API_KEY = process.env.REACT_APP_API_KEY_2
export const BASE_URL = "https://www.googleapis.com/youtube/v3"

// This is from 'most popular videos'...
export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=75&regionCode=US&key=${API_KEY}`
