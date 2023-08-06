import QuizCard from "@/components/quiz/QuizCard/QuizCard";

export default function ListOfQuizzes({quizzes}) {
    return (
        <div className="flex items-center justify-center content-center h-screen">
            <QuizCard/>
        </div>
    );
}