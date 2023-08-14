"use client"
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import First from "@/public/landingpage/first.jpg"
import Second from "@/public/landingpage/second.jpeg"
import Third from "@/public/landingpage/third.jpeg"
import Fourth from "@/public/landingpage/fourth.png"
import Fifth from "@/public/landingpage/fifth.jpeg"
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
                                        <h1>Challenge Your Knowledge</h1>
                                        <p> Embark on a journey of learning and fun with our interactive quizzes. Test your wits, expand your horizons, and have a blast along the way.</p>
                                    </div>
                                    <div className="desktopContentSection">
                                        <h1>Explore Diverse Topics</h1>
                                        <p>From science to pop culture, history to technology, we've got quizzes that cover a wide range of subjects. Expand your understanding in an engaging way. </p>
                                    </div>
                                    <div className="desktopContentSection">
                                        <h1>Compete and Share</h1>
                                        <p> Challenge your friends or go head-to-head with quiz enthusiasts from around the world. Score high, earn bragging rights, and share your achievements.</p>
                                    </div>
                                    <div className="desktopContentSection">
                                        <h1>Learn While Having Fun</h1>
                                        <p>Education doesn't have to be boring. Dive into our interactive quizzes and discover that learning can be entertaining and rewarding.</p>
                                    </div>
                                    <div className="desktopContentSection">
                                        <h1>Curious Minds Welcome</h1>
                                        <p>
                                            Feed your curiosity and satisfy your quest for knowledge with our intriguing quizzes. Join a community of inquisitive minds and embark on a learning adventure.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                {/*mobile content */}
                                <div className="mobileContent">
                                    <div className="mobilePhoto red"></div>
                                    <h1>"Challenge Your Knowledge</h1>
                                    <p> Embark on a journey of learning and fun with our interactive quizzes. Test your wits, expand your horizons, and have a blast along the way.</p>
                                    <div className="mobilePhoto green"></div>
                                    <h1>Explore Diverse Topics</h1>
                                    <p>From science to pop culture, history to technology, we've got quizzes that cover a wide range of subjects. Expand your understanding in an engaging way. </p>

                                    <div className="mobilePhoto pink"></div>
                                    <h1>Compete and Share</h1>
                                    <p>Challenge your friends or go head-to-head with quiz enthusiasts from around the world. Score high, earn bragging rights, and share your achievements.</p>

                                    <div className="mobilePhoto blue"></div>
                                    <h1>Learn While Having Fun</h1>
                                    <p className="p-4">Education doesn't have to be boring. Dive into our interactive quizzes and discover that learning can be entertaining and rewarding.</p>
                                </div>
                                {/*desktop content*/}
                                <div className="desktopPhotos">
                                    <div className="desktopPhoto red flex items-center justify-center">
                                        <Image src={First} alt="whatever" className="w-[25vw]
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                    <div className="desktopPhoto green flex items-center justify-center">
                                        <Image src={Second} alt="whatever" className="w-[25vw] cursor-pointer
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                    <div className="desktopPhoto pink flex items-center justify-center">
                                        <Image src={Third} alt="whatever" className="w-[25vw]
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                    <div className="desktopPhoto blue flex items-center justify-center">
                                        <Image src={Fourth} alt="whatever" className="w-[25vw]
                                 h-[25vh] rounded-3xl md:hover:scale-110 duration-300 ease-linear"/>
                                    </div>
                                    <div className="desktopPhoto bg-rose-600
                             flex items-center justify-center">
                                        <Image src={Fifth} alt="whatever" className="w-[25vw]
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