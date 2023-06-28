import Analytics from "@/components/landingPage/Analytics";
import Hero from "@/components/landingPage/Hero";
import Newsletter from "@/components/landingPage/NewsLetter";
import Cards from "@/components/landingPage/Cards";
import Testimonial from "@/components/landingPage/Testimonial";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div>
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

