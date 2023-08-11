"use client"
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/LottieAnimations/animation_loading_spinner.json"
import Image from "next/image";
import AppLog from "@/public/quiz-app-logo.png"

export default function MainLoadingSpinnerUi() {
    return (
        <>
            <div className="h-screen flex items-center justify-center flex-col">
                <Image src={AppLog} alt={"whatever"}
                       width={150} height={150}
                       className="rounded-2xl md:h-[250px] md:w-[250px]"
                />
                <Lottie animationData={animationData}/>
            </div>
        </>
    );
};
