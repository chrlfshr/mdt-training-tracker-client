import { Select, MenuItem, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";


function Switch_Role({user, setCurrentRole, currentRole}) {
  const location = useLocation();
  
  useEffect(()=>{
    setCurrentRole("operator")
    // console.log(location.pathname.match(/\/(.*?)\/(.*)/)[2])
    // setCurrentRole(location.pathname.match(/\/(.*?)\/(.*)/)[2])
  },[])

  return (
    <div className="sign_in">
      <FormControl fullWidth={true} className="sign_in_form" style={{marginTop: 5 + 'px'}}>
      <Select
        name="input"
        labelId='Users'
        id='userSelect'
        value={currentRole ?? "operator"}
        sx={{width: 500, fontSize: 35, fontWeight: 'bold'}}
        onChange={(e) => setCurrentRole(e.target.value)}>
        <MenuItem value={"operator"}>Operator</MenuItem>
        {user.is_trainer && <MenuItem value={"trainer"}>Trainer</MenuItem>}
        {user.is_auth && <MenuItem value={"backshop"}>Backshop</MenuItem>}
        {user.is_approver && <MenuItem value={"auth"}>Authorization Authority</MenuItem>}
      </Select>
      </FormControl>
    </div>
  );
}

export default Switch_Role;