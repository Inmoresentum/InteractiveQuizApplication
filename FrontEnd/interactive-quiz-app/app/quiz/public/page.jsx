import QuizProvider from "@/components/quiz/quiz-wrapper/QuizProvider";
import {quiz} from "@/TestData/Quiz";

export default function DemoQuiz() {
    return (
        <div className="flex items-center content-center">
            <QuizProvider quiz={quiz}/>
        </div>
    );
}