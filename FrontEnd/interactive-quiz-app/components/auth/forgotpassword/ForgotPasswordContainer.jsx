"use client"
import {motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import quizAppLogo from "@/public/quiz-app-logo.png";
import reactLogo from "@/public/react.svg";
import {useRef, useState} from "react";
import {RiMailLine} from "react-icons/ri";

export default function ForgotPasswordContainer() {
    const dragAbleConstraints = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    function handleChangeEmail(e) {
        setEmail(e.target.value.trim())
        setEmailError(!isValidEmail(e.target.value.trim()))
        setErrorMessage("");
    }

    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if (emailError) {
            setErrorMessage("Please fill up the form correctly");
        }
    }

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
                            className="w-[110px] h-[110px] rounded-2xl hover:scale-105
                             hover:brightness-125 hover:contrast-150 hover:saturate-150
                              transition-all duration-300 ease-in-out"
                        />
                    </Link>                    <h2 className="text-2xl font-bold mb-4 animate-pulse">RESET PASSWORD</h2>
                    {errorMessage ?
                        <div className="flex justify-center items-center">
                            <div className="bg-white rounded-xl border border-gray-300
                         shadow-lg p-4 max-w-sm animate-bounce backdrop-filter
                          backdrop-blur-md bg-opacity-50 ">
                                <p className="font-bold text-red-500 text-center">{errorMessage}</p>
                            </div>
                        </div> : ""}
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
                                    className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white
                                     bg-clip-padding backdrop-filter backdrop-blur-md placeholder-gray-500
                                      focus:placeholder-gray-300 focus:outline-none focus:border-blue-500
                                       rounded-3xl text-gray-800 text-base shadow-md"
                                    onChange={(e) => handleChangeEmail(e)}
                                    placeholder="Enter Your email"
                                />

                            </div>
                            {emailError && (
                                <p className="font-bold text-red-800 text-sm m-2 px-[8px]">Please enter a valid email address.</p>
                            )}
                        </div>
                        <div className="flex justify-end items-center mb-6">
                            <Link href={"/auth/login"}
                                  className="text-gray-200 hover:text-black hover:underline
                                   hover:translate-y-[-2px] transition-colors duration-300 ease-linear tooltip"
                                  data-tooltip="CLICK HERE TO LOGIN TO YOUR ACCOUNT"
                            >
                                Login?
                            </Link>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full text-white py-2 px-4 rounded-full transition-colors duration-300
                             ease-in-out bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
                              hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500
                               focus:from-blue-400 focus:via-indigo-500 focus:to-purple-500 login-animate-gradient-x"
                        >
                            Reset Password
                        </button>

                        <span className="flex justify-between text-purple-700 font-medium m-2">
                            New here And No Account?
                            <Link
                                href={"/auth/register/"}
                                className="text-gray-200 hover:text-black hover:underline
                                 hover:translate-y-[-2px] transition-colors duration-300
                                  ease-linear ml-2 tooltip"
                                data-tooltip="Click to register an account with us">
                                Register account
                            </Link>
                        </span>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}