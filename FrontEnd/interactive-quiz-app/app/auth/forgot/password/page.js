import ForgotPasswordContainer from "@/components/auth/forgotpassword/ForgotPasswordContainer";

export const metadata = {
    title: "Forgot Password",
    description: "Here you can recover your account if" +
        " you have forgotten your password" +
        " via email that you used to signup with our account",
}
export default function ForgotPassword() {
    return (
        <ForgotPasswordContainer/>
    );
}