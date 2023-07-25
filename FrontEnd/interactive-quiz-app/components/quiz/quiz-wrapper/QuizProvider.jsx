"use client"
import Quiz from "@/components/quiz/quiz-components/core-starter/Quiz";
import {useState} from "react";


export default function QuizProvider({quiz}) {
    const [quizResult, setQuizResult] = useState()
    console.log("I am trying to provide some data ")
    console.log(quiz)
    return (
        <Quiz
            quiz={quiz}
            shuffle
            // showInstantFeedback
            // continueTillCorrect
            onComplete={setQuizResult}
            onQuestionSubmit={(obj) => console.log("user question results:", obj)}
            disableSynopsis={false}
            // revealAnswerOnSubmit
            allowNavigation
        />
    );
}