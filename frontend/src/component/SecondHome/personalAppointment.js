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
const PersonalAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [userBackend,setuserBackend] = useState({
    userinfo: "",
  });
  const classes = useStyles();
 

  useEffect(() => {
    axios.get(`api/v1/me`).then((res) => {
      setUser(res.data.user); 
      setuserBackend({...userBackend,userinfo:res.data.user._id}) 
    });
  }, []);
  
 
  useEffect(() => {
    const appointfun1 = async () => {

     console.log(userBackend);
      axios
        .post(`api/v1/appointmentdetails`, userBackend)
        .then((res) => setData(res.data.userAppointment))
        .catch((err) => console.log(err, "it has an error"));
    };
    appointfun1();
  }, [userBackend]);

  //   useEffect(() => {
  //     axios.get(`api/v1/me`).then((res) => {
  //       setUser(res.data.user);
  //     });
  //   }, []);

  // useEffect(() => {

  //     const userId1 = "630625fd6bb34ae62662c024"
  //     const func = ()=>{
  //       axios
  //       .get(`api/v1/appointmentdetails`,user)
  //       .then((res) => setData(res.data.userAppointment))
  //       .catch((err) => console.log(err, "it has an error"));
  //     }

  //     func();
  //   },[user]);

  return (
    <>
      <div>
        <h1>Your Appointments</h1>
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
                  <CardContent></CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default PersonalAppointment; 
