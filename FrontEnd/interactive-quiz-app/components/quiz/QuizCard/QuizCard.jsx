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
                    <Image src={quizInfo?.createdByProfilePicUrl !== null ? quizInfo?.createdByProfilePicUrl : CardImage} alt=""/></div>

                <div class="quiz-card-body">
                    <h4 class="title">
                        {quizInfo?.quizTitle ? quizInfo?.quizTitle : "SOME VERY COOL TEXT HERE IS GOING"}
                    </h4>
                    <p>
                        {quizInfo?.quizSynopsis ? quizInfo?.quizSynopsis :
                            "Whatever the hell that you thinking is correct brother"}
                    </p>

                    <div className="skills-box">
                        <div class="skill">
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