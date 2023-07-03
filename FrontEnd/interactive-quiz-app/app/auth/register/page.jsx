import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import ClientSideRegiFrom from "@/components/auth/registration/ClinetSideRegistration";

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