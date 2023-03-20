import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";
import { MdEventNote } from "react-icons/md";
import "./icon.css";
// import "/Admin.css";

const Admin = () => {
  const [orderItem, setOrderItem] = useState([]);

  useEffect(() => {
    axios
      .get(`api/v1/adminorder`)
      .then((res) => setOrderItem(res.data.adminOrder))
      .catch((err) => console.log(err, "it has an error"));
  }, [orderItem]);

  return (
    <>
      <Fragment>
        <div className="title">Admin Order Details</div>
        <div className="goToAppointments">
          <Link to="/adminappointment">
            <MdEventNote /> Appointments
          </Link>
        </div>
        <div className="cartPage">
          {orderItem &&
            orderItem.map((item, key) => (
              <div key={item._id} className="check">
                <OrderItem item={item} />
              </div>
            ))}
        </div>
      </Fragment>
    </>
  );
};

export default Admin;
