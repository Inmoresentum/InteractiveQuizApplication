"use client";
import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, A11y} from "swiper/modules"

import "swiper/css";
import "swiper/css/navigation";

export default function ReviewSlider() {
    return (
        <div className="bg-gray-200">
            <div className="px-2 sm:px-[100px]">
                <div className="flex justify-center items-center pb-8">
                    <h1 className="text-[#429342] text-center text-[42px]">
                        What Are Customer&apos;s Saying?
                    </h1>
                </div>
                <div className="pb-8">
                    <Swiper
                        modules={[Navigation, A11y]}
                        spaceBetween={50}
                        slidesPerView={2}
                        loop={true}
                        navigation
                        onSlideChange={() => console.log("slide change")}
                        onSwiper={(swiper) => console.log(swiper)}
                        className=""
                    >
                        <SwiperSlide>
                            <div className="flex flex-col items-center justify-center px-2 sm:px-[100px]">
                                <h1 className="text-center text-[20px]">
                                    &quot;Highly recommend this interactive quiz app to my students.
                                    Engaging and useful for exam prep…&quot;
                                </h1>
                                <p className="uppercase text-[#429342] text[20px] pt-8 pb-2">
                                    Sarah Johnson
                                </p>
                                <p className="text-[#7EB47E] text-[12px]">High School Teacher</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col items-center justify-center px-2 sm:px-[100px]">
                                <h1 className="text-center text-[20px]">
                                    &quot;Game-changer for my study routine! Real-time feedback and
                                    analytics keep me motivated...&quot;
                                </h1>
                                <p className="uppercase text-[#429342] text[20px] pt-8 pb-2">
                                    John Smith
                                </p>
                                <p className="text-[#7EB47E] text-[12px]">College Student</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col items-center justify-center px-2 sm:px-[100px]">
                                <h1 className="text-center text-[20px]">
                                    &quot;Safe and educational platform for my kids. They love
                                    earning grades and badges!...&quot;
                                </h1>
                                <p className="uppercase text-[#429342] text[20px] pt-8 pb-2">
                                    Emily Turner
                                </p>
                                <p className="text-[#7EB47E] text-[12px]">Working Professional</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col items-center justify-center px-2 sm:px-[100px]">
                                <h1 className="text-center text-[20px]">
                                    &quot;A fantastic resource for continuous learning.
                                    User-friendly and convenient!...&quot;
                                </h1>
                                <p className="uppercase text-[#429342] text[20px] pt-8 pb-2">
                                    David Lee
                                </p>
                                <p className="text-[#7EB47E] text-[12px]">Parent</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
