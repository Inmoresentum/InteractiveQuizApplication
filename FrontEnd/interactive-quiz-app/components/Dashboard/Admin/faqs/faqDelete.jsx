import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {MdDelete} from "react-icons/md";

export default function FaqDeleteOperation() {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <MdDelete className="hover:text-black" size={24}/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl text-center text-red-400">
                        Are you absolutely sure you want to delete this FAQ?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="bg-gray-100 rounded-2xl p-2 text-black font-medium">
                        This action cannot be undone. This will permanently delete The FAQ.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-gray-300 hover:rounded-full ease-linear duration-300">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-red-500 hover:text-black hover:rounded-full ease-linear duration-300">
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}