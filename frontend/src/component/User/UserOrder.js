import React from "react";
import "./UserOrder.css";
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

const UserOrder = ({ item }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          sx={{ fontSize: 17, fontWeight: "bold" }}
        >{`Transaction id: ${item.transactionId}`}</Typography>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
        >{`User id: ${item.userId}`}</Typography>
        {item.order.map((item, key) => (
          <span>
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold" }}
            >{`ProductId: ${item.productId}`}</Typography>
            <span>
              {" "}
              <Typography variant="h6">{`Quantity: ${item.quantity}`}</Typography>
            </span>
            <span>
              <Typography variant="h6">{`Product Name: ${item.productName}`}</Typography>
            </span>
          </span>
        ))}

        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
          Status:{" "}
          {
            <h2>
              {item.status === 2 ? (
                <p style={{ color: "green" }}>Delivered </p>
              ) : item.status === 1 ? (
                <p style={{ color: "blue" }}>Confirmed</p>
              ) : (
                <p
                  style={{ color: "Red" }}
                >
                  Processing 
                </p>
              )}
            </h2>
          }{" "}
        </Typography>
      </CardContent>
    </Card>

    // <div className="CartItemCard">
    //   <div>
    //     {/* <Link to={`/product/${item.product}`}>{item.name}</Link> */}
    //     <span>{`Transaction id: ${item.transactionId}`}</span>
    //     <span>{`User id: ${item.userId}`}</span>
    //     {item.order.map((item, key) => (
    //       <span>
    //         <p>{`PruductId: ${item.productId}`}</p>
    //         <span>
    //           {" "}
    //           <p>{`Quantity: ${item.quantity}`}</p>
    //         </span>
    //         <span>
    //           <p>{`Product Name: ${item.productName}`}</p>
    //         </span>
    //       </span>
    //     ))}
    //     <span>
    //       <h2>
    //         {item.status === 2 ? (
    //          <p style={{color:"green"}} >Delivered </p>
    //         ) : item.status === 0 ? (<p style={{color:"blue"}}>Processing</p>):( <p style={{color:"Red"}} onClick={() => Confirm(item.transactionId)}>Confirm</p>)}
    //       </h2>
    //     </span>
    //   </div>
    // </div>
  );
};

export default UserOrder;
