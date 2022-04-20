import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../../App.js'
import { Box, TextField, Button } from "@mui/material";

function ModuleProfile({module}) {
  const [currentModuleData, setCurrentModuleData] = useState([]);
  const [updatedModuleData, setUpdatedModuleData] = useState([]);

  const [taskData, setTaskData] = useState([]);
  const [updatedTaskData, setUpdatedTaskData] = useState([]);

  useEffect(() => {
    setCurrentModuleData(module)
    setUpdatedModuleData(module)
    getTaskData()
  },[module])

  useEffect(() =>{
    setUpdatedTaskData(taskData)
    console.log(taskData)
  },[taskData])

  useEffect(() =>{
    console.log(updatedTaskData)
  },[updatedTaskData])

  const getTaskData = async function(){
    let data = await fetch(apiUrl + "/tasks/")
    let parsedData = await data.json()
    let taskList = []
    console.log(parsedData)
    console.log(module)
    for(let task of parsedData){
      if(task.module_id === module.id){
        taskList.push(task)
      }
    }
    console.log(taskList)
    setTaskData(taskList)
  }

  const patchModuleData = function(){
    fetch(apiUrl + "/modules/" + module.id, {
      method: 'PATCH',
      body: JSON.stringify({updatedModuleData}),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => data.json())
    .then((data) => (console.log(data)))
   }

   const handleCellEdit = function(data){
    console.log(data)
    setUpdatedTaskData(updatedTaskData.map((task, i) =>{
      if(task.id === data.id ){
        task[data.field] = data.value;
      }
      return task
    }))
   }

  const columns1 = [
    { field: 'name', headerName: 'Task Name', width: 300, editable: true},
    { field: 'description', headerName: 'Description', width: 500, editable: true},
    { field: 'link', headerName: 'Link', width: 300, editable:true},
    { field: 'special_instructions', headerName: 'Special Instructions', width: 500, editable: true}
    ];

  return (
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}}noValidate autoComplete="off">
          <TextField margin="normal" label="Module Name" variant="outlined" value={updatedModuleData.name} 
            onChange={(e) => setUpdatedModuleData({...updatedModuleData, name: e.target.value})}/>

          <TextField margin="normal" label="Operator Level" variant="outlined" value={updatedModuleData.operator_level} 
          onChange={(e) => setUpdatedModuleData({...updatedModuleData, operator_level: e.target.value})}/>
          <div className="auth" style={{height: '23em', width: '75em', margin: "5em"}}>
            <DataGrid
              rows={updatedTaskData.map((task, i) =>{
                return({...task, tableID: i + 1})
              })}
              columns={columns1}
              onCellEditCommit={handleCellEdit}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
          <Button variant="contained" onClick={patchModuleData}>Submit</Button> <br></br>
      </Box>
  );
}

export default ModuleProfile;
