const nameList = [
    "Aarav", "Ananya", "Vivaan", "Diya", "Krishna", "Sneha", "Rohan", "Aditi", "Aryan", "Isha", "Aditya", 
    "Riya", "Karan", "Priya", "Nikhil", "Meera", "Harsh", "Pooja", "Vikram", "Sonia", "Manav", "Tanya", 
    "Raj", "Shruti", "Arjun", "Sakshi", "Aniket", "Neha", "Rahul", "Akansha", "Siddharth", "Kriti", "Yash", 
    "Anusha", "Kabir", "Anjali", "Vikas", "Kajal", "Om", "Simran", "Armaan", "Naina", "Dhruv", "Ira", "Kunal", 
    "Pallavi", "Jay", "Ishita", "Samarth", "Rekha"
  ];
  

export const generateRandomName = () => {
    return nameList[Math.floor(Math.random() * nameList.length)];
};


// program to generate random strings
export const generateRandomMessage = (length) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        randomText += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return randomText;
}


const chatList = [
    "Hey everyone! 👋",
    "This is amazing! 😍",
    "Where's everyone watching from? 🌎",
    "I didn't expect that! 😱",
    "Can someone explain what just happened? 🤔",
    "Such a chill vibe here 🌼",
    "Who's here before 1K views? 🏆",
    "The chat is moving so fast! 😂",
    "Let's hit the like button, y'all! 👍",
    "Wait, what? Rewind that! ⏪",
    "This is better than TV! 📺",
    "Anyone else drinking coffee while watching? ☕",
    "Where did you find this? 🔍",
    "I can't stop laughing 😂😂",
    "Respect to the creators 🙌",
    "Who's the host? They’re awesome! 💥",
    "This chat is lit! 🔥🔥",
    "Why does this feel so relatable? 😅",
    "Pin this comment, please! 📌",
    "How long has the stream been on? 🕒",
    "I’ve shared this with all my friends! 🤩",
    "What's the next topic? 🎯",
    "I need more content like this! 🥺",
    "This reminds me of my favorite movie 🎥",
    "Y'all are hilarious in this chat! 😂",
    "First time here, already loving it! 🌟",
    "Where’s the replay option? 🤷‍♂️",
    "Can we get a tutorial on this? 📘",
    "Who's the real MVP of this chat? 👑",
    "Such good energy here today! 🌈",
    "Wow, that was unexpected 😳",
    "I just paused my work for this 😅",
    "Please explain that in simple terms! 🧠",
    "Best part of my day 💖",
    "Who else is binge-watching this content? 🎬",
    "This deserves a million views! 🌟",
    "I've got this on my big screen! 🖥️",
    "How does this chat feel like a community already? 🤝",
    "Any tips for beginners? ✏️",
    "Someone drop the link, please! 🔗",
    "This is too good to be free! 🤑",
    "Can’t believe this is live! 😍",
    "Who else is multitasking while watching? 🖱️",
    "This is exactly what I needed today 💯",
    "Y'all are spamming too much 😡",
    "What’s the next stream about? 🤔",
    "This reminds me of the good old days 🌟",
    "The nostalgia is real here 🕰️",
    "Let’s get to 10K likes, folks! 🚀",
    "I’m bookmarking this stream for sure 🔖"
];
  
export const generateRandomMessage2 = () => {
    return chatList[Math.floor(Math.random() * chatList.length)];
}



