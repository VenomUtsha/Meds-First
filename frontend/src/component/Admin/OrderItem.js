import React from "react";
import "./OrderItem.css";
import { Link } from "react-router-dom";
import image from "../../images/macbook.jpg";
import { removeItemsFromCart } from "../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const OrderItem = ({ item }) => {
  const Confirm = (id) => {
    const data = {
      transactionId: id,
    };

    axios
      .post(`http://localhost:4000/api/v1/admintransaction`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err, "it has an error"));
  };
  return (
    <Card >
      <CardContent >
        <Typography sx={{ fontSize: 17,fontWeight: 'bold' }}>{`Transaction id: ${item.transactionId}`}</Typography>
        <Typography sx={{ fontSize: 14,fontWeight: 'bold' }} >{`User id: ${item.userId}`}</Typography>
        {item.order.map((item, key) => (
          <span>
            <Typography sx={{ fontSize: 14,fontWeight: 'bold' }}>{`ProductId: ${item.productId}`}</Typography>
            <span>
              {" "}
              <Typography variant="h6">{`Quantity: ${item.quantity}`}</Typography>
            </span>
            <span>
              <Typography variant="h6">{`Product Name: ${item.productName}`}</Typography>
            </span>
          </span>
        ))}
        
          <Typography sx={{ fontSize: 14,fontWeight: 'bold' }}>
            Status:{" "}
            {
              <h2 className={item.status === 2 ? "greenColor" : "redColor"}>
                {item.status === 2 ? (
                  <p>Delivered</p>
                ) : item.status === 1 ? (
                  <p style={{ color: "blue" }}>Processing</p>
                ) : (
                  <p onClick={() => Confirm(item.transactionId)}>Confirm</p>
                )}
              </h2>
            }{" "}
          </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
