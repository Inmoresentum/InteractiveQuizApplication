"use client"


// export const metadata = {
//     title: "Terms of Services",
//     description: "This page describes our Terms of Services" +
//         " in details."
// }

import {useState} from "react";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";

const sections = [
    {
        title: "For Developers",
        content: (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="p-4 font-semibold text-blue-400 font-sans">
                        Section 1
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                        Section 2
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "For Customers",
        content: "Content for customers goes here..."
    },
    {
        title: "For Partners",
        content: "Partner Content goes here"
    },
    {
        title: "User Content Goes here",
        content: "User Content goes here"
    },
];
export default function TermsAndServices() {
    const [activeSection, setActiveSection] = useState(sections[0]);

    return (
        <>
            <div className="bg-black">
                <Navbar/>
                <div className="bg-gradient-to-r from-slate-300 to-slate-500 md:mt-[5rem] sm:mt-[6rem]">
                    <div className="max-w-[1280px] w-full h-screen
                 mx-auto flex flex-col md:flex-row justify-center bg-gradient-to-r from-violet-200 to-pink-200">
                        <div className="md:w-64 w-full bg-gradient-to-r from-neutral-300 to-stone-400 p-4 rounded-bl-full">
                            <h1 className="text-4xl font-bold mb-4 mt-4
                         bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent text-center">
                                Sections
                            </h1>
                            <ul>
                                {sections.map((section) => (
                                    <li
                                        key={section.title}
                                        className={`mb-2 p-4 subpixel-antialiased font-bold text-center cursor-pointer rounded-full
                                        hover:bg-rose-400 hover:text-white duration-300 ease-linear${
                                            activeSection.title === section.title ? "bg-gray-200" +
                                                " bg-gradient-to-r from-emerald-400 to-cyan-400" : "rounded-full bg-gray-200"
                                        }`}
                                        onClick={() => setActiveSection(section)}
                                    >
                                        {section.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 p-4 m-3 rounded-3xl bg-slate-100 max-h-[100vh] overflow-auto">
                            <h1 className="text-2xl mt-3 font-bold mb-4 text-center h-20 bg-slate-200 rounded-full flex items-center justify-center">
                                {activeSection.title}
                            </h1>
                            <section className="ml-3 box-border">{activeSection.content}</section>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}