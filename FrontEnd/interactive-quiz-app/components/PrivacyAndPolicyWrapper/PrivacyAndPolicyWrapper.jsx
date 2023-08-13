// noinspection DuplicatedCode

"use client"

import {useState} from "react";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";

const sections = [
    {
        title: "FOR QUIZ CREATOR",
        content: (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl
                 flex content-center items-center shadow-md
                 box-border">
                    <div className="p-4 font-semibold text-blue-400 font-sans ">
                    Data Collection and Usage
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                    As a quiz creator on our platform, we want to be transparent
                     about how we handle data. 
                    When you create quizzes or assessments, certain information may
                     be collected and processed. 
                    This may include questions, answer choices, and other 
                    content you provide, 
                    as well as data about user interactions with your quizzes. 
                    We use this data to operate, improve, and personalize 
                    the quiz-taking experience for users. 
                    Please note that we do not collect personally identifiable 
                    information (PII) from your quizzes, 
                    unless explicitly provided by you for certain features,
                     such as user account creation. 
                    It&apos;s important to avoid including any sensitive or 
                    private information in your quizzes 
                    that could potentially violate user privacy.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl
                shadow-md
                 text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                    Ownership and Sharing
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                    You retain ownership of the quizzes and assessments you create 
                    on our platform. 
                    By sharing your quizzes with others, you grant us a limited 
                    license to display, 
                    distribute, and promote your quizzes within the context of 
                    our Service. 
                    This allows us to showcase and feature user-generated content 
                    to enhance the 
                    overall experience for our community. We recommend reviewing
                     and adhering to our 
                    content guidelines to ensure that your quizzes are suitable 
                    for a wide audience. 
                    Additionally, we encourage you to respect the privacy rights 
                    of others when creating quizzes 
                    and avoid using any content that may infringe upon copyrights,
                     trademarks, or personal rights.
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "FOR USERS",
        content: (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl
                 flex content-center items-center shadow-md
                 box-border">
                    <div className="p-4 font-semibold text-blue-400 font-sans ">
                    Data Collection and Usage
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                    Welcome to our online quiz platform! 
                    We want you to feel comfortable and informed about how we handle your data. 
                    When you use our quizzes and assessments, we may collect certain information 
                    to provide you with an enjoyable experience. 
                    This may include your quiz responses, scores, and interactions with the platform. 
                    We do not collect any personally identifiable information (PII) 
                    from you unless you voluntarily provide it, such as when creating a user account. 
                    Rest assured that your quiz performance and interactions are primarily used to enhance 
                    the quality of our quizzes and to offer personalized recommendations. 
                    We do not share your personal data with third parties 
                    for marketing or advertising purposes.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl
                shadow-md
                 text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                    Ownership and Sharing
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                    To improve your experience on our platform, we may use cookies and 
                    similar technologies. 
                    These small text files are placed on your device to collect information 
                    about your usage patterns and preferences. Cookies help us analyze trends, 
                    customize content, and gather aggregate data for statistical purposes. 
                    You can choose to disable cookies in your browser settings, 
                    but please note that this may impact certain features and functionality 
                    of our platform. We do not use cookies to collect personal information 
                    beyond what you voluntarily provide. By continuing to use our quizzes, 
                    you consent to our use of cookies as described in this policy.
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "FOR PARTNERS",
        content: (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl
                 flex content-center items-center shadow-md
                 box-border">
                    <div className="p-4 font-semibold text-blue-400 font-sans ">
                    Data Collaboration and Confidentiality
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                    Welcome to our online quiz project&apos;s partner program! 
                    We value your collaboration and want to ensure transparency 
                    in how we handle data. As a partner, you may have access 
                    to certain information or content that is shared for collaborative 
                    purposes. 
                    This could include aggregated user interaction data, performance metrics, 
                    or insights related to the quizzes and assessments hosted on our platform. 
                    We assure you that any data shared is intended solely for enhancing our 
                    partnership and improving the overall quality of our quizzes. 
                    We request that you treat all shared information as confidential 
                    and use it only for the purpose of our collaboration. 
                    Please refrain from disclosing or using the shared data for 
                    any other purposes without our explicit consent.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl
                shadow-md
                 text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                    Data Ownership and Usage Rights
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                    While collaborating with our project, 
                    you retain ownership of any data or content you contribute 
                    as part of our partnership. 
                    We respect your intellectual property rights 
                    and will not use your data for marketing or 
                    advertising purposes without your explicit permission. 
                    By participating in our partner program, 
                    you grant us a limited license to use and 
                    display your contributed content within the context 
                    of our platform and any promotional materials related to our collaboration. 
                    This allows us to showcase the value of our partnership to our users and community. 
                    It&apos;s important to ensure that any data or content you share does 
                    not include personally identifiable information (PII) of users unless explicitly 
                    agreed upon for specific purposes.
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "FOR PARENTS",
        content: (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl
                 flex content-center items-center shadow-md
                 box-border">
                    <div className="p-4 font-semibold text-blue-400 font-sans ">
                    Child Privacy and Safety
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                    Welcome to our online quiz project! 
                    We understand the importance of protecting the privacy 
                    and safety of children online. Our platform is designed 
                    for educational and entertainment purposes, and we take great 
                    care to ensure a safe environment for users of all ages, including 
                    children under the age of 13. If you are a parent or guardian of a child 
                    using our platform, we want to assure you that we do not knowingly collect 
                    or solicit personally identifiable information (PII) from children 
                    without verifiable parental consent. Any user accounts for 
                    children under 13 require parental permission and oversight. 
                    We encourage you to monitor your child&apos;s activities on our platform 
                    and to contact us if you have any concerns about their data or interactions.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl
                shadow-md
                 text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                    Parental Rights and Control
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border shadow-md">
                    <p className="p-4">
                    As a parent or guardian, you have the right to review, 
                    modify, or delete any personal information that your 
                    child has provided on our platform. If you believe that 
                    your child has provided us with any PII without your consent, 
                    please contact us immediately, and we will take appropriate steps 
                    to address the situation. We also provide options for parents to disable 
                    cookies or limit the collection of data from their child&apos;s device. We do not 
                    share any personal information of children with third parties for 
                    marketing or advertising purposes. Our aim is to create an enjoyable 
                    and secure environment for children to engage with our educational 
                    quizzes, and we are committed to upholding their online privacy.
                    </p>
                </div>
            </div>
        )
    },
];


export default function PrivacyAndPolicyWrapper() {
    const [activeSection, setActiveSection] = useState(sections[0]);

    return (
        <>
            <div className="bg-black">
                <Navbar/>
                <div className="bg-gradient-to-r from-slate-300 to-slate-500 md:mt-[5rem] py-14 md:py-0">
                    <div className="max-w-[1280px] w-full h-screen
                 mx-auto flex flex-col md:flex-row justify-center bg-gradient-to-r from-violet-200 to-pink-200">
                        <div className="md:w-64 w-full bg-gradient-to-r from-cyan-300 via-emerald-500 to-teal-600 p-4 rounded-br-full">
                            <h1 className="text-4xl font-bold mb-4 mt-4
                             text-white text-center">
                                Sections
                            </h1>
                            <ul>
                                {sections.map((section) => (
                                    <li
                                        key={section.title}
                                        className={`mb-2 p-4 subpixel-antialiased font-bold text-center cursor-pointer rounded-full
                                        hover:bg-rose-400 hover:text-white duration-300 ease-linear shadow-xl ${
                                            activeSection.title === section.title ? "bg-gray-200" +
                                                " bg-gradient-to-r from-emerald-400 to-cyan-400" : "rounded-full bg-gray-200"
                                        }`}
                                        onClick={() => setActiveSection(section)}
                                    >
                                        {section.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 p-4 m-3 rounded-3xl bg-slate-100 max-h-[100vh] overflow-auto">
                            <h1 className="text-2xl mt-3 font-bold mb-4 text-center
                             h-20 bg-slate-200 rounded-full flex items-center
                              justify-center shadow-md">
                                <div className="bg-gradient-to-l from-sky-600 to-fuchsia-600 bg-clip-text text-transparent">
                                    {activeSection.title}
                                </div>
                            </h1>
                            <section className="ml-3 box-border">{activeSection.content}</section>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}
