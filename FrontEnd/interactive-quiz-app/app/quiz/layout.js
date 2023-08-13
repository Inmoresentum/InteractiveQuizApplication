import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";

export default function QuizLayout({children}) {

    return (
        <>
            <Navbar/>
            {children}
            <div className="bg-gradient-to-r from-orange-400 to-rose-400">
                <Footer/>
            </div>
        </>
    );
}