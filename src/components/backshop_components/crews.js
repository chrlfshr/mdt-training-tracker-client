import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material'
import { apiUrl } from '../../App.js';
import { Button, TextField } from "@mui/material";
import CreateCrew from './createCrew.js';

function CrewsTable() {
  const [crewData, setCrewData] = useState([]);
  const [selectedCrewData, setSelectedCrewData] = useState([]);
  const [submitted, setSubmitted] = useState([])


  useEffect(() => {
    getCrewData()
  },[submitted])

  // useEffect(() => {
  //   console.log(crewData)
  // },[crewData])

  const getCrewData = async function(){
    let data = await fetch(apiUrl + "/crews/")
    let parsedData = await data.json()
    setCrewData(parsedData)
  }

  const handleCellEdit = function(data){
    setCrewData(crewData.map((crew) =>{
      if(crew.id === data.id ){
        crew[data.field] = data.value;
        console.log('here', crew)
      }
      return crew;
    }))
   }

   const updateCrew = function(tableID){
    console.log(crewData[tableID-1].id)
     fetch(apiUrl + '/crews/' + crewData[tableID-1].id, {
       method: 'PATCH',
       body: JSON.stringify(crewData[tableID-1]),
       headers: {
         'Content-type': 'application/json'
      }
    }).then((data) => {
      console.log(data)
      getCrewData();
    })
      
   } 

   const deleteCrew = function(crewId){
     fetch(apiUrl + '/crews/' + crewId, {
       method: 'DELETE',
       headers: {
         'Content-type': 'application/json'
       }
     })
     .then((data) => {
       getCrewData()
      })
     .catch((error) => console.log(error))
   }

  const columns =[
    { field: 'id', headerName: 'Crew ID', width: 100},
    { field: 'name', headerName: 'Crew Name', width: 400, editable : true},
    { field: "updateCrew", headerName: "Update Crew", width: 100, renderCell: (params) =>{
      return(<Button variant="contained" onClick={() => updateCrew(params.row.tableID)}>Update</Button>)
    }},
    { field: "delete", headerName: "Delete Crew", width: 100, renderCell: (params) =>{
      return(<Button variant="contained" onClick={() => deleteCrew(params.row.id)}>Delete</Button>)
    }}
  ];

  return (
    <Grid
      container
      spacing={1}
      flexGrow
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={10}>
        <Routes>
          <Route path="/createNewCrew" element={<CreateCrew setSubmitted={setSubmitted}/>}/>
        </Routes>
      </Grid>
      <Grid item xs={10}>
        <DataGrid xs={{ height: '30em', width: '50em', margin: "10em"}}
          rows={crewData.map((crew, i) =>{
            return({...crew, tableID: i + 1})
          })}
          columns={columns}
          onCellEditCommit={handleCellEdit}
          pageSize={6}
          rowsPerPageOption={[6]}
        />
        <Link to="createNewCrew">Create New Crew</Link>
      </Grid>
    </Grid>
  );
}
export default CrewsTable;
