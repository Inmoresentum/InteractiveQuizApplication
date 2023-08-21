import CustomLogin from "@/components/auth/login/CustomLogin";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export default async function Login({params, searchParams}) {
    const session = await getServerSession(options);
    console.log(params, searchParams);
    const callbackUrl = searchParams["callbackUrl"]
    if (session) {
        if(callbackUrl) {
            redirect(callbackUrl);
        }
        else {
            redirect("/");
        }
    }
    return (
        <CustomLogin curRedirectUrl={callbackUrl} />
    );
}
