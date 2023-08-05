import Image from "next/image";
import CardImage from "@/public/quiz-app-logo.png"
import {HiMiniArrowUturnRight} from "react-icons/hi2";
import {PiMathOperations} from "react-icons/pi";
import {BsFillPSquareFill} from "react-icons/bs";

export default function QuizCard({quizInfo}) {
    return (
        <>
            <div class="quiz-card">

                <HiMiniArrowUturnRight className="bi text-white whatever mix-blend-difference"/>
                <div class="quiz-card-top">
                    <Image src={CardImage} alt=""/></div>

                <div class="quiz-card-body">
                    <h4 class="title">Vash The Stampede</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure necessitatibus possimus amet inventore ipsum rerum, qui cumque
                        praesentium facere</p>

                    <div className="skills-box">
                        <div class="skill">
                            <PiMathOperations className="bi math"/>
                            <span class="text">
                            <span>Math</span>
                            <span>General</span>
                        </span>
                        </div>
                        <div class="skill">
                            <BsFillPSquareFill className="bi physics"/>
                            <span class="text">
                            <span>Physics</span>
                            <span>High School</span>
                        </span>
                        </div>
                        <div className="skill">
                            <PiMathOperations className="bi math"/>
                            <span className="text">
                            <span>Math</span>
                            <span>General</span>
                        </span>
                        </div>
                        <div className="skill">
                            <BsFillPSquareFill className="bi physics"/>
                            <span className="text">
                            <span>Physics</span>
                            <span>High School</span>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}