import Single from "../../public/landingpage/single.png"
import Double from "../../public/landingpage/double.png"
import Triple from "../../public/landingpage/triple.png"
import Image from "next/image";

const Cards = () => {
    return (
        <>
            <div className="w-full py-[10rem] px-4 extra-bg">
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                    <div
                        className="w-full shadow-2xl flex flex-col p-4 my-4 rounded-3xl
                         hover:scale-105 duration-300 bg-white hover:shadow-violet-600">
                        <Image className="w-20 mx-auto mt-[-3rem] bg-white" src={Single} alt="/"/>
                        <h2 className="text-2xl font-bold text-center py-8">Single User</h2>
                        <p className="text-center text-4xl font-bold">$9.99/Month</p>
                        <div className="text-center font-medium">
                            <p className="py-2 border-b mx-8 mt-8">Access To All Premium Quizzes</p>
                            <p className="py-2 border-b mx-8">Promote 1 of Your Quizzes</p>
                            <p className="py-2 border-b mx-8">Up to 2 GB Storage</p>
                        </div>
                        <button
                            className="inline-flex items-center justify-center mx-auto my-6 px-0.5 py-0.5
                             overflow-hidden text-sm font-medium text-gray-900 rounded-lg group
                              bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600
                               group-hover:to-blue-500 hover:text-white dark:text-white
                                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                          <span
                              className="w-[200px] px-6 py-3 transition-all ease-in
                               duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              Start Trail
                          </span>
                        </button>
                    </div>
                    <div
                        className="w-full shadow-2xl bg-gray-100 flex flex-col p-4 md:my-0 my-8
                         rounded-3xl hover:scale-105 duration-300 hover:shadow-green-600">
                        <Image className="w-20 mx-auto mt-[-3rem] bg-transparent" src={Double} alt="/"/>
                        <h2 className="text-2xl font-bold text-center py-8">Singles of Two</h2>
                        <p className="text-center text-4xl font-bold">$15/Month</p>
                        <div className="text-center font-medium">
                            <p className="py-2 border-b mx-8 mt-8">15 GB Storage</p>
                            <p className="py-2 border-b mx-8">1 Granted User</p>
                            <p className="py-2 border-b mx-8">Handles Users Up To 100 At a Time</p>
                        </div>
                        <button
                            className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">Start
                            Trial
                        </button>
                    </div>
                    <div
                        className="w-full shadow-2xl flex flex-col p-4 my-4 rounded-3xl hover:scale-105 duration-300 bg-white hover:shadow-pink-600">
                        <Image className="w-20 mx-auto mt-[-3rem] bg-white" src={Triple} alt="/"/>
                        <h2 className="text-2xl font-bold text-center py-8">Single User</h2>
                        <p className="text-center text-4xl font-bold">$25/Month</p>
                        <div className="text-center font-medium">
                            <p className="py-2 border-b mx-8 mt-8">50 GB Storage</p>
                            <p className="py-2 border-b mx-8">10 Org User</p>
                            <p className="py-2 border-b mx-8">Up to 500 Users At a Time</p>
                        </div>
                        <button
                            className="my-6 mx-auto px-0.5 py-0.5 inline-flex items-center justify-center
                             overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br
                              from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white
                               dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                          <span
                              className="w-[200px] relative px-6 py-3 transition-all ease-in duration-75
                               bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              Start Trail
                          </span>
                        </button>
                    </div>
                </div>
                <h1 className="relative flex align-top justify-center py-[25px] text-4xl font-bold text-white
                 cursor-pointer hover:text-orange-500 shadow-2xl hover:shadow-rose-600 transition-all duration-500 h1-sp-effect">
                    Take Advantage of Our Premium Plans
                    <span
                        className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-current
                         transition-all ease-in-out duration-500 h1-sp-effect-span"></span>
                </h1>
            </div>
        </>
    );
};

export default Cards;
