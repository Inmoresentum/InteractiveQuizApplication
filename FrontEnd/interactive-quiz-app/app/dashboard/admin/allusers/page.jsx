import DataTable from "@/components/Dashboard/Admin/allusers/DataTable";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import AllUserLoadingSpinner from "@/components/loading-animation/AllUserLoadingSpinner";

export default async function AllUsers() {
    const session = await getServerSession(options);
    console.log(session);
    return (
        <DataTable authInfo={session.user}/>
    );
}