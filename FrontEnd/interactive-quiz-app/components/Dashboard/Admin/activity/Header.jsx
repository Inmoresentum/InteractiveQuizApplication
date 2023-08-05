import Image from "next/image";
import AppLog from "../../../../public/quiz-app-logo.png"
import NextLog from "../../../../public/next.svg"
import Link from "next/link";

export default function Header({authInfo}) {
    return (
        <div className="flex justify-between px-4 pt-4 items-center bg-gray-200">
            <div className="flex flex-col md:flex-row items-center p-2">
                <Link href={"/"}>
                    <Image src={AppLog} alt={NextLog} className="w-[45px] rounded-[25px] m-2"/>
                </Link>
                <h2 className="text-2xl">Dashboard</h2>
            </div>
            {/*I will have to change it later*/}
            <div className="font-bold">
                <div className="flex flex-col md:flex-row items-center">Welcome Back
                    <div className="text-rose-500 ml-2">
                        {authInfo.user.username}
                    </div>
                </div>
            </div>
        </div>
    );
}