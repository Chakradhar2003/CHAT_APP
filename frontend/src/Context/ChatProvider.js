import { useNavigate } from "react-router-dom";

import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext()
const ChatProvider = ({ children }) => {

    const [user, SetUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        SetUser(userInfo);
        if (!userInfo) {
            navigate("/");
        }
    }, [navigate])
    return (
        <ChatContext.Provider value={{ user, SetUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }} >{children}</ChatContext.Provider>
    )
}


export const ChatState = () => {

    return useContext(ChatContext);
}
export default ChatProvider