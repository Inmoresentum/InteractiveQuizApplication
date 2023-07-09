import QuizProvider from "@/components/quiz/quiz-wrapper/QuizProvider";
import {quiz} from "@/TestData/Quiz";

export async function generateMetadata() {
    // fetch data
    // const product = await fetch(`https://.../${id}`).then((res) => res.json())
    //
    // // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []
    // console.log(quiz)
    const {quizTitle, quizSynopsis} = quiz
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