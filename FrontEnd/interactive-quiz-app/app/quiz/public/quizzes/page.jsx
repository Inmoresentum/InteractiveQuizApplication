import QuizCard from "@/components/quiz/QuizCard/QuizCard";
import QuizActionMenus from "@/components/quiz/QuizAction/QuizAction";

export default function ListOfQuizzes({quiz}) {
    return (
        <div className="pt-24 pb-10 max-w-[1280px] m-auto gap-3 flex justify-center content-center flex-row flex-wrap">
            <QuizActionMenus/>
            <QuizCard quizInfo={quiz}/>
            <QuizCard quizInfo={quiz}/>
            <QuizCard quizInfo={quiz}/>
            <QuizCard quizInfo={quiz}/>
            <QuizCard quizInfo={quiz}/>
            <QuizCard quizInfo={quiz}/>
            <QuizCard quizInfo={quiz}/>
            <QuizCard quizInfo={quiz}/>
        </div>
    );
}