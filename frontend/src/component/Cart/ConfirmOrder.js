import React, { Fragment, useState, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../../component/layout/Metadata";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../images/rx.jpg";
import CartNav from "../Cart/allCartNav";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [user, setUser] = useState({});

  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`api/v1/me`).then((res) => {
      setUser(res.data.user);

      // console.log(user)
    });
  }, []);

  console.log(user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 500 : 20;

  const tax = subtotal * 0.25;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.country}`;

  //const address = "demo1";
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/payment");
  };

  return (
    <>
      <CartNav />
      <Fragment>

        <MetaData title="Confirm Order" />
        {/* <CheckoutSteps activeStep={1} /> */}
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography>Shipping Info</Typography>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Name:</p>
                  { <span>{user.name}</span> }
                </div>
                <div>
                  <p>Phone:</p>
                  { <span>{user.phone}</span> }
                </div>
                <div>
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Your Cart Items:</Typography>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product}>
                      <img src={image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X {item.price} ={" "}
                        <b>{item.price * item.quantity}/=</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="orderSummary">
              <Typography>Order Summary</Typography>
              <div>
                <div>
                  <p>Subtotal:</p>
                  <span>{subtotal}/=</span>
                </div>
                <div>
                  <p>Shipping Charges:</p>
                  <span>{shippingCharges}/=</span>
                </div>
                <div>
                  <p>TAX:</p>
                  <span>{tax}/=</span>
                </div>
              </div>

              <div className="orderSummaryTotal">
                <p>
                  <b>Total:</b>
                </p>
                <span>{totalPrice}/=</span>
              </div>

              <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ConfirmOrder;
