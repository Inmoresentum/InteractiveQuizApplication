"use client"
import {CookieConsent} from "react-cookie-consent";
import {BiSolidCookie} from "react-icons/bi";
import {MdClose} from "react-icons/md";
import {FaCookieBite} from "react-icons/fa";
import Link from "next/link";

export default function CookieConsentWrapper() {
    return (
        <CookieConsent
            location="bottom"
            cookieName="myAwesomeCookieName3"
            expires={999}
            overlay={true}
            buttonText={
                <div className="flex items-center ">
                    <FaCookieBite className="mr-2" size={55}/>
                    Yum Cookies Are Delicious
                </div>
            }
            buttonClasses="bg-gradient-to-r from-green-500 to-blue-600 text-white
             font-bold py-2 px-4 rounded-xl transition duration-500 ease-linear
              hover:from-purple-400 hover:to-indigo-500 hover:text-black
               shadow-black hover:shadow-2xl"
            containerClasses="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
             p-4 flex justify-between items-center fixed
             bottom-0 left-0 right-0 z-50 max-w-screen-lg mx-auto rounded-2xl"
            contentClasses="text-black text-lg"
            disableStyles={true}
        >
            <div className="flex items-center">
                {/*<MdClose className="h-5 w-5 text-gray-500 mr-2" />*/}
                <span className="text-black font-medium">
        <strong>Welcome to Our Website!</strong> This website uses cookies to enhance the user experience.
                    We want to ensure that you have control over your data and understand how we use cookies and similar technologies.
                    By continuing to browse and use this website, you consent to the use of cookies as described in this Cookie Consent
                    in <Link href={"privacy-policy"} prefetch={false}
                             className="text-gray-200 hover:text-green-600 hover:font-semibold
                              hover:scale-105 duration-300 ease-linear hover:underline
                              focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                              Privacy Policy
                        </Link> so that we can keep track of you and sell your data 🍪.
                </span>
            </div>
        </CookieConsent>
    );
}