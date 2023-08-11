import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const fetchFAQs = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/faq/all");
    console.log("Printing result form FAQ query");
    console.log(response.data);
    return response.data;
}

export default function useFetchAllFAQs() {
    return useQuery({
        queryKey: ["faq-all"],
        queryFn: () => fetchFAQs()
    });
}