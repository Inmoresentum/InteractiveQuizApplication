import {Button} from "@/components/ui/button";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {FAQEdit} from "@/components/Dashboard/Admin/faqs/faqedit";

export default function FAQOptions({question, answer}) {
    return (
        <div className="flex w-full p-1 mb-1">
            <FAQEdit question={question} answer={answer}/>
            <Button type="submit" className="rounded-3xl hover:bg-orange-600 duration-300 shadow-2xl shadow-white ease-in">
                <MdDelete className="hover:text-black" size={24}/>
            </Button>
        </div>
    );
}





