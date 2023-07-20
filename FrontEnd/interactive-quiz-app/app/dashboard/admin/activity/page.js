import Header from "@/components/Dashboard/Admin/Header";
import TopCard from "@/components/Dashboard/Admin/Topcard";
import BarChar from "@/components/Dashboard/Admin/RevenueCharts";
import RecentlyAddedQuizzes from "@/components/Dashboard/Admin/RecentlyAddedQuizzes";

export default function AdminDashBoard() {
    return(
        <>
            <main className='bg-gray-100 min-h-screen'>
                <Header />
                <TopCard/>
                <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
                    <BarChar/>
                    <RecentlyAddedQuizzes/>
                </div>
            </main>
        </>
    );
}