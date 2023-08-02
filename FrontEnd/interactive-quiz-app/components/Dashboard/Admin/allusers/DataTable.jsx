"use client"
import {DataGrid, GridToolbar} from "@mui/x-data-grid";


const columns = [
    {field: "id", headerName: "ID", width: 90},
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
        editable: true,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: true,
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 110,
        editable: true,
    },
    {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
];

const rows = [
    {id: 1, lastName: "Snow", firstName: "Jon", age: 35},
    {id: 2, lastName: "Lannister", firstName: "Cersei", age: 42},
    {id: 3, lastName: "Lannister", firstName: "Jaime", age: 45},
    {id: 4, lastName: "Stark", firstName: "Arya", age: 16},
    {id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null},
    {id: 6, lastName: "Melisandre", firstName: null, age: 150},
    {id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44},
    {id: 8, lastName: "Frances", firstName: "Rossini", age: 36},
    {id: 9, lastName: "Roxie", firstName: "Harvey", age: 65},
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
                          slots={{ toolbar: GridToolbar }}
                          slotProps={{
                              toolbar: {
                                  showQuickFilter: true,
                                  quickFilterProps: { debounceMs: 500 },
                              },
                          }}
                />
            </div>
        </>
    );
}