import {withAuth} from "next-auth/middleware";
import {NextRequest, NextResponse} from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        console.log("token: ", req.nextauth.token);

        if (req.nextUrl.pathname.startsWith("/dashboard/admin") && req.nextauth.token?.role !== "ADMIN")
            return NextResponse.rewrite(
                new URL("/auth/login", req.url)
            );

    },
    {
        callbacks: {
            authorized: ({token}) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/admin/:path*"],
};