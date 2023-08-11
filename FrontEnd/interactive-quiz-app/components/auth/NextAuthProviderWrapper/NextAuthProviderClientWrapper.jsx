"use client"
import {SessionProvider} from "next-auth/react";

export default function NextAuthClientWrapper({children}) {
    return (
       <SessionProvider>
           {children}
       </SessionProvider>
    );
}