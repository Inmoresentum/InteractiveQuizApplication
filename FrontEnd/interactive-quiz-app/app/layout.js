import "./globals.css"
import {Inter} from "next/font/google"
import CustomSessionProvider from "@/components/auth/CustomSessionProvider";

const inter = Inter({subsets: ["latin"]})

export const metadata = {
    title: "Quiz Application",
    description: "Our interactive quiz application is a captivating" +
        " platform that engages users with a wide range of quizzes," +
        " puzzles, and brain teasers. With customizable quiz creation," +
        " users can design their own quizzes or explore curated quizzes from various domains such as science," +
        " history, geography and so on and so forth. The application offers a seamless user experience," +
        " combining multiple-choice, true/false, and image-based questions to challenge and entertain users." +
        " Timed quizzes add an element of excitement, while a hint system provides assistance for difficult questions." +
        " Users can track their progress, view detailed explanations for answers, and compete" +
        " on the leaderboard to showcase their knowledge." +
        " Admins have comprehensive tools to manage users, quizzes, and content moderation." +
        " With an intuitive interface, our application creates an immersive and educational" +
        " experience for users to enhance their knowledge and have fun along the way."
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <CustomSessionProvider>
            {children}
        </CustomSessionProvider>
        </body>
        </html>
    )
}
