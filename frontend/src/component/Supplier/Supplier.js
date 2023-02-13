import React, { useState, useEffect, Fragment } from "react";
import "./Supplier.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import OrderItem from "../Supplier/OrderItemSupplier";

const Supplier = () => {
  const [orderItem, setOrderItem] = useState([]);

 

  useEffect(() => {

    const func = ()=>{
      axios
      .get(`api/v1/supplierorder`)
      .then((res) => setOrderItem(res.data.supplierOrder))
      .catch((err) => console.log(err, "it has an error"));
    }

    func();
  },[orderItem]);



  return (
    <>
      <Fragment>
        <div className="title">Supplier Order Details</div>
        <div className="cartPage">
          {orderItem &&
            orderItem.map((item, key) => (
              <div className="check" key={item._id}>
                <OrderItem item={item} />
              </div>
            ))}
        </div>
      </Fragment>
    </>
  );
};

export default Supplier;
