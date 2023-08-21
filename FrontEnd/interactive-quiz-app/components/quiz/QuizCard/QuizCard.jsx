import Image from "next/image";
import CardImage from "@/public/quiz-app-logo.png"
import {HiMiniArrowUturnRight} from "react-icons/hi2";
import {PiMathOperations} from "react-icons/pi";
import {BsFillPSquareFill} from "react-icons/bs";
import {CiUser} from "react-icons/ci";
import Link from "next/link";

export default function QuizCard({quizInfo}) {
    return (
        <>
            <Link href={`http://localhost:3000/quiz/play/${quizInfo.quizId}`}>
                <div className="quiz-card">
                    <HiMiniArrowUturnRight className="bi text-white whatever mix-blend-difference"/>
                    <div class="quiz-card-top">
                        <Image src={quizInfo?.quizProfilePhotoUrl !== null ? quizInfo.quizProfilePhotoUrl : CardImage} alt=""
                               width="250" height="250"
                        />
                    </div>

                    <div className="quiz-card-body">
                        <h4 className="title">
                            {quizInfo?.quizTitle ? quizInfo?.quizTitle : "SOME VERY COOL TEXT HERE IS GOING"}
                        </h4>
                        <p>
                            {quizInfo?.quizSynopsis ? quizInfo?.quizSynopsis :
                                "Whatever the hell that you thinking is correct brother"}
                        </p>

                        <div className="skills-box">
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
                            <div className="skill">
                                <CiUser className="bi physics"/>
                                <span className="text">
                                    <span>BY</span>
                                    <span>{quizInfo?.createdByLastname}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}