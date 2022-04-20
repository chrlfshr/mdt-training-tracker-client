import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../../App.js';
import { Button, TextField } from "@mui/material";
import CreateCrew from './createCrew.js';

function CrewsTable() {
  const [crewData, setCrewData] = useState([]);


  useEffect(() => {
    getCrewData()
  },[])

  const getCrewData = async function(){
    let data = await fetch(apiUrl + "/crews/")
    let parsedData = await data.json()
    setCrewData(parsedData)
  }

  const columns =[
    { field: 'id', headerName: 'Crew ID', width: 100, renderCell: (params) => {
           return (<TextField margin="normal" variant="standard" style={{width: 100}} value={(crewData[params.row.tableID-1].id)} 
           onChange={(e) => setCrewData({...crewData, id: e.target.value})}/>)}},
    { field: 'name', headerName: 'Crew Name', width: 400, renderCell: (params) => {
           return (<TextField margin="normal" variant="standard" style={{width: 300}} value={(crewData[params.row.tableID-1].name)} 
           onChange={(e) => setCrewData({...crewData, name: e.target.value})}/>)}}
  ];

  return (
      <div className="auth" style={{ height: '30em', width: '30em', margin: "10em"}}>
        <Routes>
          <Route path="/createNewCrew" element={<CreateCrew crewData={crewData}/>}/>
        </Routes>
        <DataGrid
          rows={crewData.map((crew, i) =>{
            return({...crew, tableID: i + 1})
          })}
          columns={columns}
          pageSize={6}
          rowsPerPageOption={[6]}
        />
        <Link to="createNewCrew">Create New Crew</Link>
      </div>
  );
}
export default CrewsTable;
