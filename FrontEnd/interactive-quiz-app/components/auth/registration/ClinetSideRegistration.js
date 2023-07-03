"use client"
import { useState } from 'react';
import {RiLockPasswordLine, RiUserLine} from "react-icons/ri";

export default function ClientSideRegiFrom() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-500">
            <form className="bg-white shadow-xl rounded-lg p-10 transform hover:scale-105 transition-transform">
                <h2 className="text-3xl font-bold text-center mb-8">Create an Account</h2>
                <div className="mb-8 flex items-center bg-gray-200 rounded-md px-4 py-2">
                    <RiUserLine className="text-gray-500 text-xl mr-4" />
                    <input
                        type="email"
                        id="email"
                        className="w-full bg-gray-200 focus:outline-none"
                        placeholder="Please Enter Your Email"
                    />
                </div>
                <div className="mb-8 flex items-center bg-gray-200 rounded-md px-4 py-2">
                    <RiLockPasswordLine className="text-gray-500 text-xl mr-4" />
                    <input
                        type="password"
                        id="password"
                        className="w-full bg-gray-200 focus:outline-none"
                        placeholder="Password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-md font-bold transition-all duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
}