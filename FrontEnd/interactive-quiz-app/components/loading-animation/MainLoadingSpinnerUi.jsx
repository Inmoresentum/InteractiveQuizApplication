"use client"
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/LottieAnimations/animation_loading_spinner.json"

export default function MainLoadingSpinnerUi() {
    return (
        <>
            <Lottie animationData={animationData}/>
        </>
    );
};
