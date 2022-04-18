import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {apiUrl} from '../../App.js'
import { FormControl, TextField } from "@mui/material";

function UsersProfile(userData) {

  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    getModulesData()
  },[])

  const getModulesData = async function(){
    let data = await fetch(apiUrl + "/modules/")
    let parsedData = await data.json()
    console.log(parsedData)
    setModuleData(parsedData)
  }

  const columns =[
    { field: 'id', headerName: 'ID', width: 70},
    { field: 'username', headerName: 'Username', width: 130},
    { field: 'rank', headerName: 'Rank', width: 70},
    { field: 'name', headerName: 'Name', width: 130},
    { field: 'is_trainer', headerName: 'Trainer', width: 130},
    { field: 'is_auth', headerName: 'Admin', width: 130},
    { field: 'is_approver', headerName: 'Approval Authority', width: 150},
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: (params) => {return (<Link to={`${params.row.username}`}>Edit</Link>)}}
  ];

  return (
      <div className="auth" style={{ height: '20em', width: '56em', margin: "10em"}}>
        <FormControl>
          <form>
            <TextField variant="outlined" defaultValue={moduleData}></TextField>
          </form>
        </FormControl>
        
      </div>
  );
  
}

export default UsersProfile;
