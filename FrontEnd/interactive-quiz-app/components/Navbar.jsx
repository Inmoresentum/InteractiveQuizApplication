"use client"

import {useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

export default function Navbar() {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div
            className="bg-black fixed top-0 left-0 right-0 z-50 backdrop-filter backdrop-blur-md bg-opacity-50">
            <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white ">
                <h1 className="w-full text-3xl font-bold text-[#00df9a] uppercase">Whatever</h1>
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
                <ul className={`${nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' :
                    'ease-in-out duration-500 fixed left-[-100%]'}`}>
                    <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4 uppercase">Whatever</h1>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500 hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Home</li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500 hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Company</li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500 hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Resources</li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500 hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">About</li>
                    <li className="bg-[#000300] p-4 border-b border-gray-600 hover:bg-rose-500 hover:cursor-pointer active:bg-amber-300 transition duration-700 ease-in-out">Contact</li>
                </ul>
            </div>
        </div>
    );

}
