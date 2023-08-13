import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const fetchAllQuizzes = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/quiz/resource/allQuiz");
    console.log("Printing result form FAQ query");
    console.log(response.data);
    return response.data;
}

export default function useFetchAllQuizzes() {
    return useQuery({
        queryKey: ["quiz-all"],
        queryFn: () => fetchAllQuizzes()
    });
}