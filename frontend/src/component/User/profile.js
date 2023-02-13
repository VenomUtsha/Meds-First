import { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import profile from "../../images/profile.png";
import ProfileNavBar from "../User/ProfileNav";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import OrderItem from "../User/UserOrder";

const Profile = () => {
  const [user, setUser] = useState({});
  const [orderItem, setOrderItem] = useState([]);

  const userBackend = {
    userinfo: "",
  };



  useEffect(() => {
    axios.get(`api/v1/me`).then((res) => {
      setUser(res.data.user);
    });



  }, []);

  userBackend.userinfo = user._id;

  useEffect(() => {

    const func = () => {
      axios
        .post(`api/v1/userorder`, userBackend)
        .then((res) => setOrderItem(res.data.userOrder))
        .catch((err) => console.log(err, "it has an error"));
    }

    func();
  }, [orderItem]);

  console.log(orderItem)

  return (
    <>
      <ProfileNavBar />
      <div className="main">
        <div className="container bootstrap snippets bootdey">
          <div className="row">
            <div className="profile-nav col-md-3">
              <div className="panel">
                <div className="user-heading round">
                  <a href="#">
                    <img src={profile} alt="" />
                  </a>

                  <h1>{/*user.name*/}</h1>
                  <p>{/*user.email*/}</p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "43rem" }}>
              <div className="profile-info col-md-9">
                <div className="panel">
                  <div className="panel-body bio-graph-info">
                    <h1>Basic Information</h1>
                    <div className="row">
                      <div className="bio-row">
                        <p>
                          <span>Name </span>: {/*user.name*/}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <span>Country </span>: Bangladesh
                        </p>
                      </div>

                      <div className="bio-row">
                        <p>
                          <span>Email </span>: {/*user.email*/}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <span>Mobile </span>: +88 {/*user.phone*/}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <span>Bank Account </span>: {/*user.bankAccount*/}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="your-order">your recent orders</div>
        {<div className="cartPage">
          {orderItem &&
            orderItem.map((item, key) => (
              <div className="check" key={item._id}>
                <OrderItem item={item} />
              </div>
            ))}
        </div>}
      </div>
    </>
  );
};

export default Profile;