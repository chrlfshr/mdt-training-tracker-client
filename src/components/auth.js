import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../App.js';
import ModuleApproval from "./auth_components/moduleApproval.js";



function Auth() {
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
    { field: 'operator_level', headerName: 'Operator Level', width: 150},
    { field: 'is_approved', headerName: 'Approved', width: 130},
    { field: 'examine', headerName: 'Examine', width: 70, renderCell: (params) => {
      return (<Link to={`${params.row.tableID}`} onClick={()=>{
        setCurrentModuleData(moduleData[params.row.tableID - 1])}}>Examine</Link>)
      }
    }
  ];

  return (
      <div className="auth" style={{ height: '20em', width: '35em', margin: "10em"}}>
        <Routes>
          <Route path="/:id" element={<ModuleApproval module={currentModuleData} setSubmitted={setSubmitted}/>}/>
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

export default Auth;
