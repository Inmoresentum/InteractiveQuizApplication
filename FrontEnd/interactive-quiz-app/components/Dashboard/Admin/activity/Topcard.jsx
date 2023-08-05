"use client"
import useFetchDailySystemStat from "@/components/hooks/FetchDailySystemStat";

export default function TopCard({authInfo}) {
    console.log(authInfo)
    const response = useFetchDailySystemStat(authInfo.user.access_token, authInfo.user.refresh_token);
    if (response.isLoading) return;
    if (response.isError) return <div>{response.isError}</div>;
    return (
        // Add data dynamically by doing an api call using REACT query
        // While data is loading show a loading spinner
        <div className="grid lg:grid-cols-5 gap-4 p-4">
            <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border  drop-shadow-xl shadow-lg shadow-blue-300
            p-4 rounded-lg hover:shadow-2xl duration-300 ease-in">
                <div className="flex flex-col w-full pb-4">
                    <p className="text-2xl font-bold">{response.data.totalNumberOfUsers}</p>
                    <p className="text-gray-600">Total Users</p>
                </div>
                {/*Based on increase and decrease, show appropriate styles */}
                <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg md:hover:scale-110
                md:hover:cursor-pointer duration-300 ease-linear">
                    <span className="text-green-700 text-lg">100%</span>
                </p>
            </div>
            <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border  drop-shadow-xl shadow-lg shadow-green-500
            p-4 rounded-lg hover:shadow-2xl duration-300 ease-in">
                <div className="flex flex-col w-full pb-4">
                    <p className="text-2xl font-bold">{response.data.totalNumberOfQuizzes}</p>
                    <p className="text-gray-600">Total Quizzes</p>
                </div>
                <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg md:hover:scale-110
                md:hover:cursor-pointer duration-300 ease-linear">
                    <span className="text-green-700 text-lg">+100%</span>
                </p>
            </div>
            <div className="bg-white flex justify-between w-full border p-4 rounded-lg drop-shadow-xl shadow-lg shadow-rose-200
            hover:shadow-2xl duration-300 ease-in">
                <div className="flex flex-col w-full pb-4">
                    <p className="text-2xl font-bold">{response.data.totalNumberOfQuizzesPlayedToday}</p>
                    <p className="text-gray-600">Quiz Played Today</p>
                </div>
                <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg md:hover:scale-110
                md:hover:cursor-pointer duration-300 ease-linear">
                    <span className="text-green-700 text-lg">0%</span>
                </p>
            </div>
        </div>
    );
}