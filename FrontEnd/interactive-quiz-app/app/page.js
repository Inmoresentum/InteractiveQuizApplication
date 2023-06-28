import Analytics from "@/components/landingPage/Analytics";
import Hero from "@/components/landingPage/Hero";
import Newsletter from "@/components/landingPage/NewsLetter";
import Cards from "@/components/landingPage/Cards";
import Testimonial from "@/components/landingPage/Testimonial";
import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/landingPage/Footer";

export default function Home() {
    return (
        <div className="bg-[#000300]">
            <Navbar/>
            <Hero/>
            <Analytics/>
            <Newsletter/>
            <Cards/>
            <Testimonial/>
            <Footer/>
        </div>

    )
}

