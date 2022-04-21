import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';

import { apiUrl } from '../../App.js'
import { Box, TextField, Button, Grid } from "@mui/material";


function NewModule({setSubmitted}) {
  const navigate = useNavigate() 
  const [newModuleData, setNewModuleData] = useState({
    is_approved: false,
    name: "",
    operator_level: ""});
  const [newTaskData, setNewTaskData] = useState([]);

  useEffect(() =>{
    console.log(newTaskData)
  },[newTaskData])

  useEffect(() =>{
    console.log(newModuleData)
  },[newModuleData])


  function AddTaskToolbar(){

    const addTask = function(){
      setNewTaskData([...newTaskData, {
      id: newTaskData.length + 1,
      description: "",
      link: "",
      module_id: module.id,
      name: "",
      special_instructions: ""}])
    }
  
    return (
      <GridToolbarContainer>
        <Button color="primary" onClick={addTask}>
          Add Task
        </Button>
      </GridToolbarContainer>
    );
  }

   const handleCellEdit = function(data){
    console.log(data)
    setNewTaskData(newTaskData.map((task) =>{
      if(task.id === data.id ){
        task[data.field] = data.value;
      }
      return task
    }))
   }

   const postTask = function(task){
    fetch(apiUrl+ "/tasks", {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => {
      console.log(data)
    })
   }


  const deleteTask = function(tableID){
    let tasks = [...newTaskData]
    tasks.splice(tableID-1, 1)
    console.log(tasks)
    setNewTaskData(tasks)
  }
  
  const postModule = function(){
  fetch(apiUrl+ "/modules", {
    method: 'POST',
    body: JSON.stringify(newModuleData),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(data => data.json())
  .then((data) => {
    console.log(data)
    let newTask = {}
    for(let task of newTaskData){
        newTask = {...task}
        newTask.module_id = data[0].id
        postTask(newTask)
      }
  })
  .then(()=>{
    setSubmitted(newModuleData)
    navigate(-1)
  })
  }

  const columns1 = [
      { field: 'name', headerName: 'Task Name', width: 300, editable: true},
      { field: 'description', headerName: 'Description', width: 500, editable: true},
      { field: 'link', headerName: 'Link', width: 300, editable:true},
      { field: 'special_instructions', headerName: 'Special Instructions', width: 500, editable: true},
      { field: "delete", headerName: "Delete Task", width: 300, renderCell: (params) =>{
        return(<Button variant="contained" onClick={() => deleteTask(params.row.tableID)}>Delete</Button>)
        }
      }
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
          <TextField margin="normal" label="Module Name" variant="outlined" value={newModuleData.name} 
            onChange={(e) => setNewModuleData({...newModuleData, name: e.target.value})}/>

          <TextField margin="normal" label="Operator Level" variant="outlined" value={newModuleData.operator_level} 
          onChange={(e) => setNewModuleData({...newModuleData, operator_level: e.target.value})}/>

          <br></br>

      <Grid item>
          <div className="auth" style={{height: '23em', width: '75em', margin: "5em"}}>
            <DataGrid
              rows={newTaskData.map((task, i) =>{
                return({...task, tableID: i + 1})
              })}
              columns={columns1}
              onCellEditCommit={handleCellEdit}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{
                Toolbar: AddTaskToolbar,
              }}
              componentsProps={{
                toolbar: { setNewTaskData },
              }}
            />
          </div>
          <Button variant="contained" onClick={postModule}>Create Module</Button>
       </Grid>
       </Grid>
  );
}

export default NewModule;
