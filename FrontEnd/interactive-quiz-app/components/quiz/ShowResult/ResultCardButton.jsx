"use client"


import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import MainLoadingSpinnerUi from "@/components/loading-animation/MainLoadingSpinnerUi";
import axios from "axios";

export default function ResultCardContinueButton({quizId, score}) {
    const userSessionData = useSession();
    const {data: session, update} = useSession();
    const router = useRouter();

    if (userSessionData.status === "loading") return <MainLoadingSpinnerUi/>

    async function handleClick() {
        console.log("I am here at the start of the method");
        try {
            console.log("I am inside the try block");
            console.log(userSessionData.data.user.access_token);
            const response = await axios.post("http://localhost:8080/api/v1/quiz/resource/save-score", {
                "quizId": `${quizId}`,
                "score": `${score}`
            }, {
                headers: {
                    Authorization: `Bearer ${userSessionData.data.user.access_token}`,
                },
            });
            // response.data;
            console.log("printing the response");
            console.log(response);
        } catch (error) {
            console.log("I am trying to check the status");
            console.log(error);
            console.log(error.response?.status);
            if (error.response.status === 403) {
                // access token has expired, acquire new access token using refresh token
                const response = await axios.post("http://localhost:8080/api/v1/auth/refresh-token", null, {
                    headers: {
                        Authorization: `Bearer ${userSessionData.data.user.refresh_token}`,
                    },
                });
                console.log("Trying to print the response data");
                console.log(response.data);
                const newAccessToken = response.data.access_token;
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        access_token: newAccessToken,
                    },
                });

                try {
                    const newResponse = await axios.post("http://localhost:8080/api/v1/quiz/resource/save-score", {
                        "quizId": `${quizId}`,
                        "score": `${score}`
                    }, {
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                    });
                    console.log(newResponse.data);
                    return newResponse.data;
                } catch (newError) {
                    return newError.response;
                }
            }
            // error.response;
        }

        router.push("http://localhost:3000/quiz/public/quizzes");
        router.refresh();
    }

    return <button className="src-button"
                   onClick={event => handleClick()}>
        Continue
    </button>;
}
