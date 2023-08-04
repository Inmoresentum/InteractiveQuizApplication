import Accordion from "@/components/landing-page/FAQComponent";
import axios from "axios";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";

export default async function AllFAQs() {
    // Fetching the FAQ data
    const response = await axios.get("http://localhost:8080/api/v1/faq/all");
    console.log("Printing the response");
    console.log(response.data);
    return (
        <>
            <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800">
                <Navbar/>
                <Accordion faqs={response.data} showSupportButton={true}/>
                <Footer/>
            </div>
        </>
    );
}