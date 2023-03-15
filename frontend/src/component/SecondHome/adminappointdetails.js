import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    padding: theme.spacing(2),
  },
}));
const AdminAppointment = () => { 
  const [data, setData] = useState([]);
 
  const classes = useStyles();
 

 
 
  useEffect(() => {
    const appointfun1 = async () => {

      axios
        .get(`api/v1/allappointment`)
        .then((res) => setData(res.data.appointment))
        .catch((err) => console.log(err, "it has an error"));
    };
    appointfun1();
  }, []);

 

  return (
    <>
      <div>
        <h1>All Appointments</h1>
        {/* <button onClick={appointfun}> see all Appoinments</button> */}

        <div className={classes.root}>
          <Grid
            container
            spacing={5}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {data.map((elem) => (
              <Grid
                textalign="center"
                item
                xs={12}
                sm={6}
                md={5}
                key={data.indexOf(elem)}
              >
                <Card>
                  <CardHeader title={`Service Name : ${elem.service}`} />
                  <CardHeader title={`Schedule : ${elem.schedule}`} />
                  <CardContent>
                    <h2>For {`Patient, ${elem.name}`} on {`${elem.date}`} </h2>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default AdminAppointment;
