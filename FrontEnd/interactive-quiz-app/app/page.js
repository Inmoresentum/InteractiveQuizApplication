import Analytics from "@/components/landing-page/Analytics";
import Hero from "@/components/landing-page/Hero";
import Newsletter from "@/components/landing-page/NewsLetter";
import Cards from "@/components/landing-page/Cards";
import Testimonial from "@/components/landing-page/Testimonial";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import CustomCursor from "@/components/custom-cursor/CustomCursor";

export default function Home() {
    return (
        <div className="bg-[#000300]">
            <CustomCursor/>
            <Navbar/>
            <Hero/>
            <Analytics/>
            <Newsletter/>
            <Cards/>
            <Testimonial/>
            <Footer/>
        </div>
    );
}

