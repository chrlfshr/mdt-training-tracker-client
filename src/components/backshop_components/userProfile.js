import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { apiUrl } from '../../App.js'
import { Box, TextField, Checkbox, FormControlLabel, Select, Button, MenuItem, FormControl } from "@mui/material";

function UsersProfile({userData, setSubmitted}) {
  const navigate = useNavigate() 

  const [userDataState, setUserDataState] = useState(userData);
  const [moduleData, setModuleData] = useState([]);
  const [usersModuleData, setUsersModuleData] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [updatedUserModuleData, setUpdatedUserModuleData] = useState({});
  const [crewData, setCrewData] = useState([]);

  useEffect(() => {
    console.log("Mounting: " + userData.name)
    setUserDataState(userData)
    setUpdatedUserData(userData)
    getModulesData()
    getModulesUsersData()
    getCrewData()
  },[userData])

  useEffect(() =>{
    console.log(updatedUserData)
  },[updatedUserData])

  useEffect(() =>{
    // console.log(updatedUserModuleData)
  },[updatedUserModuleData])

  useEffect(() =>{
    // console.log(usersModuleData)
    setUpdatedUserModuleData(usersModuleData)
  },[usersModuleData])

  const getModulesData = async function(){
    let data = await fetch(apiUrl + "/modules/")
    let parsedData = await data.json()
    setModuleData(parsedData)
  }

  const getModulesUsersData = async function(){
    let data = await fetch(apiUrl + "/users/account/" + userData.username +  "/modules")
    let parsedData = await data.json()
    setUsersModuleData(parsedData)
  }

  const getCrewData = async function(){
    let data = await fetch(apiUrl + "/crews/")
    let parsedData = await data.json()
    console.log(parsedData)
    setCrewData(parsedData)
  }

  const postUserModule = function(module){
    console.log(module)
    fetch(apiUrl+ "/users/" + module.user_id + "/modules", {
      method: 'POST',
      body: JSON.stringify(module),
      headers: {
        'Content-type': 'application/json'
      }
    }).then((data) => console.log(data))
   }

  const deleteUserModule = function(module){
    fetch(apiUrl+ "/users/" + module.user_id + "/modules/" + module.module_id, {
      method: 'DELETE',
      body: JSON.stringify(module),
      headers: {
        'Content-type': 'application/json'
      }
    }).then((data) => console.log(data))
  }

  const patchUserData = function(){
    fetch(apiUrl+ "/users/" + userData.id, {
      method: 'PATCH',
      body: JSON.stringify(updatedUserData),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => console.log(data))
    .then(()=>{
      setSubmitted(updatedUserData)
      setUserDataState(updatedUserData)
    })

    let moduleFound = false;

    for(let module of usersModuleData){
      console.log(module)
      moduleFound = false
      for(let updatedModule of updatedUserModuleData){
        if(updatedModule.module_id === module.module_id){
          moduleFound = true;
        }
      }
      if(!moduleFound){
        deleteUserModule(module)
      }
    }

    for(let updatedModule of updatedUserModuleData){
      moduleFound = false
      for(let module of usersModuleData){
        if(updatedModule.module_id === module.module_id){
          moduleFound = true;
        }
      }
      if(!moduleFound){
        postUserModule(updatedModule)
      }
    }
   }

  const deleteUserData = function(){
    fetch(apiUrl+ "/users/" + userData.id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => {
      console.log(data)
      for(let module of usersModuleData){
        deleteUserModule(module)
      }
    })
    .then(()=>{
      setSubmitted({deleted: true})
      navigate(-1)
    })
  }

  

  const getChecked = function(module){
    for(let x = 0; x < updatedUserModuleData.length; x++){
      if(module.id === updatedUserModuleData[x].module_id){
        return true
      }
    }
    return false
  }

  return (
    <div className="auth" style={{ height: '20em', width: '56em', margin: "10em"}}>
     
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}}noValidate autoComplete="off">
          <TextField margin="normal" label="Username" variant="outlined" value={updatedUserData.username} 
            onChange={(e) => setUpdatedUserData({...updatedUserData, username: e.target.value})}/>

          <TextField margin="normal" label="Rank" variant="outlined" value={updatedUserData.rank} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, rank: e.target.value})}/>

          <TextField margin="normal" label="Name" variant="outlined" value={updatedUserData.name} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, name: e.target.value})}/>
           <FormControl>
          {/* <InputLabel id="crew-label">Crew</InputLabel> */}
          <Select
          labelId='crew-label'
          name="input"
          label="Crew"
          id='crew'
          value={updatedUserData?.crew_id ?? null}
          onChange={(e) => setUpdatedUserData({...updatedUserData, crew_id: e.target.value})}
          // sx={{width: 200, fontSize: 20, fontWeight: 'bold'}
          >
          {crewData.map((crew, i) => {return (<MenuItem key={i} value={crew.id}>{crew.name}</MenuItem>)})}
        
          </Select>
          </FormControl>

          {updatedUserData.is_trainer !== undefined && <FormControlLabel label="Trainer" 
          control={<Checkbox checked={updatedUserData.is_trainer} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, is_trainer: e.target.checked})}/>} />}

          {updatedUserData.is_trainer !== undefined && <FormControlLabel label="Backshop" 
          control={<Checkbox checked={updatedUserData.is_auth} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, is_auth: e.target.checked})}/>} />}

          {updatedUserData.is_trainer !== undefined && <FormControlLabel label="Approval Authority" 
          control={<Checkbox checked={updatedUserData.is_approver} 
          onChange={(e) => setUpdatedUserData({...updatedUserData, is_approver: e.target.checked})}/> }/>}

          {moduleData.length !== 0 && moduleData.map((module, i)=>{
            if(module.is_approved){
              return(<FormControlLabel key={i} control={<Checkbox checked={getChecked(module)}
                onChange={(e) => {
                  if(e.target.checked){
                    setUpdatedUserModuleData(updatedUserModuleData.concat({module_id: module.id, user_id: userData.id, is_started: false, is_completed: false, deadline: null}))
                  } else{
                      setUpdatedUserModuleData(updatedUserModuleData.filter(item => item.module_id !== module.id))
                    }
                  }
                }/>} label={module.name}/>)
            }
          })}
          <Button variant="contained" onClick={patchUserData}>Update</Button>
          <Button variant="contained" onClick={deleteUserData}>Delete</Button>
      </Box>
    </div>
  );
  
}

export default UsersProfile;
