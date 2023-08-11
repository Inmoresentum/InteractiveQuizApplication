import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const fetchDailySystemStat = async (accessToken, refreshToken) => {
    console.log(accessToken, refreshToken)
    try {
        const response = await axios.get("http://localhost:8080/api/v1/admin/stats/daily", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("I am trying to check the status");
        console.log(error.response.status);
        if (error.response.status === 403) {
            // access token has expired, acquire new access token using refresh token
            const response = await axios.post("http://localhost:8080/api/v1/auth/refresh-token", null, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
            console.log("Trying to print the response data");
            console.log(response.data);
            const newAccessToken = response.data.access_token;
            try {
                const newResponse = await axios.get("http://localhost:8080/api/v1/admin/stats/daily", {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                });
                return newResponse.data;
            } catch (newError) {
                return newError.response;
            }
        }
        return error.response;
    }
}
export default function useFetchDailySystemStat(access_token, refresh_token) {
    return useQuery({
        queryKey: ["daily-system-stat"],
        queryFn: () => fetchDailySystemStat(access_token, refresh_token)
    });
}