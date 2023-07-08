import CustomLogin from "@/components/auth/login/CustomLogin";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export default async function Login() {
    const session = await getServerSession(options);
    if (session) {
        redirect("/");
    }
    return (
        <CustomLogin/>
    );
}
