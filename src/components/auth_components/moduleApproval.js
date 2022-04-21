import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';

import { apiUrl } from '../../App.js'
import { Box, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";



function ModuleApproval({module, setSubmitted}) {

  const navigate = useNavigate() 

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getTaskData()
  },[module])


  const getTaskData = async function(){
    let data = await fetch(apiUrl + "/tasks/")
    let parsedData = await data.json()
    let taskList = []
    for(let task of parsedData){
      if(task.module_id === module.id){
        taskList.push(task)
      }
    }
    setTaskData(taskList)
  }

   const updateModule = function(approval){
    let updatedModule = {...module, is_approved: approval}
    fetch(apiUrl+ "/modules/" + module.id, {
      method: 'PATCH',
      body: JSON.stringify(updatedModule),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => {
      console.log(data)
    })
    .then(()=>{
      setSubmitted(module)
      navigate(-1)
    })
   }

  const columns1 = [
    { field: 'name', headerName: 'Task Name', width: 300},
    { field: 'description', headerName: 'Description', width: 500},
    { field: 'link', headerName: 'Link', width: 300},
    { field: 'special_instructions', headerName: 'Special Instructions', width: 500}
    ];

    
  return (
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}}noValidate autoComplete="off">
          <TextField margin="normal" label="Module Name" variant="outlined" value={module.name}/>
          <TextField margin="normal" label="Operator Level" variant="outlined" value={module.operator_level}/>
        
          <div className="auth" style={{height: '23em', width: '75em', margin: "5em"}}>
            <DataGrid
              rows={taskData.map((task, i) =>{
                return({...task, tableID: i + 1})
              })}
              columns={columns1}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
          <Button variant="contained" onClick={() => updateModule(true)}>Approve</Button>
          <Button variant="contained" onClick={() => updateModule(false)}>Deny</Button>
      </Box>
  );
}

export default ModuleApproval;
