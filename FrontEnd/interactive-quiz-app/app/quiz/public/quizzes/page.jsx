import QuizCard from "@/components/quiz/QuizCard/QuizCard";
import QuizActionMenus from "@/components/quiz/QuizAction/QuizAction";
import axios from "axios";

export default async function ListOfQuizzes({searchParams}) {
    const searchTerm = searchParams["search"];
    const tag = searchParams["tag"];
    if (tag) {
        const allQuizzes = await axios.get(`http://localhost:8080/api/v1/quiz/resource/allQuiz/tag?tag=${tag}`)
        console.log(allQuizzes);
        return (
            <div className="pt-24 pb-10 max-w-[1280px] m-auto gap-3 flex justify-center content-center flex-row flex-wrap">
                <QuizActionMenus/>
                {allQuizzes.data.length === 0 ? (
                    <div className="h-[70vh] flex items-center justify-center">
                        <div className="bg-red-500 rounded-full shadow-md p-8 animate-pulse">
                            <p className="text-3xl font-bold text-center text-gray-700 antialiased">NOT FOUND</p>
                        </div>
                    </div>
                ) : (
                    allQuizzes.data.map(quiz => (
                        <QuizCard key={quiz.quizId} quizInfo={quiz}/>
                    ))
                )}
            </div>
        );
    }
    if (searchTerm) {
        const allQuizzes = await axios.get(`http://localhost:8080/api/v1/quiz/resource/allQuiz/search?search=${searchTerm}`)
        console.log(allQuizzes);
        console.log(allQuizzes.data.length);
        return (
            <div className="pt-24 pb-10 max-w-[1280px] m-auto gap-3 flex justify-center content-center flex-row flex-wrap">
                <QuizActionMenus/>
                {allQuizzes.data.length === 0 ? (
                    <div className="h-[70vh] flex items-center justify-center">
                        <div className="bg-red-500 rounded-full shadow-md p-8 animate-pulse">
                            <p className="text-3xl font-bold text-center text-gray-700 antialiased">NOT FOUND</p>
                        </div>
                    </div>
                ) : (
                    allQuizzes.data.map(quiz => (
                            <QuizCard key={quiz.quizId} quizInfo={quiz}/>
                        )
                    )
                )}
            </div>
        )
            ;
    }
    const allQuizzes = await axios.get("http://localhost:8080/api/v1/quiz/resource/allQuiz")
    console.log(allQuizzes.data);
    return (
        <div className="pt-24 pb-10 max-w-[1280px] m-auto gap-3 flex justify-center content-center flex-row flex-wrap">
            <QuizActionMenus/>
            {allQuizzes.data.map(quiz => (
                <QuizCard key={quiz.quizId} quizInfo={quiz}/>
            ))}
        </div>
    );
}