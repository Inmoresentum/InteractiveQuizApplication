import {
    FaDribbbleSquare,
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare
}
    from "react-icons/fa";

export default function Footer() {
    return (
        <div className="w-full bg-white py-16 px-4 wavy-footer">
            <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
                <div>
                    <h1 className="w-full text-3xl font-bold text-[#00df9a]">Quiz AppLogo</h1>
                    <p className='py-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam iste
                        repellat consequatur libero reiciendis, blanditiis accusantium.</p>
                    <div className='flex justify-between md:w-[75%] my-6'>
                        <FaFacebookSquare size={30} className="hover:cursor-pointer hover:text-orange-600 hover:scale-110 transition-all duration-500"/>
                        <FaInstagram size={30} className="hover:cursor-pointer hover:text-pink-500 hover:scale-110 transition-all duration-500"/>
                        <FaTwitterSquare size={30} className="hover:cursor-pointer hover:text-blue-600 hover:scale-110 transition-all duration-500"/>
                        <FaGithubSquare size={30} className="hover:cursor-pointer hover:text-teal-600 hover:scale-110 transition-all duration-500"/>
                        <FaDribbbleSquare size={30} className="hover:cursor-pointer hover:text-yellow-300 hover:scale-110 transition-all duration-500"/>
                    </div>
                </div>
                <div className='lg:col-span-2 flex justify-between mt-6'>
                    <div>
                        <h6 className='font-medium text-gray-400'>Solutions</h6>
                        <ul>
                            <li className='py-2 text-sm'>Analytics</li>
                            <li className='py-2 text-sm'>Marketing</li>
                            <li className='py-2 text-sm'>Commerce</li>
                            <li className='py-2 text-sm'>Insights</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Support</h6>
                        <ul>
                            <li className='py-2 text-sm'>Pricing</li>
                            <li className='py-2 text-sm'>Documentation</li>
                            <li className='py-2 text-sm'>Guides</li>
                            <li className='py-2 text-sm'>API Status</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Company</h6>
                        <ul>
                            <li className='py-2 text-sm'>About</li>
                            <li className='py-2 text-sm'>Blog</li>
                            <li className='py-2 text-sm'>Jobs</li>
                            <li className='py-2 text-sm'>Press</li>
                            <li className='py-2 text-sm'>Careers</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-medium text-gray-400'>Legal</h6>
                        <ul>
                            <li className='py-2 text-sm'>Claim</li>
                            <li className='py-2 text-sm'>Policy</li>
                            <li className='py-2 text-sm'>Terms</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
