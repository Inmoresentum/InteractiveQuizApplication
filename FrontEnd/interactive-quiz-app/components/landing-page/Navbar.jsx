"use client"

import {useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import Image from "next/image";
import AppLogo from "../../public/quiz-app-logo.png"
import ReactSVG from "../../public/react.svg"
import Link from "next/link";
import {MdNavigateNext} from "react-icons/md";
import {useSession} from "next-auth/react";
import MainLoadingSpinnerUi from "@/components/loading-animation/MainLoadingSpinnerUi";

export default function Navbar() {
    const [nav, setNav] = useState(false);
    const sessionData = useSession();

    if (sessionData.status === "loading") return <MainLoadingSpinnerUi/>
    console.log(sessionData)
    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div
            className="bg-black fixed top-0 left-0 right-0 z-50 backdrop-filter backdrop-blur-md bg-opacity-50">
            <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white ">
                <div className="flex text-3xl font-bold text-[#00df9a] uppercase">
                    <Link className="peer" href={"/"}>
                        <Image
                            className="w-10 h-10 rounded-2xl hover:scale-110 duration-300 ease-linear animate-pulse"
                            src={AppLogo}
                            alt={ReactSVG}/>
                    </Link>
                    <Link className="peer-hover:text-purple-500 transition-colors duration-300
                     ease-in-out peer-hover:animate-pulse" href="/">
                        <h1 className="px-2 shadow-2xl hover:shadow-green-500 hover:text-indigo-600 ease-in-out duration-300">WizeWiz</h1>
                    </Link>
                </div>
                <ul className="hidden md:flex">
                    <li className=" p-4 hover:border-b hover:border-gray-600 hover:bg-green-500 rounded-full
                         hover:text-black  active:bg-amber-300 transition duration-700 ease-in-out relative group">
                        <div className="flex items-center group font-medium">
                            HOME
                            <MdNavigateNext size={24} className="transform group-hover:rotate-90 duration-300 ease-in"/>
                        </div>

                        <div
                            className="absolute mt-2 top-full left-1/2 transform -translate-x-1/2 w-64 bg-gray-50 p-6
                             rounded-xl shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out
                               -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                                 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                            <h3 className="font-bold text-lg mb-4 text-black text-center">Submenu Title</h3>
                            <ul className="space-y-2">
                                <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 cursor-pointer text-center">
                                    <Link href={"/"}>
                                        Submenu Item 1
                                    </Link>
                                </li>
                                <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 text-center">
                                    <Link href={"/"}>
                                        Submenu Item 2
                                    </Link>
                                </li>
                                <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 text-center">
                                    <Link href={"/"}>
                                        Submenu Item 3
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className=" p-4 hover:border-b hover:border-gray-600 hover:bg-green-500 rounded-full
                          hover:text-black active:bg-amber-300 transition duration-700 ease-in-out relative group">
                        <div className="flex items-center group font-medium ">
                            QUIZZES
                            <MdNavigateNext size={24} className="transform group-hover:rotate-90 duration-300 ease-in"/>
                        </div>

                        <div
                            className="absolute mt-2 top-full left-1/2 transform -translate-x-1/2 w-64 bg-gray-50 p-6
                             rounded-xl shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out
                               -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                                 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                            <h3 className="font-bold text-lg mb-4 text-black text-center">
                                ANYTHING IN MIND
                            </h3>
                            <ul className="space-y-2">
                                <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 cursor-pointer text-center">
                                    <Link href={"/"}>
                                        ALL QUIZZES
                                    </Link>
                                </li>
                                <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 text-center">
                                    <Link href={"/"}>
                                        LEADER BOARD
                                    </Link>
                                </li>
                                {sessionData.data?.user.role === "USER" &&
                                    <li className="py-1 px-4 rounded-full bg-gray-500 text-md hover:text-red-400 hover:bg-gray-700 text-center">
                                        <Link href="/quiz/create/">
                                            CREATE QUIZ
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </li>
                    <li className=" p-4 hover:border-b hover:border-gray-600 hover:bg-blue-500 rounded-full
                         active:bg-amber-300 transition duration-700 ease-in-out relative group">
                        <div className="flex items-center group font-medium">
                            ABOUT
                            <MdNavigateNext size={24} className="transform group-hover:rotate-90 duration-300 ease-in"/>
                        </div>

                        <div
                            className="absolute mt-2 top-full left-1/2 transform -translate-x-1/2 w-64 bg-gray-50 p-6
                             rounded-xl shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out
                               -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                                 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                            <h3 className="font-bold text-lg mb-4 text-black text-center">
                                CHOOSE WHAT YOU WANT TO READ
                            </h3>
                            <ul className="space-y-2">
                                <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 cursor-pointer text-center">
                                    <Link href={"/"}>
                                        PRIVACY AND POLICY
                                    </Link>
                                </li>
                                <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 text-center">
                                    <Link href={"/"}>
                                        TERMS OF SERVICES
                                    </Link>
                                </li>
                                <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 text-center">
                                    <Link href={"#newslatter"}>
                                        NEWS LETTER
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="p-4 hover:bg-white hover:text-black font-medium hover:rounded-full">
                        <Link href={"#pricing"}>
                            PRICING
                        </Link>
                    </li>
                    {sessionData.status === "unauthenticated" ?
                        (
                            <li className="p-4 hover:bg-white bg-gray-900 hover:text-black font-medium rounded-full animate-pulse">
                                <Link href={"/auth/login"}>
                                    LOGIN
                                </Link>
                            </li>
                        ) :
                        (
                            <li className=" p-4 hover:border-b hover:border-gray-600 hover:bg-blue-500 rounded-full
                         active:bg-amber-300 transition duration-700 ease-in-out relative group">
                                <div className="flex items-center group font-medium">
                                    {sessionData.data.user.username}
                                    <MdNavigateNext size={24} className="transform group-hover:rotate-90 duration-300 ease-in"/>
                                </div>

                                <div
                                    className="absolute mt-2 top-full left-1/2 transform -translate-x-1/2 w-64 bg-gray-50 p-6
                             rounded-xl shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out
                               -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div
                                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                                 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                                    <h3 className="font-bold text-lg mb-4 text-black text-center">
                                        Feeling Lucky
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 cursor-pointer text-center">
                                            <Link href={"/"}>
                                                YOUR DASHBOARD
                                            </Link>
                                        </li>
                                        {sessionData.data.user.role === "ADMIN" &&
                                            <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 cursor-pointer text-center">
                                                <Link href={"http://localhost:3000/dashboard/admin/activity"}>
                                                    ADMIN DASHBOARD
                                                </Link>
                                            </li>
                                        }
                                        <li className="py-1 px-4 rounded-full bg-gray-500 hover:bg-gray-700 text-center text-red-400">
                                            <Link href="/api/auth/signout">
                                                LOGOUT
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        )
                    }
                </ul>
                <div onClick={handleNav}
                     className="block md:hidden hover:cursor-pointer transition duration-300 ease-in-out">
                    {nav ? <AiOutlineClose size={20} className="text-gray-600  mix-blend-color hover:text-rose-500"/> :
                        <AiOutlineMenu size={20} className="text-gray-600 mix-blend-color hover:text-rose-500"/>}
                </div>
                <ul className={`${nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500" :
                    "ease-in-out duration-500 fixed left-[-100%]"}`}>
                    <div className="flex text-3xl font-bold text-[#00df9a] uppercase m-1.5">
                        <Link className="peer" href={"/"}>
                            <Image
                                className="w-7 h-7 rounded-2xl hover:scale-110 duration-300 ease-linear animate-pulse m-1.5"
                                src={AppLogo}
                                alt={ReactSVG}/>
                        </Link>
                        <Link className="peer-hover:text-purple-500 transition-colors duration-300
                     ease-in-out peer-hover:animate-pulse" href="/">
                            <h1 className="px-2 shadow-2xl hover:shadow-green-500 hover:text-indigo-600 ease-in-out duration-300">WizeWiz</h1>
                        </Link>
                    </div>
                    {/*<li will be replaced with Link from next*/}
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Home
                    </li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Company
                    </li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Resources
                    </li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">About
                    </li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Contact
                    </li>
                    {/*<li will be replaced with Link from next*/}
                </ul>
            </div>
        </div>
    );
}
