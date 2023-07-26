import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import {GoCheckCircleFill} from "react-icons/go";
import {FaExclamation} from "react-icons/fa6";

export default function VerifyAccountWrapper({verificationResult}) {
    return (
        <div className="bg-black h-screen flex flex-col min-h-screen">
            <Navbar/>

            <div className="container mx-auto p-44 flex justify-center items-center flex-grow">
                {verificationResult.success ? (
                    <div className="bg-green-300 font-bold text-green-800
                 border border-green-500 rounded-full p-4 shadow animate-fadeIn w-full animate-bounce">
                            <span className="flex justify-center items-center">
                                <GoCheckCircleFill className="w-6 h-6 mr-2 animate-spin"/>
                                Account Successfully Verified!
                            </span>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-bold border md:text-xl
                 border-red-500 rounded-full p-4 cursor-pointer box-border w-full min-w-[15rem] duration-500
                 md:hover:scale-110 ease-linear ">
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