import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

function UsersTable() {

  const columns =[
    { field: 'id', headerName: 'ID', width: 70},
    { field: 'username', headerName: 'Username', width: 130},
    { field: 'rank', headerName: 'Rank', width: 70},
    { field: 'name', headerName: 'Name', width: 130},
    { field: 'is_trainer', headerName: 'Trainer', width: 130},
    { field: 'is_auth', headerName: 'Admin', width: 130},
    { field: 'is_approver', headerName: 'Approval Authority', width: 150},
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: (params) => {return (<Link to={`${params.id}`}>Edit</Link>)}}
  ];
  
  const rows = [
    {id: 4,
      username: "bobthebuilder",
      rank: '1Lt',
      name: 'Bob',
      is_trainer: "Yes",
      is_auth: "Yes",
      is_approver: "No",
      edit: 'edit'
    }
  ];

  return (
    <div className="auth" style={{ height: '20em', width: '56em', margin: "10em"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default UsersTable;
