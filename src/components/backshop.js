import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React from "react"
import {Typography, Grid} from '@mui/material';
import UsersTable from './backshop_components/users';
import ModulesTable from './backshop_components/modules';
import CrewsTable from './backshop_components/crews.js';


function Backshop() {
  return (
    <div className="backshop">
        <Grid
        container
        spacing={1}
        flexGrow
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '20vh' }}
      >
        <Typography variant="h2">
        <Grid item xs={100}>
          <Link to="users" style={{margin: '20px'}}>Manage Users</Link>
        </Grid>
        <Grid item xs={100}>
          <Link to="modules">Manage Modules</Link>
        </Grid>
        <Grid item xs={100}>
          <Link to="crews">Manage Crews</Link>
        </Grid>
        </Typography>
          
          
       
        </Grid>
      
      <Routes>
        <Route path="/users/*" element={<UsersTable/>}/>
        
        <Route path="/modules/*" element={<ModulesTable/>}/>
        <Route path="/crews/*" element={<CrewsTable/>}/>
      </Routes>
    </div>
  );
}

export default Backshop;
