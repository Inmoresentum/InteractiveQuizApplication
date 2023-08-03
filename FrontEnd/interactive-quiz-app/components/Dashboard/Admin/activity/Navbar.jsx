"use client"
import Link from "next/link";
import {RxDashboard} from "react-icons/rx";
import {HiOutlineShoppingBag} from "react-icons/hi";
import {FiSettings} from "react-icons/fi";
import {usePathname} from "next/navigation";
import {RiUserSettingsFill} from "react-icons/ri";
import {MdLocalActivity} from "react-icons/md";
import {FaQuestion} from "react-icons/fa";
import {PiPencilFill} from "react-icons/pi";


export default function Navbar() {
    const pathName = usePathname();

    return <div className="fixed w-20 z-10 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
            <Link href={"/dashboard/admin/activity"}>
                <div className={ pathName ==="/dashboard/admin/activity" ? "bg-purple-800 text-white p-3 rounded-lg" +
                    " inline-block hover:opacity-75 duration-300 ease-linear"
                    : "bg-gray-300 text-black p-3 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in"}>
                    <MdLocalActivity size={20}/>
                </div>
            </Link>
            <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
            <Link href={"/dashboard/admin/homepage/cms"}>
                <div className={ pathName ==="/dashboard/admin/homepage/cms" ? "bg-purple-800 text-white p-3 rounded-lg " +
                    "inline-block hover:opacity-75 duration-300 ease-linear"
                    : "bg-gray-300 text-black p-3 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in"}>
                    <RxDashboard size={20}/>
                </div>
            </Link>
            <Link href={"/dashboard/admin/allusers"}>
                <div className={ pathName ==="/dashboard/admin/allusers" ? "bg-purple-800 text-white p-3 rounded-lg " +
                    "inline-block hover:opacity-75 duration-300 ease-linear"
                    : "bg-gray-300 text-black p-3 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in"}>
                    <RiUserSettingsFill size={20}/>
                </div>
            </Link>
            <Link href={"/dashboard/admin/subscription"}>
                <div className={ pathName ==="/dashboard/admin/subscription" ? "bg-purple-800 text-white p-3 rounded-lg " +
                    "inline-block hover:opacity-75 duration-300 ease-linear"
                    : "bg-gray-300 text-black p-3 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in"}>
                    <HiOutlineShoppingBag size={20}/>
                </div>
            </Link>
            <Link href={"/dashboard/admin/blogs/settings"}>
                <div className={ pathName ==="/dashboard/admin/blogs/settings" ? "bg-purple-800 text-white p-3 rounded-lg " +
                    "inline-block hover:opacity-75 duration-300 ease-linear"
                    : "bg-gray-300 text-black p-3 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in"}>
                    <PiPencilFill size={20}/>
                </div>
            </Link>
            <Link href={"/dashboard/admin/faqs"}>
                <div className={ pathName ==="/dashboard/admin/faqs" ? "bg-purple-800 text-white p-3 rounded-lg " +
                    "inline-block hover:opacity-75 duration-300 ease-linear"
                    : "bg-gray-300 text-black p-3 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in"}>
                    <FaQuestion size={20}/>
                </div>
            </Link>
            <Link href={"/dashboard/admin/support"}>
                <div className={ pathName ==="/dashboard/admin/support" ? "bg-purple-800 text-white p-3 rounded-lg " +
                    "inline-block hover:opacity-75 duration-300 ease-linear"
                    : "bg-gray-300 text-black p-3 rounded-lg inline-block hover:bg-rose-600 hover:text-white duration-300 ease-in"}>
                    <FiSettings size={20}/>
                </div>
            </Link>
        </div>
    </div>;
}
