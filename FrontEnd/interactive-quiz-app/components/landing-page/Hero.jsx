"use client"
import {TypeAnimation} from "react-type-animation";

const Hero = () => {
    return (
        <div className='text-white p-20'>
            <div className='md:relative md:z-10 max-w-[860px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <div className="hidden md:block absolute left-[100px] transform -translate-y-1/2 h-[475px] w-[475px]
                 animate-blob  overflow-x-hidden bg-purple-300 opacity-80 mix-blend-multiply blur-xl filter"></div>
                <div className="hidden md:block animation-delay-2000 absolute left-[200px] top-[600px]  transform -translate-y-1/2 h-[375px] w-[375px]
                 animate-blob overflow-hidden rounded-2xl bg-pink-300 opacity-90 mix-blend-multiply blur-xl filter"></div>
                <div className="hidden md:block animation-delay-2000 absolute left-[200px]  transform -translate-y-1/2 h-[375px] w-[375px]
                 animate-blob overflow-hidden  bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
                <div className="hidden md:block animation-delay-4000 absolute  left-[300px] top-[400px] transform -translate-x-1/2 h-[310px] w-[310px]
                 animate-blob overflow-hidden rounded-md bg-pink-300 opacity-80 mix-blend-multiply blur-xl filter"></div>
                <p className='z-10 text-[#00df9a] md:text-black font-bold p-2 mt-20'>
                    GROW YOUR KNOWLEDGE WITH US
                </p>
                <h1 className='z-10 md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
                    Learn Things about different Domain.
                </h1>
                <div className='z-10 flex justify-center items-center'>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4 w-full'>
                        Fast, flexible learning for
                        <TypeAnimation
                            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2
                             bg-gradient-to-br text-transparent bg-clip-text animate-gradient w-full'
                            style={{backgroundImage: "radial-gradient(934px at 6% 39.5%," +
                                    " rgb(255, 35, 90) 0.2%," +
                                    " rgb(255, 35, 144) 54.8%," +
                                    " rgb(250, 99, 160) 93.4%)"}}
                            sequence={[
                                // The Same String at the start will only be typed once, initially
                                " ",
                                1000,
                                "SCIENCE",
                                1000,
                                "HISTORY",
                                1000,
                                "BIOLOGY",
                                1000,
                                "ARTS",
                                1000,
                                "CODING",
                                1000,
                                "DRAWING",
                                1000,
                                "AND MUCH MORE!",
                                1000,
                            ]}
                            repeat={Infinity}
                        />
                    </p>

                </div>
                <p className='z-10 md:text-2xl text-xl font-bold text-gray-500'>
                    Monitor your learning progress with analytics to get the maximum benefits
                </p>
                <button className='z-[999] bg-green-500 w-[200px] shadow-xl rounded-full font-semibold my-6 mx-auto py-3
                 text-black hover:bg-fuchsia-500 hover:shadow-2xl hover:shadow-fuchsia-400
                  hover:text-white transition duration-700 ease-in-out'>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Hero;
