import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import { Typography } from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import axios from "axios";
import CartNav from "../Cart/allCartNav"

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const productInfo = JSON.parse(localStorage.getItem("cartItems"));
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const [bankAccount, setBankAccount] = useState("");
  const [secretKey, setSecretKey] = useState("");

  // setTotalPrice(orderInfo.totalPrice);
  // const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(`api/v1/me`).then((res) => {
      setUser(res.data.user);

      // console.log(user)
    });
  }, []);

  const totalPrice = orderInfo.totalPrice;

  //console.log(secret);

  const order = productInfo.map((obj) => ({
    productId: obj.product,
    productName: obj.name,
    quantity: obj.quantity,
  }));

  const transactionInfo = {
    bankAccount: bankAccount,
    totalAmount: totalPrice,
    secretKey: secretKey,
    userId: user._id,
    order: order,
  };

  console.log(transactionInfo);

  const submitHandler = async (e) => {
    e.preventDefault();

    // const { bloodGroup, bagOfBlood, location, contact } = post;
    // console.log(post);

    axios
      .post(`api/v1/usertransaction`, transactionInfo)
      .then(async (res) => {
        alert("Order is confirmed...Payment will be deduced soon");
        navigate("/profile");
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  };

  return (
    <>
      <CartNav />

      <Fragment>
        <MetaData title="Payment" />
        {/* <CheckoutSteps activeStep={2} /> */}
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Bank Info</Typography>
            <div>
              <CreditCardIcon />
              <input
                className="paymentInput"
                placeholder="Bank-account"
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
            <div>
              <VpnKeyIcon />
              <input
                className="paymentInput"
                placeholder="Secret key"
                type="password"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value={`Pay - ${totalPrice}/=`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </Fragment>
    </>
  );
};

export default Payment;
