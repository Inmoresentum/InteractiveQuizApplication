import QuizCard from "@/components/quiz/QuizCard/QuizCard";
import QuizActionMenus from "@/components/quiz/QuizAction/QuizAction";
import axios from "axios";

export default async function ListOfQuizzes() {
    const allQuizzes =  await axios.get("http://localhost:8080/api/v1/quiz/resource/allQuiz")
    console.log(allQuizzes.data);
    return (
        <div className="pt-24 pb-10 max-w-[1280px] m-auto gap-3 flex justify-center content-center flex-row flex-wrap">
            <QuizActionMenus/>
            {allQuizzes.data.map(quiz => (
                <QuizCard key={quiz.quizId} quizInfo={quiz} />
            ))}
        </div>
    );
}