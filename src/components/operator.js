import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
//import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../App.js';
import '../App.css';

function Operator(props) {
  const [modulesData, setModulesData] = useState([]);
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    getModulesData()
  }, [])

  const getModulesData = async function(){
    let data = await fetch(apiUrl + "/modules/")
    let parsedData = await data.json()
    setModulesData(parsedData)
  }

  return (
    <div className="operator">
      {console.log(props.user)}
    </div>
  );
}

export default Operator;
