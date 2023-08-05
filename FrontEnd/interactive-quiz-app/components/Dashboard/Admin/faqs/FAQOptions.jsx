import {Button} from "@/components/ui/button";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

export default function FAQOptions() {
    return (
        <div className="flex w-full p-1 mb-1">
                <Button className="hover:bg-green-600 duration-300 ease-in font-semibold rounded-3xl mr-2">
                    <FaRegEdit className="hover:text-black" size={24}/>
                </Button>
                <Button type="submit" className="rounded-3xl hover:bg-orange-600 duration-300 shadow-2xl shadow-white ease-in">
                    <MdDelete className="hover:text-black" size={24}/>
                </Button>
        </div>
    );
}
