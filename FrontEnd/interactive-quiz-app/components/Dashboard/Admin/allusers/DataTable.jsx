"use client"
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {Avatar} from "@mui/material";
import {BsCheck2All} from "react-icons/bs";
import {ImCross} from "react-icons/im";
import {useState} from "react";
import useFetchAllAdmin from "@/components/hooks/FetchAllUsers";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

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

export default function DataTable({authInfo}) {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 100,
    });
    const {data, isLoading, isError, error} = useFetchAllAdmin(paginationModel.page,
        authInfo.access_token, authInfo.refresh_token);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    console.log(data);



    const handleRowDoubleClick = (params) => {
        setSelectedRow(params.row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="max-w-[1280px] flex">
                <div className="p-16">
                    <h1 className="uppercase font-bold text-red-400 text-3xl p-2 flex items-center justify-center">
                        All Users
                    </h1>
                    <DataGrid
                        rows={data.content} //here you will have to make changes
                        columns={columns}
                        pageSizeOptions={[100]}
                        checkboxSelection={true}
                        disableRowSelectionOnClick={true}
                        onRowDoubleClick={handleRowDoubleClick}
                        pagination={true}
                        rowCount={data.totalElements}
                        loading={isLoading}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        rowsPerPageOptions={[100]}
                        onPaginationModelChange={setPaginationModel}
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Selected Row</DialogTitle>
                <DialogContent>
                    {selectedRow && columns.map((column) => (
                        <TextField
                            key={column.field}
                            label={column.headerName}
                            defaultValue={selectedRow[column.field]}
                            fullWidth
                            margin="dense"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    ))}
                </DialogContent>
            </Dialog>
        </>
    );
}