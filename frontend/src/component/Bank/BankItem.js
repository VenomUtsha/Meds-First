import React from "react";
import "./BankItem.css";
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

const BankItem = ({ item }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          sx={{ fontSize: 17, fontWeight: "bold" }}
        >{`Bank Account Number: ${item.accountNumber}`}</Typography>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
        >{`Name: ${item.name}`}</Typography>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold", color: "green" }}
        >{`Total savings: ${item.inAmount}`}</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: "bold", color: "red" }}>
          {`Total expenses: ${item.outAmount}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BankItem;
