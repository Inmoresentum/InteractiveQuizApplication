import QuizProvider from "@/components/quiz/quiz-wrapper/QuizProvider";
import {quiz} from "@/TestData/Quiz";

export async function generateMetadata() {
    const response = await fetch(
        "http://localhost:8080/api/v1/quiz/public/demo/getDemoQuiz/1",
        {next: {revalidate: 60}});

    if (!response.ok) {
        throw Error("OPPS FIELD TO FETCH THE DATA FROM BACKEND");
    }
    const data = await response.json();

    // console.log(data);

    const {quiz} = data;

    const {quizTitle, quizSynopsis} = quiz;

    return {
        title: quizTitle,
        description: quizSynopsis
    }
}

export default function DemoQuiz() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex justify-center items-center w-[1280px]">
                <QuizProvider quiz={quiz}/>
            </div>
        </div>

    );
}