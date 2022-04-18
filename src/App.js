import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useReducer, useContext, useRef } from 'react';
import './App.css';
import Sign_In from './components/sign_in.js';
import Switch_Role from "./components/switch_roles";
import Backshop from "./components/backshop";


export const apiUrl = "http://localhost:3001"

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(
    {id: undefined,
    username: "bob",
    rank: '1Lt',
    name: 'bob',
    is_trainer: 1,
    is_auth: 1,
    is_approver: 0
  });

  const [currentRole, setCurrentRole] = useState(undefined);

  useEffect(()=>{

  },[])
  
  useEffect(()=>{
    console.log(currentUser)
    if(currentUser.id !== undefined){
      navigate("/" + currentUser.username)
      setCurrentRole("operator")
    }
  },[currentUser])

  useEffect(()=>{
    console.log(currentRole)
    if(currentRole !== undefined){
      navigate(`/${currentUser.username}/${currentRole}`)
    }
  },[currentRole])
  
  return (
    
    <div className="App">
        <Routes>
          <Route path="/" element={<Sign_In setUser ={setCurrentUser}/>}></Route>
          <Route path="/:username/*" element={<>
          <header className="App-header">
            <Switch_Role user={currentUser} setCurrentRole={setCurrentRole} currentRole={currentRole}/>
          {/* 
          Site Title
          Switch Roles
          All Trainings
          Notifications
          */}
          </header>
          <main>
            <Routes>
              <Route path="/training" element={<div>training</div>}/>
              <Route path="/operator" element={<div>operator</div>}/>
              <Route path="/trainer" element={<div>trainer</div>}/>
              <Route path="/backshop/*" element={<Backshop/>}/>
              <Route path="/auth" element={<div>authorization</div>}/>
            </Routes>
          </main>
          </>}>
          </Route>
        </Routes>
    </div>
  );
}

export default App;

