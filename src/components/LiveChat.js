import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setMessage } from '../utils/chatSlice'
import {generateRandomName, generateRandomMessage2} from '../utils/randomNameGenerator'

const LiveChat = () => {

    const message = useSelector((store) => store.chat.message )
    const dispatch = useDispatch()

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(setMessage({ name:generateRandomName(), message: generateRandomMessage2() }))
        }, 1000)

        return (() => {
            clearInterval(timer)
        })
        // eslint-disable-next-line
    }, [])

  return (
    <div className='px-4 py-1'>
        <div>
            {
                message.map((item, index) => {
                    return (
                        <ChatMessage key={index} item={item} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default LiveChat
