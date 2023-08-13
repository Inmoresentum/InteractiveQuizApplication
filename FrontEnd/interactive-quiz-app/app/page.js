import Analytics from "@/components/landing-page/Analytics";
import Hero from "@/components/landing-page/Hero";
import Newsletter from "@/components/landing-page/NewsLetter";
import Cards from "@/components/landing-page/Cards";
import Testimonial from "@/components/landing-page/Testimonial";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import CustomCursor from "@/components/custom-cursor/CustomCursor";
import FAQComponent from "@/components/landing-page/FAQComponent";
import ContentSection from "@/components/landing-page/ContentSection";
import axios from "axios";

export default async function Home() {
    // Fetching the FAQ data
    const response = await axios.get("http://localhost:8080/api/v1/faq/common");
    console.log("Printing the response");
    console.log(response.data);
    return (
        <div className="bg-[#000500] ">
            <CustomCursor/>
            <Navbar/>
            <Hero/>
            <ContentSection/>
            <Analytics/>
            <Newsletter/>
            <Cards/>
            <Testimonial/>
            <FAQComponent faqs={response.data}/>
            <Footer/>
        </div>
    );
}

