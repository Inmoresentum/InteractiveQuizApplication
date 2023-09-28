import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {FaRegEdit} from "react-icons/fa";
import {Textarea} from "@/components/ui/textarea";

export function FAQEdit({question, answer}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="hover:bg-green-600 duration-300 ease-in font-semibold rounded-3xl mr-2">
                    <FaRegEdit className="hover:text-black" size={24}/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center p-2 text-2xl">EDIT FAQ</DialogTitle>
                    <DialogDescription>
                        Make changes to your FAQ here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Question" className="text-right">
                            Question
                        </Label>
                        <Textarea id="question" defaultValue={`${question}`} className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Answer" className="text-right">
                            Answer
                        </Label>
                        <Textarea id="answer" defaultValue={`${answer}`} className="col-span-3"/>
                    </div>
                </div>
                <DialogFooter>
                    {/*Todo: need to make the API call and update the FAQ accordingly*/}
                    <Button type="submit" className="hover:bg-green-600">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
