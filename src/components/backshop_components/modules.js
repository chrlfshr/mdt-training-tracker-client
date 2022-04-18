import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../../App.js';

function ModulesTable() {
  const [moduleData, setModuleData] = useState([]);
  const [currentModuleData, setCurrentModuleData] = useState([]);

  useEffect(() => {
    getModuleData()
    getCurrentModuleData()
  },[])

  const getModuleData = async function(){
    let data = await fetch(apiUrl + "/modules/")
    let parsedData = await data.json()
    console.log(parsedData)
    setModuleData(parsedData)
  }

  const getCurrentModuleData = async function(){
    let data = await fetch(apiUrl + "/modules" + moduleData.name)
    let parsedData = await data.json()
    console.log(parsedData)
    setCurrentModuleData(parsedData)
  }

  const columns =[
    { field: 'name', headerName: 'Module Name', width: 130},
    { field: 'operator_level', headerName: 'Operator_Level', width: 150},
    { field: 'is_approved', headerName: 'isApproved', width: 130},
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: (params) => {
      return (<Link to={`${params.row.tableID}`} onClick={()=>{
        console.log(params.row)
        setCurrentModuleData(currentModuleData[params.row.tableID - 1])}}>Edit</Link>)}
    }
  ];

  return (
      <div className="auth" style={{ height: '20em', width: '35em', margin: "10em"}}>
        <Routes>
          <Route path="/:modules" element={<ModulesTable moduleData={moduleData}/>}/>
        </Routes>
        <DataGrid
          rows={moduleData.map((module, i) =>{
            return({...module, tableID: i + 1})
          })}
          columns={columns}
          pageSize={4}
          rowsPerPageOptions={[4]}
        />
      </div>
  );
  
}

export default ModulesTable;
