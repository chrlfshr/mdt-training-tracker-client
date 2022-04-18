import { Select, MenuItem, FormControl } from '@mui/material';



function Switch_Role({user, setCurrentRole, currentRole}) {
  return (
    <div className="sign_in">
      <FormControl className="sign_in_form" style={{marginTop: 10 + 'px'}}>
      <Select
        name="input"
        labelId='Users'
        id='userSelect'
        defaultValue={"operator"}
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