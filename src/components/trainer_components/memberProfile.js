import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { apiUrl } from '../../App.js'
import { Box, TextField, Checkbox, FormControlLabel, Select, Button, MenuItem, FormControl } from "@mui/material";

function MemberProfile({userData, setSubmitted}) {
  const navigate = useNavigate() 

  const [userDataState, setUserDataState] = useState(userData);
  const [moduleData, setModuleData] = useState([]);
  const [usersModuleData, setUsersModuleData] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [updatedUserModuleData, setUpdatedUserModuleData] = useState({});

  useEffect(() => {
    console.log("Mounting: " + userData.name)
    setUserDataState(userData)
    setUpdatedUserData(userData)
    getModulesData()
    getModulesUsersData()
  },[userData])


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


  const patchUserModule = function(module){
    console.log(module)
    fetch(apiUrl+ "/users/" + module.user_id + "/modules", {
      method: 'PATCH',
      body: JSON.stringify(module),
      headers: {
        'Content-type': 'application/json'
      }
    }).then((data) => console.log(data))
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
          <Button variant="contained" onClick={patchUserModule}>Update</Button>
      </Box>
    </div>
  );
  
}

export default MemberProfile;