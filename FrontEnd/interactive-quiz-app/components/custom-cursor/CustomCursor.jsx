"use client"

import {gsap} from "gsap";
import {useEffect} from "react";

export default function CustomCursor() {
    useEffect(() => {
        const cursor = document.getElementById("custom-cursor");
        const links = document.querySelectorAll("a");
        const cursorText = document.querySelector(".cursor-text");

        const onMouseMove = (event) => {
            const {clientX, clientY} = event;
            gsap.to(cursor, {x: clientX, y: clientY});
        };

        const onMouseEnterLink = (event) => {
            const link = event.target;
            if (link.classList.contains("view")) {
                gsap.to(cursor, {scale: 4})
                cursorText.style.display = "block";
            } else {
                gsap.to(cursor, {scale: 4})
            }
        }

        const onMouseLeaveLink = (event) => {
            gsap.to(cursor, {scale: 1})
            cursorText.style.display = "none";
        }

        document.addEventListener("mousemove", onMouseMove);
        links.forEach((links) => {
            links.addEventListener("mouseenter", onMouseEnterLink);
            links.addEventListener("mouseleave", onMouseLeaveLink);
        });
    }, []);
    return (
        <div id="custom-cursor" className="custom-cursor">
            <span className="cursor-text">View</span>
        </div>
    );
}