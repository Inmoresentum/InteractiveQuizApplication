"use client"
import {Button} from "@/components/ui/button";
import {SiAddthis} from "react-icons/si";
import {Input} from "@/components/ui/input";
import {SelectComponentForQuizAction} from "@/components/quiz/QuizAction/SelectComponent";
import {useRef} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function QuizActionMenus() {
    const searchRef = useRef(null);
    const router = useRouter();
    return (
        <div className="flex flex-col items-center md:flex-row md:justify-between w-full rounded-3xl p-4 mb-4
        bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 shadow-xl">
            <div>
                <Button className="hover:bg-green-600 duration-300 mb-2 md:mb-0 ease-in font-semibold rounded-3xl h-12"
                        asChild={true}
                >
                    <Link href="http://localhost:3000/quiz/create" prefetch={false}>
                        ADD A NEW QUIZ
                        <SiAddthis className="ml-2 hover:text-black" size={24}/>
                    </Link>
                </Button>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="SEARCH QUIZ" className="rounded-xl" ref={searchRef}/>
                <Button type="submit" className="rounded-3xl hover:bg-blue-600 hover:translate-y-0.5
                 duration-300 shadow-2xl shadow-white ease-in delay-100"
                        asChild={true}>
                    <button onClick={(e) => {
                        console.log("it kinda works")
                        console.log(searchRef.current.value);
                        router.push(`?search=${searchRef.current.value}`)
                    }}>
                        SEARCH
                    </button>
                </Button>
                <SelectComponentForQuizAction/>
            </div>
        </div>
    );
}