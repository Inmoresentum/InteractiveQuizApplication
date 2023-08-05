"use client"
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/LottieAnimations/animation_loading_spinner.json"

const LoadingSpinner = () => {

    return (
        <>
            <Lottie animationData={animationData}/>
        </>
    );
};

export default LoadingSpinner;
