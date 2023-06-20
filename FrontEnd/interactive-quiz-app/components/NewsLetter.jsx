const Newsletter = () => {
    return (
        <div className='w-full py-16 text-white px-4'>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
                <div className='lg:col-span-2 my-4'>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
                        Want tips & tricks to optimize your flow?
                    </h1>
                    <p>Sign up to our newsletter and stay up to date.</p>
                </div>
                <div className='my-4'>
                    <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                        <input
                            className='p-3 w-full rounded-e-md text-black bg-gray-200 transition-all duration-300  focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#00df9a] focus:border-transparent hover:bg-white'
                            type='email'
                            placeholder='Enter Email'
                        />
                        <button
                            className='bg-[#00df9a] text-black rounded-full hover:scale-110 hover:bg-pink-400 font-medium w-[200px] ml-4 my-6 px-6 py-3 transition-transform duration-300'>
                            Notify Me
                        </button>

                    </div>
                    <p>
                        We care bout the protection of your data. Read our{' '}
                        <a href="https://xerolinux.xyz"
                           className="text-[#00df9a] hover:bg-gradient-to-r pl-1 hover:border-blue-500 hover:rounded-full hover:underline hover:text-gradient-to-r from-rose-400 to-pink-600 font-medium transition-all duration-700 ease-in-out">Privacy
                            Policy.</a>

                    </p>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
