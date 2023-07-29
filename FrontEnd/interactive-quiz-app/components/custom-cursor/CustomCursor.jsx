"use client"

import {gsap} from "gsap";
import {useEffect} from "react";

export default function CustomCursor() {
    useEffect(() => {
        const cursor = document.getElementById("custom-cursor");
        const links = document.querySelectorAll("a");
        const buttons = document.querySelectorAll("button");
        const cursorText = document.querySelector(".cursor-text");

        const onMouseMove = (event) => {
            const {clientX, clientY} = event;
            gsap.to(cursor, {x: clientX, y: clientY  + 20});
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

        const onMouseLeaveLink = () => {
            gsap.to(cursor, {scale: 1})
            cursorText.style.display = "none";
        }

        const onMouseEnterButton = (event) => {
            gsap.to(cursor, {scale: 4})
            cursorText.innerHTML = "Click";
            cursorText.style.display = "block";
        }

        const onMouseLeaveButton = () => {
            gsap.to(cursor, {scale: 1})
            cursorText.style.display = "none";
        }

        document.addEventListener("mousemove", onMouseMove);
        links.forEach((link) => {
            link.addEventListener("mouseenter", onMouseEnterLink);
            link.addEventListener("mouseleave", onMouseLeaveLink);
        });
        buttons.forEach((button) => {
            button.addEventListener("mouseenter", onMouseEnterButton);
            button.addEventListener("mouseleave", onMouseLeaveButton);
        });
    }, []);
    return (
        <div id="custom-cursor" className="custom-cursor">
            <span className="cursor-text">View</span>
        </div>
    );
}
