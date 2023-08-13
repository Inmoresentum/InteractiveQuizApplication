"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useRouter} from "next/navigation";

export function SelectComponentForQuizAction() {
    const router = useRouter();
    return (
        <Select onValueChange={(e) => {
            router.push(`?tag=${e}`)
        }}>
            <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="SELECT A TAG"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>QUIZ TAG</SelectLabel>
                    <SelectItem value="">Select a tag</SelectItem>
                    <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                    <SelectItem value="ARTS">ARTS</SelectItem>
                    <SelectItem value="DRAW">DRAW</SelectItem>
                    <SelectItem value="MATH">MATH</SelectItem>
                    <SelectItem value="HISTORY">HISTORY</SelectItem>
                    <SelectItem value="GEOGRAPHY">GEOGRAPHY</SelectItem>
                    <SelectItem value="LITERATURE">LITERATURE</SelectItem>
                    <SelectItem value="MUSIC">MUSIC</SelectItem>
                    <SelectItem value="MOVIES">MOVIES</SelectItem>
                    <SelectItem value="SPORTS">SPORTS</SelectItem>
                    <SelectItem value="TECHNOLOGY">TECHNOLOGY</SelectItem>
                    <SelectItem value="GENERAL_KNOWLEDGE">GENERAL_KNOWLEDGE</SelectItem>
                    <SelectItem value="TRIVIA">TRIVIA</SelectItem>
                    <SelectItem value="ANIMALS">ANIMALS</SelectItem>
                    <SelectItem value="NATURE">NATURE</SelectItem>
                    <SelectItem value="FOOD_AND_COOKING">FOOD_AND_COOKING</SelectItem>
                    <SelectItem value="HEALTH_AND_FITNESS">HEALTH_AND_FITNESS</SelectItem>
                    <SelectItem value="POLITICS">POLITICS</SelectItem>
                    <SelectItem value="MYTHOLOGY">MYTHOLOGY</SelectItem>
                    <SelectItem value="LANGUAGE">LANGUAGE</SelectItem>
                    <SelectItem value="IQ_TEST">IQ_TEST</SelectItem>
                    <SelectItem value="BRAIN_TEASERS">BRAIN_TEASERS</SelectItem>
                    <SelectItem value="LOGIC_PUZZLES">LOGIC_PUZZLES</SelectItem>
                    <SelectItem value="PERSONALITY_TEST">PERSONALITY_TEST</SelectItem>
                    <SelectItem value="POP_CULTURE">POP_CULTURE</SelectItem>
                    <SelectItem value="CELEBRITIES">CELEBRITIES</SelectItem>
                    <SelectItem value="CODING">CODING</SelectItem>
                    <SelectItem value="PROGRAMMING">PROGRAMMING</SelectItem>
                    <SelectItem value="FRONTEND">FRONTEND</SelectItem>
                    <SelectItem value="BACKEND">BACKEND</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}