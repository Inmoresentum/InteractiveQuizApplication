"use client"
import {useState} from "react";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";

const sections = [
    {
        title: "For Developers",
        content: (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="p-4 font-semibold text-blue-400 font-sans">
                        Section 1
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                    To access and utilize the developer features of WizeWiz, 
                    you must first create a developer account. 
                    By doing so, you agree to adhere to the guidelines, 
                    terms, and conditions outlined herein. 
                    You are responsible for maintaining the confidentiality 
                    of your account credentials and ensuring the security of your account. 
                    As a developer, you must follow the integration guidelines provided by WizeWiz
                     to ensure the seamless and secure interaction of your creations with our Service. 
                    We reserve the right to review, evaluate, and approve any content or integrations 
                    developed by you for compatibility, quality, and compliance with our standards. 
                    Failure to adhere to these guidelines or engage in practices that compromise the 
                    integrity of our Service may result in the suspension or termination of your developer account.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                        Section 2
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                    By contributing content, integrations, 
                    or any other materials to WizeWiz, you grant WizeWiz 
                    a non-exclusive, worldwide, royalty-free license to use, 
                    modify, reproduce, distribute, and display your contributions 
                    solely for the purpose of operating, improving, 
                    and promoting the Service. You represent and warrant 
                    that you have the necessary rights and permissions to grant
                     such a license. Any intellectual property rights, including 
                     but not limited to trademarks, copyrights, and patents, associated 
                     with the content you contribute remain with you or your licensors. 
                    You shall not use WizeWiz&apos;s intellectual property without obtaining 
                    prior written consent. WizeWiz may, at its sole discretion, showcase, 
                    promote, or feature your integrations or creations within the Service or 
                    in promotional materials. This exposure, however, does not constitute 
                    an endorsement or guarantee of the quality of your work.
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "For Customers",
        content:  (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="p-4 font-semibold text-blue-400 font-sans">
                    User Accounts and Content Usage
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                    When you create a user account on WizeWiz, 
                    you agree to provide accurate and complete 
                    information during the registration process. 
                    It is your responsibility to maintain the 
                    confidentiality of your account credentials and promptly 
                    update any changes to ensure the security and integrity of your account. 
                    You acknowledge that the content provided through the Service, 
                    including quizzes, assessments, and related materials, 
                    is intended for personal and non-commercial use only. 
                    You are strictly prohibited from reproducing, distributing, modifying, 
                    or otherwise exploiting this content for any commercial 
                    purposes without the express written consent of WizeWiz. 
                    Any unauthorized use of the content or violation of these terms 
                    may result in the immediate termination of your account and legal action.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                        User Conduct and Prohibited Activities
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                    By accessing and using WizeWiz, you agree to abide 
                    by all applicable laws and regulations, as well as the 
                    guidelines set forth in these Terms of Service. You are 
                    expressly forbidden from engaging in any activities that 
                    could compromise the security, availability, or functionality 
                    of the Service. This includes, but is not limited to, 
                    attempting to gain unauthorized access to the Service, 
                    interfering with its operation, or engaging in any form 
                    of data scraping, hacking, or other malicious activities. 
                    Moreover, you agree not to upload, share, or distribute 
                    any content that is offensive, defamatory, infringing, or 
                    otherwise objectionable. WizeWiz reserves the right to monitor 
                    user activities and content and take appropriate actions, 
                    including the suspension or termination of accounts, 
                    in case of any violations of these terms.
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "For Partners",
        content:(
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="p-4 font-semibold text-blue-400 font-sans">
                    Partner Programs and Collaborative Opportunities
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                    Wizewiz offers partner programs designed to foster 
                    collaboration and mutual benefit between Wizewiz 
                    and external partners. Participation in these programs 
                    is subject to meeting specific criteria and agreeing 
                    to the terms outlined herein. Partners may include 
                    businesses, individuals, or organizations interested in 
                    enhancing the functionality, reach, or features of the 
                    Service. Collaboration may involve joint marketing efforts, 
                    integration of third-party services, or other mutually 
                    agreed-upon initiatives. The terms of each partnership, 
                    including rights, responsibilities, and compensation, will 
                    be determined on a case-by-case basis and documented in 
                    separate agreements. WizeWiz reserves the right to select 
                    partners at its discretion and to terminate partnerships if 
                    the agreed-upon terms are not upheld.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                    Intellectual Property and Promotional Activities
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                    Partners engaging in collaborative efforts with WizeWiz 
                    may have access to certain intellectual property, proprietary 
                    information, or confidential data. Both WizeWiz and the partner 
                    agree to maintain the confidentiality of any shared information 
                    and to use it solely for the purpose of the collaboration. 
                    Any intellectual property developed jointly or contributed by the 
                    partner during the partnership remains the joint property of WizeWiz 
                    and the partner, unless otherwise agreed upon in writing. 
                    Partners may have the opportunity to showcase their involvement with WizeWiz 
                    for promotional purposes. However, any such promotional activities 
                    must be approved by WizeWiz in advance. WizeWiz may also promote or 
                    feature partner collaborations within the Service or in marketing 
                    materials, but this exposure does not constitute an endorsement or 
                    guarantee of the partner&apos;s products or services.
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "User Content Policy",
        content: (
            <div>
                <h1 className="bg-gray-200 mb-4 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="p-4 font-semibold text-blue-400 font-sans">
                    User Content Submission and Ownership
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                    When you contribute content to WizeWiz, such as comments, 
                    feedback, quizzes, or any other materials (&quot;User Content&quot;), 
                    you retain ownership of your User Content. However, by submitting 
                    User Content, you grant WizeWiz a non-exclusive, worldwide, royalty-free 
                    license to use, reproduce, modify, adapt, publish, translate, distribute, 
                    and display your User Content through the Service and any affiliated platforms. 
                    This license enables WizeWiz to operate, improve, and promote the Service. 
                    You confirm that you have the necessary rights and permissions to grant this 
                    license. WizeWiz does not claim ownership of your User Content, 
                    and you are solely responsible for the accuracy, legality, and 
                    appropriateness of the content you submit.
                    </p>
                </div>
                <h1 className="bg-gray-200 mb-4 mt-3 h-10 rounded-xl text-2xl flex content-center items-center">
                    <div className="ml-4 font-semibold text-blue-400 font-sans">
                    User Content Guidelines and Prohibited Content
                    </div>
                </h1>
                <div className="bg-gray-200 rounded-3xl box-border">
                    <p className="p-4">
                    WizeWiz reserves the right to review, modify, 
                    or remove any User Content that violates these guidelines 
                    or for any other reason, at its sole discretion. 
                    You understand and acknowledge that WizeWiz does not actively 
                    monitor all User Content, and you are solely responsible for 
                    any interactions, consequences, or disputes resulting from your 
                    User Content. By submitting User Content, you indemnify WizeWiz 
                    against any claims, damages, or liabilities arising from the use or 
                    display of your User Content through the Service.
                    </p>
                </div>
            </div>
        )
    },
];
export default function TermsAndServices() {
    const [activeSection, setActiveSection] = useState(sections[0]);

    return (
        <>
            <div className="bg-black">
                <Navbar/>
                <div className="bg-gradient-to-r from-slate-300 to-slate-500 md:mt-[5rem] py-14 md:py-0">
                    <div className="max-w-[1280px] w-full h-screen
                 mx-auto flex flex-col md:flex-row justify-center bg-gradient-to-r from-violet-200 to-pink-200">
                        <div className="md:w-64 w-full bg-gradient-to-r from-indigo-400 to-cyan-400 p-4 rounded-bl-full">
                            <h1 className="text-4xl font-bold mb-4 mt-4
                             text-white text-center">
                                Sections
                            </h1>
                            <ul>
                                {sections.map((section) => (
                                    <li
                                        key={section.title}
                                        className={`mb-2 p-4 subpixel-antialiased font-bold text-center cursor-pointer rounded-full
                                        hover:bg-rose-400 hover:text-white duration-300 ease-linear shadow-2xl shadow-black${
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
                              justify-center">
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