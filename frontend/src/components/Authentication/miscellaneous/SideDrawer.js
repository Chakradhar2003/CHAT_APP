import { Avatar, Badge, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { ChatState } from '../../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../../ChatLoading';
import UserListItem from '../../UserAvatar/UserListItem';
import { getSender } from '../../../config/ChatLogics'


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };
    const toast = useToast();
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }
    const accessChat = async (userId) => {
        console.log(userId);

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }
    return (
        <div className='flex justify-between items-center'>
            <div className='m-2 flex flex-row items-center border-2 w-fit rounded-lg'>
                <SearchIcon />
                <button className='p-1 outline-none border-none' onClick={onOpen}>Search Users</button>

            </div>
            <h1>Chat & Fun!</h1>
            <div><Menu>
                <MenuButton p={1} className='relative'>

                    <NotificationsActiveIcon className='mr-2' />
                    <Badge colorScheme='red' className='absolute right-[5px]'>{notification.length ? notification.length : (<></>)}</Badge>

                </MenuButton>
                <MenuList pl={2}>
                    {!notification.length && "No New Messages"}
                    {notification.map((notif) => (
                        <MenuItem key={notif._id} onClick={() => {
                            setSelectedChat(notif.chat);
                            setNotification(notification.filter((n) => n !== notif));
                        }} >
                            {notif.chat.isGroupChat
                                ? `New Message in ${notif.chat.chatName}`
                                : `New Message from ${getSender(user, notif.chat.users)}`}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ExpandMoreIcon />}>
                        <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>

                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader className='border-b-2'>Search Users</DrawerHeader>
                    <DrawerBody >
                        <input className='p-2 border-2 w-3/4 m-2 rounded-lg text-black' placeholder='Search by name or email' onChange={e => setSearch(e.target.value)}></input>
                        <button className='border-2 p-2 rounded-lg inline' onClick={handleSearch}>GO</button>
                        {loading ? <ChatLoading /> : (
                            searchResult?.map(user => (
                                <UserListItem key={user._id} handleFunction={() => accessChat(user._id)} user={user} />
                            ))
                        )}
                        {loadingChat && <Spinner ml='auto' d='flex' />}
                    </DrawerBody>
                </DrawerContent>

            </Drawer>
        </div>

    )

}

export default SideDrawer
