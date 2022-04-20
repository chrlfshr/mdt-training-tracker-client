import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

//import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../App.js';
import '../App.css';

function Trainer(props) {
  const location = useLocation();
  const user = location.pathname.match(/\/(.*?)\//y)[0].slice(1,-1);
  const [overviewData, setOverviewData] = useState({});

  const [trainerCrewData, setTrainerCrewData] = useState([]);
  const [trainerModuleData, setTrainerModuleData] = useState([]);

  useEffect(() => {
    getOverviewData();
    setTrainerCrewData(overviewData)
    getTrainerCrewData();
    getTrainerModuleData();
  }, [])

  const getOverviewData = async function(){
    //console.log(user);
    let data = await fetch(apiUrl + `/users/account/${user}/overview`);
    let parsedData = await data.json();
    setOverviewData(parsedData);
  }

  const getTrainerCrewData = async function(){
    let data = await fetch(apiUrl + "/crews/" + overviewData?.crewInfo?.id)
    let parsedData = await data.json()
    setTrainerCrewData(parsedData)
    console.log(trainerCrewData)
  }

  const getTrainerModuleData = async function(){
    let data = await fetch(apiUrl + "/modules")
    let parsedData = await data.json()
    setTrainerModuleData(parsedData);
    console.log(trainerModuleData)
  }

  return (
    <div className="trainer">
      <Typography variant="overline">
        Crew ID: {overviewData?.crewInfo?.id} <br></br>
        Crew Name: {overviewData?.crewInfo?.name} <br></br>
      </Typography>
      <Typography variant="overline">
        Crew Members: {trainerCrewData.id}
      </Typography> <br></br>
      <Typography variant="overline">
        Modules: {trainerModuleData.id}
      </Typography>
      {console.log('overviewData:', overviewData)}
    </div>
  )
};

export default Trainer;
