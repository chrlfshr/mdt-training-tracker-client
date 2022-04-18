import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React from "react"
import UsersTable from './backshop_components/users';
import ModulesTable from './backshop_components/modules';


function Backshop() {
  return (
    <div className="backshop">
      <Link to="users">Manage Users</Link> <br></br>
      <Link to="modules">Manage Modules</Link> <br></br>
      <Link to="crews">Manage Crews</Link>
      <Routes>
        <Route path="/users/*" element={<UsersTable/>}/>
        
        <Route path="/modules" element={<ModulesTable/>}/>
        <Route path="/crews" element={<div>Crews</div>}/>
      </Routes>
    </div>
  );
}

export default Backshop;
