import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../../App.js';
import { Button, TextField, Box} from "@mui/material";
import CrewsTable from './crews.js';

function CreateCrew({crewData}) {
  const [updatedCrewData, setUpdatedCrewData] = useState([]);


  useEffect(() => {
    setUpdatedCrewData(crewData)
  },[])

  const patchCrewData = function(){
    fetch(apiUrl + '/crews' + crewData.id)
    console.log(crewData.id);
  }

  return (
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
          <TextField margin="normal" label="Crew ID" variant="outlined"
            onChange={(e) => setUpdatedCrewData({...crewData, id: e.target.value})}/>

          <TextField margin="normal" label="Crew Name" variant="outlined" 
          onChange={(e) => setUpdatedCrewData({...crewData, name: e.target.value})}/>

          <br></br>

          <Button type="submit" margin ="normal" variant="contained">Add</Button>
        </Box>
  );
}

export default CreateCrew;
