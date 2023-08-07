import QuizCreationForm from "@/components/quiz/quiz-cerator-form/QuizCreatorForm";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function QuizCreationPage() {
    const session = await getServerSession(options);
    // if (!session) {
    //     redirect("http://localhost:3000/auth/login")
    // }
    return (
        <QuizCreationForm/>
    );
}