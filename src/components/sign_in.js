import { useState } from 'react';
import { Button, TextField, Grid} from '@mui/material';
import {apiUrl} from '../App.js';

function Sign_In({setUser}) {
  const [username, setUsername] = useState('')

  const fetchUserData = function(e){
    e.preventDefault();
    fetch(apiUrl + '/users/account/' + username)
    .then(data => data.json())
    .then(userData => setUser(userData))
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="sign_in">
      <Grid alignItems='center' justify='center' marginTop="20em">
     <form onSubmit={fetchUserData}>
      <TextField margin="normal" type="username" variant="outlined" label="User Name" 
                 onChange={(e) => setUsername(e.target.value)}/> <br></br>
      <Button margin="normal" type='submit' variant="contained">Sign In</Button>
      </form>
      </Grid>
    </div>
  );
}

export default Sign_In;