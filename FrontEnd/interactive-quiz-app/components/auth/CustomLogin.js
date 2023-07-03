"use client"

import {useRef, useState} from "react";
import {signIn} from "next-auth/react";
import {motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import quizAppLogo from "@/public/quiz-app-logo.png";
import reactLogo from "@/public/react.svg";
import {RiLockPasswordLine, RiMailLine} from "react-icons/ri";
import {redirect} from "next/navigation";

export default function CustomLogin() {
    const dragAbleConstraints = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [callbackUrl, setCallbackUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleChangeEmail = (e)=> {
        setEmail(e.target.value.trim())
        setEmailError(!isValidEmail(e.target.value.trim()))
        setErrorMessage("");
    }

    const handleChangePassword = (e) => {
        const enteredPassword = e.target.value.trim();
        setPassword(enteredPassword);
        setPasswordError(enteredPassword === '');
        setErrorMessage("");
    };

    const isValidEmail = (email) => {
        // Perform email validation logic here
        // Return true if email is valid, false otherwise
        // Example:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError || passwordError) {
            setErrorMessage("Please Fill Up Form Correctly");
            return;
        }
        const result = await signIn("credentials", {
            email: email,
            password,
            redirect: false,
        });
        console.log(result);
        // setCallbackUrl(result.url);
        if (result.error) {
            setErrorMessage(result.error.replaceAll("\"", ""));
            return;
        }
        if (result.url) {
            redirect(result.url);
        }
        else {
            redirect("/");
        }
    };

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
                    {errorMessage?
                    <div class="flex justify-center items-center">
                        <div class="bg-white rounded-xl border border-gray-300 shadow-lg p-4 max-w-sm animate-bounce backdrop-filter backdrop-blur-md bg-opacity-50 ">
                            <p class="font-bold text-red-500 text-center">{errorMessage}</p>
                        </div>
                    </div> : "" }
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
                                    onChange={(e)=> handleChangeEmail(e)}
                                    placeholder="Enter Your email"
                                />

                            </div>
                            {emailError && (
                                <p className="font-bold text-red-800 text-sm m-2 px-[8px]">Please enter a valid email address.</p>
                            )}
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
                                    onChange={handleChangePassword}
                                    placeholder="Enter Your password"
                                />

                            </div>
                            {passwordError && (
                                <p className="text-red-800 text-sm m-2 px-[8px]">Please enter a password.</p>
                            )}
                        </div>
                        <div className="flex justify-end items-center mb-6">
                            <Link href={"/forgot/password"}
                                  className="text-gray-200 hover:text-black hover:underline hover:translate-y-[-2px] transition-colors duration-300 ease-linear">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full text-white py-2 px-4 rounded-full transition-colors duration-300 ease-in-out bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-blue-400 hover:via-indigo-500 hover:to-purple-500 focus:from-blue-400 focus:via-indigo-500 focus:to-purple-500 login-animate-gradient-x"
                        >
                            Log In
                        </button>

                        <span className="flex justify-between text-purple-700 font-medium m-2">
                            New here And No Account?
                            <Link
                                href={"/register"}
                                className="text-gray-200 hover:text-black hover:underline hover:translate-y-[-2px] transition-colors duration-300 ease-linear ml-2 tooltip"
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