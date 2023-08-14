import QuizProvider from "@/components/quiz/quiz-wrapper/QuizProvider";

export async function generateMetadata() {
    const response = await fetch(
        "http://localhost:8080/api/v1/quiz/resource/getDemoQuiz",
        {next: {revalidate: 60}});

    if (!response.ok) {
        console.log(response)
        console.log(response.status)
        // throw Error("OPPS FIELD TO FETCH THE DATA FROM BACKEND");
        return <div>Failed to Load Data From Backend</div>;
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

export default async function DemoQuiz() {
    const response = await fetch(
        "http://localhost:8080/api/v1/quiz/resource/getDemoQuiz",
        {next: {revalidate: 60}});

    if (!response.ok) {
        return (
            <div>
                Failed Load Data From Backend server
            </div>
        );
    }
    const data = await response.json();
    const {quiz} = data;
    return (
        <div className="flex items-center justify-center p-20 h-[62vh]">
            <div className="flex justify-center items-center w-[1280px]">
                <QuizProvider quiz={quiz}/>
            </div>
        </div>

    );
}