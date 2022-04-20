import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';

import { apiUrl } from '../../App.js'
import { Box, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";



function ModuleApproval({module, setSubmitted}) {

  console.log(module)
  const navigate = useNavigate() 
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
  },[taskData])

  function AddTaskToolbar(){

    const addTask = function(){
      setUpdatedTaskData([...updatedTaskData, {
      id: updatedTaskData.length > 0 ? updatedTaskData[updatedTaskData.length - 1].id *10 : 1,
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

   const handleCellEdit = function(data){
    console.log(data)
    setUpdatedTaskData(updatedTaskData.map((task) =>{
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

   const patchTask = function(task){
    fetch(apiUrl+ "/tasks/" + task.id, {
      method: 'PATCH',
      body: JSON.stringify(task),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => {
      console.log(data)
    })
   }

   const deleteTask = async function(taskId, tableID){
    let newTask = true;
    console.log(taskId)
    for(let task of taskData){
      console.log(task)
      if(taskId === task.id){
        console.log("----------------------------------------")
        newTask = false;
      }
    }
    if(newTask){
      console.log(tableID-1)
      let tasks = [...updatedTaskData]
      tasks.splice(tableID-1, 1)
      console.log(tasks)
      setUpdatedTaskData(tasks)
    } 
    else{
      fetch(apiUrl+ "/tasks/" + taskId, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((data) => {
        console.log(data)
        getTaskData()
      })
     }
    }
   

   const deleteModule = function(){
    let promiseArray = []
    for(let task of taskData){
      promiseArray.push(deleteTask(task.id))
    }
    Promise.all(promiseArray)
    .then(()=>{
      fetch(apiUrl+ "/modules/" + module.id, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((data) => {
        console.log(data)
      })
      .then(()=>{
        setSubmitted({deleted: true})
        navigate(-1)
      })
    })
   }

   const updateModule = function(){
    fetch(apiUrl+ "/modules/" + updatedModuleData.id, {
      method: 'PATCH',
      body: JSON.stringify(updatedModuleData),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((data) => {
      console.log(data)
      let isNew = true;
      for(let updatedTask of updatedTaskData){
        for(let task of taskData){
          if(task.id === updatedTask.id){
            isNew =false;
          }
        }
        if(isNew){
          postTask(updatedTask)
        } else{
          patchTask(updatedTask)
        }
        isNew = true;
      }
    })
    .then(()=>{
      setSubmitted(updatedModuleData)
      setCurrentModuleData(updatedModuleData)
      navigate(-1)
    })
   }

  const columns1 = [
    { field: 'name', headerName: 'Task Name', width: 300, editable: true},
    { field: 'description', headerName: 'Description', width: 500, editable: true},
    { field: 'link', headerName: 'Link', width: 300, editable:true},
    { field: 'special_instructions', headerName: 'Special Instructions', width: 500, editable: true},
    { field: "delete", headerName: "Delete Task", width: 300, renderCell: (params) =>{
      return(<Button variant="contained" onClick={() => deleteTask(params.row.id, params.row.tableID)}>Delete</Button>)
    }}
    ];

    
  return (
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' },}}noValidate autoComplete="off">
          <TextField margin="normal" label="Module Name" variant="outlined" value={updatedModuleData.name}/>

          <TextField margin="normal" label="Operator Level" variant="outlined" value={updatedModuleData.operator_level}/>

          <TextField margin="normal" label="Approved" variant="outlined" value={`${updatedModuleData.is_approved}`}/>

          <FormControlLabel label="Approved" 
          control={<Checkbox checked={updatedModuleData.is_approved} 
          onChange={(e) => setUpdatedModuleData({...updatedModuleData, is_approved : e.target.checked})}/>} />

          <div className="auth" style={{height: '23em', width: '75em', margin: "5em"}}>
            <DataGrid
              rows={updatedTaskData.map((task, i) =>{
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
                toolbar: { setUpdatedTaskData },
              }}
            />
          </div>
          <Button variant="contained" onClick={updateModule}>Update</Button>
          <Button variant="contained" onClick={deleteModule}>Delete</Button>
      </Box>
  );
}

export default ModuleApproval;
