"use client"
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {Avatar} from "@mui/material";
import {BsCheck2All} from "react-icons/bs";
import {ImCross} from "react-icons/im";


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
        width: 180,
        renderCell: (params) => {
            return params.value ? <BsCheck2All/> : <ImCross/>;
        },
    },
    {
        field: "deactivatedByAdmin",
        headerName: "Deactivated by Admin?",
        width: 200,
        renderCell: (params) => {
            return params.value ? <BsCheck2All/> : <ImCross/>;
        },
    },
    {field: "aboutYourSelf", headerName: "About Yourself", width: 200},
    {field: "address", headerName: "Address", width: 200},
    {field: "gender", headerName: "Gender", width: 130},
    {field: "accountCreated", headerName: "Account Created Date", width: 200},
    {
        field: "agreesWithTermsOfServicesAndPrivacyAndPolicy",
        headerName: "Agrees with TOS and Privacy Policy",
        width: 300,
        renderCell: (params) => {
            return params.value ? <BsCheck2All/> : <ImCross/>;
        }
    }
];
export default function DataTable() {
    return (
        <>
            <div className="m-5 md:m-10 shadow-2xl rounded">
                <h1 className="font-sans font-bold uppercase p-1 ">
                    All Users
                </h1>
                <DataGrid className="p-2.5"
                          rows={rows}
                          columns={columns}
                          initialState={{
                              pagination: {
                                  paginationModel: {
                                      pageSize: 5,
                                  },
                              },
                          }}
                          pageSizeOptions={[5]}
                          checkboxSelection={true}
                          disableRowSelectionOnClick={true}
                          slots={{toolbar: GridToolbar}}
                          slotProps={{
                              toolbar: {
                                  showQuickFilter: true,
                                  quickFilterProps: {debounceMs: 500},
                              },
                          }}
                />
            </div>
        </>
    );
}