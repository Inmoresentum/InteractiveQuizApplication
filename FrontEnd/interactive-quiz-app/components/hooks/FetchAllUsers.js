import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const fetchUsers = async (page, accessToken, refreshToken) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/admin/control/users?page=${page}`, {
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
                const newResponse = await axios.get(`http://localhost:8080/api/v1/admin/control/users?page=${page}`, {
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
};

export default function useFetchAllAdmin(page, access_token, refresh_token) {
    return useQuery(
        ["users", page],
        () => fetchUsers(page, access_token, refresh_token),
    );
}
