import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../../App.js'
import { Box, TextField, Button } from "@mui/material";

function ModuleProfile({module}) {
  const [currentModuleData, setCurrentModuleData] = useState([]);
  const [updatedModuleData, setUpdatedModuleData] = useState([]);

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    setCurrentModuleData(module)
    setUpdatedModuleData(module)
    getTaskData()
  },[module])

  useEffect(() =>{
    console.log(taskData)
  },[taskData])

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

  const columns1 = [
    { field: 'name', headerName: 'Task Name', width: 300, renderCell: (params) => {
      if (taskData[params.row.tableID] === module.id) {
      return (<TextField margin="normal" variant="standard" value={taskData[params.row.tableID-1].name} 
      onChange={(e) => setTaskData({...taskData, name: e.target.value})}/>)
    }}},
    { field: 'description', headerName: 'Description', width: 500, renderCell: (params) => {
      return (<TextField margin="normal" variant="standard" style={{width: 800}}value={(taskData[params.row.tableID-1].description)} 
      onChange={(e) => setTaskData({...taskData, description: e.target.value})}/>)}
    }];

  return (
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}}noValidate autoComplete="off">
          <TextField margin="normal" label="Module Name" variant="outlined" value={updatedModuleData.name} 
            onChange={(e) => setUpdatedModuleData({...updatedModuleData, username: e.target.value})}/>

          <TextField margin="normal" label="Operator Level" variant="outlined" value={updatedModuleData.operator_level} 
          onChange={(e) => setUpdatedModuleData({...updatedModuleData, rank: e.target.value})}/>
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
          <Button variant="contained" onClick={patchModuleData}>Submit</Button> <br></br>
      </Box>
    
  );
  
}

export default ModuleProfile;
