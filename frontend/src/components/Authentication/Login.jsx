import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import axios, { isCancel, AxiosError } from 'axios';
const Login = (params) => {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
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

        // console.log(email, password);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            // console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
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
    };
    return (
        <div className='flex flex-col'>

            <div className='w-full border-4 flex items-center rounded-lg my-4'>
                <EmailIcon className='mx-2' />
                <input type="email" placeholder='Enter your email' required onChange={(e) => setEmail(e.target.value)} className='outline-none p-2 w-full ' value={email} />
            </div>
            <div className='w-full border-4 flex items-center rounded-lg my-4'>
                <LockIcon className='mx-2' />
                <input type={show ? "text" : "password"} placeholder='Enter password' required onChange={(e) => setPassword(e.target.value)} className='outline-none p-2 w-full ' value={password} />
                <button className='mr-2' onClick={() => handleClick()}>{!show ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
            </div>

            <button className='border-none bg-green-600 text-white w-1/2 mx-auto p-2 font-semibold rounded-xl mb-6 hover:bg-green-800 hover:scale-105 duration-500 ' isLoading={loading} onClick={submitHandler} >Login</button>
            <button onClick={() => { setEmail("guest@example.com"); setPassword("123456") }} className=' border-2 w-1/2 mx-auto p-2 font-semibold rounded-xl mb-6 bg-red-600 text-white hover:bg-red-700 duration-500 hover:scale-105'>Get User Credentials</button>

        </div >
    )
}

export default Login
