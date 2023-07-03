import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/Authentication/miscellaneous/SideDrawer'
import MyChats from '../components/Authentication/MyChats'
import ChatBox from '../components/Authentication/ChatBox'

const ChatPage = () => {

    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
    <div className='w-full' style = {{width: "100%"}}>
        {user && <SideDrawer />}
        <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && (
                 <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
        </Box>
    </div >
    );
};

export default ChatPage
//nppm i axios
// const [chats, setChats] = useState([])
    // const fetchChats = async () => {
    //     const { data } = await axios.get("http://localhost:5000/api/chat");
    //     setChats(data);
    // }
    // useEffect(() => {
    //     fetchChats();
    // }, [])
    //{chats.map((chat) => <div key={chat.id}>{chat.chatName}</div>)}