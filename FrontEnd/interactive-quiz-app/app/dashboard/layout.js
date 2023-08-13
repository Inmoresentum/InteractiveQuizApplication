import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";

export default function layout({children}) {
    return <>
        <Navbar/>
        {children}
        <div className="mt-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800">
            <Footer/>
        </div>
    </>
}