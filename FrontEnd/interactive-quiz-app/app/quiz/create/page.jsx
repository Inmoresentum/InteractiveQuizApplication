import QuizCreationForm from "@/components/quiz/quiz-cerator-form/QuizCreatorForm";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";


export const metadata = {
    title: "Quiz Creation Form",
    description: "This where users can create quizzes of various kinds"
}

export default async function QuizCreationPage() {
    const session = await getServerSession(options);
    if (!session) {
        redirect("http://localhost:3000/auth/login")
    }
    return (
        <QuizCreationForm/>
    );
}