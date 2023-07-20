import {data} from "@/TestData/Data";
import {TbMathSymbols} from "react-icons/tb";
import {SlChemistry} from "react-icons/sl";

export default function RecentlyAddedQuizzes() {
    return  (
        <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
            <h1>Recently Created Quizzes</h1>
            <ul>
                {data.map((quiz, id) => (
                    <li
                        key={id}
                        className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'
                    >
                        <div className='bg-purple-100 rounded-lg p-3'>
                            {quiz.tags ==="Math" ? <TbMathSymbols className='text-purple-800' /> : <SlChemistry className='text-purple-800' />}

                        </div>
                        <div className='pl-4'>
                            <p className='text-gray-800 font-bold'>{quiz.quizTitle}</p>
                            <p className='text-gray-400 text-sm'>{quiz.tags}</p>
                        </div>
                        <p className='lg:flex md:hidden absolute right-6 text-sm'>{quiz.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}