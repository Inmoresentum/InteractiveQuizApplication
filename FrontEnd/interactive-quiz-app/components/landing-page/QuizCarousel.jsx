"use client";

import { Carousel } from "flowbite-react";
import testImage from "@/public/landingpage/testImg.png"
import Image from "next/image";

export default function QuizCarousel() {
    return (
        <div className="flex items-center justify-center">
        <Carousel slideInterval={5005} className="w-[1280px] h-[40vh]">
            <div className="antialiased flex justify-center items-center h-screen">
                <div className=" flex rounded-lg bg-white shadow-md overflow-hidden">
                    <div className="p-4 bg-rose-500 w-56">
                        <div className="text-green-600 font-semibold uppercase tracking-wider text-sm">whatever</div>
                        <div className="text-white text-2xl">My Group mates seems to be chilling xD</div>
                        <div className="text-purple-400 mt-12 text-sm">Dont know what to put<svg className="inline w-2 h-2 fill-current"
                                                                                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/>
                        </svg></div>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between">
                            <div className="text-purple-400 uppercase tracking-wider text-sm">Everything burns</div>
                            <div className="pt-1 pl-32">
                                <div className="bg-purple-200 rounded-full h-2 w-48 overflow-hidden">
                                    <div className="h-2 bg-purple-900 w-32"></div>
                                </div>
                                <div className="text-xs text-purple-400 text-right uppercase">6/9 Hibernates</div>
                            </div>
                        </div>
                        <div className="text-3xl text-purple-900">Java Persistence With Hibernate</div>
                        <div className="flex justify-end pt-12">
                            <button className="px-12 py-2 bg-purple-900 rounded-full text-purple-100 text-lg shadow-md hover:bg-purple-800">
                                Wanna Read
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Image src={testImage} alt={""} className="h-[370px] w-[370]"/>
            <h1 className="text-4xl font-bold text-green-400
             hover:text-rose-500 duration-300 ease-linear delay-75">we can seem to render anything here</h1>
        </Carousel>
        </div>
    )
}


