import Header from "@/components/Dashboard/Admin/activity/Header";
import TopCard from "@/components/Dashboard/Admin/activity/Topcard";
import BarChar from "@/components/Dashboard/Admin/activity/RevenueCharts";
import RecentlyAddedQuizzes from "@/components/Dashboard/Admin/activity/RecentlyAddedQuizzes";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

export default async function AdminDashBoard() {

    const session = await getServerSession(options);
    return (
        <>
            <main className="bg-gray-100 min-h-screen">
                <Header authInfo={session}/>
                <TopCard/>
                <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
                    <BarChar/>
                    <RecentlyAddedQuizzes/>
                </div>
            </main>
        </>
    );
}