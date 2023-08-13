import Navbar from "@/components/Dashboard/Admin/activity/Navbar";

export const metadata = {
    title: "Dashboard",
    description: "The Admin Dashboard is a powerful web-based interface," +
        " offering centralized control, customizable widgets, user and content management," +
        " robust analytics, system monitoring, and security features." +
        " With its intuitive design and cross-platform accessibility," +
        " administrators can efficiently manage their digital assets," +
        " gain valuable insights, and make data-driven decisions," +
        " driving the success of their organization with ease.",
}
export default function LoginPageLayout({children}) {
    return (
        <>
            <div className="flex pt-20">
                <Navbar/>
                <main className='ml-20 w-full'>
                    {children}
                </main>
            </div>
        </>
    )
}
