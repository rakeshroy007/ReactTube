import React from 'react'
import Avatar from 'react-avatar'

const localImages = [
  require('../constant/images/03.jpg')
];

const getRandomLocalImage = () => {
  const randomIndex = Math.floor(Math.random() * localImages.length);
  return localImages[randomIndex];
};

const ChatMessage = ({ item }) => {

  

  return (

    <div className="flex items-start mb-3 bg-gray-200 rounded-lg">
      {/* Avatar Section */}
      <div>
        <Avatar
          src={getRandomLocalImage()}
          size={27}
          round={true}
          className="cursor-pointer"
        />
      </div>

      {/* Chat Content Section */}
      <div className="ml-3">
        <span className="font-medium text-sm leading-tight">{item.name}</span>
        <span className="text-sm mt-1">&nbsp;&nbsp;{item.message}</span>
      </div>
    </div>

  )
}

export default ChatMessage
