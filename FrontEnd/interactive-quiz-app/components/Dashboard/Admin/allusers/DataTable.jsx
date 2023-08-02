"use client"
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {Avatar} from "@mui/material";
import {BsCheck2All} from "react-icons/bs";
import {ImCross} from "react-icons/im";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";


const columns = [
    {field: "id", headerName: "ID", width: 70},
    {field: "username", headerName: "Username", width: 130},
    {field: "firstname", headerName: "First Name", width: 130},
    {field: "lastname", headerName: "Last Name", width: 130},
    {field: "email", headerName: "Email", width: 200},
    {field: "role", headerName: "Role", width: 130},
    {
        field: "profilePicUrl",
        headerName: "Profile Picture",
        width: 150,
        renderCell: (params) => {
            return params.value ? (
                <Avatar alt={params.row.username} src={params.value}/>
            ) : (
                <Avatar>{params.row.firstname[0]}</Avatar>
            );
        },
    },
    {field: "phoneNumber", headerName: "Phone Number", width: 150},
    {field: "dateOfBirth", headerName: "Date of Birth", width: 150},
    {
        field: "accountVerified",
        headerName: "Account Verified?",
        width: 130,
        renderCell: (params) => {
            return params.value ? <BsCheck2All/> : <ImCross/>;
        },
    },
    {
        field: "deactivatedByAdmin",
        headerName: "Deactivated by Admin?",
        width: 130,
        renderCell: (params) => {
            return params.value ? <BsCheck2All/> : <ImCross/>;
        },
    },
    {field: "aboutYourSelf", headerName: "About Yourself", width: 200},
    {field: "address", headerName: "Address", width: 130},
    {field: "gender", headerName: "Gender", width: 130},
    {field: "accountCreated", headerName: "Account Created Date", width: 150},
    {
        field: "agreesWithTermsOfServicesAndPrivacyAndPolicy",
        headerName: "Agrees with TOS and Privacy Policy",
        width: 180,
        renderCell: (params) => {
            return params.value ? <BsCheck2All/> : <ImCross/>;
        }
    }
];

const fetchUsers = async (page, accessToken, refreshToken) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/admin/control/users?page=${page}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("I am trying to check the status");
        console.log(error.response.status);
        if (error.response.status === 403) {
            // access token has expired, acquire new access token using refresh token
            const response = await axios.post("http://localhost:8080/api/v1/auth/refresh-token", null, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
            console.log("Trying to print the response data");
            console.log(response.data);
            const newAccessToken = response.data.access_token;
            try {
                const newResponse = await axios.get(`http://localhost:8080/api/v1/admin/control/users?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                });
                return newResponse.data;
            } catch (newError) {
                return newError.response;
            }
        }
        return error.response;
    }
};

export default function DataTable({authInfo}) {
    const [page, setPage] = useState(0);
    const {data, isLoading, isError, error} = useQuery(
        ["users", page],
        () => fetchUsers(page, authInfo.access_token, authInfo.refresh_token),
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    console.log(data);

    return (
        <>
            <div className="max-w-[1280px] grid">
                <div className="p-16">
                    <h1 className="uppercase font-bold text-red-400 text-3xl p-2 flex items-center justify-center">
                        All Users
                    </h1>
                    <DataGrid className=""
                              rows={data.content} //here you will have to make changes
                              columns={columns}
                              pageSizeOptions={[100]}
                              checkboxSelection={true}
                              disableRowSelectionOnClick={true}
                              pagination={true}
                              rowCount={data.totalElements}
                              loading={isLoading}
                              paginationMode="server"
                              rowsPerPageOptions={[10, 30, 50, 70, 100]}
                              onPaginationModelChange={newPage => setPage(newPage.page)}
                              slots={{toolbar: GridToolbar}}
                              slotProps={{
                                  toolbar: {
                                      showQuickFilter: true,
                                      quickFilterProps: {debounceMs: 500},
                                  },
                              }}
                    />
                </div>
            </div>
        </>
    );
}