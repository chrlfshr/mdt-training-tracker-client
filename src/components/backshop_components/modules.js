import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { apiUrl } from '../../App.js';
import ModuleProfile from "./moduleProfile.js";
import NewModule from "./newModule.js";

function ModulesTable() {
  const [moduleData, setModuleData] = useState([]);
  const [currentModuleData, setCurrentModuleData] = useState([]);
  const [submitted, setSubmitted] = useState(1);

  useEffect(() => {
    getModuleData()
  },[])

  useEffect(() => {
    getModuleData()
  },[submitted])

  const getModuleData = async function(){
    let data = await fetch(apiUrl + "/modules/")
    let parsedData = await data.json()
    console.log(parsedData)
    setModuleData(parsedData)
  }

  const columns =[
    { field: 'name', headerName: 'Module Name', width: 130},
    { field: 'operator_level', headerName: 'Operator_Level', width: 150},
    { field: 'is_approved', headerName: 'isApproved', width: 130},
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: (params) => {
      return (<Link to={`${params.row.tableID}`} onClick={()=>{
        setCurrentModuleData(moduleData[params.row.tableID - 1])}}>Edit</Link>)
      }
    }
  ];

  return (
        <Grid
        container
        spacing={1}
        flexGrow
        direction="column"
        alignItems="center"
        justify="center"
        style={{height: '30em', width: '100%'}}
      >
        <Routes>
          <Route path="/:module" element={<ModuleProfile module={currentModuleData} setSubmitted={setSubmitted}/>}/>
          <Route path="/createNewModule" element={<NewModule setSubmitted={setSubmitted}/>}/>
        </Routes>
        <DataGrid
          rows={moduleData.map((module, i) =>{
            return({...module, tableID: i + 1})
          })}
          columns={columns}
          pageSize={4}
          rowsPerPageOptions={[4]}
        />
        <Link to="createNewModule">Create New Module</Link>
        </Grid>
  );
  
}

export default ModulesTable;
