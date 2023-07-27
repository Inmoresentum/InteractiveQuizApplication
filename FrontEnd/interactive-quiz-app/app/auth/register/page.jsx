import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import ClientSideRegiFrom from "@/components/auth/registration/ClinetSideRegistration";

export const metadata = {
    title: "Register",
    description: "There is where you can open an account with us" +
        " and enjoy the benefits of having an account with us",
}
export default async function Register() {
    const session = await getServerSession(options);
    if (session) {
        // might change it user profile later.
        redirect("/");
    }
    return (
        <>
            <ClientSideRegiFrom/>
        </>
    );
}