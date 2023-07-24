"use client"

import {useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import Image from "next/image";
import AppLogo from "../../public/quiz-app-logo.png"
import ReactSVG from "../../public/react.svg"
import Link from "next/link";

export default function Navbar() {
    const [nav, setNav] = useState(false);

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
                    <li className="p-4">Home</li>
                    <li className="p-4">Company</li>
                    <li className="p-4">Resources</li>
                    <li className="p-4">About</li>
                    <li className="p-4">Contact</li>
                </ul>
                <div onClick={handleNav}
                     className="block md:hidden hover:cursor-pointer transition duration-300 ease-in-out">
                    {nav ? <AiOutlineClose size={20} className="text-gray-600 hover:text-rose-500"/> :
                        <AiOutlineMenu size={20} className="text-gray-600 hover:text-rose-500"/>}
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
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Home</li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Company</li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Resources</li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">About</li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500
                     hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Contact</li>
                    {/*<li will be replaced with Link from next*/}
                </ul>
            </div>
        </div>
    );
}
