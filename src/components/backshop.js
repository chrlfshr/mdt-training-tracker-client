import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React from "react"
import UsersTable from './backshop_components/users';
import ModulesTable from './backshop_components/modules';
import CrewsTable from './backshop_components/crews.js';


function Backshop() {
  return (
    <div className="backshop">
      <Link to="users">Manage Users</Link> <br></br>
      <Link to="modules">Manage Modules</Link> <br></br>
      <Link to="crews">Manage Crews</Link>
      <Routes>
        <Route path="/users/*" element={<UsersTable/>}/>
        
        <Route path="/modules/*" element={<ModulesTable/>}/>
        <Route path="/crews/*" element={<CrewsTable/>}/>
      </Routes>
    </div>
  );
}

export default Backshop;
