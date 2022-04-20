import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
//import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../App.js';
import '../App.css';

function Operator(props) {
  const [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    //getOverviewData()
  }, [])

  const getOverviewData = async function(){
    let data = await fetch(apiUrl + "/modules/")
    let parsedData = await data.json()
    setOverviewData(parsedData)
  }

  return (
    <div className="operator">
      
    </div>
  );
}

export default Operator;
