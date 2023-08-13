"use client"
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {Avatar} from "@mui/material";
import {BsCheck2All} from "react-icons/bs";
import {ImCross} from "react-icons/im";
import {useState} from "react";
import useFetchAllAdmin from "@/components/hooks/FetchAllUsers";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import AllUserLoadingSpinner from "@/components/loading-animation/AllUserLoadingSpinner";
// import {useDownloadReports} from "@/components/hooks/useDownloadReports";
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

export default function DataTable({authInfo}) {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 100,
    });
    const {data, isLoading, isError, error} = useFetchAllAdmin(paginationModel.page,
        authInfo.access_token, authInfo.refresh_token);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    if (isLoading) return <AllUserLoadingSpinner/>;
    if (isError) return <div>Error: {error.message}</div>;

    console.log(data);


    const handleRowDoubleClick = (params) => {
        setSelectedRow(params.row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const downloadPDF = async (accessToken, refreshToken) => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/reports/users/pdf", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                responseType: 'blob', // This tells Axios to treat the response as binary data
            });

            // Handle the response and download the file...
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.pdf'; // Set the desired file name
            a.click();
            URL.revokeObjectURL(url);


        } catch (error) {
            if (error.response.status === 403) {
                // Access token has expired, try refreshing it
                try {
                    const refreshResponse = await axios.post("http://localhost:8080/api/v1/auth/refresh-token", null, {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    });

                    const newAccessToken = refreshResponse.data.access_token;
                    await downloadPDF(newAccessToken, refreshToken); // Retry with new token
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                }
            } else {
                console.error("Error downloading PDF:", error);
            }
        }
    };

    const downloadCSV = async (accessToken, refreshToken) => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/reports/users/csv", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                responseType: 'blob', // This tells Axios to treat the response as binary data
            });

            // Handle the response and download the file...
            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.csv'; // Set the desired file name
            a.click();
            URL.revokeObjectURL(url);


        } catch (error) {
            if (error.response.status === 403) {
                // Access token has expired, try refreshing it
                try {
                    const refreshResponse = await axios.post("http://localhost:8080/api/v1/auth/refresh-token", null, {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    });

                    const newAccessToken = refreshResponse.data.access_token;
                    await downloadCSV(newAccessToken, refreshToken); // Retry with new token
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                }
            } else {
                console.error("Error downloading CSV:", error);
            }
        }
    };


    return (
        <>
            <Dialog open={open} onOpenChange={handleClose}>
                <div className="max-w-[1280px] flex">
                    <div className="p-16">
                        <h1 className="uppercase font-bold text-red-400 text-3xl p-2 flex items-center justify-center">
                            All Users


                        </h1>
                        <div className="flex items-center mt-4 justify-end space-x-4">
                            <Button
                                onClick={() => downloadPDF(authInfo.access_token, authInfo.refresh_token)}
                                variant="outlined"
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    borderRadius: "8px",
                                    marginLeft: "24px",
                                }}
                            >
                                Download PDF
                            </Button>
                            <Button
                                onClick={() => downloadCSV(authInfo.access_token, authInfo.refresh_token)}
                                variant="outlined"
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    borderRadius: "8px",
                                    marginLeft: "8px",
                                }}
                            >
                                Download CSV
                            </Button>
                        </div>


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


                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Make Changes To This User</DialogTitle>
                        <DialogDescription>
                            Make changes to user profile. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}