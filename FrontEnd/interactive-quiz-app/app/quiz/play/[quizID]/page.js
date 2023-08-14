import QuizProvider from "@/components/quiz/quiz-wrapper/QuizProvider";

export async function generateMetadata({params: {quizID}}) {
    const response = await fetch(
        `http://localhost:8080/api/v1/quiz/resource/getQuiz/${quizID}`,
        {next: {revalidate: 30}});

    if (!response.ok) {
        console.log(response)
        console.log(response.status)
        // throw Error("OPPS FIELD TO FETCH THE DATA FROM BACKEND");
        return <div className="p-24">Failed to Load Data From Backend</div>;
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
export default async function QuizPlayPage({params: {quizID}}) {
    console.log("This is the params")
    const response = await fetch(
        `http://localhost:8080/api/v1/quiz/resource/getQuiz/${quizID}`,
        {next: {revalidate: 30}});

    if (!response.ok) {
        console.log(response)
        console.log(response.status)
        // throw Error("OPPS FIELD TO FETCH THE DATA FROM BACKEND");
        return <div className="p-24">Failed to Load Data From Backend</div>;
    }
    const data = await response.json();

     // console.log(data);

    const {quiz} = data;

    return (
        <div className="flex items-center justify-center p-20 h-[65vh]">
            <div className="flex justify-center items-center w-[1280px]">
                <QuizProvider quiz={quiz}/>
            </div>
        </div>
    );
}