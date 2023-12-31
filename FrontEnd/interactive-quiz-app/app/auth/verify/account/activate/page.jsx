import axios from "axios";
import VerifyAccountWrapper from "@/components/auth/verify/account/VerifyAccountWrapper";

async function verifyAccount(token) {
    console.log(process.env.BACK_END_BASE_URL);
    const url = `${process.env.BACK_END_BASE_URL
        ? process.env.BACK_END_BASE_URL : "http://localhost:8080"}/api/v1/auth/account/verify?token=${token}`;
    console.log(url);

    try {
        const response = await axios.get(url);
        return {success: true, data: response.data};
    } catch (error) {
        return {
            success: false, message: (error?.response?.data)
                ? error.response.data : "SERVER IS DOWN OR UNENVIABLE"
        };
    }
}

export default async function VerifyAccount({searchParams}) {
    const verificationToken = searchParams["token"];
    const verificationResult = await verifyAccount(verificationToken);

    return (
        <VerifyAccountWrapper verificationResult={verificationResult}/>
    );
}
