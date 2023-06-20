import Analytics from "@/components/Analytics";
import Hero from "@/components/Hero";
import Newsletter from "@/components/NewsLetter";
import Cards from "@/components/Cards";
import Testimonial from "@/components/Testimonial";

export default function Home() {
    return (
        <div>
            <Hero/>
            <Analytics/>
            <Newsletter/>
            <Cards/>
            <Testimonial/>
        </div>

    )
}

