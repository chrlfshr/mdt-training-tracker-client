import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { apiUrl } from '../../App.js'
import { Box, TextField, Checkbox, FormControlLabel, Select, Button, MenuItem, InputLabel, FormControl } from "@mui/material";

function CreateUser({setSubmitted}) {
  const navigate = useNavigate() 

  const [moduleData, setModuleData] = useState([]);
  const [crewData, setCrewData] = useState([]);
  const [newUserData, setNewUserData] = useState({
    crew_id: 1,
    is_approver: false,
    is_auth: false,
    is_trainer: false,
    name: "",
    rank: "",
    username: "",
  });
  const [newUserModuleData, setNewUserModuleData] = useState([]);
  

  useEffect(() => {
    console.log("Mounting: ")
    getModulesData()
    getCrewData()
  },[])

  useEffect(() =>{
    console.log(newUserData)
  },[newUserData])

  useEffect(() =>{
    console.log(newUserModuleData)
  },[newUserModuleData])

  const getModulesData = async function(){
    let data = await fetch(apiUrl + "/modules/")
    let parsedData = await data.json()
    setModuleData(parsedData)
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

  const postUserData = function(){
    console.log(newUserData)
    fetch(apiUrl+ "/users", {
      method: 'POST',
      body: JSON.stringify(newUserData),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => data.json())
    .then((data) => {
      let newModule;
      console.log(data)
      for(let module of newUserModuleData){
        newModule = {...module, user_id : data.id} 
        postUserModule(newModule)
      }
    })
    .then(()=>{
      setSubmitted(newUserData)
    })

   }

  const getChecked = function(module){
    for(let x = 0; x < newUserModuleData.length; x++){
      if(module.id === newUserModuleData[x].module_id){
        return true
      }
    }
    return false
  }


  return (
    <div className="auth" style={{ height: '20em', width: '56em', margin: "10em"}}>
     
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}}noValidate autoComplete="off">
          <TextField margin="normal" label="Username" variant="outlined" 
            onChange={(e) => setNewUserData({...newUserData, username: e.target.value})}/>

          <TextField margin="normal" label="Rank" variant="outlined"  
          onChange={(e) => setNewUserData({...newUserData, rank: e.target.value})}/>

          <TextField margin="normal" label="Name" variant="outlined" 
          onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}/>
           <FormControl>
          {/* <InputLabel id="crew-label">Crew</InputLabel> */}
          <Select
          labelId='crew-label'
          name="input"
          label="Crew"
          id='crew'
          defaultValue='1'
          onChange={(e) => setNewUserData({...newUserData, crew_id: e.target.value})}
          // sx={{width: 200, fontSize: 20, fontWeight: 'bold'}
          >
          {crewData.map((crew, i) => {return (<MenuItem key={i} value={crew.id}>{crew.name}</MenuItem>)})}
        
          </Select>
          </FormControl>

          <FormControlLabel label="Trainer" 
          control={<Checkbox checked={newUserData.is_trainer} 
          onChange={(e) => setNewUserData({...newUserData, is_trainer: e.target.checked})}/>} />

          <FormControlLabel label="Backshop" 
          control={<Checkbox checked={newUserData.is_auth} 
          onChange={(e) => setNewUserData({...newUserData, is_auth: e.target.checked})}/>} />

          <FormControlLabel label="Approval Authority" 
          control={<Checkbox checked={newUserData.is_approver} 
          onChange={(e) => setNewUserData({...newUserData, is_approver: e.target.checked})}/> }/>

          {moduleData.length !== 0 && moduleData.map((module, i)=>{
            if(module.is_approved){
              return(<FormControlLabel key={i} control={<Checkbox checked={getChecked(module)}
                onChange={(e) => {
                  if(e.target.checked){
                    setNewUserModuleData(newUserModuleData.concat({module_id: module.id, user_id: newUserData.id, is_started: false, is_completed: false, deadline: null}))
                  } else{
                    setNewUserModuleData(newUserModuleData.filter(item => item.module_id !== module.id))
                    }
                  }
                }/>} label={module.name}/>)
            }
          })}
          <Button variant="contained" onClick={postUserData}>Submit</Button>
      </Box>
    </div>
  );
}

export default CreateUser;
