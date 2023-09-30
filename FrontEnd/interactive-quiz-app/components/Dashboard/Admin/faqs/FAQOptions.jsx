import {Button} from "@/components/ui/button";
import {FAQEdit} from "@/components/Dashboard/Admin/faqs/faqedit";
import FaqDeleteOperation from "@/components/Dashboard/Admin/faqs/faqDelete";

export default function FAQOptions({question, answer, faqId}) {
    return (
        <div className="flex w-full p-1 mb-1">
            <FAQEdit question={question} answer={answer} faqId={faqId}/>
            <Button type="submit" className="rounded-3xl hover:bg-orange-600 duration-300 shadow-2xl shadow-white ease-in">
                <FaqDeleteOperation faqId={faqId}/>
            </Button>
        </div>
    );
}





