import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../../App.js';
import { Button, TextField, Box} from "@mui/material";
import CrewsTable from './crews.js';

function CreateCrew({setSubmitted}) {
  const [updatedCrewData, setUpdatedCrewData] = useState([]);
  const navigate = useNavigate() 

  useEffect(() => {
    console.log(updatedCrewData)
  },[updatedCrewData])

  const postCrewData = function(){
    console.log(updatedCrewData)
    fetch(apiUrl + '/crews', {
      method: 'POST',
      body: JSON.stringify(updatedCrewData),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => {
      console.log(data)
      setSubmitted(updatedCrewData)
      navigate(-1)
    })
    .catch((err) => console.log(err));
  };

  return (
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}} noValidate autoComplete="off">

          <TextField margin="normal" label="Crew Name" variant="outlined" 
          onChange={(e) => setUpdatedCrewData({name: e.target.value})}/>

          <br></br>

          <Button onClick={postCrewData} margin ="normal" variant="contained">Add</Button>
        </Box>
  );
}

export default CreateCrew;
