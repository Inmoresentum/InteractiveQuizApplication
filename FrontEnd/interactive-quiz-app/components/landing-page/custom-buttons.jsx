"use client"
import {useRouter} from "next/navigation";

export default function CustomButtonAnalytics() {
    const router = useRouter();
    return (
        <button
            className="bg-orange-600 text-white w-[200px] rounded-xl
                        font-bold my-6 mx-auto md:mx-0 py-3 hover:bg-rose-600 hover:text-black hover:shadow-2xl hover:shadow-black transition
                         duration-700 ease-in-out"
            onClick={(e) => {
                router.push("http://localhost:3000/quiz/create")
            }}
        >
            Get Started
        </button>
    );
}