import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export default async function Register() {
    const session = await getServerSession(options);
    if (session) {
        // might change it user profile later.
        redirect("/");
    }
    return <h1 className="text-pink-600">
        Hi from register page.
    </h1>
}