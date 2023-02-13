import React, { useState, useEffect, Fragment } from "react";
import "./Admin.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import OrderItem from "./OrderItem";

const Admin = () => {
  const [orderItem, setOrderItem] = useState([]);

 

  useEffect(() => {

    const func = ()=>{
      axios
      .get(`api/v1/adminorder`)
      .then((res) => setOrderItem(res.data.adminOrder))
      .catch((err) => console.log(err, "it has an error"));
    }

    func();
  },[orderItem]);



  return (
    <>
      <Fragment>
        <div className="title">Admin Order Details</div>
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
