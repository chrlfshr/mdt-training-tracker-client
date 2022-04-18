import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../../App.js'
import { Box, TextField, Checkbox, FormControlLabel, FormGroup, Button } from "@mui/material";

function UsersProfile({userData}) {
  const [moduleData, setModuleData] = useState([]);
  const [usersModuleData, setUsersModuleData] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState({});

  useEffect(() => {
    setUpdatedUserData(userData)
    getModulesData()
    getModulesUsersData()
  },[])

  useEffect(() =>{
    console.log(updatedUserData)
  },[updatedUserData])

  const getModulesData = async function(){
    let data = await fetch(apiUrl + "/modules/")
    let parsedData = await data.json()
    console.log(parsedData)
    setModuleData(parsedData)
  }

  const getModulesUsersData = async function(){
    let data = await fetch(apiUrl + "/users/account/" + userData.username +  "/modules")
    let parsedData = await data.json()
    console.log(parsedData)
    setUsersModuleData(parsedData)
  }

  const patchUserData = function(){
    console.log('here')
    fetch(apiUrl + "/users/" + userData.id, {
      method: 'PATCH',
      body: JSON.stringify({updatedUserData}),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => data.json())
    .then((data) => (console.log(data)))
   }

  const columns =[
    { field: 'id', headerName: 'ID', width: 70},
    { field: 'username', headerName: 'Username', width: 130},
    { field: 'rank', headerName: 'Rank', width: 70},
    { field: 'name', headerName: 'Name', width: 130},
    { field: 'is_trainer', headerName: 'Trainer', width: 130},
    { field: 'is_auth', headerName: 'Admin', width: 130},
    { field: 'is_approver', headerName: 'Approval Authority', width: 150},
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: 
    (params) => {return (<Link to={`${params.row.username}`}>Edit</Link>)}}
  ];

  return (
    <div className="auth" style={{ height: '20em', width: '56em', margin: "10em"}}>

        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}}noValidate autoComplete="off">
        <form>
          <TextField margin="normal" label="Username" variant="outlined" defaultValue={userData.username} 
            onChange={(e) => setUpdatedUserData({...updatedUserData, username: e.target.value})}/>

          <TextField margin="normal" label="Rank" variant="outlined" defaultValue={userData.rank} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, rank: e.target.value})}/>

          <TextField margin="normal" label="Name" variant="outlined" defaultValue={userData.name} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, name: e.target.value})}/>

          <TextField margin="normal" label="Crew" variant="outlined" defaultValue={userData.crew} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, name: e.target.value})}/>

          {updatedUserData.is_trainer !== undefined && <FormControlLabel label="Trainer" 
          control={<Checkbox checked={updatedUserData.is_trainer} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, is_trainer: e.target.checked})}/>} />}

          {updatedUserData.is_trainer !== undefined && <FormControlLabel label="Backshop" 
          control={<Checkbox checked={updatedUserData.is_auth} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, is_auth: e.target.checked})}/>} />}

          {updatedUserData.is_trainer !== undefined && <FormControlLabel label="Approval Authority" 
          control={<Checkbox checked={updatedUserData.is_approver} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, is_approver: e.target.checked})}/> }/>}

          {moduleData.map((module, i)=>{
            if(module.is_approved){
              return(<FormControlLabel key={i} control={<Checkbox checked={(() => {
                for(let x = 0; x < usersModuleData.length; x++){
                  if(module.id === usersModuleData.module_id){
                    return true
                  }
                }
                return false
              })}
                onChange={(e) => setUpdatedUserData({...updatedUserData, [module.name]: e.target.checked})}/>} label={module.name}/>)
            }
          })}
          <Button variant="contained" onClick={patchUserData}>Submit</Button>
        </form>
      </Box>
    </div>
  );
  
}

export default UsersProfile;
