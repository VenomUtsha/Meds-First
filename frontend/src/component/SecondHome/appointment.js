import React, { Fragment, useEffect, useState } from "react";
import './appointment.css'
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
const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const classes = useStyles();
  const data = [
    { service: "Teeth Orthodontics", schedule: "8:00 AM - 9:00 AM" },
    { service: "Cosmetic Dentistry", schedule: "8:00 AM - 9:00 AM" },
    { service: "Teeth Cleaning", schedule: "8:00 AM - 9:00 AM" },
    { service: "Medical checkup", schedule: "8:00 AM - 9:00 AM" },
    { service: "Corona Test", schedule: "8:00 AM - 9:00 AM" },
  ];
  const [userId, setuserId] = useState("");
  const [appoint, setAppoint] = useState({
    userId: "",
    name: "",
    service: "",
    schedule: "",
    date: date.toLocaleDateString(),
  });

  const [chk, setChk] = useState({});



  useEffect(() => {
    axios.get(`api/v1/me`).then((res) => {
      setuserId(res.data.user._id);
      //console.log(res.data.user)
      setName(res.data.user.name)
    });
  }, []);

  console.log(userId);
  const appointfun = (elem) => () => {

    appoint.userId = userId;
    appoint.name = name;
    appoint.service = elem.service;
    appoint.schedule = elem.schedule;
    appoint.date = date.toLocaleDateString();
    axios
      .post(`api/v1/createappointment`, appoint)
      .then((res) => setChk(res.data.appointment))
      .catch((err) => console.log(err, "it has an error"));
    // console.log(appoint);
    alert("Appoinment is confirmed");
  };

  // useEffect(() => {

  // }, [appoint]);

  return (
    <>
      <div>
        <h1>Appointment available on Today {date.toLocaleDateString()}</h1>

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
                    <button onClick={appointfun(elem)}>Book Appointment</button>
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

export default Appointment;
