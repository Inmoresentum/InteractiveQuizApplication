import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import {GoCheckCircleFill} from "react-icons/go";
import {FaExclamation} from "react-icons/fa6";
import Link from "next/link";

export default function VerifyAccountWrapper({verificationResult}) {
    return (
        <div className="bg-black h-screen flex flex-col min-h-screen">
            <Navbar/>

            <div className="container mx-auto p-44 flex justify-center items-center flex-grow">
                {!verificationResult.success ? (
                    <div className="bg-gradient-to-r from-green-400 via-purple-500 to-green-600 text-white font-bold border md:text-xl
                 border-green-500 rounded-full p-4 box-border w-full min-w-[15rem] duration-500
                 md:hover:scale-110 ease-linear">
                            <span className="flex justify-center items-center">
                                <GoCheckCircleFill className="w-12 h-16 mr-2 animate-spin"/>
                                Account Successfully Verified!
                            </span>
                        <span className="flex content-center justify-center ">
                        <Link href={"/auth/login"} className="underline text-green-400
                         hover:text-cyan-500 duration-300 ease-linear">
                            Login
                        </Link>
                            </span>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-bold border md:text-xl
                 border-red-500 rounded-full p-4 cursor-pointer box-border w-full min-w-[15rem] duration-500
                 md:hover:scale-110 ease-linear">
                            <span className="flex justify-center items-center">
                                <FaExclamation className="w-12 h-16 mr-2 animate-bounce"/>
                                {verificationResult.message}
                            </span>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}