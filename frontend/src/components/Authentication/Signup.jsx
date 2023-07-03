import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ChakraProvider } from '@chakra-ui/react'
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useToast } from '@chakra-ui/react'
import { WrapItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import axios, { isCancel, AxiosError } from 'axios';
const Signup = (params) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const postDetails = (pics) => {
        setLoading(true);

        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
            toast({
                title: "Please Select a JPEG or PNG Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {

            const data = new FormData()
            data.append("file", pics)
            data.append("upload_preset", "chat-app")
            data.append("cloud_name", "dwogjazto")
            axios.post("https://api.cloudinary.com/v1_1/dwogjazto/image/upload", data)
                .then((response) => {
                    console.log("Cloudinary response:", response);
                    setPic(response.data.url.toString());
                    setLoading(false);
                    toast({
                        title: "Image uploaded successfully!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                })
                .catch((error) => {
                    console.log("Cloudinary error:", error);
                    setLoading(false);
                });
        }
    }
    const handleClick = () => setShow(!show);
    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword || !pic) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:3000/api/user",
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            );
            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }

    }
    return (
        <div className='flex flex-col'>

            <div className='w-full border-4 flex items-center rounded-lg my-2'>
                <PersonIcon className='mx-2' />
                <input type="text" placeholder='Enter your name' required onChange={(e) => setName(e.target.value)} className='outline-none p-2 w-full ' />
            </div>
            <div className='w-full border-4 flex items-center rounded-lg my-2'>
                <EmailIcon className='mx-2' />
                <input type="email" placeholder='Enter your email' required onChange={(e) => setEmail(e.target.value)} className='outline-none p-2 w-full ' />
            </div>
            <div className='w-full border-4 flex items-center rounded-lg my-2'>
                <LockIcon className='mx-2' />
                <input type={show ? "text" : "password"} placeholder='Enter password' required onChange={(e) => setPassword(e.target.value)} className='outline-none p-2 w-full ' />
                <button className='mr-2' onClick={() => handleClick()}>{!show ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
            </div>
            <div className='w-full border-4 flex items-center rounded-lg my-2'>
                <LockIcon className='mx-2' />
                <input type={show ? "text" : "password"} placeholder='Enter password again' required onChange={(e) => setConfirmPassword(e.target.value)} className='outline-none p-2 w-full ' />
                <button className='mr-2' onClick={() => handleClick()}>{!show ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
            </div>
            <div className='w-full border-4 flex items-center rounded-lg my-2'>
                <AccountCircleIcon className='mx-2' />
                <input type="file" accept='imgae/*' onChange={e => postDetails(e.target.files[0])} className='outline-none p-2 w-full' />
            </div>

            <button className='border-none bg-green-600 text-white w-1/2 mx-auto p-2 font-semibold rounded-xl mb-6 hover:bg-green-800 hover:scale-105 duration-500 mt-3 -mb-1' isloading={loading} onClick={() => submitHandler()}
            > Sign Up</button>



        </div >
    )
}

export default Signup
