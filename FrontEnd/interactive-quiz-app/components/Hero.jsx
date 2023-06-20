"use client"
import {TypeAnimation} from "react-type-animation";

const Hero = () => {
    return (
        <div className='text-white'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold p-2'>
                    GROW YOUR KNOWLEDGE WITH US
                </p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
                    Learn Things about different Domain.
                </h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4 w-full'>
                        Fast, flexible learning for
                        <TypeAnimation
                            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 bg-gradient-to-br text-transparent bg-clip-text animate-gradient w-full'
                            style={{backgroundImage: 'radial-gradient(934px at 6% 39.5%, rgb(255, 35, 90) 0.2%, rgb(255, 35, 144) 54.8%, rgb(250, 99, 160) 93.4%)'}}
                            sequence={[
                                // The Same String at the start will only be typed once, initially
                                '',
                                500,
                                "SCIENCE",
                                500,
                                "HISTORY",
                                500,
                                "BIOLOGY",
                                500,
                                "ARTS",
                                500,
                                "CODING",
                                500,
                                "DRAWING",
                                500,
                                "And much MORE!",
                                1000,
                            ]}
                            repeat={Infinity}
                        />
                    </p>


                </div>
                <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your learning progress with analytics to get the
                    maximum benefits</p>
                <button className='bg-[#00df9a] w-[200px] rounded-full font-medium my-6 mx-auto py-3 text-black hover:bg-fuchsia-500 hover:shadow-2xl hover:shadow-fuchsia-400 hover:text-white transition
                         duration-700 ease-in-out'>Get
                    Started
                </button>
            </div>
        </div>
    );
};

export default Hero;
