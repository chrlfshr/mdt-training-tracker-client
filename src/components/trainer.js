import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../App.js';
import '../App.css';
import MemberProfile from "./trainer_components/memberProfile.js";

function Trainer(props) {
  const location = useLocation();
  const user = location.pathname.match(/\/(.*?)\//y)[0].slice(1,-1);
  const [userData, setUserData] = useState({});

  const [crewData, setCrewData] = useState([]);
  const [crewMembers, setCrewMembers] = useState([]);
  const [currentMemberData, setCurrentMemberData] = useState({});
  const [submitted, setSubmitted] = useState(1);

  useEffect(() => {
    console.log(user)
    getUserData()
  }, [submitted])

  useEffect(() =>{
    if(userData.crew_id !== undefined){
      getCrewMembersData()
      getCrewData()
    }
  }, [userData])

  const getUserData = async function(){
    let data = await fetch(apiUrl + `/users/account/${user}`);
    let parsedData = await data.json();
    setUserData(parsedData);
  }

  const getCrewData = async function(){
    let data = await fetch(apiUrl + `/crews/${userData?.crew_id}`)
    let parsedData = await data.json()
    setCrewData(parsedData);
    console.log(parsedData)
  }

  const getCrewMembersData = async function(){
    let data = await fetch(apiUrl + `/crews/${userData?.crew_id}/members`)
    let parsedData = await data.json()
    setCrewMembers(parsedData);
    console.log(parsedData)
  }

  const columns =[
    { field: 'name', headerName: 'Name', width: 200},
    { field: 'username', headerName: 'Username', width: 130},
    { field: 'rank', headerName: 'Rank', width: 150},
    { field: 'examine', headerName: 'Examine', width: 70, renderCell: (params) => {
      return (<Link to={`${params.row.username}`} 
      onClick={()=> {currentMemberData(crewMembers[params.row.tableID - 1])
      console.log('onClickEntered')}}>Examine</Link>)}
    }
  ];

  return (
    <div className="trainer">
      <Typography variant="overline">
        Crew ID: {crewData.id} <br></br>
        Crew Name: {crewData.name} <br></br>
      </Typography>
      <div className="auth" style={{ height: '23.22em', width: '56em', margin: "10em"}}>
      <Routes>
          <Route path="/:username" element={<MemberProfile userData={currentMemberData} setSubmitted={setSubmitted}/>}/>
        </Routes>
        <DataGrid
          rows={crewMembers.map((user, i) =>{
            return({...user, tableID: i + 1})
          })}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        </div>
    </div>
  )
};

export default Trainer;
