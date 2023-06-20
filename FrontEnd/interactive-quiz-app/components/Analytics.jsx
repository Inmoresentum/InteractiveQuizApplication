import Laptop from "../public/laptop.jpg"
import Image from "next/image";

const Analytics = () => {
    return (
        <div className='w-full bg-white py-16 px-4 wavy'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <Image className='w-[500px] mx-auto my-4 rounded-full' src={Laptop} alt='/'/>
                <div className='flex flex-col justify-center'>
                    <p className='text-purple-600 font-bold '>Create Quizzes Right From Dashboard</p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Manage Your Quizzes Centrally</h1>
                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dolor harum laborum laudantium
                        modi nostrum quibusdam? Aliquid assumenda blanditiis facilis inventore laborum molestiae, nisi
                        officiis perferendis praesentium tempora, ut voluptatem? </p>
                    <button
                        className='bg-orange-600 text-white w-[200px] rounded-xl
                        font-bold my-6 mx-auto md:mx-0 py-3 hover:bg-rose-600 hover:text-black hover:shadow-2xl hover:shadow-black transition
                         duration-700 ease-in-out'>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
