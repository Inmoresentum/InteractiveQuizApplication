"use client"

import {RiLockPasswordLine, RiMailLine} from "react-icons/ri";
import quizAppLogo from "../../public/quiz-app-logo.png"
import Link from "next/link";
import Image from "next/image";
import reactLogo from "../../public/react.svg"
import {motion} from "framer-motion";
import {useRef} from "react";




export default function Login() {
    const dragAbleConstraints = useRef(null);
    // noinspection JSValidateTypes
    return (
        <section className="login-page-section">
            <div className="box" ref={dragAbleConstraints}>
                <div className="square" style={{"--i": 0}}></div>
                <div className="square" style={{"--i": 1}}></div>
                <div className="square" style={{"--i": 2}}></div>
                <div className="square" style={{"--i": 3}}></div>
                <div className="square" style={{"--i": 4}}></div>
                <div className="square" style={{"--i": 5}}></div>

                <motion.div className="login-page-container"
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            drag={true}
                            dragConstraints={dragAbleConstraints}
                            transition={{duration: 1, ease: "easeOut"}}>
                    <Link href={"/"}>
                        <Image
                            src={quizAppLogo}
                            alt={reactLogo}
                            className="w-[110px] h-[110px] rounded-2xl hover:scale-105 hover:brightness-125 hover:contrast-150 hover:saturate-150 transition-all duration-300 ease-in-out"
                        />
                    </Link>                    <h2 className="text-2xl font-bold mb-4 animate-pulse">Login</h2>
                    <form className="max-w-md mx-auto">
                        <div className="relative mb-6">
                            <label htmlFor="email" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                Email
                            </label>
                            <div className="relative">
                <span className="absolute left-3 top-3 text-gray-600">
                  <RiMailLine size={24}/>
                </span>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-300 focus:outline-none focus:border-blue-500 rounded-3xl text-gray-800 text-base shadow-md"
                                    placeholder="Enter Your email"
                                />

                            </div>
                        </div>
                        <div className="relative mb-6">
                            <label htmlFor="password" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                Password
                            </label>
                            <div className="relative">
                <span className="absolute left-3 top-3 text-gray-600">
                  <RiLockPasswordLine size={24}/>
                </span>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-300 focus:outline-none focus:border-blue-500 rounded-3xl text-gray-800 text-base shadow-md"
                                    placeholder="Enter Your password"
                                />

                            </div>
                        </div>
                        <div className="flex justify-end items-center mb-6">
                            <Link href={"/forgot/password"}
                                  className="text-gray-200 hover:text-black hover:underline hover:translate-y-[-2px] transition-colors duration-300 ease-linear">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white py-2 px-4 rounded-full transition-colors duration-300 ease-in-out bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 focus:from-blue-400 focus:via-indigo-500 focus:to-purple-500 login-animate-gradient-x"
                        >
                            Log In
                        </button>
                        <span className="flex justify-between text-purple-700 font-medium m-2">
                            New here And No Account?
                            <Link
                                href={"/register"}
                                className="text-gray-200 hover:text-black hover:underline hover:translate-y-[-2px] transition-colors duration-300 ease-linear ml-2 tooltip"
                                data-tooltip="Click to register an account with us"
                            >
    Register account
</Link>
                        </span>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
