// noinspection DuplicatedCode

"use client"

import {useState} from "react";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";

const sections = [
    {
        title: "FOR QUIZ CREATOR",
        content: (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl
                 flex content-center items-center shadow-md
                 box-border">
                    <div className="p-4 font-semibold text-blue-400 font-sans ">
                        Section 1
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl
                shadow-md
                 text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                        Section 2
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
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
        title: "FOR USERS",
        content: "Content for customers goes here..."
    },
    {
        title: "FOR PARTNERS",
        content: "Partner Content goes here"
    },
    {
        title: "FOR PARENTS",
        content: "User Content goes here"
    },
];


export default function PrivacyAndPolicyWrapper() {
    const [activeSection, setActiveSection] = useState(sections[0]);

    return (
        <>
            <div className="bg-black">
                <Navbar/>
                <div className="bg-gradient-to-r from-slate-300 to-slate-500 md:mt-[5rem] py-14 md:py-0">
                    <div className="max-w-[1280px] w-full h-screen
                 mx-auto flex flex-col md:flex-row justify-center bg-gradient-to-r from-violet-200 to-pink-200">
                        <div className="md:w-64 w-full bg-gradient-to-r from-cyan-300 via-emerald-500 to-teal-600 p-4 rounded-br-full">
                            <h1 className="text-4xl font-bold mb-4 mt-4
                             text-white text-center">
                                Sections
                            </h1>
                            <ul>
                                {sections.map((section) => (
                                    <li
                                        key={section.title}
                                        className={`mb-2 p-4 subpixel-antialiased font-bold text-center cursor-pointer rounded-full
                                        hover:bg-rose-400 hover:text-white duration-300 ease-linear shadow-xl ${
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
                            <h1 className="text-2xl mt-3 font-bold mb-4 text-center
                             h-20 bg-slate-200 rounded-full flex items-center
                              justify-center shadow-md">
                                <div className="bg-gradient-to-l from-sky-600 to-fuchsia-600 bg-clip-text text-transparent">
                                    {activeSection.title}
                                </div>
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