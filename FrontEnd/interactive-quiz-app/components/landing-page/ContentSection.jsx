"use client"
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import MathImage from "@/public/landingpage/maths-1329296.jpg"
import OnlineQuiz from "@/public/landingpage/online-quiz.jpg"
import Coding from "@/public/landingpage/coding.jpg"
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
export default function ContentSection() {
    useEffect(() => {
        const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)")
        const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)")


        gsap.set(photos, {yPercent: 101})

        const allPhotos = gsap.utils.toArray(".desktopPhoto")


// create
        let mm = gsap.matchMedia();

// add a media query. When it matches, the associated function will run
        mm.add("(min-width: 600px)", () => {

            // this setup code only runs when viewport is at least 600px wide
            console.log("desktop")

            ScrollTrigger.create({
                trigger: ".gallery",
                start: "top top",
                end: "bottom bottom",
                pin: ".right"
            })

//create scrolltrigger for each details section
//trigger photo animation when headline of each details section
//reaches 80% of window height
            details.forEach((detail, index) => {

                let headline = detail.querySelector("h1")
                let animation = gsap.timeline()
                    .to(photos[index], {yPercent: 0})
                    .set(allPhotos[index], {autoAlpha: 0})
                ScrollTrigger.create({
                    trigger: headline,
                    start: "top 80%",
                    end: "top 50%",
                    animation: animation,
                    scrub: true,
                    markers: false
                })
            })


            return () => { // optional
                // custom cleanup code here (runs when it STOPS matching)
                console.log("mobile")
            };
        });
    }, [])
    return (
        <>
            <div className="diagonal">
                <div className="diagonal-wrapper">
                    <div className="content-section-wrapper">
                        <div className="gallery">
                            <div className="left">
                                <div className="desktopContent">
                                    <div className="desktopContentSection">
                                        <h1>Red</h1>
                                        <p>Red is a color often associated with strong emotions such as passion, love, and anger. Its a bold and
                                            attention-grabbing color that can evoke feelings of excitement, warmth, and energy.</p>
                                    </div>
                                    <div className="desktopContentSection">
                                        <h1>Green</h1>
                                        <p>Green is a color that is often associated with nature, growth, and harmony. It is a calming and relaxing
                                            color
                                            that
                                            can
                                            evoke feelings of balance, stability, and freshness. In color psychology, green is said to represent
                                            balance
                                            and
                                            stability, making it a popular choice for branding and marketing in the health and wellness industry. </p>
                                    </div>
                                    <div className="desktopContentSection">
                                        <h1>Pink</h1>
                                        <p>Pink is a color that is often associated with femininity, romance, and sweetness. It is a softer and more
                                            delicate
                                            shade of red that can evoke feelings of warmth, love, and nurturing.</p>
                                    </div>
                                    <div className="desktopContentSection">
                                        <h1>Blue</h1>
                                        <p>Blue is a color that is often associated with calmness, trust, and reliability. It is a peaceful and serene
                                            color
                                            that
                                            can evoke feelings of stability</p>
                                    </div>
                                    <div className="desktopContentSection">
                                        <h1>Rose 600</h1>
                                        <p>
                                            Dont Know what to write here so I am writing here something
                                            that does not matter and have no value whatsoever as you can see.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                {/*mobile content */}
                                <div className="mobileContent">
                                    <div className="mobilePhoto red"></div>
                                    <h1>Red</h1>
                                    <p>Red is a color often associated with strong emotions such as passion, love, and anger. Its a bold and
                                        attention-grabbing
                                        color that can evoke feelings of excitement, warmth, and energy.</p>
                                    <div className="mobilePhoto green"></div>
                                    <h1>Green</h1>
                                    <p>Green is a color that is often associated with nature, growth, and harmony. It is a calming and relaxing color
                                        that
                                        can
                                        evoke feelings of balance, stability, and freshness. In color psychology, green is said to represent balance
                                        and
                                        stability, making it a popular choice for branding and marketing in the health and wellness industry. </p>

                                    <div className="mobilePhoto pink"></div>
                                    <h1>Pink</h1>
                                    <p>Pink is a color that is often associated with femininity, romance, and sweetness. It is a softer and more
                                        delicate
                                        shade of
                                        red that can evoke feelings of warmth, love, and nurturing. In the world of branding and marketing, pink is
                                        often
                                        used
                                        to
                                        target a female audience or to promote products that are associated with beauty, love, or romance.</p>

                                    <div className="mobilePhoto blue"></div>
                                    <h1>Blue</h1>
                                    <p className="p-4">Blue is a color that is often associated with calmness, trust, and reliability. It is a peaceful and serene
                                        color
                                        that
                                        can
                                        evoke feelings of stability, security, and professionalism. In color psychology, blue is said to represent
                                        loyalty
                                        and
                                        trust, making it a popular choice for branding and marketing in the finance and technology industries.</p>
                                </div>
                                {/*desktop content*/}
                                <div className="desktopPhotos">
                                    <div className="desktopPhoto red flex items-center justify-center">
                                        <Image src={MathImage} alt="whatever" className="w-[25vw]
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                    <div className="desktopPhoto green flex items-center justify-center">
                                        <Image src={OnlineQuiz} alt="whatever" className="w-[25vw] cursor-pointer
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                    <div className="desktopPhoto pink flex items-center justify-center">
                                        <Image src={Coding} alt="whatever" className="w-[25vw]
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                    <div className="desktopPhoto blue flex items-center justify-center">
                                        <Image src={MathImage} alt="whatever" className="w-[25vw]
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                    <div className="desktopPhoto bg-rose-600
                             flex items-center justify-center">
                                        <Image src={MathImage} alt="whatever" className="w-[25vw]
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}