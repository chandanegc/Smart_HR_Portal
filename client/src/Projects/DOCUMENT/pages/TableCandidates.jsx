import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { Link, useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/user/all-users");
    return data.users;
  } catch (error) {
    toast.error(error.message);
    return [];
  }
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    renderCell: (params) => (
      <Link to={`/truedocs/dashboard/user-docs/${params.row._id}`}>
        {params.row.id}
      </Link>
    ),
  },
  {
    field: "employeeId",
    headerName: "Employee ID",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Link to={`/truedocs/dashboard/user-docs/${params.row._id}`}>
        {params.row.employeeId || "N/A"}
      </Link>
    ),
  },
  {
    field: "name",
    headerName: "Full Name",
    sortable: false,
    flex: 1,
    minWidth: 180,
    renderCell: (params) => (
      <div id="table-row-data" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {params.row.avatar && (
          <img
            src={params.row.avatar}
            alt="avatar"
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
        )}
        <Link to={`/truedocs/dashboard/user-docs/${params.row._id}`}>
          <p style={{ margin: 0 }}>{params.row.name || "N/A"}</p>
        </Link>
      </div>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 200,
    renderCell: (params) => (
      <Link to={`/truedocs/dashboard/user-docs/${params.row._id}`}>
        {params.row.email || "N/A"}
      </Link>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 200,
    renderCell: (params) => (
      <Link to={`/truedocs/dashboard/user-docs/${params.row._id}`}>
        {params.row.status?<span className="complete">complete</span> : <span className="incomplete">incomplete</span>}
      </Link>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  const data = useLoaderData();
  const rows = data.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  return (
    <Paper sx={{ height: "80vh", width: "100%", overflow: "auto", p: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        slots={{ toolbar: GridToolbar }}
        sx={{
          border: 0,
          "& .MuiDataGrid-toolbarContainer": {
            justifyContent: "flex-end",
          },
        }}
      />
    </Paper>
  );
}
