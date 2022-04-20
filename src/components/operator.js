import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Avatar,
         Grid,
         Typography,
         Card,
         CardActionArea,
         CardMedia,
         CardContent,
         Accordion,
         AccordionSummary,
         AccordionDetails,
         FormGroup,
         FormControlLabel,
         FormHelperText,
         Checkbox } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//import { DataGrid } from '@mui/x-data-grid';
import { apiUrl } from '../App.js';
import '../App.css';

function Operator(props) {
  const location = useLocation();
  const user = location.pathname.match(/\/(.*?)\//y)[0].slice(1,-1);
  const [overviewData, setOverviewData] = useState({});

  useEffect(() => {
    getOverviewData();
  }, [])

  const getOverviewData = async function(){
    let data = await fetch(apiUrl + `/users/account/${user}/overview`);
    let parsedData = await data.json();
    setOverviewData(parsedData);
  }

  const toggleIsStarted = () => {

  }

  const toggleIsCompleted = () => {

  }

  return (
    <div className="operator">
      {console.log(overviewData)}

      <Grid
        container
        spacing={1}
        flexGrow
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={10}>
          <Typography variant="h2">
            {`Welcome, ${overviewData?.userInfo?.rank} ${overviewData?.userInfo?.name}!` ?? ''}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Avatar sx={{ bgcolor: deepPurple[500],
                        width: 75,
                        height: 75 }}
          >
            {overviewData?.userInfo?.name[0] ?? ''}
          </Avatar>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="caption">
            {`(${overviewData?.userInfo?.username})` ?? ''}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h4">
            Your Crew
          </Typography>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://bit.ly/3vvR8Ha"
                alt="crew"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {overviewData?.crewInfo?.name ?? ''}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h4">
            Your Training
          </Typography>
          {overviewData?.modules && overviewData?.modules.map((mod, i) => (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>{mod.name}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Deadline: {mod.deadline}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={mod.is_started} onChange={toggleIsStarted} name="started" />
                    }
                    label="Module Started"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={mod.is_completed} onChange={toggleIsCompleted} name="complete" />
                    }
                    label="Module Complete"
                  />
                </FormGroup>
                <FormHelperText>Mark Your Training Progress</FormHelperText>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Operator;
