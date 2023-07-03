import React, { useEffect, useState } from 'react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useNavigate } from 'react-router-dom';



const Tabs = ({ color }) => {
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <>
            <h1 className='text-center mt-10 text-4xl font-semibold'>Chat & Fun !</h1>
            <div className="flex flex-wrap justify-center p-10 ">

                <div className="sm:w-1/2 w-full">

                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Log In
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Sign Up
                            </a>
                        </li>

                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <Login />
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <Signup />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function HomePage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {

        if (user) navigate("/chats");
    }, [navigate])
    return (
        <>
            <Tabs color="cyan" />

        </>
    )
}
