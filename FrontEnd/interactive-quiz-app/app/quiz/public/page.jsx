import QuizProvider from "@/components/quiz/quiz-wrapper/QuizProvider";
import {quiz} from "@/TestData/Quiz";

export default function DemoQuiz() {
    return (
        <QuizProvider quiz={quiz}/>
    );
}