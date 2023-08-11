"use client"
import Lottie from "lottie-react";
import animationData from "@/public/LottieAnimations/animation_all_user-loading-spinner.json"

export default function AllUserLoadingSpinner() {
    return (
        <>
            <Lottie animationData={animationData} className="h-screen"/>
        </>
    );
};
