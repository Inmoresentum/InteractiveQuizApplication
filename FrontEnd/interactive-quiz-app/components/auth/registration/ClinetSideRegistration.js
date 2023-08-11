"use client"
import {useEffect, useRef} from "react";
import {RiLockPasswordLine, RiMailLine, RiPhoneLine, RiUserAddLine} from "react-icons/ri";
import {FaDiscord, FaGithubSquare, FaGoogle} from "react-icons/fa";
import {motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import quizAppLogo from "@/public/quiz-app-logo.png";
import reactLogo from "@/public/react.svg";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";

export default function ClientSideRegiFrom() {
    // Todo: I will later make it clean
    //  its to much ugly.
    const dragAbleConstraints = useRef(null);
    useEffect(() => {
        const phoneInput = document.querySelector("#phone");
        phoneInput.addEventListener("keypress", (event) => {
            if (event.key < "0" || event.key > "9") {
                event.preventDefault();
                phoneInput.classList.add("animate-shake");
                setTimeout(() => {
                    phoneInput.classList.remove("animate-shake");
                }, 500);
            }
        });
    }, []);

    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 12);

    const schema = z.object({
        username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username can be at most 20 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirm_password: z.string().min(6, "Password must be at least 6 characters")
            .refine((val) => val === watch("password"), "Passwords do not match"),
        phone: z.string().min(6, "Phone number must be at least 6 characters")
            .max(15, "Phone number can be at most 15 characters"),
        country_code: z.string(),
        date_of_birth: z.string()
            .transform(val => new Date(val))
            .refine(val => val >= twelveYearsAgo, {
                message: "You must be at least 12 years old",
            }),
    });

    const {handleSubmit, control, formState: {errors}, watch, register, setValue} = useForm({
        resolver: zodResolver(schema),
    });


    const onSubmit = async (formData) => {
        // Handle the form submission here
        console.log(formData);
        const {username} = formData;
        console.log(username);

        const body = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: "USER",
            accountCreatedAt: new Date().toISOString(),
            dateOfBirth: new Date(formData.date_of_birth).toISOString(),
            agreesWithTermsAndConditions: true,
        };
        const {data} = await axios.post(`${process.env.local.BACK_END_BASE_URL}/api/v1/auth/register`
            , body);
        console.log(data)
    };


    return (
        <section className="registration-page-section">
            <div className="box" ref={dragAbleConstraints}>
                <div className="square" style={{"--i": 0}}></div>
                <div className="circle" style={{"--i": 1}}></div>
                <div className="square" style={{"--i": 2}}></div>
                <div className="square" style={{"--i": 3}}></div>
                <div className="circle" style={{"--i": 4}}></div>
                <div className="square" style={{"--i": 5}}></div>
                <div className="circle" style={{"--i": 6}}></div>

                <motion.div className="login-page-container"
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            drag={true}
                            dragConstraints={dragAbleConstraints}
                            transition={{duration: 1, ease: "easeOut"}}>
                    <Link href={"/"}>
                        <Image
                            src={quizAppLogo}
                            alt={reactLogo}
                            className="w-[110px] h-[110px] rounded-2xl hover:scale-105 hover:brightness-125
                             hover:contrast-150 hover:saturate-150 transition-all duration-300 ease-in-out"
                        />
                    </Link>
                    <h2 className="font-bold text-2xl mt-4">
                        Create An Account Using
                    </h2>
                    <div className="flex justify-evenly w-full">
                        <FaGithubSquare className="ml-0.5 mr-0.5 text-gray-700
                     cursor-pointer hover:scale-110 hover:text-black duration-300 ease-in" size={44}/>
                        <FaGoogle className="ml-0.5 mr-0.5 cursor-pointer hover:scale-110
                     hover:text-orange-500  duration-300 ease-in" size={44}/>
                        <FaDiscord className="ml-0.5 mr-0.5 cursor-pointer hover:scale-110
                     hover:text-blue-500 duration-300 ease-in" size={44}/>
                    </div>
                    <h2 className="text-2xl font-bold italic mt-4 antialiased"> OR</h2>
                    <h2 className="text-2xl font-bold mb-4 mt-4 animate-pulse">REGISTRATION FORM</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">

                        <div className="relative mb-6">
                            <label htmlFor="username" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                Username
                            </label>
                            <div className="relative">
        <span className="absolute left-3 top-3 text-gray-600">
            <RiUserAddLine size={24}/>
        </span>
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="username"
                                            className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding
                        backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-900
                        focus:outline-none focus:border-blue-500 rounded-3xl
                        text-gray-800 text-base shadow-md"
                                            placeholder="Enter Your Username"
                                        />
                                    )}
                                />
                            </div>
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </div>

                        <div className="relative mb-6">
                            <label htmlFor="email" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                Email
                            </label>
                            <div className="relative">
        <span className="absolute left-3 top-3 text-gray-600">
            <RiMailLine size={24}/>
        </span>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <input
                                            {...field}
                                            type="email"
                                            id="email"
                                            className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding
                        backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-900
                        focus:outline-none focus:border-blue-500 rounded-3xl
                        text-gray-800 text-base shadow-md"
                                            placeholder="Enter Your email"
                                        />
                                    )}
                                />
                            </div>
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>


                        <div className="relative mb-6">
                            <label htmlFor="password" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-600">
                                    <RiLockPasswordLine size={24}/>
                                </span>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <input
                                            {...field}
                                            type="password"
                                            id="password"
                                            className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding
                        backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-900
                        focus:outline-none focus:border-blue-500 rounded-3xl
                        text-gray-800 text-base shadow-md"
                                            placeholder="Enter Your password"
                                        />
                                    )}
                                />
                            </div>
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className="relative mb-6">
                            <label htmlFor="confirm_password" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                Confirm Password
                            </label>
                            <div className="relative">
        <span className="absolute left-3 top-3 text-gray-600">
            <RiLockPasswordLine size={24}/>
        </span>
                                <Controller
                                    name="confirm_password"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <input
                                            {...field}
                                            type="password"
                                            id="confirm_password"
                                            className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding
                        backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-900
                        focus:outline-none focus:border-blue-500 rounded-3xl
                        text-gray-800 text-base shadow-md"
                                            placeholder="Enter your password again"
                                        />
                                    )}
                                />
                            </div>
                            {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
                        </div>

                        <div className="relative mb-6">
                            <label htmlFor="date_of_birth" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                Date of Birth
                            </label>
                            <div className="relative">
                                <Controller
                                    name="date_of_birth"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <input
                                            {...field}
                                            type="date"
                                            id="date_of_birth"
                                            className="w-full pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding
                        backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-900
                        focus:outline-none focus:border-blue-500 rounded-3xl text-gray-800 text-base shadow-md"
                                        />
                                    )}
                                />
                            </div>
                            {errors.date_of_birth && <p className="text-red-500">{errors.date_of_birth.message}</p>}
                        </div>

                        <div className="relative mb-6">
                            <label htmlFor="phone" className="text-lg px-4 font-medium mb-2 text-gray-800">
                                Phone Number
                            </label>
                            <div className="relative flex">
                                <Controller
                                    name="country_code"
                                    control={control}
                                    defaultValue="+880"
                                    render={({field}) => (
                                        <select
                                            {...field}
                                            className="h-12 bg-opacity-20 bg-white bg-clip-padding
                        backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-900
                        focus:outline-none focus:border-blue-500 rounded-3xl text-gray-800 text-base shadow-md mr-0.5 mb-2"
                                        >
                                            <option
                                                className="bg-opacity-20 bg-white bg-clip-padding backdrop-filter backdrop-blur-md
                            placeholder-gray-500 focus:placeholder-gray-900 focus:outline-none focus:border-blue-500
                            rounded-3xl text-gray-800 text-base shadow-md"
                                                value="+880"
                                            >
                                                +880
                                            </option>
                                            <option
                                                className="bg-opacity-20 bg-white bg-clip-padding backdrop-filter backdrop-blur-md
                            placeholder-gray-500 focus:placeholder-gray-900 focus:outline-none focus:border-blue-500
                            rounded-3xl text-gray-800 text-base shadow-md"
                                                value="+1"
                                            >
                                                +1
                                            </option>
                                            <option
                                                className="bg-opacity-20 bg-white bg-clip-padding backdrop-filter backdrop-blur-md
                            placeholder-gray-500 focus:placeholder-gray-900 focus:outline-none focus:border-blue-500
                            rounded-3xl text-gray-800 text-base shadow-md"
                                                value="+44"
                                            >
                                                +44
                                            </option>
                                        </select>
                                    )}
                                />
                                <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-600">
                                            <RiPhoneLine size={24}/>
                                        </span>
                                        <Controller
                                        name="phone"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <input
                                                {...field}
                                                type="tel"
                                                id="phone"
                                                className="w-[280px] pl-10 px-6 py-3 bg-opacity-20 bg-white bg-clip-padding
                            backdrop-filter backdrop-blur-md placeholder-gray-500 focus:placeholder-gray-900
                            focus:outline-none focus:border-blue-500 rounded-3xl text-gray-800 text-base shadow-md"
                                                placeholder="Enter your phone number"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file"
                                       className="flex flex-col items-center justify-center w-full h-32 border-2
                                        border-gray-400 border-dashed rounded-lg cursor-pointer
                                         bg-opacity-20 bg-white bg-clip-padding
                                         backdrop-filter backdrop-blur-md hover:bg-opacity-30 dark:hover:bg-opacity-30
                                          dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5
                                                   0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0
                                                    8h2.167M10 15V6m0 0L8 8m2-2l2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                            className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                            800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden"
                                           accept="image/vnd.sealedmedia.softseal.jpg, .png, .svg"/>
                                </label>
                            </div>

                        </div>


                        <button
                            type="submit"
                            className="w-[350px] text-white py-2 px-4 rounded-full transition-colors duration-300
                             ease-in-out bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-blue-400
                              hover:via-indigo-500 hover:to-purple-500 focus:from-blue-400 focus:via-indigo-500
                               focus:to-purple-500 login-button-animate-gradient-x"
                        >
                            Register
                        </button>

                        {/*<button className="custom-btn btn-16 w-full">Read More</button>*/}
                        <span className="flex justify-end text-purple-700 font-medium m-2">
                            Already have an Account?
                            <Link
                                href={"/auth/login/"}
                                className="text-white hover:text-black hover:underline
                                hover:translate-y-[-2px] transition-colors duration-300 ease-linear ml-2
                                 tooltip"
                                data-tooltip="Click Here to Visit Login Page">
                                Login
                            </Link>
                        </span>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}